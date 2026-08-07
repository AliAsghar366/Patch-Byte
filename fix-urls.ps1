$base = "C:\Users\MOS\Desktop\New folder (2)\frontend\patchkraze.com"

$dirs = @("$base\pages","$base\policies","$base\collections","$base\products","$base\blogs")
$files = @()
foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        Get-ChildItem $dir -Recurse -Filter "*.html" -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -notmatch '@variant|@page|oembed|atom' } |
            ForEach-Object { $files += $_ }
    }
}

Write-Host "Fixing $($files.Count) files..."
foreach ($f in $files) {
    $html = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $html = $html -replace '//patchkraze\.com/cdn/', '/cdn/'
    $html = $html -replace 'https://patchkraze\.com/cdn/', '/cdn/'
    $html = [regex]::Replace($html, '(/cdn/[^"'' \s>]+)\?[^"'' \s>]*', '$1')
    $html = $html -replace 'https://patchkraze\.com/(products|collections|pages|blogs|policies|cart|account)/', '/$1/'
    $html = $html -replace 'https://patchkraze\.com/', '/'
    [System.IO.File]::WriteAllText($f.FullName, $html, [System.Text.Encoding]::UTF8)
}
Write-Host "All done."
