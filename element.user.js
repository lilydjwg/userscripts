// ==UserScript==
// @name           Element.io tweak
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Element.io tweak
// @include        https://chat.mozilla.org/*
// @include        https://app.element.io/*
// @version        0.1
// @run-at         document-idle
// @grant          none
// ==/UserScript==

const ICON_URL = 'https://telegram.org/img/website_icon.svg'

const img = document.createElement('img')
img.src = ICON_URL
img.style.position = 'relative'
img.style.top = '20px'
img.style.left = '-10px'
img.style.pointerEvents = 'none'

const img_typing = img.cloneNode()
img_typing.width = 12
img_typing.height = 12
img_typing.style.top = '16px'
img_typing.style.left = '-8px'

const img_member = img.cloneNode()
img_member.width = 8
img_member.height = 8
img_member.style.top = '2px'
img_member.style.left = '-6px'

const img_reply = img.cloneNode()
img_reply.width = 8
img_reply.height = 8
img_reply.style.top = '6px'
img_reply.style.left = '-6px'
img_reply.style.marginRight = '-6px'

function doit() {
  for(let avatar of document.querySelectorAll('ol.mx_RoomView_MessageList img[title^="@telegram_"][title$=":t2bot.io"], ol.mx_RoomView_MessageList img[title^="@telegram_"][title$=":nichi.co"]')) {
    const width = avatar.width
    if(avatar.parentNode.tagName == 'SPAN' && width == 16) { // in reply to
      if(avatar.nextSibling.nodeType == Node.TEXT_NODE) {
        avatar.parentNode.insertBefore(img_reply.cloneNode(), avatar.nextSibling)
      }
      continue
    } else if(avatar.parentNode.tagName == 'SPAN') { // users without avatar images
      avatar = avatar.parentNode
    }
    if(!avatar.nextSibling) {
      if(width == 24) {
        avatar.parentNode.appendChild(img_typing.cloneNode())
      }else if(width == 14) {
        avatar.parentNode.appendChild(img_member.cloneNode())
      } else {
        avatar.parentNode.appendChild(img.cloneNode())
      }
    }
  }
}

setInterval(doit, 1100)
