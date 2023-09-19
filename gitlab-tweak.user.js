// ==UserScript==
// @name           GitLab tweaks
// @namespace      https://github.com/lilydjwg/userscripts
// @description    My GitLab tweaks
// @match          https://gitlab.com/*/issues/*
// @match          https://gitlab.com/*/merge_requests/*
// @match          https://gitlab.archlinux.org/*/issues/*
// @match          https://gitlab.archlinux.org/*/merge_requests/*
// @version	   0.1.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let notif
const is_issue = location.pathname.includes('/-/issues/')
if(is_issue) {
  notif = document.querySelector('li[data-testid="notification-toggle"]')
} else {
  notif = document.querySelector('li[data-testid="notification-toggle"]').parentNode
}
if(notif) {
  const sidebar = document.querySelector('aside > div.issuable-sidebar')
  sidebar.insertBefore(notif, sidebar.firstChild)
  if(is_issue) {
    notif.style.listStyleType = 'none'
    notif.querySelector('form > div').style.paddingLeft = '0'
    notif.querySelector('button').style.marginLeft = '0'
  }
}

})()

