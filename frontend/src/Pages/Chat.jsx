import React, { useState, useRef, useEffect } from 'react';
import '../stylingFolder/Chat.css';
import axios from 'axios';

function Chat() {
  const [messageDatas, setMessageDatas] = useState([]);
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const messageDivRef = useRef(null);
    
  const handleSend = async () => {
    const data = sessionStorage.getItem("documentId");

    if (!data) {
      return alert("No document id found!")
    }

    setMessageDatas((prevState) => [...prevState, {from: 'me', message: input}]);

    setDisabled(true);

    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/pdf/search-pdf`, {
          userMessage: input,
          pdfUniqueId: JSON.parse(data)
        });

        if (response.status === 200) {
          console.log(response.data)
          setMessageDatas((prevState) => [...prevState, response.data]);
          setInput(' ');
          setDisabled(false);
        }
    } catch (err) {
          if (err.response) {
            if (err.response.status === 500) {
              alert("An unexpected error occured!");
              console.log("error occured", err)
            }
          }
          setDisabled(false);
    }

    
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (messageDivRef.current) {
      const messagesDiv = messageDivRef.current;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, [messageDatas]);

  return (
    <div className="App">
      <div className="container">
        <div className="info-section">
          <h1>Readmee</h1>
          <p>Digital platform for distance learning.</p>
          <p>You can learn everything that you want to know.</p>
        </div>
        <div className="chat-section">
          <div className="chat-window">
            <div className="messages" ref={messageDivRef}>
              {
                messageDatas.map((messageData, index) => ( 
                  <div key={index} className={messageData.from === 'ai' ? 'bot-message' :'user-message'}>
                      <p>{messageData.message}</p>
                  </div>
                ))
              }
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={handleInputChange}
                // onKeyPress={handleKeyPress}
              />
              <button disabled={disabled} onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
