"use client"
import  { useState} from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<any>) => {
    // Get the selected file
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Add the file to the form data

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData, // Send the file in the body
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Upload successful:', result);
      } else {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
