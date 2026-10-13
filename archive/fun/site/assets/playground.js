const systemControl=document.querySelector('#art-system'),spaceButton=document.querySelector('#space-button'),spectrumButton=document.querySelector('#spectrum-button'),reseedButton=document.querySelector('#reseed'),controls=document.querySelector('.art-controls'),status=document.querySelector('#art-status');
let worker,requestId=0;let state={system:'svensson',seed:42,domain:'space'};
function finishRequest(){controls.removeAttribute('aria-busy');reseedButton.disabled=false;}
function generate(){
  controls.setAttribute('aria-busy','true');reseedButton.disabled=true;status.textContent='Generating artwork.';
  if(!worker){
    try{worker=new Worker(new URL('./art-worker.js',import.meta.url),{type:'module'});}catch{finishRequest();status.textContent='Interactive generation is unavailable. The original artwork is shown.';return;}
    worker.onmessage=({data})=>{
      if(data.id!==requestId)return;finishRequest();if(data.error){status.textContent=data.error;return;}
      const canvas=document.querySelector('#art-canvas');canvas.width=data.width;canvas.height=data.height;
      canvas.getContext('2d').putImageData(new ImageData(data.pixels,data.width,data.height),0,0);
      document.querySelector('.artwork').classList.add('generated');document.querySelector('#art-seed').textContent=`seed ${data.seed}`;
      spaceButton.setAttribute('aria-pressed',String(data.domain==='space'));spectrumButton.setAttribute('aria-pressed',String(data.domain==='spectrum'));
      const description=`${systemControl.options[systemControl.selectedIndex].text} attractor, ${data.domain==='space'?'spatial domain':'2D Fourier magnitude spectrum'}, seed ${data.seed}.`;
      status.textContent=description;canvas.setAttribute('aria-label',description);document.querySelector('#art-caption').textContent=description;
    };
    worker.onerror=()=>{finishRequest();status.textContent='Interactive generation is unavailable. The current artwork is preserved.';worker.terminate();worker=undefined;};
  }
  worker.postMessage({...state,id:++requestId});
}
systemControl.addEventListener('change',()=>{state.system=systemControl.value;generate();});
spaceButton.addEventListener('click',()=>{if(state.domain!=='space'){state.domain='space';generate();}});
spectrumButton.addEventListener('click',()=>{if(state.domain!=='spectrum'){state.domain='spectrum';generate();}});
reseedButton.addEventListener('click',()=>{const value=new Uint32Array(1);crypto.getRandomValues(value);const next=value[0]%10000;state.seed=next===state.seed?(next+1)%10000:next;generate();});
