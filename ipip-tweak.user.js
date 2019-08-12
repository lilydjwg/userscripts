// ==UserScript==
// @name           ipip.net 优化
// @namespace      https://github.com/lilydjwg/userscripts
// @description    ipip.net 优化
// @include        https://tools.ipip.net/dns.php
// @version	   0.1
// @grant          none
// ==/UserScript==

const domain_input = document.getElementById('domain')
domain_input.value = ''
domain_input.focus()
