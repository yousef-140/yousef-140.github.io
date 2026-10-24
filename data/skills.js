/*
 ===== SKILLS — one line per skill =====
 status: "demonstrated" (visible in a public project) | "learning" | "planned"
 projects: slugs from projects.js that show the skill (empty for learning/planned)
 Change a status only when it is true. No percentages on purpose: evidence matters more.
*/
window.STATUS_LABELS = { demonstrated: "Demonstrated in a project", learning: "Currently learning", planned: "Planned service" };

window.SKILLS = [
  // Data Engineering
  {name:"ETL pipelines (extract, transform, load)", category:"Data Engineering", status:"demonstrated", projects:["power-consumption-etl","egypt-real-estate-intelligence"]},
  {name:"Apache Airflow orchestration", category:"Data Engineering", status:"demonstrated", projects:["power-consumption-etl","egypt-real-estate-intelligence"]},
  {name:"Apache Spark / PySpark", category:"Data Engineering", status:"demonstrated", projects:["power-consumption-etl","egypt-real-estate-intelligence"]},
  {name:"HDFS and Bronze/Silver/Gold layers", category:"Data Engineering", status:"demonstrated", projects:["power-consumption-etl","egypt-real-estate-intelligence"]},
  {name:"Snowflake data loading", category:"Data Engineering", status:"demonstrated", projects:["power-consumption-etl"]},
  {name:"Docker Compose environments", category:"Data Engineering", status:"demonstrated", projects:["power-consumption-etl","egypt-real-estate-intelligence"]},
  {name:"SQL", category:"Data Engineering", status:"learning", projects:[]},
  {name:"Data quality checks and testing", category:"Data Engineering", status:"learning", projects:[]},
  // Web scraping
  {name:"Python scraping (Requests + BeautifulSoup)", category:"Web Scraping", status:"demonstrated", projects:["egypt-real-estate-intelligence"]},
  {name:"Scheduled collection and deduplication", category:"Web Scraping", status:"demonstrated", projects:["egypt-real-estate-intelligence"]},
  {name:"Scrapy, Selenium or Playwright", category:"Web Scraping", status:"learning", projects:[]},
  // AI
  {name:"Retrieval-Augmented Generation (RAG)", category:"Applied AI", status:"demonstrated", projects:["custom-knowledge-rag-platform","gym-assistant-rag"]},
  {name:"FAISS vector search and BM25 hybrid retrieval", category:"Applied AI", status:"demonstrated", projects:["custom-knowledge-rag-platform"]},
  {name:"Embeddings with sentence-transformers", category:"Applied AI", status:"demonstrated", projects:["custom-knowledge-rag-platform"]},
  {name:"Local LLMs with Ollama", category:"Applied AI", status:"demonstrated", projects:["custom-knowledge-rag-platform"]},
  {name:"Multi-agent LLM pipelines (search, curate, critique, answer)", category:"Applied AI", status:"demonstrated", projects:["research-coach"]},
  {name:"LLM provider fallback with LiteLLM", category:"Applied AI", status:"demonstrated", projects:["research-coach"]},
  {name:"Multilingual (Arabic/English) retrieval", category:"Applied AI", status:"demonstrated", projects:["research-coach","gym-assistant-rag"]},
  {name:"External API integration (Semantic Scholar, Tavily)", category:"Backend", status:"demonstrated", projects:["research-coach"]},
  {name:"API authentication, rate limiting and background jobs", category:"Backend", status:"demonstrated", projects:["research-coach"]},
  {name:"Scheduled jobs with APScheduler", category:"Backend", status:"demonstrated", projects:["research-coach"]},
  {name:"Retrieval evaluation (Recall@K, MRR)", category:"Applied AI", status:"learning", projects:[]},
  // ML
  {name:"Random Forest regression (Spark MLlib)", category:"Machine Learning", status:"demonstrated", projects:["egypt-real-estate-intelligence"]},
  {name:"Feature engineering", category:"Machine Learning", status:"demonstrated", projects:["power-consumption-etl","egypt-real-estate-intelligence"]},
  {name:"Deep learning with TensorFlow/Keras (Seq2Seq, Transformer)", category:"Machine Learning", status:"demonstrated", projects:["neural-machine-translation-en-de"]},
  {name:"NLP: machine translation and BLEU", category:"Machine Learning", status:"demonstrated", projects:["neural-machine-translation-en-de"]},
  // CV
  {name:"YOLOv8 person detection and tracking", category:"Computer Vision", status:"demonstrated", projects:["real-time-crowd-analysis-yolov8"]},
  {name:"OpenCV video processing", category:"Computer Vision", status:"demonstrated", projects:["real-time-crowd-analysis-yolov8"]},
  // Backend
  {name:"FastAPI REST services", category:"Backend", status:"demonstrated", projects:["custom-knowledge-rag-platform","gym-assistant-rag"]},
  {name:"Git and GitHub", category:"Backend", status:"demonstrated", projects:["power-consumption-etl"]},
  // Dashboards
  {name:"Power BI dashboards", category:"Dashboards", status:"demonstrated", projects:["power-consumption-etl"]},
  {name:"Streamlit apps", category:"Dashboards", status:"demonstrated", projects:["egypt-real-estate-intelligence","custom-knowledge-rag-platform","gym-assistant-rag"]}
];
