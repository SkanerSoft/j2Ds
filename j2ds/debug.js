function drawBox(_scene, _o){
  _scene.context.fillStyle= 'white';
  
  //this.pos.x+= _speed*(Math.cos(Rad(this.angle)));  
  
  
  _scene.context.fillRect(
  -2+_o.pos.x-_scene.view.x, 
  -2+_o.pos.y-_scene.view.y, 
  _o.size.x+4, 
  _o.size.y+4);
}