'use strict';

let contextMenus = chrome.contextMenus.create({
  "title": "Share highlighted text",
  "contexts": ["selection"],
  "id": "share-highlighted-text"
});

chrome.contextMenus.update(contextMenus, {
  "onclick": (info) => {
    // location.hrefだと拡張のURLになるため、ChromeのAPIを使ってURL取得
    chrome.tabs.query({ active: true, currentWindow: true }, (e) => {
      let currentPath = e[0].url;
      let selectedText = info.selectionText
      let currentPathWithScrollToTextFragment = currentPath + '#:~:text=' + selectedText

      // クリップボードにコピー
      let input = document.createElement('input');
      input.setAttribute('id', 'copyinput');
      document.body.appendChild(input);
      input.value = currentPathWithScrollToTextFragment;
      input.select();
      document.execCommand('copy')
    });
  }
})