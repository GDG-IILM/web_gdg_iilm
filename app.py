from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from flask_cors import CORS



# Configure Google Generative AI
genai.configure(api_key="AIzaSyCJp7XuMNu2Ynl1AlxZoLUmRRXMGm_pYAE")

generation_config = {
    "temperature": 0.4,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "stop_sequences": ["bye", "exit", "quit", "goodbye"],
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction=(
        "You are Sophia, the mentor of computer science undergrad students. "
        "You solve the queries of the student related to their career paths and technical difficulties. "
        "Use little humor to make the conversation interesting. Answer in a concise and brief manner."
        "Use Good Formatting and Grammar and provide to the point answers to the queries."
    ),
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Route for the chatbot interface
@app.route("/")
def index():
    return render_template("chatbot.html")

# Route for chatbot interaction
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    history = data.get("history", [])

    chat_session = model.start_chat(history=history)
    response = chat_session.send_message(user_input)
    model_response = response.text

    # Append to history
    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [model_response]})

    return jsonify({"response": model_response, "history": history})

if __name__ == "__main__":
    app.run(debug=True)