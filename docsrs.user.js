// ==UserScript==
// @name           Docs.rs tweak
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Docs.rs tweak
// @include        https://docs.rs/*
// @version	   0.1
// @run-at	   document-idle
// @grant          none
// ==/UserScript==

const css = 'a:visited .name { color: #324d73 !important; }'
addStyle(css)

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

for(const link of document.querySelectorAll('.recent-releases-container > ul > li > a.release') {
  link.href = link.href.replace(/^(\/[^/]+\/)[^/]+/, '$1latest')
}

