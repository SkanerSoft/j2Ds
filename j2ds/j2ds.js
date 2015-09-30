'use strict';





/*----------- DOM ---------------*/
var $id = function (_id) {
 return (document.getElementById(_id));
};

var $name = function (_id) {
 return (document.getElementsByName(_id));
};

var $tag = function (_id) {
 return (document.getElementsByTagName(_id));
};

var $goURL = function (_url) {
	document.location.href = _url;
};





/*------------------ 2D движок --------------------*/
var j2ds = {
 vector : {},
 math : {},
 now : 0,
 dt : 0,
 framelimit : 60,
 sceneStartTime : 0,
 sceneSkipTime : 0,
 engine : false,
 ready : false,
 scripts : {},
 root : 'j2ds/',
 window : window,
 getInfo : false
};

j2ds.util = {
  isObject: function isObject(value) {
    return typeof value === 'object';
  },
  isFunction: function isFunction(value) {
    return typeof value === 'function';
  },
  inherits: function inherit(_child, _parent) {
    _child.prototype = Object.create(_parent.prototype);
    _child.prototype.constructor = _child;
  },
  extend: function extend(_) {
    var i = 1,
      len = arguments.length,
      key;

    if (len == 1) return _;

    if (len > 1) {
      for (; i < len; i++) {
        for (key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
          }
        }
      }

      return arguments[0];
    }

    return null;
  },
  extendObjectFromConstructor: function extendObjectFromPrototype(obj, Constructor) {
    Constructor.call(obj);
    this.extend(obj, Constructor.prototype);
  }
};


j2ds.EventEmitter = function EventEmitter() {
  this._events = {};
};

j2ds.EventEmitter.prototype.on = function(type, listener) {
  if (!j2ds.util.isFunction(listener)) {
    return false;
  }

  if (!this._events[type]) {
    this._events[type] = listener;
  } else if (j2ds.util.isObject(this._events[type])) {
    this._events[type].push(listener);
  } else {
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

j2ds.EventEmitter.prototype.emit = function(type, _) {
  var handler, len, args, i;

  if (!this._events) {
    this._events = {};
  }

  handler = this._events[type];

  if (handler === undefined) {
    return false;
  }

  if (j2ds.util.isFunction(handler)) {
    switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }
        handler.apply(this, args);
    }
  } else if (j2ds.util.isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++) {
      args[i - 1] = arguments[i];
    }

    len = handler.length;
    for (i = 0; i < len; i++) {
      handler[i].apply(this, args);
    }
  }

  return true;
};

// добавляем движку поведение менеджера эвентов
j2ds.util.extendObjectFromConstructor(j2ds, j2ds.EventEmitter);

j2ds.getInfo = function () {
	return ({
	 'name' : 'j2Ds',
	 'version' : '0.0.4',
	 'site' : 'https://github.com/SkanerSoft/J2ds',
	 'info' : 'j2Ds - HTML5 2D Game Engine',
	 'author' : 'Skaner'
	});
};





/*------------------- Математика --------------*/
j2ds.vector.vec2df = function (_x, _y) {
 return ({x: _x, y: _y});
};

j2ds.vector.vec2di = function (_x, _y) {
 return { x: (_x >> 0), y: (_y >> 0) };
};

j2ds.math.toInt = function (_number) {
	return ( _number >> 0 );
};

j2ds.math.rndColor = function (_min, _max, _alpha) {
 return ( 'rgba('+j2ds.math.random(_min, _max)+', '+j2ds.math.random(_min, _max)+', '+j2ds.math.random(_min, _max)+', '+_alpha+')' );
};

j2ds.math.random = function (_min, _max, _omitZero) {
 var rnd = (Math.floor(Math.random() * (_max - _min + 1) + _min));

 return (_omitZero && rnd == 0) ? j2ds.math.random(_min, _max, _omitZero) : rnd;
};

j2ds.math.rad = function (_num) {
 return _num * (Math.PI / 180);
};

/* функции */

j2ds.setWindow = function (_window) {
	j2ds.window = _window ? _window : window;
};

j2ds.device = function() {
	var o = {};
	o.width = (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(document.documentElement.clientWidth):parseInt(screen.width);
	o.height = (parseInt(document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(document.documentElement.clientHeight) : parseInt(screen.height);
	return (o);
};

j2ds.loaded = function(_id) {
 j2ds.scripts[_id] = true;
};

j2ds.include = function(_path) {
 var _id = _path.replace(/\//g, '');
 if (j2ds.scripts[_id]) { return 0; }

 var reader = new XMLHttpRequest();
 reader.open('GET', j2ds.root+_path+'.js', false);
 reader.send(null);
 var sourceCode = reader.responseText;

 j2ds.loaded(_id);

 eval(sourceCode);
};

// старт игры
j2ds.start = function(_engine, _framelimit) {
 j2ds.engine = _engine || function() { document.body.innerHTML = 'Пожалуйста, инициализируйте игровую функцию!'; };
 j2ds.framelimit = _framelimit || 60;
 j2ds.sceneSkipTime = 1000.0 / j2ds.framelimit;
 j2ds.lastTime = Date.now();
 j2ds.dt = 0;
 j2ds.sceneStartTime = j2ds.lastTime;
 j2ds.gameEngine();
};

// установка активного игрового состояния
j2ds.setActiveEngine = function(_engine) {
	j2ds.engine = _engine;
};

j2ds.gameEngine = function(){
 j2ds.now = Date.now();
 if (j2ds.now - j2ds.sceneStartTime > j2ds.sceneSkipTime)
 {
  j2ds.input.upd();
  j2ds.dt = (j2ds.now - j2ds.lastTime) / 100.0;
  if (j2ds.dt > j2ds.sceneSkipTime) {
   j2ds.dt = 0;
  }
  j2ds.sceneStartTime = j2ds.now;
  j2ds.engine();
  j2ds.lastTime = j2ds.now;
  j2ds.input.keyPress = [];
  j2ds.input.keyUp = [];
 }
 nextJ2dsGameStep(j2ds.gameEngine);
};

var nextJ2dsGameStep = (function() {
 return window.requestAnimationFrame ||
 window.webkitRequestAnimationFrame  ||
 window.mozRequestAnimationFrame     ||
 window.oRequestAnimationFrame       ||
 window.msRequestAnimationFrame      ||
 function (callback) {
  window.setTimeout(callback, 1000 / j2ds.framelimit);
 };
})();













/*----------------- INPUT -------------------*/
j2ds.input = {
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
 anyKey : false,
 writeMode : false,
 displayCursor : '',
 visible : true
};
j2ds.util.extendObjectFromConstructor(j2ds.input, j2ds.EventEmitter);
// Константы клавиш

j2ds.input.jKey = {
 'LEFT'      : 37,
 'RIGHT'     : 39,
 'UP'        : 38,
 'DOWN'      : 40,
 'SPACE'     : 32,
 'CTRL'      : 17,
 'SHIFT'     : 16,
 'ALT'       : 18,
 'ESC'       : 27,
 'ENTER'     : 13,
 'MINUS'     : 189,
 'PLUS'      : 187,
 'CAPS_LOCK' : 20,
 'BACKSPACE' : 8,
 'TAB'       : 9,
 'Q'         : 81,
 'W'         : 87,
 'E'         : 69,
 'R'         : 82,
 'T'         : 84,
 'Y'         : 89,
 'U'         : 85,
 'I'         : 73,
 'O'         : 79,
 'P'         : 80,
 'A'         : 65,
 'S'         : 83,
 'D'         : 68,
 'F'         : 70,
 'G'         : 71,
 'H'         : 72,
 'J'         : 74,
 'K'         : 75,
 'L'         : 76,
 'Z'         : 90,
 'X'         : 88,
 'V'         : 86,
 'B'         : 66,
 'N'         : 78,
 'M'         : 77,
 '0'         : 48,
 '1'         : 49,
 '2'         : 50,
 '3'         : 51,
 '4'         : 52,
 '5'         : 53,
 '6'         : 54,
 '7'         : 55,
 '8'         : 56,
 'C'         : 67,
 '9'         : 57,
 'NUM_0'     : 45,
 'NUM_1'     : 35,
 'NUM_2'     : 40,
 'NUM_3'     : 34,
 'NUM_4'     : 37,
 'NUM_5'     : 12,
 'NUM_6'     : 39,
 'NUM_7'     : 36,
 'NUM_8'     : 38,
 'NUM_9'     : 33,
 'NUM_MINUS' : 109,
 'NUM_PLUS'  : 107,
 'NUM_LOCK'  : 144,
 'F1'        : 112,
 'F2'        : 113,
 'F3'        : 114,
 'F4'        : 115,
 'F5'        : 116,
 'F6'        : 117,
 'F7'        : 118,
 'F8'        : 119,
 'F9'        : 120,
 'F10'       : 121,
 'F11'       : 122,
 'F12'       : 123
};

j2ds.input.keyList = function () {
 var o = [];
	for (var i in j2ds.input.jKey) {
  o.push(i);
	}
	return (o);
};

j2ds.input.isKeyDown = function(_code) {
 return (this.keyDown[this.jKey[_code]]);
};

j2ds.input.isKeyPress = function(_code) {
 return (this.keyPress[this.jKey[_code]]);
};

j2ds.input.isKeyUp = function(_code) {
return (this.keyUp[this.jKey[_code]]);
};

j2ds.input.getPosition = function() {
return (j2ds.vector.vec2df(this.pos.x, this.pos.y));
};

j2ds.input.setWriteMode = function (_true) {
 j2ds.input.writeMode = _true;
};

j2ds.input.isWriteMode = function () {
 return (j2ds.input.writeMode);
};

j2ds.input.keyEvent = function(e) {
 if (e.type == 'keydown') {
  if (!j2ds.input.keyPressed[e.keyCode]) {
   j2ds.input.keyPress[e.keyCode] = true;
   j2ds.input.keyPressed[e.keyCode] = true;
   this.emit('keypress', e.keyCode);
  }
  if (!j2ds.input.writeMode) {
   e.preventDefault();
  }
 } else if (e.type == 'keyup') {
  if (j2ds.input.keyPressed[e.keyCode]) {
   j2ds.input.keyPress[e.keyCode] = false;
   j2ds.input.keyPressed[e.keyCode] = false;
   j2ds.input.keyUp[e.keyCode] = true;
   j2ds.input.keyUped = true;
   e.preventDefault();
  }
 } else if (e.type == 'keypress' && (j2ds.input.writeMode)) {
  var _char = '';
  if (e.which != 0 && e.charCode != 0) {
   if (e.which >= 32) {
    _char = String.fromCharCode(e.which);
   }
  }
  this.emit('input', _char);
 }

 j2ds.input.keyDown[e.keyCode] = (e.type== 'keydown')&&(!j2ds.input.canceled);
 j2ds.input.keyDown[e.keyCode] && j2ds.input.keyPressed[e.keyCode] ? this.emit('keydown', e.keyCode) : '';
 j2ds.input.anyKey = e.keyCode;
 return (false);
};

//! системная
// Вернет true, если мышь наxодится над объектом
j2ds.input.cancel = function(_id) {
 if (!_id) {
  j2ds.input.canceled = true;
  j2ds.input.falseInput();
  j2ds.input.keyDown = [];
 }
 else {
  j2ds.input.keyDown[j2ds.input.jKey[_id]] = false;
 }
};

//! системная
// Вернет true, если мышь назодится над объектом
j2ds.input.onNode = function(_id) {
 return ( (this.pos.x > _id.pos.x && this.pos.x < _id.pos.x+_id.size.x) &&
          (this.pos.y > _id.pos.y && this.pos.y < _id.pos.y+_id.size.y) );
};

j2ds.input.upd = function() {
 var dX = j2ds.scene.canvas.offsetWidth / j2ds.scene.width;
 var dY = j2ds.scene.canvas.offsetHeight / j2ds.scene.height;
 this.x = (this.abs.x/dX);
 this.y = (this.abs.y/dY);
 this.pos.x = j2ds.scene.view.x + this.x;
 this.pos.y = j2ds.scene.view.y + this.y;
};


j2ds.input.cursorPosition = function(e) {
 if (!j2ds.input.touch) {
  if (document.all) {
   var x = e.x + document.body.scrollLeft,
   y = e.y + document.body.scrollTop;
  } else {
   var x = e.pageX, // Координата X курсора
   y = e.pageY;// Координата Y курсора
  }
  j2ds.input.abs.x = x;
  j2ds.input.abs.y = y;
 }
};


j2ds.input.onClick = function(e) {
 if (!e.which && e.button) {
  if (e.button & 1) e.which = 1;
  else if (e.button & 4) e.which = 2;
       else if (e.button & 2) e.which = 3;
 }
 j2ds.input.lClick = (e.which== 1?true:false)&&(!j2ds.input.canceled);
 j2ds.input.mClick = (e.which== 2?true:false)&&(!j2ds.input.canceled);
 j2ds.input.rClick = (e.which== 3?true:false)&&(!j2ds.input.canceled);
 j2ds.window.focus();
 e.preventDefault();
 return false;
};

j2ds.input.onTouch = function(e) {
 j2ds.input.abs.x = e.touches[0].pageX;
 j2ds.input.abs.y = e.touches[0].pageY;
 j2ds.input.lClick = true&&(!j2ds.input.canceled);
 j2ds.input.touch = true&&(!j2ds.input.canceled);
 j2ds.window.focus();
 e.preventDefault();
 return false;
};

j2ds.input.falseInput = function() {
 j2ds.input.lClick = false;
 j2ds.input.mClick = false;
 j2ds.input.rClick = false;
};

j2ds.input.setCursorImage = function (_curImg) {
	$tag('body')[0].style.cursor = 'url("'+_curImg+'"), auto';
};

j2ds.input.setVisible = function (_true) {
 j2ds.input.visible = _true;
 if (!_true) {
  j2ds.input.displayCursor = $tag('body')[0].style.cursor;
  $tag('body')[0].style.cursor = 'none';
 } else {
  $tag('body')[0].style.cursor = j2ds.input.displayCursor;
 }
};


j2ds.input.init = function() {
 j2ds.window.focus();
 j2ds.window.ontouchstart = j2ds.input.onTouch;
 j2ds.window.ontouchmove = j2ds.input.onTouch;
 j2ds.window.ontouchend = function() { j2ds.input.canceled = false; j2ds.input.falseInput(); };
 j2ds.window.oncontextmenu = function() { return (false); }
 j2ds.window.onselectstart = j2ds.window.oncontextmenu;
 j2ds.window.ondragstart = j2ds.window.oncontextmenu;
 j2ds.window.onmousedown = j2ds.input.onClick;
 j2ds.window.onmouseup = function() { j2ds.input.canceled = false; j2ds.input.falseInput(); };
 j2ds.window.onmousemove = j2ds.input.cursorPosition;
 j2ds.window.onkeydown = function(e) { j2ds.input.keyEvent(e); };
 j2ds.window.onkeyup = function(e) { j2ds.input.canceled = false; j2ds.input.keyEvent(e); };
 j2ds.window.onkeypress = function(e) { j2ds.input.keyEvent(e); };
};













/*---------------- слои -------------------*/

j2ds.layers = {};
j2ds.layers.list = {};

j2ds.layers.layer = function (_id) {
	return j2ds.layers.list[_id];
};

j2ds.layers.add = function (_id, _index) {

 if (j2ds.layers.list[_id]) {
  return (false);
 }

	var o = {};
	o.layerName = _id;
	o.canvas = document.createElement('canvas');
	o.canvas.width = j2ds.scene.width;
	o.canvas.height = j2ds.scene.height;
	o.width = j2ds.scene.width;
	o.height = j2ds.scene.height;
	o.context = o.canvas.getContext('2d');
	o.context.shadowColor = 'rgba(0,0,0,0)';
 o.canvas.style.zIndex = 1000+_index;
 o.canvas.style.position = 'fixed';
 o.canvas.style.left = '0px';
 o.canvas.style.top = '0px';
 o.canvas.id = _id;
 o.alpha = 1;
 o.angle = 0;

 o.onContext = function (_func) {
 	_func(this.context);
 };


 o.fill = function (_color) {
 	this.context.fillStyle = _color;
 	this.context.fillRect(0, 0, this.width, this.height);
 };

 o.setAlpha = function (_alpha) {
  this.canvas.style.opacity = _alpha;
  this.alpha = _alpha;
 };

 o.getAlpha = function () {
  return (this.alpha);
 };

 o.setVisible = function (_visible) {
 	if (_visible) {
 	 this.canvas.style.display = 'block';
  } else {
  	this.canvas.style.display = 'none';
  }
 };

 o.setIndex = function (_index) {
 	this.canvas.style.zIndex = _index;
 };

 o.setPosition = function (_pos) {
 	this.canvas.style.top = _pos.y+'px';
 	this.canvas.style.left = _pos.x+'px';
 };

 o.getPosition = function () {
 	return j2ds.vector.vec2di(parseInt(this.canvas.style.left), parseInt(this.canvas.style.top));
 };

 o.clear = function () {
 	this.context.clearRect(0, 0, this.width, this.height);
 };

 o.clearNode = function (_node) {
 	if (_node.isLookScene()) {
   this.context.clearRect(-5+_node.pos.x-j2ds.scene.view.x, -5+_node.pos.y-j2ds.scene.view.y, _node.size.x+10, _node.size.y+10);
 	}
 };

 o.clearRect = function (_pos, _size) {
  this.context.clearRect(_pos.x-j2ds.scene.view.x, _pos.y-j2ds.scene.view.y, _size.x, _size.y);
 };

	j2ds.layers.list[_id] = (o);
	if (j2ds.ready) {
	 document.body.appendChild(j2ds.layers.list[_id].canvas);
	}

 return (o);
};



/*----------------- сцена ---------------------*/

j2ds.scene = {
 layerName : 'sceneNode'
};
j2ds.util.extendObjectFromConstructor(j2ds.scene, j2ds.EventEmitter);

j2ds.scene.layers = j2ds.layers;

/*функции*/


j2ds.scene.setGameState = function(_engine) {
 j2ds.setActiveEngine(_engine);
 this.emit('gameStateChanged');
};

j2ds.scene.start = function (_engine, _framelimit) {
 j2ds.input.init();
 this.emit('beforeStart');
 j2ds.start(_engine, _framelimit);
 this.emit('afterStart');
};

j2ds.scene.fullScreen = function(_true) {
 var layer;
 if (_true) {
  for (var i in j2ds.layers.list)
  {
   layer = j2ds.layers.list[i].canvas;
   layer.style.width = j2ds.device().width+'px';
   layer.style.height = j2ds.device().height+'px';
  }
 } else {
  for (var i in j2ds.layers.list)
  {
   layer = j2ds.layers.list[i].canvas;
   layer.style.width = j2ds.scene.width+'px';
   layer.style.height = j2ds.scene.height+'px';
  }
 }
};

// Устанавливает позицию для камеры
j2ds.scene.setViewPosition = function(_pos) {
	j2ds.scene.view.x = _pos.x - Math.ceil(j2ds.scene.width/2);
	j2ds.scene.view.y = _pos.y - Math.ceil(j2ds.scene.height/2);
};

//! Движение "камеры" вслед за объектом
j2ds.scene.setViewFocus = function(_id, _d) {
 var _dX = 0, _dY = 0;
 if (_d) {
  _dX = _d.x;
  _dY = _d.y;
 }
	j2ds.scene.view.x = _id.getPosition().x - Math.ceil(j2ds.scene.width/2)+_dX;
	j2ds.scene.view.y = _id.getPosition().y - Math.ceil(j2ds.scene.height/2)+_dY;
};

//! Движение "камеры" или же вида
j2ds.scene.viewMove = function(_pos) {
	j2ds.scene.view.x+=_pos.x;
	j2ds.scene.view.y+=_pos.y;
};

//! Очистка отрисованного предыдущего кадра сцены
j2ds.scene.clear = function() {
 if (!j2ds.scene.cancelClear) {
  j2ds.scene.context.clearRect(0, 0, j2ds.scene.width, j2ds.scene.width);
  j2ds.scene.cancelClear = false;
 }
};

j2ds.scene.onContext = function (_func) {
 _func(j2ds.scene.context);
};

// инициализация сцены
j2ds.scene.init = function(_w, _h) {

 this.emit('beforeInit');

	j2ds.scene.width = _w;
	j2ds.scene.height = _h;

 j2ds.layers.add('sceneNode', 0);

 j2ds.scene.context = j2ds.layers.layer('sceneNode').context;
 j2ds.scene.canvas = j2ds.layers.layer('sceneNode').canvas;

 j2ds.scene.cancelClear = false;

 /* Вид "камеры" */
 j2ds.scene.view = j2ds.vector.vec2df(0,0);

 this.emit('afterInit');

 j2ds.window.onload = function () {
 	for (var i in j2ds.layers.list) {
   document.body.appendChild(j2ds.layers.layer(i).canvas);
  }
  j2ds.ready = true;
  j2ds.emit('ready');
 };
};




/*--------------- Объекты ----------------*/
j2ds.Object= {
 inherit : function (_parent, _child) {
  _child.prototype = Object.create(_parent.prototype);
  _child.prototype.constructor = _child;
 }
};



/*------------------ базовый объект -------------------*/

j2ds.scene.addBaseNode= function (_pos, _size) {
	return (new j2ds.scene.BaseNode(_pos, _size));
};

j2ds.scene.BaseNode = function(_pos, _size) {
  this.visible  = true;
  this.alpha    = 1;
  this.pos      = _pos;
  this.size     = _size;
  this.parent   = false;
  this.angle    = 0;
  this.layer    = j2ds.scene;
 	this.box      = {
	                  offset : {x : 0, y : 0},
	                  size : {x : 0, y : 0}
	                 };
};

j2ds.scene.BaseNode.prototype.resizeBox = function (_offset, _size) {
	this.box.offset = _offset;
	this.box.size = _size;
};

j2ds.scene.BaseNode.prototype.setLayer = function (_layer) {
	this.layer = _layer ? j2ds.layers.layer(_layer) : j2ds.scene;
};

j2ds.scene.BaseNode.prototype.getLayer = function () {
	return (this.layer);
};

j2ds.scene.BaseNode.prototype.setVisible = function(_visible) {
 this.visible = _visible;
};

j2ds.scene.BaseNode.prototype.setAlpha = function(_alpha) {
 if (_alpha < 0) _alpha = 0;
 if (_alpha > 1) _alpha = 1;
 this.alpha = _alpha;
};

j2ds.scene.BaseNode.prototype.moveTo = function(_to, _d) {
 _d = _d || j2ds.vector.vec2df(0,0);
 _to = _to.getPosition();
 this.move(j2ds.vector.vec2df(
 ((_to.x - this.getPosition().x) / 5) + _d.x,
 ((_to.y - this.getPosition().y) / 5) + _d.y
 ));
};

j2ds.scene.BaseNode.prototype.setPosition = function(_pos) {
 this.pos = j2ds.vector.vec2df(_pos.x-Math.ceil(this.size.x/2), _pos.y-Math.ceil(this.size.y/2) );
};

j2ds.scene.BaseNode.prototype.move = function(_pos) {
 this.pos.x+= _pos.x;
 this.pos.y+= _pos.y;
};

j2ds.scene.BaseNode.prototype.getPosition = function() {
 return (j2ds.vector.vec2df(this.pos.x+Math.ceil(this.size.x/2), this.pos.y+Math.ceil(this.size.y/2)));
};

j2ds.scene.BaseNode.prototype.setSize = function(_size) {
 this.size = _size;
};

j2ds.scene.BaseNode.prototype.getSize = function() {
 return (this.size);
};

j2ds.scene.BaseNode.prototype.setParent = function(_id) {
	this.parent = _id;
};

j2ds.scene.BaseNode.prototype.getDistance = function(_id) {
	return Math.ceil( Math.sqrt(
	  Math.pow(_id.getPosition().x - this.getPosition().x, 2)+
	  Math.pow(_id.getPosition().y - this.getPosition().y, 2)
	                  )
	       );
};

j2ds.scene.BaseNode.prototype.getDistanceXY = function(_id) {
	return j2ds.vector.vec2df(Math.abs(_id.getPosition().x-this.getPosition().x), Math.abs(_id.getPosition().y-this.getPosition().y));
};

j2ds.scene.BaseNode.prototype.isIntersect = function(_id) {
 var pos = {
  x1 : this.pos.x+this.box.offset.x,
  x2 : _id.pos.x+_id.box.offset.x,
  y1 : this.pos.y+this.box.offset.y,
  y2 : _id.pos.y+_id.box.offset.y
 };

 var size = {
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

j2ds.scene.BaseNode.prototype.isCollision = function(_id) {
var result = false;
 if (
 (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
 (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))
 ) {
    result = true;
   }
 return (result);
};

j2ds.scene.BaseNode.prototype.isCollisionRadius = function(_id) {
var result = false;
 if (
 (this.getDistanceXY(_id).x < (this.size.x/2 + _id.size.x/2)) &&
 (this.getDistanceXY(_id).y < (this.size.y/2 + _id.size.y/2))
 ) {
    result = true;
   }
 return (result);
};

j2ds.scene.BaseNode.prototype.isLookScene = function() {
	var yes = true;
	if ((this.pos.x > j2ds.scene.view.x+j2ds.scene.width ||
	     this.pos.x+this.size.x < j2ds.scene.view.x) ||
	  (this.pos.y > j2ds.scene.view.y+j2ds.scene.height ||
	   this.pos.y+this.size.y < j2ds.scene.view.y)) {
	    yes = false;
	   }
	return (yes);
};

j2ds.scene.BaseNode.prototype.turn = function(_angle) {
	this.angle = (this.angle % 360);
	this.angle+= _angle;
};

j2ds.scene.BaseNode.prototype.setRotation = function(_angle) {
	_angle = _angle < 0 ? 360+_angle : (_angle > 359 ? 0 : _angle);
	this.angle = _angle;
};

j2ds.scene.BaseNode.prototype.isCollisionScene = function() {
	var o = {};

	if (this.pos.x+this.size.x >= j2ds.scene.view.x+j2ds.scene.width) o.x = 1;
	else	if (this.pos.x <= j2ds.scene.view.x) { o.x = -1; }
	     else { o.x = 0; }

	if (this.pos.y+this.size.y >= j2ds.scene.view.y+j2ds.scene.height) o.y = 1;
	else	if (this.pos.y <= j2ds.scene.view.y) { o.y = -1; }
	     else { o.y = 0; }

	o.all = (o.x || o.y);

	return (o);
};

j2ds.scene.BaseNode.prototype.moveDir = function(_speed) {
 this.pos.x+= _speed*(Math.cos(j2ds.math.rad(this.angle)));
 this.pos.y+= _speed*(Math.sin(j2ds.math.rad(this.angle)));
};

j2ds.scene.BaseNode.prototype.drawBox = function() {
 var context = this.layer.context;
 context.strokeStyle = 'black';

 context.beginPath();
 context.rect(
 this.pos.x-j2ds.scene.view.x,
 this.pos.y-j2ds.scene.view.y,
 this.size.x, this.size.y);
 context.stroke();

 context.strokeStyle = 'yellow';

 context.beginPath();
 context.rect(this.box.offset.x+this.pos.x-j2ds.scene.view.x, this.box.offset.y+this.pos.y-j2ds.scene.view.y,
              this.box.size.x+this.size.x, this.box.size.y+this.size.y);
 context.stroke();
};







/*------------------ текст --------------------*/


j2ds.scene.addTextNode = function (_pos, _text, _sizePx, _color, _family) {
	return (new j2ds.scene.TextNode(_pos, _text, _sizePx, _color, _family));
};

j2ds.scene.TextNode = function(_pos, _text, _sizePx, _color, _family) {

 j2ds.scene.BaseNode.call(this, _pos, j2ds.vector.vec2df(0, 0));

 /*Свойства*/

 this.vAlign = 'top';
 this.hAlign = 'left';
 this.color = _color ? _color : 'black';

 this.family = _family ? _family : 'sans-serif';
 this.sizePx = _sizePx;

 this.font = this.sizePx+'px '+ this.family;

 this.fullText = _text;
 this.maxWidth = 0;
 this.lines = _text.split("\n");

 j2ds.scene.context.font = this.font;

 for (var i = 0, len = this.lines.length; i < len; i += 1) {
  this.maxWidth = (this.maxWidth < j2ds.scene.context.measureText(this.lines[i]).width ?
                                   j2ds.scene.context.measureText(this.lines[i]).width :
                                   this.maxWidth);
 }

 this.size.x = this.maxWidth;
 this.size.y = this.lines.length * this.sizePx;
};

j2ds.util.inherits(j2ds.scene.TextNode, j2ds.scene.BaseNode);

j2ds.scene.TextNode.prototype.setSize = function (_sizePx) {
 this.sizePx = _sizePx;
 this.font = this.sizePx+'px '+ this.family;
 j2ds.scene.context.font = this.font;

 for (var i = 0, len = this.lines.length; i < len; i += 1) {
  this.maxWidth = (this.maxWidth < j2ds.scene.context.measureText(this.lines[i]).width ?
                                   j2ds.scene.context.measureText(this.lines[i]).width :
                                   this.maxWidth);
 }
 this.size.x = this.maxWidth;
 this.size.y = this.lines.length * this.sizePx;
};

j2ds.scene.TextNode.prototype.getSize = function () {
	return (this.sizePx);
};

j2ds.scene.TextNode.prototype.drawSimpleText = function (_text, _color, _pos) {
 var context = this.layer.context;
 context.fillStyle = _color ? _color : this.color;
 context.textAlign = this.hAlign;
 context.textBaseline = this.vAlign;
 context.font = this.font;

 var lines = _text.split("\n");

 var pos = _pos ? _pos : this.pos;

 for (var i = 0, len = lines.length; i < len; i += 1) {
  context.fillText(lines[i], pos.x, pos.y+this.sizePx*i);
 }
};

j2ds.scene.TextNode.prototype.getText = function () {
	return (this.fullText);
};

j2ds.scene.TextNode.prototype.setText = function (_text) {
 this.fullText = _text;
 this.maxWidth = 0;
 this.lines = _text.split("\n");

 j2ds.scene.context.font = this.font;

 for (var i = 0, len = this.lines.length; i < len; i += 1) {
  this.maxWidth = (this.maxWidth < j2ds.scene.context.measureText(this.lines[i]).width ?
                                   j2ds.scene.context.measureText(this.lines[i]).width :
                                   this.maxWidth);
 }
 this.size.x = this.maxWidth;
 this.size.y = this.lines.length * this.sizePx;
};

j2ds.scene.TextNode.prototype.draw = function() {
 var context = this.layer.context;
 if (this.visible && this.isLookScene()) {
  if (this.alpha != 1) {
   var tmpAlpha = context.globalAlpha;
   context.globalAlpha = this.alpha;
  }

  if (this.angle)
  {
   context.save();
   context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);
   context.rotate(j2ds.math.rad(this.angle));
   context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
  }

  context.fillStyle = this.color;
  context.textAlign = this.hAlign;
  context.textBaseline = this.vAlign;
  context.font = this.font;

  for (var i = 0, len = this.lines.length; i < len; i += 1) {
   context.fillText(this.lines[i], this.pos.x, this.pos.y+this.sizePx*i);
  }

  if (this.angle) { context.restore(); }

  if (this.alpha != 1) {
   context.globalAlpha = tmpAlpha;
  }
 }
};









/*------------------ окружность --------------------*/

j2ds.scene.addCircleNode = function (_pos, _radius, _color) {
	return (new j2ds.scene.CircleNode(_pos, _radius, _color));
};

j2ds.scene.CircleNode = function(_pos, _radius, _color) {

 j2ds.scene.BaseNode.call(this, _pos, j2ds.vector.vec2df(_radius*2, _radius*2));

 /*Свойства*/
 this.color = _color;
 this.radius = _radius;
};

j2ds.util.inherits(j2ds.scene.CircleNode, j2ds.scene.BaseNode);

j2ds.scene.CircleNode.prototype.draw = function() {
 var context = this.layer.context;
 if (this.visible && this.isLookScene()) {
  if (this.alpha != 1) {
   var tmpAlpha = context.globalAlpha;
   context.globalAlpha = this.alpha;
  }
  context.fillStyle = this.color;

  context.beginPath();
  context.arc(this.pos.x-j2ds.scene.view.x+this.radius,
  this.pos.y-j2ds.scene.view.y+this.radius,
  this.radius, 0, 2*Math.PI,true);
  context.stroke();
  context.fill();

  if (this.alpha != 1) {
   context.globalAlpha = tmpAlpha;
  }
 }
};









/*-------------------- линии ----------------------*/

j2ds.scene.addLineNode = function (_pos, _points, _scale, _color, _width, _fill, _cFill) {
	return (new j2ds.scene.LineNode(_pos, _points, _scale, _color, _width, _fill, _cFill));
};

j2ds.scene.LineNode = function(_pos, _points, _scale, _color, _width, _fill, _cFill) {

 j2ds.scene.BaseNode.call(this, _pos, j2ds.vector.vec2df(0,0))

 /*Свойства*/
 this.color = _color;
 this.points = _points;
 this.fill = _fill || false;
 this.scale = _scale || 0;
 this.cFill = _cFill;
 this.lineWidth = _width;
};

j2ds.util.inherits(j2ds.scene.LineNode, j2ds.scene.BaseNode);

j2ds.scene.LineNode.prototype.draw = function() {
 var context = this.layer.context;
 if (this.visible && this.isLookScene()) {

  if (this.alpha != 1) {
   var tmpAlpha = context.globalAlpha;
   context.globalAlpha = this.alpha;
  }

  context.strokeStyle = this.color;
  context.lineWidth = this.lineWidth;

  context.beginPath();
  context.moveTo(this.pos.x-j2ds.scene.view.x,
  this.pos.y-j2ds.scene.view.y);

  for (var i=0, len = this.points.length;i<len;i+=1) {
   context.lineTo(
   this.pos.x+this.points[i][0]*this.scale-j2ds.scene.view.x,
   this.pos.y+this.points[i][1]*this.scale-j2ds.scene.view.y);
  }

  context.stroke();
  if (this.fill) {
   context.fillStyle = this.cFill;
   context.fill();
  }

  if (this.alpha != 1) {
   context.globalAlpha = tmpAlpha;
  }
 }
};









/*--------------------- прямоугольники ------------------------*/

j2ds.scene.addRectNode = function (_pos, _size, _color) {
	return (new j2ds.scene.RectNode(_pos, _size, _color));
};

j2ds.scene.RectNode = function(_pos, _size, _color) {

 j2ds.scene.BaseNode.call(this, _pos, _size)

 this.color = _color;
};

j2ds.util.inherits(j2ds.scene.RectNode, j2ds.scene.BaseNode);

j2ds.scene.RectNode.prototype.draw = function() {
 var context = this.layer.context;
 if (this.visible  && this.isLookScene()) {

  if (this.alpha != 1) {
   var tmpAlpha = context.globalAlpha;
   context.globalAlpha = this.alpha;
  }

  if (this.angle)
  {
   context.save();
   context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);
   context.rotate(j2ds.math.rad(this.angle));
   context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
  }

  context.fillStyle = this.color;

  context.fillRect(
  this.pos.x-j2ds.scene.view.x,
  this.pos.y-j2ds.scene.view.y,
  this.size.x, this.size.y);

  if (this.angle) { context.restore(); }

  if (this.alpha != 1) {
   context.globalAlpha = tmpAlpha;
  }
 }
};









/*--------------------- изображения ---------------------*/

j2ds.scene.texture = {
 loadImageMap    : false,   // загрузка из файла
 createImageMap : false,    // создание анимации напрямую, минуя imageMap
 templates : {}
};

j2ds.scene.texture.createImageMap = function(_w, _h, _func) {
 var o = {
  img : null,
  width : _w,
  height : _h
 };

 o.img = document.createElement('canvas');
 o.context = o.img.getContext('2d');
 o.img.width = o.width;
 o.img.height = o.height;

 _func(o.context);

 /* Функции */
 o.getAnimation = function(_sourceX, _sourceY, _sourceW, _sourceH, _frameCount) {
  var o = {
   imageMap : this,
   sourceX : _sourceX,
   sourceY : _sourceY,
   sourceW : _sourceW,
   sourceH : _sourceH,
   frameCount : _frameCount-1
  };
  return (o);
 };

 return (o);
};

j2ds.scene.texture.loadImageMap = function(path) {
 var o = {
  img : null,
  width : 0,
  height : 0,
  loaded : false
 };

 o.img = document.createElement('img');
 o.crossOrigin = 'anonymous';
 o.img.src = path;
 o.img.onload = function() {
  o.width = o.img.width;
  o.height = o.img.height;
  o.loaded = true;
 };
 /* Свойства */

 /* Функции */
 o.getAnimation = function(_sourceX, _sourceY, _sourceW, _sourceH, _frameCount) {
  var o = {
   imageMap : this,
   sourceX : _sourceX,
   sourceY : _sourceY,
   sourceW : _sourceW,
   sourceH : _sourceH,
   frameCount : _frameCount-1
  };
  return (o);
 };

 return (o);
};


j2ds.scene.addSpriteNode = function (_pos, _size, _animation) {
	return (new j2ds.scene.SpriteNode(_pos, _size, _animation));
};

j2ds.scene.SpriteNode = function(_pos, _size, _animation) {

 j2ds.scene.BaseNode.call(this, _pos, _size);

 this.tmpSpeed = 0;
 this.frame = 0;
 this.animation = _animation;
 this.flip = {x:false, y:false};

};

j2ds.util.inherits(j2ds.scene.SpriteNode, j2ds.scene.BaseNode);

j2ds.scene.SpriteNode.prototype.setFlip = function(_x, _y) {
 this.flip = {x:_x, y:_y};
};

j2ds.scene.SpriteNode.prototype.draw = function(_speed) {
 if (this.visible && this.isLookScene()) {
  _speed = _speed || 1;

  if (this.frame > this.animation.frameCount) {
   this.frame = 0;
  }
  this.drawFrame(this.frame+1);

  if (this.tmpSpeed > _speed) {
   this.frame+=1;
   this.tmpSpeed = 0;
  }
  else {
   this.tmpSpeed+=1;
  }
 };
};

 // отрисовка одного кадра
j2ds.scene.SpriteNode.prototype.drawFrame = function(_frame) {
 var context = this.layer.context;
 if (this.visible && this.isLookScene()) {

  if (this.alpha != 1) {
   var tmpAlpha = context.globalAlpha;
   context.globalAlpha = this.alpha;
  }

  if (this.angle || this.flip.x || this.flip.y)
  {
   context.save();
   context.translate(this.getPosition().x-j2ds.scene.view.x, this.getPosition().y-j2ds.scene.view.y);
   context.rotate(j2ds.math.rad(this.angle));
   context.scale(this.flip.x ? -1 : 1, this.flip.y ? -1 : 1);
   context.translate(-(this.getPosition().x-j2ds.scene.view.x), -(this.getPosition().y-j2ds.scene.view.y));
  }

  _frame = _frame?(_frame-1):0;

  context.drawImage(
  this.animation.imageMap.img,
  (this.animation.sourceX+(this.animation.sourceW*_frame)), this.animation.sourceY,
  this.animation.sourceW, this.animation.sourceH,
  this.pos.x-j2ds.scene.view.x, this.pos.y-j2ds.scene.view.y,
  this.size.x, this.size.y);

  if (this.angle || this.flip.x || this.flip.y) {context.restore(); }

  if (this.alpha != 1) {
   context.globalAlpha = tmpAlpha;
  }
 }
};

j2ds.scene.SpriteNode.prototype.setAnimation = function(_id) {
 if (this.animation != _id)	{
	 this.animation = _id;
	}
};



/*----------- шаблоны текстур -------------*/

j2ds.scene.texture.templates.ellips = function (_context, _size, _color) {

};

j2ds.scene.texture.templates.fillRect = function (_context, _size, _color) {
 _context.fillStyle = _color;
 _context.fillRect(0, 0, _size.x, _size.y);
};

j2ds.scene.texture.templates.strokeRect = function (_context, _size, _color, _lineWidth) {
 _context.strokeStyle = _color;
 _context.lineWidth = _lineWidth;
 _context.strokeRect(0, 0, _size.x, _size.y);
};

j2ds.scene.texture.templates.gradientL = function (_context, _size, _colors, _izHorizontal) {
 var gradient = _context.createLinearGradient(0, 0, _size.x, 0);
 var step = 1 / _colors.length;
 if (!_izHorizontal) {
  gradient = _context.createLinearGradient(0, 0, 0, _size.y);
 }
 for (var i = step/2, j = 0; j < _colors.length; j+=1, i+=step) {
  gradient.addColorStop(i, _colors[j]);
 }
 _context.fillStyle = gradient;
 _context.fillRect(0, 0, _size.x, _size.y);
};

j2ds.scene.texture.templates.gradientR = function (_context, _size, _pos1, _r1, _pos2, _r2, _colors) {
	var gradient = _context.createRadialGradient(_pos1.x, _pos1.y, _r1, _pos2.x, _pos2.y, _r2);
	var step = 1 / _colors.length;
 for (var i = step/2, j = 0; j < _colors.length; j+=1, i+=step) {
  gradient.addColorStop(i, _colors[j]);
 }
 _context.fillStyle = gradient;
 _context.fillRect(0, 0, _size.x, _size.y);
};












/*--------------- Локальное хранилище ----------------*/



j2ds.createLocal = function(_id) {
var o = {};
o.id = _id;
o.ls = j2ds.window.localStorage ? j2ds.window.localStorage : false;

if (!o.ls) alert('J2ds ERROR in "createLocal('+_id+')" \n' + 'Объект "localStorage" не поддерживается.');
/*Свойства*/

/*Функции*/
o.saveNode = function (_name, _o) {
 if (!this.ls) return false;
  this.ls.setItem(this.id+_name, JSON.stringify(_o));
 };

 o.load = function (_name) {
  if (!this.ls) { return (false); }
  return (this.ls.getItem(this.id+_name));
 };

 o.is = function (_name) {
 if (!this.ls) { return (false); }
  return !!(this.ls.getItem(this.id+_name));
 }

 o.save = function (_name, _value) {
  if (!this.ls) { return (false); }
  this.ls.setItem(this.id+_name, _value);
 }

 o.loadNode = function (_name) {
 if (!this.ls) { return (false); }
  return JSON.parse(this.ls.getItem(this.id+_name));
 }

 return (o);
};
