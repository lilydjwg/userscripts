// ==UserScript==
// @name        Disqus login required reminder
// @namespace   https://github.com/lilydjwg/tampermonkey-scripts
// @description Remind you if you can't post your comments because you aren't logged in
// @include     http://disqus.com/embed/comments/*
// @include     https://disqus.com/embed/comments/*
// @version	2.0
// @grant       none
// ==/UserScript==

const check = function(){
  const el = document.querySelector('input[name="author-guest"]')
  if(!el){
    setTimeout(check, 100, false)
    return
  }
  if(el.style.display == 'none'){
    const msg = document.getElementsByClassName('placeholder')[0]
    msg.textContent = '需要登录 / Login Required!'
  }
}

setTimeout(check, 100)
setInterval(check, 1000)
