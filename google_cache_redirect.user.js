// Google Cache Redirect Remover
// GNU General Public License

// ==UserScript==
// @name           Google Search Redirect Changer Remover
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Change or remove the Google Search redirect in cached links
// @include        https://www.google.com/*
// @include        https://encrypted.google.*/*
// @include        https://www.google.*/*
// @version	   1.0
// @grant          none
// ==/UserScript==

const REDIRECT_VISITED_HTTPS = true
const REMOVE_SEARCH_LINKS = false
const APPEND_SEARCH_LINKS = true

const doit = function() {
  if(REMOVE_SEARCH_LINKS) {
    const links = document.querySelectorAll('h3.r > a')
    for(let linkNode of links) {
      try {
        linkNode.removeAttribute('onmousedown')
      } catch(e) {
        console.error(e)
        continue
      }
    }
  }

  if(APPEND_SEARCH_LINKS) {
    const links = document.querySelectorAll('h3.r > a')
    for(let linkNode of links) {
      try {
        const newLinkNode = document.createElement('a')
        newLinkNode.href = linkNode.href
        newLinkNode.className = 'fl'
        newLinkNode.setAttribute('target', '_blank')
        newLinkNode.textContent = '原始链接'
        const urlNode = linkNode.parentNode.nextSibling.querySelector('cite')
        console.log(urlNode)
        urlNode.parentNode.appendChild(document.createTextNode(' - '))
        urlNode.parentNode.appendChild(newLinkNode)
      } catch(e) {
        console.error(e)
        continue
      }
    }
  }
}

doit()

document.addEventListener('overflow', function(e){
  const main = document.querySelector('h2.hd')
  if(e.target == main){
    doit()
  }
})

//visited link indication fix
if(REDIRECT_VISITED_HTTPS){
  document.addEventListener('mouseup', function(e){
    let el = e.target
    //find up to <a> because there will be <em> etc inside.
    while(el.tagName != 'A' && el.parentNode){
      el = el.parentNode
    }
    //major search results or related ones
    if(el.parentNode && el.parentNode.className == 'r' || el.className == 'fl'){
      el.href = el.href.replace('http://www.google.com/url', 'https://www.google.com/url')
    }
  })
}
