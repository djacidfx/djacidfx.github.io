<?php

class Env
{
    protected static $env = [];

    public static function load(string $path)
    {
        if (!file_exists($path)) {
            throw new Exception(".env file not found at $path");
        }

        if (!empty(self::$env))
            return;

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '='))
                continue;

            [$name, $value] = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);

            if (
                (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                (str_starts_with($value, "'") && str_ends_with($value, "'"))
            ) {
                $quote = $value[0];
                $value = substr($value, 1, -1);

                $value = $quote === '"'
                    ? str_replace(['\"', '\n', '\r', '\\'], ['"', "\n", "\r", '\\'], $value)
                    : str_replace(["\'", '\\'], ["'", '\\'], $value);

            }

            self::$env[$name] = $value;
            putenv("$name=$value");
        }
    }

    public static function get(string $key, $default = null): mixed
    {
        return self::$env[$key] ?? getenv($key) ?? $default;
    }
}
