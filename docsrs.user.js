// ==UserScript==
// @name           Docs.rs tweak
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Docs.rs tweak
// @include        https://docs.rs/*
// @version	   0.2
// @run-at	   document-end
// @grant          none
// ==/UserScript==


for(const link of document.querySelectorAll('.recent-releases-container > ul > li > a.release')) {
  if(link.href.indexOf('https://docs.rs/crate/') === 0) {
    continue
  }
  link.href = link.href.replace(/^(https:\/\/docs.rs\/[^/]+\/)[^/]+/, '$1latest')
}


function addStyle(css) {
  const head = document.getElementsByTagName('head')[0]
  if (head) {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.textContent = css
    head.appendChild(style)
    return style
  }
}

const css = 'a:visited .name { color: #964dae !important; }'

addStyle(css)

