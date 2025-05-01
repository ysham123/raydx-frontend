import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, confidence, report, image } = location.state || {};

  let base64Image = '';
  try {
    if (image) {
      console.log('Hex string:', image);
      const binaryString = Array.from(image.match(/.{1,2}/g) || [])
        .map(hex => {
          const charCode = parseInt(hex, 16);
          if (isNaN(charCode)) throw new Error(`Invalid hex value: ${hex}`);
          return String.fromCharCode(charCode);
        })
        .join('');
      console.log('Binary string:', binaryString);
      base64Image = btoa(binaryString);
      console.log('Base64 string:', base64Image);
    }
  } catch (error) {
    console.error('Error converting hex to base64:', error);
    base64Image = '';
  }

  useEffect(() => {
    if (location.state) {
      const predictionData = {
        prediction,
        confidence,
        report,
        timestamp: new Date().toISOString(),
      };
      try {
        const existingPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        // Limit to the last 10 predictions to prevent quota issues
        const updatedPredictions = [...existingPredictions, predictionData].slice(-10);
        localStorage.setItem('predictions', JSON.stringify(updatedPredictions));
        console.log('Local storage:', JSON.parse(localStorage.getItem('predictions')));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        // Optionally clear localStorage if quota is exceeded
        if (error.name === 'QuotaExceededError') {
          localStorage.removeItem('predictions');
          localStorage.setItem('predictions', JSON.stringify([predictionData]));
          console.log('Cleared localStorage due to quota exceeded, added new prediction');
        }
      }
    }
  }, [location.state, prediction, confidence, report]);

  if (!location.state) {
    return <p className="text-center text-gray-600 mt-8">No results available. Please upload an image.</p>;
  }

  // Use the refined report from the backend
  const refinedReport = report || `**Radiological Report: Chest X-ray Analysis**\nA deep learning model analyzed the chest X-ray and detected ${prediction} with a confidence of ${confidence.toFixed(2)}%. The findings suggest airspace consolidation, indicative of an infectious process. For precise location and extent, consult a radiologist.`;

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">X-Ray Results</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-6">
          {base64Image ? (
            <img
              src={`data:image/jpeg;base64,${base64Image}`}
              alt="Uploaded X-ray"
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          ) : (
            <p className="text-gray-600">Unable to display X-ray image.</p>
          )}
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-800">Prediction:</span> {prediction || 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-800">Confidence:</span> {confidence ? confidence.toFixed(2) : 'N/A'}%
          </p>
          <p className="text-lg whitespace-pre-line">
            <span className="font-semibold text-gray-800">Report:</span> {refinedReport || 'No report available'}
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          >
            Clear Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;