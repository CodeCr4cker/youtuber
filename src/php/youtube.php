<?php
/**
 * YouTube API Integration
 * Fetches latest videos from YouTube channel
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=3600'); // Cache for 1 hour

// YouTube API Configuration
// Replace with your actual API key and channel ID
define('YOUTUBE_API_KEY', 'YOUR_YOUTUBE_API_KEY');
define('CHANNEL_ID', 'UCxxxxxxxxxxxxxxxxxxx');

/**
 * Fetch videos from YouTube API
 */
function fetchYouTubeVideos($maxResults = 10) {
    $apiKey = YOUTUBE_API_KEY;
    $channelId = CHANNEL_ID;
    
    // YouTube Data API v3 endpoint
    $url = "https://www.googleapis.com/youtube/v3/search?";
    $url .= "key=$apiKey";
    $url .= "&channelId=$channelId";
    $url .= "&part=snippet,id";
    $url .= "&order=date";
    $url .= "&maxResults=$maxResults";
    $url .= "&type=video";
    
    $response = file_get_contents($url);
    
    if ($response === false) {
        return null;
    }
    
    $data = json_decode($response, true);
    
    if (isset($data['error'])) {
        return null;
    }
    
    $videos = [];
    
    foreach ($data['items'] as $item) {
        if ($item['id']['kind'] === 'youtube#video') {
            $videoId = $item['id']['videoId'];
            
            // Fetch video statistics
            $statsUrl = "https://www.googleapis.com/youtube/v3/videos?";
            $statsUrl .= "key=$apiKey";
            $statsUrl .= "&id=$videoId";
            $statsUrl .= "&part=statistics,contentDetails";
            
            $statsResponse = file_get_contents($statsUrl);
            $statsData = json_decode($statsResponse, true);
            
            $statistics = $statsData['items'][0]['statistics'] ?? [];
            $contentDetails = $statsData['items'][0]['contentDetails'] ?? [];
            
            $videos[] = [
                'id' => $videoId,
                'title' => $item['snippet']['title'],
                'description' => $item['snippet']['description'],
                'thumbnail' => $item['snippet']['thumbnails']['high']['url'] ?? $item['snippet']['thumbnails']['default']['url'],
                'publishedAt' => $item['snippet']['publishedAt'],
                'viewCount' => formatNumber($statistics['viewCount'] ?? 0),
                'likeCount' => formatNumber($statistics['likeCount'] ?? 0),
                'duration' => formatDuration($contentDetails['duration'] ?? 'PT0M0S'),
            ];
        }
    }
    
    return $videos;
}

/**
 * Format large numbers
 */
function formatNumber($num) {
    $num = (int)$num;
    if ($num >= 1000000) {
        return round($num / 1000000, 1) . 'M';
    }
    if ($num >= 1000) {
        return round($num / 1000, 1) . 'K';
    }
    return (string)$num;
}

/**
 * Format YouTube duration (ISO 8601)
 */
function formatDuration($duration) {
    $interval = new DateInterval($duration);
    $hours = $interval->h;
    $minutes = $interval->i;
    $seconds = $interval->s;
    
    if ($hours > 0) {
        return sprintf('%d:%02d:%02d', $hours, $minutes, $seconds);
    }
    return sprintf('%d:%02d', $minutes, $seconds);
}

/**
 * Get channel statistics
 */
function getChannelStats() {
    $apiKey = YOUTUBE_API_KEY;
    $channelId = CHANNEL_ID;
    
    $url = "https://www.googleapis.com/youtube/v3/channels?";
    $url .= "key=$apiKey";
    $url .= "&id=$channelId";
    $url .= "&part=statistics,snippet";
    
    $response = file_get_contents($url);
    
    if ($response === false) {
        return null;
    }
    
    $data = json_decode($response, true);
    
    if (empty($data['items'])) {
        return null;
    }
    
    $channel = $data['items'][0];
    $stats = $channel['statistics'];
    
    return [
        'title' => $channel['snippet']['title'],
        'description' => $channel['snippet']['description'],
        'thumbnail' => $channel['snippet']['thumbnails']['high']['url'] ?? '',
        'subscriberCount' => formatNumber($stats['subscriberCount']),
        'viewCount' => formatNumber($stats['viewCount']),
        'videoCount' => formatNumber($stats['videoCount']),
    ];
}

// API Endpoints
$action = $_GET['action'] ?? 'videos';

switch ($action) {
    case 'videos':
        $maxResults = intval($_GET['limit'] ?? 10);
        $videos = fetchYouTubeVideos($maxResults);
        
        if ($videos === null) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch videos']);
        } else {
            echo json_encode([
                'success' => true,
                'videos' => $videos,
            ]);
        }
        break;
        
    case 'channel':
        $stats = getChannelStats();
        
        if ($stats === null) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch channel stats']);
        } else {
            echo json_encode([
                'success' => true,
                'channel' => $stats,
            ]);
        }
        break;
        
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

/**
 * Mock Data for Demo (when API key is not configured)
 * Remove this when using real API
 */
if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
    $mockVideos = [
        [
            'id' => 'mock1',
            'title' => 'Exploring Hidden Gems of Prayagraj',
            'description' => 'Join me as I explore the hidden gems of Prayagraj.',
            'thumbnail' => 'https://images.unsplash.com/photo-1561361058-4e4e3f5c9b8a?w=1280&h=720&fit=crop',
            'publishedAt' => '2024-01-12T10:00:00Z',
            'viewCount' => '45K',
            'likeCount' => '2.5K',
            'duration' => '15:24',
        ],
        [
            'id' => 'mock2',
            'title' => 'Tech Review: Best Budget Smartphones 2024',
            'description' => 'A comprehensive review of budget smartphones.',
            'thumbnail' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1280&h=720&fit=crop',
            'publishedAt' => '2024-01-08T10:00:00Z',
            'viewCount' => '28K',
            'likeCount' => '1.8K',
            'duration' => '12:30',
        ],
    ];
    
    if ($action === 'videos') {
        echo json_encode([
            'success' => true,
            'videos' => $mockVideos,
            'note' => 'Using mock data. Configure YOUTUBE_API_KEY for real data.',
        ]);
    } elseif ($action === 'channel') {
        echo json_encode([
            'success' => true,
            'channel' => [
                'title' => 'Prayagraj Creator',
                'description' => 'Sharing stories from Prayagraj',
                'thumbnail' => '',
                'subscriberCount' => '100K+',
                'viewCount' => '5M+',
                'videoCount' => '500+',
            ],
            'note' => 'Using mock data. Configure YOUTUBE_API_KEY for real data.',
        ]);
    }
}
