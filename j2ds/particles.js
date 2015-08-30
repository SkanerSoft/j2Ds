j2ds.loaded('particles');
/* В этом файле представленны базовые объекты для 
   организации частиц */

newParticlesFire= function(
                           _pos, // позиция {x:10, y:10}
                           _size, // размер {x:10, y:10}
                           _color1, // Цвет основания [0,0,0]
                           _color2, // Цвет огня [0,0,0]
                           _color3 // Цвет [0,0,0]
                           
                          ) {
 var o= {};
 /* Свойства */
 o.size= _pos,
 o.pos= _size,
 o.color1= _color1;
 o.color2= _color2;
 o.color3= _color3;
 o.count= {x:10, y:9}; // Количество частиц в ширину и высоту
 

 /* Функции */

 

 return o;
}






















         



