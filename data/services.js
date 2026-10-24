/*
 ===== SERVICES — edit titles, deliverables and evidence here =====
 evidence: slugs from projects.js proving the service (empty = not yet backed by a project)
 basis: "project" (backed by completed work) | "learning" | "planned"
 No prices on purpose: every service uses "Request a quote".
*/
window.SERVICES = [
  {
    title: "Data Engineering and ETL Pipelines", basis: "project",
    problem: "Data is scattered, messy, or stuck in files and nobody can report on it reliably.",
    deliverables: ["Pipeline that ingests, cleans and transforms your data","Analytics-ready tables","Scheduled runs with Airflow","Documentation to reproduce the setup"],
    tech: ["Python","Airflow","Spark","HDFS","Snowflake","Docker"], evidence: ["power-consumption-etl","egypt-real-estate-intelligence"]
  },
  {
    title: "Web Scraping and Data Collection", basis: "project",
    problem: "You need structured data from public web pages, collected regularly.",
    deliverables: ["Scraper for permitted public sources","Cleaned, deduplicated CSV, JSON or Excel output","Scheduled recurring collection"],
    tech: ["Python","Requests","BeautifulSoup","Airflow"], evidence: ["egypt-real-estate-intelligence"],
    note: "I check robots.txt, site terms, privacy and rate limits before scraping."
  },
  {
    title: "RAG and Document Q&A Prototypes", basis: "project",
    problem: "People waste time searching long documents for answers.",
    deliverables: ["Question answering over your PDFs with source citations","FastAPI service and simple UI","Notes on retrieval quality and limits"],
    tech: ["Python","FastAPI","FAISS","BM25","Ollama","Streamlit"], evidence: ["custom-knowledge-rag-platform","gym-assistant-rag","research-coach"]
  },
  {
    title: "Dashboards and Reporting", basis: "project",
    problem: "Decision makers cannot see what the data says.",
    deliverables: ["Power BI or Streamlit dashboard","Data prepared for reporting","Short walkthrough of findings"],
    tech: ["Power BI","Streamlit","Python"], evidence: ["power-consumption-etl","egypt-real-estate-intelligence"]
  },
  {
    title: "Machine Learning and Analytics Prototypes", basis: "project",
    problem: "You want to know whether your data can predict something useful.",
    deliverables: ["Data exploration","Baseline predictive model with evaluation","Honest report of accuracy and limits"],
    tech: ["Python","Spark MLlib","TensorFlow / Keras"], evidence: ["egypt-real-estate-intelligence","neural-machine-translation-en-de"]
  },
];
