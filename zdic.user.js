// ==UserScript==
// @name           汉典修正
// @namespace      https://github.com/lilydjwg/userscripts
// @description    汉典字体调整
// @include        http://www.zdic.net/*
// @version	   0.2
// @grant          none
// ==/UserScript==

// 「生僻字转文字」
setTimeout(function(){
  const hanzi2char = document.getElementById('kxtw')
  if(hanzi2char){
    const evt = document.createEvent("MouseEvents")
    evt.initMouseEvent("click", true, true, window,
                      0, 0, 0, 0, 0, false, false, false, false, 0, null)
    hanzi2char.dispatchEvent(evt)
  }
}, 1500)
