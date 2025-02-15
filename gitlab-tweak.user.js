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
// @version	   0.2.5
// @grant          none
// ==/UserScript==

(function() {
'use strict'

const add_item = function(el, sidebar) {
  el.style.listStyleType = 'none'
  el.style.paddingLeft = '0'
  el.style.width = '250px'
  el.querySelector('button').style.paddingLeft = '0'
  sidebar.insertBefore(el, sidebar.firstChild)
}

const main = function() {
  let notif, issueref
  const is_issue = location.pathname.includes('/-/issues/')
  if(is_issue) {
    notif = document.querySelector('li[data-testid="notification-toggle"]')
    issueref = document.querySelector('li[data-testid="copy-reference"]')
  } else {
    notif = document.querySelector('li[data-testid="notification-toggle"]').parentNode
  }
  if(notif) {
    const sidebar = document.querySelector('aside > div.issuable-sidebar')
    if(is_issue) {
      add_item(notif, sidebar)
      add_item(issueref, sidebar)
    }else{
      sidebar.insertBefore(notif, sidebar.firstChild)
    }
    return true
  } else {
    return false
  }
}

const doit = function(count) {
  if(count <= 0) return
  if(!main()) {
    setTimeout(() => { doit(count-1) }, 1000)
  }
}

doit(10)

})()

