#!/bin/bash
# Setup Resend DNS Records for go-rocco.com via Cloudflare API
# This script adds the necessary DKIM, SPF, and return-path records
# for sending emails from noreply@go-rocco.com via Resend

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🐾 Go Rocco - Resend DNS Setup"
echo "=============================="
echo ""

# Check for required environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}Error: CLOUDFLARE_API_TOKEN environment variable is not set${NC}"
    echo "Please set it with: export CLOUDFLARE_API_TOKEN='your-api-token'"
    exit 1
fi

# Configuration
DOMAIN="go-rocco.com"
API_BASE="https://api.cloudflare.com/client/v4"

# Get Zone ID for go-rocco.com
echo "📍 Finding zone ID for ${DOMAIN}..."
ZONE_RESPONSE=$(curl -s -X GET "${API_BASE}/zones?name=${DOMAIN}" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json")

ZONE_ID=$(echo "$ZONE_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$ZONE_ID" ]; then
    echo -e "${RED}Error: Could not find zone ID for ${DOMAIN}${NC}"
    echo "Response: $ZONE_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✓ Found zone ID: ${ZONE_ID}${NC}"
echo ""

# Function to add DNS record
add_dns_record() {
    local TYPE=$1
    local NAME=$2
    local CONTENT=$3
    local PRIORITY=$4  # Only used for MX records
    
    echo "Adding ${TYPE} record: ${NAME}..."
    
    local DATA="{\"type\":\"${TYPE}\",\"name\":\"${NAME}\",\"content\":\"${CONTENT}\",\"ttl\":3600}"
    
    if [ "$TYPE" = "MX" ]; then
        DATA="{\"type\":\"${TYPE}\",\"name\":\"${NAME}\",\"content\":\"${CONTENT}\",\"ttl\":3600,\"priority\":${PRIORITY}}"
    fi
    
    RESPONSE=$(curl -s -X POST "${API_BASE}/zones/${ZONE_ID}/dns_records" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "$DATA")
    
    SUCCESS=$(echo "$RESPONSE" | grep -o '"success":true' || echo "")
    
    if [ -n "$SUCCESS" ]; then
        echo -e "${GREEN}  ✓ Added successfully${NC}"
    else
        # Check if record already exists
        ALREADY_EXISTS=$(echo "$RESPONSE" | grep -o "already exists" || echo "")
        if [ -n "$ALREADY_EXISTS" ]; then
            echo -e "${YELLOW}  ⚠ Record already exists (skipping)${NC}"
        else
            echo -e "${RED}  ✗ Failed to add record${NC}"
            echo "  Response: $RESPONSE"
        fi
    fi
}

echo "📧 Adding Resend DNS Records..."
echo "================================"
echo ""

# Note: These are placeholder values. You'll need to get the actual values from Resend.
# After signing up at resend.com and adding your domain, Resend will provide:
# 1. A DKIM record (CNAME)
# 2. An SPF record (TXT)
# 3. A Return-Path record (CNAME)

echo -e "${YELLOW}⚠ IMPORTANT: You need to get the actual DNS values from Resend!${NC}"
echo ""
echo "Steps to complete setup:"
echo "1. Sign up at https://resend.com"
echo "2. Go to Domains and click 'Add Domain'"
echo "3. Enter: go-rocco.com"
echo "4. Resend will show you 3 DNS records to add"
echo "5. Update this script with those values, OR"
echo "6. Add them manually in Cloudflare DNS dashboard"
echo ""

# Uncomment and update these with actual Resend values:

# DKIM Record (get from Resend - looks like resend._domainkey.go-rocco.com)
# add_dns_record "CNAME" "resend._domainkey" "YOUR_DKIM_VALUE_FROM_RESEND.dkim.resend.dev"

# SPF Record (add to existing SPF or create new)
# add_dns_record "TXT" "@" "v=spf1 include:_spf.resend.com ~all"

# Return-Path Record
# add_dns_record "CNAME" "send" "send.resend.dev"

echo ""
echo "📋 Once you have the Resend DNS values, you can either:"
echo "   1. Run this script with updated values"
echo "   2. Add them via Cloudflare Dashboard (DNS > Records)"
echo ""
echo "🔗 Resend Domain Setup: https://resend.com/domains"
echo "🔗 Cloudflare DNS: https://dash.cloudflare.com/?to=/:account/:zone/dns"
echo ""
echo -e "${GREEN}Setup instructions complete!${NC}"
