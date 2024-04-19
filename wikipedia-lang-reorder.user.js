// ==UserScript==
// @name           Wikipedia language tweak
// @description	   Move Chinese and English languages to outside
// @namespace      https://github.com/lilydjwg/userscripts
// @match          https://*.wikipedia.org/*
// @match          https://*.wiktionary.org/*
// @match          https://*.wikisource.org/*
// @version	   2.1
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
    bar.insertBefore(new_link, bar.childNodes[2])
    const diff = bar.childNodes[1].getBoundingClientRect().height - new_link.getBoundingClientRect().height
    // fix different heights
    new_link.childNodes[0].style.top = `${diff / 2}px`
  }
}

})()

