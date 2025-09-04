import React, { useState, useRef, useEffect } from 'react';
import '../stylingFolder/Chat.css';
import axios from 'axios';
import { Send, MessageCircle, FileText, Loader2, AlertCircle, Bot, User } from 'lucide-react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageDivRef = useRef(null);
    
  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input.trim(), from: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = input.trim();
    setInput('');
    setIsTyping(true);

    try {
      const documentId = JSON.parse(sessionStorage.getItem("documentId"));
      
      // console.log("Sending request with:", {
      //   userMessage: currentMessage,
      //   pdfUniqueId: documentId
      // });

      // const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/pdf/search-pdf`, {
      //   userMessage: currentMessage,
      //   pdfUniqueId: documentId
      // });

      console.log("Response received:", response.data);

      // Fix: Use the correct property name from backend response
      const botMessage = { 
        text: response.data.message, // Backend sends 'message' property
        from: 'ai' 
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        from: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (messageDivRef.current) {
      const messagesDiv = messageDivRef.current;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="chat-app">
      <div className="chat-container">
        <div className="info-section">
          <div className="info-content">
            <div className="logo-section">
              <FileText className="logo-icon" size={48} />
              <h1 className="brand-title">Readmee</h1>
            </div>
            <div className="info-text">
              <p className="tagline">AI-powered document conversations</p>
              <p className="description">Ask anything about your uploaded PDF and get intelligent responses instantly.</p>
            </div>
            <div className="features">
              <div className="feature-item">
                <MessageCircle size={20} />
                <span>Smart Conversations</span>
              </div>
              <div className="feature-item">
                <FileText size={20} />
                <span>Document Analysis</span>
              </div>
              <div className="feature-item">
                <Bot size={20} />
                <span>AI-Powered Responses</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="chat-section">
          <div className="chat-header">
            <div className="chat-title">
              <MessageCircle className="chat-icon" size={24} />
              <h2>Chat with your PDF</h2>
            </div>
            <div className="status-indicator">
              <div className="status-dot active"></div>
              <span>AI Online</span>
            </div>
          </div>
          
          <div className="chat-window">
            <div className="messages" ref={messageDivRef}>
              {messages.length === 0 && (
                <div className="welcome-message">
                  <Bot className="welcome-icon" size={48} />
                  <h3>Welcome to Readmee Chat!</h3>
                  <p>Ask me anything about your uploaded PDF document. I'm here to help you understand and explore your content.</p>
                </div>
              )}
              
              {messages.map((messageData, index) => ( 
                <div key={index} className={`message ${messageData.from === 'ai' ? 'bot-message' : 'user-message'}`}>
                  <div className="message-avatar">
                    {messageData.from === 'ai' ? (
                      <Bot className="avatar-icon" size={20} />
                    ) : (
                      <User className="avatar-icon" size={20} />
                    )}
                  </div>
                  <div className="message-content">
                    <p>{messageData.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot-message typing">
                  <div className="message-avatar">
                    <Bot className="avatar-icon" size={20} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <Loader2 className="typing-spinner" size={16} />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-input-container">
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Ask me anything about your PDF..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="message-input"
                />
                <button 
                  disabled={isTyping || !input.trim()} 
                  onClick={sendMessage}
                  className="send-button"
                >
                  {isTyping ? (
                    <Loader2 className="send-icon spinning" size={20} />
                  ) : (
                    <Send className="send-icon" size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
