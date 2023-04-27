// ==UserScript==
// @name           YouTube subtitles lang attribute
// @namespace      https://github.com/lilydjwg/userscripts
// @description    set YouTube subtitles lang attribute
// @include        https://www.youtube.com/watch?*
// @version	   0.2
// @grant          none
// ==/UserScript==

(function() {
'use strict'

function run(el) {
  const ob = new MutationObserver((mutationList, observer) => {
    mutationList.forEach((mutation) => {
      const name = mutation.target.textContent
      const cc = document.getElementById('ytp-caption-window-container')
      console.log('ytcc: 字幕', mutation.target.textContent)
      if(name.includes('台湾') || name.includes('繁体')) {
        cc.lang = 'zh-TW'
      }else if(name.includes('日语')) {
        cc.lang = 'ja'
      }else if(name.includes('韩语')) {
        cc.lang = 'ko'
      }else{
        cc.removeAttribute('lang')
      }
    })
  })

  console.log('ytcc: observing')
  ob.observe(el, { childList: true })
}

function start() {
  const button = document.querySelector('.ytp-popup.ytp-settings-menu')
  if(!button) {
    setTimeout(start, 1000)
  }
  const el = document.querySelector('.ytp-popup.ytp-settings-menu .ytp-menuitem:nth-child(3) .ytp-menuitem-content')
  if(!el) {
    document.querySelector('.ytp-settings-button').click()
    setTimeout(start, 100)
  } else {
    document.querySelector('.ytp-settings-button').click()
    run(el)
  }
}

console.log('ytcc: start')
start()

})()

