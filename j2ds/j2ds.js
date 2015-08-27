/* Константы */
var now = 0;
var _framelimit= 60;
var _sceneStartTime = 0;
var _sceneSkipTime = 0;
var _FDT= 0;

function vec2df(_x, _y) { return { x: _x, y: _y }; }
function vec2di(_x, _y) { return { x: Math.ceil(_x), y: Math.ceil(_y) }; }

/* Игровой процесс */

//! Старт игрового цикла с ограничением FPS
function startGame(_engine, __framelimit) {
 _engine= _engine || function() { document.body.innerHTML= 'Пожалуйста, инициализируйте игровую функцию!'; };;
 _framelimit= __framelimit || _framelimit;
 _sceneSkipTime = 1000 / _framelimit;
 activeEngine= _engine;
	nextGameStep(gameEngine);
}

//! Устанавливает активный цикл для игры
// Предыдущий активный цикл ставится на паузу
function setActivEngine(_engine) {
	activeEngine= _engine;
}

function exitGame() {
 window.close();
}

//! Игровой цикл, вызывается автоматически
function gameEngine(){
 now= Date.now();
 if (now - _sceneStartTime > _sceneSkipTime)
 {  
  _sceneStartTime = Date.now();
  scene.clearDraw();
  activeEngine();
 }
 nextGameStep(gameEngine);
}

//! Функция анимирования канваса с учетом FPS
var nextGameStep = (function(){
 return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / _framelimit);
        };
})();


/*------------- Сцены ---------------*/


//!cистемная
//! Растягивание сцены на весь экран
function _fullScreen(_true) {
 if (_true) {
  this.canvas.style.position= 'fixed';
  this.canvas.style.top= '0px';
  this.canvas.style.left= '0px';
  this.canvas.style.width= device().width+'px';
  this.canvas.style.height= device().height+'px';  
 } else { 
  this.canvas.style.position= '';
  this.canvas.style.top= '0px';
  this.canvas.style.left= '0px';
  this.canvas.style.width= this.width+1+'px';
  this.canvas.style.height= this.height+1+'px';  
 }
}

//! системная
//! Рисует текст в позиции
function _drawTextOpt(_pos,
                      _text, // Сам текст
                      _font,   // [ Шрифт (CSS) ]
                      _colorF, // [ Цвет текста ]
                      _colorS, // [ Цвет обводки ]
                      _lineWidth, // [ Толщина линий обводки ]
                      _baseLine // Начало отсчета пикслей
                      ) {
 this.context.textBaseline = _baseLine || 'top';
 if (_font) this.context.font= _font;

 if (_colorS) 
 {
  this.context.lineWidth= _lineWidth || 1;
  this.context.strokeStyle= _colorS;
  this.context.strokeText(_text, _pos.x, _pos.y);
 } 
 
 if (_colorF != this.context.fillStyle) this.context.fillStyle= _colorF || '#000';
 this.context.fillText(_text, _pos.x, _pos.y); 
}

//! системная
//! Рисует текст в позиции
function _drawText(_pos, _text) {
 if (this.fillStyle != this.context.fillStyle) this.context.fillStyle= this.fillStyle;
 this.context.strokeStyle= this.strokeStyle;
 this.context.textBaseline = 'top';
 this.context.font= this.font;
 this.context.lineWidth = 2; 
 
 this.context.strokeText(_text, _pos.x, _pos.y);
 this.context.fillText(_text, _pos.x, _pos.y); 
}

//! системная
//! Устанавливает позицию для камеры
function _vSetPosition(_pos) {
	this.view.x= _pos.x - Math.ceil(this.width/2);
	this.view.y= _pos.y - Math.ceil(this.height/2);	
}

//! системная
//! Движение "камеры" вслед за объектом
function _vFocus(_id, _d) {
 _dX= _d.x || 0; _dY= _d.y || 0;
	this.view.x= _id.getPosition().x - Math.ceil(this.width/2)+_dX;
	this.view.y= _id.getPosition().y - Math.ceil(this.height/2)+_dY;	
}


//! системная
//! Движение "камеры" или же вида
function _vMove(_pos) {
	this.view.x+=_pos.x;
	this.view.y+=_pos.y;	
}

//! системная 
//! Очистка отрисованного предыдущего кадра сцены
function _clearDraw(_color)
{
 if (!this.cancelClear)
 {
  if (this.context.fillStyle != _color) this.context.fillStyle= _color || this.color;
  this.context.fillRect(0, 0, 
            this.width, this.width);   
  this.cancelDraw= false; 
 }          
} 

//! системная 
//! Если используется буфер для отрисовки
function _drawBuffer() {
	
}



//! Создание сцены с уже существующим CANVAS
/* createScene('idcanvas', '#dddddd'); */
function createScene(_canvas, _color) {
	o= {};
 /* Параметры */	
	o.canvas= obj(_canvas);
 o.context= o.canvas.getContext('2d');
 o.width= o.canvas.width;
 o.height= o.canvas.height;  
 
 
 o.canvas.style.WebkitTransform= 'translate3d(0,0,0)';
 o.canvas.style.WebkitTransform= 'tranlsateZ(0)';
 o.canvas.style.WebkitTransform= 'scale3d(1,1,1)';
 o.canvas.style.WebkitTransform= 'scale3dZ(1)'; 
 o.canvas.style.transform= 'translate3d(0,0,0)';
 
 o.canvas.style.width=  o.width+'px';
 o.canvas.style.height=  o.height+'px';
 
 
 
 o.color= _color || '#fff';
 o.font= '14px sens-serif'; 
 o.fillStyle= '#000';
 o.strokeStyle= '#fff';
 o.angle= 0;
 o.cancelClear= false;
 
  /* Вид "камеры" */
  o.view= vec2df(0,0);
  o.vMove= _vMove;
  o.vSetPosition= _vSetPosition;
  o.vFocus= _vFocus;
 
 /* Функции */
 o.clearDraw= _clearDraw;
 o.drawBuffer= _drawBuffer;
 o.drawText= _drawText;
 o.drawTextOpt= _drawTextOpt; 
 o.fullScreen= _fullScreen;
	return o;
}






/*------------- Базовый объект ---------------*/


//! системная 
//! Управление с клавиатуры
function _keyControl(_speed)
{
 if (input.keyDown[key.DOWN]) { this.move(vec2df(0, _speed)); }
 if (input.keyDown[key.UP]) { this.move(vec2df(0, -_speed)); }
 if (input.keyDown[key.LEFT]) { this.move(vec2df(-_speed, 0)); }
 if (input.keyDown[key.RIGHT]) { this.move(vec2df(_speed, 0)); }
}

//! системная 
//! Установление флага отрисовки
function _setVisible(_visible)
{
 this.visible= _visible;
}

//! системная 
//! Движение объекта
function _move(_pos)
{
 this.pos= vec2df(this.pos.x+_pos.x, this.pos.y+_pos.y);
}

//! системная 
//! Движение объекта в направлении
function _moveTo(_to, _d)
{
 _d= _d || vec2df(0,0);
 _to= _to.getPosition(); 
 this.move(vec2df(
  ((_to.x - this.getPosition().x) / 5) + _d.x,
  ((_to.y - this.getPosition().y) / 5) + _d.y 
 )); 
}



//! системная 
//! Установление позиции
function _setPosition(_pos)
{
 this.pos= vec2df(_pos.x-Math.ceil(this.size.x/2), _pos.y-Math.ceil(this.size.y/2) );
}

//! системная 
//! Получение текущей позиции
function _getPosition()
{
 return vec2df(this.pos.x+Math.ceil(this.size.x/2), this.pos.y+Math.ceil(this.size.y/2));
}

//! системная 
//! Масштабирование объекта
function _setSize(_size) {
 this.size= _size;	
}

//! системная 
//! Назначение родителя
function _setParent(_id) {
	this.parent= _id;
}

//! системная 
//! Дистанция до объекта
function _getDistance(_id) {
	return Math.ceil( Math.sqrt(
	  Math.pow(_id.getPosition().x - this.getPosition().x, 2)+
	  Math.pow(_id.getPosition().y - this.getPosition().y, 2)
	                  )
	       );
}

//! системная 
//! Дистанция до объекта
function _getDistanceXY(_id) {
	return vec2df(Math.abs(_id.getPosition().x-this.getPosition().x), Math.abs(_id.getPosition().y-this.getPosition().y));
}

//! системная
//! Вернет true, если объекты пересекаются
/* if (a.Collision(b)) alert(1); */
function _isCollision(_id) {
 var result= false;
  if (
   (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
   (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
  ) result= true;
 return result;
}

//! системная
//! Вернет true, если объекты пересекаются
/* if (a.CollisionRadius(b)) alert(1); */
function _isCollisionRadius(_id) {
 var result= false;
  if (
   (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
   (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))  
  ) result= true;
 return result;
}

//! системная
//! Вернет true, если объект за пределами видимости сцены
/* a.lookScene(scene) */
function _lookScene(_scene) {
	var yes= true;
	if ((this.pos.x > _scene.view.x+_scene.width 
	|| this.pos.x+this.size.x < _scene.view.x) ||
	  (this.pos.y > _scene.view.y+_scene.height 
	|| this.pos.y+this.size.y < _scene.view.y)) yes= false;	
	return yes;
}

//! системная
// задает угол вращения
function _turn(_angle) {
	if (this.angle > 359) this.angle= 0;
	if (this.angle < 0) this.angle= 359;	
	 this.angle+= _angle;
}


//! системная
// задает угол вращения
function _setRotation(_angle) {
	_angle= _angle < 0 ? 360+_angle : (_angle > 359 ? 0 : _angle);
	this.angle= _angle;
}



//! системная
// столкновение с границами видимсти сцены
function _isCollisionScene(_scene) {
	var o={};
	
	if (this.pos.x+this.size.x >= _scene.view.x+_scene.width) o.x= 1;
	else	if (this.pos.x <= _scene.view.x) o.x= -1;
	else o.x= 0;
	
	if (this.pos.y+this.size.y >= _scene.view.y+_scene.height) o.y= 1;
	else	if (this.pos.y <= _scene.view.y) o.y= -1;
	else  o.y= 0;
	
	o.all= (o.x || o.y);
	
	return o;
}


//! системная 
//! Движение относительно угла поворота
function _moveDir(_speed)
{
 this.pos.x+= _speed*(Math.cos(Rad(this.angle)));
 this.pos.y+= _speed*(Math.sin(Rad(this.angle))); 
}


//! системная
// задает угол вращения на объект
function _setRotationTo(_to) {
 var dX= _to.getPosition().x - this.getPosition().x;
 var dY= _to.getPosition().y - this.getPosition().y;

	this.angle= Math.atan2(dY, dX);

	dbg(this.angle);
}


//! системная 
//! Создание базовой ноды
//! Не имеет функций отрисовки!
function createBaseNode(_pos, _size) {
 var o= {
  /* Параметры */
  visible    : true,
  pos        : _pos,
  size       : _size,
  parent     : false,
  angle      : 0,
  
  
  /* Функции */
  keyControl : _keyControl,
  move       : _move,
  getPosition : _getPosition,
  setVisible : _setVisible,
  setPosition : _setPosition,
  setSize    : _setSize,
  setParent   : _setParent,
  getDistance  : _getDistance,
  getDistanceXY : _getDistanceXY,
  collision  : _isCollision,
  collisionRadius : _isCollisionRadius,
  collisionScene : _isCollisionScene,
  lookScene   : _lookScene,
  turn   :   _turn,
  moveTo   :   _moveTo,
  moveDir   :   _moveDir,
  setRotation  :  _setRotation,
  setRotationTo  :  _setRotationTo  
 }
 return o;	
}







/*-------------- Сферы ----------------*/

//! Создание объекта
function createCircle(_pos, _radius, _color)
{
 var o= createBaseNode(_pos, vec2df(_radius*2, _radius*2));
 /*Свойства*/
 o.color= _color; 
 o.radius= _radius;
 
 /*Функции*/
 o.draw= _drawCircle;
 return o;
}


//! системная 
//! Отрисовка
function _drawCircle(_scene)
{
 if (this.visible  && this.lookScene(_scene))
 {  
  var newX= (this.parent?this.parent.pos.x:0);
  if (_scene.context.fillStyle != this.color) _scene.context.fillStyle= this.color;


  var newY= (this.parent?this.parent.pos.y:0); 
  
  _scene.context.beginPath();
  _scene.context.arc(newX+this.pos.x-_scene.view.x+this.radius, 
                     newY+this.pos.y-_scene.view.y+this.radius, 
                     this.radius, 0, 2*Math.PI,true);
  _scene.context.stroke();  
  _scene.context.fill();  
 }
}









/*-------------- Линии ----------------*/

//! Создание объекта "Линия"
function createLine(_pos, _points, _scale, _color, _width, _fill, _cFill)
{
 var o= createBaseNode(_pos, vec2df(0,0));
 
 /*Свойства*/
 o.color= _color; 
 o.points= _points;
 o.fill= _fill || false; 
 o.scale=  _scale || 0;
 o.cFill= _cFill;
 o.lineWidth= _width;
 
 
 /*Функции*/
 o.draw= _drawLine;
 return o;
}

//! системная 
//! Отрисовка линии
function _drawLine(_scene)
{
 if (this.visible && this.lookScene(_scene))
 { 
  _scene.context.strokeStyle= this.color;
  _scene.context.lineWidth = this.lineWidth;
  
  _scene.context.beginPath();
  _scene.context.moveTo(this.pos.x-_scene.view.x, 
                          this.pos.y-_scene.view.y);
  
  for (var i=0; i<this.points.length; i+=1) {
   _scene.context.lineTo(
     this.pos.x+this.points[i][0]*this.scale-_scene.view.x, 
     this.pos.y+this.points[i][1]*this.scale-_scene.view.y);   
  }
  _scene.context.stroke(); 
  if (this.fill) {  
   if (_scene.context.fillStyle != this.cFill) _scene.context.fillStyle= this.cFill;
   _scene.context.fill(); 
  }
 }
}




/*-------------- Текстовые объекты ----------------*/

//! Создание объекта
function createText(_scene, _pos, _text, _height, _font, _color)
{
 var o= createBaseNode(_pos, vec2df(0,0));
 /*Свойства*/
 o.color= _color; 
 o.scene= _scene;
 o.text= _text;
 o.font= _height+'px '+_font;
 
  o.size.x= _scene.context.measureText(_text).width;
  o.size.y= _height;

 /*Функции*/
 o.draw= _2D_drawText;
 return o;
}


//! системная 
//! Отрисовка прямоугольника
function  _2D_drawText()
{
 if (this.visible  && this.lookScene(this.scene))
 {  
  var newX= (this.parent?this.parent.pos.x:0);
  var newY= (this.parent?this.parent.pos.y:0); 

  this.scene.context.save();
  this.scene.context.translate(this.getPosition().x-this.scene.view.x, this.getPosition().y-this.scene.view.y);  
  this.scene.context.rotate(Rad(this.angle));
  this.scene.context.translate(-(this.getPosition().x-this.scene.view.x), -(this.getPosition().y-this.scene.view.y));
  
  if (this.context.fillStyle != this.color) this.scene.context.fillStyle= this.color;  
  
  this.scene.context.strokeStyle= this.strokeStyle;
  this.scene.context.textBaseline = 'top';
  this.scene.context.font= this.font; 
  this.scene.context.lineWidth = 2; 
  
  this.scene.context.strokeText(this.text, newX+this.pos.x-this.scene.view.x, newY+this.pos.y-this.scene.view.y);
  this.scene.context.fillText(this.text, newX+this.pos.x-this.scene.view.x, newY+this.pos.y-this.scene.view.y);   
 
  this.scene.context.restore();      
 }
}













/*-------------- Прямоугольники ----------------*/

//! Создание объекта "Прямоугольник"
function createRect(_pos, _size, _color)
{
 var o= createBaseNode(_pos, _size);
 /*Свойства*/
 o.color= _color; 
 
 /*Функции*/
 o.draw= _drawRect;
 return o;
}


//! системная 
//! Отрисовка прямоугольника
function _drawRect(_scene)
{
 if (this.visible  && this.lookScene(_scene))
 {  
  var newX= (this.parent?this.parent.pos.x:0);
  var newY= (this.parent?this.parent.pos.y:0); 

  _scene.context.save();
  _scene.context.translate(this.getPosition().x-_scene.view.x, this.getPosition().y-_scene.view.y);  
  _scene.context.rotate(Rad(this.angle));
  _scene.context.translate(-(this.getPosition().x-_scene.view.x), -(this.getPosition().y-_scene.view.y));

  if (_scene.context.fillStyle != this.color) _scene.context.fillStyle= this.color;
  _scene.context.fillRect(
  newX+this.pos.x-_scene.view.x, 
  newY+this.pos.y-_scene.view.y, 
  this.size.x, 
  this.size.y);

  _scene.context.restore();      
 }
}







/*------------- Изображения -------------*/

//! Создание карты изображения из имеющегося img
/*
 <img id="imageMap" src="image.jpg" alt="">
 
 imageMap= CreateImageMap('imageMap');
*/
function createImageMap(_id) {
 var o= {};
 o.img = obj(_id);
 o.img.onload= function() { o.img.style.display= 'none'; };
 /* Свойства */ 
 
 /* Функции */
 o.createAnimation= _createAnimation;
 return o; 
}


//! cистемная
//! Создает анимацию из карты изображения
/* anim= imageMap.CreateAnimation(
                 0, 0,   // Начальная позция первого кадра
                 96, 87, // Размер кадра
                 2       // Количество кадров
                 ); */
function _createAnimation(_sourceX, _sourceY, _sourceW, _sourceH, _frameCount) {
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



//! Создание анимационного спрайта
/* a= CreateSprite(
    20, 20, // Позиция в игре
    50, 50, // Размеры в игре
    anim    // Анимация
   ); */
function createSprite(_pos,
                      _size,
                      _animation
                     ) {
                       
 var o= createBaseNode(_pos, _size);
 o.tmpSpeed= 0;
 o.frame= 0;
 o.animation= _animation;
 
 /* Функции */
 o.draw= _drawImage;
 o.drawAnimate= _drawImageAnimate; 
 o.setAnimation= _setAnimation;
 return o;
}



//! системная
//! Рисует анимацию объекта с указанной скоростью
//! Чем выше значение _speed, тем ниже скорость
function _drawImageAnimate(_scene, _speed) { 
 if (this.visible && this.lookScene(_scene)) 
 {
  _speed= _speed || -1; 
  if (this.frame > this.animation.frameCount) 
  { this.frame= 0; }
  this.draw(_scene, this.frame+1);
  if (this.tmpSpeed > _speed)  
  { this.frame+=1; this.tmpSpeed= 0; }
  else { this.tmpSpeed+=1; }
 }
}




//! системная
//! Рисует отдельный кадр _frame для объекта
//! Не анимированный
function _drawImage(_scene, _frame) { 
 if (this.visible && this.lookScene(_scene))
 {
  _scene.context.save();
  _scene.context.translate(this.getPosition().x-_scene.view.x, this.getPosition().y-_scene.view.y);  
  _scene.context.rotate(Rad(this.angle));
  _scene.context.translate(-(this.getPosition().x-_scene.view.x), -(this.getPosition().y-_scene.view.y));
  
  _frame= _frame?(_frame-1):0;
  _scene.context.drawImage(
  this.animation.imageMap.img, 
  (this.animation.sourceX+this.animation.sourceW*_frame), this.animation.sourceY, 
  this.animation.sourceW, this.animation.sourceH,
  this.pos.x-_scene.view.x, this.pos.y-_scene.view.y, 
  this.size.x, this.size.y);
  
  _scene.context.restore();  
 }
}
  

function _setAnimation(_id) {
 if (this.animation != _id)
	{ this.animation= _id; }
}



















































