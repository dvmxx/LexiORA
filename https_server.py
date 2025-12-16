import http.server
import ssl
import os

# --- Configuration ---
HOST = "0.0.0.0"  # Listen on all available interfaces (needed for phone access)
PORT = 8000
CERT_FILE = 'server.pem'
# ---------------------

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    """
    Optional: If you need to serve a specific index file, 
    you could customize the path handling here.
    """
    pass

if not os.path.exists(CERT_FILE):
    print(f"❌ Error: Certificate file '{CERT_FILE}' not found.")
    print("Please run the openssl command in this directory first.")
else:
    # Use the modern SSLContext approach
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER) 
    context.load_cert_chain(CERT_FILE)
    
    server_address = (HOST, PORT)
    httpd = http.server.HTTPServer(server_address, CustomHandler)
    
    try:
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
        
        print(f"✅ Serving files on https://{HOST}:{PORT}")
        print("NOTE: You will need to accept a security warning in your phone's browser.")
        print("Press Ctrl+C to stop the server.")
        
        httpd.serve_forever()
        
    except Exception as e:
        print(f"An error occurred while running the server: {e}")
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()