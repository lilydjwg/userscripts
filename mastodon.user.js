// ==UserScript==
// @name           Mastodon fixes
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Mastodon fixes
// @include        https://niu.moe/*
// @version	   0.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

// don't treat Esc as unfocusing the textarea because it may come when cancelling IME composition
// https://github.com/tootsuite/mastodon/issues/5574#issuecomment-383074604
window.addEventListener('keyup', e => {
  if (e.target.matches('.autosuggest-textarea__textarea') && e.key === 'Escape') {
    e.stopPropagation()
  }
}, true)

})()
