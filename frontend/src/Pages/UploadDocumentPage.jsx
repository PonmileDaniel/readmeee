import React, { useState } from 'react';
import axios from 'axios';
import '../stylingFolder/UploadDocumentPage.css';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'reactstrap'; // Importing Progress from reactstrap
import { Loader2 } from 'lucide-react'; // Importing Loader2 icon from lucide-react
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing react-toastify CSS

function UploadDocumentPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setMessage('');
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
                console.log("doc it is", response.data);
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
            <ToastContainer />
            <div className="content-center">
                <div className="title-container">
                    <h1 className="title">Upload Your PDF and Let the Magic Begin!</h1>
                </div>
                <div className="file-upload-container">
                    <form onSubmit={handleSubmit}>
                        <div className="dropzone" onClick={() => document.getElementById('fileInput').click()}>
                            <input
                                id="fileInput"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <div className="icon">📄</div>
                            <p className="dropzone-text">Drop PDF Here...</p>
                        </div>
                        {file && (
                            <div className="file-details">
                                <p className="file-name">{file.name}</p>
                            </div>
                        )}
                        <button type="submit">Upload</button>
                    </form>
                    {isUploading && (
                        <div className="progress-container">
                            <Progress value={uploadProgress} className="progress-bar">
                                {`${uploadProgress}%`}
                            </Progress>
                            {uploadProgress === 100 && (
                                <div className="redirecting">
                                    <Loader2 className="loader-icon" />
                                    Redirecting...
                                </div>
                            )}
                        </div>
                    )}
                    {message && <p className={message.includes('Error') ? 'error' : 'message'}>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default UploadDocumentPage;

