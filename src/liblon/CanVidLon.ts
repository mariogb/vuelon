
export const applyCroma0 = (ctx: CanvasRenderingContext2D,options:{r:number,g:number,b:number,dChroma:number}):void =>{
    const frame:ImageData = ctx.getImageData(0, 0, 320, 240);
    const d0:Uint8ClampedArray = frame.data;
    const lpx:number = d0.length;
    const r = options.r
    const g = options.g
    const b = options.b
    const dChroma = options.dChroma
    for (let i:number = 0; i < lpx; i += 4) {

        const tt:number = Math.sqrt((d0[i] - r)**2 + (d0[i+1] - g)**2  + (d0[i+2] - b)**2)
        if (tt < dChroma) {
               frame.data[i] = 200;
               frame.data[i + 1] = 2;
               frame.data[i + 2] = 2;
               frame.data[i + 3] = 0;
         }
    }
}

export const  toRGBInts = (v:string):{r:number,g:number,b:number}|undefined =>{
    if(!v || v.length<8){
        return 
    }
    const colorA = v.substring(1);
    return {
        r:parseInt(colorA.substring(0, 2), 16),
        g:parseInt(colorA.substring(2, 4), 16),
        b:parseInt(colorA.substring(4, 6), 16)
    }
}






