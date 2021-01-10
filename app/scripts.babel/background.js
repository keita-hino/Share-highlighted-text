'use strict';

let contextMenus = chrome.contextMenus.create({
  "title": "Share highlighted text",
  "contexts": ["selection"],
  "id": "share-highlighted-text"
});

chrome.contextMenus.update(contextMenus, {
  "onclick": (info) => {
    // Scroll To Text Fragment付きのURLを生成
    let currentPath = info.pageUrl;
    let selectedText = info.selectionText
    let currentPathWithScrollToTextFragment = currentPath + '#:~:text=' + selectedText

    // クリップボードにコピー
    let input = document.createElement('input');
    input.setAttribute('id', 'copyinput');
    document.body.appendChild(input);
    input.value = currentPathWithScrollToTextFragment;
    input.select();
    document.execCommand('copy')
  }
})