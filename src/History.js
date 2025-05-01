import React, { useState, useEffect } from 'react';

function History() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const storedPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    const sortedPredictions = storedPredictions.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    setPredictions(sortedPredictions);
  }, []);

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Prediction History</h2>
      {predictions.length === 0 ? (
        <p className="text-center text-gray-600">No predictions yet.</p>
      ) : (
        <div className="space-y-6">
          {predictions.map((pred, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-lg">
                <span className="font-semibold text-gray-800">Prediction:</span> {pred.prediction}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-800">Confidence:</span> {pred.confidence.toFixed(2)}%
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-800">Report:</span> {pred.report}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-semibold">Timestamp:</span> {new Date(pred.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;