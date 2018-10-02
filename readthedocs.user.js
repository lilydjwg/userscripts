// ==UserScript==
// @name           ReadTheDocs tweak
// @namespace      https://github.com/lilydjwg/userscripts
// @description    ReadTheDocs tweak
// @include        https://*.readthedocs.io/*
// @version	   0.1
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const may_hide = function(toggle) {
  const content = document.querySelector('.wy-nav-content-wrap')
  const nav = document.querySelector('nav')
  const footer = document.querySelector('.rst-current-version')
  let hide = sessionStorage.getItem('hide-nav') == 'true'
  if(toggle) {
    hide = !hide
    sessionStorage.setItem('hide-nav', hide)
  }
  if(hide) {
    content.style.marginLeft = '0'
    nav.style.display = 'none'
    footer.style.display = 'none'
  } else {
    content.style.marginLeft = '300px'
    nav.style.display = 'block'
    footer.style.display = 'block'
  }
}

const button = document.createElement('a')
button.textContent = 'Toggle Nav'
button.href = 'javascript: void(0)'
button.addEventListener('click', function() { may_hide(true) })
button.style.display = 'block'
button.style.position = 'fixed'
button.style.zIndex = '9999'
button.style.left = '1em'
button.style.top = '1em'
button.style.fontSize = '0.5em'
button.style.color = 'gray'
button.style.backgroundColor = 'white'
document.body.append(button)

may_hide()

})()

