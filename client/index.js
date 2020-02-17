var LIB=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=4)}([function(t,e,n){const r=n(5);t.exports=class{constructor(t,e={}){this._playing=!1,this.startTime=0,this.stopTime=0,this.format="hh:mm:ss.d0",this.maxTime=36e7-1,this.updateInterval=50,this._callback=()=>{},this._steps,this.offset=0,this.callback(t),Object.assign(this,e)}get ms(){return(this.playing?Date.now()+this.offset:this.stopTime)-this.startTime}get formatted(){return r(this.ms,this.format)}update(t){const{playing:e,...n}=t;return Object.assign(this,n),void 0!==e&&(this._playing!=e?this.playing=e:this._callback(this)),this.output()}callback(t){this._callback=e=>{t&&t(e)}}output(){return(({playing:t,startTime:e,stopTime:n,format:r,updateInterval:o,maxTime:i})=>({playing:t,startTime:e,stopTime:n,format:r,updateInterval:o,maxTime:i}))(this)}get playing(){return this._playing}set playing(t){if(this._playing!=t)return this._playing=0!=t,this._playing?(clearInterval(this._steps),this._steps=setInterval(()=>{this._callback(this)},this.updateTime)):clearInterval(this._steps),this._callback(this),this._playing}toggle(t=!this.playing){const e=Date.now();return t==!this.playing&&(t?(this.startTime=e-(this.stopTime-this.startTime),this.stopTime=void 0):this.stopTime=e),this.playing=0!=t,this.output()}reset(t=0){return t=Math.round(Math.min(Math.max(t,-this.maxTime),this.maxTime)),this.stopTime=Date.now(),this.startTime=this.stopTime-t,this._callback(this),this.output()}play(){return this.toggle(!0)}start(){return this.toggle(!0)}pause(){return this.toggle(!1)}stop(){return this.toggle(!1),this.reset()}}},function(t,e,n){var r,o,i;o=[],void 0===(i="function"==typeof(r=function(){if("WebSocket"in window)return t.prototype.onopen=function(t){},t.prototype.onclose=function(t){},t.prototype.onconnecting=function(t){},t.prototype.onmessage=function(t){},t.prototype.onerror=function(t){},t.debugAll=!1,t.CONNECTING=WebSocket.CONNECTING,t.OPEN=WebSocket.OPEN,t.CLOSING=WebSocket.CLOSING,t.CLOSED=WebSocket.CLOSED,t;function t(e,n,r){var o={debug:!1,automaticOpen:!0,reconnectInterval:1e3,maxReconnectInterval:3e4,reconnectDecay:1.5,timeoutInterval:2e3,maxReconnectAttempts:null};for(var i in r||(r={}),o)void 0!==r[i]?this[i]=r[i]:this[i]=o[i];this.url=e,this.reconnectAttempts=0,this.readyState=WebSocket.CONNECTING,this.protocol=null;var s,u=this,c=!1,a=!1,f=document.createElement("div");function l(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}f.addEventListener("open",(function(t){u.onopen(t)})),f.addEventListener("close",(function(t){u.onclose(t)})),f.addEventListener("connecting",(function(t){u.onconnecting(t)})),f.addEventListener("message",(function(t){u.onmessage(t)})),f.addEventListener("error",(function(t){u.onerror(t)})),this.addEventListener=f.addEventListener.bind(f),this.removeEventListener=f.removeEventListener.bind(f),this.dispatchEvent=f.dispatchEvent.bind(f),this.open=function(e){if(s=new WebSocket(u.url,n||[]),e){if(this.maxReconnectAttempts&&this.reconnectAttempts>this.maxReconnectAttempts)return}else f.dispatchEvent(l("connecting")),this.reconnectAttempts=0;(u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","attempt-connect",u.url);var r=s,o=setTimeout((function(){(u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","connection-timeout",u.url),a=!0,r.close(),a=!1}),u.timeoutInterval);s.onopen=function(n){clearTimeout(o),(u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onopen",u.url),u.protocol=s.protocol,u.readyState=WebSocket.OPEN,u.reconnectAttempts=0;var r=l("open");r.isReconnect=e,e=!1,f.dispatchEvent(r)},s.onclose=function(n){if(clearTimeout(o),s=null,c)u.readyState=WebSocket.CLOSED,f.dispatchEvent(l("close"));else{u.readyState=WebSocket.CONNECTING;var r=l("connecting");r.code=n.code,r.reason=n.reason,r.wasClean=n.wasClean,f.dispatchEvent(r),e||a||((u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onclose",u.url),f.dispatchEvent(l("close")));var o=u.reconnectInterval*Math.pow(u.reconnectDecay,u.reconnectAttempts);setTimeout((function(){u.reconnectAttempts++,u.open(!0)}),o>u.maxReconnectInterval?u.maxReconnectInterval:o)}},s.onmessage=function(e){(u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onmessage",u.url,e.data);var n=l("message");n.data=e.data,f.dispatchEvent(n)},s.onerror=function(e){(u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onerror",u.url,e),f.dispatchEvent(l("error"))}},1==this.automaticOpen&&this.open(!1),this.send=function(e){if(s)return(u.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","send",u.url,e),s.send(e);throw"INVALID_STATE_ERR : Pausing to reconnect websocket"},this.close=function(t,e){void 0===t&&(t=1e3),c=!0,s&&s.close(t,e)},this.refresh=function(){s&&s.close()}}})?r.apply(e,o):r)||(t.exports=i)},function(t,e,n){(function(e){t.exports=function t(e,n,r){function o(s,u){if(!n[s]){if(!e[s]){if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var a=n[s]={exports:{}};e[s][0].call(a.exports,(function(t){return o(e[s][1][t]||t)}),a,a.exports,t,e,n,r)}return n[s].exports}for(var i=!1,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){"use strict";var r=t("./raw"),o=[],i=[],s=r.makeRequestCallFromTimer((function(){if(i.length)throw i.shift()}));function u(t){var e;(e=o.length?o.pop():new c).task=t,r(e)}function c(){this.task=null}e.exports=u,c.prototype.call=function(){try{this.task.call()}catch(t){u.onerror?u.onerror(t):(i.push(t),s())}finally{this.task=null,o[o.length]=this}}},{"./raw":2}],2:[function(t,n,r){"use strict";function o(t){s.length||i(),s[s.length]=t}n.exports=o;var i,s=[],u=0;function c(){for(;u<s.length;){var t=u;if(u+=1,s[t].call(),u>1024){for(var e=0,n=s.length-u;e<n;e++)s[e]=s[e+u];s.length-=u,u=0}}s.length=0,u=0}var a,f,l,p=void 0!==e?e:self,h=p.MutationObserver||p.WebKitMutationObserver;function d(t){return function(){var e=setTimeout(r,0),n=setInterval(r,50);function r(){clearTimeout(e),clearInterval(n),t()}}}"function"==typeof h?(a=1,f=new h(c),l=document.createTextNode(""),f.observe(l,{characterData:!0}),i=function(){a=-a,l.data=a}):i=d(c),o.requestFlush=i,o.makeRequestCallFromTimer=d},{}],3:[function(t,e,n){"use strict";e.exports=t("./lib")},{"./lib":8}],4:[function(t,e,n){"use strict";var r=t("asap/raw");function o(){}var i=null,s={};function u(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("Promise constructor's argument is not a function");this._75=0,this._83=0,this._18=null,this._38=null,t!==o&&h(t,this)}function c(t,e){for(;3===t._83;)t=t._18;if(u._47&&u._47(t),0===t._83)return 0===t._75?(t._75=1,void(t._38=e)):1===t._75?(t._75=2,void(t._38=[t._38,e])):void t._38.push(e);!function(t,e){r((function(){var n=1===t._83?e.onFulfilled:e.onRejected;if(null!==n){var r=function(t,e){try{return t(e)}catch(t){return i=t,s}}(n,t._18);r===s?f(e.promise,i):a(e.promise,r)}else 1===t._83?a(e.promise,t._18):f(e.promise,t._18)}))}(t,e)}function a(t,e){if(e===t)return f(t,new TypeError("A promise cannot be resolved with itself."));if(e&&("object"==typeof e||"function"==typeof e)){var n=function(t){try{return t.then}catch(t){return i=t,s}}(e);if(n===s)return f(t,i);if(n===t.then&&e instanceof u)return t._83=3,t._18=e,void l(t);if("function"==typeof n)return void h(n.bind(e),t)}t._83=1,t._18=e,l(t)}function f(t,e){t._83=2,t._18=e,u._71&&u._71(t,e),l(t)}function l(t){if(1===t._75&&(c(t,t._38),t._38=null),2===t._75){for(var e=0;e<t._38.length;e++)c(t,t._38[e]);t._38=null}}function p(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function h(t,e){var n=!1,r=function(t,e,n){try{t(e,n)}catch(t){return i=t,s}}(t,(function(t){n||(n=!0,a(e,t))}),(function(t){n||(n=!0,f(e,t))}));n||r!==s||(n=!0,f(e,i))}e.exports=u,u._47=null,u._71=null,u._44=o,u.prototype.then=function(t,e){if(this.constructor!==u)return function(t,e,n){return new t.constructor((function(r,i){var s=new u(o);s.then(r,i),c(t,new p(e,n,s))}))}(this,t,e);var n=new u(o);return c(this,new p(t,e,n)),n}},{"asap/raw":2}],5:[function(t,e,n){"use strict";var r=t("./core.js");e.exports=r,r.prototype.done=function(t,e){var n=arguments.length?this.then.apply(this,arguments):this;n.then(null,(function(t){setTimeout((function(){throw t}),0)}))}},{"./core.js":4}],6:[function(t,e,n){"use strict";var r=t("./core.js");e.exports=r;var o=f(!0),i=f(!1),s=f(null),u=f(void 0),c=f(0),a=f("");function f(t){var e=new r(r._44);return e._83=1,e._18=t,e}r.resolve=function(t){if(t instanceof r)return t;if(null===t)return s;if(void 0===t)return u;if(!0===t)return o;if(!1===t)return i;if(0===t)return c;if(""===t)return a;if("object"==typeof t||"function"==typeof t)try{var e=t.then;if("function"==typeof e)return new r(e.bind(t))}catch(t){return new r((function(e,n){n(t)}))}return f(t)},r.all=function(t){var e=Array.prototype.slice.call(t);return new r((function(t,n){if(0===e.length)return t([]);var o=e.length;function i(s,u){if(u&&("object"==typeof u||"function"==typeof u)){if(u instanceof r&&u.then===r.prototype.then){for(;3===u._83;)u=u._18;return 1===u._83?i(s,u._18):(2===u._83&&n(u._18),void u.then((function(t){i(s,t)}),n))}var c=u.then;if("function"==typeof c)return void new r(c.bind(u)).then((function(t){i(s,t)}),n)}e[s]=u,0==--o&&t(e)}for(var s=0;s<e.length;s++)i(s,e[s])}))},r.reject=function(t){return new r((function(e,n){n(t)}))},r.race=function(t){return new r((function(e,n){t.forEach((function(t){r.resolve(t).then(e,n)}))}))},r.prototype.catch=function(t){return this.then(null,t)}},{"./core.js":4}],7:[function(t,e,n){"use strict";var r=t("./core.js");e.exports=r,r.prototype.finally=function(t){return this.then((function(e){return r.resolve(t()).then((function(){return e}))}),(function(e){return r.resolve(t()).then((function(){throw e}))}))}},{"./core.js":4}],8:[function(t,e,n){"use strict";e.exports=t("./core.js"),t("./done.js"),t("./finally.js"),t("./es6-extensions.js"),t("./node-extensions.js"),t("./synchronous.js")},{"./core.js":4,"./done.js":5,"./es6-extensions.js":6,"./finally.js":7,"./node-extensions.js":9,"./synchronous.js":10}],9:[function(t,e,n){"use strict";var r=t("./core.js"),o=t("asap");e.exports=r,r.denodeify=function(t,e){return"number"==typeof e&&e!==1/0?function(t,e){for(var n=[],o=0;o<e;o++)n.push("a"+o);var s=["return function ("+n.join(",")+") {","var self = this;","return new Promise(function (rs, rj) {","var res = fn.call(",["self"].concat(n).concat([i]).join(","),");","if (res &&",'(typeof res === "object" || typeof res === "function") &&','typeof res.then === "function"',") {rs(res);}","});","};"].join("");return Function(["Promise","fn"],s)(r,t)}(t,e):function(t){for(var e=Math.max(t.length-1,3),n=[],o=0;o<e;o++)n.push("a"+o);var s=["return function ("+n.join(",")+") {","var self = this;","var args;","var argLength = arguments.length;","if (arguments.length > "+e+") {","args = new Array(arguments.length + 1);","for (var i = 0; i < arguments.length; i++) {","args[i] = arguments[i];","}","}","return new Promise(function (rs, rj) {","var cb = "+i+";","var res;","switch (argLength) {",n.concat(["extra"]).map((function(t,e){return"case "+e+":res = fn.call("+["self"].concat(n.slice(0,e)).concat("cb").join(",")+");break;"})).join(""),"default:","args[argLength] = cb;","res = fn.apply(self, args);","}","if (res &&",'(typeof res === "object" || typeof res === "function") &&','typeof res.then === "function"',") {rs(res);}","});","};"].join("");return Function(["Promise","fn"],s)(r,t)}(t)};var i="function (err, res) {if (err) { rj(err); } else { rs(res); }}";r.nodeify=function(t){return function(){var e=Array.prototype.slice.call(arguments),n="function"==typeof e[e.length-1]?e.pop():null,i=this;try{return t.apply(this,arguments).nodeify(n,i)}catch(t){if(null==n)return new r((function(e,n){n(t)}));o((function(){n.call(i,t)}))}}},r.prototype.nodeify=function(t,e){if("function"!=typeof t)return this;this.then((function(n){o((function(){t.call(e,null,n)}))}),(function(n){o((function(){t.call(e,n)}))}))}},{"./core.js":4,asap:1}],10:[function(t,e,n){"use strict";var r=t("./core.js");e.exports=r,r.enableSynchronous=function(){r.prototype.isPending=function(){return 0==this.getState()},r.prototype.isFulfilled=function(){return 1==this.getState()},r.prototype.isRejected=function(){return 2==this.getState()},r.prototype.getValue=function(){if(3===this._83)return this._18.getValue();if(!this.isFulfilled())throw new Error("Cannot get a value of an unfulfilled promise.");return this._18},r.prototype.getReason=function(){if(3===this._83)return this._18.getReason();if(!this.isRejected())throw new Error("Cannot get a rejection reason of a non-rejected promise.");return this._18},r.prototype.getState=function(){return 3===this._83?this._18.getState():-1===this._83||-2===this._83?0:this._83}},r.disableSynchronous=function(){r.prototype.isPending=void 0,r.prototype.isFulfilled=void 0,r.prototype.isRejected=void 0,r.prototype.getValue=void 0,r.prototype.getReason=void 0,r.prototype.getState=void 0}},{"./core.js":4}],11:[function(t,e,n){"use strict";e.exports="undefined"==typeof window||void 0===window.Promise?t("promise"):window.Promise},{promise:3}],12:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(t){var e={};return t.emit=function(t,n){var r=e[t];r&&r.forEach((function(t){return t(n)}))},t.on=function(n,r){return(e[n]||(e[n]=[])).push(r),t},t.off=function(n,r){if(r){var o=e[n],i=o.indexOf(r);-1!==i&&o.splice(i,1),0===o.length&&delete e[n]}else delete e[n];return t},t.list=function(t){return e[t]||[]},t}},{}],13:[function(t,e,n){"use strict";function r(t,e,n,r,o,i){try{var s=new XMLHttpRequest;if(s.onreadystatechange=function(){if(4==s.readyState){var t=s.getResponseHeader("Content-Type");if(t&&-1!==t.indexOf("json"))try{var e=JSON.parse(s.responseText);o(null,e,s.status)}catch(t){o(t,null,s.status)}else o(null,s.responseText,s.status)}},r)for(var u in r)r.hasOwnProperty(u)&&s.setRequestHeader(u,r[u]);s.ontimeout=function(t){o(t,null,0)},s.open(t,e,!0),s.timeout=i,"string"==typeof n?s.send(n):n?(s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(n))):s.send()}catch(t){o(t,null,0)}}Object.defineProperty(n,"__esModule",{value:!0}),n.fetch=r,n.post=function(t,e,n){return new Promise((function(o,i){r("POST",t,e,null,(function(t,e,n){if(t)return i(t);o([e,n])}),n)}))}},{}],14:[function(t,e,n){"use strict";var r="undefined"!=typeof window;e.exports=t(r?"./request.browser":"./request.node")},{"./request.browser":13,"./request.node":15}],15:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.post=function(t,e,n){return new Promise((function(i,u){var c="string"===e?e:JSON.stringify(e),a=s(t),f={host:a.hostname,port:a.port,path:a.path,method:"POST",headers:{"Content-Length":c.length}};"string"!==e&&(f.headers["Content-Type"]="application/json");var l=("https:"===a.protocol?o.default:r.default).request(f,(function(t){t.setEncoding("utf8");var e="";t.on("data",(function(t){e+=t})),t.on("end",(function(){var n=t.headers["content-type"],r=n&&-1!==n.indexOf("json");try{var o=r?JSON.parse(e):e;i([o,t.statusCode])}catch(t){u(t)}}))}));l.on("error",u),l.on("socket",(function(t){t.setTimeout(n,(function(){l.abort()}))})),l.write(c),l.end()}))};var r=i(t("http")),o=i(t("https"));function i(t){return t&&t.__esModule?t:{default:t}}var s=i(t("url")).default.parse},{http:void 0,https:void 0,url:void 0}],16:[function(t,e,n){"use strict";function r(t,e){return t>e?1:t<e?-1:0}function o(t,e){return t+e}function i(t){return t.reduce(o)}function s(t){return i(t)/t.length}function u(t){if(t.length<2)return 0;var e=s(t);return t.map((function(t){return Math.pow(t-e,2)})).reduce(o)/(t.length-1)}Object.defineProperty(n,"__esModule",{value:!0}),n.compare=r,n.add=o,n.sum=i,n.mean=s,n.std=function(t){return Math.sqrt(u(t))},n.variance=u,n.median=function(t){if(t.length<2)return t[0];var e=t.slice().sort(r);return e.length%2==0?(e[t.length/2-1]+e[t.length/2])/2:e[(t.length-1)/2]}},{}],17:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.create=function(t){var e={options:{interval:36e5,timeout:1e4,delay:1e3,repeat:5,peers:[],server:null,now:Date.now},offset:0,_timeout:null,_inProgress:{},_isFirst:!0,send:function(t,n,o){return s.post(t,n,o).then((function(n){var r=n[0];e.receive(t,r)})).catch((function(t){r(t)}))},receive:function(t,n){void 0===n&&(n=t,t=void 0),n&&n.id in e._inProgress?e._inProgress[n.id](n.result):n&&void 0!==n.id&&e.send(t,{jsonrpc:"2.0",id:n.id,result:e.now()})},_handleRPCSendError:function(t,n,r){delete e._inProgress[t],n(new Error("Send failure"))},rpc:function(t,n,r){var i,s,u=o.nextId(),c=new f((function(t,e){i=t,s=e}));e._inProgress[u]=function(t){delete e._inProgress[u],i(t)};var a=void 0;try{a=e.send(t,{jsonrpc:"2.0",id:u,method:n,params:r},e.options.timeout)}catch(t){e._handleRPCSendError(u,s,t)}return a&&(a instanceof f||a.then&&a.catch)?a.catch(e._handleRPCSendError.bind(this,u,s)):console.warn("Send should return a promise"),c},sync:function(){e.emit("sync","start");var t=e.options.server?[e.options.server]:e.options.peers;return f.all(t.map((function(t){return e._syncWithPeer(t)}))).then((function(t){var n=t.filter((function(t){return e._validOffset(t)}));n.length>0&&(e.offset=i.mean(n),e.emit("change",e.offset)),e.emit("sync","end")}))},_validOffset:function(t){return null!==t&&!isNaN(t)&&isFinite(t)},_syncWithPeer:function(t){var n=[];function r(){return e._getOffset(t).then((function(t){return n.push(t)}))}function s(){return o.wait(e.options.delay).then(r)}function u(){return n.length<e.options.repeat}return r().then((function(){return o.whilst(u,s)})).then((function(){var t=n.filter((function(t){return null!==t})),e=t.map((function(t){return t.roundtrip})),r=i.median(e)+i.std(e),o=t.filter((function(t){return t.roundtrip<r})).map((function(t){return t.offset}));return o.length>0?i.mean(o):null}))},_getOffset:function(t){var n=e.options.now();return e.rpc(t,"timesync").then((function(t){var r=e.options.now(),o=r-n,i=t-r+o/2;return e._isFirst&&(e._isFirst=!1,e.offset=i,e.emit("change",i)),{roundtrip:o,offset:i}})).catch((function(t){return null}))},now:function(){return e.options.now()+e.offset},destroy:function(){clearTimeout(e._timeout)}};if(t){if(t.server&&t.peers)throw new Error('Configure either option "peers" or "server", not both.');for(var n in t)t.hasOwnProperty(n)&&("peers"===n&&"string"==typeof t.peers?e.options.peers=t.peers.split(",").map((function(t){return t.trim()})).filter((function(t){return""!==t})):e.options[n]=t[n])}function r(t){e.list("error").length>0?e.emit("error",t):console.log("Error",t)}return(0,c.default)(e),null!==e.options.interval&&(e._timeout=setInterval(e.sync,e.options.interval),setTimeout((function(){e.sync().catch((function(t){return r(t)}))}),0)),e};var r,o=a(t("./util.js")),i=a(t("./stat.js")),s=a(t("./request/request")),u=t("./emitter.js"),c=(r=u)&&r.__esModule?r:{default:r};function a(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}var f=t("./Promise")},{"./Promise":11,"./emitter.js":12,"./request/request":14,"./stat.js":16,"./util.js":18}],18:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.wait=function(t){return new r((function(e){setTimeout(e,t)}))},n.repeat=function(t,e){return new r((function(n,r){var o=0,i=[];!function r(){o<e?(o++,t().then((function(t){i.push(t),r()}))):n(i)}()}))},n.whilst=function(t,e){return new r((function(n,r){!function r(){t()?e().then((function(){return r()})):n()}()}))},n.nextId=function(){return o++};var r=t("./Promise"),o=0},{"./Promise":11}]},{},[17])(17)}).call(this,n(6))},function(t,e,n){"use strict";var r,o="object"==typeof Reflect?Reflect:null,i=o&&"function"==typeof o.apply?o.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};r=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var s=Number.isNaN||function(t){return t!=t};function u(){u.init.call(this)}t.exports=u,u.EventEmitter=u,u.prototype._events=void 0,u.prototype._eventsCount=0,u.prototype._maxListeners=void 0;var c=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function f(t){return void 0===t._maxListeners?u.defaultMaxListeners:t._maxListeners}function l(t,e,n,r){var o,i,s,u;if(a(n),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),s=i[e]),void 0===s)s=i[e]=n,++t._eventsCount;else if("function"==typeof s?s=i[e]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=f(t))>0&&s.length>o&&!s.warned){s.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=t,c.type=e,c.count=s.length,u=c,console&&console.warn&&console.warn(u)}return t}function p(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=p.bind(r);return o.listener=n,r.wrapFn=o,o}function d(t,e,n){var r=t._events;if(void 0===r)return[];var o=r[e];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(o):m(o,o.length)}function v(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}Object.defineProperty(u,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");c=t}}),u.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},u.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},u.prototype.getMaxListeners=function(){return f(this)},u.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var r="error"===t,o=this._events;if(void 0!==o)r=r&&void 0===o.error;else if(!r)return!1;if(r){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var u=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw u.context=s,u}var c=o[t];if(void 0===c)return!1;if("function"==typeof c)i(c,this,e);else{var a=c.length,f=m(c,a);for(n=0;n<a;++n)i(f[n],this,e)}return!0},u.prototype.addListener=function(t,e){return l(this,t,e,!1)},u.prototype.on=u.prototype.addListener,u.prototype.prependListener=function(t,e){return l(this,t,e,!0)},u.prototype.once=function(t,e){return a(e),this.on(t,h(this,t,e)),this},u.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,h(this,t,e)),this},u.prototype.removeListener=function(t,e){var n,r,o,i,s;if(a(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===e||n[i].listener===e){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,o),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,s||e)}return this},u.prototype.off=u.prototype.removeListener,u.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},u.prototype.listeners=function(t){return d(this,t,!0)},u.prototype.rawListeners=function(t){return d(this,t,!1)},u.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):v.call(t,e)},u.prototype.listenerCount=v,u.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},function(t,e,n){t.exports=n(7)},function(t,e){const n=Object.entries({h:[36e5,24],m:[6e4,60],s:[1e3,60],d:[100,10],c:[10,10]}).reduce((t,[e,[n,r]])=>(t[e]={divider:n,modulo:r},t),{});t.exports=(t,e)=>(t<0?"-":"")+Object.keys(n).reduce((r,o)=>r.replace(new RegExp(`${o}+`,"g"),(...r)=>((t,e)=>{const r=e.length,{divider:o,modulo:i}=n[e.charAt(0)];return("0000"+Math.floor(t/o%i)).slice(-r)})(Math.abs(((t,e)=>{const r=Object.keys(n).reduce((t,n)=>{const r=e.search(new RegExp(n));return r>=0?e[r]:t},e),o=n[r];return i=t,s=o.divider,i-(i<0?s:0+i%s);var i,s})(t,e)),r[0])),e)},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=n(1),s=n.n(i),u=n(2),c=n.n(u),a=n(3),f=n.n(a);var l=class extends o.a{constructor(t,e){super(t,e),((t,e={})=>{const{syncPath:n,delay:r,interval:o,stopAfter:i}=Object.assign(e,{syncPath:"/sync",delay:1e3,interval:5e3,stopAfter:1e4}),s=c.a.create({server:n,delay:r,interval:o});t.offset=s.now()-Date.now(),setTimeout(()=>{s.destroy()},i),s.on("change",()=>{t.offset=s.now()-Date.now()})})(this,e);const n=((t,e={})=>{const n=new f.a,{reconnectAttemptInterval:r,url:o}=Object.assign(e,{reconnectAttemptInterval:2e3,url:`ws://${window.location.host}`}),i=new s.a(o);return i.timeoutInterval=r,i.onopen=()=>{n.emit("connection")},i.onmessage=e=>{t.update(JSON.parse(e.data))},i.onclose=()=>{n.emit("disconnection")},window.onbeforeunload=()=>{i.onclose(),i.close()},n})(this,e);this.on=n.on.bind(n)}};e.default=l}]);export default LIB.default;
//# sourceMappingURL=index.js.map