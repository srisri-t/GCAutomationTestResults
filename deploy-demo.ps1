# Deploy Demo to GitHub Pages
# This script pushes your demo to GitHub and enables automatic deployment

Write-Host "Starting Demo Deployment..." -ForegroundColor Green
Write-Host "Repository: srisri-t/GCAutomationTestResults" -ForegroundColor Cyan

# Get GitHub Personal Access Token securely
$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

if ([string]::IsNullOrWhiteSpace($tokenPlain)) {
    Write-Host "No token provided. Exiting..." -ForegroundColor Red
    exit 1
}

# Validate we're in the right directory
if (!(Test-Path ".git")) {
    Write-Host "Error: Not in a git repository directory" -ForegroundColor Red
    Write-Host "Please run this script from the demo-repo folder" -ForegroundColor Yellow
    exit 1
}

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Found uncommitted changes, adding them..." -ForegroundColor Yellow
    git add .
    git commit -m "Final updates before deployment"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to commit changes" -ForegroundColor Red
        exit 1
    }
}

# Push to GitHub with token
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
$remoteUrl = "https://$tokenPlain@github.com/srisri-t/GCAutomationTestResults.git"

git push $remoteUrl main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Deployment initiated!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/srisri-t/GCAutomationTestResults/settings/pages" -ForegroundColor White
    Write-Host "2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
    Write-Host "3. Wait for deployment to complete" -ForegroundColor White
    Write-Host "4. Your demo will be live at: https://srisri-t.github.io/GCAutomationTestResults/" -ForegroundColor White
    Write-Host ""
    Write-Host "Monitor deployment progress:" -ForegroundColor Cyan
    Write-Host "https://github.com/srisri-t/GCAutomationTestResults/actions" -ForegroundColor White
    
} else {
    Write-Host "Failed to push to GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Verify your token has 'repo' permissions" -ForegroundColor White
    Write-Host "2. Check if the repository exists and you have access" -ForegroundColor White
    Write-Host "3. Ensure the token hasn't expired" -ForegroundColor White
    exit 1
}

# Clear token from memory
$tokenPlain = $null
$token = $null

Write-Host ""
Write-Host "Demo deployment complete!" -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")