(()=>{var h=self.Ultraviolet;function v(c){let e=c;function i(t,a){return e.slice(0,a)+t+e.slice(a)}return{injectHead:t=>{let a=e.indexOf("</head>");a!==-1&&(e=i(t,a))},injectCSS:t=>{let a=`<style>${t}</style>`,r=e.indexOf("</head>");r!==-1&&(e=i(a,r))},injectJS:t=>{let a=`<script>${t}<\/script>`,r=e.indexOf("</body>");r!==-1?e=i(a,r):e+=a},getModifiedHtml:()=>e}}var x=["cross-origin-embedder-policy","cross-origin-opener-policy","cross-origin-resource-policy","content-security-policy","content-security-policy-report-only","expect-ct","feature-policy","origin-isolation","strict-transport-security","upgrade-insecure-requests","x-content-type-options","x-download-options","x-frame-options","x-permitted-cross-domain-policies","x-powered-by","x-xss-protection"],S=["GET","HEAD"],p=class extends h.EventEmitter{constructor(e=__uv$config){super(),e.prefix||(e.prefix="/service/"),this.config=e,this.bareClient=new h.BareClient}route({request:e}){return!!e.url.startsWith(location.origin+this.config.prefix)}async fetch({request:e}){let i;try{if(!e.url.startsWith(location.origin+this.config.prefix))return await fetch(e);let t=new h(this.config);typeof this.config.construct=="function"&&this.config.construct(t,"service");let a=await t.cookie.db();t.meta.origin=location.origin,t.meta.base=t.meta.url=new URL(t.sourceUrl(e.url));let r=new y(e,t,S.includes(e.method.toUpperCase())?null:await e.blob());if(t.meta.url.protocol==="blob:"&&(r.blob=!0,r.base=r.url=new URL(r.url.pathname)),e.referrer&&e.referrer.startsWith(location.origin)){let n=new URL(t.sourceUrl(e.referrer));(r.headers.origin||t.meta.url.origin!==n.origin&&e.mode==="cors")&&(r.headers.origin=n.origin),r.headers.referer=n.href}let f=await t.cookie.getCookies(a)||[],g=t.cookie.serialize(f,t.meta,!1);r.headers["user-agent"]=navigator.userAgent,g&&(r.headers.cookie=g);let m=new u(r,null,null);if(this.emit("request",m),m.intercepted)return m.returnValue;if(i=r.blob?"blob:"+location.origin+r.url.pathname:r.url,typeof this.config.middleware=="function"){let n=new Request(i,{headers:r.headers,method:r.method,body:r.body,credentials:r.credentials,mode:r.mode,cache:r.cache,redirect:r.redirect}),s=await this.config.middleware(n);if(s instanceof Response)return s;s instanceof Request&&(i=s.url,r.headers=Object.fromEntries(s.headers.entries()),r.method=s.method,r.body=s.body,r.credentials=s.credentials,r.mode=s.mode,r.cache=s.cache,r.redirect=s.redirect)}let d=await this.bareClient.fetch(i,{headers:r.headers,method:r.method,body:r.body,credentials:r.credentials,mode:r.mode,cache:r.cache,redirect:r.redirect}),o=new b(r,d),l=new u(o,null,null);if(this.emit("beforemod",l),l.intercepted)return l.returnValue;for(let n of x)o.headers[n]&&delete o.headers[n];if(o.headers.location&&(o.headers.location=t.rewriteUrl(o.headers.location)),e.destination==="document"){let n=o.headers["content-disposition"];if(!/\s*?((inline|attachment);\s*?)filename=/i.test(n)){let s=/^\s*?attachment/i.test(n)?"attachment":"inline",[w]=new URL(d.finalURL).pathname.split("/").slice(-1);o.headers["content-disposition"]=`${s}; filename=${JSON.stringify(w)}`}}if(o.headers["set-cookie"]&&(Promise.resolve(t.cookie.setCookies(o.headers["set-cookie"],a,t.meta)).then(()=>{self.clients.matchAll().then(function(n){n.forEach(function(s){s.postMessage({msg:"updateCookies",url:t.meta.url.href})})})}),delete o.headers["set-cookie"]),o.body)switch(e.destination){case"script":case"worker":{let n=[t.bundleScript,t.clientScript,t.configScript,t.handlerScript].map(s=>JSON.stringify(s)).join(",");o.body=`if (!self.__uv && self.importScripts) { ${t.createJsInject(t.cookie.serialize(f,t.meta,!0),e.referrer)} importScripts(${n}); }
`,o.body+=t.js.rewrite(await d.text())}break;case"style":o.body=t.rewriteCSS(await d.text());break;case"iframe":case"document":if(C(t.meta.url,o.headers["content-type"]||"")){let n=await d.text();if(typeof this.config.inject=="function"){let s=v(n);await this.config.inject(s,new URL(i)),n=s.getModifiedHtml()}o.body=t.rewriteHtml(n,{document:!0,injectHead:t.createHtmlInject(t.handlerScript,t.bundleScript,t.clientScript,t.configScript,t.cookie.serialize(f,t.meta,!0),e.referrer)})}}return r.headers.accept==="text/event-stream"&&(o.headers["content-type"]="text/event-stream"),crossOriginIsolated&&(o.headers["Cross-Origin-Embedder-Policy"]="require-corp"),this.emit("response",l),l.intercepted?l.returnValue:new Response(o.body,{headers:o.headers,status:o.status,statusText:o.statusText})}catch(t){return["document","iframe"].includes(e.destination)?(console.error(t),U(t,i)):new Response(void 0,{status:500})}}static Ultraviolet=h};self.UVServiceWorker=p;var b=class{constructor(e,i){this.request=e,this.raw=i,this.ultraviolet=e.ultraviolet,this.headers={};for(let t in i.rawHeaders)this.headers[t.toLowerCase()]=i.rawHeaders[t];this.status=i.status,this.statusText=i.statusText,this.body=i.body}get url(){return this.request.url}get base(){return this.request.base}set base(e){this.request.base=e}},y=class{constructor(e,i,t=null){this.ultraviolet=i,this.request=e,this.headers=Object.fromEntries(e.headers.entries()),this.method=e.method,this.body=t||null,this.cache=e.cache,this.redirect=e.redirect,this.credentials="omit",this.mode=e.mode==="cors"?e.mode:"same-origin",this.blob=!1}get url(){return this.ultraviolet.meta.url}set url(e){this.ultraviolet.meta.url=e}get base(){return this.ultraviolet.meta.base}set base(e){this.ultraviolet.meta.base=e}};function C(c,e=""){return(h.mime.contentType(e||c.pathname)||"text/html").split(";")[0]==="text/html"}var u=class{#e;#t;constructor(e={},i=null,t=null){this.#e=!1,this.#t=null,this.data=e,this.target=i,this.that=t}get intercepted(){return this.#e}get returnValue(){return this.#t}respondWith(e){this.#t=e,this.#e=!0}};function k(c,e){let i=`
        errorTrace.value = ${JSON.stringify(c)};
        fetchedURL.textContent = ${JSON.stringify(e)};
        for (const node of document.querySelectorAll("#uvHostname")) node.textContent = ${JSON.stringify(location.hostname)};
        reload.addEventListener("click", () => location.reload());
        uvVersion.textContent = ${JSON.stringify("3.1.4")};
    `;return`<!DOCTYPE html>
        <html>
        <head>
        <meta charset='utf-8' />
        <title>Error</title>
        <style>
        * { background-color: white }
        </style>
        </head>
        <body>
        <h1 id='errorTitle'>Error processing your request</h1>
        <hr />
        <p>Failed to load <b id="fetchedURL"></b></p>
        <p id="errorMessage">Internal Server Error</p>
        <textarea id="errorTrace" cols="40" rows="10" readonly></textarea>
        <p>Try:</p>
        <ul>
        <li>Checking your internet connection</li>
        <li>Verifying you entered the correct address</li>
        <li>Clearing the site data</li>
        <li>Contacting <b id="uvHostname"></b>'s administrator</li>
        <li>Verify the server isn't censored</li>
        </ul>
        <p>If you're the administrator of <b id="uvHostname"></b>, try:</p>
        <ul>
        <li>Restarting your server</li>
        <li>Updating Ultraviolet</li>
        <li>Troubleshooting the error on the <a href="https://github.com/titaniumnetwork-dev/Ultraviolet" target="_blank">GitHub repository</a></li>
        </ul>
        <button id="reload">Reload</button>
        <hr />
        <p><i>Ultraviolet v<span id="uvVersion"></span></i></p>
        <script src="${"data:application/javascript,"+encodeURIComponent(i)}"><\/script>
        </body>
        </html>
        `}function U(c,e){let i={"content-type":"text/html"};return crossOriginIsolated&&(i["Cross-Origin-Embedder-Policy"]="require-corp"),new Response(k(String(c),e),{status:500,headers:i})}})();
//# sourceMappingURL=uv.sw.js.map
