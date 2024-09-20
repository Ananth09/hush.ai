// script.js

// Replace these with your actual API endpoints
const AUDIO_API_URL = 'https://your-api-domain.com/classify-cry';
const VIDEO_API_URL = 'https://your-api-domain.com/predict-pain';

// Elements
const audioForm = document.getElementById('audio-form');
const videoForm = document.getElementById('video-form');
const resultsContainer = document.getElementById('results');
const loadingIndicator = document.getElementById('loading');

// Handle Audio Form Submission
audioForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const audioInput = document.getElementById('audio-input').files[0];
  if (!audioInput) {
    alert('Please select an audio file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', audioInput);

  // Show loading
  showLoading(true);

  try {
    const response = await fetch(AUDIO_API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to classify cry.');
    }

    const result = await response.json();
    displayResult('Cry Classification', result.classification, 'audio');
  } catch (error) {
    console.error('Error:', error);
    displayError(error.message);
  } finally {
    // Hide loading
    showLoading(false);
  }
});

// Handle Video Form Submission
videoForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const videoInput = document.getElementById('video-input').files[0];
  if (!videoInput) {
    alert('Please select a video file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', videoInput);

  // Show loading
  showLoading(true);

  try {
    const response = await fetch(VIDEO_API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to predict pain level.');
    }

    const result = await response.json();
    displayResult('Pain Level Prediction', result.pain_level, 'video');
  } catch (error) {
    console.error('Error:', error);
    displayError(error.message);
  } finally {
    // Hide loading
    showLoading(false);
  }
});

// Function to Show/Hide Loading Indicator
function showLoading(isLoading) {
  loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

// Function to Display Results
function displayResult(title, data, type) {
  // Create a new card
  const col = document.createElement('div');
  col.className = 'col-md-6 mb-4';
  col.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${formatResult(data, type)}</p>
        <button class="btn btn-outline-primary btn-sm" onclick="copyResult('${encodeURIComponent(formatResult(data, type))}')">
          <i class="fas fa-copy"></i> Copy
        </button>
      </div>
    </div>
  `;

  // Append the card to the results container
  resultsContainer.prepend(col);
}

// Function to Format Result Data
function formatResult(data, type) {
  if (type === 'audio') {
    // Assuming classification is a string indicating the cry type
    return `<strong>Detected Cry Type:</strong> ${data}`;
  } else if (type === 'video') {
    // Assuming pain_level is a string or number indicating pain level
    return `<strong>Predicted Pain Level:</strong> ${data}`;
  }
  return JSON.stringify(data);
}

// Function to Display Error Messages
function displayError(message) {
  const col = document.createElement('div');
  col.className = 'col-12 mb-4';
  col.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error:</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  resultsContainer.prepend(col);
}

// Function to Copy Result to Clipboard
function copyResult(text) {
  const decodedText = decodeURIComponent(text);
  navigator.clipboard.writeText(decodedText)
    .then(() => {
      alert('Result copied to clipboard!');
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
}
