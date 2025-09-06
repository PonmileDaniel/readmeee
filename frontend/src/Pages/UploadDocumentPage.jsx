import React, { useState } from 'react';
import axios from 'axios';
import '../stylingFolder/UploadDocumentPage.css';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'reactstrap'; // Importing Progress from reactstrap
import { Loader2, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'; // Importing icons from lucide-react
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing react-toastify CSS

function UploadDocumentPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setMessage('');
        } else {
            setMessage('Please select a valid PDF file.');
            setFile(null);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
            setMessage('');
        } else {
            setMessage('Please drop a valid PDF file.');
            setFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a PDF file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            setIsUploading(true);
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/pdf/process-pdf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.status === 200) {
                //console.log("doc it is", response.data);
                sessionStorage.setItem("documentId", JSON.stringify(response.data.documentUniqueId));
                navigate("/chat");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error || 'Error uploading file');
            } else {
                console.log('error uploading pdf', error);
                toast.error('File upload failed. Please try again.');
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="page-container">
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="content-center">
                <div className="title-container">
                    <div className="logo-container">
                        <FileText className="logo-icon" size={48} />
                    </div>
                    <h1 className="title">Upload Your PDF and Let the Magic Begin!</h1>
                    <p className="subtitle">Transform your documents into interactive AI conversations</p>
                </div>
                
                <div className="file-upload-container">
                    <form onSubmit={handleSubmit}>
                        <div 
                            className={`dropzone ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
                            onClick={() => document.getElementById('fileInput').click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            
                            {!file ? (
                                <>
                                    <div className="upload-icon-container">
                                        <Upload className="upload-icon" size={48} />
                                    </div>
                                    <h3 className="dropzone-title">Drop your PDF here</h3>
                                    <p className="dropzone-text">or click to browse files</p>
                                    <p className="file-limit">Maximum file size: 1MB</p>
                                </>
                            ) : (
                                <div className="file-preview">
                                    <div className="file-icon-container">
                                        <FileText className="file-icon" size={32} />
                                    </div>
                                    <div className="file-info">
                                        <p className="file-name">{file.name}</p>
                                        <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <CheckCircle className="success-icon" size={24} />
                                </div>
                            )}
                        </div>
                        
                        {file && (
                            <button 
                                type="submit" 
                                className={`upload-btn ${isUploading ? 'uploading' : ''}`}
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="btn-icon spinning" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="btn-icon" size={20} />
                                        Upload & Process PDF
                                    </>
                                )}
                            </button>
                        )}
                    </form>
                    
                    {isUploading && (
                        <div className="progress-container">
                            <div className="progress-header">
                                <span className="progress-text">
                                    {uploadProgress < 100 ? 'Uploading...' : 'Processing document...'}
                                </span>
                                <span className="progress-percentage">{uploadProgress}%</span>
                            </div>
                            <div className="progress-wrapper">
                                <Progress 
                                    value={uploadProgress} 
                                    className="modern-progress-bar"
                                    color="primary"
                                />
                            </div>
                            {uploadProgress === 100 && (
                                <div className="redirecting">
                                    <Loader2 className="loader-icon spinning" size={20} />
                                    <span>Redirecting to chat...</span>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {message && (
                        <div className={`message-container ${message.includes('Error') || message.includes('Please') ? 'error' : 'success'}`}>
                            {message.includes('Error') || message.includes('Please') ? (
                                <AlertCircle className="message-icon" size={20} />
                            ) : (
                                <CheckCircle className="message-icon" size={20} />
                            )}
                            <p className="message-text">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadDocumentPage;

