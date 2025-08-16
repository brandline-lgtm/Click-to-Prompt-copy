function renderHistory() {
  chrome.storage.local.get({ history: [] }, res => {
    const list = document.getElementById('history');
    list.innerHTML = '';
    res.history.slice().reverse().forEach(item => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = item.src;
      const info = document.createElement('div');
      info.className = 'info';
      const p = document.createElement('p');
      p.className = 'prompt';
      p.textContent = item.prompt || '';
      const span = document.createElement('span');
      span.textContent = new Date(item.time).toLocaleString();
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => navigator.clipboard.writeText(item.prompt || ''));
      info.appendChild(p);
      info.appendChild(span);
      info.appendChild(copyBtn);
      li.appendChild(img);
      li.appendChild(info);
      list.appendChild(li);
    });
  });
}

document.getElementById('clear').addEventListener('click', () => {
  chrome.storage.local.set({ history: [] }, renderHistory);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.history) {
    renderHistory();
  }
});

renderHistory();
