'use strict';

let contextMenus = chrome.contextMenus.create({
  "title": "Share highlighted text",
  "contexts": ["selection"],
  "id": "share-highlighted-text"
});

chrome.contextMenus.update(contextMenus, {
  "onclick": (info) => {
    let currentPath = info.pageUrl;

    if (currentPath.match(/#:~:text=/)){
      let isApproval = window.confirm("既にScroll To Text Fragmentが含まれていますが、上書きしてもよろしいですか？");

      if (isApproval){
        const URL = generateURLWithScrollToTextFragment(info, currentPath.replace(/#:~:text=.*/, ''));
        writeClipboard(URL);
      }
    }else{
      const URL = generateURLWithScrollToTextFragment(info, currentPath);
      writeClipboard(URL);
    }
  }
})

// ScrollToTextFragment付きのURLを返す 
const generateURLWithScrollToTextFragment = (info, currentPath) => {
  return currentPath + '#:~:text=' + info.selectionText;
}

// クリップボードに書き込み
const writeClipboard = (text) => {
  let input = document.createElement('input');
  input.setAttribute('id', 'copyinput');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand('copy');
}
