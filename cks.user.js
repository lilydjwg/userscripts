// ==UserScript==
// @name           Better title for Chris's Wiki
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Disable spellcheck on specific sites
// @include        https://utcc.utoronto.ca/~cks/*
// @version        0.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const title = document.querySelector('h2').textContent
document.title = `Chris's Wiki :: ${title}`

})()
