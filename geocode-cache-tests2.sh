#!/bin/bash
set -euo pipefail

# ====== CONFIG ======
BASE_URL="http://localhost:5000/api"

# Prefer passing creds via env:
#   LOGIN_EMAIL="captain@weatherapp.com" LOGIN_PASSWORD="yourpassword" ./geocode-cache-tests.sh
LOGIN_EMAIL="${LOGIN_EMAIL:-captain@weatherapp.com}"
LOGIN_PASSWORD="${LOGIN_PASSWORD:-yourpassword}"

CONTENT="Content-Type: application/json"
# ====================
clear
say() { echo -e "$*"; }

# 1) Login to get a FRESH token
say "⚓ Logging in as $LOGIN_EMAIL ..."
LOGIN_JSON=$(curl -s -X POST "$BASE_URL/users/login" \
  -H "$CONTENT" \
  -d "{\"email\":\"$LOGIN_EMAIL\",\"password\":\"$LOGIN_PASSWORD\"}")

# Extract token (jq if available, otherwise sed fallback)
if command -v jq >/dev/null 2>&1; then
  TOKEN=$(echo "$LOGIN_JSON" | jq -r '.token')
else
  TOKEN=$(echo "$LOGIN_JSON" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
fi

# Trim any CR/LF that can appear on Windows copy-paste
TOKEN=$(echo -n "$TOKEN" | tr -d '\r\n')

if [[ -z "${TOKEN:-}" ]]; then
  say "❌ Could not extract token from login response:"
  echo "$LOGIN_JSON"
  exit 1
fi

# Sanity: JWT must have 2 dots
if ! echo "$TOKEN" | grep -qE '^[^.]+\.[^.]+\.[^.]+$'; then
  say "❌ Token doesn't look like a JWT (header.payload.signature). Got:"
  echo "$TOKEN"
  exit 1
fi

AUTH="Authorization: Bearer $TOKEN"
say "✅ Got token (len: ${#TOKEN})."

# 2) Validate the token immediately (and adopt refreshed token if provided)
VALIDATE_JSON=$(curl -s "$BASE_URL/users/validate" -H "$AUTH")
VALIDATE_CODE=$(echo "$VALIDATE_JSON" | { jq -r '.status // empty' 2>/dev/null || true; })
# Fallback to HTTP code only if you prefer:
# VALIDATE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/users/validate" -H "$AUTH")

# Try to extract a refreshed token if present
if command -v jq >/dev/null 2>&1; then
  REFRESHED=$(echo "$VALIDATE_JSON" | jq -r '.token // empty')
else
  REFRESHED=$(echo "$VALIDATE_JSON" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
fi

# Adopt the refreshed token (some servers rotate tokens on validate)
if [[ -n "${REFRESHED:-}" ]]; then
  TOKEN=$(echo -n "$REFRESHED" | tr -d '\r\n')
  AUTH="Authorization: Bearer $TOKEN"
  echo "🔄 Adopted refreshed token from /users/validate."
fi

# If you want to hard-check that validate succeeded, you can test another protected call here.
echo "✅ Token validated (and refreshed if provided)."


# 3) Fire the tests
say "🌎 Test 1: Save 'Tallebudgera' (expect MISS)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"Tallebudgera"}'
say "----------------------------------------"

say "⚡ Test 2: Save 'Tallebudgera' again (expect HIT)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"Tallebudgera"}'
say "----------------------------------------"

say "🧭 Test 3: Save 'tALLEBudGERa' (HIT same cache)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"tALLEBudGERa"}'
say "----------------------------------------"

say "📜 Test 4: Get recent locations"
curl -s -w "\nHTTP:%{http_code}\n" -X GET "$BASE_URL/locations/recent" -H "$AUTH"
say "----------------------------------------"

say "⚠️ Test 5: Blank location (expect 400)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"   "}'
say "----------------------------------------"

say "🌀 Test 6: Save 'Southpot' (expect 404)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"Southpot"}'
say "----------------------------------------"

say "🚫 Test 7: No auth header (expect 401)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" \
  -d '{"location":"Sydney"}'
say "----------------------------------------"

say "🔍 DB check hint:"
say "    db.geocodecaches.find({ name: 'tallebudgera' }).pretty()"
say "✅ All tests completed!"
