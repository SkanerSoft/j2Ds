j2ds.loaded('net');

startajax= function(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
} 


getAjax= function(_ajax, _script, _function)
{ 
 _ajax.open('GET', _script);  
 _ajax.onreadystatechange = function ()   
 {  
  if(_ajax.readyState == 4)   
  {  
   if (_function) { _function(_ajax.responseText); }
  }  
 }  
 _ajax.send(null); 
}



/*--------------- Локальное хранилище ----------------*/



function createLocal(_id) {
 var o= {};
 o.id= _id;
 o.ls= window.localStorage? window.localStorage : false;
 
 if (!o.ls) alert('J2ds ERROR in "createLocal('+_id+')" \n'+
 'Объект "localStorage" не поддерживается.'); 
 /*Свойства*/ 
 
 /*Функции*/
 o.save= _Net_saveDataLocal; 
 o.load= _Net_loadDataLocal;
 o.is= _Net_isDataLocal;
 o.saveObject= _Net_saveDataLoaclObject; 
 o.loadObject= _Net_loadDataLocalObject; 
 return o;
}


function _Net_saveDataLoaclObject(_name, _o) {
 if (!this.ls) return false;
 this.ls.setItem(this.id+_name, JSON.stringify(_o));
}

function _Net_loadDataLocalObject(_name) {
 if (!this.ls) return false;
 return JSON.parse(this.ls.getItem(this.id+_name));
}


function _Net_saveDataLocal(_name, _value) {
 if (!this.ls) return false;
 this.ls.setItem(this.id+_name, _value);
}



function _Net_isDataLocal(_name) {
 if (!this.ls) return false;
 return !!(this.ls.getItem(this.id+_name));
}


function _Net_loadDataLocal(_name) {
 if (!this.ls) return false;
 var o= {};
 o.val= this.ls.getItem(this.id+_name);
 o.int= parseInt(o.val);
 o.dbl= parseFloat(o.val); 
 return o;
}































