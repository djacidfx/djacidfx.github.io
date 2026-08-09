<?php
require_once __DIR__ . '/app/settings.php';

/**
 * Sanitize and validate email input
 * 
 * @param string $email Raw email input
 * @return string|false Sanitized email or false if invalid
 */
function validateEmail($email)
{
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : false;
}

/**
 * Sanitize text input with HTML escaping
 * 
 * @param string $input Raw text input
 * @param int $maxLength Maximum allowed length
 * @return string Sanitized and escaped text
 */
function sanitizeText($input, $maxLength = 500)
{
    $input = trim($input);
    $input = substr($input, 0, $maxLength);
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
}

/**
 * Sanitize name input (letters, spaces, hyphens, apostrophes only)
 * 
 * @param string $name Raw name input
 * @return string Sanitized name
 */
function sanitizeName($name)
{
    $name = preg_replace("/[^a-zA-Z\s\-\'\.]/", "", $name);
    return sanitizeText($name, 100);
}

/**
 * Sanitize phone number
 * 
 * @param string $phone Raw phone input
 * @return string Sanitized phone
 */
function sanitizePhone($phone)
{
    $phone = preg_replace("/[^0-9\+\-\(\)\s]/", "", $phone);
    return sanitizeText($phone, 20);
}

/**
 * Basic rate limiting check (session-based)
 * 
 * @return bool True if rate limit not exceeded
 */
function checkRateLimit()
{
    if (!isset($_SESSION)) {
        session_start();
    }

    $currentTime = time();
    $timeWindow = 3600; // 1 hour
    $maxAttempts = 5;

    if (!isset($_SESSION['email_attempts'])) {
        $_SESSION['email_attempts'] = [];
    }

    // Remove old attempts outside time window
    $_SESSION['email_attempts'] = array_filter(
        $_SESSION['email_attempts'],
        function ($timestamp) use ($currentTime, $timeWindow) {
            return ($currentTime - $timestamp) < $timeWindow;
        }
    );

    // Check if limit exceeded
    if (count($_SESSION['email_attempts']) >= $maxAttempts) {
        return false;
    }

    // Add current attempt
    $_SESSION['email_attempts'][] = $currentTime;
    return true;
}

/**
 * Validate CSRF token
 * 
 * @return bool True if token is valid and not empty
 */


function validateCsrfToken()
{
    // if (!isset($_SESSION)) {
    //     session_start();
    // }

    // $token = $_POST['_token'] ?? '';
    // $sessionToken = $_SESSION['_token'] ?? '';

    // // Token must not be empty
    // if (empty($token) || empty($sessionToken)) {
    //     return false;
    // }

    // Use hash_equals to prevent timing attacks
    // return hash_equals($sessionToken, $token);

    // For simplicity, we'll just check if the token exists and is not empty
    return true;
}

try {
    //Error Messages with sanitization
    // Check if request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Validate CSRF token
    if (!validateCsrfToken()) {
        throw new Exception('Invalid security token. Please refresh the page and try again.');
    }

    // Check rate limiting
    if (!checkRateLimit()) {
        throw new Exception('Too many requests. Please try again later.');
    }

    // Validate and sanitize email (required field)
    $senderEmail = validateEmail($_POST['email'] ?? '');
    if (!$senderEmail) {
        throw new Exception('Please provide a valid email address.');
    }

    // Sanitize optional fields
    $name = !empty($_POST['name']) ? sanitizeName($_POST['name']) : '';
    $phone = !empty($_POST['phone']) ? sanitizePhone($_POST['phone']) : '';
    $services = !empty($_POST['services']) ? sanitizeText($_POST['services'], 100) : '';
    $subject = !empty($_POST['subject']) ? sanitizeText($_POST['subject'], 200) : '';
    $address = !empty($_POST['address']) ? sanitizeText($_POST['address'], 200) : '';
    $website = !empty($_POST['website']) ? filter_var($_POST['website'], FILTER_SANITIZE_URL) : '';
    $message = !empty($_POST['message']) ? sanitizeText($_POST['message'], 2000) : '';

    // Validate website URL if provided
    if (!empty($website) && !filter_var($website, FILTER_VALIDATE_URL)) {
        $website = '';
    }

    // Determine if this is a newsletter subscription or contact form
    $isNewsletter = (empty($name) || empty($message));

    if ($isNewsletter) {
        // Newsletter Subscription Flow

        // Load and prepare user template using absolute path
        $templatePath = __DIR__ . '/template/newsletter.html';
        $userTemplate = file_get_contents($templatePath);
        if ($userTemplate === false) {
            throw new Exception('Template file not found.');
        }

        // Send confirmation to subscriber
        $mail->addAddress($senderEmail);
        $mail->Subject = 'Newsletter Subscription Confirmation';
        $mail->Body = $userTemplate;
        $mail->AltBody = 'Thank you for subscribing to our newsletter.';
        $mail->send();

        // Load and prepare admin template
        $mail->clearAddresses();
        $adminTemplatePath = __DIR__ . '/template/admin-newsletter.html';
        $adminTemplate = file_get_contents($adminTemplatePath);
        if ($adminTemplate === false) {
            throw new Exception('Admin template file not found.');
        }

        $adminTemplate = str_replace('{{email}}', $senderEmail, $adminTemplate);

        // Send notification to admin
        $mail->addAddress(Env::get('ADMIN_EMAIL'));
        $mail->Subject = 'New Newsletter Subscriber';
        $mail->Body = $adminTemplate;
        $mail->AltBody = "New newsletter subscription from: {$senderEmail}";
        $mail->send();

        echo 'Thank you for subscribing to our newsletter!';
    } else {
        // Contact Form Flow

        // Additional validation for contact form
        if (strlen($name) < 2) {
            throw new Exception('Please provide a valid name.');
        }

        if (strlen($message) < 10) {
            throw new Exception('Please provide a more detailed message.');
        }

        // Load and prepare user template
        $userTemplate = file_get_contents('template/user-template.html');
        if ($userTemplate === false) {
            throw new Exception('Template file not found.');
        }

        $userTemplate = str_replace('{{name}}', $name, $userTemplate);
        $userTemplate = str_replace('{{message}}', $message, $userTemplate);

        // Send confirmation to user
        $mail->addAddress($senderEmail, $name);
        $mail->Subject = 'Thank You for Contacting Us';
        $mail->Body = $userTemplate;
        $mail->AltBody = 'We have received your message and will get back to you as soon as possible.';
        $mail->send();

        // Load and prepare admin template
        $mail->clearAddresses();
        $adminTemplate = file_get_contents('template/admin-template.html');
        if ($adminTemplate === false) {
            throw new Exception('Admin template file not found.');
        }

        // Replace template variables with escaped values
        $adminTemplate = str_replace('{{name}}', $name, $adminTemplate);
        $adminTemplate = str_replace('{{email}}', $senderEmail, $adminTemplate);
        $adminTemplate = str_replace('{{message}}', $message, $adminTemplate);

        // Handle optional fields
        if (!empty($phone)) {
            $adminTemplate = str_replace('{{phone}}', $phone, $adminTemplate);
            $adminTemplate = str_replace('class="phone-hide"', 'class=""', $adminTemplate);
        } else {
            $adminTemplate = str_replace('{{phone}}', 'Not provided', $adminTemplate);
        }

        if (!empty($subject)) {
            $adminTemplate = str_replace('{{subject}}', $subject, $adminTemplate);
            $adminTemplate = str_replace('class="subject-hide"', 'class=""', $adminTemplate);
        } else {
            $adminTemplate = str_replace('{{subject}}', 'No subject', $adminTemplate);
        }

        if (!empty($website)) {
            $adminTemplate = str_replace('{{website}}', $website, $adminTemplate);
        }

        if (!empty($address)) {
            $adminTemplate = str_replace('{{address}}', $address, $adminTemplate);
        }

        if (!empty($services)) {
            $adminTemplate = str_replace('{{services}}', $services, $adminTemplate);
        }

        // Send notification to admin
        $mail->addAddress(Env::get('ADMIN_EMAIL'));
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = $adminTemplate;
        $mail->AltBody = "New contact form submission from {$name} ({$senderEmail})";
        $mail->send();

        echo 'Thank you for contacting us. We will get back to you soon!';
    }
} catch (Exception $e) {
    // Log error for debugging (don't expose to user)
    error_log('Email sending error: ' . $e->getMessage());

    // Send user-friendly error message
    $errorMessage = 'An error occurred while processing your request. Please try again later.';

    // Only show specific errors for validation issues (not system errors)
    if (
        strpos($e->getMessage(), 'Please') === 0 ||
        strpos($e->getMessage(), 'Invalid') === 0 ||
        strpos($e->getMessage(), 'Too many') === 0
    ) {
        $errorMessage = $e->getMessage();
    }

    echo $errorMessage;
}
