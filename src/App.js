import React from "react";
import "./App.css"; // Link your CSS if needed.
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
const [results, setResults] = useState(null);
const [error, setError] = useState(null);

// Define API URLs
const AUDIO_API_URL = 'https://hushai.onrender.com/classify-cry';
const VIDEO_API_URL = 'https://hushai.onrender.com/predict-pain';

const audioForm = document.getElementById('audio-form');
const videoForm = document.getElementById('video-form');
const audioInput = document.getElementById('audio-input');
const videoInput = document.getElementById('video input');
// Function to handle audio form submission
const handleAudioSubmit = async (event) => {
  event.preventDefault();

  const file = event.target.elements.audioInput.files[0];  // Access file from 'audio-input'
  if (!file) {
    alert('Please select an audio file.');
    return;
  }

  setLoading(true);
  setResults(null);
  setError(null);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(AUDIO_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setLoading(false);

    setResults({
      title: 'Cry Classification',
      classification: `Type of Cry: ${data.classification}`,
      recommendation: formatRecommendation(data.recommendations),
    });
  } catch (error) {
    setLoading(false);
    console.error('Error:', error);
    setError('An error occurred. Please try again.');
  }
};

// Function to handle video form submission
const handleVideoSubmit = async (event) => {
  event.preventDefault();

  const file = event.target.elements.videoInput.files[0];  // Access file from 'video-input'
  if (!file) {
    alert('Please select a video file.');
    return;
  }

  setLoading(true);
  setResults(null);
  setError(null);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(VIDEO_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setLoading(false);

    setResults({
      title: 'Pain Level Prediction',
      classification: `Pain Level: ${data.pain_level}`,
      recommendation: formatRecommendation(data.recommendations),
    });
  } catch (error) {
    setLoading(false);
    console.error('Error:', error);
    setError('An error occurred. Please try again.');
  }
};

// Function to format the recommendation
function formatRecommendation(recommendation) {
  if (typeof recommendation === 'object') {
    if (recommendation.causes && recommendation.actions) {
      const causes = recommendation.causes.map((cause) => `<li>${cause}</li>`).join('');
      const actions = recommendation.actions.map((action) => `<li>${action}</li>`).join('');

      return `
        <div>
          <h4>Causes:</h4>
          <ul>${causes}</ul>
          <h4>Actions:</h4>
          <ul>${actions}</ul>
        </div>
      `;
    }
    return JSON.stringify(recommendation); // Fallback if structure differs
  }
  return recommendation || 'No recommendation available.';
}

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-4xl font-bold text-blue-600">
            <a href="#">HushAI</a>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#hero" className="hover:text-blue-600 transition duration-300">Home</a>
            <a href="#features" className="hover:text-blue-600 transition duration-300">Features</a>
            <a href="#upload" className="hover:text-blue-600 transition duration-300">Get Started</a>
            <a href="#about" className="hover:text-blue-600 transition duration-300">About</a>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button id="menu-btn" className="text-gray-700 focus:outline-none">
              <i className="fas fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden bg-white shadow-md">
          <a href="#hero" className="block px-4 py-2 hover:bg-gray-100">Home</a>
          <a href="#features" className="block px-4 py-2 hover:bg-gray-100">Features</a>
          <a href="#upload" className="block px-4 py-2 hover:bg-gray-100">Get Started</a>
          <a href="#about" className="block px-4 py-2 hover:bg-gray-100">About</a>
        </div>
      </nav>

{/* Hero Section */}
<section id="hero" className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-200">
  <div className="flex flex-col lg:flex-row items-center justify-between w-full px-6 lg:px-20">
    {/* Text Content */}
    <div className="text-center lg:text-left bg-gradient-to-b from-pink-200 via-white to-yellow-100 p-8 lg:p-12 rounded-2xl shadow-lg max-w-3xl mb-8 lg:mb-0">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-black leading-tight mb-6 lg:mb-12">
        UNDERSTAND <br />
        <span className="text-blue-500">your Baby's</span> needs
      </h1>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2 lg:mb-4">
        AI Baby Care Assistant:
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
        Decode your baby's cry and comfort levels
      </p>
    </div>

    {/* Images with Circular Layout and Dotted Connection */}
    <div className="relative flex items-center justify-center mt-6 lg:mt-0">
      {/* Large Baby Monk Image */}
      <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden relative z-10">
        <img src="/images/baby2bg.png" alt="Baby Image" className="w-full h-full object-cover" />
      </div>

      {/* Smaller Image - Top */}
      <div className="absolute -top-16 md:-top-20 lg:-top-24 -right-4 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-yellow-100">
        <img src="/images/babypain.png" alt="Crying Baby" className="w-full h-full object-cover" />
      </div>

      {/* Smaller Image - Bottom */}
      <div className="absolute -bottom-16 md:-bottom-24 lg:-bottom-32 -left-10 md:-left-20 lg:-left-40 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-yellow-100">
        <img src="/images/babycry.png" alt="Sleeping Baby" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</section>



      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-pink-200 via-blue to-yellow-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Features</h2>
            <p className="text-gray-600">Comprehensive tools to help you understand your infant better.</p>
          </div>
          <div className="flex flex-wrap -mx-4">
            {/* Feature 1 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src="/icons/babycry.png" alt="Cry Classification" className="mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Cry Classification</h3>
                <p className="text-gray-600">Identify the type of cry your baby is making to address their specific needs.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src="/icons/babypain.png" alt="Pain Level Prediction" className="mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Pain Level Prediction</h3>
                <p className="text-gray-600">Assess your baby's pain levels accurately through video analysis.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src="/icons/report.png" alt="Detailed Reports" className="mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
                <p className="text-gray-600">Receive comprehensive reports to monitor your baby's well-being over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="py-20 bg-gradient-to-r from-pink-200 to-blue-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-grey">Get Started</h2>
            <p className="text-black">Upload your baby's cry audio or video to receive instant analysis.</p>
          </div>
          <div className="flex flex-wrap -mx-4">
            {/* Upload Cry Audio */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
                  <i className="fas fa-music mr-2"></i>Upload Cry Audio
                </h3>
                <form id="audio-form" onSubmit={handleAudioSubmit}>
                  <div className="mb-4">
                    <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="file" id="audio-input" accept="audio/*" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    <i className="fas fa-upload mr-2"></i>Classify Cry
                  </button>
                </form>
              </div>
            </div>
            {/* Upload Video */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
                  <i className="fas fa-video mr-2"></i>Upload Video
                </h3>
                <form id="video-form" onSubmit={handleVideoSubmit}>
                  <div className="mb-4">
                    <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" type="file" id="video-input" accept="video/*" required />
                  </div>
                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    <i className="fas fa-upload mr-2"></i>Predict Pain Level
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-pink-200 to-yellow-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">About</h2>
            <p className="text-gray-600">Learn more about our mission and vision for infant care.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 HushAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
