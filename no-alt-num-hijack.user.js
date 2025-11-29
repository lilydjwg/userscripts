// ==UserScript==
// @name         Disable Alt+number
// @namespace    https://github.com/lilydjwg/userscripts
// @version      0.1.1
// @description  Stop the annoying Alt+number shortcuts on Taobao / Zhihu
// @match        https://*.taobao.com/*
// @match        https://*.tmall.com/*
// @match        https://*.zhihu.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {

const keys = "0123456789";

document.addEventListener('keydown', function(e) {
  if (keys.indexOf(e.key) != -1 && (!e.isComposing || !e.ctrlKey || e.altKey)) {
    e.cancelBubble = true
    e.stopImmediatePropagation()
  }
  return false
})

})()

