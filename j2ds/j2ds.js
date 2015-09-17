'use strict';

/*----------- DOM ---------------*/
var $id= function (_id) {return document.getElementById(_id); };

var $name= function (_id) {return document.getElementsByName(_id); };

var $tag= function (_id) {return document.getElementsByTagName(_id); };




















/*------------------- Математика --------------*/
var vec2df= function (_x, _y) {
 return ({x: _x, y: _y});
};

var vec2di= function (_x, _y) {
 return {x: (_x >> 0), y: (_y >> 0) };
};

var toInt= function (_number) {
	return (_number >> 0);
}

var Random= function (min, max) {
 return Math.ceil(Math.random() * (max - min) + min);
};

var Rad= function (_num) {
 return _num * (Math.PI / 180);
};


















/*------------------ 2D движок --------------------*/
var j2ds= {
 now : 0,
 dt : 0,
 framelimit : 60,
 sceneStartTime : 0,
 sceneSkipTime : 0,
 FDT : 0,
 engine : false,
 ready : false,
 scripts : {},
 root : 'j2ds/',
 countDrawNodes : 0,
 window : window
};

/* функции */

j2ds.setWindow= function (_window) {
	j2ds.window= _window ? _window : window;
};

j2ds.device= function() {
	var o= {};
	o.width= (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(document.documentElement.clientWidth):parseInt(screen.width);
	o.height= (parseInt(document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(document.documentElement.clientHeight) : parseInt(screen.height);
	return (o);
};

j2ds.loaded= function(_id) {
 j2ds.scripts[_id]= true;
};

j2ds.include= function(_path) {
 var _id= _path.replace(/\//g, '');
 if (j2ds.scripts[_id]) { return 0; }

 var reader= new XMLHttpRequest();
 reader.open('GET', j2ds.root+_path+'.js', false);
 reader.send(null);
 var sourceCode= reader.responseText;

 j2ds.loaded(_id);

 eval(sourceCode);
};

// старт игры
j2ds.start= function(_engine, _framelimit) {
 j2ds.engine= _engine || function() { document.body.innerHTML= 'Пожалуйста, инициализируйте игровую функцию!'; };
 j2ds.framelimit= _framelimit || 60;
 j2ds.sceneSkipTime= 1000.0 / j2ds.framelimit;
 j2ds.lastTime= Date.now();
 j2ds.dt= 0;
 j2ds.gameEngine();
};

// установка активного игрового состояния
j2ds.setActivEngine= function(_engine) {
	j2ds.engine= _engine;
};

j2ds.gameEngine= function(){
 j2ds.now= Date.now();
 if (j2ds.now - j2ds.sceneStartTime > j2ds.sceneSkipTime)
 {
  j2ds.countDrawNodes= 0;
  j2ds.input.upd();
  j2ds.dt= (j2ds.now - j2ds.lastTime) / 100.0;
  j2ds.sceneStartTime= Date.now();
  j2ds.engine();
  j2ds.input.keyPress= [];
  j2ds.input.keyUp= [];
  j2ds.lastTime= j2ds.now;
 }
 nextJ2dsGameStep(j2ds.gameEngine);
};

var nextJ2dsGameStep= (function(){
 return window.requestAnimationFrame ||
 window.webkitRequestAnimationFrame  ||
 window.mozRequestAnimationFrame     ||
 window.oRequestAnimationFrame       ||
 window.msRequestAnimationFrame      ||
 function(callback){
  window.setTimeout(callback, 1000 / j2ds.framelimit);
 };
})();













/*----------------- INPUT -------------------*/
j2ds.input= {
 /* Переменные */
 pos : {x:0, y:0},
 x : 0,
 y : 0,
 abs : {x : 0, y : 0},
 lClick : false,
 mClick : false,
 rClick : false,
 touch : false,
 keyDown : [],
 keyPress : [],
 keyPressed : [],
 keyUp : [],
 keyUped : false,
 canceled : false,
 body : false,
 anyKey : false
};

// Константы клавиш

j2ds.input.jKey= {
 'LEFT'        : 37,
 'RIGHT'       : 39,
 'UP'          : 38,
 'DOWN'        : 40,
 'SPACE'       : 32,
 'CTRL'        : 17,

 'ESC'         : 27
};

j2ds.input.isKeyDown= function(_code) {
 return (this.keyDown[this.jKey[_code]]);
};

j2ds.input.isKeyPress= function(_code) {
 return (this.keyPress[this.jKey[_code]]);
};

j2ds.input.isKeyUp= function(_code) {
return (this.keyUp[this.jKey[_code]]);
};


j2ds.input.getPosition= function() {
return (vec2df(this.pos.x, this.pos.y));
};


j2ds.input.keyEvent= function(e) {
 if ((e.type== 'keydown') && !j2ds.input.keyPressed[e.keyCode]) {
  j2ds.input.keyPress[e.keyCode]= true;
  j2ds.input.keyPressed[e.keyCode]= true;
 } else if ((e.type== 'keyup') && j2ds.input.keyPressed[e.keyCode]) {
  j2ds.input.keyPress[e.keyCode]= false;
  j2ds.input.keyPressed[e.keyCode]= false;
  j2ds.input.keyUp[e.keyCode]= true;
  j2ds.input.keyUped= true;
 }

 j2ds.input.keyDown[e.keyCode]= (e.type== 'keydown')&&(!j2ds.input.canceled);

 j2ds.input.anyKey= e.keyCode;
 return (false);
};

//! системная
// Вернет true, если мышь назодится над объектом
j2ds.input.cancel= function(_id) {
 if (!_id) {
  j2ds.input.canceled= true;
  j2ds.input.falseInput();
  j2ds.input.keyDown= [];
 }
 else {
  j2ds.input.keyDown[j2ds.input.jKey[_id]]= false;	
 }
};

//! системная
// Вернет true, если мышь назодится над объектом
j2ds.input.onNode= function(_id) {
 return ( (this.pos.x > _id.pos.x && this.pos.x < _id.pos.x+_id.size.x) &&
          (this.pos.y > _id.pos.y && this.pos.y < _id.pos.y+_id.size.y) );
};

j2ds.input.upd= function() {
 var dX= j2ds.scene.canvas.offsetWidth / j2ds.scene.width;
 var dY= j2ds.scene.canvas.offsetHeight / j2ds.scene.height;
 this.x= (this.abs.x/dX);
 this.y= (this.abs.y/dY);
 this.pos.x= j2ds.scene.view.x + this.x;
 this.pos.y= j2ds.scene.view.y + this.y;
};


j2ds.input.cursorPosition= function(e) {
 if (!j2ds.input.touch) {
  if (document.all) {
   var x= e.x + document.body.scrollLeft, 
   y= e.y + document.body.scrollTop;
  } else {
   var x= e.pageX, // Координата X курсора
   y= e.pageY;// Координата Y курсора
  }
  j2ds.input.abs.x= x;j2ds.input.abs.y= y;
 }
};


j2ds.input.onClick= function(e) {
 if (!e.which && e.button) {
  if (e.button & 1) e.which= 1;
  else if (e.button & 4) e.which= 2;
       else if (e.button & 2) e.which= 3;
 } 
 j2ds.input.lClick= (e.which== 1?true:false)&&(!j2ds.input.canceled);
 j2ds.input.mClick= (e.which== 2?true:false)&&(!j2ds.input.canceled);
 j2ds.input.rClick= (e.which== 3?true:false)&&(!j2ds.input.canceled);
 j2ds.window.focus();
 return false;
};

j2ds.input.onTouch= function(e) {
 e.preventDefault();
 j2ds.input.abs.x= e.touches[0].pageX;
 j2ds.input.abs.y= e.touches[0].pageY;
 j2ds.input.lClick= true&&(!j2ds.input.canceled);
 j2ds.input.touch= true&&(!j2ds.input.canceled);
 j2ds.window.focus();
 return false;
};

j2ds.input.falseInput= function() {
 j2ds.input.lClick= false;
 j2ds.input.mClick= false;
 j2ds.input.rClick= false;
};


j2ds.input.init= function() {
 j2ds.window.focus();
 j2ds.window.ontouchstart= j2ds.input.onTouch;
 j2ds.window.ontouchmove= j2ds.input.onTouch;
 j2ds.window.ontouchend= function() { j2ds.input.canceled= false;j2ds.input.falseInput(); };
 j2ds.window.oncontextmenu= function() { return (false); }
 j2ds.window.onselectstart= j2ds.window.oncontextmenu;
 j2ds.window.ondragstart= j2ds.window.oncontextmenu;
 j2ds.window.onmousedown= j2ds.input.onClick;
 j2ds.window.onmouseup= function() { j2ds.input.canceled= false;j2ds.input.falseInput(); }
 j2ds.window.onmousemove= j2ds.input.cursorPosition;
 j2ds.window.onkeydown= j2ds.input.keyEvent;
 j2ds.window.onkeyup= function(e) { j2ds.input.canceled= false;j2ds.input.keyEvent(e); };
};















/* слои */

j2ds.layers= {};
j2ds.layers.list= {};

j2ds.layers.layer= function (_id) {
	return j2ds.layers.list[_id];
}

j2ds.layers.add= function (_id, _index) {
	var o= {};
	o.layerName= _id;
	o.canvas= document.createElement('canvas');
	o.canvas.width= j2ds.scene.width;
	o.canvas.height= j2ds.scene.height;
	o.width= j2ds.scene.width;
	o.height= j2ds.scene.height;	
	o.context= o.canvas.getContext('2d');
 o.canvas.style.zIndex= 1000+_index;
 o.canvas.style.position= 'fixed';
 o.canvas.style.left= '0px';
 o.canvas.style.top= '0px';

 o.fill= function (_color) {
 	this.context.fillStyle= _color;
 	this.context.fillRect(0, 0, this.width, this.height);
 };

 o.setVisible= function (_visible) {
 	if (_visible) {
 	 this.canvas.style.display= 'block';
  } else {
  	this.canvas.style.display= 'none';
  }
 };

 o.setIndex= function (_index) {
 	this.canvas.style.zIndex= _index;
 };

 o.setPosition= function (_pos) {
 	this.canvas.style.top= _pos.y+'px';
 	this.canvas.style.left= _pos.x+'px'; 	
 };
 
 o.getPosition= function () {
 	return vec2di(parseInt(this.canvas.style.left), parseInt(this.canvas.style.top));
 };

 o.drawText= function (_pos, _text, _color) {
  if (_color) {
   this.context.fillStyle= _color;
  }
 	this.context.fillText(_text, _pos.x, _pos.y);
 }

 o.drawImage= function (_pos, _size, _anim, _frame) {
  _frame= _frame?(_frame-1):0;
  	this.context.drawImage(
  _anim.imageMap.img, _anim.sourceX+(_anim.sourceW*_frame), _anim.sourceY, _anim.sourceW, _anim.sourceH,
  _pos.x, _pos.y, _size.x, _size.y);
 };

 o.setStyle= function (_fill, _stroke, _width) {
 	this.context.fillStyle= _fill;
 	this.context.strokeStyle= _stroke;
 	this.context.lineWidth= _width;
 };

 o.clear= function () {
 	this.context.clearRect(0, 0, this.width, this.height);
 };

 o.clearNode= function (_node) {
 	if (_node.isLookScene()) {
   this.context.clearRect(-5+_node.pos.x-j2ds.scene.view.x, -5+_node.pos.y-j2ds.scene.view.y, _node.size.x+10, _node.size.y+10);
 	}
 };

 o.clearRect= function (_pos, _size) {
  this.context.clearRect(_pos.x-j2ds.scene.view.x, _pos.y-j2ds.scene.view.y, _size.x, _size.y);
 };

	j2ds.layers.list[_id]= (o);
}



/* сцена */

j2ds.scene= {
 layerName : 'sceneNode'
};

j2ds.scene.layers= j2ds.layers;

/*функции*/


j2ds.scene.setEngine= function(_engine) {
 j2ds.setActivEngine(_engine);
};

j2ds.scene.start= function(_engine, _framelimit, _func) {
 j2ds.window.onload= function () {
 	for (var i in j2ds.layers.list) {
   document.body.appendChild(j2ds.layers.layer(i).canvas);
  }
  j2ds.input.init();
  j2ds.start(_engine, _framelimit);
  if (_func) { _func(); };
 }
};

j2ds.scene.fullScreen= function(_true) {
 if (_true) {
  var layer= j2ds.scene.canvas;
  layer.style.width= j2ds.device().width+'px';
  layer.style.height= j2ds.device().height+'px';
  for (var i in j2ds.layers.list)
  {
   layer= j2ds.layers.list[i].canvas;
   layer.style.width= j2ds.device().width+'px';
   layer.style.height= j2ds.device().height+'px';
  }
 } else {
  var layer= j2ds.scene.canvas;
  layer.style.width= j2ds.scene.width+1+'px';
  layer.style.height= j2ds.scene.height+1+'px';
  for (var i in j2ds.layers.list)
  {
   layer= j2ds.layers.list[i].canvas;
   layer.style.width= j2ds.scene.width+1+'px';
   layer.style.height= j2ds.scene.height+1+'px';
  }
 }
};

// вывод текста
j2ds.scene.drawText= function(_pos, _text, _color) {
 if (_color) {
  j2ds.scene.context.fillStyle= _color;
 }
 j2ds.scene.context.fillText(_text, _pos.x, _pos.y);
};

j2ds.scene.fill= function (_color) {
 	j2ds.scene.context.fillStyle= _color;
 	j2ds.scene.context.fillRect(0, 0, j2ds.scene.width, j2ds.scene.height);
};

// вывод текста с параметрами
j2ds.scene.drawTextOpt= function(_pos,
 _text, // Сам текст
 _font,   // [ Шрифт (CSS) ]
 _colorF, // [ Цвет текста ]
 _colorS, // [ Цвет обводки ]
 _lineWidth, // [ Толщина линий обводки ]
 _baseLine // Начало отсчета пикслей
 ) {
 j2ds.scene.context.textBaseline= _baseLine || 'top';
 if (_font) { j2ds.scene.context.font= _font; };

 if (_colorS) {
  j2ds.scene.context.lineWidth= _lineWidth || 1;
  j2ds.scene.context.strokeStyle= _colorS;
  j2ds.scene.context.strokeText(_text, _pos.x, _pos.y);
 }

 j2ds.scene.context.fillStyle= _colorF || '#000';
 j2ds.scene.context.fillText(_text, _pos.x, _pos.y);
};

j2ds.scene.drawImage= function (_pos, _size, _anim, _frame) {
  _frame= _frame?(_frame-1):0;
  	this.context.drawImage(
  _anim.imageMap.img, _anim.sourceX+(_anim.sourceW*_frame), _anim.sourceY, _anim.sourceW, _anim.sourceH,
  _pos.x, _pos.y, _size.x, _size.y);
};

// Устанавливает позицию для камеры
j2ds.scene.setViewPosition= function(_pos) {
	j2ds.scene.view.x= _pos.x - Math.ceil(j2ds.scene.width/2);
	j2ds.scene.view.y= _pos.y - Math.ceil(j2ds.scene.height/2);	
};

//! Движение "камеры" вслед за объектом
j2ds.scene.setViewFocus= function(_id, _d) {
 var _dX= _d.x || 0, _dY= _d.y || 0;
	j2ds.scene.view.x= _id.getPosition().x - Math.ceil(j2ds.scene.width/2)+_dX;
	j2ds.scene.view.y= _id.getPosition().y - Math.ceil(j2ds.scene.height/2)+_dY;	
};

//! Движение "камеры" или же вида
j2ds.scene.viewMove= function(_pos) {
	j2ds.scene.view.x+=_pos.x;
	j2ds.scene.view.y+=_pos.y;	
};

//! Очистка отрисованного предыдущего кадра сцены
j2ds.scene.clear= function(_color) {
 if (!j2ds.scene.cancelClear) {
  j2ds.scene.context.clearRect(0, 0, j2ds.scene.width, j2ds.scene.width);
  j2ds.scene.cancelClear= false;
 }         
};

// инициализация сцены
j2ds.scene.init= function(_canvas, _color) {
 j2ds.scene.canvas= $id(_canvas);
 j2ds.scene.context= j2ds.scene.canvas.getContext('2d');
 j2ds.scene.width= j2ds.scene.canvas.width;
 j2ds.scene.height= j2ds.scene.canvas.height;

 j2ds.scene.canvas.style.position= 'fixed';
 j2ds.scene.canvas.style.top= '0px';
 j2ds.scene.canvas.style.left= '0px';
 j2ds.scene.canvas.style.zIndex= '1000';

 j2ds.scene.canvas.style.WebkitTransform= 'translate3d(0,0,0)';
 j2ds.scene.canvas.style.WebkitTransform= 'tranlsateZ(0)';
 j2ds.scene.canvas.style.WebkitTransform= 'scale3d(1,1,1)';
 j2ds.scene.canvas.style.WebkitTransform= 'scale3dZ(1)';
 j2ds.scene.canvas.style.transform= 'translate3d(0,0,0)';

 j2ds.scene.canvas.style.width= j2ds.scene.width+1+'px';
 j2ds.scene.canvas.style.height= j2ds.scene.height+1+'px';

 j2ds.scene.colorClear= _color || '#fff';
 j2ds.scene.font= '14px sens-serif';
 j2ds.scene.fillStyle= '#000';
 j2ds.scene.strokeStyle= '#fff';
 j2ds.scene.angle= 0;
 j2ds.scene.cancelClear= false;

 /* Вид "камеры" */
 j2ds.scene.view= vec2df(0,0);
};



/*базовый объект*/

j2ds.scene.addBaseNode= function(_pos, _size) {
 var o= {
  visible : true,
  pos        : _pos,
  size       : _size,
  parent     : false,
  angle      : 0,
  layer      : j2ds.scene,
 	box       : {
 	              offset : {x : 0, y : 0},
 	              size : {x : 0, y : 0}
 	             }
 };

 o.resizeBox= function (_offset, _size) {
 	this.box.offset= _offset;
 	this.box.size= _size;
 }

 o.setLayer= function (_layer) {
 	this.layer= _layer ? j2ds.layers.layer(_layer) : j2ds.scene;
 };

 o.getLayer= function () {
 	return (this.layer);
 };

 o.setVisible= function(_visible) {
  this.visible= _visible;
 };
 
 o.moveTo= function(_to, _d) {
  _d= _d || vec2df(0,0);
  _to= _to.getPosition();
  this.move(vec2df(
  ((_to.x - this.getPosition().x) / 5) + _d.x,
  ((_to.y - this.getPosition().y) / 5) + _d.y 
  ));
 };

 o.setPosition= function(_pos) {
  this.pos= vec2df(_pos.x-Math.ceil(this.size.x/2), _pos.y-Math.ceil(this.size.y/2) );
 };

 o.move= function(_pos) {
  this.pos.x+= _pos.x;
  this.pos.y+= _pos.y;
 };
 
 o.getPosition= function() {
  return (vec2df(this.pos.x+Math.ceil(this.size.x/2), this.pos.y+Math.ceil(this.size.y/2)));
 };
 
 o.setSize= function(_size) {
  this.size= _size;	
 };
 
 o.setParent= function(_id) {
 	this.parent= _id;
 };

 o.getDistance= function(_id) {
 	return Math.ceil( Math.sqrt(
 	  Math.pow(_id.getPosition().x - this.getPosition().x, 2)+
 	  Math.pow(_id.getPosition().y - this.getPosition().y, 2)
 	                  )
 	       );
 };

 o.getDistanceXY= function(_id) {
 	return vec2df(Math.abs(_id.getPosition().x-this.getPosition().x), Math.abs(_id.getPosition().y-this.getPosition().y));
 };

 o.isIntersect= function(_id) {
  var pos= {
   x1 : this.pos.x+this.box.offset.x,
   x2 : _id.pos.x+_id.box.offset.x,
   y1 : this.pos.y+this.box.offset.y,
   y2 : _id.pos.y+_id.box.offset.y
  };

  var size= {
   x1 : this.size.x+this.box.size.x,
   x2 : _id.size.x+_id.box.size.x,
   y1 : this.size.y+this.box.size.y,
   y2 : _id.size.y+_id.box.size.y
  };

 return (
         ( 
          (pos.y1+size.y1 >= pos.y2) && 
          (pos.x1+size.x1 >= pos.x2) 
         ) && (
          (pos.x1 < pos.x2+size.x2) &&
          (pos.y1 < pos.y2+size.y2) 
         )
        );
 };

 o.isCollision= function(_id) {
 var result= false;
  if (
  (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
  (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
  ) {
     result= true;
    }
  return (result);
 };

 o.isCollisionRadius= function(_id) {
 var result= false;
  if (
  (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
  (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
  ) {
     result= true;
    }
  return (result);
 };

 o.isLookScene= function() {
 	var yes= true;
 	if ((this.pos.x > j2ds.scene.view.x+j2ds.scene.width ||
 	     this.pos.x+this.size.x < j2ds.scene.view.x) ||
 	  (this.pos.y > j2ds.scene.view.y+j2ds.scene.height ||
 	   this.pos.y+this.size.y < j2ds.scene.view.y)) {
 	    yes= false;
 	   }	
 	return (yes);
 };

 o.turn= function(_angle) {
 	if (this.angle > 359) { this.angle= 0; }
 	if (this.angle < 0) { this.angle= 359; }	
 	this.angle+= _angle;
 };
 
 o.setRotation= function(_angle) {
 	_angle= _angle < 0 ? 360+_angle : (_angle > 359 ? 0 : _angle);
 	this.angle= _angle;
 };

 o.isCollisionScene= function() {
 	var o= {};

 	if (this.pos.x+this.size.x >= j2ds.scene.view.x+j2ds.scene.width) o.x= 1;
 	else	if (this.pos.x <= j2ds.scene.view.x) { o.x= -1; }
 	     else { o.x= 0; }

 	if (this.pos.y+this.size.y >= j2ds.scene.view.y+j2ds.scene.height) o.y= 1;
 	else	if (this.pos.y <= j2ds.scene.view.y) { o.y= -1; }
 	     else { o.y= 0; }

 	o.all= (o.x || o.y);

 	return (o);
 };

 o.setRotationTo= function(_to) {
  var dX= _to.getPosition().x - this.getPosition().x;
  var dY= _to.getPosition().y - this.getPosition().y;

	 this.angle= Math.atan2(dY, dX);

 	document.location.href= '#TEST function setRotationTo: '+_to.pos.x;
 };

 o.moveDir= function(_speed) {
  this.pos.x+= _speed*(Math.cos(Rad(this.angle)));
  this.pos.y+= _speed*(Math.sin(Rad(this.angle)));
 };

 o.drawBox= function() {
  var context= this.layer.context;
  context.strokeStyle= 'black';

  context.beginPath();
  context.rect(
  this.pos.x-j2ds.scene.view.x, 
  this.pos.y-j2ds.scene.view.y, 
  this.size.x, this.size.y);
  context.stroke();

  context.strokeStyle= 'yellow';

  context.beginPath();
  context.rect(this.box.offset.x+this.pos.x-j2ds.scene.view.x, this.box.offset.y+this.pos.y-j2ds.scene.view.y, 
               this.box.size.x+this.size.x, this.box.size.y+this.size.y);
  context.stroke();
 };

 return (o);
}


/* окружность */

j2ds.scene.addCircleNode= function(_pos, _radius, _color) {
 var o= j2ds.scene.addBaseNode(_pos, vec2df(_radius*2, _radius*2));
 /*Свойства*/
 o.color= _color;
 o.radius= _radius;

/*Функции*/

 o.draw= function() {
  var context= this.layer.context;
  if (this.visible && this.isLookScene()) { 
   context.fillStyle= this.color;

   context.beginPath();
   context.arc(this.pos.x-j2ds.scene.view.x+this.radius, 
   this.pos.y-j2ds.scene.view.y+this.radius, 
   this.radius, 0, 2*Math.PI,true);
   context.stroke();
   context.fill();
   j2ds.countDrawNodes+= 1;
  }
 };

 return (o);
}


/* линии */
j2ds.scene.addLineNode= function(_pos, _points, _scale, _color, _width, _fill, _cFill) {
 var o= j2ds.scene.addBaseNode(_pos, vec2df(0,0));

 /*Свойства*/
 o.color= _color;
 o.points= _points;
 o.fill= _fill || false;
 o.scale= _scale || 0;
 o.cFill= _cFill;
 o.lineWidth= _width;

/*Функции*/

 o.draw= function() {
  var context= this.layer.context;
  if (this.visible && this.isLookScene()) {
   context.strokeStyle= this.color;
   context.lineWidth= this.lineWidth;

   context.beginPath();
   context.moveTo(this.pos.x-j2ds.scene.view.x, 
   this.pos.y-j2ds.scene.view.y);

   for (var i=0, len= this.points.length;i<len;i+=1) {
    context.lineTo(
    this.pos.x+this.points[i][0]*this.scale-j2ds.scene.view.x, 
    this.pos.y+this.points[i][1]*this.scale-j2ds.scene.view.y);
   }

   context.stroke();
   if (this.fill) { 
    context.fillStyle= this.cFill;
    context.fill();
   }
   j2ds.countDrawNodes+= 1;
  }
 };

 return (o);
}


/*прямоугольники*/
j2ds.scene.addRectNode= function(_pos, _size, _color) {
 var o= j2ds.scene.addBaseNode(_pos, _size);
 /*Свойства*/
 o.color= _color;

 /*Функции*/

 o.draw= function() {
  var context= this.layer.context;
  if (this.visible  && this.isLookScene()) {
   if (this.angle)
   {
    context.save();
    context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);
    context.rotate(Rad(this.angle));
    context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
   }

   context.fillStyle= this.color;

   context.fillRect(
   this.pos.x-j2ds.scene.view.x, 
   this.pos.y-j2ds.scene.view.y, 
   this.size.x, this.size.y);

   if (this.angle) { context.restore(); }
   j2ds.countDrawNodes+= 1;
  }
 };
 
 return (o);
}

/* изображения */
j2ds.scene.createImageMap= function(_id) {
 var o= {};
 o.img= $id(_id);
 o.img.onload= function() { o.img.style.display= 'none'; };
 /* Свойства */ 

 /* Функции */
 o.createAnimation= function(_sourceX, _sourceY, _sourceW, _sourceH, _frameCount) {
  var o= {
   imageMap : this,
   sourceX : _sourceX,
   sourceY : _sourceY,
   sourceW : _sourceW,
   sourceH : _sourceH,
   frameCount : _frameCount-1
  };

  return (o);
 }

 return (o);
}

j2ds.scene.addSpriteNode= function(_pos, _size, _animation) {

var o= j2ds.scene.addBaseNode(_pos, _size);
 o.tmpSpeed= 0;
 o.frame= 0;
 o.animation= _animation;
 o.flip= {x:false, y:false};

/* Функции */

 o.setFlip= function(_x, _y) {
  o.flip= {x:_x, y:_y};
 };

// отрисовка всей анимации
o.draw= function(_speed) {
 if (this.visible && this.isLookScene()) {
  _speed= _speed || 1;

  if (this.frame > this.animation.frameCount) {
   this.frame= 0;
  }
  this.drawFrame(this.frame+1);

  if (this.tmpSpeed > _speed) {
   this.frame+=1;
   this.tmpSpeed= 0;
  }
  else {
   this.tmpSpeed+=1;
  }

 };
}

// отрисовка одного кадра
o.drawFrame= function(_frame) {
 var context= this.layer.context;
 if (this.visible && this.isLookScene()) {
  if (this.angle || this.flip.x || this.flip.y)
  {
   context.save();
   context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);
   context.rotate(Rad(this.angle));
   context.scale(this.flip.x ? -1 : 1, this.flip.y ? -1 : 1);
   context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
  }

  _frame= _frame?(_frame-1):0;
  context.drawImage(
  this.animation.imageMap.img, 
  (this.animation.sourceX+this.animation.sourceW*_frame), this.animation.sourceY, 
  this.animation.sourceW, this.animation.sourceH,
  this.pos.x-j2ds.scene.view.x, this.pos.y-j2ds.scene.view.y, 
  this.size.x, this.size.y);

  if (this.angle || this.flip.x || this.flip.y) {context.restore(); }
  j2ds.countDrawNodes+= 1;
 }
};

o.setAnimation= function(_id) {
 if (this.animation != _id)	{
	 this.animation= _id;
	}
};

return (o);
};

























/*--------------- Локальное хранилище ----------------*/



j2ds.createLocal= function(_id) {
var o= {};
o.id= _id;
o.ls= j2ds.window.localStorage ? j2ds.window.localStorage : false;

if (!o.ls) alert('J2ds ERROR in "createLocal('+_id+')" \n' + 'Объект "localStorage" не поддерживается.');
/*Свойства*/ 

/*Функции*/
o.saveNode= function (_name, _o) {
 if (!this.ls) return false;
  this.ls.setItem(this.id+_name, JSON.stringify(_o));
 };

 o.load= function (_name) {
  if (!this.ls) { return (false); }
  return (this.ls.getItem(this.id+_name));
 };

 o.is= function (_name) {
 if (!this.ls) { return (false); }
  return !!(this.ls.getItem(this.id+_name));
 }

 o.save= function (_name, _value) {
  if (!this.ls) { return (false); }
  this.ls.setItem(this.id+_name, _value);
 }

 o.loadNode= function (_name) {
 if (!this.ls) { return (false); }
  return JSON.parse(this.ls.getItem(this.id+_name));
 }
 
 return (o);
};
