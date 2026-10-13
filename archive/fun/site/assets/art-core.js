// Browser adaptation of mellowyellow71/fftwall (MIT).
import { fft } from './fft.js';
import { palettes } from './palettes.js';
const models = {
  svensson: { palette:'inferno', noise:.02, presets:[[1.4,1.56,1.4,-6.56],[-2.538,1.362,1.315,.513],[1.913,2.796,1.468,1.01],[-2.337,-2.337,.533,1.378],[1.245,-1.251,1.816,1.098]], seed42:[1.37920031787519,1.5750090239161292,1.4188112943278242,-6.599020703773077] },
  dejong: { palette:'dust', noise:.02, presets:[[1.4,-2.3,2.4,-2.1],[2.01,-2.53,1.61,-.33],[-2.7,-.09,-.86,-2.2],[-2.24,.43,-.65,-2.43],[1.641,1.902,.316,1.525],[-2,-2,-1.2,2],[.970,-1.899,1.381,-1.506],[-.827,-1.637,1.659,-.943]], seed42:[1.37920031787519,-2.2849909760838707,2.418811294327824,-2.1390207037730766] },
  clifford: { palette:'gold', noise:.03, presets:[[-1.4,1.6,1,.7],[1.7,1.7,.6,1.2],[-1.7,1.3,-.1,-1.2],[-1.8,-2,-.5,-.9],[1.5,-1.8,1.6,.9],[-1.7,1.8,-1.9,-.4]], seed42:[-1.4311995231872148,1.6225135358741938,1.0282169414917364,.6414689443403848] },
};
export function randomGenerator(seed) {
  let state=seed>>>0;
  return ()=>{
    state=state+0x6D2B79F5|0;
    let mixed=Math.imul(state^state>>>15,1|state);
    mixed=mixed+Math.imul(mixed^mixed>>>7,61|mixed)^mixed;
    return ((mixed^mixed>>>14)>>>0)/4294967296;
  };
}
function percentile(sorted,quantile) {
  const position=(sorted.length-1)*quantile, lower=Math.floor(position), weight=position-lower;
  return sorted[lower]*(1-weight)+sorted[Math.min(lower+1,sorted.length-1)]*weight;
}
function normalize(values,low,high,gamma=1) {
  const sorted=Float64Array.from(values).sort();
  const floor=percentile(sorted,low), span=percentile(sorted,high)-floor+1e-12;
  return Float64Array.from(values,value=>Math.max(0,Math.min(1,(value-floor)/span))**gamma);
}
export function generateDensity(system,seed,size=512) {
  const model=models[system];
  if(!model) throw new RangeError('Unknown attractor map.');
  const random=randomGenerator(seed);
  const gaussian=()=>Math.sqrt(-2*Math.log(Math.max(random(),1e-12)))*Math.cos(2*Math.PI*random());
  const preset=model.presets[Math.floor(random()*model.presets.length)];
  const [a,b,c,d]=seed===42?model.seed42:preset.map(value=>value+model.noise*gaussian());
  const particles=384,steps=1900,burn=60;
  const x=Float64Array.from({length:particles},()=>random()*2-1);
  const y=Float64Array.from({length:particles},()=>random()*2-1);
  const xs=new Float32Array((steps-burn)*particles),ys=new Float32Array(xs.length);
  let cursor=0;
  for(let step=0;step<steps;step++) for(let particle=0;particle<particles;particle++) {
    const oldX=x[particle],oldY=y[particle];
    if(system==='svensson') {
      x[particle]=d*Math.sin(a*oldX)-Math.sin(b*oldY);
      y[particle]=c*Math.cos(a*oldX)+Math.cos(b*oldY);
    } else if(system==='dejong') {
      x[particle]=Math.sin(a*oldY)-Math.cos(b*oldX);
      y[particle]=Math.sin(c*oldX)-Math.cos(d*oldY);
    } else {
      x[particle]=Math.sin(a*oldY)+c*Math.cos(a*oldX);
      y[particle]=Math.sin(b*oldX)+d*Math.cos(b*oldY);
    }
    if(step>=burn) {xs[cursor]=x[particle];ys[cursor++]=y[particle];}
  }
  const sampleX=[],sampleY=[];
  for(let i=0;i<xs.length;i+=19) {sampleX.push(xs[i]);sampleY.push(ys[i]);}
  sampleX.sort((a,b)=>a-b);sampleY.sort((a,b)=>a-b);
  let x0=percentile(sampleX,.002),x1=percentile(sampleX,.998),y0=percentile(sampleY,.002),y1=percentile(sampleY,.998);
  const marginX=(x1-x0)*.04,marginY=(y1-y0)*.04;
  x0-=marginX;x1+=marginX;y0-=marginY;y1+=marginY;
  const field=new Float64Array(size*size);
  for(let i=0;i<xs.length;i++) {
    const ix=Math.floor((xs[i]-x0)/(x1-x0)*(size-1)),iy=Math.floor((ys[i]-y0)/(y1-y0)*(size-1));
    if(ix>=0&&ix<size&&iy>=0&&iy<size) field[iy*size+ix]++;
  }
  for(let i=0;i<field.length;i++) field[i]=Math.log1p(field[i]);
  return {field,size,palette:model.palette};
}
/** Complex 2D transform through row transforms then column transforms. */
export function fft2Magnitude(field,size) {
  if(field.length!==size*size) throw new RangeError('The field must be square.');
  const real=new Float64Array(field.length),imaginary=new Float64Array(field.length);
  for(let row=0;row<size;row++) {
    const transformed=fft(field.subarray(row*size,(row+1)*size));
    real.set(transformed.real,row*size);imaginary.set(transformed.imaginary,row*size);
  }
  const columnReal=new Float64Array(size),columnImaginary=new Float64Array(size);
  for(let column=0;column<size;column++) {
    for(let row=0;row<size;row++) {columnReal[row]=real[row*size+column];columnImaginary[row]=imaginary[row*size+column];}
    const transformedReal=fft(columnReal),transformedImaginary=fft(columnImaginary);
    for(let row=0;row<size;row++) {
      real[row*size+column]=transformedReal.real[row]-transformedImaginary.imaginary[row];
      imaginary[row*size+column]=transformedReal.imaginary[row]+transformedImaginary.real[row];
    }
  }
  return Float64Array.from(real,(value,index)=>Math.hypot(value,imaginary[index]));
}
export function renderArtwork(density,domain) {
  const {field,size,palette}=density;
  let values,width;
  if(domain==='spectrum') {
    const transformed=fft2Magnitude(field,size);
    width=size/2;
    const cropped=new Float64Array(width*width);
    for(let y=0;y<width;y++) for(let x=0;x<width;x++) {
      const sourceY=(y+size/4+size/2)%size,sourceX=(x+size/4+size/2)%size;
      cropped[y*width+x]=Math.log1p(transformed[sourceY*size+sourceX]);
    }
    values=normalize(cropped,.45,.9995,1.25);
  } else {width=size;values=normalize(field,.005,.997);}
  const lookup=palettes[palette],pixels=new Uint8ClampedArray(values.length*4);
  for(let i=0;i<values.length;i++) {
    const [r,g,b]=lookup[Math.floor(values[i]*255)];
    pixels[i*4]=r;pixels[i*4+1]=g;pixels[i*4+2]=b;pixels[i*4+3]=255;
  }
  return {width,height:width,pixels};
}
