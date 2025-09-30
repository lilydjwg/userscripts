// ==UserScript==
// @name           YouTube subtitles lang attribute
// @namespace      https://github.com/lilydjwg/userscripts
// @description    set YouTube subtitles lang attribute
// @match          https://www.youtube.com/*
// @version	   0.4.2
// @grant          window.onurlchange
// ==/UserScript==

(function() {
'use strict'

const ZH_TW_CHANNELS = ['PanSci 泛科学', '舞秋風', '歷史衛視 History Channel']

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
        const channel = document.querySelector('ytd-watch-flexy #text-container').textContent.trim()
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
let retry_times = 3

const start = function() {
  console.log('ytcc: start')
  if(location.href.indexOf('https://www.youtube.com/watch?') != 0) {
    console.log('ytcc: not watching, returning')
    return;
  }
  const button = document.querySelector('.ytp-popup.ytp-settings-menu')
  if(!button) {
    console.log('ytcc: no button, retry after 1000')
    setTimeout(start, 1000)
  }
  // const el = document.querySelector('.ytp-popup.ytp-settings-menu .ytp-menuitem:nth-child(2) .ytp-menuitem-content')

  const r = document.evaluate('//div[@class="ytp-popup ytp-settings-menu"]//span[text()="字幕"]/parent::div/parent::div/parent::div/div[@class="ytp-menuitem-content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
  if(r.snapshotLength == 0) {
    if(!btn_clicked) {
      const settings_btn = document.querySelector('.ytp-settings-button')
      if(settings_btn) {
        settings_btn.click()
        btn_clicked = true
      }
    }
    if(retry_times > 0) {
      console.log('ytcc: no subtitles button, retry after 500')
      retry_times -= 1
      setTimeout(start, 500)
    } else {
      console.log('ytcc: no subtitles, giving up.')
    }
  } else {
    document.querySelector('.ytp-settings-button').click()
    run(r.snapshotItem(0))
  }
}

start()

// https://www.tampermonkey.net/documentation.php#api:window.onurlchange
if(window.onurlchange === null) {
  // feature is supported
  window.addEventListener('urlchange', (info) => {
    console.log('ytcc: restart on urlchange', info)
    if(info.url.indexOf('https://www.youtube.com/watch?') == 0) {
      btn_clicked = false
      retry_times = 3
      start()
    }
  })
}

})()

