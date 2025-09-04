# Readmee 📚

> An intelligent PDF interaction platform that transforms your documents into interactive conversations using AI

## 🌟 Overview

**Readmee** is a sophisticated PDF application that allows users to upload documents and engage with them through an AI-powered chat interface. Instead of reading lengthy PDFs manually, users can ask questions about the content and receive accurate, contextual answers based on the document's content using advanced Retrieval Augmented Generation (RAG) technology.

This project was created by **Ndukwe Daniel** as a Foundation project for **ALX Software Engineering Program**.

### 💡 Inspiration

The inspiration behind Readmee came from the common student struggle of having to read lengthy PDF assignments and academic materials. As the creator puts it: *"As a student in a Nigerian university, I often get assigned PDFs to read, most of the time I do not want to read them. So, I wanted to create an application that could help me summarize PDFs and highlight the important parts."*

## ✨ Features

- **📄 PDF Upload**: Secure file upload with validation for PDF documents only
- **🤖 AI-Powered Chat**: Interactive chat interface to query document content
- **🔍 Intelligent Search**: Vector-based similarity search for relevant content retrieval
- **⚡ Real-time Responses**: Fast, contextual answers based on document content
- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **🔒 Document Management**: Secure document processing and storage
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **Axios** - HTTP client for API requests
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **LangChain** - Framework for developing LLM applications
- **Pinecone** - Vector database for embeddings storage
- **Cohere AI** - Language model for text generation
- **HuggingFace** - Embeddings and inference
- **Multer** - File upload middleware
- **UUID** - Unique identifier generation

### AI/ML Stack
- **Retrieval Augmented Generation (RAG)** - Core architecture
- **Vector Embeddings** - Document representation
- **Similarity Search** - Content retrieval mechanism
- **Document Chunking** - Text processing for optimal retrieval

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PonmileDaniel/readmeee.git
   cd readmeee
   ```

2. **Set up environment variables**

   Create `.env` files in both `Backend` and `frontend` directories:

   **Backend/.env**
   ```env
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_pinecone_index_name
   HUGGINGFACEHUB_API_KEY=your_huggingface_api_key
   COHERE_API_KEY=your_cohere_api_key
   PORT=5000
   ```

   **frontend/.env**
   ```env
   VITE_REACT_APP_URL=http://localhost:5000
   ```

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   # OR for development with auto-reload:
   # npm run dev
   ```
   The backend server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📖 Usage Guide

### 1. Upload a PDF Document
- Navigate to the upload page
- Select a PDF file from your device
- Wait for the processing to complete
- The document will be processed and stored in the vector database

### 2. Start Chatting with Your Document
- After successful upload, you'll be redirected to the chat interface
- Type your questions about the document content
- Receive AI-generated responses based on the document

### 3. Example Interactions
- *"What is the main topic of this document?"*
- *"Summarize the key points in chapter 3"*
- *"What are the conclusions mentioned in the document?"*
- *"Explain the methodology described in this paper"*

## 🏗️ Project Structure

```
readmeee/
├── Backend/                    # Node.js backend application
│   ├── controllers/           # Route controllers
│   │   └── pdfFunction.js    # PDF processing and chat logic
│   ├── middleware/           # Custom middleware
│   │   └── uploadMiddleware.js # File upload handling
│   ├── routes/               # API route definitions
│   │   └── pdfHandleRoute.js # PDF-related routes
│   ├── index.js             # Express app entry point
│   └── package.json         # Backend dependencies
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   └── About.jsx   # About page component
│   │   ├── Pages/          # Page components
│   │   │   └── Chat.jsx    # Chat interface
│   │   └── stylingFolder/  # CSS styles
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── client/                  # Empty directory (reserved for future use)
└── README.md               # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/pdf`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/process-pdf` | Upload and process a PDF document |
| `POST` | `/search-pdf` | Search and chat with processed document |
| `POST` | `/delete-pdf` | Remove document from vector store |

### API Usage Examples

**Upload and Process PDF:**
```javascript
const formData = new FormData();
formData.append('pdf', pdfFile);

const response = await fetch('/pdf/process-pdf', {
  method: 'POST',
  body: formData
});
```

**Chat with Document:**
```javascript
const response = await fetch('/pdf/search-pdf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userMessage: "What is this document about?",
    pdfUniqueId: "document-uuid"
  })
});
```

## 🔧 Configuration

### Required API Keys

To run this application, you'll need to obtain API keys from:

1. **Pinecone** - Vector database service
   - Sign up at [pinecone.io](https://pinecone.io)
   - Create an index for storing document vectors

2. **HuggingFace** - For embeddings
   - Get your API key from [huggingface.co](https://huggingface.co)

3. **Cohere** - For language model inference
   - Register at [cohere.ai](https://cohere.ai)
   - Obtain your API key from the dashboard

### Vector Database Setup

The application uses Pinecone for storing document embeddings. Make sure to:
1. Create a Pinecone index with appropriate dimensions
2. Configure the index name in your environment variables

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

1. **PDF Upload Fails**
   - Ensure the file is a valid PDF
   - Check file size limits (10MB max)
   - Verify upload middleware configuration

2. **Chat Not Working**
   - Confirm document was processed successfully
   - Check if document ID is stored in session storage
   - Verify API keys are correctly configured

3. **Backend Connection Issues**
   - Ensure backend server is running on port 5000
   - Check CORS configuration
   - Verify environment variables are loaded

## 📄 License

This project is licensed under the ISC License. See the `package.json` files for more details.

## 👨‍💻 Author

**Ndukwe Daniel** - *ALX Software Engineering Student*

- **Twitter**: [@PonmileDaniel](https://x.com/PonmileDaniel)
- **GitHub**: [@PonmileDaniel](https://github.com/PonmileDaniel)

## 🙏 Acknowledgments

- **ALX Africa** - For providing the learning platform and opportunity
- **LangChain** - For the powerful RAG framework
- **Pinecone** - For vector database infrastructure
- **Cohere** - For AI language model capabilities
- **The Open Source Community** - For the amazing tools and libraries

## 📊 Project Status

This project is currently in development as part of the ALX Software Engineering Foundation program. Future enhancements may include:

- [ ] Document summarization features
- [ ] Multi-document chat capabilities
- [ ] Advanced filtering and search options
- [ ] User authentication and document management
- [ ] Mobile application
- [ ] Exam question prediction features

---

<p align="center">
  <strong>Built with ❤️ for students who want to study smarter, not harder</strong>
</p>