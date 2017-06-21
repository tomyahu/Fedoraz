#pragma strict

//Variable para saber a que distancia del centro esta el jugador en todo momento
public var player : GameObject;
public var distZ : float;
private var isPressed : boolean;
private var temp : Vector3;
private var temp2 : Vector3;


function Start () {
	isPressed = false;
}

function Update () {
	
}

//Obtenemos informacion de la plataforma
function OnCollisionStay(plat : Collision)
{
	if(plat.gameObject.tag == "Player")
	{
		temp2 = plat.gameObject.transform.localPosition;
		//si el jugador apreta q, se gira la camara hacia la izquierda
		if(Input.GetKey("q")){
			isPressed = true;
			temp2.z = distZ;
			plat.gameObject.transform.localPosition = temp2;
			
		}
		//si el jugador apreta e, se gira hacia la derecha
		else if(Input.GetKey("e")){
			isPressed = true;
			temp2.z = distZ;
			plat.gameObject.transform.localPosition = temp2;
		
		}
	}	
}