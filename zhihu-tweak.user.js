// ==UserScript==
// @name         知乎修正
// @namespace    https://github.com/lilydjwg/userscripts
// @version      0.7
// @description  中键后台标签页、评论区 Tab 到提交按钮、图片立即加载、去除无意义链接
// @author       lilydjwg
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const func = function() {
  const content_node = document.querySelector('.PostIndex-content')
  if(!content_node) {
    return
  }
  const cloned = content_node.cloneNode(true)
  const parent = content_node.parentNode
  parent.insertBefore(cloned, content_node)
  parent.removeChild(content_node)

  for(let el of document.querySelectorAll('.PostIndex-content .VagueImage[data-src]')) {
    const img = document.createElement('img')
    img.src = el.dataset.src
    const a = document.createElement('a')
    a.href = el.dataset.src.replace(/_b(?=\.)/, '_r')
    a.appendChild(img)
    el.appendChild(a)
  }
  for(let el of document.querySelectorAll('.PostIndex-content img.column-gif')) {
    el.src = el.src.replace(/\.jpg$/, '.gif')
    el.parentNode.classList.add('is-playing')
  }

  for(let el of document.querySelectorAll('.PostIndex-content div.VagueImage-mask')) {
    el.parentNode.removeChild(el)
  }

  // videos
  for(let el of document.querySelectorAll('.PostIndex-content div.Video[data-za-module-info]')) {
    const info = JSON.parse(el.dataset.zaModuleInfo).card.content
    if(info.sub_type == 'SelfHosted') {
      const vid = info.video_id
      const vframe = document.createElement('iframe')
      vframe.src = `https://www.zhihu.com/video/${vid}`
      vframe.frameBorder = '0'
      vframe.allowFullscreen = true

      const player = el.querySelector('.VideoCard-player')
      player.appendChild(vframe)
    }
  }
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

const remove_meaningless_links = function() {
  for(const node of document.querySelectorAll('span > a[data-za-not-track-link]')){
    const text = node.textContent
    const el = document.createElement('span')
    el.textContent = text
    node.parentNode.parentNode.replaceChild(el, node.parentNode)
  }
}

setInterval(remove_meaningless_links, 1000)

// mobile site
const continue_in_browser_on_load = function() {
  let ell = document.querySelectorAll('.ModalWrap-itemBtn')
  if(ell.length == 2) {
    ell[1].click()
  }
}
setTimeout(continue_in_browser_on_load, 500)

const continue_in_browser = function() {
  let el = document.querySelector('.SkipModal .Button--plain')
  if(el) {
    el.click()
  }
}

document.addEventListener('click', function(e) {
  if(e.target.classList.contains('ContentItem-expandButton')) {
    setTimeout(continue_in_browser, 100)
  }
})

