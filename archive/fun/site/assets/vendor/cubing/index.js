import{a as Re,b as v,d as Oe,e as je}from"./chunks/chunk-R5B77UIM.js";import{a as pe,b as D,c as h,d as V,e as m,f as B,g as me,h as M,i as k,j as b,k as G,l as Ve,m as Be,o as Ue,p as C,q as qe,r as We,t as ge}from"./chunks/chunk-H2QAHMYH.js";import{a as Fe,b as he}from"./chunks/chunk-DDQMJYUD.js";import"./chunks/chunk-LVL5IW6J.js";import"./chunks/chunk-ZNI2V5RM.js";import{e as S,f as Ee,h as Pe,i as Ne,j as ue,m as Y}from"./chunks/chunk-Z3TGOICD.js";import"./chunks/chunk-TORY3DKJ.js";import{a as I,b as be,c as Ae,e as le,f as ce,g as Ie,h as Le,i as de,j as L,k as F,m as T,n as W,o as De,p as Ce,q as J,r as H,s as Q,t as y}from"./chunks/chunk-VE6HZZ7T.js";function E(e){switch(Math.abs(e)){case 0:return 0;case 1:return 1e3;case 2:return 1500;default:return 2e3}}var ut=class extends H{durationForAmount=E;constructor(e=E){super(),this.durationForAmount=e}traverseAlg(e){let t=0;for(let r of e.childAlgNodes())t+=this.traverseAlgNode(r);return t}traverseGrouping(e){return e.amount*this.traverseAlg(e.alg)}traverseMove(e){return this.durationForAmount(e.amount)}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return this.durationForAmount(1)}traverseNewline(e){return this.durationForAmount(1)}traverseLineComment(e){return this.durationForAmount(0)}},Vt=class{moves;durationFn=new ut(E);kpuzzle;constructor(e,t){this.kpuzzle=e,this.moves=new y(t.experimentalExpand())}getAnimLeaf(e){return Array.from(this.moves.childAlgNodes())[e]}indexToMoveStartTimestamp(e){let t=new y(Array.from(this.moves.childAlgNodes()).slice(0,e));return this.durationFn.traverseAlg(t)}timestampToIndex(e){let t=0,r;for(r=0;r<this.numAnimatedLeaves();r++)if(t+=this.durationFn.traverseMove(this.getAnimLeaf(r)),t>=e)return r;return r}patternAtIndex(e){return this.kpuzzle.defaultPattern().applyTransformation(this.transformationAtIndex(e))}transformationAtIndex(e){let t=this.kpuzzle.identityTransformation();for(let r of Array.from(this.moves.childAlgNodes()).slice(0,e))t=t.applyMove(r);return t}algDuration(){return this.durationFn.traverseAlg(this.moves)}numAnimatedLeaves(){return Re(this.moves)}moveDuration(e){return this.durationFn.traverseMove(this.getAnimLeaf(e))}},R=class{moveCount;duration;forward;backward;children=[];constructor(e,t,r,i,n=[]){this.moveCount=e,this.duration=t,this.forward=r,this.backward=i,this.children=n}},Bt=class extends H{identity;dummyLeaf;durationFn=new ut(E);cache={};kpuzzle;constructor(e){super(),this.kpuzzle=e,this.identity=e.identityTransformation(),this.dummyLeaf=new R(0,0,this.identity,this.identity,[])}traverseAlg(e){let t=0,r=0,i=this.identity,n=[];for(let s of e.childAlgNodes()){let a=this.traverseAlgNode(s);t+=a.moveCount,r+=a.duration,i===this.identity?i=a.forward:i=i.applyTransformation(a.forward),n.push(a)}return new R(t,r,i,i.invert(),n)}traverseGrouping(e){let t=this.traverseAlg(e.alg);return this.mult(t,e.amount,[t])}traverseMove(e){let t=e.toString(),r=this.cache[t];if(r)return r;let i=this.kpuzzle.moveToTransformation(e);return r=new R(1,this.durationFn.traverseAlgNode(e),i,i.invert()),this.cache[t]=r,r}traverseCommutator(e){let t=this.traverseAlg(e.A),r=this.traverseAlg(e.B),i=t.forward.applyTransformation(r.forward),n=t.backward.applyTransformation(r.backward),s=i.applyTransformation(n),a=new R(2*(t.moveCount+r.moveCount),2*(t.duration+r.duration),s,s.invert(),[t,r]);return this.mult(a,1,[a,t,r])}traverseConjugate(e){let t=this.traverseAlg(e.A),r=this.traverseAlg(e.B),n=t.forward.applyTransformation(r.forward).applyTransformation(t.backward),s=new R(2*t.moveCount+r.moveCount,2*t.duration+r.duration,n,n.invert(),[t,r]);return this.mult(s,1,[s,t,r])}traversePause(e){return e.experimentalNISSGrouping?this.dummyLeaf:new R(1,this.durationFn.traverseAlgNode(e),this.identity,this.identity)}traverseNewline(e){return this.dummyLeaf}traverseLineComment(e){return this.dummyLeaf}mult(e,t,r){let i=Math.abs(t),n=e.forward.selfMultiply(t);return new R(e.moveCount*i,e.duration*i,n,n.invert(),r)}},f=class{apd;back;constructor(e,t){this.apd=e,this.back=t}},Ut=class extends J{move;moveDuration;back;st;root;i;dur;goalIndex;goalDuration;kpuzzle;algOrAlgNode;apd;constructor(e,t,r){super(),this.kpuzzle=e,this.algOrAlgNode=t,this.apd=r,this.i=-1,this.dur=-1,this.goalIndex=-1,this.goalDuration=-1,this.move=void 0,this.back=!1,this.moveDuration=0,this.st=this.kpuzzle.identityTransformation(),this.root=new f(this.apd,!1)}moveByIndex(e){return this.i>=0&&this.i===e?this.move!==void 0:this.dosearch(e,1/0)}moveByDuration(e){return this.dur>=0&&this.dur<e&&this.dur+this.moveDuration>=e?this.move!==void 0:this.dosearch(1/0,e)}dosearch(e,t){return this.goalIndex=e,this.goalDuration=t,this.i=0,this.dur=0,this.move=void 0,this.moveDuration=0,this.back=!1,this.st=this.kpuzzle.identityTransformation(),this.algOrAlgNode.is(y)?this.traverseAlg(this.algOrAlgNode,this.root):this.traverseAlgNode(this.algOrAlgNode,this.root)}traverseAlg(e,t){if(!this.firstcheck(t))return!1;let r=t.back?e.experimentalNumChildAlgNodes()-1:0;for(let i of Ae(e.childAlgNodes(),t.back?I.Backwards:I.Forwards)){if(this.traverseAlgNode(i,new f(t.apd.children[r],t.back)))return!0;r+=t.back?-1:1}return!1}traverseGrouping(e,t){if(!this.firstcheck(t))return!1;let r=this.domult(t,e.amount);return this.traverseAlg(e.alg,new f(t.apd.children[0],r))}traverseMove(e,t){return this.firstcheck(t)?(this.move=e,this.moveDuration=t.apd.duration,this.back=t.back,!0):!1}traverseCommutator(e,t){if(!this.firstcheck(t))return!1;let r=this.domult(t,1);return r?this.traverseAlg(e.B,new f(t.apd.children[2],!r))||this.traverseAlg(e.A,new f(t.apd.children[1],!r))||this.traverseAlg(e.B,new f(t.apd.children[2],r))||this.traverseAlg(e.A,new f(t.apd.children[1],r)):this.traverseAlg(e.A,new f(t.apd.children[1],r))||this.traverseAlg(e.B,new f(t.apd.children[2],r))||this.traverseAlg(e.A,new f(t.apd.children[1],!r))||this.traverseAlg(e.B,new f(t.apd.children[2],!r))}traverseConjugate(e,t){if(!this.firstcheck(t))return!1;let r=this.domult(t,1);return r?this.traverseAlg(e.A,new f(t.apd.children[1],!r))||this.traverseAlg(e.B,new f(t.apd.children[2],r))||this.traverseAlg(e.A,new f(t.apd.children[1],r)):this.traverseAlg(e.A,new f(t.apd.children[1],r))||this.traverseAlg(e.B,new f(t.apd.children[2],r))||this.traverseAlg(e.A,new f(t.apd.children[1],!r))}traversePause(e,t){return this.firstcheck(t)?(this.move=e,this.moveDuration=t.apd.duration,this.back=t.back,!0):!1}traverseNewline(e,t){return!1}traverseLineComment(e,t){return!1}firstcheck(e){return e.apd.moveCount+this.i<=this.goalIndex&&e.apd.duration+this.dur<this.goalDuration?this.keepgoing(e):!0}domult(e,t){let r=e.back;if(t===0)return r;t<0&&(r=!r,t=-t);let i=e.apd.children[0],n=Math.min(Math.floor((this.goalIndex-this.i)/i.moveCount),Math.ceil((this.goalDuration-this.dur)/i.duration-1));return n>0&&this.keepgoing(new f(i,r),n),r}keepgoing(e,t=1){return this.i+=t*e.apd.moveCount,this.dur+=t*e.apd.duration,t!==1?e.back?this.st=this.st.applyTransformation(e.apd.backward.selfMultiply(t)):this.st=this.st.applyTransformation(e.apd.forward.selfMultiply(t)):e.back?this.st=this.st.applyTransformation(e.apd.backward):this.st=this.st.applyTransformation(e.apd.forward),!1}},qt=16;function Wt(e,t){let r=new ce,i=new ce;for(let n of e.childAlgNodes())i.push(n),i.experimentalNumAlgNodes()>=t&&(r.push(new W(i.toAlg())),i.reset());return r.push(new W(i.toAlg())),r.toAlg()}var Ht=class extends H{traverseAlg(e){let t=e.experimentalNumChildAlgNodes();return t<qt?e:Wt(e,Math.ceil(Math.sqrt(t)))}traverseGrouping(e){return new W(this.traverseAlg(e.alg),e.amount)}traverseMove(e){return e}traverseCommutator(e){return new le(this.traverseAlg(e.A),this.traverseAlg(e.B))}traverseConjugate(e){return new le(this.traverseAlg(e.A),this.traverseAlg(e.B))}traversePause(e){return e}traverseNewline(e){return e}traverseLineComment(e){return e}},Qt=Q(Ht),He=class{decoration;walker;kpuzzle;constructor(e,t){this.kpuzzle=e;let r=new Bt(this.kpuzzle),i=Qt(t);this.decoration=r.traverseAlg(i),this.walker=new Ut(this.kpuzzle,i,this.decoration)}getAnimLeaf(e){if(this.walker.moveByIndex(e)){if(!this.walker.move)throw new Error("`this.walker.mv` missing");let t=this.walker.move;return this.walker.back?t.invert():t}return null}indexToMoveStartTimestamp(e){if(this.walker.moveByIndex(e)||this.walker.i===e)return this.walker.dur;throw new Error(`Out of algorithm: index ${e}`)}indexToMovesInProgress(e){if(this.walker.moveByIndex(e)||this.walker.i===e)return this.walker.dur;throw new Error(`Out of algorithm: index ${e}`)}patternAtIndex(e,t){return this.walker.moveByIndex(e),(t??this.kpuzzle.defaultPattern()).applyTransformation(this.walker.st)}transformationAtIndex(e){return this.walker.moveByIndex(e),this.walker.st}numAnimatedLeaves(){return this.decoration.moveCount}timestampToIndex(e){return this.walker.moveByDuration(e),this.walker.i}algDuration(){return this.decoration.duration}moveDuration(e){return this.walker.moveByIndex(e),this.walker.moveDuration}};var Yt=class extends h{getDefaultValue(){return"auto"}},K="http://www.w3.org/2000/svg",Qe="data-copy-id",Ye=0;function Gt(){return Ye+=1,`svg${Ye.toString()}`}var _t={dim:{white:"#dddddd",orange:"#884400",limegreen:"#008800",red:"#660000","rgb(34, 102, 255)":"#000088",yellow:"#888800","rgb(102, 0, 153)":"rgb(50, 0, 76)",purple:"#3f003f"},oriented:"#44ddcc",ignored:"#555555",invisible:"#00000000"},ht=class{wrapperElement;svgElement;gradientDefs;originalColors={};gradients={};svgID;kpuzzle;showUnknownOrientations=!1;constructor(e,t,r,i=!1){if(this.kpuzzle=e,this.showUnknownOrientations=i,!t)throw new Error(`No SVG definition for puzzle type: ${e.name()}`);this.svgID=Gt(),this.wrapperElement=document.createElement("div"),this.wrapperElement.classList.add("svg-wrapper"),this.wrapperElement.innerHTML=t;let n=this.wrapperElement.querySelector("svg");if(!n)throw new Error("Could not get SVG element");if(this.svgElement=n,K!==n.namespaceURI)throw new Error("Unexpected XML namespace");n.style.maxWidth="100%",n.style.maxHeight="100%",this.gradientDefs=document.createElementNS(K,"defs"),n.insertBefore(this.gradientDefs,n.firstChild);for(let s of e.definition.orbits)for(let a=0;a<s.numPieces;a++)for(let l=0;l<s.numOrientations;l++){let c=this.elementID(s.orbitName,a,l),o=this.elementByID(c),p=o?.style.fill;r?(()=>{let d=r.orbits;if(!d)return;let w=d[s.orbitName];if(!w)return;let g=w.pieces[a];if(!g)return;let z=g.facelets[l];if(!z)return;let $=typeof z=="string"?z:z?.mask,A=_t[$];typeof A=="string"?p=A:A&&(p=A[p])})():p=o?.style.fill,this.originalColors[c]=p,this.gradients[c]=this.newGradient(c,p),this.gradientDefs.appendChild(this.gradients[c]),o?.setAttribute("style",`fill: url(#grad-${this.svgID}-${c})`)}for(let s of Array.from(n.querySelectorAll(`[${Qe}]`))){let a=s.getAttribute(Qe);s.setAttribute("style",`fill: url(#grad-${this.svgID}-${a})`)}this.showUnknownOrientations&&this.drawPattern(this.kpuzzle.defaultPattern())}drawPattern(e,t,r){this.draw(e,t,r)}draw(e,t,r){let i=t?.experimentalToTransformation();if(!e)throw new Error("Distinguishable pieces are not handled for SVG yet!");for(let n of e.kpuzzle.definition.orbits){let s=e.patternData[n.orbitName],a=i?i.transformationData[n.orbitName]:null;for(let l=0;l<n.numPieces;l++)for(let c=0;c<n.numOrientations;c++){let o=this.elementID(n.orbitName,l,c),p=this.elementID(n.orbitName,s.pieces[l],(n.numOrientations-s.orientation[l]+c)%n.numOrientations),d=!1;if(a){let w=this.elementID(n.orbitName,a.permutation[l],(n.numOrientations-a.orientationDelta[l]+c)%n.numOrientations);p===w&&(d=!0),r=r||0;let g=100*(1-r*r*(2-r*r));this.gradients[o].children[0].setAttribute("stop-color",this.originalColors[p]),this.gradients[o].children[0].setAttribute("offset",`${Math.max(g-5,0)}%`),this.gradients[o].children[1].setAttribute("offset",`${Math.max(g-5,0)}%`),this.gradients[o].children[2].setAttribute("offset",`${g}%`),this.gradients[o].children[3].setAttribute("offset",`${g}%`),this.gradients[o].children[3].setAttribute("stop-color",this.originalColors[w])}else d=!0;d&&(this.showUnknownOrientations&&s.orientationMod?.[l]===1?(this.gradients[o].children[0].setAttribute("stop-color","#000"),this.gradients[o].children[0].setAttribute("offset","5%"),this.gradients[o].children[1].setAttribute("offset","5%"),this.gradients[o].children[2].setAttribute("offset","20%"),this.gradients[o].children[3].setAttribute("offset","20%"),this.gradients[o].children[3].setAttribute("stop-color",this.originalColors[p])):(this.gradients[o].children[0].setAttribute("stop-color",this.originalColors[p]),this.gradients[o].children[0].setAttribute("offset","100%"),this.gradients[o].children[1].setAttribute("offset","100%"),this.gradients[o].children[2].setAttribute("offset","100%"),this.gradients[o].children[3].setAttribute("offset","100%")))}}}newGradient(e,t){let r=document.createElementNS(K,"radialGradient");r.setAttribute("id",`grad-${this.svgID}-${e}`),r.setAttribute("r","70.7107%");let i=[{offset:0,color:t},{offset:0,color:"black"},{offset:0,color:"black"},{offset:0,color:t}];for(let n of i){let s=document.createElementNS(K,"stop");s.setAttribute("offset",`${n.offset}%`),s.setAttribute("stop-color",n.color),s.setAttribute("stop-opacity","1"),r.appendChild(s)}return r}elementID(e,t,r){return`${e}-l${t}-o${r}`}elementByID(e){return this.wrapperElement.querySelector(`#${e}`)}},Z=class{#e=null;elem;prefix;validSuffixes;constructor(e,t,r){this.elem=e,this.prefix=t,this.validSuffixes=r}clearValue(){this.#e&&this.elem.contentWrapper.classList.remove(this.#e),this.#e=null}setValue(e){if(!this.validSuffixes.includes(e))throw new Error(`Invalid suffix: ${e}`);let t=`${this.prefix}${e}`,r=this.#e!==t;return r&&(this.clearValue(),this.elem.contentWrapper.classList.add(t),this.#e=t),r}};function Me(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function Ge(e,t,r){if(e===t)return!0;if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!r(e[i],t[i]))return!1;return!0}function xe(e,t,r){return De(e,r-t,t)}var x={Forwards:1,Paused:0,Backwards:-1};var P={Move:"move",EntireTimeline:"entire-timeline"},Zt=class{catchingUp=!1;pendingFrame=!1;tempoScale=1;model;constructor(e){this.model=e,e.tempoScale.addFreshListener(t=>{this.tempoScale=t})}scheduler=new G(this.animFrame.bind(this));start(){this.catchingUp||(this.lastTimestamp=performance.now()),this.catchingUp=!0,this.pendingFrame=!0,this.scheduler.requestAnimFrame()}stop(){this.catchingUp=!1,this.scheduler.cancelAnimFrame()}catchUpMs=500;lastTimestamp=0;animFrame(e){this.scheduler.requestAnimFrame();let t=this.tempoScale*(e-this.lastTimestamp)/this.catchUpMs;this.lastTimestamp=e,this.model.catchUpMove.set((async()=>{let r=await this.model.catchUpMove.get();if(r.move===null)return r;let i=r.amount+t;return i>=1?(this.pendingFrame=!0,this.stop(),this.model.timestampRequest.set("end"),{move:null,amount:0}):(this.pendingFrame=!1,{move:r.move,amount:i})})())}},$t=class{playing=!1;direction=x.Forwards;catchUpHelper;model;lastDatestamp=0;lastTimestampPromise;scheduler=new G(this.animFrame.bind(this));delegate;constructor(e,t){this.delegate=t,this.model=e,this.lastTimestampPromise=this.#e(),this.model.playingInfo.addFreshListener(this.onPlayingProp.bind(this)),this.catchUpHelper=new Zt(this.model),this.model.catchUpMove.addFreshListener(this.onCatchUpMoveProp.bind(this))}async onPlayingProp(e){e.playing!==this.playing&&(e.playing?this.play(e):this.pause())}async onCatchUpMoveProp(e){let t=e.move!==null;t!==this.catchUpHelper.catchingUp&&(t?this.catchUpHelper.start():this.catchUpHelper.stop()),this.scheduler.requestAnimFrame()}async#e(){return(await this.model.detailedTimelineInfo.get()).timestamp}jumpToStart(e){this.model.timestampRequest.set("start"),this.pause(),e?.flash&&this.delegate.flash()}jumpToEnd(e){this.model.timestampRequest.set("end"),this.pause(),e?.flash&&this.delegate.flash()}playPause(){this.playing?this.pause():this.play()}play(e){(async()=>{let t=e?.direction??x.Forwards,r=await this.model.coarseTimelineInfo.get();(e?.autoSkipToOtherEndIfStartingAtBoundary??!0)&&(t===x.Forwards&&r.atEnd&&(this.model.timestampRequest.set("start"),this.delegate.flash()),t===x.Backwards&&r.atStart&&(this.model.timestampRequest.set("end"),this.delegate.flash())),this.model.playingInfo.set({playing:!0,direction:t,untilBoundary:e?.untilBoundary??P.EntireTimeline,loop:e?.loop??!1}),this.playing=!0,this.lastDatestamp=performance.now(),this.lastTimestampPromise=this.#e(),this.scheduler.requestAnimFrame()})()}pause(){this.playing=!1,this.scheduler.cancelAnimFrame(),this.model.playingInfo.set({playing:!1,untilBoundary:P.EntireTimeline})}#r=new pe;async animFrame(e){this.playing&&this.scheduler.requestAnimFrame();let t=this.lastDatestamp,r=await this.#r.queue(Promise.all([this.model.playingInfo.get(),this.lastTimestampPromise,this.model.timeRange.get(),this.model.tempoScale.get(),this.model.currentMoveInfo.get()])),[i,n,s,a,l]=r;if(!i.playing){this.playing=!1;return}let c=l.earliestEnd;(l.currentMoves.length===0||i.untilBoundary===P.EntireTimeline)&&(c=s.end);let o=l.latestStart;(l.currentMoves.length===0||i.untilBoundary===P.EntireTimeline)&&(o=s.start);let p=(e-t)*this.direction*a;p=Math.max(p,1),p*=i.direction;let d=n+p,w=null;d>=c?i.loop?d=xe(d,s.start,s.end):(d===s.end?w="end":d=c,this.playing=!1,this.model.playingInfo.set({playing:!1})):d<=o&&(i.loop?d=xe(d,s.start,s.end):(d===s.start?w="start":d=o,this.playing=!1,this.model.playingInfo.set({playing:!1}))),this.lastDatestamp=e,this.lastTimestampPromise=Promise.resolve(d),this.model.timestampRequest.set(w??d)}},Xt=class{animationController;model;constructor(e,t){this.model=e,this.animationController=new $t(e,t)}jumpToStart(e){this.animationController.jumpToStart(e)}jumpToEnd(e){this.animationController.jumpToEnd(e)}togglePlay(e){typeof e>"u"&&this.animationController.playPause(),e?this.animationController.play():this.animationController.pause()}async visitTwizzleLink(){let e=document.createElement("a");e.href=await this.model.twizzleLink(),e.target="_blank",e.click()}},Jt={"bottom-row":!0,none:!0},Kt=class extends h{getDefaultValue(){return"auto"}},ke=new k;ke.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.wrapper > * {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.back-view-side-by-side {
  grid-template-columns: 1fr 1fr;
}

.wrapper.back-view-top-right {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
}

.wrapper.back-view-top-right > :nth-child(1) {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.wrapper.back-view-top-right > :nth-child(2) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
`);var pt=new k;pt.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.svg-wrapper,
twisty-2d-svg,
svg {
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
}

svg {
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hint-facelets-none .hint-facelet {
  display: none;
}
`);var mt=class extends b{svgWrapper;scheduler=new G(this.render.bind(this));#e=null;model;kpuzzle;svgSource;options;puzzleLoader;constructor(e,t,r,i,n){super(),this.model=e,this.kpuzzle=t,this.svgSource=r,this.options=i,this.addCSS(pt),this.resetSVG(),this.#r.addListener(this.model.puzzleID,s=>{n?.id!==s&&this.disconnect()}),this.#r.addListener(this.model.twistySceneModel.hintFacelet,s=>{this.setHintFacelet(s)}),this.#r.addListener(this.model.legacyPosition,this.onPositionChange.bind(this)),this.options?.experimentalStickeringMask&&this.experimentalSetStickeringMask(this.options.experimentalStickeringMask)}#r=new B;disconnect(){this.#r.disconnect()}onPositionChange(e){try{if(e.movesInProgress.length>0){let t=e.movesInProgress[0].move,r=t;e.movesInProgress[0].direction===x.Backwards&&(r=t.invert());let i=e.pattern.applyMove(r);this.svgWrapper?.draw(e.pattern,i,e.movesInProgress[0].fraction)}else this.svgWrapper?.draw(e.pattern),this.#e=e}catch(t){console.warn("Bad position (this doesn't necessarily mean something is wrong). Pre-emptively disconnecting:",this.puzzleLoader?.id,t),this.disconnect()}}scheduleRender(){this.scheduler.requestAnimFrame()}experimentalSetStickeringMask(e){this.resetSVG(e)}resetSVG(e){this.svgWrapper&&this.removeElement(this.svgWrapper.wrapperElement),this.kpuzzle&&(this.svgWrapper=new ht(this.kpuzzle,this.svgSource,e),this.addElement(this.svgWrapper.wrapperElement),this.#e&&this.onPositionChange(this.#e))}hintFaceletsClassListManager=new Z(this,"hint-facelets-",Object.keys(Ve));setHintFacelet(e){this.hintFaceletsClassListManager.setValue(e==="auto"?"floating":e)}render(){}};M.define("twisty-2d-puzzle",mt);var er=class{model;schedulable;puzzleLoader;effectiveVisualization;constructor(e,t,r,i){this.model=e,this.schedulable=t,this.puzzleLoader=r,this.effectiveVisualization=i,this.twisty2DPuzzle(),this.#e.addListener(this.model.twistySceneModel.stickeringMask,async n=>{(await this.twisty2DPuzzle()).experimentalSetStickeringMask(n)})}#e=new B;disconnect(){this.#e.disconnect()}scheduleRender(){}#r=null;async twisty2DPuzzle(){return this.#r??=(async()=>{let e=this.effectiveVisualization==="experimental-2D-LL-face"?this.puzzleLoader.llFaceSVG():this.effectiveVisualization==="experimental-2D-LL"?this.puzzleLoader.llSVG():this.puzzleLoader.svg();return new mt(this.model,await this.puzzleLoader.kpuzzle(),await e,{},this.puzzleLoader)})()}},gt=class extends b{#e=new B;disconnect(){this.#e.disconnect()}model;effectiveVisualization;constructor(e,t){super(),this.model=e,this.effectiveVisualization=t}async connectedCallback(){this.addCSS(ke),this.model&&this.#e.addListener(this.model.twistyPlayerModel.puzzleLoader,this.onPuzzleLoader.bind(this))}#r;async scene(){return this.#r??=(async()=>new(await C).ThreeScene)()}scheduleRender(){this.#t?.scheduleRender()}#t;currentTwisty2DPuzzleWrapper(){return this.#t}async setCurrentTwisty2DPuzzleWrapper(e){let t=this.#t;this.#t=e,t?.disconnect();let r=e.twisty2DPuzzle();this.contentWrapper.textContent="",this.addElement(await r)}async onPuzzleLoader(e){this.#t?.disconnect();let t=new er(this.model.twistyPlayerModel,this,e,this.effectiveVisualization);this.setCurrentTwisty2DPuzzleWrapper(t)}};M.define("twisty-2d-scene-wrapper",gt);var ft=class{#e;reject;promise;constructor(){this.promise=new Promise((e,t)=>{this.#e=e,this.reject=t})}handleNewValue(e){this.#e(e)}},wt=class extends EventTarget{model;schedulable;puzzleLoader;visualizationStrategy;constructor(e,t,r,i){super(),this.model=e,this.schedulable=t,this.puzzleLoader=r,this.visualizationStrategy=i,this.twisty3DPuzzle(),this.#e.addListener(this.model.puzzleLoader,n=>{this.puzzleLoader.id!==n.id&&this.disconnect()}),this.#e.addListener(this.model.legacyPosition,async n=>{try{(await this.twisty3DPuzzle()).onPositionChange(n),this.scheduleRender()}catch{this.disconnect()}}),this.#e.addListener(this.model.twistySceneModel.hintFacelet,async n=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFacelets:n==="auto"?"floating":n}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.foundationDisplay,async n=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({showFoundation:n!=="none"}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.stickeringMask,async n=>{(await this.twisty3DPuzzle()).setStickeringMask(n),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.faceletScale,async n=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({faceletScale:n}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.hintFaceletsElevation,async n=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFaceletsElevation:n}),this.scheduleRender()}),this.#e.addMultiListener3([this.model.twistySceneModel.stickeringMask,this.model.twistySceneModel.foundationStickerSprite,this.model.twistySceneModel.hintStickerSprite],async n=>{"experimentalUpdateTexture"in await this.twisty3DPuzzle()&&((await this.twisty3DPuzzle()).experimentalUpdateTexture(n[0].specialBehaviour==="picture",n[1],n[2]),this.scheduleRender())})}#e=new B;disconnect(){this.#e.disconnect()}scheduleRender(){this.schedulable.scheduleRender(),this.dispatchEvent(new CustomEvent("render-scheduled"))}#r=null;async twisty3DPuzzle(){return this.#r??=(async()=>{if(this.puzzleLoader.id==="3x3x3"&&this.visualizationStrategy==="Cube3D"){let[e,t,r,i,n,s]=await Promise.all([this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.stickeringMask.get(),this.model.twistySceneModel.initialHintFaceletsAnimation.get(),this.model.twistySceneModel.faceletScale.get(),this.model.twistySceneModel.hintFaceletsElevation.get()]);return(await C).cube3DShim(()=>this.schedulable.scheduleRender(),{foundationSprite:e,hintSprite:t,experimentalStickeringMask:r,initialHintFaceletsAnimation:i,faceletScale:n,hintFaceletsElevation:s})}else{let[e,t,r,i]=await Promise.all([this.model.twistySceneModel.hintFacelet.get(),this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.faceletScale.get()]),n=(await C).pg3dShim(()=>this.schedulable.scheduleRender(),this.puzzleLoader,e==="auto"?"floating":e,i,this.puzzleLoader.id==="kilominx");return n.then(s=>s.experimentalUpdateTexture(!0,t??void 0,r??void 0)),n}})()}async raycastMove(e,t){let r=await this.twisty3DPuzzle();if(!("experimentalGetControlTargets"in r)){console.info("not PG3D! skipping raycast");return}let i=r.experimentalGetControlTargets(),[n,s]=await Promise.all([e,this.model.twistySceneModel.movePressCancelOptions.get()]),a=n.intersectObjects(i);if(a.length>0){let l=r.getClosestMoveToAxis(a[0].point,t);l?this.model.experimentalAddMove(l.move,{cancel:s}):console.info("Skipping move!")}}},ze=class extends b{#e=new Z(this,"back-view-",["auto","none","side-by-side","top-right"]);#r=new B;disconnect(){this.#r.disconnect()}model;constructor(e){super(),this.model=e}async connectedCallback(){this.addCSS(ke);let e=new ge(this.model,this);this.addVantage(e),this.model&&(this.#r.addMultiListener([this.model.puzzleLoader,this.model.visualizationStrategy],this.onPuzzle.bind(this)),this.#r.addListener(this.model.backView,this.setBackView.bind(this))),this.scheduleRender()}#t=null;setBackView(e){let t=["side-by-side","top-right"].includes(e),r=this.#t!==null;this.#e.setValue(e),t?r||(this.#t=new ge(this.model,this,{backView:!0}),this.addVantage(this.#t),this.scheduleRender()):this.#t&&(this.removeVantage(this.#t),this.#t=null)}async onPress(e){let t=this.#i;if(!t){console.info("no wrapper; skipping scene wrapper press!");return}let r=(async()=>{let[i,{ThreeRaycaster:n,ThreeVector2:s}]=await Promise.all([e.detail.cameraPromise,(async()=>{let{ThreeRaycaster:c,ThreeVector2:o}=await C;return{ThreeRaycaster:c,ThreeVector2:o}})()]),a=new n,l=new s(e.detail.pressInfo.normalizedX,e.detail.pressInfo.normalizedY);return a.setFromCamera(l,i),a})();await t.raycastMove(r,{invert:!e.detail.pressInfo.rightClick,depth:e.detail.pressInfo.keys.ctrlOrMetaKey?"rotation":e.detail.pressInfo.keys.shiftKey?"secondSlice":"none"})}#n;async scene(){return this.#n??=(async()=>new(await C).ThreeScene)()}#s=new Set;addVantage(e){e.addEventListener("press",this.onPress.bind(this)),this.#s.add(e),this.contentWrapper.appendChild(e)}removeVantage(e){this.#s.delete(e),e.remove(),e.disconnect(),this.#i?.disconnect()}experimentalVantages(){return this.#s.values()}scheduleRender(){for(let e of this.#s)e.scheduleRender()}#i=null;async setCurrentTwisty3DPuzzleWrapper(e,t){let r=this.#i;try{this.#i=t,r?.disconnect(),e.add(await t.twisty3DPuzzle())}finally{r&&e.remove(await r.twisty3DPuzzle())}this.#a.handleNewValue(t)}#a=new ft;async experimentalTwisty3DPuzzleWrapper(){return this.#i||this.#a.promise}#o=new pe;async onPuzzle(e){if(e[1]==="2D")return;this.#i?.disconnect();let[t,r]=await this.#o.queue(Promise.all([this.scene(),new wt(this.model,this,e[0],e[1])]));this.setCurrentTwisty3DPuzzleWrapper(t,r)}};M.define("twisty-3d-scene-wrapper",ze);var N=typeof document>"u"?null:document,tr=N?.fullscreenEnabled||!!N?.webkitFullscreenEnabled;function rr(){return document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen()}function _e(){return document.fullscreenElement?document.fullscreenElement:document.webkitFullscreenElement??null}function ir(e){return e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen()}var nr=["skip-to-start","skip-to-end","step-forward","step-backward","pause","play","enter-fullscreen","exit-fullscreen","twizzle-tw"],sr=class extends m{derive(e){return{fullscreen:{enabled:tr,icon:document.fullscreenElement===null?"enter-fullscreen":"exit-fullscreen",title:"Enter fullscreen"},"jump-to-start":{enabled:!e.coarseTimelineInfo.atStart,icon:"skip-to-start",title:"Restart"},"play-step-backwards":{enabled:!e.coarseTimelineInfo.atStart,icon:"step-backward",title:"Step backward"},"play-pause":{enabled:!(e.coarseTimelineInfo.atStart&&e.coarseTimelineInfo.atEnd),icon:e.coarseTimelineInfo.playing?"pause":"play",title:e.coarseTimelineInfo.playing?"Pause":"Play"},"play-step":{enabled:!e.coarseTimelineInfo.atEnd,icon:"step-forward",title:"Step forward"},"jump-to-end":{enabled:!e.coarseTimelineInfo.atEnd,icon:"skip-to-end",title:"Skip to End"},"twizzle-link":{enabled:!0,icon:"twizzle-tw",title:"View at Twizzle",hidden:e.viewerLink==="none"}}}},vt=new k;vt.replaceSync(`
:host {
  width: 384px;
  height: 24px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  grid-auto-flow: column;
}

.viewer-link-none .twizzle-link-button {
  display: none;
}

.wrapper twisty-button,
.wrapper twisty-control-button {
  width: inherit;
  height: inherit;
}
`);var yt=new k;yt.replaceSync(`
:host:not([hidden]) {
  display: grid;
}

:host {
  width: 48px;
  height: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

button {
  width: 100%;
  height: 100%;
  border: none;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-color: rgba(196, 196, 196, 0.75);
}

button:enabled {
  background-color: rgba(196, 196, 196, 0.75)
}

.dark-mode button:enabled {
  background-color: #88888888;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.25;
  pointer-events: none;
}

.dark-mode button:disabled {
  background-color: #ffffff44;
}

button:enabled:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

/* TODO: fullscreen icons have too much padding?? */
.svg-skip-to-start button,
button.svg-skip-to-start {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjQzIDEwMzdxMTktMTkgMzItMTN0MTMgMzJ2MTQ3MnEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djcxMHEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djY3OHEwIDI2LTE5IDQ1dC00NSAxOUg5NjBxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWgxMjhxMjYgMCA0NSAxOXQxOSA0NXY2NzhxNC0xMSAxMy0xOWw3MTAtNzEwcTE5LTE5IDMyLTEzdDEzIDMydjcxMHE0LTExIDEzLTE5eiIvPjwvc3ZnPg==");
}

.svg-skip-to-end button,
button.svg-skip-to-end {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik05NDEgMjU0N3EtMTkgMTktMzIgMTN0LTEzLTMyVjEwNTZxMC0yNiAxMy0zMnQzMiAxM2w3MTAgNzEwcTggOCAxMyAxOXYtNzEwcTAtMjYgMTMtMzJ0MzIgMTNsNzEwIDcxMHE4IDggMTMgMTl2LTY3OHEwLTI2IDE5LTQ1dDQ1LTE5aDEyOHEyNiAwIDQ1IDE5dDE5IDQ1djE0MDhxMCAyNi0xOSA0NXQtNDUgMTloLTEyOHEtMjYgMC00NS0xOXQtMTktNDV2LTY3OHEtNSAxMC0xMyAxOWwtNzEwIDcxMHEtMTkgMTktMzIgMTN0LTEzLTMydi03MTBxLTUgMTAtMTMgMTl6Ii8+PC9zdmc+");
}

.svg-step-forward button,
button.svg-step-forward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDE1NjhxMCAyNi0xOSA0NWwtNTEyIDUxMnEtMTkgMTktNDUgMTl0LTQ1LTE5cS0xOS0xOS0xOS00NXYtMjU2aC0yMjRxLTk4IDAtMTc1LjUgNnQtMTU0IDIxLjVxLTc2LjUgMTUuNS0xMzMgNDIuNXQtMTA1LjUgNjkuNXEtNDkgNDIuNS04MCAxMDF0LTQ4LjUgMTM4LjVxLTE3LjUgODAtMTcuNSAxODEgMCA1NSA1IDEyMyAwIDYgMi41IDIzLjV0Mi41IDI2LjVxMCAxNS04LjUgMjV0LTIzLjUgMTBxLTE2IDAtMjgtMTctNy05LTEzLTIydC0xMy41LTMwcS03LjUtMTctMTAuNS0yNC0xMjctMjg1LTEyNy00NTEgMC0xOTkgNTMtMzMzIDE2Mi00MDMgODc1LTQwM2gyMjR2LTI1NnEwLTI2IDE5LTQ1dDQ1LTE5cTI2IDAgNDUgMTlsNTEyIDUxMnExOSAxOSAxOSA0NXoiLz48L3N2Zz4=");
}

.svg-step-backward button,
button.svg-step-backward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDIwNDhxMCAxNjYtMTI3IDQ1MS0zIDctMTAuNSAyNHQtMTMuNSAzMHEtNiAxMy0xMyAyMi0xMiAxNy0yOCAxNy0xNSAwLTIzLjUtMTB0LTguNS0yNXEwLTkgMi41LTI2LjV0Mi41LTIzLjVxNS02OCA1LTEyMyAwLTEwMS0xNy41LTE4MXQtNDguNS0xMzguNXEtMzEtNTguNS04MC0xMDF0LTEwNS41LTY5LjVxLTU2LjUtMjctMTMzLTQyLjV0LTE1NC0yMS41cS03Ny41LTYtMTc1LjUtNmgtMjI0djI1NnEwIDI2LTE5IDQ1dC00NSAxOXEtMjYgMC00NS0xOWwtNTEyLTUxMnEtMTktMTktMTktNDV0MTktNDVsNTEyLTUxMnExOS0xOSA0NS0xOXQ0NSAxOXExOSAxOSAxOSA0NXYyNTZoMjI0cTcxMyAwIDg3NSA0MDMgNTMgMTM0IDUzIDMzM3oiLz48L3N2Zz4=");
}

.svg-pause button,
button.svg-pause {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNTYwIDEwODh2MTQwOHEwIDI2LTE5IDQ1dC00NSAxOWgtNTEycS0yNiAwLTQ1LTE5dC0xOS00NVYxMDg4cTAtMjYgMTktNDV0NDUtMTloNTEycTI2IDAgNDUgMTl0MTkgNDV6bS04OTYgMHYxNDA4cTAgMjYtMTkgNDV0LTQ1IDE5aC01MTJxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWg1MTJxMjYgMCA0NSAxOXQxOSA0NXoiLz48L3N2Zz4=");
}

.svg-play button,
button.svg-play {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNDcyLjUgMTgyM2wtMTMyOCA3MzhxLTIzIDEzLTM5LjUgM3QtMTYuNS0zNlYxMDU2cTAtMjYgMTYuNS0zNnQzOS41IDNsMTMyOCA3MzhxMjMgMTMgMjMgMzF0LTIzIDMxeiIvPjwvc3ZnPg==");
}

.svg-enter-fullscreen button,
button.svg-enter-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTZIN3Y1aDV2LTJIOXYtM3ptLTItNGgyVjloM1Y3SDd2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTYgN3YyaDN2M2gyVjdoLTV6Ii8+PC9zdmc+");
}

.svg-exit-fullscreen button,
button.svg-exit-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMThoM3YzaDJ2LTVIN3Yyem0zLThIN3YyaDVWN2gtMnYzem02IDExaDJ2LTNoM3YtMmgtNXY1em0yLTExVjdoLTJ2NWg1di0yaC0zeiIvPjwvc3ZnPg==");
}

.svg-twizzle-tw button,
button.svg-twizzle-tw {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODY0IiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk3LjU4MSAxNTEuMTh2NTcuMDg0aC04OS43MDN2MjQwLjM1MmgtNjYuOTU1VjIwOC4yNjRIMTUxLjIydi01Ny4wODNoMjQ2LjM2MXptNTQuMzEgNzEuNjc3bDcuNTEyIDMzLjY5MmMyLjcxOCAxMi4xNiA1LjU4IDI0LjY4IDguNTg0IDM3LjU1NWEyMTgwLjc3NSAyMTgwLjc3NSAwIDAwOS40NDIgMzguODQzIDEyNjYuMyAxMjY2LjMgMCAwMDEwLjA4NiAzNy41NTVjMy43Mi0xMi41OSA3LjM2OC0yNS40NjYgMTAuOTQ1LTM4LjYyOCAzLjU3Ni0xMy4xNjIgNy4wMS0yNi4xMSAxMC4zLTM4Ljg0M2w1Ljc2OS0yMi40NTZjMS4yNDgtNC44ODcgMi40NzItOS43MDUgMy42NzQtMTQuNDU1IDMuMDA0LTExLjg3NSA1LjY1MS0yMi45NjIgNy45NC0zMy4yNjNoNDYuMzU0bDIuMzg0IDEwLjU2M2EyMDAwLjc3IDIwMDAuNzcgMCAwMDMuOTM1IDE2LjgyOGw2LjcxMSAyNy43MWMxLjIxMyA0Ljk1NiAyLjQ1IDkuOTggMy43MDkgMTUuMDczYTMxMTkuNzc3IDMxMTkuNzc3IDAgMDA5Ljg3MSAzOC44NDMgMTI0OS4yMjcgMTI0OS4yMjcgMCAwMDEwLjczIDM4LjYyOCAxOTA3LjYwNSAxOTA3LjYwNSAwIDAwMTAuMzAxLTM3LjU1NSAxMzk3Ljk0IDEzOTcuOTQgMCAwMDkuNjU3LTM4Ljg0M2w0LjQtMTkuMDQ2Yy43MTUtMy4xMyAxLjQyMS02LjIzNiAyLjExOC05LjMyMWw5LjU3Ny00Mi44OGg2Ni41MjZhMjk4OC43MTggMjk4OC43MTggMCAwMS0xOS41MjkgNjYuMzExbC01LjcyOCAxOC40ODJhMzIzNy40NiAzMjM3LjQ2IDAgMDEtMTQuMDE1IDQzLjc1MmMtNi40MzggMTkuNi0xMi43MzMgMzcuNjk4LTE4Ljg4NSA1NC4yOTRsLTMuMzA2IDguODI1Yy00Ljg4NCAxMi44OTgtOS40MzMgMjQuMjYzLTEzLjY0NyAzNC4wOTVoLTQ5Ljc4N2E4NDE3LjI4OSA4NDE3LjI4OSAwIDAxLTIxLjAzMS02NC44MDkgMTI4OC42ODYgMTI4OC42ODYgMCAwMS0xOC44ODUtNjQuODEgMTk3Mi40NDQgMTk3Mi40NDQgMCAwMS0xOC4yNCA2NC44MSAyNTc5LjQxMiAyNTc5LjQxMiAwIDAxLTIwLjM4OCA2NC44MWgtNDkuNzg3Yy00LjY4Mi0xMC45MjYtOS43Mi0yMy43NDMtMTUuMTEtMzguNDUxbC0xLjYyOS00LjQ3Yy01LjI1OC0xNC41MjEtMTAuNjgtMzAuMTkyLTE2LjI2Ni00Ny4wMTRsLTIuNDA0LTcuMjhjLTYuNDM4LTE5LjYtMTMuMDItNDAuMzQ0LTE5Ljc0My02Mi4yMzRhMjk4OC43MDcgMjk4OC43MDcgMCAwMS0xOS41MjktNjYuMzExaDY3LjM4NXoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==");
}
`);var Ze={fullscreen:!0,"jump-to-start":!0,"play-step-backwards":!0,"play-pause":!0,"play-step":!0,"jump-to-end":!0,"twizzle-link":!0},Mt=class extends b{buttons=null;model;controller;defaultFullscreenElement;constructor(e,t,r){super(),this.model=e,this.controller=t,this.defaultFullscreenElement=r}connectedCallback(){this.addCSS(vt);let e={};for(let t in Ze){let r=new xt;e[t]=r,r.htmlButton.addEventListener("click",()=>this.#e(t)),this.addElement(r)}this.buttons=e,this.model?.buttonAppearance.addFreshListener(this.update.bind(this)),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}#e(e){switch(e){case"fullscreen":{this.onFullscreenButton();break}case"jump-to-start":{this.controller?.jumpToStart({flash:!0});break}case"play-step-backwards":{this.controller?.animationController.play({direction:x.Backwards,untilBoundary:P.Move});break}case"play-pause":{this.controller?.togglePlay();break}case"play-step":{this.controller?.animationController.play({direction:x.Forwards,untilBoundary:P.Move});break}case"jump-to-end":{this.controller?.jumpToEnd({flash:!0});break}case"twizzle-link":{this.controller?.visitTwizzleLink();break}default:throw new Error("Missing command")}}async onFullscreenButton(){if(!this.defaultFullscreenElement)throw new Error("Attempted to go fullscreen without an element.");if(_e()===this.defaultFullscreenElement)rr();else{this.buttons?.fullscreen.setIcon("exit-fullscreen"),ir(await this.model?.twistySceneModel.fullscreenElement.get()??this.defaultFullscreenElement);let e=()=>{_e()!==this.defaultFullscreenElement&&(this.buttons?.fullscreen.setIcon("enter-fullscreen"),globalThis.removeEventListener("fullscreenchange",e))};globalThis.addEventListener("fullscreenchange",e)}}async update(e){for(let t in Ze){let r=this.buttons[t],i=e[t];r.htmlButton.disabled=!i.enabled,r.htmlButton.title=i.title,r.setIcon(i.icon),r.hidden=!!i.hidden}}updateColorScheme(e){for(let t of Object.values(this.buttons??{}))t.updateColorScheme(e)}};M.define("twisty-buttons",Mt);var xt=class extends b{htmlButton=document.createElement("button");updateColorScheme(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}connectedCallback(){this.addCSS(yt),this.addElement(this.htmlButton)}#e=new Z(this,"svg-",nr);setIcon(e){this.#e.setValue(e)}};M.define("twisty-button",xt);var zt=new k;zt.replaceSync(`
:host {
  width: 384px;
  height: 16px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(196, 196, 196, 0.75);
}

input:not(:disabled) {
  cursor: ew-resize;
}

.wrapper.dark-mode {
  background: #666666;
}
`);var ar=!1,se=!1;N?.addEventListener("mousedown",e=>{e.which&&(se=!0)},!0);N?.addEventListener("mouseup",e=>{e.which&&(se=!1)},!0);var Te=0,ie=0;N?.addEventListener("mousedown",()=>{ie++},!1);N?.addEventListener("mousemove",Tt,!1);N?.addEventListener("mouseenter",Tt,!1);function Tt(e){Te=e.pageY}var $e=0,Xe=0,fe=!1,we=0,St=class extends b{model;controller;constructor(e,t){super(),this.model=e,this.controller=t}async onDetailedTimelineInfo(e){let t=await this.inputElem();t.min=e.timeRange.start.toString(),t.max=e.timeRange.end.toString(),t.disabled=t.min===t.max,t.value=e.timestamp.toString()}async connectedCallback(){this.addCSS(zt),this.addElement(await this.inputElem()),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}updateColorScheme(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}#e=null;async inputElem(){return this.#e??=(async()=>{let e=document.createElement("input");return e.type="range",e.disabled=!0,this.model?.detailedTimelineInfo.addFreshListener(this.onDetailedTimelineInfo.bind(this)),e.addEventListener("input",this.onInput.bind(this)),e.addEventListener("keydown",this.onKeypress.bind(this)),e})()}async onInput(e){if(fe)return;let t=await this.inputElem();await this.slowDown(e,t);let r=parseInt(t.value,10);this.model?.playingInfo.set({playing:!1}),this.model?.timestampRequest.set(r)}onKeypress(e){switch(e.key){case"ArrowLeft":case"ArrowRight":{this.controller?.animationController.play({direction:e.key==="ArrowLeft"?x.Backwards:x.Forwards,untilBoundary:P.Move}),e.preventDefault();break}case" ":{this.controller?.togglePlay(),e.preventDefault();break}}}async slowDown(e,t){if(ar&&se){let r=t.getBoundingClientRect(),i=r.top+r.height/2;console.log(i,e,Te,se);let n=Math.abs(i-Te),s=1;n>64&&(s=Math.max(2**(-(n-64)/64),1/32));let a=parseInt(t.value,10);if(console.log("cl",we,ie,a),we===ie){let l=(a-Xe)*s;console.log("delta",l,n),fe=!0;let c=a;c=$e+l*s+(a-$e)*Math.min(1,(1/2)**(n*n/64)),t.value=c.toString(),console.log(s),fe=!1,this.contentWrapper.style.opacity=s.toString()}else we=ie;Xe=a}}};M.define("twisty-scrubber",St);var or=null;async function Je(e,t){let[{ThreePerspectiveCamera:r,ThreeScene:i},n,s,a,l,c,o]=await Promise.all([(async()=>{let{ThreePerspectiveCamera:j,ThreeScene:Ft}=await C;return{ThreePerspectiveCamera:j,ThreeScene:Ft}})(),await e.puzzleLoader.get(),await e.visualizationStrategy.get(),await e.twistySceneModel.stickeringRequest.get(),await e.twistySceneModel.stickeringMaskRequest.get(),await e.legacyPosition.get(),await e.twistySceneModel.orbitCoordinates.get()]),p=t?.width??2048,d=t?.height??2048,w=p/d,g=or??=await(async()=>new r(20,w,.1,20))(),z=new i,$=new wt(e,{scheduleRender:()=>{}},n,s);z.add(await $.twisty3DPuzzle()),await We(g,o);let O=(await qe(p,d,z,g)).toDataURL(),X=await kt(e);return{dataURL:O,download:async j=>{bt(O,j??X)}}}async function kt(e){let[t,r]=await Promise.all([e.puzzleID.get(),e.alg.get()]);return`[${t}]${r.alg.experimentalNumChildAlgNodes()===0?"":` ${r.alg.toString()}`}`}function bt(e,t,r="png"){let i=document.createElement("a");i.href=e,i.download=`${t}.${r}`,i.click()}var At=new k;At.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;

  -webkit-user-select: none;
  user-select: none;
}

.wrapper {
  display: grid;
  overflow: hidden;
  contain: size;
  grid-template-rows: 7fr minmax(1.5em, 0.5fr) minmax(2em, 1fr);
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

.wrapper.controls-none {
  grid-template-rows: 7fr;
}

.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-control-button-panel ,
.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-buttons {
  display: none;
}

twisty-scrubber {
  background: rgba(196, 196, 196, 0.5);
}

.wrapper.checkered,
.wrapper.checkered-transparent {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}

.wrapper.checkered-transparent {
  background-color: #F4F4F4;
  background-image: linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88),
    linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88);
}

.wrapper.dark-mode {
  background-color: #444;
  background-image: linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b),
    linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b);
}

.visualization-wrapper > * {
  width: 100%;
  height: 100%;
}

.error-elem {
  width: 100%;
  height: 100%;
  display: none;
  place-content: center;
  font-family: sans-serif;
  box-shadow: inset 0 0 2em rgb(255, 0, 0);
  color: red;
  text-shadow: 0 0 0.2em white;
  background: rgba(255, 255, 255, 0.25);
}

.wrapper.error .visualization-wrapper {
  display: none;
}

.wrapper.error .error-elem {
  display: grid;
}
`);var Ke=class extends h{getDefaultValue(){return null}},Se=class extends D{getDefaultValue(){return null}derive(e){return typeof e=="string"?new URL(e,location.href):e}},_=class It{warnings;errors;constructor(t){this.warnings=Object.freeze(t?.warnings??[]),this.errors=Object.freeze(t?.errors??[]),Object.freeze(this)}add(t){return new It({warnings:this.warnings.concat(t?.warnings??[]),errors:this.errors.concat(t?.errors??[])})}log(){this.errors.length>0?console.error(`\u{1F6A8} ${this.errors[0]}`):this.warnings.length>0?console.warn(`\u26A0\uFE0F ${this.warnings[0]}`):console.info("\u{1F60E} No issues!")}};function Lt(e){try{let t=y.fromString(e),r=[];return t.toString()!==e&&r.push("Alg is non-canonical!"),{alg:t,issues:new _({warnings:r})}}catch(t){return{alg:new y,issues:new _({errors:[`Malformed alg: ${t.toString()}`]})}}}function lr(e,t){return e.alg.isIdentical(t.alg)&&Me(e.issues.warnings,t.issues.warnings)&&Me(e.issues.errors,t.issues.errors)}var et=class extends D{getDefaultValue(){return{alg:new y,issues:new _}}canReuseValue(e,t){return lr(e,t)}async derive(e){return typeof e=="string"?Lt(e):{alg:e,issues:new _}}},cr=class extends m{derive(e){return e.kpuzzle.algToTransformation(e.setupAlg.alg)}},dr=class extends m{derive(e){if(e.setupTransformation)return e.setupTransformation;switch(e.setupAnchor){case"start":return e.setupAlgTransformation;case"end":{let r=e.indexer.transformationAtIndex(e.indexer.numAnimatedLeaves()).invert();return e.setupAlgTransformation.applyTransformation(r)}default:throw new Error("Unimplemented!")}}},ur=class extends h{getDefaultValue(){return null}},hr=class extends h{getDefaultValue(){return{move:null,amount:0}}canReuseValue(e,t){return e.move===t.move&&e.amount===t.amount}},pr=class extends m{derive(e){return{patternIndex:e.currentMoveInfo.patternIndex,movesFinishing:e.currentMoveInfo.movesFinishing.map(t=>t.move),movesFinished:e.currentMoveInfo.movesFinished.map(t=>t.move)}}canReuseValue(e,t){return e.patternIndex===t.patternIndex&&Ge(e.movesFinishing,t.movesFinishing,(r,i)=>r.isIdentical(i))&&Ge(e.movesFinished,t.movesFinished,(r,i)=>r.isIdentical(i))}},mr=class extends m{derive(e){function t(r){return e.detailedTimelineInfo.atEnd&&e.catchUpMove.move!==null&&r.currentMoves.push({move:e.catchUpMove.move,direction:x.Backwards,fraction:1-e.catchUpMove.amount,startTimestamp:-1,endTimestamp:-1}),r}if(e.indexer.currentMoveInfo)return t(e.indexer.currentMoveInfo(e.detailedTimelineInfo.timestamp));{let r=e.indexer.timestampToIndex(e.detailedTimelineInfo.timestamp),i={patternIndex:r,currentMoves:[],movesFinishing:[],movesFinished:[],movesStarting:[],latestStart:-1/0,earliestEnd:1/0};if(e.indexer.numAnimatedLeaves()>0){let n=e.indexer.getAnimLeaf(r)?.as(T);if(!n)return t(i);let s=e.indexer.indexToMoveStartTimestamp(r),a=e.indexer.moveDuration(r),l=a?(e.detailedTimelineInfo.timestamp-s)/a:0,c=s+a,o={move:n,direction:x.Forwards,fraction:l,startTimestamp:s,endTimestamp:c};l===0?i.movesStarting.push(o):l===1?i.movesFinishing.push(o):(i.currentMoves.push(o),i.latestStart=Math.max(i.latestStart,s),i.earliestEnd=Math.min(i.earliestEnd,c))}return t(i)}}},gr=class extends m{derive(e){let t=e.indexer.transformationAtIndex(e.currentLeavesSimplified.patternIndex);t=e.anchoredStart.applyTransformation(t);for(let r of e.currentLeavesSimplified.movesFinishing)t=t.applyMove(r);for(let r of e.currentLeavesSimplified.movesFinished)t=t.applyMove(r);return t.toKPattern()}},tt={u:"y",l:"x",f:"z",r:"x",b:"z",d:"y",m:"x",e:"y",s:"z",x:"x",y:"y",z:"z"};function fr(e,t){return tt[e.family[0].toLowerCase()]===tt[t.family[0].toLowerCase()]}var wr=class extends H{traverseAlg(e){let t=[];for(let r of e.childAlgNodes())t.push(this.traverseAlgNode(r));return Array.prototype.concat(...t)}traverseGroupingOnce(e){if(e.experimentalIsEmpty())return[];let t=[];for(let n of e.childAlgNodes()){if(!(n.is(T)||n.is(Ie)||n.is(Le)))return this.traverseAlg(e);let s=n.as(T);s&&t.push(s)}let r=E(t[0].amount);for(let n=0;n<t.length-1;n++){for(let s=1;s<t.length;s++)if(!fr(t[n],t[s]))return this.traverseAlg(e);r=Math.max(r,E(t[n].amount))}let i=t.map(n=>({animLeafAlgNode:n,msUntilNext:0,duration:r}));return i[i.length-1].msUntilNext=r,i}traverseGrouping(e){let t=[],r=e.amount>0?e.alg:e.alg.invert();for(let i=0;i<Math.abs(e.amount);i++)t.push(this.traverseGroupingOnce(r));return Array.prototype.concat(...t)}traverseMove(e){let t=E(e.amount);return[{animLeafAlgNode:e,msUntilNext:t,duration:t}]}traverseCommutator(e){let t=[],r=[e.A,e.B,e.A.invert(),e.B.invert()];for(let i of r)t.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...t)}traverseConjugate(e){let t=[],r=[e.A,e.B,e.A.invert()];for(let i of r)t.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...t)}traversePause(e){if(e.experimentalNISSGrouping)return[];let t=E(1);return[{animLeafAlgNode:e,msUntilNext:t,duration:t}]}traverseNewline(e){return[]}traverseLineComment(e){return[]}},vr=Q(wr);function yr(e){let t=0;return vr(e).map(i=>{let n={animLeaf:i.animLeafAlgNode,start:t,end:t+i.duration};return t+=i.msUntilNext,n})}var ve=class{animLeaves;kpuzzle;constructor(e,t,r){this.kpuzzle=e,this.animLeaves=r?.animationTimelineLeaves??yr(t)}getAnimLeaf(e){return this.animLeaves[Math.min(e,this.animLeaves.length-1)]?.animLeaf??null}getAnimationTimelineLeaf(e){return this.animLeaves[Math.min(e,this.animLeaves.length-1)]}indexToMoveStartTimestamp(e){let t=0;return this.animLeaves.length>0&&(t=this.animLeaves[Math.min(e,this.animLeaves.length-1)].start),t}timestampToIndex(e){let t=0;for(t=0;t<this.animLeaves.length;t++)if(this.animLeaves[t].start>=e)return Math.max(0,t-1);return Math.max(0,t-1)}timestampToPosition(e,t){let r=this.currentMoveInfo(e),i=t??this.kpuzzle.identityTransformation().toKPattern();for(let n of this.animLeaves.slice(0,r.patternIndex)){let s=n.animLeaf.as(T);s!==null&&(i=i.applyMove(s))}return{pattern:i,movesInProgress:r.currentMoves}}currentMoveInfo(e){let t=1/0;for(let o of this.animLeaves)if(o.start<=e&&o.end>=e)t=Math.min(t,o.start);else if(o.start>e)break;let r=[],i=[],n=[],s=[],a=-1/0,l=1/0,c=0;for(let o of this.animLeaves)if(o.end<=t){if(!isFinite(t)&&o.start>e)break;c++}else{if(o.start>e)break;{let p=o.animLeaf.as(T);if(p!==null){let d=(e-o.start)/(o.end-o.start),w=!1;d>1&&(d=1,w=!0);let g={move:p,direction:x.Forwards,fraction:d,startTimestamp:o.start,endTimestamp:o.end};switch(d){case 0:{i.push(g);break}case 1:{w?s.push(g):n.push(g);break}default:r.push(g),a=Math.max(a,o.start),l=Math.min(l,o.end)}}}}return{patternIndex:c,currentMoves:r,latestStart:a,earliestEnd:l,movesStarting:i,movesFinishing:n,movesFinished:s}}patternAtIndex(e,t){let r=t??this.kpuzzle.defaultPattern();for(let i=0;i<this.animLeaves.length&&i<e;i++){let s=this.animLeaves[i].animLeaf.as(T);s!==null&&(r=r.applyMove(s))}return r}transformationAtIndex(e){let t=this.kpuzzle.identityTransformation();for(let r of this.animLeaves.slice(0,e)){let i=r.animLeaf.as(T);i!==null&&(t=t.applyMove(i))}return t}algDuration(){let e=0;for(let t of this.animLeaves)e=Math.max(e,t.end);return e}numAnimatedLeaves(){return this.animLeaves.length}moveDuration(e){let t=this.getAnimationTimelineLeaf(e);return t.end-t.start}},Mr=1024,xr=class extends m{derive(e){switch(e.indexerConstructorRequest){case"auto":return e.animationTimelineLeaves!==null||Oe(e.alg.alg)<=Mr&&e.puzzle==="3x3x3"&&e.visualizationStrategy==="Cube3D"?ve:He;case"tree":return He;case"simple":return Vt;case"simultaneous":return ve;default:throw new Error("Invalid indexer request!")}}},zr=class extends h{getDefaultValue(){return"auto"}},Tr=class extends m{derive(e){return new e.indexerConstructor(e.kpuzzle,e.algWithIssues.alg,{animationTimelineLeaves:e.animationTimelineLeaves})}},Sr=class extends m{derive(e){return{pattern:e.currentPattern,movesInProgress:e.currentMoveInfo.currentMoves}}},kr=!0,rt=class extends m{async derive(e){try{return kr&&e.kpuzzle.algToTransformation(e.algWithIssues.alg),e.algWithIssues}catch(t){return{alg:new y,issues:new _({errors:[`Invalid alg for puzzle: ${t.toString()}`]})}}}},br=class extends h{getDefaultValue(){return"start"}},Ar=class extends h{getDefaultValue(){return null}},Ir=class extends m{async derive(e){return e.puzzleLoader.kpuzzle()}},Lr=class extends h{getDefaultValue(){return V}},Dr=class extends m{async derive(e){return e.puzzleLoader.id}},Cr=class extends h{getDefaultValue(){return V}},Er=class extends m{derive(e){if(e.puzzleIDRequest&&e.puzzleIDRequest!==V){let t=Y[e.puzzleIDRequest];return t||this.userVisibleErrorTracker.set({errors:[`Invalid puzzle ID: ${e.puzzleIDRequest}`]}),t}return e.puzzleDescriptionRequest&&e.puzzleDescriptionRequest!==V?Ne(e.puzzleDescriptionRequest):ue}},Pr=class extends m{derive(e){return{playing:e.playingInfo.playing,atStart:e.detailedTimelineInfo.atStart,atEnd:e.detailedTimelineInfo.atEnd}}canReuseValue(e,t){return e.playing===t.playing&&e.atStart===t.atStart&&e.atEnd===t.atEnd}},Nr=class extends m{derive(e){let t=this.#e(e),r=!1,i=!1;return t>=e.timeRange.end&&(i=!0,t=Math.min(e.timeRange.end,t)),t<=e.timeRange.start&&(r=!0,t=Math.max(e.timeRange.start,t)),{timestamp:t,timeRange:e.timeRange,atStart:r,atEnd:i}}#e(e){switch(e.timestampRequest){case"auto":return e.setupAnchor==="start"&&e.setupAlg.alg.experimentalIsEmpty()?e.timeRange.end:e.timeRange.start;case"start":return e.timeRange.start;case"end":return e.timeRange.end;case"anchor":return e.setupAnchor==="start"?e.timeRange.start:e.timeRange.end;case"opposite-anchor":return e.setupAnchor==="start"?e.timeRange.end:e.timeRange.start;default:return e.timestampRequest}}canReuseValue(e,t){return e.timestamp===t.timestamp&&e.timeRange.start===t.timeRange.start&&e.timeRange.end===t.timeRange.end&&e.atStart===t.atStart&&e.atEnd===t.atEnd}},Rr=class extends D{async getDefaultValue(){return{direction:x.Forwards,playing:!1,untilBoundary:P.EntireTimeline,loop:!1}}async derive(e,t){let r=await t,i=Object.assign({},r);return Object.assign(i,e),i}canReuseValue(e,t){return e.direction===t.direction&&e.playing===t.playing&&e.untilBoundary===t.untilBoundary&&e.loop===t.loop}},Or=class extends D{getDefaultValue(){return 1}derive(e){return e<0?1:e}},jr={auto:!0,start:!0,end:!0,anchor:!0,"opposite-anchor":!0},Fr=class extends h{getDefaultValue(){return"auto"}set(e){let t=this.get();super.set((async()=>this.validInput(await e)?e:t)())}validInput(e){return!!(typeof e=="number"||jr[e])}},Vr=class extends m{derive(e){return{start:0,end:e.indexer.algDuration()}}},Br=class extends h{getDefaultValue(){return"auto"}},Ur=class extends h{getDefaultValue(){return"auto"}},qr=class extends m{derive(e){switch(e.puzzleID){case"clock":case"square1":case"redi_cube":case"melindas2x2x2x2":case"tri_quad":case"loopover":return"2D";case"3x3x3":switch(e.visualizationRequest){case"auto":case"3D":return"Cube3D";default:return e.visualizationRequest}default:switch(e.visualizationRequest){case"auto":case"3D":return"PG3D";case"experimental-2D-LL":case"experimental-2D-LL-face":return["2x2x2","4x4x4","megaminx"].includes(e.puzzleID)?"experimental-2D-LL":"2D";default:return e.visualizationRequest}}}},Wr=class extends h{getDefaultValue(){return"auto"}},Hr=class extends h{getDefaultValue(){return"auto"}},Qr=class extends h{getDefaultValue(){return"auto"}},Yr=class extends h{getDefaultValue(){return"auto"}},Gr=null;async function _r(){return Gr??=new(await C).ThreeTextureLoader}var it=class extends m{async derive(e){let{spriteURL:t}=e;return t===null?null:new Promise(async(r,i)=>{let n=()=>{console.warn("Could not load sprite:",t.toString()),r(null)};try{(await _r()).load(t.toString(),r,n,n)}catch{n()}})}},Zr={facelets:["regular","regular","regular","regular","regular"]};async function $r(e){let{definition:t}=await e.kpuzzle(),r={orbits:{}};for(let i of t.orbits)r.orbits[i.orbitName]={pieces:new Array(i.numPieces).fill(Zr)};return r}var Xr=class extends m{getDefaultValue(){return{orbits:{}}}async derive(e){return e.stickeringMaskRequest?e.stickeringMaskRequest:e.stickeringRequest==="picture"?{specialBehaviour:"picture",orbits:{}}:e.puzzleLoader.stickeringMask?.(e.stickeringRequest??"full")??$r(e.puzzleLoader)}},Jr={"-":S.Regular,D:S.Dim,I:S.Ignored,X:S.Invisible,O:S.IgnoreNonPrimary,P:S.PermuteNonPrimary,o:S.Ignoriented,"?":S.OrientationWithoutPermutation,M:S.Mystery,"@":S.Regular};function Kr(e){let t={orbits:{}},r=e.split(",");for(let i of r){let[n,s,...a]=i.split(":");if(a.length>0)throw new Error(`Invalid serialized orbit stickering mask (too many colons): \`${i}\``);let l=[];t.orbits[n]={pieces:l};for(let c of s){let o=Jr[c];l.push(Ee(o))}}return t}var ei=class extends D{getDefaultValue(){return null}derive(e){return e===null?null:typeof e=="string"?Kr(e):e}},ti=class extends h{getDefaultValue(){return null}},ri=class extends h{getDefaultValue(){return"auto"}},ii=class extends h{getDefaultValue(){return{}}},ni=class extends h{getDefaultValue(){return"auto"}},si=class extends h{getDefaultValue(){return"auto"}},ai=class extends m{derive(e){return e.colorSchemeRequest==="dark"?"dark":"light"}},oi=class extends h{getDefaultValue(){return"auto"}},li=class extends h{getDefaultValue(){return null}},ci=35,di=class extends h{getDefaultValue(){return ci}};function Dt(e,t){return e.latitude===t.latitude&&e.longitude===t.longitude&&e.distance===t.distance}var ui=class extends D{getDefaultValue(){return"auto"}canReuseValue(e,t){return e===t||Dt(e,t)}async derive(e,t){if(e==="auto")return"auto";let r=await t;r==="auto"&&(r={});let i=Object.assign({},r);return Object.assign(i,e),typeof i.latitude<"u"&&(i.latitude=Math.min(Math.max(i.latitude,-90),90)),typeof i.longitude<"u"&&(i.longitude=xe(i.longitude,180,-180)),i}},hi=class extends m{canReuseValue(e,t){return Dt(e,t)}async derive(e){if(e.orbitCoordinatesRequest==="auto")return st(e.puzzleID,e.strategy);let t=Object.assign(Object.assign({},st(e.puzzleID,e.strategy),e.orbitCoordinatesRequest));if(Math.abs(t.latitude)<=e.latitudeLimit)return t;{let{latitude:r,longitude:i,distance:n}=t;return{latitude:e.latitudeLimit*Math.sign(r),longitude:i,distance:n}}}},pi={latitude:31.717474411461005,longitude:0,distance:5.877852522924731},mi={latitude:35,longitude:30,distance:6},nt={latitude:35,longitude:30,distance:6.25},gi={latitude:Math.atan(1/2)*Ue,longitude:0,distance:6.7},fi={latitude:26.56505117707799,longitude:0,distance:6};function st(e,t){if(e[1]==="x")return t==="Cube3D"?mi:nt;switch(e){case"megaminx":case"gigaminx":return gi;case"pyraminx":case"master_tetraminx":return fi;case"skewb":return nt;default:return pi}}var wi=class{background=new si;colorSchemeRequest=new oi;dragInput=new ri;foundationDisplay=new Hr;foundationStickerSpriteURL=new Se;fullscreenElement=new li;hintFacelet=new Be;hintStickerSpriteURL=new Se;initialHintFaceletsAnimation=new Yr;hintFaceletsElevation=new Qr;latitudeLimit=new di;movePressInput=new ni;movePressCancelOptions=new ii;orbitCoordinatesRequest=new ui;stickeringMaskRequest=new ei;stickeringRequest=new ti;faceletScale=new Wr;colorScheme=new ai({colorSchemeRequest:this.colorSchemeRequest});foundationStickerSprite=new it({spriteURL:this.foundationStickerSpriteURL});hintStickerSprite=new it({spriteURL:this.hintStickerSpriteURL});orbitCoordinates;stickeringMask;twistyPlayerModel;constructor(e){this.twistyPlayerModel=e,this.orbitCoordinates=new hi({orbitCoordinatesRequest:this.orbitCoordinatesRequest,latitudeLimit:this.latitudeLimit,puzzleID:e.puzzleID,strategy:e.visualizationStrategy}),this.stickeringMask=new Xr({stickeringMaskRequest:this.stickeringMaskRequest,stickeringRequest:this.stickeringRequest,puzzleLoader:e.puzzleLoader})}},vi={errors:[]},yi=class extends h{getDefaultValue(){return vi}reset(){this.set(this.getDefaultValue())}canReuseValue(e,t){return Me(e.errors,t.errors)}},Mi=class{userVisibleErrorTracker=new yi;alg=new et;backView=new Yt;controlPanel=new Kt;catchUpMove=new hr;indexerConstructorRequest=new zr;playingInfo=new Rr;puzzleDescriptionRequest=new Lr;puzzleIDRequest=new Cr;setupAnchor=new br;setupAlg=new et;setupTransformation=new Ar;tempoScale=new Or;timestampRequest=new Fr;viewerLink=new Br;visualizationFormat=new Ur;title=new Ke;videoURL=new Se;competitionID=new Ke;animationTimelineLeavesRequest=new ur;puzzleLoader=new Er({puzzleIDRequest:this.puzzleIDRequest,puzzleDescriptionRequest:this.puzzleDescriptionRequest},this.userVisibleErrorTracker);kpuzzle=new Ir({puzzleLoader:this.puzzleLoader});puzzleID=new Dr({puzzleLoader:this.puzzleLoader});puzzleAlg=new rt({algWithIssues:this.alg,kpuzzle:this.kpuzzle});puzzleSetupAlg=new rt({algWithIssues:this.setupAlg,kpuzzle:this.kpuzzle});visualizationStrategy=new qr({visualizationRequest:this.visualizationFormat,puzzleID:this.puzzleID});indexerConstructor=new xr({alg:this.alg,puzzle:this.puzzleID,visualizationStrategy:this.visualizationStrategy,indexerConstructorRequest:this.indexerConstructorRequest,animationTimelineLeaves:this.animationTimelineLeavesRequest});setupAlgTransformation=new cr({setupAlg:this.puzzleSetupAlg,kpuzzle:this.kpuzzle});indexer=new Tr({indexerConstructor:this.indexerConstructor,algWithIssues:this.puzzleAlg,kpuzzle:this.kpuzzle,animationTimelineLeaves:this.animationTimelineLeavesRequest});anchorTransformation=new dr({setupTransformation:this.setupTransformation,setupAnchor:this.setupAnchor,setupAlgTransformation:this.setupAlgTransformation,indexer:this.indexer});timeRange=new Vr({indexer:this.indexer});detailedTimelineInfo=new Nr({timestampRequest:this.timestampRequest,timeRange:this.timeRange,setupAnchor:this.setupAnchor,setupAlg:this.setupAlg});coarseTimelineInfo=new Pr({detailedTimelineInfo:this.detailedTimelineInfo,playingInfo:this.playingInfo});currentMoveInfo=new mr({indexer:this.indexer,detailedTimelineInfo:this.detailedTimelineInfo,catchUpMove:this.catchUpMove});buttonAppearance=new sr({coarseTimelineInfo:this.coarseTimelineInfo,viewerLink:this.viewerLink});currentLeavesSimplified=new pr({currentMoveInfo:this.currentMoveInfo});currentPattern=new gr({anchoredStart:this.anchorTransformation,currentLeavesSimplified:this.currentLeavesSimplified,indexer:this.indexer});legacyPosition=new Sr({currentMoveInfo:this.currentMoveInfo,currentPattern:this.currentPattern});twistySceneModel=new wi(this);async twizzleLink(){let[e,t,r,i,n,s,a,l]=await Promise.all([this.viewerLink.get(),this.puzzleID.get(),this.puzzleDescriptionRequest.get(),this.alg.get(),this.setupAlg.get(),this.setupAnchor.get(),this.twistySceneModel.stickeringRequest.get(),this.twistySceneModel.twistyPlayerModel.title.get()]),c=e==="experimental-twizzle-explorer",o=new URL(`https://alpha.twizzle.net/${c?"explore":"edit"}/`);return i.alg.experimentalIsEmpty()||o.searchParams.set("alg",i.alg.toString()),n.alg.experimentalIsEmpty()||o.searchParams.set("setup-alg",n.alg.toString()),s!=="start"&&o.searchParams.set("setup-anchor",s),a!=="full"&&a!==null&&o.searchParams.set("experimental-stickering",a),c&&r!==V?o.searchParams.set("puzzle-description",r):t!=="3x3x3"&&o.searchParams.set("puzzle",t),l&&o.searchParams.set("title",l),o.toString()}experimentalAddAlgLeaf(e,t){let r=e.as(T);r?this.experimentalAddMove(r,t):this.alg.set((async()=>{let n=(await this.alg.get()).alg.concat(new y([e]));return this.timestampRequest.set("end"),n})())}experimentalAddMove(e,t){let r=typeof e=="string"?new T(e):e;this.alg.set((async()=>{let[{alg:i},n]=await Promise.all([this.alg.get(),this.puzzleLoader.get()]),s=Ce(i,r,{...t,...await Pe(n)});return this.timestampRequest.set("end"),this.catchUpMove.set({move:r,amount:0}),s})())}experimentalRemoveFinalChild(){this.alg.set((async()=>{let e=(await this.alg.get()).alg,t=Array.from(e.childAlgNodes()),[r]=t.splice(-1);if(!r)return e;this.timestampRequest.set("end");let i=r.as(T);return i&&this.catchUpMove.set({move:i.invert(),amount:0}),new y(t)})())}};function u(e){return new Error(`Cannot get \`.${e}\` directly from a \`TwistyPlayer\`.`)}var xi=class extends b{experimentalModel=new Mi;set alg(e){this.experimentalModel.alg.set(e)}get alg(){throw u("alg")}set experimentalSetupAlg(e){this.experimentalModel.setupAlg.set(e)}get experimentalSetupAlg(){throw u("setup")}set experimentalSetupAnchor(e){this.experimentalModel.setupAnchor.set(e)}get experimentalSetupAnchor(){throw u("anchor")}set puzzle(e){this.experimentalModel.puzzleIDRequest.set(e)}get puzzle(){throw u("puzzle")}set experimentalPuzzleDescription(e){this.experimentalModel.puzzleDescriptionRequest.set(e)}get experimentalPuzzleDescription(){throw u("experimentalPuzzleDescription")}set timestamp(e){this.experimentalModel.timestampRequest.set(e)}get timestamp(){throw u("timestamp")}set hintFacelets(e){this.experimentalModel.twistySceneModel.hintFacelet.set(e)}get hintFacelets(){throw u("hintFacelets")}set experimentalStickering(e){this.experimentalModel.twistySceneModel.stickeringRequest.set(e)}get experimentalStickering(){throw u("experimentalStickering")}set experimentalStickeringMaskOrbits(e){this.experimentalModel.twistySceneModel.stickeringMaskRequest.set(e)}get experimentalStickeringMaskOrbits(){throw u("experimentalStickeringMaskOrbits")}set experimentalFaceletScale(e){this.experimentalModel.twistySceneModel.faceletScale.set(e)}get experimentalFaceletScale(){throw u("experimentalFaceletScale")}set backView(e){this.experimentalModel.backView.set(e)}get backView(){throw u("backView")}set background(e){this.experimentalModel.twistySceneModel.background.set(e)}get background(){throw u("background")}set colorScheme(e){this.experimentalModel.twistySceneModel.colorSchemeRequest.set(e)}get colorScheme(){throw u("colorScheme")}set controlPanel(e){this.experimentalModel.controlPanel.set(e)}get controlPanel(){throw u("controlPanel")}set visualization(e){this.experimentalModel.visualizationFormat.set(e)}get visualization(){throw u("visualization")}set experimentalTitle(e){this.experimentalModel.title.set(e)}get experimentalTitle(){throw u("experimentalTitle")}set experimentalVideoURL(e){this.experimentalModel.videoURL.set(e)}get experimentalVideoURL(){throw u("experimentalVideoURL")}set experimentalCompetitionID(e){this.experimentalModel.competitionID.set(e)}get experimentalCompetitionID(){throw u("experimentalCompetitionID")}set viewerLink(e){this.experimentalModel.viewerLink.set(e)}get viewerLink(){throw u("viewerLink")}set experimentalMovePressInput(e){this.experimentalModel.twistySceneModel.movePressInput.set(e)}get experimentalMovePressInput(){throw u("experimentalMovePressInput")}set experimentalMovePressCancelOptions(e){this.experimentalModel.twistySceneModel.movePressCancelOptions.set(e)}get experimentalMovePressCancelOptions(){throw u("experimentalMovePressCancelOptions")}set cameraLatitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({latitude:e})}get cameraLatitude(){throw u("cameraLatitude")}set cameraLongitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({longitude:e})}get cameraLongitude(){throw u("cameraLongitude")}set cameraDistance(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({distance:e})}get cameraDistance(){throw u("cameraDistance")}set cameraLatitudeLimit(e){this.experimentalModel.twistySceneModel.latitudeLimit.set(e)}get cameraLatitudeLimit(){throw u("cameraLatitudeLimit")}set indexer(e){this.experimentalModel.indexerConstructorRequest.set(e)}get indexer(){throw u("indexer")}set tempoScale(e){this.experimentalModel.tempoScale.set(e)}get tempoScale(){throw u("tempoScale")}set experimentalSprite(e){this.experimentalModel.twistySceneModel.foundationStickerSpriteURL.set(e)}get experimentalSprite(){throw u("experimentalSprite")}set experimentalHintSprite(e){this.experimentalModel.twistySceneModel.hintStickerSpriteURL.set(e)}get experimentalHintSprite(){throw u("experimentalHintSprite")}set fullscreenElement(e){this.experimentalModel.twistySceneModel.fullscreenElement.set(e)}get fullscreenElement(){throw u("fullscreenElement")}set experimentalInitialHintFaceletsAnimation(e){this.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set(e)}get experimentalInitialHintFaceletsAnimation(){throw u("experimentalInitialHintFaceletsAnimation")}set experimentalHintFaceletsElevation(e){this.experimentalModel.twistySceneModel.hintFaceletsElevation.set(e)}get experimentalHintFaceletsElevation(){throw u("experimentalHintFaceletsElevation")}set experimentalDragInput(e){this.experimentalModel.twistySceneModel.dragInput.set(e)}get experimentalDragInput(){throw u("experimentalDragInput")}experimentalGet=new zi(this.experimentalModel)},zi=class{model;constructor(e){this.model=e}async alg(){return(await this.model.alg.get()).alg}async setupAlg(){return(await this.model.setupAlg.get()).alg}puzzleID(){return this.model.puzzleID.get()}async timestamp(){return(await this.model.detailedTimelineInfo.get()).timestamp}},ye="data-",ae={alg:"alg","experimental-setup-alg":"experimentalSetupAlg","experimental-setup-anchor":"experimentalSetupAnchor",puzzle:"puzzle","experimental-puzzle-description":"experimentalPuzzleDescription",visualization:"visualization","hint-facelets":"hintFacelets","experimental-stickering":"experimentalStickering","experimental-stickering-mask-orbits":"experimentalStickeringMaskOrbits",background:"background","color-scheme":"colorScheme","control-panel":"controlPanel","back-view":"backView","experimental-facelet-scale":"experimentalFaceletScale","experimental-initial-hint-facelets-animation":"experimentalInitialHintFaceletsAnimation","experimental-hint-facelets-elevation":"experimentalHintFaceletsElevation","viewer-link":"viewerLink","experimental-move-press-input":"experimentalMovePressInput","experimental-drag-input":"experimentalDragInput","experimental-title":"experimentalTitle","experimental-video-url":"experimentalVideoURL","experimental-competition-id":"experimentalCompetitionID","camera-latitude":"cameraLatitude","camera-longitude":"cameraLongitude","camera-distance":"cameraDistance","camera-latitude-limit":"cameraLatitudeLimit","tempo-scale":"tempoScale","experimental-sprite":"experimentalSprite","experimental-hint-sprite":"experimentalHintSprite"},Ti=Object.fromEntries(Object.values(ae).map(e=>[e,!0])),Si={experimentalMovePressCancelOptions:!0},at,Ct=Symbol("intersectedCallback");function ki(e){at??=new IntersectionObserver((t,r)=>{for(let i of t)i.isIntersecting&&i.intersectionRect.height>0&&(i.target[Ct](),r.unobserve(i.target))}),at.observe(e)}var oe=class extends xi{controller=new Xt(this.experimentalModel,this);buttons;experimentalCanvasClickCallback=()=>{};constructor(e={}){super();for(let[t,r]of Object.entries(e)){if(!(Ti[t]||Si[t])){console.warn(`Invalid config passed to TwistyPlayer: ${t}`);break}this[t]=r}}#e=new Z(this,"controls-",["auto"].concat(Object.keys(Jt)));#r=document.createElement("div");#t=document.createElement("div");#n=!1;connectedCallback(){this.addCSS(At),ki(this)}async[Ct](){if(this.#n)return;this.#n=!0,this.addElement(this.#r).classList.add("visualization-wrapper"),this.addElement(this.#t).classList.add("error-elem"),this.#t.textContent="Error",this.experimentalModel.userVisibleErrorTracker.addFreshListener(t=>{let r=t.errors[0]??null;this.contentWrapper.classList.toggle("error",!!r),r&&(this.#t.textContent=r)});let e=new St(this.experimentalModel,this.controller);this.contentWrapper.appendChild(e),this.buttons=new Mt(this.experimentalModel,this.controller,this),this.contentWrapper.appendChild(this.buttons),this.experimentalModel.twistySceneModel.background.addFreshListener(t=>{this.contentWrapper.classList.toggle("checkered",["auto","checkered"].includes(t)),this.contentWrapper.classList.toggle("checkered-transparent",t==="checkered-transparent")}),this.experimentalModel.twistySceneModel.colorScheme.addFreshListener(t=>{this.contentWrapper.classList.toggle("dark-mode",["dark"].includes(t))}),this.experimentalModel.controlPanel.addFreshListener(t=>{this.#e.setValue(t)}),this.experimentalModel.visualizationStrategy.addFreshListener(this.#l.bind(this)),this.experimentalModel.puzzleID.addFreshListener(this.flash.bind(this))}#s="auto";experimentalSetFlashLevel(e){this.#s=e}flash(){this.#s==="auto"&&this.#i?.animate([{opacity:.25},{opacity:1}],{duration:250,easing:"ease-out"})}#i=null;#a=new ft;#o=null;#l(e){if(e!==this.#o){this.#i?.remove(),this.#i?.disconnect();let t;switch(e){case"2D":case"experimental-2D-LL":case"experimental-2D-LL-face":{t=new gt(this.experimentalModel.twistySceneModel,e);break}case"Cube3D":case"PG3D":{t=new ze(this.experimentalModel),this.#a.handleNewValue(t);break}default:throw new Error("Invalid visualization")}this.#r.appendChild(t),this.#i=t,this.#o=e}}async experimentalCurrentVantages(){this.connectedCallback();let e=this.#i;return e instanceof ze?e.experimentalVantages():[]}async experimentalCurrentCanvases(){let e=await this.experimentalCurrentVantages(),t=[];for(let r of e)t.push((await r.canvasInfo()).canvas);return t}async experimentalCurrentThreeJSPuzzleObject(e){this.connectedCallback();let r=await(await this.#a.promise).experimentalTwisty3DPuzzleWrapper(),i=r.twisty3DPuzzle(),n=(async()=>{await i,await new Promise(s=>setTimeout(s,0))})();if(e){let s=new G(async()=>{});r.addEventListener("render-scheduled",async()=>{s.requestIsPending()||(s.requestAnimFrame(),await n,e())})}return i}jumpToStart(e){this.controller.jumpToStart(e)}jumpToEnd(e){this.controller.jumpToEnd(e)}play(){this.controller.togglePlay(!0)}pause(){this.controller.togglePlay(!1)}togglePlay(e){this.controller.togglePlay(e)}experimentalAddMove(e,t){this.experimentalModel.experimentalAddMove(e,t)}experimentalAddAlgLeaf(e,t){this.experimentalModel.experimentalAddAlgLeaf(e,t)}static get observedAttributes(){let e=[];for(let t of Object.keys(ae))e.push(t,ye+t);return e}experimentalRemoveFinalChild(){this.experimentalModel.experimentalRemoveFinalChild()}attributeChangedCallback(e,t,r){e.startsWith(ye)&&(e=e.slice(ye.length));let i=ae[e];i&&(this[i]=r)}async experimentalScreenshot(e){return(await Je(this.experimentalModel,e)).dataURL}async experimentalDownloadScreenshot(e){if(["2D","experimental-2D-LL","experimental-2D-LL-face"].includes(await this.experimentalModel.visualizationStrategy.get())){let r=await this.#i.currentTwisty2DPuzzleWrapper().twisty2DPuzzle(),i=new XMLSerializer().serializeToString(r.svgWrapper.svgElement),n=URL.createObjectURL(new Blob([i]));bt(n,e??await kt(this.experimentalModel),"svg")}else await(await Je(this.experimentalModel)).download(e)}};M.define("twisty-player",oe);var bi=class extends J{traverseAlg(e,t){let r=[],i=0;for(let n of e.childAlgNodes()){let s=this.traverseAlgNode(n,{numMovesSoFar:t.numMovesSoFar+i});r.push(s.tokens),i+=s.numLeavesInside}return{tokens:Array.prototype.concat(...r),numLeavesInside:i}}traverseGrouping(e,t){let r=this.traverseAlg(e.alg,t);return{tokens:r.tokens,numLeavesInside:r.numLeavesInside*e.amount}}traverseMove(e,t){return{tokens:[{leaf:e,idx:t.numMovesSoFar}],numLeavesInside:1}}traverseCommutator(e,t){let r=this.traverseAlg(e.A,t),i=this.traverseAlg(e.B,{numMovesSoFar:t.numMovesSoFar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside}}traverseConjugate(e,t){let r=this.traverseAlg(e.A,t),i=this.traverseAlg(e.B,{numMovesSoFar:t.numMovesSoFar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside*2}}traversePause(e,t){return{tokens:[{leaf:e,idx:t.numMovesSoFar}],numLeavesInside:1}}traverseNewline(e,t){return{tokens:[],numLeavesInside:0}}traverseLineComment(e,t){return{tokens:[],numLeavesInside:0}}},Ai=Q(bi),Ii=class extends h{getDefaultValue(){return""}},Li=class extends m{derive(e){return Lt(e.value)}},Di=class extends D{getDefaultValue(){return{selectionStart:0,selectionEnd:0,endChangedMostRecently:!1}}async derive(e,t){let{selectionStart:r,selectionEnd:i}=e,n=await t,s=e.selectionStart===n.selectionStart&&e.selectionEnd!==(await t).selectionEnd;return{selectionStart:r,selectionEnd:i,endChangedMostRecently:s}}},Ci=class extends m{derive(e){return e.selectionInfo.endChangedMostRecently?e.selectionInfo.selectionEnd:e.selectionInfo.selectionStart}},Ei=class extends m{derive(e){return Ai(e.algWithIssues.alg,{numMovesSoFar:0}).tokens}},Pi=class extends m{derive(e){function t(i){if(i===null)return null;let n;return e.targetChar<i.leaf[L]?n="before":e.targetChar===i.leaf[L]?n="start":e.targetChar<i.leaf[F]?n="inside":e.targetChar===i.leaf[F]?n="end":n="after",{leafInfo:i,where:n}}let r=null;for(let i of e.leafTokens){if(e.targetChar<i.leaf[L]&&r!==null)return t(r);if(e.targetChar<=i.leaf[F])return t(i);r=i}return t(r)}},Ni=class{valueProp=new Ii;selectionProp=new Di;targetCharProp=new Ci({selectionInfo:this.selectionProp});algEditorAlgWithIssues=new Li({value:this.valueProp});leafTokensProp=new Ei({algWithIssues:this.algEditorAlgWithIssues});leafToHighlight=new Pi({leafTokens:this.leafTokensProp,targetChar:this.targetCharProp})},Ri="//";function Oi(e){try{return y.fromString(e)}catch{return null}}function Et(e,t){let r=e.indexOf(t);return r===-1?[e,""]:[e.slice(0,r),e.slice(r)]}function ot(e){let t=[];for(let r of e.split(`
`)){let[i,n]=Et(r,Ri);i=i.replaceAll("\u2019","'"),t.push(i+n)}return t.join(`
`)}function ji(e,t){let{value:r}=e,{selectionStart:i,selectionEnd:n}=e,s=r.slice(0,i),a=r.slice(n);t=t.replaceAll(`\r
`,`
`);let l=s.match(/\/\/[^\n]*$/),c=r[i-1]==="/"&&t[0]==="/",o=l||c,p=t.match(/\/\/[^\n]*$/),d=t;if(o){let[A,O]=Et(t,`
`);d=A+ot(O)}else d=ot(t);let w=!o&&i!==0&&![`
`," "].includes(d[0])&&![`
`," "].includes(r[i-1]),g=!p&&n!==r.length&&![`
`," "].includes(d.at(-1))&&![`
`," "].includes(r[n]);function z(A,O){let X=A+d+O,j=!!Oi(s+X+a);return j&&(d=X),j}w&&g&&z(" "," ")||w&&z(" ","")||g&&z(""," "),N?.execCommand("insertText",!1,d)||e.setRangeText(d,i,n,"end")}var Pt=new k;Pt.replaceSync(`
:host {
  width: 384px;
  display: grid;
}

.wrapper {
  /*overflow: hidden;
  resize: horizontal;*/

  background: var(--background, none);
  display: grid;
}

textarea, .carbon-copy {
  grid-area: 1 / 1 / 2 / 2;

  width: 100%;
  font-family: sans-serif;
  line-height: 1.2em;

  font-size: var(--font-size, inherit);
  font-family: var(--font-family, sans-serif);

  box-sizing: border-box;

  padding: var(--padding, 0.5em);
  /* Prevent horizontal growth. */
  overflow-x: hidden;
}

textarea {
  resize: none;
  background: none;
  z-index: 2;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.25));
  overflow: hidden;
}

.carbon-copy {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
  user-select: none;
  pointer-events: none;

  z-index: 1;
}

.carbon-copy .highlight {
  background: var(--highlight-color, rgba(255, 128, 0, 0.5));
  padding: 0.1em 0.2em;
  margin: -0.1em -0.2em;
  border-radius: 0.2em;
}

.wrapper.issue-warning textarea,
.wrapper.valid-for-puzzle-warning textarea {
  outline: none;
  border: 1px solid rgba(200, 200, 0, 0.5);
  background: rgba(255, 255, 0, 0.1);
}

.wrapper.issue-error textarea,
.wrapper.valid-for-puzzle-error textarea {
  outline: none;
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.1);
}
`);var ee="for-twisty-player",lt="placeholder",ct="twisty-player-prop",Fi=class extends b{model=new Ni;#e=document.createElement("textarea");#r=document.createElement("div");#t=document.createElement("span");#n=document.createElement("span");#s=document.createElement("span");#i=new Z(this,"valid-for-puzzle-",["none","warning","error"]);#a=null;#o;get#l(){return this.#a===null?null:this.#a.experimentalModel[this.#o]}debugNeverRequestTimestamp=!1;constructor(e){super(),this.#r.classList.add("carbon-copy"),this.addElement(this.#r),this.#e.rows=1,this.addElement(this.#e),this.#t.classList.add("prefix"),this.#r.appendChild(this.#t),this.#n.classList.add("highlight"),this.#r.appendChild(this.#n),this.#s.classList.add("suffix"),this.#r.appendChild(this.#s),this.#e.placeholder="Alg",this.#e.setAttribute("spellcheck","false"),this.addCSS(Pt),this.#e.addEventListener("input",()=>{this.#c=!0,this.onInput()}),this.#e.addEventListener("blur",()=>this.onBlur()),document.addEventListener("selectionchange",()=>this.onSelectionChange()),e?.twistyPlayer&&(this.twistyPlayer=e.twistyPlayer),this.#o=e?.twistyPlayerProp??"alg",e?.twistyPlayerProp==="alg"&&this.model.leafToHighlight.addFreshListener(t=>{t&&this.highlightLeaf(t.leafInfo.leaf)})}connectedCallback(){this.#e.addEventListener("paste",e=>{let t=e.clipboardData?.getData("text");t&&(ji(this.#e,t),e.preventDefault(),this.onInput())})}set algString(e){this.#e.value=e,this.onInput()}get algString(){return this.#e.value}set placeholder(e){this.#e.placeholder=e}#c=!1;onInput(){this.#n.hidden=!0,this.highlightLeaf(null);let e=this.#e.value.trimEnd();this.model.valueProp.set(e),this.#l?.set(e)}async onSelectionChange(){if(document.activeElement!==this||this.shadow.activeElement!==this.#e||this.#o!=="alg")return;let{selectionStart:e,selectionEnd:t}=this.#e;this.model.selectionProp.set({selectionStart:e,selectionEnd:t})}async onBlur(){}setAlgIssueClassForPuzzle(e){this.#i.setValue(e)}#d(e){return e.endsWith(`
`)?`${e} `:e}#u=null;highlightLeaf(e){if(e===null){this.#t.textContent="",this.#n.textContent="",this.#s.textContent=this.#d(this.#e.value);return}e!==this.#u&&(this.#u=e,this.#t.textContent=this.#e.value.slice(0,e[L]),this.#n.textContent=this.#e.value.slice(e[L],e[F]),this.#s.textContent=this.#d(this.#e.value.slice(e[F])),this.#n.hidden=!1)}get twistyPlayer(){return this.#a}set twistyPlayer(e){if(this.#a){console.warn("twisty-player reassignment/clearing is not supported");return}this.#a=e,e&&((async()=>this.algString=this.#l?(await this.#l.get()).alg.toString():"")(),this.#o==="alg"&&(this.#a?.experimentalModel.puzzleAlg.addFreshListener(t=>{if(t.issues.errors.length===0){this.setAlgIssueClassForPuzzle(t.issues.warnings.length===0?"none":"warning");let r=t.alg,i=y.fromString(this.algString);r.isIdentical(i)||(this.algString=r.toString(),this.onInput())}else this.setAlgIssueClassForPuzzle("error")}),this.model.leafToHighlight.addFreshListener(async t=>{if(t===null)return;let[r,i]=await Promise.all([await e.experimentalModel.indexer.get(),await e.experimentalModel.timestampRequest.get()]);if(i==="auto"&&!this.#c)return;let n=r.indexToMoveStartTimestamp(t.leafInfo.idx),s=r.moveDuration(t.leafInfo.idx),a;switch(t.where){case"before":{a=n;break}case"start":case"inside":{a=n+s/4;break}case"end":case"after":{a=n+s;break}default:throw console.log("invalid where"),new Error("Invalid where!")}this.debugNeverRequestTimestamp||e.experimentalModel.timestampRequest.set(a)}),e.experimentalModel.currentLeavesSimplified.addFreshListener(async t=>{let i=(await e.experimentalModel.indexer.get()).getAnimLeaf(t.patternIndex);this.highlightLeaf(i)})))}attributeChangedCallback(e,t,r){switch(e){case ee:{let i=document.getElementById(r);if(!i){console.warn(`${ee}= elem does not exist`);return}if(!(i instanceof oe)){console.warn(`${ee}=is not a twisty-player`);return}this.twistyPlayer=i;return}case lt:{this.placeholder=r;return}case ct:{if(this.#a)throw console.log("cannot set prop"),new Error("cannot set prop after twisty player");this.#o=r;return}}}static get observedAttributes(){return[ee,lt,ct]}};M.define("twisty-alg-editor",Fi);async function Vi(e){return new Promise((t,r)=>{try{let i=document.getElementById(e);i&&t(i);let n=new MutationObserver(s=>{for(let a of s)a.attributeName==="id"&&a.target instanceof Element&&a.target.getAttribute("id")===e&&(t(a.target),n.disconnect())});n.observe(document.body,{attributeFilter:["id"],subtree:!0})}catch(i){r(i)}})}var Nt=new k;Nt.replaceSync(`
:host {
  display: inline;
  --comment-opacity: 0.4;
  --active-background-shade: rgba(66, 133, 244);
}

.wrapper {
  display: inline;
  --current-color: currentColor
}

a {
  color: currentColor;

  &:not(:hover) {
    text-decoration: none;
  }

  &:hover {
    background: color-mix(in oklab, currentColor 20%, transparent);
  }

  &:active {
    color: currentColor;
    animation: 1s linear flash;
  }
}

@keyframes flash {
  from { opacity: 0.5; }
  to { opacity: 1; }
}

twisty-alg-leaf-elem.twisty-alg-line-comment {
  opacity: var(--comment-opacity);
}

.current-move {
  background: color-mix(in oklab, var(--active-background-shade) 30%, transparent);
  margin-left: -0.1em;
  margin-right: -0.1em;
  padding-left: 0.1em;
  padding-right: 0.1em;
  border-radius: 0.1em;
}
`);var Bi=.25,U=class extends me{algOrAlgNode;constructor(e,t,r,i,n,s){if(super(),this.algOrAlgNode=i,this.classList.add(e),s){let a=this.appendChild(document.createElement("a"));a.href="#",a.textContent=t,a.addEventListener("click",l=>{l.preventDefault(),r.twistyAlgViewer.jumpToIndex(r.earliestMoveIndex,n)})}else this.appendChild(document.createElement("span")).textContent=t}pathToIndex(e){return[]}setCurrentMove(e){this.classList.toggle("current-move",e)}};M.define("twisty-alg-leaf-elem",U);var q=class extends me{queue=[];algOrAlgNode;constructor(e,t){super(),this.algOrAlgNode=t,this.classList.add(e)}addString(e){let t=document.createElement("span");t.textContent=e,this.queue.push(t)}addElem(e){return this.queue.push(e.element),e.moveCount}flushQueue(e=I.Forwards){for(let t of Rt(this.queue,e))this.append(t);this.queue=[]}pathToIndex(e){return[]}};M.define("twisty-alg-wrapper-elem",q);function Ui(e){return e===I.Forwards?I.Backwards:I.Forwards}function qi(e,t){return t<0?Ui(e):e}function Rt(e,t){if(t===I.Forwards)return e;let r=Array.from(e);return r.reverse(),r}var Wi=class extends J{traverseAlg(e,t){let r=0,i=new q("twisty-alg-alg",e),n=!0;for(let s of be(e.childAlgNodes(),t.direction))n||i.addString(" "),n=!1,s.as(de)?.experimentalNISSGrouping&&i.addString("^("),s.as(W)?.experimentalNISSPlaceholder||(r+=i.addElem(this.traverseAlgNode(s,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction}))),s.as(de)?.experimentalNISSGrouping&&i.addString(")");return i.flushQueue(t.direction),{moveCount:r,element:i}}traverseGrouping(e,t){let r=e.experimentalAsSquare1Tuple(),i=qi(t.direction,e.amount),n=0,s=new q("twisty-alg-grouping",e);return s.addString("("),r?(n+=s.addElem({moveCount:1,element:new U("twisty-alg-move",r[0].amount.toString(),t,r[0],!0,!0)}),s.addString(", "),n+=s.addElem({moveCount:1,element:new U("twisty-alg-move",r[1].amount.toString(),t,r[1],!0,!0)})):n+=s.addElem(this.traverseAlg(e.alg,{earliestMoveIndex:t.earliestMoveIndex+n,twistyAlgViewer:t.twistyAlgViewer,direction:i})),s.addString(`)${e.experimentalRepetitionSuffix}`),s.flushQueue(),{moveCount:n*Math.abs(e.amount),element:s}}traverseMove(e,t){let r=new U("twisty-alg-move",e.toString(),t,e,!0,!0);return t.twistyAlgViewer.highlighter.addMove(e[L],r),{moveCount:1,element:r}}traverseCommutator(e,t){let r=0,i=new q("twisty-alg-commutator",e);i.addString("["),i.flushQueue();let[n,s]=Rt([e.A,e.B],t.direction);return r+=i.addElem(this.traverseAlg(n,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction})),i.addString(", "),r+=i.addElem(this.traverseAlg(s,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction})),i.flushQueue(t.direction),i.addString("]"),i.flushQueue(),{moveCount:r*2,element:i}}traverseConjugate(e,t){let r=0,i=new q("twisty-alg-conjugate",e);i.addString("[");let n=i.addElem(this.traverseAlg(e.A,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction}));return r+=n,i.addString(": "),r+=i.addElem(this.traverseAlg(e.B,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction})),i.addString("]"),i.flushQueue(),{moveCount:r+n,element:i}}traversePause(e,t){return e.experimentalNISSGrouping?this.traverseAlg(e.experimentalNISSGrouping.alg,t):{moveCount:1,element:new U("twisty-alg-pause",".",t,e,!0,!0)}}traverseNewline(e,t){let r=new q("twisty-alg-newline",e);return r.append(document.createElement("br")),{moveCount:0,element:r}}traverseLineComment(e,t){return{moveCount:0,element:new U("twisty-alg-line-comment",`//${e.text}`,t,e,!1,!1)}}},Hi=Q(Wi),Qi=class{moveCharIndexMap=new Map;currentElem=null;addMove(e,t){this.moveCharIndexMap.set(e,t)}set(e){let t=e?this.moveCharIndexMap.get(e[L])??null:null;this.currentElem!==t&&(this.currentElem?.setCurrentMove(!1),t?.setCurrentMove(!0),this.currentElem=t)}},Ot=class extends b{highlighter=new Qi;#e;#r;#t=null;lastClickTimestamp=null;constructor(e){super({mode:"open"}),this.addCSS(Nt),e?.twistyPlayer&&(this.twistyPlayer=e?.twistyPlayer)}connectedCallback(){}setAlg(e){this.#r?.isIdentical(e)||(this.#e=Hi(e,{earliestMoveIndex:0,twistyAlgViewer:this,direction:I.Forwards}).element,this.#r=e,this.contentWrapper.textContent="",this.contentWrapper.appendChild(this.#e))}get twistyPlayer(){return this.#t}set twistyPlayer(e){this.#n(e)}async#n(e){if(this.#t){console.warn("twisty-player reassignment is not supported");return}if(e===null)throw new Error("clearing twistyPlayer is not supported");this.#t=e,this.#t.experimentalModel.alg.addFreshListener(t=>{this.setAlg(t.alg)}),e.experimentalModel.currentMoveInfo.addFreshListener(t=>{let r=t.currentMoves[0];if(r??=t.movesStarting[0],r??=t.movesFinishing[0],!r)this.highlighter.set(null);else{let i=r.move;this.highlighter.set(i)}}),e.experimentalModel.detailedTimelineInfo.addFreshListener(t=>{t.timestamp!==this.lastClickTimestamp&&(this.lastClickTimestamp=null)})}async jumpToIndex(e,t){let r=this.#t;if(r){r.pause();let i=(async()=>{let n=await r.experimentalModel.indexer.get(),s=t?n.moveDuration(e)*Bi:0;return n.indexToMoveStartTimestamp(e)+n.moveDuration(e)-s})();r.experimentalModel.timestampRequest.set(await i),this.lastClickTimestamp===await i?(r.play(),this.lastClickTimestamp=null):this.lastClickTimestamp=await i}}async attributeChangedCallback(e,t,r){if(e==="for"){let i=document.getElementById(r);if(i||console.info("for= elem does not exist, waiting for one"),await customElements.whenDefined("twisty-player"),i=await Vi(r),!(i instanceof oe)){console.warn("for= elem is not a twisty-player");return}this.twistyPlayer=i}}static get observedAttributes(){return["for"]}};M.define("twisty-alg-viewer",Ot);var ne=new k;ne.replaceSync(`
.wrapper {
  background: rgb(255, 245, 235);
  border: 1px solid rgba(0, 0, 0, 0.25);

  /* Workaround from https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable */
  --text-color: 0, 0, 0;
  --heading-background: 255, 230, 210;

  color: rgb(var(--text-color));
}

.setup-alg, twisty-alg-viewer {
  padding: 0.5em 1em;
}

.heading {
  background: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  font-weight: bold;
  padding: 0.25em 0.5em;
  display: grid;
  grid-template-columns: auto 1fr;

  /* For the move count hover elems. */
  position: sticky;
}

.heading.title {
  background: rgb(255, 245, 235);
  font-size: 150%;
  white-space: pre-wrap;
}

.heading .move-count {
  font-weight: initial;
  text-align: right;
  color: rgba(var(--text-color), 0.4);
}

.wrapper.dark-mode .heading .move-count {
  color: rgba(var(--text-color), 0.7);
}

.heading a {
  text-decoration: none;
  color: inherit;
}

twisty-player {
  width: 100%;
  min-height: 128px;
  height: 288px;
  resize: vertical;
  overflow-y: hidden;
}

twisty-player + .heading {
  padding-top: 0.5em;
}

twisty-alg-viewer {
  display: inline-block;
}

.wrapper {
  container-type: inline-size;
}

.scrollable-region {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}

.scrollable-region {
  max-height: 18em;
  overflow-y: auto;
}

@container (min-width: 512px) {
  .responsive-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  twisty-player {
    height: 320px
  }
  .scrollable-region {
    border-top: none;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    contain: strict;
    max-height: 100cqh;
  }
}

.wrapper:fullscreen,
.wrapper:fullscreen .responsive-wrapper {
  width: 100%;
  height: 100%;
}

.wrapper:fullscreen twisty-player,
.wrapper:fullscreen .scrollable-region {
  height: 50%;
}

@container (min-width: 512px) {
  .wrapper:fullscreen twisty-player,
  .wrapper:fullscreen .scrollable-region {
    height: 100%;
  }
}

/* TODO: dedup with Twizzle Editor */
.move-count > span:hover:before {
  background-color: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  backdrop-filter: blur(4px);
  z-index: 100;
  position: absolute;
  padding: 0.5em;
  top: 1.5em;
  right: 0;
  content: attr(data-before);
  white-space: pre-wrap;
  text-align: left;
}

.move-count > span:hover {
  color: rgba(var(--text-color), 1);
  cursor: help;
}
`);var jt=new k;jt.replaceSync(`
.wrapper {
  background: white;
  --heading-background: 232, 239, 253
}

.wrapper.dark-mode {
  --text-color: 236, 236, 236;
  --heading-background: 29, 29, 29;
}

.scrollable-region {
  overflow-y: auto;
}

.wrapper.dark-mode {
  background: #262626;
  --text-color: 142, 142, 142;
  border-color: #FFFFFF44;
}

.wrapper.dark-mode .heading:not(.title) {
  background: #1d1d1d;
}

.heading.title {
  background: none;
}
`);function Yi(e="",t=location.href){let r={alg:"alg","setup-alg":"experimental-setup-alg","setup-anchor":"experimental-setup-anchor",puzzle:"puzzle",stickering:"experimental-stickering","puzzle-description":"experimental-puzzle-description",title:"experimental-title","video-url":"experimental-video-url",competition:"experimental-competition-id"},i=new URL(t).searchParams,n={};for(let[s,a]of Object.entries(r)){let l=i.get(e+s);if(l!==null){let c=ae[a];n[c]=l}}return n}var te="outer block moves (e.g. R, Rw, or 4r)",re="inner block moves (e.g. M or 2-5r)",dt={[v.OuterBlockTurnMetric]:`HTM = OBTM ("Outer Block Turn Metric"):
\u2022 ${re} count as 2 turns
\u2022 ${te} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,[v.OuterBlockQuantumTurnMetric]:`QTM = OBQTM ("Outer Block Quantum Turn Metric"):
\u2022 ${re} count as 2 turns per quantum (e.g. M2 counts as 4)
\u2022 ${te} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,[v.RangeBlockTurnMetric]:`STM = RBTM ("Range Block Turn Metric"):
\u2022 ${re} count as 1 turn
\u2022 ${te} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,[v.RangeBlockQuantumTurnMetric]:`SQTM = RBQTM ("Range Block Quantum Turn Metric"):
\u2022 ${re} count as 1 turn per quantum (e.g. M2 counts as 2)
\u2022 ${te} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,[v.ExecutionTurnMetric]:`ETM ("Execution Turn Metric"):
\u2022 all moves (including rotations) count as 1 turn`},Gi={[v.OuterBlockTurnMetric]:"OB",[v.OuterBlockQuantumTurnMetric]:"OBQ",[v.RangeBlockTurnMetric]:"RB",[v.RangeBlockQuantumTurnMetric]:"RBQ",[v.ExecutionTurnMetric]:"E"},_i=class extends b{twistyPlayer=null;a=null;options;constructor(e){super({mode:"open"}),this.options=e}#e(){if(this.contentWrapper.textContent="",this.a){let t=this.contentWrapper.appendChild(document.createElement("span"));t.textContent="\u2757\uFE0F",t.title="Could not show a player for link",this.addElement(this.a)}this.removeCSS(ne);let e=this.shadow.adoptedStyleSheets.indexOf(ne);typeof e<"u"&&this.shadow.adoptedStyleSheets.splice(e,e+1),this.#r?.remove()}#r;#t;#n;#s;async connectedCallback(){if(this.#n=this.addElement(document.createElement("div")),this.#n.classList.add("responsive-wrapper"),this.options?.colorScheme==="dark"&&this.contentWrapper.classList.add("dark-mode"),this.addCSS(ne),this.options?.cdnForumTweaks&&this.addCSS(jt),this.a=this.querySelector("a"),!this.a)return;let e=Yi("",this.a.href),t=this.a?.href,{hostname:r,pathname:i}=new URL(t);if(r!=="alpha.twizzle.net"){this.#e();return}if(["/edit/","/explore/"].includes(i)){let n=i==="/explore/";if(e.puzzle&&!(e.puzzle in Y)){let l=(await import("./chunks/puzzle-geometry-KLKZHZSN.js")).getPuzzleDescriptionString(e.puzzle);delete e.puzzle,e.experimentalPuzzleDescription=l}if(this.twistyPlayer=this.#n.appendChild(new oe({background:this.options?.cdnForumTweaks?"checkered-transparent":"checkered",colorScheme:this.options?.colorScheme==="dark"?"dark":"light",...e,viewerLink:n?"experimental-twizzle-explorer":"auto"})),this.twistyPlayer.fullscreenElement=this.contentWrapper,e.experimentalTitle&&(this.twistyPlayer.experimentalTitle=e.experimentalTitle),this.#t=this.#n.appendChild(document.createElement("div")),this.#t.classList.add("scrollable-region"),e.experimentalTitle&&this.#i(e.experimentalTitle).classList.add("title"),e.experimentalSetupAlg){this.#i("Setup",async()=>(await this.twistyPlayer?.experimentalModel.setupAlg.get())?.alg.toString()??null);let l=this.#t.appendChild(document.createElement("div"));l.classList.add("setup-alg"),l.textContent=new y(e.experimentalSetupAlg).toString()}let s=this.#i("Moves",async()=>(await this.twistyPlayer?.experimentalModel.alg.get())?.alg.toString()??null);this.#s=s.appendChild(Zi(this.twistyPlayer.experimentalModel)),this.#s.classList.add("move-count"),this.#t.appendChild(new Ot({twistyPlayer:this.twistyPlayer})).part.add("twisty-alg-viewer")}else this.#e()}#i(e,t){let r=this.#t.appendChild(document.createElement("div"));r.classList.add("heading");let i=r.appendChild(document.createElement("span"));if(i.textContent=e,t){i.textContent+=" ";let n=i.appendChild(document.createElement("a"));n.textContent="\u{1F4CB}",n.href="#",n.title="Copy to clipboard";async function s(a){n.textContent=a,await new Promise(l=>setTimeout(l,2e3)),n.textContent===a&&(n.textContent="\u{1F4CB}")}n.addEventListener("click",async a=>{a.preventDefault(),n.textContent="\u{1F4CB}\u2026";let l=await t();if(l)try{await navigator.clipboard.writeText(l),s("\u{1F4CB}\u2705")}catch(c){throw s("\u{1F4CB}\u274C"),c}else s("\u{1F4CB}\u274C")})}return r}};M.define("twizzle-link",_i);function Zi(e,t=document.createElement("span")){async function r(){let[i,n]=await Promise.all([e.puzzleAlg.get(),e.puzzleLoader.get()]);if(i.issues.errors.length!==0){t.textContent="";return}let s=!0;function a(l){s?s=!1:t.append(")(");let c=t.appendChild(document.createElement("span")),o=je(n,l,i.alg);c.append(`${Gi[l]}: `);let p=c.appendChild(document.createElement("span"));p.textContent=o.toString(),p.classList.add("move-number"),c.setAttribute("data-before",dt[l]??""),c.setAttribute("title",dt[l]??"")}t.textContent="(",n.id==="3x3x3"?(a(v.OuterBlockTurnMetric),a(v.OuterBlockQuantumTurnMetric),a(v.RangeBlockTurnMetric)):n.pg&&(a(v.RangeBlockTurnMetric),a(v.RangeBlockQuantumTurnMetric)),a(v.ExecutionTurnMetric),t.append(")")}return e.puzzleAlg.addFreshListener(r),e.puzzleID.addFreshListener(r),t}he({logPerf:!1,prioritizeEsbuildWorkaroundForWorkerInstantiation:!0});export{ht as ExperimentalSVGAnimator,Y as puzzles,Fe as randomScrambleForEvent};
