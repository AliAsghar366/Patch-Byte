
$base = "C:\Users\MOS\Desktop\New folder (2)\frontend\patchkraze.com"
$tag  = '<script src="/js/patchbyte.js"></script>'
$files = [System.IO.Directory]::GetFiles($base, "*.html", [System.IO.SearchOption]::AllDirectories)

Write-Host "Injecting patchbyte.js into $($files.Count) pages..."

$patched = 0
$skipped = 0

foreach ($file in $files) {
    $html = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    if ($html.Contains($tag)) { $skipped++; continue }
    # Inject just before </head>
    if ($html.Contains('</head>')) {
        $html = $html.Replace('</head>', "$tag`n</head>")
        [System.IO.File]::WriteAllText($file, $html, [System.Text.Encoding]::UTF8)
        $patched++
    }
}

Write-Host "Done. Patched: $patched  Already had script: $skipped"
