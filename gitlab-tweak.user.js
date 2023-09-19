// ==UserScript==
// @name           GitLab tweaks
// @namespace      https://github.com/lilydjwg/userscripts
// @description    My GitLab tweaks
// @match          https://gitlab.com/*/issues/*
// @match          https://gitlab.com/*/merge_requests/*
// @match          https://gitlab.archlinux.org/*/issues/*
// @match          https://gitlab.archlinux.org/*/merge_requests/*
// @version	   0.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let notif
if(location.pathname.includes('/-/issues/')) {
  notif = document.querySelector('li[data-testid="notification-toggle"]')
  notif.style.listStyleType = 'none'
  notif.querySelector('form > div').style.paddingLeft = '0'
} else {
  notif = document.querySelector('li[data-testid="notification-toggle"]').parentNode
}
if(notif) {
  const sidebar = document.querySelector('aside > div.issuable-sidebar')
  sidebar.insertBefore(notif, sidebar.firstChild)
}

})()

