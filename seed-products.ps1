
$base = "C:\Users\MOS\Desktop\New folder (2)\frontend\patchkraze.com\products"
$supabaseUrl = "https://hjnowvzxusjjyhxxgdji.supabase.co"
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqbm93dnp4dXNqanloeHhnZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NjE2MzgsImV4cCI6MjA5NDUzNzYzOH0.vf-N61uWE7A3vaEgxFPNYvKvggZ7ppl1JnEldm3Ofxs"

$files = [System.IO.Directory]::GetFiles($base, "*.html") |
    Where-Object { $_ -notmatch '@variant|@page|oembed' }

Write-Host "Seeding $($files.Count) products..."

$headers = @{
    "apikey"        = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type"  = "application/json"
    "Prefer"        = "return=minimal"
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$success = 0; $failed = 0

foreach ($file in $files) {
    $slug = [System.IO.Path]::GetFileNameWithoutExtension($file)
    $html = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

    # Extract product name
    $name = [regex]::Match($html, '<title>([^<|–-]+)').Groups[1].Value.Trim()
    if (-not $name) { $name = $slug -replace '-', ' ' }
    $name = [regex]::Replace($name, '\s*[–-]\s*(PatchByte|patchkraze).*$', '').Trim()

    # Extract price (first occurrence of $XX.XX)
    $priceMatch = [regex]::Match($html, '\$\s*(\d+(?:\.\d{2})?)')
    $price = if ($priceMatch.Success) { [decimal]$priceMatch.Groups[1].Value } else { 0 }

    # Extract description from meta
    $desc = [regex]::Match($html, 'name="description" content="([^"]+)"').Groups[1].Value
    if (-not $desc) { $desc = "" }

    # Extract first local images
    $imgMatches = [regex]::Matches($html, 'src="(/cdn/shop/files/[^"?]+\.(?:jpg|jpeg|png|webp))"')
    $images = @()
    foreach ($m in $imgMatches) {
        $img = $m.Groups[1].Value
        if ($images -notcontains $img) { $images += $img }
        if ($images.Count -ge 3) { break }
    }

    # Extract category from slug keywords
    $category = "patches"
    if ($slug -match 'leather') { $category = "leather" }
    elseif ($slug -match 'chenille') { $category = "chenille" }
    elseif ($slug -match 'pvc|rubber|silicone') { $category = "pvc" }
    elseif ($slug -match 'woven') { $category = "woven" }
    elseif ($slug -match 'sticker|dtf|transfer') { $category = "other" }
    elseif ($slug -match 'velcro') { $category = "velcro" }
    elseif ($slug -match 'hat|cap|beanie|bucket') { $category = "headwear" }

    # Build payload using ConvertTo-Json for safe escaping
    $payload = [ordered]@{
        slug        = $slug
        name        = $name
        description = $desc
        price       = $price
        category    = $category
        images      = $images
        in_stock    = $true
    }
    $body = $payload | ConvertTo-Json -Compress

    try {
        $r = Invoke-WebRequest "$supabaseUrl/rest/v1/products" -Method POST -Headers $headers -Body $body -UseBasicParsing -ErrorAction Stop
        $success++
        Write-Host "  OK: $slug ($price)"
    } catch {
        $failed++
        $errMsg = $_.Exception.Message
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $errMsg = $reader.ReadToEnd()
        }
        Write-Host "  FAIL: $slug - $errMsg"
    }
}

Write-Host ""
Write-Host "Done. Success: $success  Failed: $failed"
