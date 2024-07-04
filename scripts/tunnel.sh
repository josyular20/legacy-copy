#!/bin/bash

echo "Starting tunnel..."

# Function to check if a command is available
command_exists() {
	command -v "$1" >/dev/null 2>&1
}

# Function to install localtunnel if not already installed
install_localtunnel() {
	if ! command_exists "lt"; then
		npm install -g localtunnel
	fi
}

# Function to check the operating system
get_os() {
	case "$(uname -s)" in
		Linux*)   os="linux";;
		Darwin*)  os="mac";;
		CYGWIN*|MINGW32*|MSYS*) os="windows";;
		*)        os="unknown";;
	esac
	echo $os
}

# Get the operating system
current_os=$(get_os)

# Get the current directory
current_dir=$(pwd)

install_localtunnel

# Open first terminal based on the operating system and run the tunnel command
if [ "$current_os" == "linux" ]; then
 gnome-terminal --tab --title="Tunnel" --command="bash -c 'cd $current_dir; lt --port 8080 --subdomain legacy; exec bash'" & disown
    sleep 5
    gnome-terminal --tab --title="Server" --command="bash -c 'cd $current_dir/../server/src; go run main.go; exec bash'" & disown
    sleep 5
    gnome-terminal --tab --title="Client" --command="bash -c 'cd $current_dir/../client-new; npx expo start --dev-client; exec bash'" & disown
elif [ "$current_os" == "mac" ]; then
	osascript -e "tell app \"Terminal\" to do script \"cd $current_dir; lt --port 8080 --subdomain legacy\""
	sleep 5	
	osascript -e "tell app \"Terminal\" to do script \"cd $current_dir/../server/src; go run main.go\""
	sleep 5
	osascript -e "tell app \"Terminal\" to do script \"cd $current_dir/../client-new; npx expo start --dev-client\""
elif [ "$current_os" == "windows" ]; then
	start cmd.exe /K "cd $current_dir && lt --port 8080 --subdomain legacy"
	sleep 5
	start cmd.exe /K "cd $current_dir/../server/src && go run main.go"
	sleep 5
	start cmd.exe /K "cd $current_dir/../client-new && npx expo start --dev-client"
else
	echo "Unsupported operating system"
	exit 1
fi