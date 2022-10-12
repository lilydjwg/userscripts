// ==UserScript==
// @name           Bilibili improvements
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Bilibili improvements
// @include        https://www.bilibili.com/video/*
// @version        0.1.3
// @grant          none
// ==/UserScript==

function doit() {
'use strict'

if(localStorage.recommend_auto_play == 'open') {
  document.querySelector('.next-button').click()
}

const settings = JSON.parse(localStorage.bpx_player_profile)
if(settings.media.autoplay) {
  settings.media.autoplay = false
  localStorage.bpx_player_profile = JSON.stringify(settings)
}

const v = document.querySelector('video')
if(v.muted) {
  v.pause()
  v.muted = false
  v.volume = 1
  v.currentTime = 0
}

}

setTimeout(doit, 1000)
setTimeout(doit, 2000)
setTimeout(doit, 3000)
setTimeout(doit, 4000)
setTimeout(doit, 5000)
doit()
