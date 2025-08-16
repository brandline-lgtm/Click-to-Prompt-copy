function renderHistory() {
  chrome.storage.local.get({ history: [] }, res => {
    const list = document.getElementById('history');
    list.innerHTML = '';
    res.history.forEach(item => {
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
      info.appendChild(p);
      info.appendChild(span);
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
