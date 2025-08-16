const promptCache = new Map();
let popup;

function handleImageClick(event) {
  const img = event.target.closest('img');
  if (!img) return;
  event.preventDefault();
  createPopup(img);
  chrome.runtime.sendMessage({ type: 'recordClick', src: img.src });
}

document.addEventListener('click', handleImageClick);

function createPopup(img) {
  removePopup();
  popup = document.createElement('div');
  popup.id = 'ctp-popup';
  popup.className = 'ctp-popup';

  const showBtn = document.createElement('button');
  showBtn.textContent = 'Show';
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';

  popup.appendChild(showBtn);
  popup.appendChild(copyBtn);
  document.body.appendChild(popup);

  const rect = img.getBoundingClientRect();
  popup.style.top = `${rect.bottom + window.scrollY}px`;
  popup.style.left = `${rect.left + window.scrollX}px`;

  showBtn.addEventListener('click', () => {
    getPrompt(img.src).then(prompt => displayPrompt(prompt));
  });

  copyBtn.addEventListener('click', () => {
    getPrompt(img.src).then(prompt => navigator.clipboard.writeText(prompt));
  });
}

function removePopup() {
  if (popup) popup.remove();
}

function getPrompt(src) {
  if (promptCache.has(src)) {
    return Promise.resolve(promptCache.get(src));
  }
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'getPrompt', src }, response => {
      if (response && response.prompt) {
        promptCache.set(src, response.prompt);
        resolve(response.prompt);
      } else {
        reject('No prompt');
      }
    });
  });
}

function displayPrompt(text) {
  const modal = document.createElement('div');
  modal.className = 'ctp-modal';
  modal.innerHTML = `
    <div class="ctp-modal-content">
      <pre>${text}</pre>
      <div class="ctp-modal-actions">
        <button id="ctp-copy">Copy</button>
        <button id="ctp-close">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('#ctp-close').addEventListener('click', () => modal.remove());
  modal.querySelector('#ctp-copy').addEventListener('click', () => navigator.clipboard.writeText(text));
}
