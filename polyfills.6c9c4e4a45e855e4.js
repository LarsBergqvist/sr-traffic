"use strict";(self.webpackChunksr_traffic=self.webpackChunksr_traffic||[]).push([[429],{565:(zt,Kn,Zn)=>{class Mg extends Error{constructor(e){super(`No translation found for ${Ql(e)}.`),this.parsedMessage=e,this.type="MissingTranslationError"}}const Wo=function(s,...e){if(Wo.translate){const n=Wo.translate(s,e);s=n[0],e=n[1]}let t=Jl(s[0],s.raw[0]);for(let n=1;n<s.length;n++)t+=e[n-1]+Jl(s[n],s.raw[n]);return t};function Jl(s,e){return":"===e.charAt(0)?s.substring(function Xl(s,e){for(let t=1,n=1;t<s.length;t++,n++)if("\\"===e[n])n++;else if(":"===s[t])return t;throw new Error(`Unterminated $localize metadata block in "${e}".`)}(s,e)+1):s}(()=>typeof globalThis<"u"&&globalThis||typeof global<"u"&&global||typeof window<"u"&&window||typeof self<"u"&&typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&self)().$localize=Wo,Zn(583)},583:()=>{!function(f){const v=f.performance;function x(me){v&&v.mark&&v.mark(me)}function _(me,V){v&&v.measure&&v.measure(me,V)}x("Zone");const S=f.__Zone_symbol_prefix||"__zone_symbol__";function C(me){return S+me}const q=!0===f[C("forceDuplicateZoneCheck")];if(f.Zone){if(q||"function"!=typeof f.Zone.__symbol__)throw new Error("Zone already loaded.");return f.Zone}let H=(()=>{class me{constructor(d,m){this._parent=d,this._name=m?m.name||"unnamed":"<root>",this._properties=m&&m.properties||{},this._zoneDelegate=new X(this,this._parent&&this._parent._zoneDelegate,m)}static assertZonePatched(){if(f.Promise!==Je.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let d=me.current;for(;d.parent;)d=d.parent;return d}static get current(){return Me.zone}static get currentTask(){return Oe}static __load_patch(d,m,K=!1){if(Je.hasOwnProperty(d)){if(!K&&q)throw Error("Already loaded patch: "+d)}else if(!f["__Zone_disable_"+d]){const ee="Zone:"+d;x(ee),Je[d]=m(f,me,Re),_(ee,ee)}}get parent(){return this._parent}get name(){return this._name}get(d){const m=this.getZoneWith(d);if(m)return m._properties[d]}getZoneWith(d){let m=this;for(;m;){if(m._properties.hasOwnProperty(d))return m;m=m._parent}return null}fork(d){if(!d)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,d)}wrap(d,m){if("function"!=typeof d)throw new Error("Expecting function got: "+d);const K=this._zoneDelegate.intercept(this,d,m),ee=this;return function(){return ee.runGuarded(K,this,arguments,m)}}run(d,m,K,ee){Me={parent:Me,zone:this};try{return this._zoneDelegate.invoke(this,d,m,K,ee)}finally{Me=Me.parent}}runGuarded(d,m=null,K,ee){Me={parent:Me,zone:this};try{try{return this._zoneDelegate.invoke(this,d,m,K,ee)}catch(O){if(this._zoneDelegate.handleError(this,O))throw O}}finally{Me=Me.parent}}runTask(d,m,K){if(d.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(d.zone||Fe).name+"; Execution: "+this.name+")");if(d.state===G&&(d.type===Qe||d.type===J))return;const ee=d.state!=j;ee&&d._transitionTo(j,ce),d.runCount++;const O=Oe;Oe=d,Me={parent:Me,zone:this};try{d.type==J&&d.data&&!d.data.isPeriodic&&(d.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,d,m,K)}catch(I){if(this._zoneDelegate.handleError(this,I))throw I}}finally{d.state!==G&&d.state!==R&&(d.type==Qe||d.data&&d.data.isPeriodic?ee&&d._transitionTo(ce,j):(d.runCount=0,this._updateTaskCount(d,-1),ee&&d._transitionTo(G,j,G))),Me=Me.parent,Oe=O}}scheduleTask(d){if(d.zone&&d.zone!==this){let K=this;for(;K;){if(K===d.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${d.zone.name}`);K=K.parent}}d._transitionTo(xe,G);const m=[];d._zoneDelegates=m,d._zone=this;try{d=this._zoneDelegate.scheduleTask(this,d)}catch(K){throw d._transitionTo(R,xe,G),this._zoneDelegate.handleError(this,K),K}return d._zoneDelegates===m&&this._updateTaskCount(d,1),d.state==xe&&d._transitionTo(ce,xe),d}scheduleMicroTask(d,m,K,ee){return this.scheduleTask(new W(Y,d,m,K,ee,void 0))}scheduleMacroTask(d,m,K,ee,O){return this.scheduleTask(new W(J,d,m,K,ee,O))}scheduleEventTask(d,m,K,ee,O){return this.scheduleTask(new W(Qe,d,m,K,ee,O))}cancelTask(d){if(d.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(d.zone||Fe).name+"; Execution: "+this.name+")");d._transitionTo(Ce,ce,j);try{this._zoneDelegate.cancelTask(this,d)}catch(m){throw d._transitionTo(R,Ce),this._zoneDelegate.handleError(this,m),m}return this._updateTaskCount(d,-1),d._transitionTo(G,Ce),d.runCount=0,d}_updateTaskCount(d,m){const K=d._zoneDelegates;-1==m&&(d._zoneDelegates=null);for(let ee=0;ee<K.length;ee++)K[ee]._updateTaskCount(d.type,m)}}return me.__symbol__=C,me})();const $={name:"",onHasTask:(me,V,d,m)=>me.hasTask(d,m),onScheduleTask:(me,V,d,m)=>me.scheduleTask(d,m),onInvokeTask:(me,V,d,m,K,ee)=>me.invokeTask(d,m,K,ee),onCancelTask:(me,V,d,m)=>me.cancelTask(d,m)};class X{constructor(V,d,m){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=V,this._parentDelegate=d,this._forkZS=m&&(m&&m.onFork?m:d._forkZS),this._forkDlgt=m&&(m.onFork?d:d._forkDlgt),this._forkCurrZone=m&&(m.onFork?this.zone:d._forkCurrZone),this._interceptZS=m&&(m.onIntercept?m:d._interceptZS),this._interceptDlgt=m&&(m.onIntercept?d:d._interceptDlgt),this._interceptCurrZone=m&&(m.onIntercept?this.zone:d._interceptCurrZone),this._invokeZS=m&&(m.onInvoke?m:d._invokeZS),this._invokeDlgt=m&&(m.onInvoke?d:d._invokeDlgt),this._invokeCurrZone=m&&(m.onInvoke?this.zone:d._invokeCurrZone),this._handleErrorZS=m&&(m.onHandleError?m:d._handleErrorZS),this._handleErrorDlgt=m&&(m.onHandleError?d:d._handleErrorDlgt),this._handleErrorCurrZone=m&&(m.onHandleError?this.zone:d._handleErrorCurrZone),this._scheduleTaskZS=m&&(m.onScheduleTask?m:d._scheduleTaskZS),this._scheduleTaskDlgt=m&&(m.onScheduleTask?d:d._scheduleTaskDlgt),this._scheduleTaskCurrZone=m&&(m.onScheduleTask?this.zone:d._scheduleTaskCurrZone),this._invokeTaskZS=m&&(m.onInvokeTask?m:d._invokeTaskZS),this._invokeTaskDlgt=m&&(m.onInvokeTask?d:d._invokeTaskDlgt),this._invokeTaskCurrZone=m&&(m.onInvokeTask?this.zone:d._invokeTaskCurrZone),this._cancelTaskZS=m&&(m.onCancelTask?m:d._cancelTaskZS),this._cancelTaskDlgt=m&&(m.onCancelTask?d:d._cancelTaskDlgt),this._cancelTaskCurrZone=m&&(m.onCancelTask?this.zone:d._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const K=m&&m.onHasTask;(K||d&&d._hasTaskZS)&&(this._hasTaskZS=K?m:$,this._hasTaskDlgt=d,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=V,m.onScheduleTask||(this._scheduleTaskZS=$,this._scheduleTaskDlgt=d,this._scheduleTaskCurrZone=this.zone),m.onInvokeTask||(this._invokeTaskZS=$,this._invokeTaskDlgt=d,this._invokeTaskCurrZone=this.zone),m.onCancelTask||(this._cancelTaskZS=$,this._cancelTaskDlgt=d,this._cancelTaskCurrZone=this.zone))}fork(V,d){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,V,d):new H(V,d)}intercept(V,d,m){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,V,d,m):d}invoke(V,d,m,K,ee){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,V,d,m,K,ee):d.apply(m,K)}handleError(V,d){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,V,d)}scheduleTask(V,d){let m=d;if(this._scheduleTaskZS)this._hasTaskZS&&m._zoneDelegates.push(this._hasTaskDlgtOwner),m=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,V,d),m||(m=d);else if(d.scheduleFn)d.scheduleFn(d);else{if(d.type!=Y)throw new Error("Task is missing scheduleFn.");ie(d)}return m}invokeTask(V,d,m,K){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,V,d,m,K):d.callback.apply(m,K)}cancelTask(V,d){let m;if(this._cancelTaskZS)m=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,V,d);else{if(!d.cancelFn)throw Error("Task is not cancelable");m=d.cancelFn(d)}return m}hasTask(V,d){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,V,d)}catch(m){this.handleError(V,m)}}_updateTaskCount(V,d){const m=this._taskCounts,K=m[V],ee=m[V]=K+d;if(ee<0)throw new Error("More tasks executed then were scheduled.");0!=K&&0!=ee||this.hasTask(this.zone,{microTask:m.microTask>0,macroTask:m.macroTask>0,eventTask:m.eventTask>0,change:V})}}class W{constructor(V,d,m,K,ee,O){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=V,this.source=d,this.data=K,this.scheduleFn=ee,this.cancelFn=O,!m)throw new Error("callback is not defined");this.callback=m;const I=this;this.invoke=V===Qe&&K&&K.useG?W.invokeTask:function(){return W.invokeTask.call(f,I,this,arguments)}}static invokeTask(V,d,m){V||(V=this),Ie++;try{return V.runCount++,V.zone.runTask(V,d,m)}finally{1==Ie&&F(),Ie--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(G,xe)}_transitionTo(V,d,m){if(this._state!==d&&this._state!==m)throw new Error(`${this.type} '${this.source}': can not transition to '${V}', expecting state '${d}'${m?" or '"+m+"'":""}, was '${this._state}'.`);this._state=V,V==G&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const _e=C("setTimeout"),le=C("Promise"),re=C("then");let Ke,Ne=[],we=!1;function Le(me){if(Ke||f[le]&&(Ke=f[le].resolve(0)),Ke){let V=Ke[re];V||(V=Ke.then),V.call(Ke,me)}else f[_e](me,0)}function ie(me){0===Ie&&0===Ne.length&&Le(F),me&&Ne.push(me)}function F(){if(!we){for(we=!0;Ne.length;){const me=Ne;Ne=[];for(let V=0;V<me.length;V++){const d=me[V];try{d.zone.runTask(d,null,null)}catch(m){Re.onUnhandledError(m)}}}Re.microtaskDrainDone(),we=!1}}const Fe={name:"NO ZONE"},G="notScheduled",xe="scheduling",ce="scheduled",j="running",Ce="canceling",R="unknown",Y="microTask",J="macroTask",Qe="eventTask",Je={},Re={symbol:C,currentZoneFrame:()=>Me,onUnhandledError:T,microtaskDrainDone:T,scheduleMicroTask:ie,showUncaughtError:()=>!H[C("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:T,patchMethod:()=>T,bindArguments:()=>[],patchThen:()=>T,patchMacroTask:()=>T,patchEventPrototype:()=>T,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>T,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>T,wrapWithCurrentZone:()=>T,filterProperties:()=>[],attachOriginToPatched:()=>T,_redefineProperty:()=>T,patchCallbacks:()=>T,nativeScheduleMicroTask:Le};let Me={parent:null,zone:new H(null,null)},Oe=null,Ie=0;function T(){}_("Zone","Zone"),f.Zone=H}(typeof window<"u"&&window||typeof self<"u"&&self||global);const zt=Object.getOwnPropertyDescriptor,Kn=Object.defineProperty,Zn=Object.getPrototypeOf,$e=Object.create,vt=Array.prototype.slice,Dn="addEventListener",Nn="removeEventListener",Ts=Zone.__symbol__(Dn),Xn=Zone.__symbol__(Nn),Et="true",Q="false",pn=Zone.__symbol__("");function hn(f,v){return Zone.current.wrap(f,v)}function Pn(f,v,x,_,S){return Zone.current.scheduleMacroTask(f,v,x,_,S)}const ye=Zone.__symbol__,_t=typeof window<"u",kt=_t?window:void 0,He=_t&&kt||"object"==typeof self&&self||global;function Cs(f,v){for(let x=f.length-1;x>=0;x--)"function"==typeof f[x]&&(f[x]=hn(f[x],v+"_"+x));return f}function dt(f){return!f||!1!==f.writable&&!("function"==typeof f.get&&typeof f.set>"u")}const Yn=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,dn=!("nw"in He)&&typeof He.process<"u"&&"[object process]"==={}.toString.call(He.process),As=!dn&&!Yn&&!(!_t||!kt.HTMLElement),de=typeof He.process<"u"&&"[object process]"==={}.toString.call(He.process)&&!Yn&&!(!_t||!kt.HTMLElement),We={},cr=function(f){if(!(f=f||He.event))return;let v=We[f.type];v||(v=We[f.type]=ye("ON_PROPERTY"+f.type));const x=this||f.target||He,_=x[v];let S;if(As&&x===kt&&"error"===f.type){const C=f;S=_&&_.call(this,C.message,C.filename,C.lineno,C.colno,C.error),!0===S&&f.preventDefault()}else S=_&&_.apply(this,arguments),null!=S&&!S&&f.preventDefault();return S};function pr(f,v,x){let _=zt(f,v);if(!_&&x&&zt(x,v)&&(_={enumerable:!0,configurable:!0}),!_||!_.configurable)return;const S=ye("on"+v+"patched");if(f.hasOwnProperty(S)&&f[S])return;delete _.writable,delete _.value;const C=_.get,q=_.set,H=v.slice(2);let $=We[H];$||($=We[H]=ye("ON_PROPERTY"+H)),_.set=function(X){let W=this;!W&&f===He&&(W=He),W&&("function"==typeof W[$]&&W.removeEventListener(H,cr),q&&q.call(W,null),W[$]=X,"function"==typeof X&&W.addEventListener(H,cr,!1))},_.get=function(){let X=this;if(!X&&f===He&&(X=He),!X)return null;const W=X[$];if(W)return W;if(C){let _e=C.call(this);if(_e)return _.set.call(this,_e),"function"==typeof X.removeAttribute&&X.removeAttribute(v),_e}return null},Kn(f,v,_),f[S]=!0}function hr(f,v,x){if(v)for(let _=0;_<v.length;_++)pr(f,"on"+v[_],x);else{const _=[];for(const S in f)"on"==S.slice(0,2)&&_.push(S);for(let S=0;S<_.length;S++)pr(f,_[S],x)}}const st=ye("originalInstance");function Qn(f){const v=He[f];if(!v)return;He[ye(f)]=v,He[f]=function(){const S=Cs(arguments,f);switch(S.length){case 0:this[st]=new v;break;case 1:this[st]=new v(S[0]);break;case 2:this[st]=new v(S[0],S[1]);break;case 3:this[st]=new v(S[0],S[1],S[2]);break;case 4:this[st]=new v(S[0],S[1],S[2],S[3]);break;default:throw new Error("Arg list too long.")}},Rt(He[f],v);const x=new v(function(){});let _;for(_ in x)"XMLHttpRequest"===f&&"responseBlob"===_||function(S){"function"==typeof x[S]?He[f].prototype[S]=function(){return this[st][S].apply(this[st],arguments)}:Kn(He[f].prototype,S,{set:function(C){"function"==typeof C?(this[st][S]=hn(C,f+"."+S),Rt(this[st][S],C)):this[st][S]=C},get:function(){return this[st][S]}})}(_);for(_ in v)"prototype"!==_&&v.hasOwnProperty(_)&&(He[f][_]=v[_])}function Lt(f,v,x){let _=f;for(;_&&!_.hasOwnProperty(v);)_=Zn(_);!_&&f[v]&&(_=f);const S=ye(v);let C=null;if(_&&(!(C=_[S])||!_.hasOwnProperty(S))&&(C=_[S]=_[v],dt(_&&zt(_,v)))){const H=x(C,S,v);_[v]=function(){return H(this,arguments)},Rt(_[v],C)}return C}function di(f,v,x){let _=null;function S(C){const q=C.data;return q.args[q.cbIdx]=function(){C.invoke.apply(this,arguments)},_.apply(q.target,q.args),C}_=Lt(f,v,C=>function(q,H){const $=x(q,H);return $.cbIdx>=0&&"function"==typeof H[$.cbIdx]?Pn($.name,H[$.cbIdx],$,S):C.apply(q,H)})}function Rt(f,v){f[ye("OriginalDelegate")]=v}let dr=!1,Jn=!1;function es(){if(dr)return Jn;dr=!0;try{const f=kt.navigator.userAgent;(-1!==f.indexOf("MSIE ")||-1!==f.indexOf("Trident/")||-1!==f.indexOf("Edge/"))&&(Jn=!0)}catch{}return Jn}Zone.__load_patch("ZoneAwarePromise",(f,v,x)=>{const _=Object.getOwnPropertyDescriptor,S=Object.defineProperty,q=x.symbol,H=[],$=!0===f[q("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],X=q("Promise"),W=q("then");x.onUnhandledError=I=>{if(x.showUncaughtError()){const P=I&&I.rejection;P?console.error("Unhandled Promise rejection:",P instanceof Error?P.message:P,"; Zone:",I.zone.name,"; Task:",I.task&&I.task.source,"; Value:",P,P instanceof Error?P.stack:void 0):console.error(I)}},x.microtaskDrainDone=()=>{for(;H.length;){const I=H.shift();try{I.zone.runGuarded(()=>{throw I.throwOriginal?I.rejection:I})}catch(P){re(P)}}};const le=q("unhandledPromiseRejectionHandler");function re(I){x.onUnhandledError(I);try{const P=v[le];"function"==typeof P&&P.call(this,I)}catch{}}function Ne(I){return I&&I.then}function we(I){return I}function Ke(I){return d.reject(I)}const Le=q("state"),ie=q("value"),F=q("finally"),Fe=q("parentPromiseValue"),G=q("parentPromiseState"),ce=null,j=!0,Ce=!1;function Y(I,P){return w=>{try{Re(I,P,w)}catch(D){Re(I,!1,D)}}}const J=function(){let I=!1;return function(w){return function(){I||(I=!0,w.apply(null,arguments))}}},Je=q("currentTaskTrace");function Re(I,P,w){const D=J();if(I===w)throw new TypeError("Promise resolved with itself");if(I[Le]===ce){let U=null;try{("object"==typeof w||"function"==typeof w)&&(U=w&&w.then)}catch(Z){return D(()=>{Re(I,!1,Z)})(),I}if(P!==Ce&&w instanceof d&&w.hasOwnProperty(Le)&&w.hasOwnProperty(ie)&&w[Le]!==ce)Oe(w),Re(I,w[Le],w[ie]);else if(P!==Ce&&"function"==typeof U)try{U.call(w,D(Y(I,P)),D(Y(I,!1)))}catch(Z){D(()=>{Re(I,!1,Z)})()}else{I[Le]=P;const Z=I[ie];if(I[ie]=w,I[F]===F&&P===j&&(I[Le]=I[G],I[ie]=I[Fe]),P===Ce&&w instanceof Error){const M=v.currentTask&&v.currentTask.data&&v.currentTask.data.__creationTrace__;M&&S(w,Je,{configurable:!0,enumerable:!1,writable:!0,value:M})}for(let M=0;M<Z.length;)Ie(I,Z[M++],Z[M++],Z[M++],Z[M++]);if(0==Z.length&&P==Ce){I[Le]=0;let M=w;try{throw new Error("Uncaught (in promise): "+function C(I){return I&&I.toString===Object.prototype.toString?(I.constructor&&I.constructor.name||"")+": "+JSON.stringify(I):I?I.toString():Object.prototype.toString.call(I)}(w)+(w&&w.stack?"\n"+w.stack:""))}catch(oe){M=oe}$&&(M.throwOriginal=!0),M.rejection=w,M.promise=I,M.zone=v.current,M.task=v.currentTask,H.push(M),x.scheduleMicroTask()}}}return I}const Me=q("rejectionHandledHandler");function Oe(I){if(0===I[Le]){try{const P=v[Me];P&&"function"==typeof P&&P.call(this,{rejection:I[ie],promise:I})}catch{}I[Le]=Ce;for(let P=0;P<H.length;P++)I===H[P].promise&&H.splice(P,1)}}function Ie(I,P,w,D,U){Oe(I);const Z=I[Le],M=Z?"function"==typeof D?D:we:"function"==typeof U?U:Ke;P.scheduleMicroTask("Promise.then",()=>{try{const oe=I[ie],ue=!!w&&F===w[F];ue&&(w[Fe]=oe,w[G]=Z);const ne=P.run(M,void 0,ue&&M!==Ke&&M!==we?[]:[oe]);Re(w,!0,ne)}catch(oe){Re(w,!1,oe)}},w)}const me=function(){},V=f.AggregateError;class d{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(P){return Re(new this(null),j,P)}static reject(P){return Re(new this(null),Ce,P)}static any(P){if(!P||"function"!=typeof P[Symbol.iterator])return Promise.reject(new V([],"All promises were rejected"));const w=[];let D=0;try{for(let M of P)D++,w.push(d.resolve(M))}catch{return Promise.reject(new V([],"All promises were rejected"))}if(0===D)return Promise.reject(new V([],"All promises were rejected"));let U=!1;const Z=[];return new d((M,oe)=>{for(let ue=0;ue<w.length;ue++)w[ue].then(ne=>{U||(U=!0,M(ne))},ne=>{Z.push(ne),D--,0===D&&(U=!0,oe(new V(Z,"All promises were rejected")))})})}static race(P){let w,D,U=new this((oe,ue)=>{w=oe,D=ue});function Z(oe){w(oe)}function M(oe){D(oe)}for(let oe of P)Ne(oe)||(oe=this.resolve(oe)),oe.then(Z,M);return U}static all(P){return d.allWithCallback(P)}static allSettled(P){return(this&&this.prototype instanceof d?this:d).allWithCallback(P,{thenCallback:D=>({status:"fulfilled",value:D}),errorCallback:D=>({status:"rejected",reason:D})})}static allWithCallback(P,w){let D,U,Z=new this((ne,Se)=>{D=ne,U=Se}),M=2,oe=0;const ue=[];for(let ne of P){Ne(ne)||(ne=this.resolve(ne));const Se=oe;try{ne.then(Ae=>{ue[Se]=w?w.thenCallback(Ae):Ae,M--,0===M&&D(ue)},Ae=>{w?(ue[Se]=w.errorCallback(Ae),M--,0===M&&D(ue)):U(Ae)})}catch(Ae){U(Ae)}M++,oe++}return M-=2,0===M&&D(ue),Z}constructor(P){const w=this;if(!(w instanceof d))throw new Error("Must be an instanceof Promise.");w[Le]=ce,w[ie]=[];try{const D=J();P&&P(D(Y(w,j)),D(Y(w,Ce)))}catch(D){Re(w,!1,D)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return d}then(P,w){var D;let U=null===(D=this.constructor)||void 0===D?void 0:D[Symbol.species];(!U||"function"!=typeof U)&&(U=this.constructor||d);const Z=new U(me),M=v.current;return this[Le]==ce?this[ie].push(M,Z,P,w):Ie(this,M,Z,P,w),Z}catch(P){return this.then(null,P)}finally(P){var w;let D=null===(w=this.constructor)||void 0===w?void 0:w[Symbol.species];(!D||"function"!=typeof D)&&(D=d);const U=new D(me);U[F]=F;const Z=v.current;return this[Le]==ce?this[ie].push(Z,U,P,P):Ie(this,Z,U,P,P),U}}d.resolve=d.resolve,d.reject=d.reject,d.race=d.race,d.all=d.all;const m=f[X]=f.Promise;f.Promise=d;const K=q("thenPatched");function ee(I){const P=I.prototype,w=_(P,"then");if(w&&(!1===w.writable||!w.configurable))return;const D=P.then;P[W]=D,I.prototype.then=function(U,Z){return new d((oe,ue)=>{D.call(this,oe,ue)}).then(U,Z)},I[K]=!0}return x.patchThen=ee,m&&(ee(m),Lt(f,"fetch",I=>function O(I){return function(P,w){let D=I.apply(P,w);if(D instanceof d)return D;let U=D.constructor;return U[K]||ee(U),D}}(I))),Promise[v.__symbol__("uncaughtPromiseErrors")]=H,d}),Zone.__load_patch("toString",f=>{const v=Function.prototype.toString,x=ye("OriginalDelegate"),_=ye("Promise"),S=ye("Error"),C=function(){if("function"==typeof this){const X=this[x];if(X)return"function"==typeof X?v.call(X):Object.prototype.toString.call(X);if(this===Promise){const W=f[_];if(W)return v.call(W)}if(this===Error){const W=f[S];if(W)return v.call(W)}}return v.call(this)};C[x]=v,Function.prototype.toString=C;const q=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":q.call(this)}});let kn=!1;if(typeof window<"u")try{const f=Object.defineProperty({},"passive",{get:function(){kn=!0}});window.addEventListener("test",f,f),window.removeEventListener("test",f,f)}catch{kn=!1}const bs={useG:!0},it={},fr={},Kt=new RegExp("^"+pn+"(\\w+)(true|false)$"),mr=ye("propagationStopped");function gr(f,v){const x=(v?v(f):f)+Q,_=(v?v(f):f)+Et,S=pn+x,C=pn+_;it[f]={},it[f][Q]=S,it[f][Et]=C}function fn(f,v,x,_){const S=_&&_.add||Dn,C=_&&_.rm||Nn,q=_&&_.listeners||"eventListeners",H=_&&_.rmAll||"removeAllListeners",$=ye(S),X="."+S+":",le=function(ie,F,Fe){if(ie.isRemoved)return;const G=ie.callback;let xe;"object"==typeof G&&G.handleEvent&&(ie.callback=j=>G.handleEvent(j),ie.originalDelegate=G);try{ie.invoke(ie,F,[Fe])}catch(j){xe=j}const ce=ie.options;return ce&&"object"==typeof ce&&ce.once&&F[C].call(F,Fe.type,ie.originalDelegate?ie.originalDelegate:ie.callback,ce),xe};function re(ie,F,Fe){if(!(F=F||f.event))return;const G=ie||F.target||f,xe=G[it[F.type][Fe?Et:Q]];if(xe){const ce=[];if(1===xe.length){const j=le(xe[0],G,F);j&&ce.push(j)}else{const j=xe.slice();for(let Ce=0;Ce<j.length&&(!F||!0!==F[mr]);Ce++){const R=le(j[Ce],G,F);R&&ce.push(R)}}if(1===ce.length)throw ce[0];for(let j=0;j<ce.length;j++){const Ce=ce[j];v.nativeScheduleMicroTask(()=>{throw Ce})}}}const Ne=function(ie){return re(this,ie,!1)},we=function(ie){return re(this,ie,!0)};function Ke(ie,F){if(!ie)return!1;let Fe=!0;F&&void 0!==F.useG&&(Fe=F.useG);const G=F&&F.vh;let xe=!0;F&&void 0!==F.chkDup&&(xe=F.chkDup);let ce=!1;F&&void 0!==F.rt&&(ce=F.rt);let j=ie;for(;j&&!j.hasOwnProperty(S);)j=Zn(j);if(!j&&ie[S]&&(j=ie),!j||j[$])return!1;const Ce=F&&F.eventNameToString,R={},Y=j[$]=j[S],J=j[ye(C)]=j[C],Qe=j[ye(q)]=j[q],Je=j[ye(H)]=j[H];let Re;function Me(w,D){return!kn&&"object"==typeof w&&w?!!w.capture:kn&&D?"boolean"==typeof w?{capture:w,passive:!0}:w?"object"==typeof w&&!1!==w.passive?Object.assign(Object.assign({},w),{passive:!0}):w:{passive:!0}:w}F&&F.prepend&&(Re=j[ye(F.prepend)]=j[F.prepend]);const d=Fe?function(w){if(!R.isExisting)return Y.call(R.target,R.eventName,R.capture?we:Ne,R.options)}:function(w){return Y.call(R.target,R.eventName,w.invoke,R.options)},m=Fe?function(w){if(!w.isRemoved){const D=it[w.eventName];let U;D&&(U=D[w.capture?Et:Q]);const Z=U&&w.target[U];if(Z)for(let M=0;M<Z.length;M++)if(Z[M]===w){Z.splice(M,1),w.isRemoved=!0,0===Z.length&&(w.allRemoved=!0,w.target[U]=null);break}}if(w.allRemoved)return J.call(w.target,w.eventName,w.capture?we:Ne,w.options)}:function(w){return J.call(w.target,w.eventName,w.invoke,w.options)},ee=F&&F.diff?F.diff:function(w,D){const U=typeof D;return"function"===U&&w.callback===D||"object"===U&&w.originalDelegate===D},O=Zone[ye("UNPATCHED_EVENTS")],I=f[ye("PASSIVE_EVENTS")],P=function(w,D,U,Z,M=!1,oe=!1){return function(){const ue=this||f;let ne=arguments[0];F&&F.transferEventName&&(ne=F.transferEventName(ne));let Se=arguments[1];if(!Se)return w.apply(this,arguments);if(dn&&"uncaughtException"===ne)return w.apply(this,arguments);let Ae=!1;if("function"!=typeof Se){if(!Se.handleEvent)return w.apply(this,arguments);Ae=!0}if(G&&!G(w,Se,ue,arguments))return;const Mt=kn&&!!I&&-1!==I.indexOf(ne),Ct=Me(arguments[2],Mt);if(O)for(let yt=0;yt<O.length;yt++)if(ne===O[yt])return Mt?w.call(ue,ne,Se,Ct):w.apply(this,arguments);const rs=!!Ct&&("boolean"==typeof Ct||Ct.capture),Ln=!(!Ct||"object"!=typeof Ct)&&Ct.once,_i=Zone.current;let Ns=it[ne];Ns||(gr(ne,Ce),Ns=it[ne]);const is=Ns[rs?Et:Q];let os,Zt=ue[is],gn=!1;if(Zt){if(gn=!0,xe)for(let yt=0;yt<Zt.length;yt++)if(ee(Zt[yt],Se))return}else Zt=ue[is]=[];const Rn=ue.constructor.name,Mn=fr[Rn];Mn&&(os=Mn[ne]),os||(os=Rn+D+(Ce?Ce(ne):ne)),R.options=Ct,Ln&&(R.options.once=!1),R.target=ue,R.capture=rs,R.eventName=ne,R.isExisting=gn;const Ue=Fe?bs:void 0;Ue&&(Ue.taskData=R);const rt=_i.scheduleEventTask(os,Se,Ue,U,Z);return R.target=null,Ue&&(Ue.taskData=null),Ln&&(Ct.once=!0),!kn&&"boolean"==typeof rt.options||(rt.options=Ct),rt.target=ue,rt.capture=rs,rt.eventName=ne,Ae&&(rt.originalDelegate=Se),oe?Zt.unshift(rt):Zt.push(rt),M?ue:void 0}};return j[S]=P(Y,X,d,m,ce),Re&&(j.prependListener=P(Re,".prependListener:",function(w){return Re.call(R.target,R.eventName,w.invoke,R.options)},m,ce,!0)),j[C]=function(){const w=this||f;let D=arguments[0];F&&F.transferEventName&&(D=F.transferEventName(D));const U=arguments[2],Z=!!U&&("boolean"==typeof U||U.capture),M=arguments[1];if(!M)return J.apply(this,arguments);if(G&&!G(J,M,w,arguments))return;const oe=it[D];let ue;oe&&(ue=oe[Z?Et:Q]);const ne=ue&&w[ue];if(ne)for(let Se=0;Se<ne.length;Se++){const Ae=ne[Se];if(ee(Ae,M))return ne.splice(Se,1),Ae.isRemoved=!0,0===ne.length&&(Ae.allRemoved=!0,w[ue]=null,"string"==typeof D)&&(w[pn+"ON_PROPERTY"+D]=null),Ae.zone.cancelTask(Ae),ce?w:void 0}return J.apply(this,arguments)},j[q]=function(){const w=this||f;let D=arguments[0];F&&F.transferEventName&&(D=F.transferEventName(D));const U=[],Z=Is(w,Ce?Ce(D):D);for(let M=0;M<Z.length;M++){const oe=Z[M];U.push(oe.originalDelegate?oe.originalDelegate:oe.callback)}return U},j[H]=function(){const w=this||f;let D=arguments[0];if(D){F&&F.transferEventName&&(D=F.transferEventName(D));const U=it[D];if(U){const oe=w[U[Q]],ue=w[U[Et]];if(oe){const ne=oe.slice();for(let Se=0;Se<ne.length;Se++){const Ae=ne[Se];this[C].call(this,D,Ae.originalDelegate?Ae.originalDelegate:Ae.callback,Ae.options)}}if(ue){const ne=ue.slice();for(let Se=0;Se<ne.length;Se++){const Ae=ne[Se];this[C].call(this,D,Ae.originalDelegate?Ae.originalDelegate:Ae.callback,Ae.options)}}}}else{const U=Object.keys(w);for(let Z=0;Z<U.length;Z++){const oe=Kt.exec(U[Z]);let ue=oe&&oe[1];ue&&"removeListener"!==ue&&this[H].call(this,ue)}this[H].call(this,"removeListener")}if(ce)return this},Rt(j[S],Y),Rt(j[C],J),Je&&Rt(j[H],Je),Qe&&Rt(j[q],Qe),!0}let Le=[];for(let ie=0;ie<x.length;ie++)Le[ie]=Ke(x[ie],_);return Le}function Is(f,v){if(!v){const C=[];for(let q in f){const H=Kt.exec(q);let $=H&&H[1];if($&&(!v||$===v)){const X=f[q];if(X)for(let W=0;W<X.length;W++)C.push(X[W])}}return C}let x=it[v];x||(gr(v),x=it[v]);const _=f[x[Q]],S=f[x[Et]];return _?S?_.concat(S):_.slice():S?S.slice():[]}function mi(f,v){const x=f.Event;x&&x.prototype&&v.patchMethod(x.prototype,"stopImmediatePropagation",_=>function(S,C){S[mr]=!0,_&&_.apply(S,C)})}function vr(f,v,x,_,S){const C=Zone.__symbol__(_);if(v[C])return;const q=v[C]=v[_];v[_]=function(H,$,X){return $&&$.prototype&&S.forEach(function(W){const _e=`${x}.${_}::`+W,le=$.prototype;try{if(le.hasOwnProperty(W)){const re=f.ObjectGetOwnPropertyDescriptor(le,W);re&&re.value?(re.value=f.wrapWithCurrentZone(re.value,_e),f._redefineProperty($.prototype,W,re)):le[W]&&(le[W]=f.wrapWithCurrentZone(le[W],_e))}else le[W]&&(le[W]=f.wrapWithCurrentZone(le[W],_e))}catch{}}),q.call(v,H,$,X)},f.attachOriginToPatched(v[_],q)}function Ds(f,v,x){if(!x||0===x.length)return v;const _=x.filter(C=>C.target===f);if(!_||0===_.length)return v;const S=_[0].ignoreProperties;return v.filter(C=>-1===S.indexOf(C))}function ts(f,v,x,_){f&&hr(f,Ds(f,v,x),_)}function ns(f){return Object.getOwnPropertyNames(f).filter(v=>v.startsWith("on")&&v.length>2).map(v=>v.substring(2))}Zone.__load_patch("util",(f,v,x)=>{const _=ns(f);x.patchOnProperties=hr,x.patchMethod=Lt,x.bindArguments=Cs,x.patchMacroTask=di;const S=v.__symbol__("BLACK_LISTED_EVENTS"),C=v.__symbol__("UNPATCHED_EVENTS");f[C]&&(f[S]=f[C]),f[S]&&(v[S]=v[C]=f[S]),x.patchEventPrototype=mi,x.patchEventTarget=fn,x.isIEOrEdge=es,x.ObjectDefineProperty=Kn,x.ObjectGetOwnPropertyDescriptor=zt,x.ObjectCreate=$e,x.ArraySlice=vt,x.patchClass=Qn,x.wrapWithCurrentZone=hn,x.filterProperties=Ds,x.attachOriginToPatched=Rt,x._redefineProperty=Object.defineProperty,x.patchCallbacks=vr,x.getGlobalObjects=()=>({globalSources:fr,zoneSymbolEventNames:it,eventNames:_,isBrowser:As,isMix:de,isNode:dn,TRUE_STR:Et,FALSE_STR:Q,ZONE_SYMBOL_PREFIX:pn,ADD_EVENT_LISTENER_STR:Dn,REMOVE_EVENT_LISTENER_STR:Nn})});const ss=ye("zoneTask");function mn(f,v,x,_){let S=null,C=null;x+=_;const q={};function H(X){const W=X.data;return W.args[0]=function(){return X.invoke.apply(this,arguments)},W.handleId=S.apply(f,W.args),X}function $(X){return C.call(f,X.data.handleId)}S=Lt(f,v+=_,X=>function(W,_e){if("function"==typeof _e[0]){const le={isPeriodic:"Interval"===_,delay:"Timeout"===_||"Interval"===_?_e[1]||0:void 0,args:_e},re=_e[0];_e[0]=function(){try{return re.apply(this,arguments)}finally{le.isPeriodic||("number"==typeof le.handleId?delete q[le.handleId]:le.handleId&&(le.handleId[ss]=null))}};const Ne=Pn(v,_e[0],le,H,$);if(!Ne)return Ne;const we=Ne.data.handleId;return"number"==typeof we?q[we]=Ne:we&&(we[ss]=Ne),we&&we.ref&&we.unref&&"function"==typeof we.ref&&"function"==typeof we.unref&&(Ne.ref=we.ref.bind(we),Ne.unref=we.unref.bind(we)),"number"==typeof we||we?we:Ne}return X.apply(f,_e)}),C=Lt(f,x,X=>function(W,_e){const le=_e[0];let re;"number"==typeof le?re=q[le]:(re=le&&le[ss],re||(re=le)),re&&"string"==typeof re.type?"notScheduled"!==re.state&&(re.cancelFn&&re.data.isPeriodic||0===re.runCount)&&("number"==typeof le?delete q[le]:le&&(le[ss]=null),re.zone.cancelTask(re)):X.apply(f,_e)})}Zone.__load_patch("legacy",f=>{const v=f[Zone.__symbol__("legacyPatch")];v&&v()}),Zone.__load_patch("queueMicrotask",(f,v,x)=>{x.patchMethod(f,"queueMicrotask",_=>function(S,C){v.current.scheduleMicroTask("queueMicrotask",C[0])})}),Zone.__load_patch("timers",f=>{const v="set",x="clear";mn(f,v,x,"Timeout"),mn(f,v,x,"Interval"),mn(f,v,x,"Immediate")}),Zone.__load_patch("requestAnimationFrame",f=>{mn(f,"request","cancel","AnimationFrame"),mn(f,"mozRequest","mozCancel","AnimationFrame"),mn(f,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",(f,v)=>{const x=["alert","prompt","confirm"];for(let _=0;_<x.length;_++)Lt(f,x[_],(C,q,H)=>function($,X){return v.current.run(C,f,X,H)})}),Zone.__load_patch("EventTarget",(f,v,x)=>{(function Ei(f,v){v.patchEventPrototype(f,v)})(f,x),function vi(f,v){if(Zone[v.symbol("patchEventTarget")])return;const{eventNames:x,zoneSymbolEventNames:_,TRUE_STR:S,FALSE_STR:C,ZONE_SYMBOL_PREFIX:q}=v.getGlobalObjects();for(let $=0;$<x.length;$++){const X=x[$],le=q+(X+C),re=q+(X+S);_[X]={},_[X][C]=le,_[X][S]=re}const H=f.EventTarget;H&&H.prototype&&v.patchEventTarget(f,v,[H&&H.prototype])}(f,x);const _=f.XMLHttpRequestEventTarget;_&&_.prototype&&x.patchEventTarget(f,x,[_.prototype])}),Zone.__load_patch("MutationObserver",(f,v,x)=>{Qn("MutationObserver"),Qn("WebKitMutationObserver")}),Zone.__load_patch("IntersectionObserver",(f,v,x)=>{Qn("IntersectionObserver")}),Zone.__load_patch("FileReader",(f,v,x)=>{Qn("FileReader")}),Zone.__load_patch("on_property",(f,v,x)=>{!function Er(f,v){if(dn&&!de||Zone[f.symbol("patchEvents")])return;const x=v.__Zone_ignore_on_properties;let _=[];if(As){const S=window;_=_.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);const C=function fi(){try{const f=kt.navigator.userAgent;if(-1!==f.indexOf("MSIE ")||-1!==f.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:S,ignoreProperties:["error"]}]:[];ts(S,ns(S),x&&x.concat(C),Zn(S))}_=_.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let S=0;S<_.length;S++){const C=v[_[S]];C&&C.prototype&&ts(C.prototype,ns(C.prototype),x)}}(x,f)}),Zone.__load_patch("customElements",(f,v,x)=>{!function gi(f,v){const{isBrowser:x,isMix:_}=v.getGlobalObjects();(x||_)&&f.customElements&&"customElements"in f&&v.patchCallbacks(v,f.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"])}(f,x)}),Zone.__load_patch("XHR",(f,v)=>{!function $(X){const W=X.XMLHttpRequest;if(!W)return;const _e=W.prototype;let re=_e[Ts],Ne=_e[Xn];if(!re){const R=X.XMLHttpRequestEventTarget;if(R){const Y=R.prototype;re=Y[Ts],Ne=Y[Xn]}}const we="readystatechange",Ke="scheduled";function Le(R){const Y=R.data,J=Y.target;J[C]=!1,J[H]=!1;const Qe=J[S];re||(re=J[Ts],Ne=J[Xn]),Qe&&Ne.call(J,we,Qe);const Je=J[S]=()=>{if(J.readyState===J.DONE)if(!Y.aborted&&J[C]&&R.state===Ke){const Me=J[v.__symbol__("loadfalse")];if(0!==J.status&&Me&&Me.length>0){const Oe=R.invoke;R.invoke=function(){const Ie=J[v.__symbol__("loadfalse")];for(let T=0;T<Ie.length;T++)Ie[T]===R&&Ie.splice(T,1);!Y.aborted&&R.state===Ke&&Oe.call(R)},Me.push(R)}else R.invoke()}else!Y.aborted&&!1===J[C]&&(J[H]=!0)};return re.call(J,we,Je),J[x]||(J[x]=R),j.apply(J,Y.args),J[C]=!0,R}function ie(){}function F(R){const Y=R.data;return Y.aborted=!0,Ce.apply(Y.target,Y.args)}const Fe=Lt(_e,"open",()=>function(R,Y){return R[_]=0==Y[2],R[q]=Y[1],Fe.apply(R,Y)}),xe=ye("fetchTaskAborting"),ce=ye("fetchTaskScheduling"),j=Lt(_e,"send",()=>function(R,Y){if(!0===v.current[ce]||R[_])return j.apply(R,Y);{const J={target:R,url:R[q],isPeriodic:!1,args:Y,aborted:!1},Qe=Pn("XMLHttpRequest.send",ie,J,Le,F);R&&!0===R[H]&&!J.aborted&&Qe.state===Ke&&Qe.invoke()}}),Ce=Lt(_e,"abort",()=>function(R,Y){const J=function le(R){return R[x]}(R);if(J&&"string"==typeof J.type){if(null==J.cancelFn||J.data&&J.data.aborted)return;J.zone.cancelTask(J)}else if(!0===v.current[xe])return Ce.apply(R,Y)})}(f);const x=ye("xhrTask"),_=ye("xhrSync"),S=ye("xhrListener"),C=ye("xhrScheduled"),q=ye("xhrURL"),H=ye("xhrErrorBeforeScheduled")}),Zone.__load_patch("geolocation",f=>{f.navigator&&f.navigator.geolocation&&function qe(f,v){const x=f.constructor.name;for(let _=0;_<v.length;_++){const S=v[_],C=f[S];if(C){if(!dt(zt(f,S)))continue;f[S]=(H=>{const $=function(){return H.apply(this,Cs(arguments,x+"."+S))};return Rt($,H),$})(C)}}}(f.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",(f,v)=>{function x(_){return function(S){Is(f,_).forEach(q=>{const H=f.PromiseRejectionEvent;if(H){const $=new H(_,{promise:S.promise,reason:S.rejection});q.invoke($)}})}}f.PromiseRejectionEvent&&(v[ye("unhandledPromiseRejectionHandler")]=x("unhandledrejection"),v[ye("rejectionHandledHandler")]=x("rejectionhandled"))})}},zt=>{zt(zt.s=565)}]);