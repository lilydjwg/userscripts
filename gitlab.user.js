// ==UserScript==
// @name           GitLab fixer
// @namespace      https://github.com/lilydjwg/userscripts
// @description    Fix GitLab for CN, HK, MO users
// @match          https://gitlab.com/*
// @match          https://about.gitlab.com/*
// @version	   0.1.0
// @run-at         document-start
// ==/UserScript==

(function() {
'use strict'

Object.defineProperty(window.navigator, 'language', {
  configurable: true,
  get: function() {
    return 'en-US'
  },
})

Object.defineProperty(window.navigator, 'languages', {
  configurable: true,
  get: function() {
    return ['en-US', 'en']
  },
})

})()

