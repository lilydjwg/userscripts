// ==UserScript==
// @name           github tweaks
// @namespace      https://blog.lilydjwg.me/
// @description    use gzip, use ssh
// @include        https://github.com/*
// @version	   1.8
// @grant          none
// ==/UserScript==
 
(function() {
'use strict'

const  dl = document.querySelector('a[data-ga-click*="download zip"]')
if(dl){
  dl.dataset.gaClick = dl.dataset.gaClick.replace('zip', 'gzip')
  dl.href = dl.href.replace(/\.zip$/, '.tar.gz')
  dl.textContent = dl.textContent.replace('ZIP', 'GZIP')
}

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

})()
