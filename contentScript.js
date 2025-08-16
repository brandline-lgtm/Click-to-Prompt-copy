(function() {
  // Inject Tesseract.js
  const tScript = document.createElement('script');
  tScript.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
  tScript.onload = initOverlay;
  document.head.appendChild(tScript);

  function initOverlay() {
    const btn = document.createElement('button');
    btn.id = 'ctp-view-prompt-btn';
    btn.textContent = 'View Prompt';
    document.body.appendChild(btn);

    const sidebar = document.createElement('aside');
    sidebar.id = 'ctp-prompt-sidebar';
    sidebar.classList.add('hidden');
    sidebar.innerHTML = `
      <div class="ctp-sidebar-header">
        <h2>Prompt</h2>
        <button id="ctp-close-sidebar" aria-label="Close sidebar">&times;</button>
      </div>
      <pre id="ctp-prompt-output" class="ctp-prompt-output"></pre>
      <div class="ctp-sidebar-actions">
        <button id="ctp-copy-prompt">Copy</button>
        <button id="ctp-clear-prompt">Clear</button>
      </div>`;
    document.body.appendChild(sidebar);

    const output = document.getElementById('ctp-prompt-output');
    const closeSidebar = document.getElementById('ctp-close-sidebar');
    const copyPrompt = document.getElementById('ctp-copy-prompt');
    const clearPrompt = document.getElementById('ctp-clear-prompt');
    let currentImg = null;

    document.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'IMG') {
        currentImg = e.target;
        const rect = currentImg.getBoundingClientRect();
        btn.style.top = `${window.scrollY + rect.top + rect.height / 2}px`;
        btn.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
        btn.classList.add('visible');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.tagName === 'IMG') {
        setTimeout(() => {
          if (!btn.matches(':hover')) {
            btn.classList.remove('visible');
          }
        }, 200);
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('visible');
    });

    btn.addEventListener('click', async () => {
      if (!currentImg) return;
      sidebar.classList.remove('hidden');
      output.textContent = 'Processing...';
      try {
        const result = await Tesseract.recognize(currentImg.src, 'eng', { logger: m => console.log(m) });
        output.textContent = result.data.text.trim() || 'No text found.';
      } catch (err) {
        output.textContent = 'Error extracting text.';
        console.error(err);
      }
    });

    copyPrompt.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(output.textContent);
        alert('Prompt copied to clipboard');
      } catch (err) {
        alert('Failed to copy');
      }
    });

    clearPrompt.addEventListener('click', () => {
      output.textContent = '';
    });

    closeSidebar.addEventListener('click', () => {
      sidebar.classList.add('hidden');
    });
  }
})();
