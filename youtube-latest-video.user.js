// ==UserScript==
// @name           YouTube show latest video by default
// @namespace      https://github.com/lilydjwg/userscripts
// @description    YouTube show latest video by default
// @include        https://www.youtube.com/*/videos
// @version	   0.1
// @grant          none
// @run-at	   document-idle
// ==/UserScript==

(function() {
'use strict'

const el = document.querySelector('iron-selector#chips')
el.firstElementChild.click()

})()

