
$base     = "C:\Users\MOS\Desktop\New folder (2)\frontend\patchkraze.com\products"
$cdnLocal = "C:\Users\MOS\Desktop\New folder (2)\frontend\cdn\shop\files"
$cdnUrl   = "https://cdn.shopify.com/s/files/1/0661/2965/7940/files"

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Collect all unique image refs from product pages (no @variant pages)
$allRefs = @{}
Get-ChildItem $base -Filter "*.html" | Where-Object { $_.Name -notmatch '@' } | ForEach-Object {
    $html = [System.IO.File]::ReadAllText($_.FullName)
    [regex]::Matches($html, '/cdn/shop/files/([^"?\s]+\.(?:jpg|jpeg|png|webp|gif))',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase) | ForEach-Object {
        $allRefs[$_.Groups[1].Value] = 1
    }
}

# Also scan index, collections, blogs
$extraBase = "C:\Users\MOS\Desktop\New folder (2)\frontend\patchkraze.com"
@("index.html") + (Get-ChildItem "$extraBase\collections" -Filter "*.html" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName) | ForEach-Object {
    if (Test-Path $_) {
        $html = [System.IO.File]::ReadAllText($_)
        [regex]::Matches($html, '/cdn/shop/files/([^"?\s]+\.(?:jpg|jpeg|png|webp|gif))',
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase) | ForEach-Object {
            $allRefs[$_.Groups[1].Value] = 1
        }
    }
}

$missing = $allRefs.Keys | Where-Object {
    $localPath = if ($_ -match '/') {
        Join-Path $cdnLocal (Split-Path $_ -Parent) | Join-Path -ChildPath (Split-Path $_ -Leaf)
    } else {
        Join-Path $cdnLocal $_
    }
    -not (Test-Path $localPath)
}

Write-Host "Total unique refs: $($allRefs.Count)  Missing: $($missing.Count)"
Write-Host "Downloading..."

$ok = 0; $fail = 0; $i = 0

foreach ($ref in $missing) {
    $i++
    # Handle subdirectory paths like preview_images/file.jpg
    $subDir  = Split-Path $ref -Parent
    $fileName = Split-Path $ref -Leaf
    $localDir = if ($subDir) { Join-Path $cdnLocal $subDir } else { $cdnLocal }

    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }

    $localFile = Join-Path $localDir $fileName
    $remoteUrl = if ($subDir) { "$cdnUrl/$ref" } else { "$cdnUrl/$ref" }

    try {
        Invoke-WebRequest $remoteUrl -OutFile $localFile -UseBasicParsing -ErrorAction Stop -TimeoutSec 15
        $ok++
        if ($i % 25 -eq 0) { Write-Host "  [$i] $ok downloaded, $fail failed" }
    } catch {
        $fail++
    }
}

Write-Host ""
Write-Host "Done. Downloaded: $ok  Failed: $fail"
