// script.js

// Replace these with your actual API endpoints
const AUDIO_API_URL = 'https://your-api-domain.com/classify-cry';
const VIDEO_API_URL = 'https://your-api-domain.com/predict-pain';

// Handle Audio Form Submission
document.getElementById('audio-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const audioInput = document.getElementById('audio-input').files[0];
  if (!audioInput) {
    alert('Please select an audio file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', audioInput);

  try {
    const response = await fetch(AUDIO_API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    displayResult('Cry Classification', result.classification);
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while processing the audio file.');
  }
});

// Handle Video Form Submission
document.getElementById('video-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const videoInput = document.getElementById('video-input').files[0];
  if (!videoInput) {
    alert('Please select a video file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', videoInput);

  try {
    const response = await fetch(VIDEO_API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    displayResult('Pain Level Prediction', result.pain_level);
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while processing the video file.');
  }
});

// Function to Display Results
function displayResult(title, data) {
  const resultsContainer = document.getElementById('results');

  // Create a new card
  const card = document.createElement('div');
  card.className = 'col-md-4';
  card.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${JSON.stringify(data)}</p>
      </div>
    </div>
  `;

  // Append the card to the results container
  resultsContainer.prepend(card);
}
