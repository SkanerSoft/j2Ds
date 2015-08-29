var j2ds= {
 now : 0,
 framelimit : 60,
 sceneStartTime : 0,
 sceneSkipTime : 0,
 FDT : 0,
 engine : false
} 

/* функции */

// старт игры
j2ds.start= function(_engine, _framelimit) {
 j2ds.engine= _engine || function() { document.body.innerHTML= 'Пожалуйста, инициализируйте игровую функцию!'; };;
 j2ds.framelimit= _framelimit || 60;
 j2ds.sceneSkipTime= 1000 / j2ds.framelimit;
	nextJ2dsGameStep(j2ds.gameEngine);
}

// установка активного игрового состояния
j2ds.setActivEngine= function(_engine) {
	j2ds.engine= _engine;
}

// выход из игры
j2ds.exit= function() {
 window.close();
}
 
j2ds.gameEngine= function(){
 j2ds.now= Date.now();
 if (j2ds.now - j2ds.sceneStartTime > j2ds.sceneSkipTime)
 {  
  j2ds.sceneStartTime = Date.now();
  scene.clear();
  j2ds.engine();
 }
 nextJ2dsGameStep(j2ds.gameEngine);
}

nextJ2dsGameStep= (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback){
             window.setTimeout(callback, 1000 / j2ds.framelimit);
         };
 })();













/* сцена */

var scene= {
 
  /*функции*/
 
  setEngine : function(_engine) {
   j2ds.setActivEngine(_engine);
  }, 
 
  start : function(_engine, _framelimit) {
   j2ds.start(_engine, _framelimit);
  }, 
 
  fullScreen : function(_true) {
   if (_true) {
    scene.canvas.style.width= device().width+'px';
    scene.canvas.style.height= device().height+'px';  
   } else { 
    scene.canvas.style.width= scene.width+1+'px';
    scene.canvas.style.height= scene.height+1+'px';  
   }
  }, 
 
  // вывод текста
  drawText : function(_pos, _text) {
   if (scene.fillStyle != scene.context.fillStyle) scene.context.fillStyle= scene.fillStyle;
   scene.context.strokeStyle= scene.strokeStyle;
   scene.context.textBaseline= 'top';
   scene.context.font= scene.font;
   scene.context.lineWidth= 2; 
   
   scene.context.strokeText(_text, _pos.x, _pos.y);
   scene.context.fillText(_text, _pos.x, _pos.y); 
  }, 
 
  // вывод текста с параметрами
  drawTextOpt : function(_pos,
                        _text, // Сам текст
                        _font,   // [ Шрифт (CSS) ]
                        _colorF, // [ Цвет текста ]
                        _colorS, // [ Цвет обводки ]
                        _lineWidth, // [ Толщина линий обводки ]
                        _baseLine // Начало отсчета пикслей
                        ) {
   scene.context.textBaseline= _baseLine || 'top';
   if (_font) scene.context.font= _font;
  
   if (_colorS) 
   {
    scene.context.lineWidth= _lineWidth || 1;
    scene.context.strokeStyle= _colorS;
    scene.context.strokeText(_text, _pos.x, _pos.y);
   } 
   
   if (_colorF != scene.context.fillStyle) scene.context.fillStyle= _colorF || '#000';
   scene.context.fillText(_text, _pos.x, _pos.y); 
  },
 
  // Устанавливает позицию для камеры
  setViewPosition : function(_pos) {
  	scene.view.x= _pos.x - Math.ceil(scene.width/2);
  	scene.view.y= _pos.y - Math.ceil(scene.height/2);	
  },
 
  //! Движение "камеры" вслед за объектом
  setViewFocus : function(_id, _d) {
   _dX= _d.x || 0; _dY= _d.y || 0;
  	scene.view.x= _id.getPosition().x - Math.ceil(scene.width/2)+_dX;
  	scene.view.y= _id.getPosition().y - Math.ceil(scene.height/2)+_dY;	
  },
 
  //! Движение "камеры" или же вида
  viewMove : function(_pos) {
  	scene.view.x+=_pos.x;
  	scene.view.y+=_pos.y;	
  },
 
  //! Очистка отрисованного предыдущего кадра сцены
  clear : function(_color)
  {
   if (!scene.cancelClear)
   {
    if (scene.context.fillStyle != _color) scene.context.fillStyle= _color || scene.colorClear;
    scene.context.fillRect(0, 0, 
              scene.width, scene.width);   
    scene.cancelClear= false; 
   }          
  },
 
  // инициализация сцены
  init : function(_canvas, _color) {
  	scene.canvas= $(_canvas);
   scene.context= scene.canvas.getContext('2d');
   scene.width= scene.canvas.width;
   scene.height= scene.canvas.height;  
   
   scene.canvas.style.position= 'fixed';
   scene.canvas.style.top= '0px';
   scene.canvas.style.left= '0px';   
   
   scene.canvas.style.WebkitTransform= 'translate3d(0,0,0)';
   scene.canvas.style.WebkitTransform= 'tranlsateZ(0)';
   scene.canvas.style.WebkitTransform= 'scale3d(1,1,1)';
   scene.canvas.style.WebkitTransform= 'scale3dZ(1)'; 
   scene.canvas.style.transform= 'translate3d(0,0,0)';
   
   scene.canvas.style.width=  scene.width+'px';
   scene.canvas.style.height=  scene.height+'px';
   
   scene.colorClear= _color || '#fff';
   scene.font= '14px sens-serif'; 
   scene.fillStyle= '#000';
   scene.strokeStyle= '#fff';
   scene.angle= 0;
   scene.cancelClear= false;
   
    /* Вид "камеры" */
   scene.view= vec2df(0,0);
  }
 
 
}



/*базовый объект*/

var addBaseNode= function(_pos, _size) {
 var o= { // begin
  visible : true,
  pos        : _pos,
  size       : _size,
  parent     : false,
  angle      : 0
 }
 
 o.keyControl= function(_speed)
 {
  if (input.keyDown[key.DOWN]) { this.move(vec2df(0, _speed)); }
  if (input.keyDown[key.UP]) { this.move(vec2df(0, -_speed)); }
  if (input.keyDown[key.LEFT]) { this.move(vec2df(-_speed, 0)); }
  if (input.keyDown[key.RIGHT]) { this.move(vec2df(_speed, 0)); }
 }

 o.setVisible= function(_visible)
 {
  this.visible= _visible;
 }

 o.moveTo= function(_to, _d)
 {
  _d= _d || vec2df(0,0);
  _to= _to.getPosition(); 
  this.move(vec2df(
   ((_to.x - this.getPosition().x) / 5) + _d.x,
   ((_to.y - this.getPosition().y) / 5) + _d.y 
  )); 
 }

 o.setPosition= function(_pos)
 {
  this.pos= vec2df(_pos.x-Math.ceil(this.size.x/2), _pos.y-Math.ceil(this.size.y/2) );
 }

 o.move= function(_pos)
 {
  this.pos= vec2df(this.pos.x+_pos.x, this.pos.y+_pos.y);
 }

 o.getPosition= function()
 {
  return vec2df(this.pos.x+Math.ceil(this.size.x/2), this.pos.y+Math.ceil(this.size.y/2));
 }

 o.setSize= function(_size) {
  this.size= _size;	
 }

 o.setParent= function(_id) {
 	this.parent= _id;
 }

 o.getDistance= function(_id) {
 	return Math.ceil( Math.sqrt(
 	  Math.pow(_id.getPosition().x - this.getPosition().x, 2)+
 	  Math.pow(_id.getPosition().y - this.getPosition().y, 2)
 	                  )
 	       );
 }

 o.getDistanceXY= function(_id) {
 	return vec2df(Math.abs(_id.getPosition().x-this.getPosition().x), Math.abs(_id.getPosition().y-this.getPosition().y));
 },

 o.isCollision= function(_id) {
  var result= false;
   if (
    (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
    (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
   ) result= true;
  return result;
 }

 o.isCollisionRadius= function(_id) {
  var result= false;
   if (
    (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
    (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
   ) result= true;
  return result;
 }

 o.isLookScene= function() {
 	var yes= true;
 	if ((this.pos.x > scene.view.x+scene.width 
 	|| this.pos.x+this.size.x < scene.view.x) ||
 	  (this.pos.y > scene.view.y+scene.height 
 	|| this.pos.y+this.size.y < scene.view.y)) yes= false;	
 	return yes;
 }

 o.turn= function(_angle) {
 	if (this.angle > 359) this.angle= 0;
 	if (this.angle < 0) this.angle= 359;	
 	 this.angle+= _angle;
 },

 o.setRotation= function(_angle) {
 	_angle= _angle < 0 ? 360+_angle : (_angle > 359 ? 0 : _angle);
 	this.angle= _angle;
 }

 o.isCollisionScene= function() {
 	var o={};
 	
 	if (this.pos.x+this.size.x >= scene.view.x+scene.width) o.x= 1;
 	else	if (this.pos.x <= scene.view.x) o.x= -1;
 	     else o.x= 0;
 	
 	if (this.pos.y+this.size.y >= scene.view.y+scene.height) o.y= 1;
 	else	if (this.pos.y <= scene.view.y) o.y= -1;
 	     else  o.y= 0;
 	
 	o.all= (o.x || o.y);
 	
 	return o;
 }

 o.setRotationTo= function(_to) {
  var dX= _to.getPosition().x - this.getPosition().x;
  var dY= _to.getPosition().y - this.getPosition().y;
 
 	this.angle= Math.atan2(dY, dX);
 
 	dbg('test function setRotationTo: '+this.angle);
 }

 o.moveDir= function(_speed)
 {
  this.pos.x+= _speed*(Math.cos(Rad(this.angle)));
  this.pos.y+= _speed*(Math.sin(Rad(this.angle))); 
 } 

 return (o);
}


/* окружность */

var addCircleNode= function(_pos, _radius, _color)
{
 var o= addBaseNode(_pos, vec2df(_radius*2, _radius*2));
 /*Свойства*/
 o.color= _color; 
 o.radius= _radius;
 
 /*Функции*/

 o.draw= function()
 {
  if (this.visible  && this.isLookScene(scene))
  {  
   var newX= (this.parent?this.parent.pos.x:0);
   if (scene.context.fillStyle != this.color) scene.context.fillStyle= this.color;
 
 
   var newY= (this.parent?this.parent.pos.y:0); 
   
   scene.context.beginPath();
   scene.context.arc(newX+this.pos.x-scene.view.x+this.radius, 
                      newY+this.pos.y-scene.view.y+this.radius, 
                      this.radius, 0, 2*Math.PI,true);
   scene.context.stroke();  
   scene.context.fill();  
  }
 }

 return o;
}


/* линии */
var addLineNode= function(_pos, _points, _scale, _color, _width, _fill, _cFill)
{
 var o= addBaseNode(_pos, vec2df(0,0));
 
 /*Свойства*/
 o.color= _color; 
 o.points= _points;
 o.fill= _fill || false; 
 o.scale=  _scale || 0;
 o.cFill= _cFill;
 o.lineWidth= _width;
 
 
 /*Функции*/

 o.draw= function()
 {
  if (this.visible && this.isLookScene(scene))
  { 
   scene.context.strokeStyle= this.color;
   scene.context.lineWidth = this.lineWidth;
   
   scene.context.beginPath();
   scene.context.moveTo(this.pos.x-scene.view.x, 
                           this.pos.y-scene.view.y);
   
   for (var i=0; i<this.points.length; i+=1) {
    scene.context.lineTo(
      this.pos.x+this.points[i][0]*this.scale-scene.view.x, 
      this.pos.y+this.points[i][1]*this.scale-scene.view.y);   
   }
   scene.context.stroke(); 
   if (this.fill) {  
    if (scene.context.fillStyle != this.cFill) scene.context.fillStyle= this.cFill;
    scene.context.fill(); 
   }
  }
 }

 return o;
}


/*прямоугольники*/
var addRectNode= function(_pos, _size, _color)
{
 var o= addBaseNode(_pos, _size);
 /*Свойства*/
 o.color= _color; 
 
 /*Функции*/
 
 o.draw= function()
 {
  if (this.visible  && this.isLookScene(scene))
  {  
   var newX= (this.parent?this.parent.pos.x:0);
   var newY= (this.parent?this.parent.pos.y:0); 
 
   scene.context.save();
   scene.context.translate(this.getPosition().x-scene.view.x, this.getPosition().y-scene.view.y);  
   scene.context.rotate(Rad(this.angle));
   scene.context.translate(-(this.getPosition().x-scene.view.x), -(this.getPosition().y-scene.view.y));
 
   if (scene.context.fillStyle != this.color) scene.context.fillStyle= this.color;
   scene.context.fillRect(
   newX+this.pos.x-scene.view.x, 
   newY+this.pos.y-scene.view.y, 
   this.size.x, this.size.y);
 
   scene.context.restore();      
  }
 } 
 
 return o;
}

/* изображения */

var createImageMap= function(_id) {
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
  return o;
 }

 return o; 
}

var addSpriteNode= function(_pos, _size, _animation) {
                       
 var o= addBaseNode(_pos, _size);
 o.tmpSpeed= 0;
 o.frame= 0;
 o.animation= _animation;
 
 /* Функции */

 // отрисовка всей анимации
 o.drawAnimate= function(_speed) { 
  if (this.visible && this.isLookScene(scene)) 
  {
   _speed= _speed || -1; 
   if (this.frame > this.animation.frameCount) 
   { this.frame= 0; }
   this.drawFrame(this.frame+1);
   if (this.tmpSpeed > _speed)  
   { this.frame+=1; this.tmpSpeed= 0; }
   else { this.tmpSpeed+=1; }
  }
 }
 
 o.drawFrame= function(_frame) { 
  if (this.visible && this.isLookScene(scene))
  {
   scene.context.save();
   scene.context.translate(this.getPosition().x-scene.view.x, this.getPosition().y-scene.view.y);  
   scene.context.rotate(Rad(this.angle));
   scene.context.translate(-(this.getPosition().x-scene.view.x), -(this.getPosition().y-scene.view.y));
   
   _frame= _frame?(_frame-1):0;
   scene.context.drawImage(
   this.animation.imageMap.img, 
   (this.animation.sourceX+this.animation.sourceW*_frame), this.animation.sourceY, 
   this.animation.sourceW, this.animation.sourceH,
   this.pos.x-scene.view.x, this.pos.y-scene.view.y, 
   this.size.x, this.size.y);
   
   scene.context.restore();  
  }
 } 
 
 o.setAnimation= function(_id) {
  if (this.animation != _id)
 	{ this.animation= _id; }
 }

 return o;
}















