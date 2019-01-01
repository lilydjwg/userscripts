// ==UserScript==
// @name           weixin article fixes
// @namespace      https://github.com/lilydjwg/userscripts
// @description    weixin article fixes
// @include        https://mp.weixin.qq.com/s*
// @version	   0.2
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const observer = new MutationObserver(function(_mutationList, _observer) {
  const title = document.getElementById('activity-name').textContent.trim()
  if(document.title.indexOf(title) == 0) {
    return
  }
  document.title = `${title} - ${document.title}`
})

observer.observe(
  document.querySelector('head > title'),
  { subtree: true, characterData: true, childList: true })

})()

