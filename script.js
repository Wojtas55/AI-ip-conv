const ins = document.querySelector("#in")
const out = document.querySelector("#out")
const msg = document.querySelector("#msgs")
const cls = {
    a: {from:"00000000", to:"01111110"},
    b: {from:"10000000", to:"10111111"},
    c: {from:"11000000", to:"11011111"},
    d: {from:"11100000", to:"11101111"},
    e: {from:"11110000", to:"11111111"}
}
let strPad = (len,text,sign="0")=>{
    return sign.repeat(8-len)+""+text;
}
let checkClass = (toCheck)=>{
    var oct = (toCheck.length===8) ? toCheck : toBin(toCheck);
    for(let [key,val] of Object.entries(cls)){
        if( val.from <= oct && val.to >= oct){
            setMsg('info',"Klasa: "+key);
            break;
        }
    }
}
let detect = (e)=>{
    let val = e.target.value;
    let oct = val.split(".");
    if(oct[0].length+oct[1].length+oct[2].length+oct[3].length !==32){
        dec2bin(val);
    }else{
        bin2dec(val)
    }
}
let setMsg = (type,text)=>{
    if(type=="clear")
    msg.innerHTML="";
    if(type=="info")
    msg.innerHTML = '<p>'+text+'</p>';
    if(type=="error")
    msg.innerHTML = '<p style="color: red;">'+text+'</p>'
}
let dec2bin = (ip)=>{
    let binOct ="";
    let oct = ip.split(".");
    let oLen = oct.length;
    if(oLen<4)
    setMsg('error','Podano tylko'+oLen+'oktety!');
    else
    setMsg('clear');
    for(i=0; i<oLen; i++){
        var digit = parseInt(oct[i]);
        binOct+= (binOct==""?"":".");
        var bin = (digit >>> 0).toString(2);
        var bLen = bin.length;
        binOct+= (bLen<8) ? strPad(bLen,bin):bin;
    }
}
let bin2dec = (bin) =>{
    let dec = "";
    let oct = bin.split(".");
    for(i=0; i<oct.length; i++){
        dec+= (dec===""?"":".");
        dec+= parseInt(oct[i],2);
    }
    out.textContent = dec;
}
ins.addEventListener('focusout',detect,false);

function konwersja() {
  var elem = document.querySelectorAll("[id='in']");
  out.textContent = (+elem[0].value).toString(2)+'.'+(+elem[1].value).toString(2)+'.'+(+elem[2].value).toString(2)+'.'+(+elem[3].value).toString(2);
}
document.querySelector("#con").addEventListener("click", konwersja)
