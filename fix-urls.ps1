$base = "d:\zeesha\Patch-Byte-main\Patch-Byte-main\frontend\patchkraze.com"

$dirs = @("$base\pages","$base\policies","$base\collections","$base\products","$base\blogs","$base\cart","$base\checkout")
$files = @()
foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        Get-ChildItem $dir -Recurse -Filter "*.html" -ErrorAction SilentlyContinue |
            ForEach-Object { $files += $_ }
    }
}

# Also add index.html
$files += Get-Item "$base\index.html" -ErrorAction SilentlyContinue

Write-Host "Fixing $($files.Count) files..."
foreach ($f in $files) {
    $html = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    
    # Fix malformed http:/cdn/ URLs
    $html = $html -replace 'http:/cdn/shop/files/', 'http://cdn.shopify.com/s/files/1/0661/2965/7940/files/'
    $html = $html -replace 'https:/cdn/shop/files/', 'https://cdn.shopify.com/s/files/1/0661/2965/7940/files/'
    
    # Fix malformed https:/cdn/shopifycloud/ URLs
    $html = $html -replace 'https:/cdn/shopifycloud/', 'https://cdn.shopifycloud/'
    
    # Fix malformed http:/cdn/ URLs (general case)
    $html = $html -replace 'http:/cdn/', 'http://cdn.shopify.com/'
    
    # Fix malformed https:/cdn/ URLs (general case)
    $html = $html -replace 'https:/cdn/', 'https://cdn.shopify.com/'
    
    [System.IO.File]::WriteAllText($f.FullName, $html, [System.Text.Encoding]::UTF8)
}
Write-Host "All done."
