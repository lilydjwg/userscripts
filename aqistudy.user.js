// ==UserScript==
// @name           aqistudy fixes
// @namespace      https://github.com/lilydjwg/userscripts
// @description    aqistudy fixes
// @include        https://www.aqistudy.cn/*
// @version	   0.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

function fix() {
  console.log('fixing')
  const el = document.getElementById('maintabs')
  if(!el){
    console.log('maintabs not found')
    return
  }

  const right_panel = el.lastChild
  if(!right_panel){
    console.log('right_panel not found')
    return
  }

  const {y, width} = right_panel.getBoundingClientRect()
  console.log('y, width=', y, width)
  if(y > window.innerHeight / 2){
    right_panel.style.width = `${width-1}px`
  }

}

window.addEventListener('resize', function(){
  // run after content scripts
  setTimeout(fix, 200)
})
fix()

})()
