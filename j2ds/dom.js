$= function(id){ return document.getElementById(id); }

dbg= function(_text) {
 console.log(_text);
}

device= function() {
	var o= {};
	o.width=  (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))   ? parseInt(document.documentElement.clientWidth):parseInt(screen.width);
	o.height= (parseInt(document.documentElement.clientHeight) < parseInt(screen.height)) ? parseInt(document.documentElement.clientHeight) : parseInt(screen.height);
	return o;
}

