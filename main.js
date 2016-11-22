var THRESHOLD =128;
var REDLEVEL=128;
var GREENLEVEL=100;
var BLUELEVEL=128;

var redcount=0;
var greencount=0;
var bluecount=0;

var rmax=0,gmax=0,bmax=0;
var rmatch,gmatch,bmatch;
var ctx;

var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');

var canvas3_text=document.getElementById('canvas3-text');

var rlev = document.getElementById('rlev');
var rval = document.getElementById('rval');
rlev.addEventListener("input", function() {
	selectRed();
}, false);
var glev = document.getElementById('glev');
var gval = document.getElementById('gval');
glev.addEventListener("input", function() {
	selectGreen();
}, false);
var blev = document.getElementById('blev');
var bval = document.getElementById('bval');
blev.addEventListener("input", function() {
	selectBlue();
}, false);

window.onload = function() {
	if (!canvas1 ||!canvas1.getContext) {
		console.log('error');
		return false;
	}
	if (!canvas2 ||!canvas2.getContext) {
		console.log('error');
		return false;
	}
	if (!canvas3 ||!canvas3.getContext) {
		console.log('error');
		return false;
	}

	ctx = canvas1.getContext('2d');

	/* 画像を描画 */
	canvas1.width=canvas2.width=canvas3.width=img.width;
	canvas1.height=canvas2.height=canvas3.height=img.height;
	ctx.drawImage(img, 0, 0,img.width,img.height);


	var src1 = ctx.getImageData(0, 0,img.width,img.height);
	var dst1 = ctx.createImageData(img.width,img.height);
	
	for (var i = 0; i < src1.data.length; i=i+4) {
		var y = ~~(0.299 * src1.data[i] + 0.587 * src1.data[i + 1] + 0.114 * src1.data[i + 2]);
		var ret = (y > THRESHOLD) ? 255 : 0;
		dst1.data[i] = dst1.data[i+1] = dst1.data[i+2] = ret;
		dst1.data[i+3] = src1.data[i+3];
	}
	ctx=canvas2.getContext('2d');
	ctx.putImageData(dst1, 0, 0);
};

function selectRed(){
	REDLEVEL=rlev.value;
	rval.innerHTML=REDLEVEL;
	redcount=0;
	ctx = canvas1.getContext('2d');
	var src2 = ctx.getImageData(0, 0,img.width,img.height);
	var dst2 = ctx.createImageData(img.width,img.height);
	for (var i = 0; i < src2.data.length; i=i+4) {
		var r=src2.data[i];
		var g=src2.data[i+1];
		var b=src2.data[i+2];
		if(r>=REDLEVEL && (g<=REDLEVEL && b<=REDLEVEL)){
			dst2.data[i] =r;
			dst2.data[i+1] = g;
			dst2.data[i+2] = b;
			redcount++;
		}
		else {
			dst2.data[i] =255;
			dst2.data[i+1] = 255;
			dst2.data[i+2] = 255;
		}
		dst2.data[i+3] = src2.data[i+3];
	}

	ctx=canvas3.getContext('2d');
	ctx.putImageData(dst2, 0, 0);
	canvas3_text.innerHTML='赤検出画像';
	if(redcount>=rmax){
		rmax=redcount;
		rmatch=REDLEVEL;
	}
}

function selectGreen(){
	GREENLEVEL=glev.value;
	gval.innerHTML=GREENLEVEL;
	greencount=0;
	ctx = canvas1.getContext('2d');
	var src3 = ctx.getImageData(0, 0,img.width,img.height);
	var dst3 = ctx.createImageData(img.width,img.height);
	for (var i = 0; i < src3.data.length; i=i+4) {
		var r=src3.data[i];
		var g=src3.data[i+1];
		var b=src3.data[i+2];
		if(g>=GREENLEVEL &&(r<=GREENLEVEL && b<=GREENLEVEL)){
			dst3.data[i] =r;
			dst3.data[i+1] = g;
			dst3.data[i+2] = b;
			greencount++;
		}
		else {
			dst3.data[i] =255;
			dst3.data[i+1] = 255;
			dst3.data[i+2] = 255;
		}
		dst3.data[i+3] = src3.data[i+3];
	}

	ctx=canvas3.getContext('2d');
	ctx.putImageData(dst3, 0, 0);
	canvas3_text.innerHTML='緑検出画像';
	if(greencount>=gmax){
		gmax=greencount;
		gmatch=GREENLEVEL;
	}
}

function selectBlue(){
	BLUELEVEL=blev.value;
	bval.innerHTML=BLUELEVEL;
	bluecount=0;
	ctx = canvas1.getContext('2d');
	var src4 = ctx.getImageData(0, 0,img.width,img.height);
	var dst4 = ctx.createImageData(img.width,img.height);
	for (var i = 0; i < src4.data.length; i=i+4) {
		var r=src4.data[i];
		var g=src4.data[i+1];
		var b=src4.data[i+2];
		if(b>=BLUELEVEL && (r<=BLUELEVEL && g<=BLUELEVEL)){
			dst4.data[i] =r;
			dst4.data[i+1] = g;
			dst4.data[i+2] = b;
			bluecount++;
		}
		else {
			dst4.data[i] =255;
			dst4.data[i+1] = 255;
			dst4.data[i+2] = 255;
		}
		dst4.data[i+3] = src4.data[i+3];
	}

	ctx=canvas3.getContext('2d');
	ctx.putImageData(dst4, 0, 0);
	canvas3_text.innerHTML='青検出画像';
	if(bluecount>=bmax){
		bmax=bluecount;
		bmatch=BLUELEVEL;
	}
}

function rresult(){
	REDLEVEL=rmatch;
	selectRed();
}
function gresult(){
	GREENLEVEL=gmatch;
	selectGreen();
}
function bresult(){
	BLUELEVEL=bmatch;
	selectBlue();
}