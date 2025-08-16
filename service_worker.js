const API_KEY = 'AIzaSyC9FJNjsqjuxWYKQ2Olh3OtYjHVYQbADtc';
let panelOpened = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ history: [] });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'getPrompt') {
    fetchPrompt(msg.src)
      .then(prompt => sendResponse({ prompt }))
      .catch(() => sendResponse({ prompt: 'Error generating prompt.' }));
    return true;
  }
  if (msg.type === 'recordClick') {
    saveHistory(msg.src);
    if (!panelOpened && sender.tab) {
      chrome.sidePanel.open({ windowId: sender.tab.windowId });
      panelOpened = true;
    }
  }
});

async function fetchPrompt(imageUrl) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: 'Provide an ultra-enhanced prompt for this image.' },
          { image_url: imageUrl }
        ]
      }]
    })
  });
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No prompt generated.';
}

function saveHistory(src) {
  const item = { src, time: Date.now() };
  chrome.storage.local.get({ history: [] }, res => {
    res.history.push(item);
    chrome.storage.local.set({ history: res.history });
  });
}
