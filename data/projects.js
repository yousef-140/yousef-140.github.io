/*
 ===== PROJECTS — add a new project by copying one block and editing it =====
 slug: unique, lowercase, no spaces.   published:false = hidden draft.
 category: Data Engineering | AI and RAG | Machine Learning | Computer Vision | NLP | Dashboards | Other
 status: Completed | In progress | Experimental | Educational | Planned
 screenshots: [{src:"assets/screenshots/file.png", alt:"what it shows"}]  (empty list shows a placeholder)
 demo: a real URL string, or null (the Live Demo button is hidden when null)
 Only write results that are documented in the repo. Leave "results" empty if there are none.
*/
window.PROJECTS = [
{
  slug: "power-consumption-etl",
  title: "Power Consumption ETL Pipeline",
  category: "Data Engineering", status: "Completed", featured: true, published: true,
  summary: "Batch ETL for household power-consumption data: Airflow orchestrates Spark jobs through Bronze/Silver/Gold layers on HDFS, loads into Snowflake, and feeds a Power BI dashboard.",
  tech: ["Apache Airflow","Apache Spark","HDFS","Snowflake","Power BI","Docker Compose","Parquet","Python"],
  github: "https://github.com/yousef-140/power-consumption-etl", demo: null,
  screenshots: [
    {src:"assets/screenshots/power-dashboard-overview.png", alt:"Power BI dashboard: KPIs, consumption over time, sub-metering distribution, voltage gauge"},
    {src:"assets/screenshots/power-dashboard-page2.png", alt:"Second page of the Power BI dashboard"}
  ],
  problem: "Raw household power readings arrive as one large CSV (about 126 MB) with invalid records and no analytics structure.",
  goals: ["Ingest the raw file in batches","Clean and enrich it with time features","Publish analytics-ready fact and dimension tables","Expose results in a dashboard"],
  architecture: ["Raw CSV (UCI dataset)","Airflow DAG","Spark extract: 1000-row batches to HDFS Bronze (Parquet)","Spark transform to Silver","Gold: FACT_POWER + TIME_DIM","Snowflake","Power BI"],
  implementation: [
    "Extract splits the source into batches of 1000 rows and writes Parquet to the Bronze layer.",
    "Transform removes null and invalid records, parses timestamps and engineers hour, day, month, year, day_of_week, is_weekend, peak_hours and total_sub_metering.",
    "Load builds FACT_POWER and TIME_DIM from Silver, writes Gold, and loads Snowflake through the Spark-Snowflake connector (the Spark job runs on YARN).",
    "The whole stack (Airflow, HDFS with 2 datanodes, YARN, Postgres, Spark notebook) is defined in docker-compose.yaml.",
    "A Mermaid architecture diagram is included in the repository (pipeline_diagrams.md)."
  ],
  results: ["The dashboard shows average consumption by month and hour, weekend vs weekday comparison, and a year slicer (see screenshots)."],
  limitations: ["Uses a public dataset, not a client's data.","No automated tests or data-quality checks in the repository yet.","The raw data file is not tracked, so it must be downloaded to reproduce a run."],
  applications: ["Sensor or meter data pipelines","Moving CSV exports into a cloud warehouse","Analytics-ready tables for BI tools"],
  next: ["Add data-quality checks and tests","Add incremental loading"]
},
{
  slug: "egypt-real-estate-intelligence",
  title: "Egypt Real Estate Intelligence",
  category: "Data Engineering", status: "In progress", featured: true, published: true,
  summary: "Self-collected Egyptian real-estate listings flow through a scraper, Airflow, HDFS and Spark into a Random Forest price model and a Streamlit dashboard with a Fair Value Score.",
  tech: ["Python","Requests","BeautifulSoup","Apache Airflow","Apache Spark / PySpark","HDFS","Spark MLlib","Streamlit","Docker Compose","pandas"],
  github: "https://github.com/yousef-140/egypt-real-estate-intelligence", demo: null,
  screenshots: [
    {src:"assets/screenshots/real-estate-market-overview.png", alt:"Streamlit market overview: total listings, average price and price per m² by area"},
    {src:"assets/screenshots/real-estate-rental-yield.png", alt:"Streamlit rental yield page: top 15 areas by annual rental yield"}
  ],
  problem: "No ready dataset exists for Egyptian listings, so market questions (fair price, rental yield per area) cannot be answered from public data.",
  goals: ["Collect listings daily with my own scraper","Clean and deduplicate them","Estimate fair prices and rental yield","Serve results in a dashboard"],
  architecture: ["Python scraper (requests + BeautifulSoup)","HDFS Bronze (daily, date-partitioned)","Spark Silver cleaning","Spark Gold aggregation","Random Forest (Spark MLlib)","Streamlit dashboard","Airflow orchestrates the daily run"],
  implementation: [
    "Silver layer: numeric parsing, size-bin missing-value imputation, area/location extraction from listing URLs, language detection, deduplication by listing ID.",
    "Gold layer: market overview per area, rental yield per area, and a Fair Value Score (actual price vs ML-predicted price).",
    "Model: Spark MLlib Random Forest Regressor tuned with cross-validation.",
    "Dashboard: Streamlit app with a market overview by area (listings, average price, price per m²) and a rental-yield page with a minimum-listings filter."
  ],
  results: ["The dashboard screenshot shows 5,726 total listings in the Greater Cairo dataset.","The repository README reports a Random Forest R² of about 0.59 on held-out data (stated in the README; not independently re-run for this site)."],
  limitations: ["Moderate dataset size.","No condition, floor or view data, which limits accuracy.","Coverage is Greater Cairo only.","Scraping for clients requires checking each site's terms, robots.txt and rate limits."],
  applications: ["Market intelligence for property investors","Recurring public-data collection feeding a pipeline"],
  next: ["More cities","Interactive prediction page","Add a screenshot of the Fair Value Score / Deal Finder view"]
},
{
  slug: "custom-knowledge-rag-platform",
  title: "Custom Knowledge RAG Platform",
  category: "AI and RAG", status: "In progress", featured: true, published: true,
  summary: "Question answering over uploaded PDFs using hybrid retrieval (FAISS vectors + BM25), a local LLM through Ollama, source citations, a FastAPI service and a Streamlit UI.",
  tech: ["Python","FastAPI","sentence-transformers","FAISS","rank-bm25","Ollama","SQLite","Streamlit","pypdf","Docker"],
  github: "https://github.com/yousef-140/custom-knowledge-rag-platform", demo: null,
  screenshots: [
    {src:"assets/screenshots/rag-query.png", alt:"Streamlit query page: document selector, Top K and hybrid alpha sliders, answer with source page and latency"}
  ],
  problem: "Teams have knowledge locked in documents and need grounded answers with sources instead of generic chatbot output.",
  goals: ["Ingest PDFs","Retrieve relevant passages with vector and keyword search","Answer with citations using a local model","Log queries to debug retrieval"],
  architecture: ["PDF ingestion + cleaning","Chunking","Embeddings (sentence-transformers)","FAISS + BM25 indexes","Hybrid retrieval","Context selection and compression","Prompt builder","Ollama LLM","Answer with sources","SQLite logging"],
  implementation: [
    "API endpoints: /health, /query, /stats, /cache, plus upload routes; in-memory query caching.",
    "Hybrid retrieval blends vector and BM25 scores with a configurable alpha.",
    "The code also contains reranker and HyDE modules (not described in the README).",
    "Evaluation code for Recall@K and MRR with a failure-analysis workflow."
  ],
  results: [],
  limitations: ["The evaluation set currently has only 3 questions, so no retrieval-quality numbers are claimed.","Small document collections; multi-client isolation and authentication are future work.","Runs locally; there is no hosted demo."],
  applications: ["Internal documentation assistant","Study or policy-manual assistant","Prototype for a client's document Q&A"],
  next: ["Larger gold evaluation set","Per-client collections","Authentication"]
},
{
  slug: "real-time-crowd-analysis-yolov8",
  title: "Real-Time Crowd Analysis with YOLOv8",
  category: "Computer Vision", status: "Experimental", featured: false, published: true,
  summary: "Detects and tracks people in video with YOLOv8, then reports dwell time, active count over time, peak periods and empty intervals.",
  tech: ["Python","YOLOv8 (Ultralytics)","OpenCV","Matplotlib","CSV"],
  github: "https://github.com/yousef-140/Real-Time-Crowd-Analysis-System-using-YOLOv8", demo: null,
  screenshots: [],
  problem: "Counting how many people are present and for how long usually needs manual review of footage.",
  goals: ["Detect people per frame","Keep IDs across frames","Export analytics as files"],
  architecture: ["Video input","YOLOv8 person detection","Centroid-distance ID tracking","Presence and crowd statistics","summary.csv, crowd_time.csv, peak_period.txt","Matplotlib density plot"],
  implementation: ["Single script (video_track.py) with a bundled yolov8n.pt model.","Outputs per-person start, end and duration, plus crowd count over time."],
  results: [],
  limitations: ["Simple centroid tracking can fail in dense scenes or after occlusion.","The video path is hard-coded in the script.","Not optimized for production."],
  applications: ["Store or entrance traffic analysis","Occupancy reports from recorded video"],
  next: ["ByteTrack or DeepSORT","Live camera streams","Web dashboard"]
},
{
  slug: "neural-machine-translation-en-de",
  title: "Neural Machine Translation (EN to DE)",
  category: "NLP", status: "Educational", featured: false, published: true,
  summary: "Three translation models built from scratch in TensorFlow/Keras: LSTM Seq2Seq, LSTM with attention, and a custom Transformer, compared with BLEU.",
  tech: ["Python","TensorFlow / Keras","NumPy","Google Colab"],
  github: "https://github.com/yousef-140/Machine-Translation", demo: null,
  screenshots: [],
  problem: "Learn how encoder-decoder, attention and Transformer architectures differ in practice.",
  goals: ["Implement each model without prebuilt Transformer layers","Compare training behaviour and translations"],
  architecture: ["Parallel EN-DE pairs","Cleaning and tokenization","Seq2Seq LSTM","LSTM + dot-product attention","Custom Transformer","Greedy / beam decoding","BLEU evaluation"],
  implementation: ["Custom training loops with tf.GradientTape and teacher forcing.","Transformer written without keras.layers.Transformer."],
  results: ["README reports Transformer BLEU of about 0.12 and notes that the small dataset limits the score."],
  limitations: ["Educational project on limited data, not a production translator."],
  applications: ["Foundation for NLP prototypes"],
  next: ["Larger dataset","Subword tokenization","Beam search length penalty"]
},
{
  slug: "gym-assistant-rag",
  title: "Gym Assistant (Arabic/English RAG)",
  category: "AI and RAG", status: "Experimental", featured: false, published: true,
  summary: "Chatbot answering workout and nutrition questions with FAISS retrieval, Arabic and English support, and a calorie/protein calculator in Streamlit.",
  tech: ["Python","LangChain","FAISS","Streamlit","FastAPI","Together API"],
  github: "https://github.com/yousef-140/Gym_Coach", demo: null,
  screenshots: [],
  problem: "Fitness questions need answers grounded in exercise and nutrition data, in the user's language.",
  goals: ["Index workout and nutrition datasets","Answer in Arabic or English","Provide a needs calculator"],
  architecture: ["Workout + nutrition datasets","FAISS index (LangChain)","Arabic query translation","LLM via Together API","Streamlit UI + calculator","FastAPI backend"],
  implementation: ["Datasets and the FAISS index are included in the repository.","Arabic queries are translated and answers translated back."],
  results: [],
  limitations: ["Needs your own Together API key to run.","General information only, not nutrition or medical advice."],
  applications: ["Domain chatbot template for other bilingual knowledge bases"],
  next: ["Add screenshots","Clean the repository (remove __pycache__)"]
},
{
  slug: "research-coach",
  title: "Research Coach: Multi-Agent Research Assistant",
  category: "AI and RAG", status: "In progress", featured: false, published: true,
  summary: "Answers questions from recent papers and articles with numbered sources and a 0-5 credibility score per source. Four agents (Scout, Curator, Critic, Coach) plus a scheduler keep followed topics up to date. Works in Arabic and English.",
  tech: ["Python","FastAPI","FAISS","SQLite","sentence-transformers (multilingual-e5-small)","LiteLLM (Gemini, Groq fallback)","Semantic Scholar API","Tavily API","APScheduler"],
  github: "https://github.com/yousef-140/research-coach-", demo: null,
  screenshots: [
    {src:"assets/screenshots/research-coach-ask.png", alt:"Ask page: an answer with numbered citations and an option to search for new papers"},
    {src:"assets/screenshots/research-coach-sources.png", alt:"Numbered sources, each with a 0 to 5 credibility score"},
    {src:"assets/screenshots/research-coach-digest.png", alt:"Digest page: new sources stored, evaluated chunks and average credibility for a followed topic"}
  ],
  problem: "Reading and judging recent papers and web sources on a topic is slow, and generic chatbots answer without showing how reliable their sources are.",
  goals: ["Collect fresh sources automatically","Score each source for credibility and relevance","Answer in the user's language with numbered citations","Refresh followed topics on a schedule"],
  architecture: ["Scout: Semantic Scholar + Tavily search (plus LLM-generated queries)","Curator: deduplicate, filter by relevance, chunk","FAISS + SQLite storage","Critic: score each chunk 0 to 5","Coach: retrieve best chunks, research more if coverage is weak, answer with citations","Scheduler: refresh topics and save a digest"],
  implementation: [
    "FastAPI service with routes /ask, /research (background job with job status), /subscribe, /digest/{topic}, /login and /health.",
    "Access control: API keys checked with constant-time comparison, invite-code login, and in-memory per-route rate limiting that returns Retry-After.",
    "One LLM wrapper with automatic model fallback; the Critic keeps chunks unscored and retries next run when scoring fails.",
    "Embeddings with a multilingual model so Arabic and English questions work without a translation step.",
    "Includes a single-page web UI served by the API, and an .env.example with no secrets."
  ],
  results: [],
  limitations: [
    "Credibility scores come from an LLM and are a guide, not ground truth (the README says to check sources).",
    "Must run with a single worker because rate limits and the ingestion lock live in memory.",
    "No automated tests or retrieval-quality evaluation in the repository yet.",
    "Needs your own API keys (Gemini, Tavily, Semantic Scholar) to run; no hosted demo."
  ],
  applications: ["Literature scouting for a topic","Fresh-sources briefings with citations","Template for a multi-agent research workflow"],
  next: ["Add evaluation and tests","Move rate limiting out of memory to allow multiple workers"]
}
];
