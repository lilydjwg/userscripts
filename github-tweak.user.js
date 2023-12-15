// ==UserScript==
// @name           github tweaks
// @namespace      https://github.com/lilydjwg/userscripts
// @description    use gzip, use ssh
// @match          https://github.com/*
// @version	   1.10
// @grant          GM_addElement
// ==/UserScript==

(function() {
'use strict'

function prefer_gzip() {
  console.log('tweak: prefer_gzip starts')

  const dl = document.evaluate('//span[text()="Download ZIP"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  console.log('tweak: dl', dl)
  if(dl){
    const re = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/tree\/([^\/]+))?/
    const m = re.exec(location.href)
    const button_ref = document.querySelector('button#branch-picker-repos-header-ref-selector').textContent.trim()
    const ref = m[4] || button_ref
    dl.textContent = ''
    GM_addElement(dl, 'a', {
      href: `/${m[1]}/${m[2]}/archive/${ref}.tar.gz`,
      textContent: 'Download tar.gz',
    })
    console.log('tweak: download link added')
  }
}

console.log('tweak: start')
document.addEventListener('click', function() {
  setTimeout(prefer_gzip, 100)
})

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
