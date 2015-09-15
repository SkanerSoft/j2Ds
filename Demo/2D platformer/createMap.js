
var createTiles= function (imageMap) {
 // Создаем тайлы (картинки) из тайлсета
 return ({
  groundL : imageMap.createAnimation(9, 90, 13,12, 1),
  ground : imageMap.createAnimation(23, 90, 16,12, 1),
  kust : imageMap.createAnimation(112, 95, 18,21, 1),
  derevo : imageMap.createAnimation(63, 86, 16,30, 1),
  flower : imageMap.createAnimation(41, 88, 22,22, 1),
  apple : imageMap.createAnimation(25, 74, 15,15, 1),
  zombie : imageMap.createAnimation(7, 4, 21,32, 3)
 });	
}


var createMap= function (map, tiles) {
 block= [];
 apples= [];
 zombie= [];
 // открываем цикл по строкам
 for (var i= map.map.length-1; i>=0; i-=1) {
  // открываем цикл по символам в строке
  for (var j= 0; j<map.map[i].length; j+=1) {
   var o= a= z= false;   
   // если пробел, преходим к след. символу
   if (map.map[i][j] == ' ') continue; 
   
   if (map.map[i][j] == 'L') { 
    // левый грунт
    o= scene.addSpriteNode(vec2df(j*map.x, i*map.y), vec2df(map.x, map.y), tiles.groundL);
    o.type= 'ground';
    o.stop= 'left';
   }
   else if (map.map[i][j] == 'R') { 
    // правый грунт
    o= scene.addSpriteNode(vec2df(j*map.x, i*map.y), vec2df(map.x, map.y), tiles.groundL);
    o.setFlip(1, 0);
    o.type= 'ground';
    o.stop= 'right';
   }
   else if (map.map[i][j] == 'Z') { 
    // зомби
    z= scene.addSpriteNode(vec2df(j*map.x, -38+i*map.y+map.y), vec2df(30, 40), tiles.zombie);
    z.dx= 1;
   }
   else if (map.map[i][j] == 'A') { 
    // яблоко
    a= scene.addSpriteNode(vec2df(j*map.x, i*map.y), vec2df(tiles.apple.sourceW, tiles.apple.sourceH), tiles.apple);
   }
   else if (map.map[i][j] == 'G') { 
    // серединка грунта
    o= scene.addSpriteNode(vec2df(j*map.x, i*map.y), vec2df(map.x, map.y), tiles.ground);
    o.type= 'ground';
   }
   else if (map.map[i][j] == 'K') {
    // сухой кустик 
    o= scene.addSpriteNode(vec2df(j*map.x, -15+map.y+i*map.y), vec2df(10, 15), tiles.kust);
    o.type= 'none';
   }
   else if (map.map[i][j] == 'F') { 
    // цветочки
    o= scene.addSpriteNode(vec2df(j*map.x, -25+map.y+i*map.y), vec2df(20, 25), tiles.flower);
    o.type= 'none';
   }
   else if (map.map[i][j] == 'D') { 
    // дерево
    var rnd= Random(2, 4);
    o= scene.addSpriteNode(vec2df(j*map.x, i*map.y+map.y-tiles.derevo.sourceH*rnd), vec2df(tiles.derevo.sourceW*rnd, tiles.derevo.sourceH*rnd), tiles.derevo);
    o.type= 'none';
    if (Random(0, 3) == 2) o.setLayer('front');
   }
   else if (map.map[i][j] == 'M') { 
    // позиция главного персонажа
    me.setPosition(vec2df(j*map.x, i*map.y+map.y-me.size.y));
   }
   else if (map.map[i][j] == 'C') {
    // цель
    o= scene.addCircleNode(vec2df(j*map.x, i*map.y), 5, 'yellow');
    o.type= 'cell';
   }
   else {
    // ничего из вышеперечисленного
    o= scene.addRectNode(vec2df(j*map.x, i*map.y), vec2df(map.x, map.y), 'green');  
    o.type= 'ground';
   }
   // привязываем объект к массиву
   if (o) { block.push(o); }
   if (a) { apples.push(a); }
   if (z) { zombie.push(z); }
  }
 }	
};


var collisionBlock= function () {
 // если персонаж не на земле - падает
 if (!me.onGroun) me.dy+= me.dy < 5 ? 0.54 : 0; 

 // проверяем столкновения с блоками
 for (var i=0; i<block.length; i+=1) {
  // первым делом отрисуем блок
  block[i].draw();
  // если он за пределами экрана, переходим к обработке след.
  if (!block[i].isLookScene()) continue;
  // если произошло столкновение персонажа с блоком
  if (me.isIntersect(block[i])) { 
   // если цель
   if (block[i].type == 'cell') {
    level+= 1;
    createMap(maps[level], tiles);
    layers.layer('pause').setVisible(1);
    scene.setEngine(Pause);
    continue;
   }
   // если он не твердый, переходим к обработке след.
   if (block[i].type != 'ground') continue;
   // если блок выше головы персонажа, не обрабатываем
   if (me.pos.y > block[i].pos.y) continue;
   // проверяем, на каком уровне повысоте персонаж расположен относительно блока
   if (me.pos.y+me.size.y < block[i].pos.y+block[i].size.y/4) {
    // если он может на него наступить, не даем ему провалиться
    me.pos.y= 1-me.size.y + block[i].pos.y;
    me.onGround= true;
    me.dy= 0;
    me.dx= 0;
   }
  }
 }	
};

var collisionApple= function () {
 for (var i=0; i<apples.length; i+=1) {	
  if (me.isIntersect(apples[i]))
  {
   score+= 1;
   apples.splice(i, 1);
   continue;   
  }
  apples[i].draw();
 }
};

var collisionZombie= function () {
 for (var i=0; i<zombie.length; i+=1) {	
  if (me.isIntersect(zombie[i]))
  {
   if (maxRespawn < 1) {
    level= 1;
    maxRespawn= 4;
   }
   createMap(maps[level], tiles);
   score= 0;
   maxRespawn-= 1;
  }

  collisionZombieGround(i);  
  
  zombie[i].move(vec2df(zombie[i].dx, 0));
  zombie[i].draw(10);
 }
};

var collisionZombieGround= function(_i) {
	for (var i=0; i<block.length; i+=1) {
	 if (!block[i].stop) continue;	 
	 if (zombie[_i].isIntersect(block[i]) && zombie[_i].pos.y+zombie[_i].size.y < block[i].getPosition().y) {	  
   if (zombie[_i].dx > 0) zombie[_i].pos.x= -zombie[_i].dx - zombie[_i].size.x+block[i].pos.x;
   if (zombie[_i].dx < 0) zombie[_i].pos.x= -zombie[_i].dx + block[i].pos.x+block[i].size.x;	
     
	  zombie[_i].dx*= (-1);
	  if (zombie[_i].dx < 0) zombie[_i].setFlip(1, 0);
	  else zombie[_i].setFlip(0, 0);
	 }
	}
};

var createMe= function () {
 var me	= scene.addSpriteNode(vec2df(50, 50), vec2df(26, 36), 0);
 me.step= imageMap.createAnimation(8, 129, 24,30, 4);
 me.stop= imageMap.createAnimation(32, 129, 24,30, 1);
 me.jump= imageMap.createAnimation(8, 129, 24,30, 1);
 // переменные скоростей и состояний
 me.dx= 0;
 me.dy= 0;
 me.onGround= false;
 me.to= 'right'; // направление взгляда
 return me;
};

var collisionAttack= function () {
 if (apple.visible) {
  apple.dy+= (apple.dy < 5 ? 0.5 : 0);
  apple.move(vec2df(apple.dx, apple.dy));
  apple.draw();
  for (var i=0; i<block.length; i+=1) {
   if (block[i].type == 'none') continue;
  	if (apple.isIntersect(block[i])) {
  	 apple.setVisible(false);
  	}
  }
  for (var i=0; i<zombie.length; i+=1) {
  	if (apple.isIntersect(zombie[i])) {
  	 apple.setVisible(false);
  	 zombie.splice(i, 1);
  	}
  }
 }
};

var keyMe= function () {
// если нажата клавиша вправо, присваиваем скорость 2 и поворачиваем объект вправо
 if (input.isKeyDown('RIGHT')) {
  me.dx= 2;
  me.to= 'right';
 }
 // аналогично для кнопки лево
 else if (input.isKeyDown('LEFT')) {
  me.dx= -2;
  me.to= 'left';
 } 
 
 // если была нажата клавиша вверх
 if (input.isKeyPress('UP')) {
  // если объект на земле, заставляем его прыгнуть
  if (me.onGround) {
   me.onGround= false;
   me.dy= -6;
  }
 }

 if (input.isKeyPress('CTRL')) {
  var dx= Random(3, 6),
      dy= Random(3, 6);
  if (score > 0) {
   if (me.to == 'right') {
     apple.dx= dx;
    } else {
    	apple.dx= -dx;
    }
    apple.dy= -dy;
    Attack();
    score-= 1;  
   }
 }  
 
 // если объект смотрит вправо, то зеркалировать его не нужно
 if (me.to == 'right') {
  me.setFlip(0, 0);
 }
 else {
  // в противном случае отражаем по оси Х
  me.setFlip(1, 0); 
 } 
 
 
};


var animateMe= function () {
 // если персонаж прыгает или падает, присваиваем анимацию прыжка
 if (me.dy != 0) {
  me.setAnimation(me.jump);
 }
 else if (me.dx != 0) {
       // если двигатся влево или вправо, анимация шага 
       me.setAnimation(me.step);
      }
      else {
       // если не то и не то, то анимация "стояния"
       me.setAnimation(me.stop);
      }	
 me.draw(2);
};





