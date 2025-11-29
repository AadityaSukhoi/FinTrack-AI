#!/bin/bash

echo "🚀 Starting FinTrackAI CI/CD Pipeline"
echo "-------------------------------------"

########################################
# 1. Install Backend Dependencies
########################################
echo "📦 Installing backend dependencies..."
pip install --upgrade pip
pip install -r backend/requirements.txt

########################################
# 2. Run Backend Tests (optional)
########################################
echo "🧪 Running backend tests..."
# pytest backend/ --disable-warnings -q || true
echo "⚠️ No tests implemented — skipping."

########################################
# 3. Start Backend
########################################
echo "🔍 Starting backend..."
uvicorn backend.main:app --host 0.0.0.0 --port 8000 

########################################
# 8. CI/CD Completed
########################################
echo "🎉 CI/CD completed successfully!"
