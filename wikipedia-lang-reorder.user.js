// ==UserScript==
// @name           Wikipedia language reorder
// @description	   Move Chinese and English languages to the front
// @namespace      https://github.com/lilydjwg/tampermonkey-scripts
// @include        https://*.wikipedia.org/*
// @include        https://*.wiktionary.org/*
// @include        https://*.wikisource.org/*
// @version	   1.0
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const links = document.evaluate('//*[@id="p-lang"]//a[text()="中文" or text()="English"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
let ul
for(let link of links){
  ul = ul || link.parentNode.parentNode
  ul.insertBefore(link.parentNode, ul.firstChild)
}

})()
