<?php
require_once __DIR__ . '/Env.php';
Env::load(__DIR__ . '/../.env');


require_once __DIR__ .'/PHPMailer/src/Exception.php';
require_once __DIR__ .'/PHPMailer/src/PHPMailer.php';
require_once __DIR__ .'/PHPMailer/src/SMTP.php';

 // //Server settings
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

//Create an instance; passing `true` enables exceptions

// Create a new PHPMailer instance with exceptions enabled
$mail = new PHPMailer(true);

// Enable (0 = off) SMTP debug output for troubleshooting (can be 0, 1, 2, or 3)
$mail->SMTPDebug = 0; // Set to 2 or 3 for detailed output during development

// Tell PHPMailer to use SMTP for sending
$mail->isSMTP();

// Enable HTML content in the email body
$mail->isHTML(true);

// Set the sender's email and display name (must be in correct order)
$mail->setFrom(Env::get('APP_EMAIL'), Env::get('APP_NAME'));

// Enable SMTP authentication (required for most SMTP servers like Gmail)
$mail->SMTPAuth = true;

// Set the hostname of the mail server (e.g., smtp.gmail.com)
$mail->Host = Env::get('SMTP_HOST_NAME');

// Set the SMTP username (usually the same as the sender's email)
$mail->Username = Env::get('APP_EMAIL'); // or ADMIN_EMAIL

// Set the SMTP password (use app password if 2FA is enabled)
$mail->Password = Env::get('SMTP_PASSWORD');

// Set the encryption type for the SMTP connection ('tls' or 'ssl')
$mail->SMTPSecure = Env::get('ENCRYPTION_TYPE'); // Example: 'tls' for port 587, 'ssl' for port 465

// Set the TCP port to connect to the mail server
$mail->Port = Env::get('SMTP_PORT');

// (Optional, redundant line) Reaffirm SMTP authentication is enabled
$mail->SMTPAuth = true;
