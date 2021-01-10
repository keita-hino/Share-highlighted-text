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
    let selectedText;
    let currentPathWithScrollToTextFragment;

    if (currentPath.match(/#:~:text=/)){
      let isApproval = window.confirm("既にScroll To Text Fragmentが含まれていますが、上書きしてもよろしいですか？");
      window.focus();

      if (isApproval){
        selectedText = info.selectionText
        currentPathWithScrollToTextFragment = currentPath.replace(/#:~:text=.*/, '') + '#:~:text=' + selectedText;

        // クリップボードにコピー
        let input = document.createElement('input');
        input.setAttribute('id', 'copyinput');
        document.body.appendChild(input);
        input.value = currentPathWithScrollToTextFragment;
        input.select();
        document.execCommand('copy')
      }
    }else{
      selectedText = info.selectionText
      currentPathWithScrollToTextFragment = currentPath + '#:~:text=' + selectedText;

      // クリップボードにコピー
      let input = document.createElement('input');
      input.setAttribute('id', 'copyinput');
      document.body.appendChild(input);
      input.value = currentPathWithScrollToTextFragment;
      input.select();
      document.execCommand('copy')
    }
  }
})