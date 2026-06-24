# 🚢 Deployment Guide - Streamlit Cloud

Deploy your RAG app to Streamlit Cloud (free hosting with auto-scaling).

## Prerequisites

- GitHub account
- Groq API key
- Streamlit Cloud account (free at https://share.streamlit.io)

---

## Step 1: Prepare Your Repository

### 1.1 Ensure `.gitignore` is Correct

Your `.gitignore` should exclude:
```
.env
.env.local
.streamlit/secrets.toml
chroma_db/
__pycache__/
venv/
```

### 1.2 Commit to GitHub

```bash
# Check status
git status

# Add all files
git add .

# Commit (excluding .gitignored files)
git commit -m "Prepare RAG app for Streamlit Cloud deployment"

# Push to GitHub
git push origin main
```

**Important:** Never push `.env` file! It should be in `.gitignore`.

### 1.3 Verify Project Structure

Your GitHub repository should have:
```
your-repo/
├── README.md
├── QUICKSTART.md
├── DEPLOYMENT.md
├── requirements.txt
├── .env.example
├── .gitignore
├── .streamlit/
│   └── config.toml
├── data/
│   ├── sample1.pdf
│   └── sample2.pdf
└── src/
    ├── app.py
    ├── llm.py
    ├── ingest.py
    └── ...
```

---

## Step 2: Create Streamlit Cloud Account

1. Go to https://share.streamlit.io
2. Click "Sign up" or "Sign in with GitHub"
3. Connect your GitHub account
4. Grant necessary permissions

---

## Step 3: Deploy Your App

### 3.1 Click "New app"

- Repository: Select your RAG repository
- Branch: `main` (or your branch)
- Main file path: `src/app.py`

### 3.2 Configure Settings

Click "Advanced settings" and set:

```
Python version: 3.10
```

### 3.3 Click "Deploy"

Streamlit will:
1. Clone your repository
2. Install `requirements.txt`
3. Run `src/app.py`
4. Generate a public URL

This takes 2-3 minutes. ⏳

---

## Step 4: Add Secrets

Secrets are environment variables that don't get committed to GitHub.

### 4.1 Go to App Settings

In your Streamlit Cloud dashboard:
1. Click your app
2. Click "Settings" (⚙️ icon)
3. Click "Secrets" in the left sidebar

### 4.2 Add Your Secrets

Paste your configuration in the Secrets editor:

```toml
# Secrets for Streamlit Cloud
GROQ_API_KEY = "gsk_xxxxxxxxxxxxxxxxxxxx"
```

Click "Save". The app will automatically restart.

---

## Step 5: Upload Sample Data (Optional)

By default, the `data/` folder contains PDFs which are committed to Git.

### Option A: Keep PDFs in Repository (Recommended for public data)

```bash
# Add your PDFs to data/ folder
cp /path/to/your/documents/*.pdf data/

# Commit to Git
git add data/
git commit -m "Add sample documents"
git push
```

**Pros:** Everyone can see what's in the app
**Cons:** Large PDFs slow down deployments

### Option B: Upload via UI (Not available in free tier)

The free Streamlit Cloud tier doesn't support file uploads to persistent storage.

### Option C: Initialize via Script

You can add auto-initialization to `app.py`:

```python
@st.cache_resource
def initialize_data():
    # Check if data exists
    if not os.path.exists("chroma_db"):
        # Download or create initial data
        pass
    
initialize_data()
```

---

## Step 6: Verify Deployment

### 6.1 Check App is Running

1. Go to your app URL (shown in Streamlit Cloud)
2. You should see the "Document Intelligence Hub" interface
3. Try asking a question

### 6.2 Monitor Logs

In Streamlit Cloud dashboard:
- Click your app
- Click "Manage app" → "View logs"
- Check for errors

### 6.3 Test API Connection

Try a sample query:
```
"What is this document about?"
```

If you see:
- ✅ **Response received**: Deployment successful!
- ❌ **"GROQ_API_KEY not found"**: Check secrets in step 4
- ❌ **"Collection not found"**: Run ingestion locally first

---

## Common Issues & Solutions

### Issue: "ModuleNotFoundError"

**Cause:** Missing dependency in `requirements.txt`

**Solution:**
```bash
# Locally:
pip list > /tmp/installed.txt

# Check if missing modules are there
# Add missing modules to requirements.txt
git add requirements.txt
git commit -m "Add missing dependencies"
git push

# Redeploy: Click app → Rerun
```

### Issue: "GROQ_API_KEY not found"

**Cause:** Secrets not configured

**Solution:**
1. Go to app settings → Secrets
2. Add: `GROQ_API_KEY = "your_key_here"`
3. Click "Save"
4. App auto-restarts

### Issue: "chroma_db collection not found"

**Cause:** PDF ingestion not run locally

**Solution:**
1. Locally: `python src/ingest.py`
2. Push `chroma_db/` to GitHub (or add to `.gitignore` and create dynamically)
3. Redeploy

### Issue: App Takes Too Long to Load

**Cause:** Large models downloading on first run

**Solution:**
1. First deployment takes 3-5 minutes
2. Subsequent visits are instant
3. Models are cached by Streamlit

---

## Performance Optimization

### For Free Tier:

1. **Reduce PDF size**: Keep under 50MB total
2. **Optimize chunk size**: 
   ```python
   CHUNK_SIZE = 300  # Smaller chunks
   CHUNK_OVERLAP = 50
   ```
3. **Cache aggressively**:
   ```python
   @st.cache_resource
   def load_model():
       return SentenceTransformer("all-MiniLM-L6-v2")
   ```
4. **Limit retrieve count**:
   ```python
   top_k = st.slider("Retrieved Chunks", 1, 5, 3)  # Max 5
   ```

### For Pro/Business Tiers:

- Upgrade to dedicated resource
- Support for persistent storage
- Custom domain
- Advanced monitoring

---

## Update Your App

To update your deployed app:

```bash
# Make changes locally
# Test with: streamlit run src/app.py

# Commit changes
git add .
git commit -m "Update features"
git push origin main

# Streamlit auto-deploys on push!
# Check status in Streamlit Cloud dashboard
```

---

## Custom Domain (Pro Tier+)

1. Streamlit Cloud dashboard
2. App settings → "Develop"
3. Set custom domain
4. Update DNS records at your domain provider

---

## Monitoring & Analytics

Streamlit Cloud provides:
- User sessions count
- Resource usage (CPU, memory)
- Error logs
- Performance metrics

View in: App dashboard → "Manage app" → "Logs"

---

## Security Best Practices

✅ **Do:**
- Use Streamlit Secrets for all API keys
- Never commit `.env` files
- Rotate API keys regularly
- Monitor usage in Groq console
- Set rate limits if needed

❌ **Don't:**
- Paste API keys in code
- Commit private data
- Share deployment URLs with untrusted users
- Leave secrets in browser console

---

## Troubleshooting

### General Health Check

```bash
# Test locally first
python src/app.py  # Should work without errors

# Check logs
streamlit run src/app.py --logger.level=debug
```

### View Deployment Logs

```
Streamlit Cloud → Your App → Manage app → View logs
```

### Force Redeploy

```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## Advanced: Custom Deployment

If you want more control, consider:

- **Heroku**: `git push heroku main` (paid)
- **Railway**: Drag-and-drop deployment
- **Docker**: Self-hosted container
- **AWS**: EC2 with Docker
- **Google Cloud**: App Engine or Cloud Run

Each requires additional setup. Streamlit Cloud is the easiest! ✨

---

## Next Steps

1. ✅ Deploy to Streamlit Cloud
2. ✅ Add secrets
3. ✅ Monitor logs
4. ✅ Share app URL with users
5. ✅ Gather feedback

---

## Support

- 📖 [Streamlit Docs](https://docs.streamlit.io)
- 💬 [Streamlit Community](https://discuss.streamlit.io)
- 🐛 [GitHub Issues](https://github.com/streamlit/streamlit/issues)
- 📧 [Streamlit Support](https://streamlit.io/contact)

---

**Your app is now live! 🎉 Share it with the world!**
