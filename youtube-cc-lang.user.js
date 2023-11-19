// ==UserScript==
// @name           YouTube subtitles lang attribute
// @namespace      https://github.com/lilydjwg/userscripts
// @description    set YouTube subtitles lang attribute
// @match          https://www.youtube.com/watch?*
// @version	   0.3.6
// @grant          window.onurlchange
// ==/UserScript==

(function() {
'use strict'

const ZH_TW_CHANNELS = ['PanSci 泛科学']

let observer

const run = function(el) {
  if(observer) {
    observer.disconnect()
  }
  observer = new MutationObserver((mutationList, observer) => {
    mutationList.forEach((mutation) => {
      const name = mutation.target.textContent
      const cc = document.getElementById('ytp-caption-window-container')
      if(!cc) {
        return;
      }
      console.log('ytcc: 字幕', mutation.target.textContent)
      if(name.includes('台湾') || name.includes('繁体')) {
        cc.lang = 'zh-TW'
      }else if(name.includes('日语')) {
        cc.lang = 'ja'
      }else if(name.includes('韩语')) {
        cc.lang = 'ko'
      }else{
        const channel = document.getElementById('text-container').textContent.trim()
        console.log('ytcc: channel', channel)
        if(ZH_TW_CHANNELS.includes(channel)) {
          cc.lang = 'zh-TW'
        }else{
          cc.removeAttribute('lang')
        }
      }
    })
  })

  console.log('ytcc: observing')
  observer.observe(el, { childList: true })
}

let btn_clicked = false

const start = function() {
  const button = document.querySelector('.ytp-popup.ytp-settings-menu')
  if(!button) {
    setTimeout(start, 1000)
  }
  // const el = document.querySelector('.ytp-popup.ytp-settings-menu .ytp-menuitem:nth-child(2) .ytp-menuitem-content')

  const r = document.evaluate('//div[@class="ytp-popup ytp-settings-menu"]//span[text()="字幕"]/parent::div/parent::div/parent::div/div[@class="ytp-menuitem-content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
  if(r.snapshotLength == 0 && !btn_clicked) {
    const settings_btn = document.querySelector('.ytp-settings-button')
    if(settings_btn) {
      settings_btn.click()
      btn_clicked = true
    }
    setTimeout(start, 100)
  } else {
    document.querySelector('.ytp-settings-button').click()
    if(r.snapshotLength > 0) { // 否则没有字幕？
      run(r.snapshotItem(0))
    }
  }
}

console.log('ytcc: start')
start()

// https://www.tampermonkey.net/documentation.php#api:window.onurlchange
if(window.onurlchange === null) {
  // feature is supported
  window.addEventListener('urlchange', (info) => {
    console.log('ytcc: restart on urlchange')
    start()
  })
}

})()

