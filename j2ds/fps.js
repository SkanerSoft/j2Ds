var createFpsManager = function () {
 return {

  /* Свойства */

  fps : 1,
  tmp_of_fps   : 1,
  tmp_of_time  : Date.now(),

  /* Методы */

  start : function () {
  	this.tmp_of_fps += 1;
  },

  end : function () {
   if (j2ds.now - this.tmp_of_time >= 1000) {
    this.fps = this.tmp_of_fps;
    this.tmp_of_fps = 1;
    this.tmp_of_time = j2ds.now;
   } 
  },

  getFPS : function () {
  	return (this.fps-1);
  }

 };
};