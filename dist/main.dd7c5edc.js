// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.site-list');
$siteList.sortable({ filter: '.last' });
var $lastBox = $siteList.find('li.last');
var liObject = JSON.parse(localStorage.getItem('li'));
var hashMap = [{ logo: 'G', url: 'https://google.com' }, { logo: 'B', url: 'https://bilibili.com' }, { logo: 'I', url: 'https://www.iconfont.cn' }, { logo: 'V', url: 'https://cn.vuejs.org/guide/introduction.html' }, { logo: 'J', url: 'https://jirengu.com/' }, { logo: 'G', url: 'https://github.com/' }, { logo: 'R', url: 'https://zh-hans.reactjs.org/' }];

var removePrefix = function removePrefix(url) {
  return url.replace('https://', '').replace('www.', '').replace(/\/.*/, '');
};

function render() {
  $siteList.find('li:not(li.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $('\n      <li>\n        <div class="site">\n          <div class="logo">' + node.logo[0] + '</div>\n          <div class="link">' + removePrefix(node.url) + '</div>\n          <div class="close">\n            <svg class="icon">\n              <use xlink:href="#icon-del"></use>\n            </svg>\n          </div>\n        </div>\n      </li>\n    ').insertBefore($lastBox);
    $li.on('click', function () {
      window.open(node.url);
    });
    // 删除收藏
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
}
render();

$('.addButton').on('click', function () {
  var url = window.prompt('请输入要添加的网址链接');
  if (url.trim() === '') {
    alert('请输入有效网址');
    return;
  }
  if (url.indexOf('https://') !== 0) {
    url = 'https://' + url;
  }
  hashMap.push({
    logo: removePrefix(url)[0],
    url: url
  });
  $siteList.find('li:not(.last)').remove();
  render();
});

// 页面退出或刷新前localStorage保存收藏
onunload = function onunload() {
  localStorage.setItem('li', JSON.stringify(hashMap));
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

// 修复输入框输入英文字母会跳转bug
$('.search-area>input').on('keypress', function (e) {
  e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.dd7c5edc.map