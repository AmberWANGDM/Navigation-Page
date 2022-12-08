const $siteList = $('.site-list')
const $lastBox = $siteList.find('li.last')
let liObject = JSON.parse(localStorage.getItem('li'))
const hashMap = [
  { logo: 'G', url: 'https://google.com' },
  { logo: 'B', url: 'https://bilibili.com' },
]
const removePrefix = (url) => {
  return url.replace('https://', '').replace('www.', '').replace(/\/.*/, '')
}

function render() {
  $siteList.find('li:not(li.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`
      <li>
        <div class="site">
          <div class="logo">${node.logo[0]}</div>
          <div class="link">${removePrefix(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-del"></use>
            </svg>
          </div>
        </div>
      </li>
    `).insertBefore($lastBox)
    $li.on('click', () => {
      window.open(node.url)
    })
    // 删除收藏
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.addButton').on('click', () => {
  let url = window.prompt('请输入要添加的网址链接')
  if (url.trim() === '') {
    alert('请输入有效网址')
    return
  }
  if (url.indexOf('https://') !== 0) {
    url = 'https://' + url
  }
  hashMap.push({
    logo: removePrefix(url)[0],
    url: url,
  })
  $siteList.find('li:not(.last)').remove()
  render()
})

// 页面退出或刷新前localStorage保存收藏
onunload = () => {
  localStorage.setItem('li', JSON.stringify(hashMap))
}

$(document).on('keypress', (e) => {
  const { key } = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})
