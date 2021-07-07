// ==UserScript==
// @name           Bilibili improvements
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Bilibili improvements
// @include        https://www.bilibili.com/video/*
// @version        0.1.1
// @grant          none
// ==/UserScript==

function doit() {
'use strict'

if(localStorage.recommend_auto_play == 'open') {
  document.querySelector('.next-button').click()
}

const settings = JSON.parse(localStorage.bilibili_player_settings)

if(settings.video_status.autoplay) {
  settings.video_status.autoplay = false
  localStorage.bilibili_player_settings = JSON.stringify(settings)
}

const v = document.querySelector('video')
if(v.muted) {
  v.pause()
  v.muted = false
  v.volume = 1
  v.currentTime = 0
}

const annoying = document.querySelector('.login-tip .close')
if(annoying) {
  annoying.click()
}

const annoying2 = document.querySelector('body > [role="tooltip"]')
if(annoying2) {
  annoying2.style.display = 'none'
}

const annoying3 = document.querySelector('.bilibili-player-video-toast-bottom > .bilibili-player-video-toast-item')
if(annoying3) {
  annoying3.style.display = 'none'
}

}

const p = document.getElementById('bilibiliPlayer')
p.addEventListener('dblclick', function(p) {
  document.querySelector('.bilibili-player-video-btn-fullscreen > button').click()
})

setTimeout(doit, 1000)
setTimeout(doit, 2000)
setTimeout(doit, 3000)
setTimeout(doit, 4000)
setTimeout(doit, 5000)
doit()
