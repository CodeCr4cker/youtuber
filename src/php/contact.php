<?php
/**
 * Contact Form Handler
 * Processes contact form submissions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get form data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required = ['name', 'email', 'subject', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit();
    }
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(trim($data['name']));
$email = htmlspecialchars(trim($data['email']));
$subject = htmlspecialchars(trim($data['subject']));
$message = htmlspecialchars(trim($data['message']));

// Email configuration
$to = 'contact@prayagrajcreator.com';
$emailSubject = "Contact Form: $subject";
$emailBody = "Name: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Subject: $subject\n";
$emailBody .= "Message:\n$message\n";
$emailBody .= "\n---\n";
$emailBody .= "Sent from: " . $_SERVER['HTTP_HOST'] . "\n";
$emailBody .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email (uncomment when SMTP is configured)
// $sent = mail($to, $emailSubject, $emailBody, $headers);
$sent = true; // Mock success for demo

if ($sent) {
    // Log the submission
    $logEntry = date('Y-m-d H:i:s') . " | $name | $email | $subject\n";
    file_put_contents('contact_log.txt', $logEntry, FILE_APPEND | LOCK_EX);

    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
}
