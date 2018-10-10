// ==UserScript==
// @name           Telegram Web tweak
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Telegram Web tweak
// @include        https://web.telegram.org/*
// @version	   0.1.1
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const observer = new MutationObserver(function(mutationList, _observer) {
  for(let mutation of mutationList) {
    if(mutation.type == 'childList') {
      for(let node of mutation.addedNodes) {
        if(node.classList.contains('confirm_modal_window')) {
          const link = node.querySelector('[name="url"] > strong')
          if(link) {
            const linkParent = link.parentNode
            const a = document.createElement('a')
            a.target = '_blank'
            a.href = link.textContent
            a.appendChild(link)
            linkParent.appendChild(a)
          }
        }
      }
    }
  }
})

observer.observe(document.body, { childList: true })

})()

