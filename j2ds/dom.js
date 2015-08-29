function $(id){ return document.getElementById(id); }

function dbg(_text) {
	scene.drawText(vec2di(10, 10), _text)
}

function device() {
	var o= {};
	o.width=  (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(document.documentElement.clientWidth):parseInt(screen.width);
	o.height= (parseInt(document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(document.documentElement.clientHeight) : parseInt(screen.height);
	return o;
}

