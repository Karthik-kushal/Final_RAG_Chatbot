from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import chromadb
import sys
import os

# Add parent directory to path
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
except:
    parent_dir = os.getcwd()

sys.path.insert(0, parent_dir)

from src.llm import generate_answer
from src.config import CHROMA_PATH, THRESHOLD

app = Flask(__name__)
CORS(app)

# Global variables for lazy loading
model = None
collection = None

def load_models():
    global model, collection
    if model is None:
        print("Loading Model...", flush=True)
        model = SentenceTransformer("all-MiniLM-L6-v2")
        print("Model loaded!", flush=True)
    
    if collection is None:
        print("Connecting To ChromaDB...", flush=True)
        client = chromadb.PersistentClient(path=CHROMA_PATH)
        collection = client.get_collection("documents")
        print("Connected to ChromaDB!", flush=True)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/api/query", methods=["POST"])
def query():
    global model, collection
    
    # Load models on first query
    load_models()
    
    data = request.json
    question = data.get("question", "")
    
    if not question:
        return jsonify({"error": "Question is required"}), 400
    
    try:
        # Embed query
        query_embedding = model.encode(question).tolist()
        
        # Retrieve documents + distances
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=8,
            include=["documents", "metadatas", "distances"]
        )
        
        best_distance = results["distances"][0][0]
        
        # Guardrail for unrelated questions
        if best_distance > THRESHOLD:
            return jsonify({
                "answer": "I could not find this information in the provided documents.",
                "sources": [],
                "similarity_distance": float(best_distance)
            }), 200
        
        # Build context
        context = "\n\n".join(results["documents"][0])
        
        # Generate answer
        answer = generate_answer(question, context)
        
        # Extract unique sources
        sources = []
        shown = set()
        
        for meta in results["metadatas"][0]:
            source = f"{meta['source']} (Page {meta['page']})"
            if source not in shown:
                sources.append({
                    "name": meta["source"],
                    "page": meta["page"],
                    "full": source
                })
                shown.add(source)
        
        return jsonify({
            "answer": answer,
            "sources": sources,
            "similarity_distance": float(best_distance)
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}", flush=True)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Starting Flask server on port 5000...", flush=True)
    app.run(debug=False, host="0.0.0.0", port=5000)
