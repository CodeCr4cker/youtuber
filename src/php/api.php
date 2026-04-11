<?php
/**
 * Prayagraj Creator - REST API Backend
 * PHP API Endpoints for Blog Management
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration (example - configure as needed)
define('DB_HOST', 'localhost');
define('DB_NAME', 'prayagraj_creator');
define('DB_USER', 'root');
define('DB_PASS', '');

/**
 * Simple JSON Response Helper
 */
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

/**
 * Get Request Data
 */
function getRequestData() {
    $json = file_get_contents('php://input');
    return json_decode($json, true);
}

// Router
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/php/api.php', '', $path);
$pathParts = explode('/', trim($path, '/'));
$endpoint = $pathParts[0] ?? '';
$id = $pathParts[1] ?? null;

switch ($endpoint) {
    case 'posts':
        handlePosts($method, $id);
        break;
    case 'comments':
        handleComments($method, $id);
        break;
    case 'contact':
        handleContact($method);
        break;
    case 'newsletter':
        handleNewsletter($method);
        break;
    case 'stats':
        handleStats($method);
        break;
    default:
        jsonResponse(['error' => 'Endpoint not found'], 404);
}

/**
 * Handle Blog Posts
 */
function handlePosts($method, $id = null) {
    // Mock data for demonstration
    $posts = [
        [
            'id' => '1',
            'title' => 'The Ultimate Guide to Kumbh Mela 2025',
            'slug' => 'ultimate-guide-kumbh-mela-2025',
            'excerpt' => 'Everything you need to know about the world\'s largest spiritual gathering.',
            'content' => 'Full article content here...',
            'category' => 'Travel',
            'tags' => ['Kumbh Mela', 'Prayagraj', 'Spiritual'],
            'author' => 'Prayagraj Creator',
            'publishedAt' => '2024-01-15',
            'views' => 12500,
            'likes' => 850,
        ],
        [
            'id' => '2',
            'title' => 'How I Grew My Channel to 100K Subscribers',
            'slug' => 'how-i-grew-channel-100k-subscribers',
            'excerpt' => 'The complete journey and strategies for YouTube growth.',
            'content' => 'Full article content here...',
            'category' => 'Tips',
            'tags' => ['YouTube', 'Growth', 'Tips'],
            'author' => 'Prayagraj Creator',
            'publishedAt' => '2024-01-10',
            'views' => 25600,
            'likes' => 1820,
        ],
    ];

    switch ($method) {
        case 'GET':
            if ($id) {
                $post = array_find($posts, fn($p) => $p['id'] === $id || $p['slug'] === $id);
                if ($post) {
                    jsonResponse($post);
                } else {
                    jsonResponse(['error' => 'Post not found'], 404);
                }
            } else {
                jsonResponse($posts);
            }
            break;

        case 'POST':
            $data = getRequestData();
            // Validate and create post
            if (empty($data['title']) || empty($data['content'])) {
                jsonResponse(['error' => 'Title and content are required'], 400);
            }
            $newPost = [
                'id' => (string)(count($posts) + 1),
                'title' => $data['title'],
                'slug' => createSlug($data['title']),
                'excerpt' => $data['excerpt'] ?? '',
                'content' => $data['content'],
                'category' => $data['category'] ?? 'Uncategorized',
                'tags' => $data['tags'] ?? [],
                'author' => $data['author'] ?? 'Admin',
                'publishedAt' => date('Y-m-d'),
                'views' => 0,
                'likes' => 0,
            ];
            jsonResponse(['message' => 'Post created', 'post' => $newPost], 201);
            break;

        case 'PUT':
            if (!$id) {
                jsonResponse(['error' => 'Post ID required'], 400);
            }
            $data = getRequestData();
            jsonResponse(['message' => 'Post updated', 'id' => $id]);
            break;

        case 'DELETE':
            if (!$id) {
                jsonResponse(['error' => 'Post ID required'], 400);
            }
            jsonResponse(['message' => 'Post deleted', 'id' => $id]);
            break;

        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }
}

/**
 * Handle Comments
 */
function handleComments($method, $id = null) {
    switch ($method) {
        case 'GET':
            $comments = [
                [
                    'id' => '1',
                    'postId' => '1',
                    'author' => 'John Doe',
                    'content' => 'Great article! Very informative.',
                    'createdAt' => '2024-01-16',
                    'likes' => 5,
                ],
            ];
            jsonResponse($comments);
            break;

        case 'POST':
            $data = getRequestData();
            if (empty($data['content']) || empty($data['author'])) {
                jsonResponse(['error' => 'Content and author are required'], 400);
            }
            jsonResponse([
                'message' => 'Comment created',
                'comment' => [
                    'id' => (string)time(),
                    'postId' => $data['postId'] ?? '',
                    'author' => $data['author'],
                    'content' => $data['content'],
                    'createdAt' => date('Y-m-d H:i:s'),
                    'likes' => 0,
                ],
            ], 201);
            break;

        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }
}

/**
 * Handle Contact Form
 */
function handleContact($method) {
    if ($method !== 'POST') {
        jsonResponse(['error' => 'Method not allowed'], 405);
    }

    $data = getRequestData();
    
    // Validate
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        jsonResponse(['error' => 'Name, email, and message are required'], 400);
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Invalid email address'], 400);
    }

    // Send email (configure with your SMTP settings)
    $to = 'contact@prayagrajcreator.com';
    $subject = 'New Contact Form Submission: ' . ($data['subject'] ?? 'General Inquiry');
    $message = "Name: {$data['name']}\n";
    $message .= "Email: {$data['email']}\n";
    $message .= "Message:\n{$data['message']}";
    $headers = "From: {$data['email']}";

    // mail($to, $subject, $message, $headers); // Uncomment when SMTP is configured

    jsonResponse(['message' => 'Message sent successfully']);
}

/**
 * Handle Newsletter Subscription
 */
function handleNewsletter($method) {
    if ($method !== 'POST') {
        jsonResponse(['error' => 'Method not allowed'], 405);
    }

    $data = getRequestData();
    
    if (empty($data['email'])) {
        jsonResponse(['error' => 'Email is required'], 400);
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Invalid email address'], 400);
    }

    // Save to database or email service
    jsonResponse(['message' => 'Subscribed successfully']);
}

/**
 * Handle Stats
 */
function handleStats($method) {
    if ($method !== 'GET') {
        jsonResponse(['error' => 'Method not allowed'], 405);
    }

    $stats = [
        'subscribers' => '100K+',
        'videos' => '500+',
        'views' => '5M+',
        'posts' => 24,
        'comments' => 1200,
    ];

    jsonResponse($stats);
}

/**
 * Create URL Slug
 */
function createSlug($string) {
    $slug = strtolower(trim($string));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    return trim($slug, '-');
}

/**
 * Array Find Helper (PHP 8+)
 */
if (!function_exists('array_find')) {
    function array_find($array, $callback) {
        foreach ($array as $item) {
            if ($callback($item)) {
                return $item;
            }
        }
        return null;
    }
}
