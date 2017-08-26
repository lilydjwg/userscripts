// ==UserScript==
// @name         知乎修正
// @namespace    https://blog.lilydjwg.me/
// @version      0.1
// @description  中键后台标签页、评论区 Tab 到提交按钮
// @author       lilydjwg
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
'use strict'

const func = function() {
  const content_node = document.querySelector('.PostIndex-content')
  if(!content_node) {
    return
  }
  const cloned = content_node.cloneNode(true)
  const parent = content_node.parentNode
  parent.insertBefore(cloned, content_node)
  parent.removeChild(content_node)
}

setTimeout(func, 500)

const check_comment_actions = function(evt) {
  const  el = evt.target
  if(el.classList.contains('public-DraftStyleDefault-block')){
    const  actions = document.querySelectorAll('.CommentEditor-actions > .Button--plain:first-child')
    console.debug('actions', actions)
    for(let el of actions) {
      const p = el.parentNode
      const primary = el.nextSibling
      p.insertBefore(primary, el)
    }
  }
  return true
}

document.body.addEventListener('click', check_comment_actions)

})()
