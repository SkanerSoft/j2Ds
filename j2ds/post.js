function createPost(_scene){
 var o= {};
 /*Свойства*/
 o.scene= _scene;
 o.blurFrames= [];
 
 /*Функции*/
 o.sepia= _PE_sepia;
 o.invert= _PE_invert;
 o.setRotation= _PE_setRotation;
 o.flip= _PE_flip;
 o.lightness= _PE_lightness;
 o.motionBlur= _PE_motionBlur;
 o.blurBETA= _PE_blurBETA;
 o.alphaBlur= _PE_alphaBlur; 
 return o;
}


function _PE_alphaBlur(_vol) {
 _vol= Math.ceil(_vol);
 this.blurFrames.push(this.scene.context.createPattern(this.scene.canvas, 'no-repeat'));
 
 if (this.blurFrames.length >= _vol) this.blurFrames.shift(); 
 
 this.scene.context.fillStyle = this.blurFrames[_vol]; 
 this.scene.context.globalAlpha = 1; 
 
 var blurStep= 1/_vol; 
 
 for (var i= 0; i < _vol; i+=1)
 {
  if (this.blurFrames[i])
  {
   var rX= Random(2,10);
   var rY= Random(2,10);   
   this.scene.context.globalAlpha -= blurStep;
   this.scene.context.fillStyle = this.blurFrames[i];
   this.scene.context.fillRect(-rX, -rY, this.scene.width+rX*2, this.scene.height+rY*2);
  }
 } 
 delete img;
}


function _PE_motionBlur(_vol) {
 _vol= Math.ceil(_vol);
 this.blurFrames.push(this.scene.context.createPattern(this.scene.canvas, 'no-repeat'));
 
 if (this.blurFrames.length >= _vol) this.blurFrames.shift(); 
 
 this.scene.context.fillStyle = this.blurFrames[_vol];  
 
 var blurStep= 1/_vol; 
 
 for (var i= _vol-1; i >= 0; i-=1)
 {
  if (this.blurFrames[i])
  {
   this.scene.context.globalAlpha -= blurStep;
   this.scene.context.fillStyle = this.blurFrames[i];
   this.scene.context.fillRect(0, 0, this.scene.width, this.scene.height);
  }
 } 
 this.scene.context.globalAlpha = 1; 

 delete img;
}



function _PE_lightness(_vol) {
 _vol= _vol || 10;
 var img= this.scene.context.getImageData(0, 0, 
                                          this.scene.width, 
                                          this.scene.height);	
 var pixels= img.data; 
 for (var i = 0, n = pixels.length; i < n; i += 4) {
  pixels[i] += _vol; 
  pixels[i+1] += _vol; 
  pixels[i+2] += _vol;  
 }
	this.scene.context.putImageData(img, 0, 0);
	delete img;
}



function _PE_blurBETA(_vol) {
 var img= this.scene.context.getImageData(0, 0, 
                                          this.scene.width, 
                                          this.scene.height);	
 var pixels= img.data; 
 for (br = 0; br < _vol; br += 1) {
  for (var i = 0, n = pixels.length; i < n; i += 4) {
   var iMW = 4 * this.scene.width;
   var iSumOpacity = iSumRed = iSumGreen = iSumBlue = 0;
   var iCnt = 0;
            var aCloseData = [
                i - iMW - 4, i - iMW, i - iMW + 4, 
                i - 4, i + 4, 
                i + iMW - 4, i + iMW, i + iMW + 4
                             ]
                             
            for (e = 0; e < aCloseData.length; e += 1) {
                if (aCloseData[e] >= 0 && aCloseData[e] <= pixels.length - 3) {
                    iSumOpacity += pixels[aCloseData[e]];
                    iSumRed += pixels[aCloseData[e] + 1];
                    iSumGreen += pixels[aCloseData[e] + 2];
                    iSumBlue += pixels[aCloseData[e] + 3];
                    iCnt += 1;
                }
            }
            pixels[i] = (iSumOpacity / iCnt);
            pixels[i+1] = (iSumRed / iCnt);
            pixels[i+2] = (iSumGreen / iCnt);
            pixels[i+3] = (iSumBlue / iCnt);
        }
    }


	this.scene.context.putImageData(img, 0, 0);
	delete img;
}





function _PE_flip(_angle) {
 var img= this.scene.context.createPattern(this.scene.canvas, 'no-repeat');
 
 this.scene.clearDraw(); 

 this.scene.context.fillStyle = img;
 this.scene.context.fillRect(this.scene.width, 0, -this.scene.width, this.scene.height); 

 delete img;
}




function _PE_setRotation(_angle) {
 var img= this.scene.context.createPattern(this.scene.canvas, 'no-repeat');
 
 this.scene.clearDraw(); 
  
 this.scene.context.save();
	this.scene.context.translate(this.scene.width/2, this.scene.height/2);
 this.scene.context.rotate(Rad(_angle));
 this.scene.context.translate(-this.scene.width/2, -this.scene.height/2);
 
 this.scene.context.fillStyle = img;
 this.scene.context.fillRect(0, 0, this.scene.width, this.scene.height); 
 
 this.scene.context.restore(); 
 delete img;
}


function _PE_invert() {
 var img= this.scene.context.getImageData(0, 0, 
                                          this.scene.width, 
                                          this.scene.height);	
 var pixels= img.data; 
 for (var i = 0, n = pixels.length; i < n; i += 4) {
   pixels[i] = 255 - pixels[i]; 
   pixels[i+1] = 255 - pixels[i+1];
   pixels[i+2] = 255 - pixels[i+2];
 }
	this.scene.context.putImageData(img, 0, 0);
	delete img;
}


function _PE_sepia(_vol) {
 _vol= _vol || 0;
 var img= this.scene.context.getImageData(0, 0, 
                                          this.scene.width, 
                                          this.scene.height);	
 var pixels= img.data; 
 for (var i = 0; i < pixels.length; i += 4) {
  var r = pixels[i];
  var g = pixels[i + 1];
  var b = pixels[i + 2];
  pixels[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189)+_vol; // red
  pixels[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168)+_vol; // green
  pixels[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131)+_vol; // blue
 }
	this.scene.context.putImageData(img, 0, 0);
	delete img;
}











