# 🚀 Quick Start Guide

Get your RAG app running in 5 minutes!

## 1️⃣ Set Up Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 2️⃣ Configure API Key

```bash
# Copy the template
cp .env.example .env

# Edit .env and add your Groq API key
# Get it from: https://console.groq.com/keys
```

Example `.env`:
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

## 3️⃣ Add Your Documents

```bash
# Create data folder
mkdir data

# Add your PDFs
# Copy your PDF files into the data/ folder
```

Supported formats: `.pdf`

## 4️⃣ Process Documents

```bash
# Ingest and process PDFs
python src/ingest.py

# Output example:
# Loaded 150 pages
# Created 3650 chunks
```

This creates a `chroma_db/` folder with embeddings.

## 5️⃣ Launch App

```bash
# Start Streamlit
streamlit run src/app.py

# Opens at http://localhost:8501
```

## ✅ You're Done!

Start asking questions about your documents! 🎉

---

## 📊 Tips

- **First run**: Initial embedding download ~80MB, takes 1-2 min
- **Faster starts**: Subsequent runs are much faster (models cached)
- **Better results**: 
  - Use PDFs with clear text (OCR-scanned PDFs may not work well)
  - Ask specific questions
  - Check similarity threshold if no results found

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| "ModuleNotFoundError" | `pip install -r requirements.txt` |
| "GROQ_API_KEY not found" | Check `.env` file exists in root folder |
| "Collection not found" | Run `python src/ingest.py` first |
| Slow responses | First run is slow (model download), check internet |
| Out of memory | Reduce chunk size in `src/config.py` |

---

## 🔗 Useful Links

- 📖 [Full Documentation](README.md)
- 🔑 [Get Groq API Key](https://console.groq.com/keys)
- 🚢 [Deploy to Streamlit Cloud](https://share.streamlit.io)
- 💬 [Streamlit Docs](https://docs.streamlit.io)

---

**Ready? Start with Step 1! 👆**
