function renderHistory() {
  chrome.storage.local.get({ history: [] }, res => {
    const list = document.getElementById('history');
    list.innerHTML = '';
    res.history.forEach(item => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = item.src;
      const span = document.createElement('span');
      span.textContent = new Date(item.time).toLocaleString();
      li.appendChild(img);
      li.appendChild(span);
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
