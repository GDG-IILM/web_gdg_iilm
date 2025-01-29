# from flask import Flask, render_template, request, jsonify
# import google.generativeai as genai

# # Configure Google Generative AI with the new API key
# genai.configure(api_key="AIzaSyAX9DVo1ADQBARl5xtE-uUudXbOTbHVQl8")

# generation_config = {
#     "temperature": 0.4,
#     "top_p": 0.95,
#     "top_k": 40,
#     "max_output_tokens": 8192,
#     "stop_sequences": ["bye", "exit", "quit", "goodbye"],
#     "response_mime_type": "text/plain",
# }

# model = genai.GenerativeModel(
#     model_name="gemini-2.0-flash-exp",
#     generation_config=generation_config
# )

# # Initialize Flask app
# app = Flask(__name__)

# # Route for the chatbot interface
# @app.route("/")
# def index():
#     return render_template("C:\\Users\\sharm\\Documents\\GitHub\\web_gdg_iilm\\public\\chatbot\\templates\\index.html")

# # Route for chatbot interaction
# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.json
#     user_input = data.get("message", "")
#     history = data.get("history", [])

#     chat_session = model.start_chat(history=history)  # You might set system_instruction here if needed
#     response = chat_session.send_message(user_input)
#     model_response = response.text

#     # Append to history
#     history.append({"role": "user", "parts": [user_input]})
#     history.append({"role": "model", "parts": [model_response]})

#     return jsonify({"response": model_response, "history": history})

# if __name__ == "__main__":
#     app.run(debug=True)
