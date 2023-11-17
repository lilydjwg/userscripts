// ==UserScript==
// @name           YouTube space to pause / play
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Use space key to pause / play video
// @match          https://www.youtube.com/watch?*
// @version	   0.2
// @grant          none
// ==/UserScript==

(function() {
'use strict'

function run() {
  const v = document.querySelector('video')
  if(!v) {
    setTimeout(run, 500)
    return
  }

  let last_pause = 0
  let last_play = 0

  v.addEventListener('pause', (e) => {
    console.log('paused')
    last_pause = e.timeStamp
  })
  v.addEventListener('play', (e) => {
    console.log('played')
    last_play = e.timeStamp
  })


  document.addEventListener('keyup', (e) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
    // console.log('keyup', e)
    if (e.isComposing || e.keyCode === 229) {
      return
    }

    if (e.keyCode === 0x20) {
      if (['TEXTAREA', 'INPUT'].includes(e.target.tagName) || e.target.contentEditable === "true") {
        // console.log('skip editable element', e.target, e.target.tagName, e.target.contentEditable)
        return
      }

      // console.log('setTimeout')
      setTimeout(function() { // run after YT's own
        if (v.paused && Math.abs(e.timeStamp - last_pause) > 200) {
          console.log('play')
          v.play()
        } else if (Math.abs(e.timeStamp - last_play) > 200) {
          console.log('pause')
          v.pause()
        }
      }, 100)
    }

  }, {
    passive: true,
  })
}

run()

})()

