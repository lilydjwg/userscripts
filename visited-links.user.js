// ==UserScript==
// @name          visited links
// @namespace     https://github.com/lilydjwg/userscripts
// @description	  Use default color for visited links
// @version       2.0
// @include       http://www.yaml.org/*
// @include       https://pythonhosted.org/*
// @include       http://www.freelists.org/*
// @include       https://*.readthedocs.io/*
// @include       http://docs.wand-py.org/*
// ==/UserScript==

const css = 'a:visited { color: #551a8b !important; }'
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
