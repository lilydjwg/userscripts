// ==UserScript==
// @name           github tweaks
// @namespace      https://github.com/lilydjwg/userscripts
// @description    use gzip, use ssh
// @include        https://github.com/*
// @version	   1.9
// @grant          none
// ==/UserScript==
 
(function() {
'use strict'

function prefer_gzip() {
  const dl = document.querySelector('a[data-ga-click*="download zip"]')
  if(dl){
    dl.dataset.gaClick = dl.dataset.gaClick.replace('zip', 'gzip')
    dl.href = dl.href.replace(/\.zip$/, '.tar.gz')
    dl.textContent = dl.textContent.replace('ZIP', 'GZIP')
  }
}

prefer_gzip()

const repourl = document.querySelectorAll('.js-live-clone-url')
const re = /https:\/\/github\.com\/([^\/]+)\/(.*)/
let span, m
let i, len
for(i=0, len=repourl.length; i<len; i++){
  span = repourl[i]
  m = re.exec(span.textContent)
  if(m){
    span.textContent = 'git@github.com:'+m[1]+'/'+m[2]
  }
}

document.addEventListener('click', function(e) {
  if(e.target.tagName == 'SUMMARY' || (
    e.target.tagName == 'SPAN' && e.target.classList.contains('dropdown-caret')
  )) {
    prefer_gzip()
  }
})

})()
