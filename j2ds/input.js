// Массивы состояний клавиш
 pKey= 0;

 input= {
 /* Gеременные */
 pos : {x:0, y:0},
 x : 0,
 y : 0,
 abs : {x:0, y:0},
 lClick : false,
 mClick : false,
 rClick : false,
 touch : false,
 keyDown : [],
 canceled : false,
 body : false
}

// Константы клавиш
key= {
 LEFT : 37,
 RIGHT : 39,
 UP : 38,
 DOWN : 40,
 SPACE : 32,
 ESC : 27
 
}

input.getPosition= function()
{
 return vec2df(this.pos.x, this.pos.y);
}


function _input_keyEvent(e) {
 input.keyDown[e.keyCode] = (e.type == 'keydown')&&(!input.canceled);
 pKey= e.keyCode; 
 return false;
}

//! системная
// Вернет true, если мышь назодится над объектом
input.cancel= function(_id) {
	input.canceled= true;
	 _input_falseInput();
	 input.keyDown= [];
}

//! системная
// Вернет true, если мышь назодится над объектом
input.onNode= function(_id) {
	return (
 (this.pos.x > _id.pos.x && this.pos.x < _id.pos.x+_id.size.x)
  &&
 (this.pos.y > _id.pos.y && this.pos.y < _id.pos.y+_id.size.y) );
}

input.upd= function() {
 var dX= scene.canvas.offsetWidth / scene.width;
 var dY= scene.canvas.offsetHeight / scene.height;
 this.x= (this.abs.x/dX);
 this.y= (this.abs.y/dY);
 this.pos.x= scene.view.x + this.x;
 this.pos.y= scene.view.y + this.y;  
}


function _input_cursorPosition(e) {
 if (!input.touch)
 {
  if (document.all)  { 
    x = e.x + document.body.scrollLeft; 
    y = e.y + document.body.scrollTop; 
  } else {
    x = e.pageX; // Координата X курсора
    y = e.pageY; // Координата Y курсора
  }
  input.abs.x= x; input.abs.y= y;
 }
 e.preventDefault();
}


function _input_onClick(e) {
 if (!e.which && e.button) {
   if (e.button & 1) e.which = 1;
   else if (e.button & 4) e.which = 2;
   else if (e.button & 2) e.which = 3;
 }	
 input.lClick= (e.which == 1?true:false)&&(!input.canceled);
 input.mClick= (e.which == 2?true:false)&&(!input.canceled);
 input.rClick= (e.which == 3?true:false)&&(!input.canceled);
 input.body.focus();
 return false; 
}

function _input_onTouch(e) {
 e.preventDefault();
 input.abs.x= e.touches[0].pageX;
 input.abs.y= e.touches[0].pageY;
 input.lClick= true&&(!input.canceled);
 input.touch= true&&(!input.canceled);
 input.body.focus();
 return false;
}

function _input_falseInput() { 
	 input.lClick= 
	  input.mClick= 
	   input.rClick= false;
}


input.init= function() {
 input.body= window;
 input.body.focus();
 scene.canvas.ontouchstart= _input_onTouch;
 scene.canvas.ontouchmove= _input_onTouch;
 scene.canvas.ontouchend= function() { input.canceled= false; _input_falseInput(); }; 
 scene.canvas.oncontextmenu= function() { return false; }
 scene.canvas.onselectstart= scene.canvas.oncontextmenu;
 scene.canvas.ondragstart= scene.canvas.oncontextmenu;
 scene.canvas.onmousedown= _input_onClick;
 scene.canvas.onmouseup= function() { input.canceled= false; _input_falseInput(); }
 scene.canvas.onmousemove= _input_cursorPosition;
 input.body.onkeydown= _input_keyEvent;
 input.body.onkeyup= function(e) { input.canceled= false; _input_keyEvent(e); };
}










