// ==UserScript==
// @name         Arch Packages time
// @namespace    https://github.com/lilydjwg/userscripts
// @version      0.3
// @description  use local time format for package dates
// @match        https://archlinux.org/packages/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.12/dayjs.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.12/locale/en.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.12/plugin/customParseFormat.min.js
// @grant        none
// ==/UserScript==

'use strict'

function format_relative_time(d1, d2) {
  // in miliseconds
  const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  const rtf = new Intl.RelativeTimeFormat()
  // https://stackoverflow.com/a/60688789
  const elapsed = d1.valueOf() - d2.valueOf()

  for (const [u, period] of Object.entries(units)) {
    if (Math.abs(elapsed) > period || u === "second") {
      // https://stackoverflow.com/a/64972112
      return rtf.format(
        Math.round(elapsed / period),
        u
      )
    }
  }
}

// July 31, 2024, 6:45 a.m. UTC
const parse_format = 'MMMM D, YYYY, H:mm a ZZ'
const NOW = new Date()

function parse_date(t) {
  t = t.replace(/([ap])\.m\./, '$1m')
  t = t.replace('UTC', '+0000')
  // e.g. Dec. 22, 2023, 11 p.m. UTC
  t = t.replace(/( [0-9]+) ([ap]m)/, '$1:00 $2')
  return dayjs(t, parse_format, 'en')
}

{
  const nodes = document.evaluate('//table[@id="pkginfo"]//td[contains(text(), "UTC")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
  for(let i=0, len=nodes.snapshotLength; i<len; i++) {
    const el = nodes.snapshotItem(i)
    const d = parse_date(el.textContent)
    el.textContent = d.format('YYYY-MM-DD HH:mm ZZ')
    el.title = format_relative_time(d.toDate(), NOW)
  }
}

{
  const formatter2 = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  })
  const nodes2 = document.evaluate('//div[@id="pkglist-results" or @id="exact-matches"]//tr/td[position()=6 or position()=7]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
  for(let i=0, len=nodes2.snapshotLength; i<len; i++) {
    const el = nodes2.snapshotItem(i)
    if(el.textContent !== '') {
      const d = dayjs(el.textContent, 'MMMM D, YYYY', 'en')
      el.textContent = d.format('YYYY-MM-DD')
    }
  }
}
