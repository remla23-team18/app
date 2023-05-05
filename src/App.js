import React, { useState } from 'react';
// import axios from 'axios';

function App() {
    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState('');
    // const modelServiceUrl = 'http://localhost:5000';
    // const modelServiceUrl = process.env.REACT_APP_MODEL_SERVICE_URL;

    const performSentimentAnalysis = async () => {
      try {
        // const response = await axios.post(`${modelServiceUrl}`, { review: review });
        // setSentiment(response.data.sentiment);

        // Experiment with dummy data.
        const sentiment = review.includes('good') ? 'positive' : 'negative';
        setSentiment(sentiment);

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#333',
        backgroundImage: 'url("restaurant-background.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 0 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ margin: '0 0 16px' }}>Restaurant Review Sentiment Analysis</h1>
        <label htmlFor="review" style={{ marginBottom: '8px' }}>
          Enter a restaurant review:
        </label>
        <br />
        <textarea
          id="review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: '60%',
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical',
            minHeight: '50px',
            fontSize: '1rem'
          }}
        />
        <br />
        <button
          onClick={performSentimentAnalysis}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Analyze
        </button>
        <br />
        {sentiment === 'positive' ? (
          <span role="img" aria-label="Happy" style={{ fontSize: '3rem' }}>
            😄
          </span>
        ) : null}
        {sentiment === 'negative' ? (
          <span role="img" aria-label="Sad" style={{ fontSize: '3rem' }}>
            😞
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default App;
