#!/usr/bin/env python3
"""
Apply Spanish translations to Cloudflare D1 database
This script reads the SQL file and applies translations in batches
"""

import subprocess
import sys
import time

TOKEN = "y7zbytJsoYc_HNof7aViHv_Nu39oPrXWsUL7FMLj"

# Read the SQL file
with open('seed_nist_csf_translations_spanish.sql', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by INSERT statements
statements = []
current = ""
for line in content.split('\n'):
    if line.strip().startswith('INSERT OR REPLACE'):
        if current:
            statements.append(current.strip())
        current = line
    elif line.strip() and not line.strip().startswith('--'):
        current += " " + line
        
if current:
    statements.append(current.strip())

print(f"Found {len(statements)} INSERT statements to execute")

# Execute each statement
success = 0
failed = 0

for i, stmt in enumerate(statements, 1):
    if not stmt:
        continue
        
    print(f"\rApplying {i}/{len(statements)}...", end='', flush=True)
    
    try:
        result = subprocess.run([
            'npx', 'wrangler', 'd1', 'execute', 'nist-csf-db',
            '--remote', '--command', stmt
        ], capture_output=True, text=True, timeout=30,
        env={'CLOUDFLARE_API_TOKEN': TOKEN, **subprocess.os.environ})
        
        if result.returncode == 0:
            success += 1
        else:
            failed += 1
            if 'FOREIGN KEY' in result.stderr:
                print(f"\n  ⚠️  Skipping statement {i} (foreign key issue)")
            else:
                print(f"\n  ❌ Error in statement {i}: {result.stderr[:100]}")
        
        # Rate limiting
        time.sleep(0.5)
        
    except Exception as e:
        failed += 1
        print(f"\n  ❌ Exception in statement {i}: {str(e)}")

print(f"\n\n✅ Success: {success}")
print(f"❌ Failed: {failed}")
print(f"📊 Total: {len(statements)}")
