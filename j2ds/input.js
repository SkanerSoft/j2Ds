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

function _Key_upd(_idScene) {
 var dX= _idScene.canvas.offsetWidth / _idScene.width;
 var dY= _idScene.canvas.offsetHeight / _idScene.height;
 this.x= (this.abs.x/dX);
 this.y= (this.abs.y/dY);
 this.pos.x= _idScene.view.x + this.x;
 this.pos.y= _idScene.view.y + this.y; 
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
 return false; 
}

function _onTouch(e) {
 e.preventDefault();
 input.abs.x= e.touches[0].pageX;
 input.abs.y= e.touches[0].pageY;
 input.lClick= true&&(!input.canceled);
 input.touch= true&&(!input.canceled);
}

function _Key_falseInput() { 
	 input.lClick= 
	  input.mClick= 
	   input.rClick= false;
}

function initInput(_id) {
 obj(_id).ontouchstart= _onTouch;
 obj(_id).ontouchmove= _onTouch;
 obj(_id).ontouchend= function() { input.canceled= false; _Key_falseInput(); }; 
 obj(_id).oncontextmenu= function() { return false; }
 obj(_id).onselectstart= obj(_id).oncontextmenu;
 obj(_id).ondragstart= obj(_id).oncontextmenu;
 obj(_id).onmousedown= _onClick;
 obj(_id).onmouseup= function() { input.canceled= false; _Key_falseInput(); }
 obj(_id).onmousemove= _mousePosition;
 obj(_id).onkeydown= _keyEvent;
 obj(_id).onkeyup= function(e) { input.canceled= false; _keyEvent(e); };
}













