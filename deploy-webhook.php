<?php
$secret = 'kwf-deploy-2026-secret';

// Verify GitHub signature
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');
$hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($hash, $signature)) {
    http_response_code(403);
    die('Unauthorized');
}

// Only act on pushes to 'deploy' branch
$data = json_decode($payload, true);
$ref = $data['ref'] ?? '';
if ($ref !== 'refs/heads/deploy') {
    http_response_code(200);
    die('Skipped: not deploy branch');
}

$deployPath = '/home2/saiufa76/agenciakwf.com.br';
$zipUrl = 'https://github.com/ag-kwf/agencia-kwf-site-html/archive/refs/heads/deploy.zip';
$tmpZip = '/home2/saiufa76/tmp/deploy.zip';
$tmpDir = '/home2/saiufa76/tmp/deploy-extract';

// Ensure tmp directory exists
@mkdir('/home2/saiufa76/tmp', 0755, true);
@mkdir($tmpDir, 0755, true);

// Download zip from GitHub
$log = date('Y-m-d H:i:s') . " - Deploy started\n";

$ch = curl_init($zipUrl);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'KWF-Deploy');
$zipData = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$zipData) {
    $log .= "Error: Failed to download zip (HTTP $httpCode)\n\n";
    file_put_contents('/home2/saiufa76/deploy.log', $log, FILE_APPEND);
    http_response_code(500);
    die('Download failed');
}

file_put_contents($tmpZip, $zipData);
$log .= "Downloaded zip: " . strlen($zipData) . " bytes\n";

// Extract zip
$zip = new ZipArchive;
if ($zip->open($tmpZip) === true) {
    $zip->extractTo($tmpDir);
    $zip->close();

    // Find extracted folder name (agencia-kwf-site-html-deploy/)
    $folders = glob("$tmpDir/agencia-kwf-site-html-deploy/*");
    $extractedDir = "$tmpDir/agencia-kwf-site-html-deploy";

    if (is_dir($extractedDir)) {
        // Copy files to deploy path
        recurseCopy($extractedDir, $deployPath);
        $log .= "Files copied to $deployPath\n";
    } else {
        $log .= "Error: Extracted folder not found\n";
    }

    $zip->close();
} else {
    $log .= "Error: Failed to extract zip\n";
}

// Cleanup
@unlink($tmpZip);
deleteDir($tmpDir);

$log .= "Deploy completed\n\n";
file_put_contents('/home2/saiufa76/deploy.log', $log, FILE_APPEND);

http_response_code(200);
echo 'Deploy OK';

function recurseCopy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst, 0755, true);
    while (($file = readdir($dir)) !== false) {
        if ($file === '.' || $file === '..') continue;
        $srcPath = "$src/$file";
        $dstPath = "$dst/$file";
        if (is_dir($srcPath)) {
            recurseCopy($srcPath, $dstPath);
        } else {
            copy($srcPath, $dstPath);
        }
    }
    closedir($dir);
}

function deleteDir($dir) {
    if (!is_dir($dir)) return;
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $path = "$dir/$item";
        is_dir($path) ? deleteDir($path) : unlink($path);
    }
    rmdir($dir);
}
