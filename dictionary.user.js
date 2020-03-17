// ==UserScript==
// @name          Dictionary.com tweaks
// @namespace     https://github.com/lilydjwg/userscripts
// @description	  Dictionary.com tweaks
// @version       0.1
// @include       https://www.dictionary.com/*
// ==/UserScript==

const ipa_button = document.evaluate('//button[text()="SHOW IPA"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0)
if(ipa_button) {
  ipa_button.click()
}
