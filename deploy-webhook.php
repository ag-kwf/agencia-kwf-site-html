<?php
// Secret token to prevent unauthorized deploys
$secret = 'kwf-deploy-2026-secret';

// Verify the request comes from GitHub
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');
$hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($hash, $signature)) {
    http_response_code(403);
    die('Unauthorized');
}

// Path to the git repository
$repoPath = '/home2/saiufa76/repositories/agencia-kwf-site-html';
$deployPath = '/home2/saiufa76/agenciakwf.com.br';

// Pull latest changes and copy files
$output = [];
exec("cd $repoPath && /usr/local/cpanel/3rdparty/bin/git pull origin deploy 2>&1", $output);
exec("cp -R $repoPath/* $deployPath/ 2>&1", $output);

// Log the result
$log = date('Y-m-d H:i:s') . " - Deploy executed\n" . implode("\n", $output) . "\n\n";
file_put_contents('/home2/saiufa76/deploy.log', $log, FILE_APPEND);

http_response_code(200);
echo 'Deploy OK';
