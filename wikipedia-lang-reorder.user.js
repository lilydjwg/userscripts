// ==UserScript==
// @name           Wikipedia language tweak
// @description	   Move Chinese and English languages to outside
// @namespace      https://github.com/lilydjwg/userscripts
// @match          https://*.wikipedia.org/*
// @match          https://*.wiktionary.org/*
// @match          https://*.wikisource.org/*
// @version	   2.0
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const link_en = document.querySelector('.interlanguage-link.interwiki-en')
const link_zh = document.querySelector('.interlanguage-link.interwiki-zh')
const bar = document.querySelector('#p-views .vector-menu-content-list') 
may_add_it(bar, link_en)
may_add_it(bar, link_zh)

function may_add_it(bar, node) {
  if(node) {
    const new_link = node.cloneNode(true)
    new_link.className = 'mw-list-item vector-tab-noicon'
    if(location.href.indexOf('https://ja.') === 0 || location.href.indexOf('https://ko.') === 0) {
      // fix different heights
      new_link.style.fontFamily = '思源黑体'
    }
    bar.insertBefore(new_link, bar.childNodes[2])
  }
}

})()

