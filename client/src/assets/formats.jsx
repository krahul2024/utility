const docs = {
  "docx": {
    "to": ["pdf", "txt","html", "xml", "odt"]
  },
  "pdf": {
    "to": ["docx", "txt", "html", "xml","jpeg", "png"]
  },
  "txt": {
    "to": ["docx", "pdf", "html"]
  },
  "csv": {
    "to": ["xlsx", "json", "xml", "sql", "txt"]
  },
  "xlsx": {
    "to": ["csv", "json", "xml", "html", "pdf"]
  },
  "html": {
    "to": ["txt", "pdf", "docx", "xml"]
  },
  "json": {
    "to": ["csv", "xlsx", "xml"]
  },
  "xml": {
    "to": ["csv", "xlsx", "html", "json"]
  }
}


export default docs; 