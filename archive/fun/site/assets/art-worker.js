import { generateDensity,renderArtwork } from './art-core.js';
let cachedKey,cachedDensity;
const cachedViews=new Map();
self.onmessage=({data})=>{
  const {id,system,seed,domain}=data;
  try {
    const key=`${system}:${seed}`;
    if(key!==cachedKey) {cachedDensity=generateDensity(system,seed);cachedKey=key;cachedViews.clear();}
    if(!cachedViews.has(domain)) cachedViews.set(domain,renderArtwork(cachedDensity,domain));
    const image=cachedViews.get(domain),pixels=image.pixels.slice();
    self.postMessage({id,system,seed,domain,width:image.width,height:image.height,pixels},[pixels.buffer]);
  } catch {self.postMessage({id,error:'The browser preview could not be generated.'});}
};
