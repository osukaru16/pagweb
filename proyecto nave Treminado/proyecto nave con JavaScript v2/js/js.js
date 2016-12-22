var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var terminado = false;
var path = "img/";
var naves = new Array("nave.png","nave_m.png","miNave.png");
var navesFuego = new Array("navef3.png","nave_mf.png","miNaveF.png");
var contador=0;
var contadorAntiguo =0;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
	
	
	
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		document.getElementById("menu_movil").style.display = "block";
		
		document.getElementById("showm").style.display = "none";
		document.getElementById("cpanel").style.display = "none";
		stop();
	}
	
	//ocultar menú móvil
	
	
	
	
	
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		document.getElementById("showm").style.display = "block";
		
		hidem();
		
		
		
		
		
		
		//document.getElementById("hidem").style.display = "none";
		
		

	}
	
	
	
	
	
	//encender/apagar el motor al hacer click en la pantalla
	document.getElementById("propulsor_img").onclick = function () {
		if (a==g){
			motorOn();
		} else {
			motorOff();
		}
	}
	
	
	
		
	
	
	//encender/apagar al apretar/soltar una tecla
	//document.onkeydown = motorOn;
	//document.onkeyup = motorOff;
	
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
	terminado = false;
}

function stop(){
	clearInterval(timer);
	terminado = true;
}

function moverNave(){
	
	
	actualizarVelocidad();
	
	actualizarAltura();
	
	
	

	
	
	//document.getElementById("altura").innerHTML=altura-y;
	
	
	
	 if(y <= 5){
		// a=g; v = 1;
		
		y++;
		motorOff();
		
		//document.getElementById("nave").style.top = -y+"%"; 
		
	}
	
	
	
	//mover hasta que top sea un 70% de la pantalla
	else if (y<70){ 
		
		document.getElementById("nave").style.top = y+"%"; 
	} 
	
	else {
		document.getElementById("velocidad").innerHTML="";
		document.getElementById("altura").innerHTML="";
		terminado = true;
		if (v>3){ 
			lose();
		}
		else { 
			win();
		}
	}
}
function motorOn(){
	if (!terminado){
		document.getElementById("nave_img").src = path + navesFuego[contador];
		a=-g;
 		//if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 100);
	}

	
	
	
}
function motorOff(){
	if (!terminado){
		document.getElementById("nave_img").src = path + naves[contador];
		a=g;
		clearInterval(timerFuel);
		timerFuel=null;
	}
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if (!terminado){
		fuel-=1;
		//var contadorFuel = "|";
		var contNumFuel = fuel / 10;
		document.getElementById("fuel").innerHTML="";
		
		if(contNumFuel <=5){
			document.getElementById("fuel").style.color = "orange";
		}
		
		if(contNumFuel <=3){
			document.getElementById("fuel").style.color = "red";
		}
		
		
		
		while(contNumFuel > 0){
			document.getElementById("fuel").innerHTML+="|";
			
			
			
			
			contNumFuel--;
			//document.getElementById("fuel").innerHTML=fuel;	
		}
		if (fuel <= 0){
			motorOff();
		}
		
	}
	
	
	
}





function actualizarVelocidad(){
	
	
	var contNumVel = Math.abs(v);
	
	v +=a*dt;
	
	//document.getElementById("velocidad").innerHTML=v;
	
	document.getElementById("velocidad").innerHTML="";
	while(contNumVel > 0){
		document.getElementById("velocidad").innerHTML+="|";
		contNumVel--;
	
	}

}




function actualizarAltura(){
	
	var altura = 70;
	
	var contNumAlt = (altura-y)/10;
	y +=v*dt;
	
	document.getElementById("altura").innerHTML="";
	while(contNumAlt > 0){
		if (y<70){
			document.getElementById("altura").innerHTML+="|";
		}
		
		contNumAlt--;
		
	}
	
	
}








function ver_pantalla_nave_movil(){
	document.getElementById("atras").style.display = "block";
	document.getElementById("pantalla_nave_config").style.display = "block";
	document.getElementById("pantalla_pause_d").style.display = "none";
	
	
}





function ver_pantalla_nave(){
	contadorAntiguo = contador;
	document.getElementById("pantalla_nave_config").style.display = "block";
	document.getElementById("pantalla_pause_d").style.display = "none";
	document.getElementById("menu").style.display = "none";
	stop();
}






function cancelar(){
	contador = contadorAntiguo;
	document.getElementById("pantalla_nave_config").style.display = "none";
	document.getElementById("pantalla_pause_d").style.display = "block";
	document.getElementById("menu").style.display = "block";	
}

function aceptar(){
	
	document.getElementById("pantalla_nave_config").style.display = "none";
	//document.getElementById("pantalla_pause_d").style.display = "block";
	document.getElementById("menu").style.display = "block";
	hidem();
	play();
	motorOff();
	
	
}




function derechaMenu(){
	if (contador == naves.length-1){
		contador = 0;
	}
	else{
		contador++;
	}
	modelosNaves();
}



function izquirdaMenu(){
	if (contador == 0){
		contador = naves.length-1;
	}
	else{
		contador--;
	}
	modelosNaves();
}

function modelosNaves(){
	document.getElementById("muestra_nave").src = path + naves[contador];
}










function pause(){
	document.getElementById("pantalla_pause_d").style.display = "block";
	stop();
}











function play(){
		stop();
		document.getElementById("pantalla_pause_d").style.display = "none";
		document.getElementById("creditos").style.display = "none";
		document.getElementById("win").style.display = "none";
		document.getElementById("lose").style.display = "none";
		
		
		
		document.getElementById("menu").style.display = "block";
		/*
		if(document.getElementById("hidem").style.display == "block"){
			document.getElementsByClassName("c")[0].style.display = "none";
			document.getElementById("showm").style.display = "block";
			document.getElementById("cpanel").style.display = "block";
			start();
		
		}
		*/
		start();
		
}

















function reinicio(){
	stop();
	
	y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
	v = 0;
	
	
	
	timer=null;
	timerFuel=null;
	fuel=100;
	terminado = false;

	
	
	
	
	
	play();
	
	document.getElementById("nave_img").src = path + naves[contador];
	
	motorOff();
	
	start();



}





























function win(){
	
	document.getElementById("nave_img").src = path + naves[contador];
	document.getElementById("win").style.display = "block";
	stop();

}

function lose(){
	document.getElementById("nave_img").src = "img/nave_rota.png";
	document.getElementById("lose").style.display = "block";
	stop();
	
	
}







function creditos_movil(){
	document.getElementById("atras").style.display = "block";
	document.getElementById("creditos").style.display = "block";
	stop();
}




function creditos(){
	document.getElementById("menu").style.display = "none";
	document.getElementById("creditos").style.display = "block";
	stop();
}








function instrucciones(){
	
	document.getElementById("pantalla_pause_d").style.display = "block";
	aparece_atras();
}




function ir_atras(){
	document.getElementById("pantalla_pause_d").style.display = "none";
	document.getElementById("atras").style.display = "none";
	document.getElementById("pantalla_nave_config").style.display = "none";
	document.getElementById("creditos").style.display = "none";
	
}


function aparece_atras(){
	document.getElementById("atras").style.display = "block";
}




function hidem(){
		
		//document.getElementById("pantalla_pause_d").style.display = "none";
		document.getElementById("menu_movil").style.display = "none";
		ir_atras();
		
		
		
		

		document.getElementById("cpanel").style.display = "block";
		start();
		
		
		
}








