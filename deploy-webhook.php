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

// Use cPanel UAPI to update and deploy the repository
$cpanelUser = 'saiufa76';
$repoPath = '/home2/saiufa76/repositories/agencia-kwf-site-html';

// Call cPanel API via local socket
$updateCmd = "/usr/local/cpanel/bin/uapi --user=$cpanelUser VersionControl update repo_path=$repoPath branch=deploy 2>&1";
$deployCmd = "/usr/local/cpanel/bin/uapi --user=$cpanelUser VersionControl deploy repo_path=$repoPath 2>&1";

$output = [];
exec($updateCmd, $output);
exec($deployCmd, $output);

// Log the result
$log = date('Y-m-d H:i:s') . " - Deploy via UAPI\n" . implode("\n", $output) . "\n\n";
file_put_contents('/home2/saiufa76/deploy.log', $log, FILE_APPEND);

http_response_code(200);
echo 'Deploy OK';
