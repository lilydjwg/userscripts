// ==UserScript==
// @name          visited links
// @namespace     https://github.com/lilydjwg/userscripts
// @description	  Use default color for visited links
// @version       1.1
// @grant         GM_addStyle
// @include       http://docs.python-requests.org/*
// @include       http://www.yaml.org/*
// @include       https://pythonhosted.org/*
// @include       http://www.freelists.org/*
// @include       https://*.readthedocs.io/*
// @include       http://docs.wand-py.org/*
// ==/UserScript==

/* global GM_addStyle */

let css
css = 'a:visited { color: #551a8b !important; }'
GM_addStyle(css)
