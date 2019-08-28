// ==UserScript==
// @name           weixin article fixes
// @namespace      https://github.com/lilydjwg/userscripts
// @description    weixin article fixes
// @include        https://mp.weixin.qq.com/s*
// @version	   0.4
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

(function() {
'use strict'

function doit() {
  const title = document.getElementById('activity-name').textContent.trim()
  const name = document.getElementById('js_name').textContent.trim()
  document.title = `${title} - ${name}`
}
doit()
setTimeout(doit, 100)
setTimeout(doit, 500)
setTimeout(doit, 1000)
setTimeout(doit, 3000)
setTimeout(doit, 5000)

})()

