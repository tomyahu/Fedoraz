#pragma strict

//hago un objeto rigid body
private var rb : Rigidbody;

//defino mi vector velocidad que se puede editar desde la escena de unity
public var eulerAngleVelocity : Vector3;

//Variables para rotar jugador
public var player : GameObject;
public var aux : Quaternion;
public var aux2 : Vector3;
private var distZ : float;


//defino el error en donde debe dejar de rotar la camara
public var error : float;

//la variable a define el sentido de la rotacion
private var a : int = 0;

function Start () {
	//inicializo rigidbody
	rb = GetComponent.<Rigidbody>();
	//hago que el movimiento sea suave y el objeto se deje llevar
	rb.isKinematic = true;
	
	distZ = -47.5;
}

function FixedUpdate () {
	
	//si el jugador apreta q, se gira la camara hacia la izquierda
	if(Input.GetKey("q") && a == 0 && PlayerConditions())
		a = -1;
	//si el jugador apreta e, se gira hacia la derecha
	else if(Input.GetKey("e") && a == 0 && PlayerConditions())
		a = 1;
	//caso en que se este cerca de los 90 grados con un margen de error de "error"
	else if(cerca(90.0,transform.eulerAngles.y,error)){
		if (a != 0)
		{
			aux2 = player.transform.localPosition;
			aux2.z = distZ;
			player.transform.localPosition = aux2;
		}
		a = 0;
		transform.eulerAngles = Vector3(0, 90, 0);
	}
	//analogo con 180 grados
	else if(cerca(180.0,transform.eulerAngles.y,error)){
		if (a != 0)
		{
			aux2 = player.transform.localPosition;
			aux2.z = distZ;
			player.transform.localPosition = aux2;
		}
		a = 0;
		transform.eulerAngles = Vector3(0, 180, 0);
	}
	//analogo con 270 grados
	else if(cerca(270.0,transform.eulerAngles.y,error)){
		if (a != 0)
		{
			aux2 = player.transform.localPosition;
			aux2.z = distZ;
			player.transform.localPosition = aux2;
		}
		a = 0;
		transform.eulerAngles = Vector3(0, 270, 0);
	}
	//analogo con 0 grados
	else if(cerca(0.0,transform.eulerAngles.y,error)){
		if (a != 0)
		{
			aux2 = player.transform.localPosition;
			aux2.z = distZ;
			player.transform.localPosition = aux2;
		}
		a = 0;
		transform.eulerAngles = Vector3(0, 0, 0);
	}
	
	//Rotacion en si (copy-paste de la documentacion)
	var deltaRotation : Quaternion = Quaternion.Euler(eulerAngleVelocity * Time.deltaTime*a);
    rb.MoveRotation(rb.rotation * deltaRotation);
    
    aux = transform.localRotation;
    aux.x *= 0;
    aux.y *= 0;
    aux.z *= 0;
    
    player.transform.localRotation = aux;
    
}

function PlayerConditions () {
	return player.GetComponent(PlayerManager).Quieto;
}

//funcion para decir si el valor "aprox" esta a a lo mas "epsilon" del valor "val"
function cerca (val : float,aprox : float, epsilon : float) {
	
	return (val - aprox < epsilon) && (val - aprox > -epsilon);
	
}