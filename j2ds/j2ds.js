'use strict'; 

/*----------- DOM ---------------*/
var $ = function (id) { return document.getElementById(id); };






















/*------------------- Математика --------------*/
var vec2df= function(_x, _y) { 
 return { x: _x, y: _y }; 
};

var vec2di= function(_x, _y) { 
 return { x: Math.ceil(_x), y: Math.ceil(_y) }; 
};


var Random= function(min, max) { 
 return Math.ceil(Math.random() * (max - min) + min);
};

var Rad= function(_num) {
 return _num * (Math.PI / 180);
};


















/*------------------ 2D движок --------------------*/
var j2ds= {
 now : 0,
 framelimit : 60,
 sceneStartTime : 0,
 sceneSkipTime : 0,
 FDT : 0,
 engine : false,
 redy : false,
 scripts : {},
 root : 'j2ds/'
};

/* функции */

j2ds.device= function() {
	var o= {};
	o.width=  (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(document.documentElement.clientWidth):parseInt(screen.width);
	o.height= (parseInt(document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(document.documentElement.clientHeight) : parseInt(screen.height);
	return (o);
};

j2ds.loaded= function(_id) {
 j2ds.scripts[_id]= true; 
};

j2ds.include= function(_path) {
 var _id= _path.replace(/\//g, ''); 
 if (j2ds.scripts[_id]) return;
 
 var reader = new XMLHttpRequest();  
 reader.open('GET', j2ds.root+_path+'.js', false);
 reader.send(null);
 var sourceCode= reader.responseText;
 
 j2ds.loaded(_id); 
  
 eval(sourceCode); 
};

// старт игры
j2ds.start= function(_engine, _framelimit) {
 j2ds.engine= _engine || function() { document.body.innerHTML= 'Пожалуйста, инициализируйте игровую функцию!'; };;
 j2ds.framelimit= _framelimit || 60;
 j2ds.sceneSkipTime= 1000 / j2ds.framelimit;
	nextJ2dsGameStep(j2ds.gameEngine);
};

// установка активного игрового состояния
j2ds.setActivEngine= function(_engine) {
	j2ds.engine= _engine;
};
 
j2ds.gameEngine= function(){
 j2ds.now= Date.now();
 if (j2ds.now - j2ds.sceneStartTime > j2ds.sceneSkipTime)
 {  
  j2ds.sceneStartTime = Date.now();
  j2ds.scene.clear();
  j2ds.engine();
 }
 nextJ2dsGameStep(j2ds.gameEngine);
};

var nextJ2dsGameStep= (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback){
             window.setTimeout(callback, 1000 / j2ds.framelimit);
         };
})();













/*----------------- INPUT -------------------*/
j2ds.input= {
 /* Gеременные */
 pos : {x:0, y:0},
 x : 0,
 y : 0,
 abs : {x : 0, y : 0},
 lClick : false,
 mClick : false,
 rClick : false,
 touch : false,
 keyDown : [],
 canceled : false,
 body : false,
 anyKey : false
}

// Константы клавиш

j2ds.input.jKey= {
 'LEFT'       : 37,
 'RIGHT'      : 39,
 'UP'         : 38,
 'DOWN'       : 40,
 'SPACE'      : 32,
 
 
 'ESC'        : 27
}

j2ds.input.isKeyDown= function(_code) {
 return this.keyDown[this.jKey[_code]];
};

j2ds.input.getPosition= function() {
 return vec2df(this.pos.x, this.pos.y);
};


j2ds.input.keyEvent= function(e) {
 j2ds.input.keyDown[e.keyCode] = (e.type == 'keydown')&&(!j2ds.input.canceled);
 j2ds.input.anyKey= e.keyCode; 
 return false;
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
  return (
 (this.pos.x > _id.pos.x && this.pos.x < _id.pos.x+_id.size.x)
  &&
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
    var x = e.x + document.body.scrollLeft, 
        y = e.y + document.body.scrollTop; 
  } else {
    var x = e.pageX, // Координата X курсора
        y = e.pageY; // Координата Y курсора
  }
  j2ds.input.abs.x= x; j2ds.input.abs.y= y;
 }
 e.preventDefault();
};


j2ds.input.onClick= function(e) {
 if (!e.which && e.button) {
   if (e.button & 1) e.which = 1;
   else if (e.button & 4) e.which = 2;
   else if (e.button & 2) e.which = 3;
 }  
 j2ds.input.lClick= (e.which == 1?true:false)&&(!j2ds.input.canceled);
 j2ds.input.mClick= (e.which == 2?true:false)&&(!j2ds.input.canceled);
 j2ds.input.rClick= (e.which == 3?true:false)&&(!j2ds.input.canceled);
 j2ds.input.body.focus();
 return false; 
};

j2ds.input.onTouch= function(e) {
 e.preventDefault();
 j2ds.input.abs.x= e.touches[0].pageX;
 j2ds.input.abs.y= e.touches[0].pageY;
 j2ds.input.lClick= true&&(!j2ds.input.canceled);
 j2ds.input.touch= true&&(!j2ds.input.canceled);
 j2ds.input.body.focus();
 return false;
};

j2ds.input.falseInput= function() { 
   j2ds.input.lClick= 
    j2ds.input.mClick= 
     j2ds.input.rClick= false;
};


j2ds.input.init= function() {
 j2ds.input.body= window;
 j2ds.input.body.focus();
 j2ds.scene.canvas.ontouchstart= j2ds.input.onTouch;
 j2ds.scene.canvas.ontouchmove= j2ds.input.onTouch;
 j2ds.scene.canvas.ontouchend= function() { j2ds.input.canceled= false; j2ds.input.falseInput(); }; 
 j2ds.scene.canvas.oncontextmenu= function() { return false; }
 j2ds.scene.canvas.onselectstart= j2ds.scene.canvas.oncontextmenu;
 j2ds.scene.canvas.ondragstart= j2ds.scene.canvas.oncontextmenu;
 j2ds.scene.canvas.onmousedown= j2ds.input.onClick;
 j2ds.scene.canvas.onmouseup= function() { j2ds.input.canceled= false; j2ds.input.falseInput(); }
 j2ds.scene.canvas.onmousemove= j2ds.input.cursorPosition;
 j2ds.input.body.onkeydown= j2ds.input.keyEvent;
 j2ds.input.body.onkeyup= function(e) { j2ds.input.canceled= false; j2ds.input.keyEvent(e); };
};


















/* сцена */

j2ds.scene= {};
 
/*функции*/
j2ds.scene.setEngine= function(_engine) {
 j2ds.setActivEngine(_engine);
}; 

j2ds.scene.start= function(_engine, _framelimit) {
 j2ds.start(_engine, _framelimit);
};

j2ds.scene.fullScreen= function(_true) {
 if (_true) {
  j2ds.scene.canvas.style.width= j2ds.device().width+'px';
  j2ds.scene.canvas.style.height= j2ds.device().height+'px';  
 } else { 
  j2ds.scene.canvas.style.width= j2ds.scene.width+1+'px';
  j2ds.scene.canvas.style.height= j2ds.scene.height+1+'px';  
 }
};

// вывод текста
j2ds.scene.drawText= function(_pos, _text) {
 if (j2ds.scene.fillStyle != j2ds.scene.context.fillStyle) j2ds.scene.context.fillStyle= j2ds.scene.fillStyle;
 j2ds.scene.context.strokeStyle= j2ds.scene.strokeStyle;
 j2ds.scene.context.textBaseline= 'top';
 j2ds.scene.context.font= j2ds.scene.font;
 j2ds.scene.context.lineWidth= 2; 
 
 j2ds.scene.context.strokeText(_text, _pos.x, _pos.y);
 j2ds.scene.context.fillText(_text, _pos.x, _pos.y); 
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
 if (_font) j2ds.scene.context.font= _font;

 if (_colorS) {
  j2ds.scene.context.lineWidth= _lineWidth || 1;
  j2ds.scene.context.strokeStyle= _colorS;
  j2ds.scene.context.strokeText(_text, _pos.x, _pos.y);
 } 
 
 if (_colorF != j2ds.scene.context.fillStyle) j2ds.scene.context.fillStyle= _colorF || '#000';
 j2ds.scene.context.fillText(_text, _pos.x, _pos.y); 
};

j2ds.scene.drawImage= function(_map, _pos) { 
 j2ds.scene.context.drawImage(_map.img, _pos.x, _pos.y);
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
  if (j2ds.scene.context.fillStyle != _color) j2ds.scene.context.fillStyle= _color || j2ds.scene.colorClear;
  j2ds.scene.context.fillRect(0, 0, j2ds.scene.width, j2ds.scene.width);   
  j2ds.scene.cancelClear= false; 
 }          
};

// инициализация сцены
j2ds.scene.init= function(_canvas, _color) {
	j2ds.scene.canvas= $(_canvas);
 j2ds.scene.context= j2ds.scene.canvas.getContext('2d');
 j2ds.scene.width= j2ds.scene.canvas.width;
 j2ds.scene.height= j2ds.scene.canvas.height;  
 
 j2ds.scene.canvas.style.position= 'fixed';
 j2ds.scene.canvas.style.top= '0px';
 j2ds.scene.canvas.style.left= '0px';   
 
 j2ds.scene.canvas.style.WebkitTransform= 'translate3d(0,0,0)';
 j2ds.scene.canvas.style.WebkitTransform= 'tranlsateZ(0)';
 j2ds.scene.canvas.style.WebkitTransform= 'scale3d(1,1,1)';
 j2ds.scene.canvas.style.WebkitTransform= 'scale3dZ(1)'; 
 j2ds.scene.canvas.style.transform= 'translate3d(0,0,0)';
 
 j2ds.scene.canvas.style.width=  j2ds.scene.width+'px';
 j2ds.scene.canvas.style.height=  j2ds.scene.height+'px';
 
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
 var o= { // begin
  visible : true,
  pos        : _pos,
  size       : _size,
  parent     : false,
  angle      : 0
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
  this.pos= vec2df(this.pos.x+_pos.x, this.pos.y+_pos.y);
 };

 o.getPosition= function() {
  return vec2df(this.pos.x+Math.ceil(this.size.x/2), this.pos.y+Math.ceil(this.size.y/2));
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

 o.isCollision= function(_id) {
  return (  (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
            (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  );
 };

 o.isCollisionRadius= function(_id) {
  var result= false;
   if (
    (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
    (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
   ) result= true;
  return result;
 };

 o.isLookScene= function() {
 	var yes= true;
 	if ((this.pos.x > j2ds.scene.view.x+j2ds.scene.width 
 	|| this.pos.x+this.size.x < j2ds.scene.view.x) ||
 	  (this.pos.y > j2ds.scene.view.y+j2ds.scene.height 
 	|| this.pos.y+this.size.y < j2ds.scene.view.y)) yes= false;	
 	return yes;
 };

 o.turn= function(_angle) {
 	if (this.angle > 359) this.angle= 0;
 	if (this.angle < 0) this.angle= 359;	
 	 this.angle+= _angle;
 };

 o.setRotation= function(_angle) {
 	_angle= _angle < 0 ? 360+_angle : (_angle > 359 ? 0 : _angle);
 	this.angle= _angle;
 };

 o.isCollisionScene= function() {
 	var o= {};
 	
 	if (this.pos.x+this.size.x >= j2ds.scene.view.x+j2ds.scene.width) o.x= 1;
 	else	if (this.pos.x <= j2ds.scene.view.x) o.x= -1;
 	     else o.x= 0;
 	
 	if (this.pos.y+this.size.y >= j2ds.scene.view.y+j2ds.scene.height) o.y= 1;
 	else	if (this.pos.y <= j2ds.scene.view.y) o.y= -1;
 	     else  o.y= 0;
 	
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
   var newX= (this.parent?this.parent.pos.x:0);
   var newY= (this.parent?this.parent.pos.y:0); 

   if (j2ds.scene.context.strokeStyle != 'black') j2ds.scene.context.strokeStyle= 'black';  

   j2ds.scene.context.beginPath();
   j2ds.scene.context.rect(
   newX+this.pos.x-j2ds.scene.view.x, 
   newY+this.pos.y-j2ds.scene.view.y, 
   this.size.x, this.size.y);
   j2ds.scene.context.stroke(); 

   if (j2ds.scene.context.strokeStyle != 'white') j2ds.scene.context.strokeStyle= 'white';

   j2ds.scene.context.beginPath(); 
   j2ds.scene.context.rect(
   -2+newX+this.pos.x-j2ds.scene.view.x, 
   -2+newY+this.pos.y-j2ds.scene.view.y, 
   this.size.x+4, this.size.y+4);
   j2ds.scene.context.stroke(); 
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
  if (this.visible  && this.isLookScene()) {  
   var newX= (this.parent?this.parent.pos.x:0);
   if (j2ds.scene.context.fillStyle != this.color) j2ds.scene.context.fillStyle= this.color;
 
 
   var newY= (this.parent?this.parent.pos.y:0); 
   
   j2ds.scene.context.beginPath();
   j2ds.scene.context.arc(newX+this.pos.x-j2ds.scene.view.x+this.radius, 
                      newY+this.pos.y-j2ds.scene.view.y+this.radius, 
                      this.radius, 0, 2*Math.PI,true);
   j2ds.scene.context.stroke();  
   j2ds.scene.context.fill();  
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
 o.scale=  _scale || 0;
 o.cFill= _cFill;
 o.lineWidth= _width;
 
 
 /*Функции*/

 o.draw= function() {
  if (this.visible && this.isLookScene()) { 
   j2ds.scene.context.strokeStyle= this.color;
   j2ds.scene.context.lineWidth = this.lineWidth;
   
   j2ds.scene.context.beginPath();
   j2ds.scene.context.moveTo(this.pos.x-j2ds.scene.view.x, 
                           this.pos.y-j2ds.scene.view.y);
   
   for (var i=0, len= this.points.length; i<len; i+=1) {
    j2ds.scene.context.lineTo(
      this.pos.x+this.points[i][0]*this.scale-j2ds.scene.view.x, 
      this.pos.y+this.points[i][1]*this.scale-j2ds.scene.view.y);   
   }
   j2ds.scene.context.stroke(); 
   if (this.fill) {  
    if (j2ds.scene.context.fillStyle != this.cFill) j2ds.scene.context.fillStyle= this.cFill;
    j2ds.scene.context.fill(); 
   }
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
  if (this.visible  && this.isLookScene()) {  
   var newX= (this.parent?this.parent.pos.x:0);
   var newY= (this.parent?this.parent.pos.y:0); 
 
   j2ds.scene.context.save();
   j2ds.scene.context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);  
   j2ds.scene.context.rotate(Rad(this.angle));
   j2ds.scene.context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
 
   if (j2ds.scene.context.fillStyle != this.color) j2ds.scene.context.fillStyle= this.color;
   j2ds.scene.context.fillRect(
   newX+this.pos.x-j2ds.scene.view.x, 
   newY+this.pos.y-j2ds.scene.view.y, 
   this.size.x, this.size.y);
 
   j2ds.scene.context.restore();      
  }
 }; 
 
 return (o);
}

/* изображения */
j2ds.scene.createImageMap= function(_id) {
 var o= {};
 o.img = $(_id);
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
  if (this.visible && this.isLookScene())  
  {
   _speed= _speed || -1; 
   
   if (this.frame > this.animation.frameCount) { 
    this.frame= 0; 
   }
   this.drawFrame(this.frame+1);
   
   if (this.tmpSpeed > _speed) { 
    this.frame+=1; this.tmpSpeed= 0; 
   }
   else { 
    this.tmpSpeed+=1; 
   }
   
  };
 }
 
 // отрисовка одного кадра
 o.drawFrame= function(_frame) { 
  if (this.visible && this.isLookScene()) {
   
   j2ds.scene.context.save();
   j2ds.scene.context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);  
   j2ds.scene.context.rotate(Rad(this.angle));
   j2ds.scene.context.scale(this.flip.x ? -1 : 1, this.flip.y ? -1 : 1);
   j2ds.scene.context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
   
   _frame= _frame?(_frame-1):0;
   j2ds.scene.context.drawImage(
   this.animation.imageMap.img, 
   (this.animation.sourceX+this.animation.sourceW*_frame), this.animation.sourceY, 
   this.animation.sourceW, this.animation.sourceH,
   this.pos.x-j2ds.scene.view.x, this.pos.y-j2ds.scene.view.y, 
   this.size.x, this.size.y);
   
   j2ds.scene.context.restore();  
  }
 }; 
 
 o.setAnimation= function(_id) {
  if (this.animation != _id)	{ 
 	 this.animation= _id; 
 	}
 };

 return (o);
}

























/*--------------- Локальное хранилище ----------------*/



j2ds.createLocal= function(_id) {
 var o= {};
 o.id= _id;
 o.ls= window.localStorage? window.localStorage : false;
 
 if (!o.ls) alert('J2ds ERROR in "createLocal('+_id+')" \n'+
 'Объект "localStorage" не поддерживается.'); 
 /*Свойства*/ 
 
 /*Функции*/
 o.save= function (_name, _o) {
  if (!this.ls) return false;
  this.ls.setItem(this.id+_name, JSON.stringify(_o));
 };

 o.load= function (_name) {
  if (!this.ls) return false;
  var o= {};
  o.val= this.ls.getItem(this.id+_name);
  o.int= parseInt(o.val);
  o.dbl= parseFloat(o.val); 
  return (o);
 };
 
 o.is= function (_name) {
  if (!this.ls) return false;
  return !!(this.ls.getItem(this.id+_name));
 }
 o.saveObject= function (_name, _value) {
  if (!this.ls) return false;
  this.ls.setItem(this.id+_name, _value);
 }

 o.loadObject= function (_name) {
  if (!this.ls) return false;
  return JSON.parse(this.ls.getItem(this.id+_name));
 }

 return (o);
}















