# Image Prompt Enhancer

Chrome extension that generates ultra‑enhanced prompts for images using Google's Gemini API. Hover over any image to reveal a **View Prompt** button and the prompt appears in the side panel, which also tracks your history.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked** and select this project folder.
4. The extension installs immediately.

## Usage

- Hover over any image to show the **View Prompt** button.
- Click **View Prompt** to send the image to the Gemini API and open the side panel.
- The side panel lists each image with its generated prompt, timestamp and a **Copy** button. Use **Clear History** to remove stored entries.

## Development

All scripts are plain JavaScript with a dark theme for UI components. API interactions occur in `service_worker.js` using the provided Gemini API key.
