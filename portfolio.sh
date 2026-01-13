#!/bin/bash

# Portfolio App Startup Script
# Runs both Next.js frontend and Python backend

echo " Starting Portfolio Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}  Warning: backend/.env file not found!${NC}"
    echo "Please create backend/.env with your Gmail credentials:"
    echo "  GMAIL_USER=tusharrockey1@gmail.com"
    echo "  GMAIL_APP_PASSWORD=your_app_password"
    echo ""
    read -p "Press Enter to continue anyway or Ctrl+C to exit..."
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${BLUE} Shutting down Portfolio Application...${NC}"
    kill 0
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Python backend
echo -e "${GREEN} Starting Python Email Backend...${NC}"
cd backend
source venv/bin/activate
python3 server.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start Next.js frontend
echo -e "${GREEN} Starting Next.js Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN} Portfolio Application is running!${NC}"
echo ""
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait
