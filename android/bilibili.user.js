// ==UserScript==
// @name           bilibili background play
// @namespace      https://github.com/lilydjwg/userscripts
// @description    bilibili background play
// @include        https://*.bilibili.com/*
// @version	   0.1
// @grant          none
// ==/UserScript==

'use strict'

window.addEventListener('visibilitychange', evt => {
  evt.stopImmediatePropagation()
}, true)

document.addEventListener('click', evt => {
  if(evt.target.matches('#player_fullpage *')) {
    const v = document.querySelector('video')
    v.requestFullscreen()
    evt.stopImmediatePropagation()
  }
}, true)
