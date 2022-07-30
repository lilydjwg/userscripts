// ==UserScript==
// @name           Wikipedia language reorder
// @description	   Move Chinese and English languages to the front
// @namespace      https://github.com/lilydjwg/userscripts
// @include        https://*.wikipedia.org/*
// @include        https://*.wiktionary.org/*
// @include        https://*.wikisource.org/*
// @version	   1.4
// @grant          none
// ==/UserScript==

(function() {
'use strict'

// #p-lang for Vector legacy (2010), #p-lang-btn Vector (2022)
const links = document.evaluate('//*[@id="p-lang" or @id="p-lang-btn"]//a/span[text()="中文" or text()="English"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
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

function addStyle(css) {
  const head = document.getElementsByTagName('head')[0]
  if (head) {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.textContent = css
    head.appendChild(style)
    return style
  }
}

// Vector (2022)
const link_div = document.querySelector('#p-lang-btn > .vector-menu-content')
if(link_div) {
  const link_div2 = link_div.cloneNode(true)
  link_div2.querySelector('.after-portlet-lang').remove()
  const alertbox = document.querySelector('.vector-language-sidebar-alert').parentElement
  alertbox.insertAdjacentElement('afterend', link_div2)
  alertbox.remove()
  link_div2.id = 'my-lang-list'
  addStyle(`
#my-lang-list > ul {
  list-style: none;
  margin: 0;
}
#my-lang-list li {
  padding: 0.25em 0;
  font-size: 0.75em;
  line-height: 1.125em;
}
`)
}

})()
