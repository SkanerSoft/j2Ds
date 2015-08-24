function obj(id){ return document.getElementById(id); }

function dbg(_text) {
	obj('hint').innerHTML= '<pre>[LOG]: '+_text+'</pre>';
}

function dbgA(_text) {
	obj('hint').innerHTML+= '<pre>[LOG]: '+_text+'</pre>';
}

function device() {
	var o= {};
	o.width=  (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(document.documentElement.clientWidth):parseInt(screen.width);
	o.height= (parseInt(document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(document.documentElement.clientHeight) : parseInt(screen.height);
	return o;
}

