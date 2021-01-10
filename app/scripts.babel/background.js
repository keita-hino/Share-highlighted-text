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

    if (currentPath.match(/#:~:text=/)){
      let isApproval = window.confirm("既にScroll To Text Fragmentが含まれていますが、上書きしてもよろしいですか？");

      if (isApproval){
        // クリップボードにコピー
        let input = document.createElement('input');
        input.setAttribute('id', 'copyinput');
        document.body.appendChild(input);
        input.value = generateURLWithScrollToTextFragment(info, currentPath.replace(/#:~:text=.*/, ''));
        input.select();
        document.execCommand('copy')
      }
    }else{
      // クリップボードにコピー
      let input = document.createElement('input');
      input.setAttribute('id', 'copyinput');
      document.body.appendChild(input);
      input.value = generateURLWithScrollToTextFragment(info, currentPath);
      input.select();
      document.execCommand('copy')
    }
  }
})

// ScrollToTextFragment付きのURLを返す 
const generateURLWithScrollToTextFragment = (info, currentPath) => {
  return currentPath + '#:~:text=' + info.selectionText;
}