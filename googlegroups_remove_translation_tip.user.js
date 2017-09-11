// ==UserScript==
// @name           Google Group 清理
// @namespace      https://github.com/lilydjwg/tampermonkey-scripts
// @description    不用将帖子翻译成中文……
// @include        https://groups.google.com/*
// @include        https://productforums.google.com/*
// @version        1.1
// @grant	   none
// ==/UserScript==

function doit() {
  console.log('cleaning up...')
  var divs = document.evaluate('//div[@class="gux-confirm-panel-c"]/div/a[text() = "将帖子翻译为中文"]/parent::div/parent::div', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

  for(var i=0, len=divs.snapshotLength; i<len; i++){
    var div = divs.snapshotItem(i)
    div.parentNode.removeChild(div)
  }
}

let timer

document.body.addEventListener('overflow', function(){
  if(timer){
    clearTimeout(timer)
  }
  timer = setTimeout(doit, 500)
})

