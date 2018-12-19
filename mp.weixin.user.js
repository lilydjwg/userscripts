// ==UserScript==
// @name           weixin article fixes
// @namespace      https://github.com/lilydjwg/userscripts
// @description    weixin article fixes
// @include        https://mp.weixin.qq.com/s*
// @version	   0.1.3
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let _title_updated = false

const fix = function() {
  if(_title_updated){
    return
  }
  const title = document.getElementById('activity-name').textContent.trim()
  document.title = `${title} - ${document.title}`
  _title_updated = true
}

setTimeout(fix, 1500)
setTimeout(fix, 3000)
setTimeout(fix, 5000)

})()

