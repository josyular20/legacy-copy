#!/bin/bash

# Navigate to the server directory
cd "$(dirname "$0")"/../../legacy/server/src

# Print the current working directory
echo "Current working directory: $(pwd)"

APP_NAME="server"

# Function to kill the process
killapp() {
    if [[ "$OSTYPE" == "linux-gnu" || "$OSTYPE" == "darwin"* ]]; then
        PID=$(lsof -i :8080 | grep "main" | awk '{print $2}')
        if [ -n "$PID" ]; then
            kill "$PID"
            echo "Killed $APP_NAME - Process $PID"
        fi
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # For Windows
        TASKLIST_OUTPUT=$(tasklist | findstr "main")
        if [ -n "$TASKLIST_OUTPUT" ]; then
            TASKKILL_OUTPUT=$(taskkill /F /IM "main.exe")
            echo "Killed $APP_NAME - Process $TASKKILL_OUTPUT"
        fi
    else
        echo "Unsupported OS: $OSTYPE"
    fi
}

# Run the 'air' command in the background
air &

# Store the process ID of 'air'
AIR_PID=$!

# Ensure the killapp function is executed on interruption (Ctrl+C)
trap 'killapp' INT

# Wait for the 'air' process to end
wait $AIR_PID

echo "Air process has ended."
