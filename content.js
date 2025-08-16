let viewBtn;
let activeImg;

function showButton(img) {
  removeButton();
  activeImg = img;
  viewBtn = document.createElement('button');
  viewBtn.id = 'ctp-view-btn';
  viewBtn.textContent = 'View Prompt';
  document.body.appendChild(viewBtn);
  const rect = img.getBoundingClientRect();
  viewBtn.style.top = `${rect.top + window.scrollY + 5}px`;
  viewBtn.style.left = `${rect.left + window.scrollX + 5}px`;
  viewBtn.addEventListener('click', e => {
    e.stopPropagation();
    chrome.runtime.sendMessage({ type: 'generatePrompt', src: img.src });
    removeButton();
  });
}

function removeButton() {
  if (viewBtn) {
    viewBtn.remove();
    viewBtn = null;
    activeImg = null;
  }
}

document.addEventListener('mouseover', e => {
  const img = e.target.closest('img');
  if (!img) return;
  showButton(img);
});

document.addEventListener('mousemove', e => {
  if (!viewBtn || !activeImg) return;
  const rect = activeImg.getBoundingClientRect();
  const btnRect = viewBtn.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;
  const insideImage = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  const insideBtn = x >= btnRect.left && x <= btnRect.right && y >= btnRect.top && y <= btnRect.bottom;
  if (!insideImage && !insideBtn) {
    removeButton();
  }
});
