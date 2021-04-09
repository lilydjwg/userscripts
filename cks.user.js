// ==UserScript==
// @name           Better title for Chris's Wiki
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Better title for Chris's Wiki
// @include        https://utcc.utoronto.ca/~cks/*
// @version        0.2.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const h2s = document.querySelectorAll('h2')
if(h2s.length == 1) {
  const title = h2s[0].textContent
  document.title = `Chris's Wiki :: ${title}`
}

})()
