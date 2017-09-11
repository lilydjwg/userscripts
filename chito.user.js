// ==UserScript==
// @name           Chito 后台评论地理位置显示
// @namespace      https://github.com/lilydjwg/tampermonkey-scripts
// @description    通过 JSONP 查询 IP 地址对应的地理位置并显示
// @include        http://*.is-programmer.com/admin*
// @include        http://blog.lilydjwg.me/admin*
// @include        https://blog.lilydjwg.me/admin*
// @version        1.1
// @grant          GM_xmlhttpRequest
// ==/UserScript==

const qurl = function(ips){
  return 'http://localhost:4321/queryip?q=' + ips.join(',')
}

const letsJQuery = function(){
  const ip_header = document.evaluate(
    '//th[@class="helpHed" and text()="IP"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
  ).snapshotItem(0)
  const ip_cells = document.getElementsByClassName('comment_ip_col')
  const ips = []
  let i, len
  for(let cell of ip_cells){
    ips.push(cell.textContent)
  }

  GM_xmlhttpRequest({
    method: 'GET',
    url: qurl(ips),
    headers: {
      Accept: 'application/json',
    },
    onload: function(response) {
      const ans = JSON.parse(response.responseText).ans
      for(i=0, len=ip_cells.length; i<len; i++){
        $(ip_cells[i]).after('<td class="comment_addr_col" style="min-width: 10em;">'+ans[i]+'</td>')
      }
      $(ip_header).after('<th class="helpHed">地址</th>')
    },
  })
}

function GM_wait(){
  if(/\/(comments|messages|spams)\b/.test(location)){
    if(typeof unsafeWindow.jQuery == 'undefined') {
      setTimeout(GM_wait, 500)
    }else{
      $ = unsafeWindow.jQuery
      letsJQuery()
    }
  }
}

GM_wait()
