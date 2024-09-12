// ==UserScript==
// @name           Element.io tweak
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Element.io tweak
// @match          https://chat.mozilla.org/*
// @match          https://app.element.io/*
// @match          https://element.catgirl.cloud/*
// @match          https://app.schildi.chat/*
// @version        0.1.3
// @run-at         document-idle
// @grant          none
// @sandbox        JavaScript
// ==/UserScript==

const ICON_URL = 'https://telegram.org/img/website_icon.svg'

const img = document.createElement('img')
img.src = ICON_URL
img.style.position = 'relative'
img.style.top = '20px'
img.style.left = '-10px'
img.style.pointerEvents = 'none'

const img_typing = img.cloneNode()
img_typing.style.width = '12px'
img_typing.style.height = '12px'
img_typing.style.top = '16px'
img_typing.style.left = '-8px'

const img_member = img.cloneNode()
img_member.style.width = '8px'
img_member.style.height = '8px'
img_member.style.top = '7px'
img_member.style.left = '-6px'

// no longer works
const img_reply = img.cloneNode()
img_reply.style.width = '8px'
img_reply.style.height = '8px'
img_reply.style.top = '6px'
img_reply.style.left = '-6px'
img_reply.style.marginRight = '-6px'

function insertAfter(location, newnode) {
  if(location.nextSibling) {
    location.parentNode.insertBefore(newnode, location.nextSibling)
  }else{
    location.parentNode.appendChild(newnode)
  }
}

function doit() {
  for(let avatar of document.querySelectorAll('ol.mx_RoomView_MessageList [title^="@telegram_"][title$=":t2bot.io"], ol.mx_RoomView_MessageList [title^="@telegram_"][title$=":nichi.co"], ol.mx_RoomView_MessageList [title^="@telegram_"][title$=":moe.cat"], ol.mx_RoomView_MessageList [title^="@perigram_"][title$=":neo.angry.im"]')) {
    const width = avatar.width
    if(avatar.parentNode.tagName == 'SPAN' && avatar.parentNode.classList.contains('mx_Pill')) { // in reply to
      if(avatar.nextSibling.nodeType == Node.TEXT_NODE) {
        avatar.parentNode.insertBefore(img_reply.cloneNode(), avatar.nextSibling)
      }
      continue
    }
    if(!avatar.nextSibling || avatar.nextSibling.classList.contains('mx_DisambiguatedProfile')) {
      if(width >= 24) {
        insertAfter(avatar, img_typing.cloneNode())
      }else if(width >= 14 && width <= 16) {
        insertAfter(avatar, img_member.cloneNode())
      } else {
        insertAfter(avatar, img.cloneNode())
      }
    }
  }
}

setInterval(doit, 1100)
