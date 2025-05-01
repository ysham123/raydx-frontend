import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleTestImage = async (imageSrc) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], `test-image-${Date.now()}.jpeg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setError(null);
      const event = new Event('submit', { bubbles: true });
      document.querySelector('form').dispatchEvent(event);
    } catch (error) {
      console.error('Error loading test image:', error);
      setError('Failed to load test image. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get prediction');
        }

        const data = await response.json();
        navigate('/result', { state: data });
        setError(null);
      } catch (error) {
        console.error('Error uploading file:', error);
        setError(error.message);
      }
    } else {
      setError('No file selected. Please choose an image to upload.');
    }
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Upload X-Ray Image</h2>
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
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
                className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleTestImage(img.src)}
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