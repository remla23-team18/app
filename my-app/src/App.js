import React, { useState } from 'react';
import axios from 'axios';
import { VersionUtil } from '@remla23-team18/lib'

function App() {
    const libVersion = new VersionUtil().getVersion();
    console.log(`Library version: ${libVersion}`);

    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const modelServiceUrl = process.env.REACT_APP_MODEL_SERVICE_URL;
    // const modelServiceUrl = 'http://localhost:8080'

    const performSentimentAnalysis = async () => {
      try {
        const response = await axios.post(`${modelServiceUrl}/predict`, { msg: review });
        console.log(response)
        setSentiment(response.data.sentiment);
        setShowFeedback(true);
      } catch (error) {
        console.error(error);
      }
    };

  const submitFeedback = async () => {
    try {
      const response = await axios.post(`${modelServiceUrl}/feedback`, {
        feedback: feedback ? 1 : 0,
      });
        setFeedback('');
        setSentiment('');
        setShowFeedback(false); // Hide the feedback options
        console.log(response.data);
        console.log('Feedback submitted successfully.');
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
        // backgroundImage: 'url("restaurant-background.jpg")',
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
            backgroundColor: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Analyze
        </button>
          {showFeedback && (
              <>
                  <label style={{ display: 'flex', flexDirection: 'row', marginRight: '8px' }}>
                    <input
                      type="checkbox"
                      checked={feedback}
                      onChange={(e) => setFeedback(e.target.checked)}
                      style={{ marginLeft: '4px' }}
                    />
                    Correct
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'row' }}>
                    <input
                      type="checkbox"
                      checked={!feedback}
                      onChange={(e) => setFeedback(!e.target.checked)}
                      style={{ marginLeft: '4px' }}
                    />
                    Incorrect
                  </label>
                  <button onClick={submitFeedback}>Submit Feedback</button>

              </>
            )}

        <br />
        {sentiment === 1 ? (
          <span role="img" aria-label="Happy" style={{ fontSize: '3rem' }}>
            😄
          </span>
        ) : null}
        {sentiment === 0 ? (
          <span role="img" aria-label="Sad" style={{ fontSize: '3rem' }}>
            😞
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default App;
