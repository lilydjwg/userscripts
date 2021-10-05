// ==UserScript==
// @name           Wikipedia language reorder
// @description	   Move Chinese and English languages to the front
// @namespace      https://github.com/lilydjwg/userscripts
// @include        https://*.wikipedia.org/*
// @include        https://*.wiktionary.org/*
// @include        https://*.wikisource.org/*
// @version	   1.3.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const links = document.evaluate('//*[@id="p-lang"]//a/span[text()="中文" or text()="English"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
let ul
for(let i=0, len=links.snapshotLength; i<len; i++){
  let link = links.snapshotItem(i)
  ul = ul || link.parentNode.parentNode.parentNode
  ul.insertBefore(link.parentNode.parentNode, ul.firstChild)
}

function hideTranslate() {
  const translate = document.querySelector('.cx-new-interlanguage-link')
  if(translate) {
    translate.style.display = 'none'
  }
}

setTimeout(hideTranslate, 100)
setTimeout(hideTranslate, 1000)
setTimeout(hideTranslate, 3000)
setTimeout(hideTranslate, 5000)
           
})()
