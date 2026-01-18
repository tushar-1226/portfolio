from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("GMAIL_USER", "tusharrockey1@gmail.com")
SENDER_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
RECEIVER_EMAIL = "tusharrockey1@gmail.com"

# WhatsApp Business API configuration (optional - for automation)
WHATSAPP_API_URL = os.getenv("WHATSAPP_API_URL")  # e.g., WhatsApp Business API endpoint
WHATSAPP_API_TOKEN = os.getenv("WHATSAPP_API_TOKEN")

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        # Get form data
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        message = data.get('message')
        method = data.get('method', 'email')
        
        # Validate data
        if not all([name, message]):
            return jsonify({'error': 'Name and message are required'}), 400
        
        if method == 'whatsapp':
            # WhatsApp handling - just log and return success
            # The actual redirect happens on the frontend
            print(f"WhatsApp contact initiated by {name}")
            return jsonify({
                'success': True, 
                'message': 'WhatsApp redirect initiated'
            }), 200
        
        # Email handling
        if not email:
            return jsonify({'error': 'Email is required for email method'}), 400
            
        return send_email_contact(name, email, phone, message)
        
    except Exception as e:
        print(f"Error handling contact: {str(e)}")
        return jsonify({'error': f'Failed to process request: {str(e)}'}), 500

def send_email_contact(name, email, phone, message):
    """Send contact form via email"""
    try:
        # Create email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Portfolio Contact from {name}'
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Reply-To'] = email
        
        # HTML email body
        phone_html = f'<p style="margin: 10px 0;"><strong>Phone:</strong> {phone}</p>' if phone else ''
        
        html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong>Name:</strong> {name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> {email}</p>
                    {phone_html}
                    <p style="margin: 10px 0;"><strong>Message:</strong></p>
                    <p style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">{message}</p>
                </div>
                <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form via Email method.</p>
            </body>
        </html>
        """
        
        # Attach HTML content
        html_part = MIMEText(html, 'html')
        msg.attach(html_part)
        
        # Send email via Gmail SMTP
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        
        return jsonify({'success': True, 'message': 'Email sent successfully'}), 200
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'error': f'Failed to send email: {str(e)}'}), 500

def send_whatsapp_notification(name, email, phone, message):
    """
    Optional: Send WhatsApp notification using WhatsApp Business API
    This requires a WhatsApp Business API account and configuration
    """
    if not WHATSAPP_API_URL or not WHATSAPP_API_TOKEN:
        print("WhatsApp API not configured")
        return None
    
    try:
        headers = {
            'Authorization': f'Bearer {WHATSAPP_API_TOKEN}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'to': phone,
            'type': 'text',
            'text': {
                'body': f"Thanks {name}! I received your message: {message}\n\nI'll get back to you soon at {email or phone}!"
            }
        }
        
        response = requests.post(WHATSAPP_API_URL, json=payload, headers=headers)
        return response.json()
        
    except Exception as e:
        print(f"Error sending WhatsApp: {str(e)}")
        return None

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    if not SENDER_PASSWORD:
        print(" WARNING: GMAIL_APP_PASSWORD not set in .env file!")
        print("Please create a .env file with your Gmail app password")
    else:
        print(" Email backend running on http://localhost:5000")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
