# 📚 Document Intelligence Hub - RAG Application

A powerful Retrieval-Augmented Generation (RAG) application built with Streamlit that enables intelligent querying over PDF documents using advanced AI models.

## 🎯 What is RAG?

Retrieval-Augmented Generation (RAG) combines document retrieval with generative AI to answer questions based on your own documents. Unlike basic LLMs, RAG ensures answers are grounded in your specific data, reducing hallucinations and increasing accuracy.

**How it works:**
1. Documents are chunked and converted to embeddings (numerical representations)
2. Embeddings are stored in a vector database (ChromaDB)
3. User questions are embedded and compared against stored embeddings
4. The most relevant document chunks are retrieved
5. These chunks are passed as context to an LLM (Groq) to generate accurate answers
6. Sources are displayed for transparency

---

## 🚀 Features

- **Fast Document Search**: Semantic search across thousands of pages
- **Accurate Answers**: Grounded in document content using RAG
- **Source Attribution**: See exactly which documents provided the answer
- **Configurable Retrieval**: Adjust the number of retrieved chunks and similarity threshold
- **Beautiful UI**: Dark-themed Streamlit interface with real-time chat
- **Scalable Vector DB**: ChromaDB for efficient embedding storage and retrieval

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Streamlit |
| **LLM** | Groq (llama-3.3-70b) |
| **Embeddings** | Sentence Transformers (all-MiniLM-L6-v2) |
| **Vector DB** | ChromaDB |
| **PDF Processing** | PyPDF |
| **ML Framework** | PyTorch |

---

## 📋 Prerequisites

- Python 3.10 or higher
- Groq API key (free at [https://console.groq.com](https://console.groq.com))
- At least 8GB RAM recommended
- 2GB disk space for models and database

---

## 🔧 Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd "path/to/RAG project"
```

### Step 2: Create a Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

**Note:** First installation may take 5-10 minutes as PyTorch and transformers are downloaded.

### Step 4: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Option 1: Copy the template
cp .env.example .env  # macOS/Linux
copy .env.example .env  # Windows

# Option 2: Manually create .env
echo GROQ_API_KEY=your_key_here > .env
```

**Get your Groq API Key:**
1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Create an account (free)
3. Generate a new API key
4. Add it to your `.env` file:
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
   ```

### Step 5: Prepare Your Documents

1. Create a `data/` folder in the root directory (if not exists)
2. Add PDF files to the `data/` folder
3. Example structure:
   ```
   data/
   ├── document1.pdf
   ├── document2.pdf
   └── document3.pdf
   ```

### Step 6: Ingest Documents into Vector Database

Run the ingestion script to process your PDFs and populate ChromaDB:

```bash
python src/ingest.py
```

**What happens:**
- Reads all PDF files from `data/` folder
- Extracts text from each page
- Chunks text into 500-character pieces (with 100-char overlap)
- Generates embeddings for each chunk
- Stores in ChromaDB vector database

**Output example:**
```
Loaded 150 pages
Created 3650 chunks
```

### Step 7: Launch the Application

```bash
streamlit run src/app.py
```

The app will open in your browser at `http://localhost:8501`

---

## 💡 How to Use

### Basic Usage

1. **Ask Questions**: Type any question in the chat input at the bottom
2. **View Answers**: The AI searches your documents and provides answers
3. **Check Sources**: Click "📚 Sources" to see which documents were used
4. **Adjust Settings**: Use the sidebar sliders to fine-tune retrieval

### Sidebar Controls

- **Retrieved Chunks** (1-10): How many document chunks to retrieve
  - Higher = more context but slower
  - Lower = faster but may miss context

- **Similarity Threshold** (0.5-2.0): Relevance threshold
  - Lower = more permissive (may include unrelated results)
  - Higher = stricter (may miss valid results)
  - Default: 1.2 (recommended)

### Example Questions

```
"What are the main features?"
"How do I get started?"
"Compare product A vs product B"
"Explain the process step by step"
"What is the pricing?"
```

---

## 📁 Project Structure

```
RAG/
├── README.md                 # Documentation
├── requirements.txt          # Python dependencies
├── .env                      # API keys (DO NOT COMMIT)
├── .gitignore               # Git ignore rules
│
├── data/                    # Your PDF documents (create this)
│   ├── document1.pdf
│   └── document2.pdf
│
├── chroma_db/               # Vector database (auto-created)
│   └── [embedding data]
│
└── src/                     # Application source code
    ├── app.py              # Streamlit frontend (main entry point)
    ├── llm.py              # Groq LLM integration
    ├── ingest.py           # PDF processing & ingestion
    ├── query.py            # CLI query interface (optional)
    ├── config.py           # Configuration constants
    └── __pycache__/        # Python cache (auto-created)
```

---

## 🔄 Workflow Overview

### Document Ingestion (One-time)

```
PDFs in data/ folder
    ↓
Extract text (PyPDF)
    ↓
Chunk into pieces (500 chars, 100 char overlap)
    ↓
Generate embeddings (Sentence Transformers)
    ↓
Store in ChromaDB
```

### Query Processing (Real-time)

```
User Question
    ↓
Embed question (same model)
    ↓
Search ChromaDB (vector similarity)
    ↓
Retrieve top-K chunks
    ↓
Check similarity threshold
    ↓
Pass context to Groq LLM
    ↓
Generate answer
    ↓
Display with sources
```

---

## 🚢 Deployment to Streamlit Cloud

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Deploy RAG app to Streamlit Cloud"
git push origin main
```

### Step 2: Create `.streamlit/secrets.toml`

Create file: `.streamlit/secrets.toml`

```toml
GROQ_API_KEY = "your_groq_api_key_here"
```

### Step 3: Deploy to Streamlit Cloud

1. Go to [https://share.streamlit.io](https://share.streamlit.io)
2. Click "New app"
3. Select your GitHub repository
4. Set main file: `src/app.py`
5. Click "Deploy"

### Step 4: Add Secrets in Streamlit Cloud

1. Go to your app settings
2. Click "Secrets"
3. Paste your `.streamlit/secrets.toml` content
4. Save

**Important:** Never commit `.env` to GitHub. Add to `.gitignore` (already done).

---

## ⚙️ Configuration

Edit `src/config.py` to customize:

```python
CHUNK_SIZE = 500          # Characters per chunk
CHUNK_OVERLAP = 100       # Overlap between chunks
TOP_K = 3                 # Default retrieved chunks
THRESHOLD = 1.2           # Default similarity threshold
```

Edit `src/app.py` sidebar section to adjust UI defaults:

```python
top_k = st.slider("Retrieved Chunks", 1, 10, 5)
threshold = st.slider("Similarity Threshold", 0.5, 2.0, 1.2)
```

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'torchvision'"
**Solution:**
```bash
pip install torch torchvision
```

### Issue: "chromadb.errors.InvalidCollectionException"
**Solution:** Run ingestion first:
```bash
python src/ingest.py
```

### Issue: "GROQ_API_KEY not found"
**Solution:** Check `.env` file exists and contains your API key

### Issue: Slow embedding generation
**Solution:** First run downloads the model (~80MB). Subsequent runs are faster.

### Issue: Out of memory
**Solution:** Reduce `CHUNK_SIZE` or `TOP_K` in config

---

## 📊 Performance Tips

1. **Limit PDF size**: Keep individual PDFs under 100MB
2. **Optimize chunks**: Smaller chunks = faster search, fewer hallucinations
3. **Use appropriate K**: TOP_K=3-5 is usually optimal
4. **Monitor threshold**: Adjust based on answer quality

---

## 🔐 Security Best Practices

✅ **Do:**
- Store API keys in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in production
- Rotate API keys regularly

❌ **Don't:**
- Commit `.env` to version control
- Paste API keys in code
- Share API keys publicly
- Use production keys for testing

---

## 🤝 Integration Examples

### Add Custom LLM Model

Edit `src/llm.py`:
```python
response = client.chat.completions.create(
    model="mixtral-8x7b-32768",  # Change model
    temperature=0.2,
    messages=[...]
)
```

Available Groq models:
- llama-3.3-70b-versatile
- mixtral-8x7b-32768
- gemma-7b-it

### Export Chat History

Add to `src/app.py`:
```python
import json
st.download_button(
    label="Download Chat History",
    data=json.dumps(st.session_state.messages, indent=2),
    file_name="chat_history.json"
)
```

---

## 📚 Learning Resources

- [Streamlit Docs](https://docs.streamlit.io)
- [ChromaDB Documentation](https://docs.trychroma.com)
- [Groq API Docs](https://console.groq.com/docs)
- [RAG Best Practices](https://python.langchain.com/docs/use_cases/question_answering)
- [Sentence Transformers](https://www.sbert.net)

---

## 🎓 What You Learned

By using this application, you've learned:
- ✅ RAG architecture and components
- ✅ Vector embeddings and semantic search
- ✅ Document chunking strategies
- ✅ LLM integration (Groq)
- ✅ Streamlit UI development
- ✅ PDF document processing
- ✅ ChromaDB vector database usage
- ✅ Production deployment (Streamlit Cloud)

---

## 📝 Project Metadata

- **Created**: 2026
- **Framework**: Streamlit
- **License**: MIT
- **Python**: 3.10+

---

## 🎉 Next Steps

1. ✅ Install dependencies
2. ✅ Add your PDF documents to `data/`
3. ✅ Run `python src/ingest.py`
4. ✅ Launch with `streamlit run src/app.py`
5. ✅ Deploy to Streamlit Cloud

**Questions?** Check the troubleshooting section or review the source code comments.

---

**Built with ❤️ using Streamlit, ChromaDB, and Groq**
