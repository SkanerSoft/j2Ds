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
 body : false,
 scene : false,
 
 
 /* Функции */
 cancel : _Key_cancel,
 upd : _Key_upd,
 onNode : _onNode,
 getPosition  :  _Key_getPosition
};


// Константы клавиш
key= {
 LEFT : 37,
 RIGHT : 39,
 UP : 38,
 DOWN : 40,
 SPACE : 32,
 ESC : 27
 
};

function _Key_getPosition()
{
 return vec2df(this.pos.x, this.pos.y);
}


function _keyEvent(e) {
 input.keyDown[e.keyCode] = (e.type == 'keydown')&&(!input.canceled);
 pKey= e.keyCode; 
 return false;
}

//! системная
// Вернет true, если мышь назодится над объектом
function _Key_cancel(_id) {
	input.canceled= true;
	 _Key_falseInput();
	 input.keyDown= [];
}

//! системная
// Вернет true, если мышь назодится над объектом
function _onNode(_id) {
	return (
 (this.pos.x > _id.pos.x && this.pos.x < _id.pos.x+_id.size.x)
  &&
 (this.pos.y > _id.pos.y && this.pos.y < _id.pos.y+_id.size.y) );
}

function _Key_upd() {
 var dX= this.scene.canvas.offsetWidth / this.scene.width;
 var dY= this.scene.canvas.offsetHeight / this.scene.height;
 this.x= -this.scene.canvas.offsetLeft+(this.abs.x/dX);
 this.y= -this.scene.canvas.offsetTop+(this.abs.y/dY);
 this.pos.x= this.scene.view.x + this.x;
 this.pos.y= this.scene.view.y + this.y; 
}


function _mousePosition(e) {
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


function _onClick(e) {
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

function _onTouch(e) {
 e.preventDefault();
 input.abs.x= e.touches[0].pageX;
 input.abs.y= e.touches[0].pageY;
 input.lClick= true&&(!input.canceled);
 input.touch= true&&(!input.canceled);
 input.body.focus();
 return false;
}

function _Key_falseInput() { 
	 input.lClick= 
	  input.mClick= 
	   input.rClick= false;
}

function initInput(_scene) {
 input.scene= _scene;
 input.body= window;
 input.body.focus();
 input.scene.canvas.ontouchstart= _onTouch;
 input.scene.canvas.ontouchmove= _onTouch;
 input.scene.canvas.ontouchend= function() { input.canceled= false; _Key_falseInput(); }; 
 input.scene.canvas.oncontextmenu= function() { return false; }
 input.scene.canvas.onselectstart= input.scene.canvas.oncontextmenu;
 input.scene.canvas.ondragstart= input.scene.canvas.oncontextmenu;
 input.scene.canvas.onmousedown= _onClick;
 input.scene.canvas.onmouseup= function() { input.canceled= false; _Key_falseInput(); }
 input.scene.canvas.onmousemove= _mousePosition;
 input.body.onkeydown= _keyEvent;
 input.body.onkeyup= function(e) { input.canceled= false; _keyEvent(e); };
}













