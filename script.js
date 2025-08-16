const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const viewPromptBtn = document.getElementById('viewPromptBtn');
const promptSidebar = document.getElementById('promptSidebar');
const promptOutput = document.getElementById('promptOutput');
const copyPrompt = document.getElementById('copyPrompt');
const clearPrompt = document.getElementById('clearPrompt');
const closeSidebar = document.getElementById('closeSidebar');

// Preview uploaded image
imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// Extract text from image using Tesseract.js
viewPromptBtn.addEventListener('click', async () => {
  if (!previewImage.src) return;
  promptOutput.textContent = 'Processing...';
  promptSidebar.classList.remove('hidden');
  try {
    const result = await Tesseract.recognize(previewImage.src, 'eng', {
      logger: (m) => console.log(m)
    });
    promptOutput.textContent = result.data.text.trim() || 'No text found.';
  } catch (err) {
    promptOutput.textContent = 'Error extracting text.';
    console.error(err);
  }
});

// Copy prompt to clipboard
copyPrompt.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(promptOutput.textContent);
    alert('Prompt copied to clipboard');
  } catch (err) {
    alert('Failed to copy');
  }
});

// Clear prompt output
clearPrompt.addEventListener('click', () => {
  promptOutput.textContent = '';
});

// Close sidebar
closeSidebar.addEventListener('click', () => {
  promptSidebar.classList.add('hidden');
});
