#!/bin/bash
set -e

# Display banner
echo "====================================================="
echo "       ControlForge WWW Redirect Fix Script"
echo "====================================================="
echo

# Check if running with appropriate privileges
if [ ! -w "$(dirname "$(readlink -f "$0")")" ]; then
  echo "Please run this script with appropriate privileges"
  exit 1
fi

echo "1. Restarting Docker services..."
cd /home/michael/projects/controlforge-website
docker compose -f prod.compose.yml down
docker compose -f prod.compose.yml up -d

echo 
echo "2. Verifying www redirect functionality..."
echo "Checking HTTP to HTTPS redirect for www subdomain..."
curl -I -s -L http://www.controlforge.dev/ | grep -i "location:" | tail -n 1

echo "Checking HTTPS redirect from www to non-www domain..."
curl -I -s -L https://www.controlforge.dev/ | grep -i "location:" | tail -n 1

echo
echo "3. Requesting reindexing from Google..."
echo "Visit https://search.google.com/search-console to request reindexing"

echo
echo "====================================================="
echo "       Fix Complete - Please verify the changes"
echo "====================================================="
