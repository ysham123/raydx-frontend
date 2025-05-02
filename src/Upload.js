import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import normal1 from './assets/normal1.jpeg';
import normal2 from './assets/normal2.jpeg';
import pneumonia1 from './assets/pneumonia1.jpeg';
import pneumonia2 from './assets/pneumonia2.jpeg';

const testImages = [
  { src: normal1, name: 'Normal 1' },
  { src: normal2, name: 'Normal 2' },
  { src: pneumonia1, name: 'Pneumonia 1' },
  { src: pneumonia2, name: 'Pneumonia 2' },
];

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Use useEffect to submit the form when selectedFile changes
  useEffect(() => {
    if (selectedFile && loading) {
      // Programmatically submit the form after selectedFile is set
      const event = new Event('submit', { bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  }, [selectedFile, loading]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setLoading(false); // Not loading from test image
    } else {
      setError('No file selected. Please choose an image to upload.');
    }
  };

  const handleTestImage = async (imageSrc) => {
    try {
      setLoading(true); // Set loading to true to indicate test image processing
      setError(null);
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch test image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const file = new File([blob], `test-image-${Date.now()}.jpeg`, { type: 'image/jpeg' });
      setSelectedFile(file); // This will trigger useEffect to submit the form
    } catch (error) {
      setLoading(false);
      console.error('Error loading test image:', error.message);
      setError('Failed to load test image. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('No file selected. Please choose an image to upload.');
      console.error('No file selected for upload');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      console.log('Sending request to backend:', 'http://127.0.0.1:8000/predict');
      const response = await fetch('https://raydx-backend.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to get prediction';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Received data from backend:', data);
      navigate('/result', { state: data });
      setError(null);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Upload X-Ray Image</h2>
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}
      {loading && (
        <p className="text-blue-500 text-center mb-4">Processing test image...</p>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          Upload
        </button>
      </form>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Try These Test Images</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {testImages.map((img, index) => (
            <div key={index} className="text-center">
              <img
                src={img.src}
                alt={img.name}
                className={`w-32 h-32 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer ${loading ? 'opacity-50' : ''}`}
                onClick={() => !loading && handleTestImage(img.src)} // Disable clicks while loading
              />
              <p className="mt-2 text-gray-600 font-medium">{img.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upload;