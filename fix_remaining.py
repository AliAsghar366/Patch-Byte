import os

root = r'd:\zeesha\Patch-Byte-main\Patch-Byte-main\frontend\patchkraze.com'
replacements = {
    'techniques.\\n\ufffd","headline":"': 'techniques.\\n—","headline":"',
    "as available\ufffd without": 'as available" without',
    "Processing\ufffd';": "Processing…';",
    "\ufffdFeedback\ufffd": '"Feedback"',
    "\ufffdjunk mail,\ufffd \ufffdchain ": '"junk mail," "chain ',
    "letter,\ufffd 'spam,\ufffd": 'letter," "spam,"',
    "attorneys\ufffd fees": "attorneys' fees",
}

count = 0
for dirpath, dirnames, filenames in os.walk(root):
    for fn in filenames:
        if not fn.endswith('.html'):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content = content
        for old, new in replacements.items():
            new_content = new_content.replace(old, new)
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1

print('Fixed', count, 'files')
