// ==UserScript==
// @name           Google Searchbar
// @namespace      https://github.com/lilydjwg/tampermonkey-scripts
// @description    middle click paste in Google Searchbar
// @include        https://www.google.com/*
// @include        https://encrypted.google.*/*
// @include        https://www.google.*/*
// @version	   1.0
// @grant          none
// ==/UserScript==

document.addEventListener('mousedown', function(e){
  const input = document.getElementById('lst-ib')
  if(e.target == input){
    if(e.button == 1 && !e.altKey){
      input.value = ''
    }
    return true
  }
}, false)

document.addEventListener('mouseup', function(e){
  const input = document.getElementById('lst-ib')
  if(e.target == input){
    if(e.button == 1 && !e.altKey){
      setTimeout(function(){
	document.querySelector('button[name="btnG"]').click()
      }, 100, false)
    }
    return true
  }
}, false)
