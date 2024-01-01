// ==UserScript==
// @name           GitLab tweaks
// @namespace      https://github.com/lilydjwg/userscripts
// @description    My GitLab tweaks
// @match          https://gitlab.com/*/issues/*
// @match          https://gitlab.com/*/merge_requests/*
// @match          https://gitlab.archlinux.org/*/issues/*
// @match          https://gitlab.archlinux.org/*/merge_requests/*
// @match          https://gitlab.gnome.org/*/issues/*
// @match          https://gitlab.gnome.org/*/merge_requests/*
// @match          https://gitlab.freedesktop.org/*/issues/*
// @match          https://gitlab.freedesktop.org/*/merge_requests/*
// @version	   0.2.3
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let notif, issueref
const is_issue = location.pathname.includes('/-/issues/')
if(is_issue) {
  notif = document.querySelector('li[data-testid="notification-toggle"]')
  issueref = document.querySelector('button[data-testid="copy-reference"]')
} else {
  notif = document.querySelector('li[data-testid="notification-toggle"]').parentNode
}
if(notif) {
  const sidebar = document.querySelector('aside > div.issuable-sidebar')
  sidebar.insertBefore(notif, sidebar.firstChild)
  if(is_issue) {
    notif.style.listStyleType = 'none'
    notif.style.paddingLeft = '0'
    notif.style.width = '250px'
    notif.querySelector('button').style.paddingLeft = '0'
    sidebar.insertBefore(issueref, sidebar.firstChild)
    issueref.style.paddingLeft = '0'
  }
}

})()

