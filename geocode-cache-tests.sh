#!/bin/bash
# ============================================================
# Geocode Cache API Test Suite for WeatherLink
# Captain’s automated cannon fire sequence
# ============================================================

# ------------- CONFIG -------------
BASE_URL="http://localhost:5000/api"
TOKEN="<YOUR_JWT_TOKEN_HERE>"  # Replace this with a valid JWT
CONTENT="Content-Type: application/json"
AUTH="Authorization: Bearer $TOKEN"
# ---------------------------------

echo "⚓ Starting Geocode Cache test suite..."
echo "----------------------------------------"

# 1️⃣ MISS test (first save)
echo "🌎 Test 1: Save 'Tallebudgera' (expect MISS)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"Tallebudgera"}'
echo "----------------------------------------"

# 2️⃣ HIT test (second save)
echo "⚡ Test 2: Save 'Tallebudgera' again (expect HIT)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"Tallebudgera"}'
echo "----------------------------------------"

# 3️⃣ Case normalization test
echo "🧭 Test 3: Save 'tALLEBudGERa' (should HIT same cache entry)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"tALLEBudGERa"}'
echo "----------------------------------------"

# 4️⃣ Get recent locations
echo "📜 Test 4: Get recent locations"
curl -s -w "\nHTTP:%{http_code}\n" -X GET "$BASE_URL/locations/recent" \
  -H "$AUTH"
echo "----------------------------------------"

# 5️⃣ Blank location test
echo "⚠️ Test 5: Blank location (expect 400)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"   "}'
echo "----------------------------------------"

# 6️⃣ Nonsense location test
echo "🌀 Test 6: Save 'Southpot' (expect 404)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" -H "$AUTH" \
  -d '{"location":"Southpot"}'
echo "----------------------------------------"

# 7️⃣ Missing token test
echo "🚫 Test 7: No auth header (expect 401)"
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$BASE_URL/locations" \
  -H "$CONTENT" \
  -d '{"location":"Sydney"}'
echo "----------------------------------------"

# 8️⃣ DB check reminder
echo "🔍 After running these, check Mongo for geocode cache entry:"
echo "    db.geocodecaches.find({ name: 'tallebudgera' }).pretty()"
echo "----------------------------------------"

echo "✅ All tests completed! Review logs for HIT/MISS and status codes."
