j2ds.loaded('math');

vec2df= function(_x, _y) { return { x: _x, y: _y }; }

vec2di= function(_x, _y) { return { x: Math.ceil(_x), y: Math.ceil(_y) }; }


Random= function(min, max) { 
 return Math.ceil(Math.random() * (max - min) + min);
}

Rad= function(_num) {
 return _num * (Math.PI / 180);
}

Grad= function(_num) {
 return (Math.PI / 180) / _num;
}


norm2df= function(_pos) {
var len = Math.sqrt(_pos.x * _pos.x + _pos.y * _pos.y);
 if (len) {
     _pos.x /= len;
     _pos.y /= len;
 }
 return _pos;
}

