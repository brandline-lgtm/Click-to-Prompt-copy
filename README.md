# Image Prompt Enhancer

Chrome extension that generates ultra-enhanced prompts for images using Google's Gemini API. When you click an image, a popup offers **Show** and **Copy** actions, and a side panel tracks your click history.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked** and select this project folder.
4. The extension installs immediately.

## Usage

- Click any image on a webpage to display the popup.
- **Show**: fetches a prompt from the Gemini API and displays it.
- **Copy**: copies the generated prompt to your clipboard. The prompt dialog also includes a copy button for convenience.
- The side panel opens after the first image click, showing thumbnails and timestamps. Use **Clear History** to remove stored entries.

## Development

All scripts are plain JavaScript with a dark theme for UI components. API interactions occur in `service_worker.js` using the provided Gemini API key.
