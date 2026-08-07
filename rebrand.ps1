$base = "C:\Users\MOS\Desktop\New folder (2)\frontend\patchkraze.com"
$files = [System.IO.Directory]::GetFiles($base, "*.html", [System.IO.SearchOption]::AllDirectories)

Write-Host "Rebranding $($files.Count) files..."
$totalReplaced = 0

foreach ($f in $files) {
    $html = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    $original = $html

    # "Patch Kraze" (title case, with space) → "PatchByte"
    $html = $html -replace 'Patch Kraze', 'PatchByte'

    # "patchkraze" lowercase standalone (NOT followed by .com) → "PatchByte"
    $html = [regex]::Replace($html, 'patchkraze(?!\.com)', 'PatchByte')

    if ($html -ne $original) {
        [System.IO.File]::WriteAllText($f, $html, [System.Text.Encoding]::UTF8)
        $count = ([regex]::Matches($original, '(?i)patch\s*kraze(?!\.com)')).Count
        $totalReplaced += $count
        Write-Host "  Rebranded: $($f.Replace($base + '\', ''))"
    }
}

Write-Host ""
Write-Host "Done. Total replacements: $totalReplaced across $($files.Count) files."
