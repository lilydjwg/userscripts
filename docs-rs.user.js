// ==UserScript==
// @name           docs.rs tweaks
// @namespace      https://github.com/lilydjwg/userscripts
// @description    docs.rs tweaks
// @include        https://docs.rs/*
// @version        0.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let parts = location.pathname.split('/')
let version_index
if(parts[1] == 'crate'){
  version_index = 3
}else{
  version_index = 2
}
const version = parts[version_index]
let link_version
if(version == 'newest'){
  if(parts[1] == 'crate'){
    const el = document.querySelector('h1')
    link_version = el.textContent.split(' ', 2)[1]
  }else{
    const el = document.querySelectorAll('a.pure-menu-link > span.title')[1]
    link_version = el.textContent.split('-', 2)[1]
  }
}else if(version){
  link_version = 'newest'
}else{
  return
}

const list = document.querySelector('ul.pure-menu-list')
const li = document.createElement('li')
li.className = 'pure-menu-item'
const a = document.createElement('a')
parts[version_index] = link_version
a.className = 'pure-menu-link'
a.href = parts.join('/')
a.textContent = `${link_version} version`
li.appendChild(a)
list.appendChild(li)

})()
