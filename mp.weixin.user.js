// ==UserScript==
// @name           weixin article fixes
// @namespace      https://github.com/lilydjwg/userscripts
// @description    weixin article fixes
// @include        https://mp.weixin.qq.com/s?*
// @version	   0.1
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const fix = function() {
  document.title = document.getElementById('activity-name').textContent.trim()
}

setTimeout(fix, 1500)

})()

