#!/bin/bash

echo "🚀 Starting FinTrackAI CI/CD Pipeline"
echo "-------------------------------------"

########################################
# 1. Setup Frontend
########################################
echo "📦 Installing frontend dependencies..."
cd frontend || exit
npm install

########################################
# 2. Build Frontend
########################################
echo "🏗️ Building frontend..."
npm run dev # Use 'dev' for development server; use 'build' for production build

########################################
# 4. CI/CD Completed
########################################
echo "🎉 CI/CD completed successfully!"
