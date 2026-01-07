# LexiORA
Starting the Server

1. Navigate to your project directory (you're already there):
   cd C:\Users\roggi\Desktop\LexiORA

2. Start the HTTPS server:
   python https_server.py

You should see:
Serving files on https://0.0.0.0:8000
NOTE: You will need to accept a security warning in your phone's browser.
Press Ctrl+C to stop the server.

Finding Your IP Address

Open a new terminal (keep the server running) and run:
ipconfig

Look for your WiFi adapter and find the IPv4 Address. It will look something like:
- 10.x.x.x (common for university networks)
- 192.168.x.x (common for home networks)

Accessing from Mobile

1. Make sure your phone is on the same university WiFi network
2. Open your phone's browser and go to:
   https://YOUR_IP_ADDRESS:8000/LexiORA/templates/welcome-screen.html

For example: https://10.130.45.89:8000/LexiORA/templates/welcome-screen.html

3. Accept the security warning:
   - Your browser will warn about the self-signed certificate
   - On Chrome: Tap "Advanced" → "Proceed to [IP] (unsafe)"
   - On Safari: Tap "Show Details" → "visit this website"
   - This is safe because it's your own certificate
4. Test the camera - click "Take a Tour" then "Allow Camera Access"

Important Notes for University WiFi

Your university WiFi might have AP Isolation (client isolation) enabled, which prevents devices from seeing each other. If you can't connect:

Alternative Solution:
1. Create a mobile hotspot on your phone
2. Connect your computer to your phone's hotspot
3. Find your computer's new IP address (it will be different)
4. Access the app from your phone using the new IP
