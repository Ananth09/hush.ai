
// Define API URLs
const AUDIO_API_URL = 'http://localhost:8000/classify-cry';
const VIDEO_API_URL = 'http://localhost:8000/predict-pain';

// Get references to HTML elements
const audioForm = document.getElementById('audio-form');
const videoForm = document.getElementById('video-form');
const audioInput = document.getElementById('audio-input');
const videoInput = document.getElementById('video-input');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');

// Function to handle audio form submission
audioForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const file = audioInput.files[0];
  if (!file) {
    alert('Please select an audio file.');
    return;
  }

  loadingDiv.classList.remove('hidden');
  resultsDiv.innerHTML = '';

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(AUDIO_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    loadingDiv.classList.add('hidden');

    // Display classification result and recommendations
    resultsDiv.innerHTML = `
      <h3 class="text-xl font-semibold mb-2 text-white">Cry Classification</h3>
      <p style="font-size: 24px; font-weight: bold; color: white">Type of Cry: ${data.classification}</p>
      <p style="font-size: 21px; font-weight: bold; color: white">Recommendation: ${formatRecommendation(data.recommendations)}</p>
    `;
  } catch (error) {
    loadingDiv.classList.add('hidden');
    console.error('Error:', error);
    resultsDiv.innerHTML = '<p class="text-red-500">An error occurred. Please try again.</p>';
  }
});

// Function to handle video form submission
videoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = videoInput.files[0];
  if (!file) {
    alert('Please select a video file.');
    return;
  }

  loadingDiv.classList.remove('hidden');
  resultsDiv.innerHTML = '';

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(VIDEO_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    loadingDiv.classList.add('hidden');

    // Display pain prediction result and recommendations
    resultsDiv.innerHTML = `
      <h3 class="text-xl font-semibold mb-2 text-white">Pain Level Prediction</h3>
      <p style="font-size: 24px; font-weight: bold; color: white">Pain Level: ${data.pain_level}</p>
      <p style="font-size: 21px; font-weight: bold; color: white">Recommendation: ${formatRecommendation(data.recommendations)}</p>
    `;
  } catch (error) {
    loadingDiv.classList.add('hidden');
    console.error('Error:', error);
    resultsDiv.innerHTML = '<p class="text-red-500">An error occurred. Please try again.</p>';
  }
});

// Function to format the recommendation
function formatRecommendation(recommendation) {
  if (typeof recommendation === 'object') {
    if (recommendation.causes && recommendation.actions) {
      const causes = recommendation.causes.map(cause => `<li>${cause}</li>`).join('');
      const actions = recommendation.actions.map(action => `<li>${action}</li>`).join('');
      
      return `
        <div>
          <h4 class="font-semibold text-white">Causes:</h4>
          <ul class="list-disc pl-5 text-white">${causes}</ul>
          <h4 class="font-semibold mt-2 text-white">Actions:</h4>
          <ul class="list-disc pl-5 text-white">${actions}</ul>
        </div>
      `;
    }
    return JSON.stringify(recommendation); // Fallback if the structure is different
  }
  return recommendation || 'No recommendation available.';
}

