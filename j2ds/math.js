function Random(min, max) { 
 return Math.ceil(Math.random() * (max - min) + min);
}

function Rad(_num) {
 return _num * (Math.PI / 180);
}

function Grad(_num) {
 return (Math.PI / 180) / _num;
}


function norm2df(_pos) {
var len = Math.sqrt(_pos.x * _pos.x + _pos.y * _pos.y);
 if (len) {
     _pos.x /= len;
     _pos.y /= len;
 }
 return _pos;
}

