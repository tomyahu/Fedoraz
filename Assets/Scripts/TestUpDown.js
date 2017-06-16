#pragma strict

//hago un objeto rigid body
private var rb : Rigidbody;
//velocidad de subida o bajada
public var speed : float;

function Start () {
	//inicializo rigidbody
	rb = GetComponent.<Rigidbody>();
	//hago que el movimiento sea suave y el objeto se deje llevar
	rb.isKinematic = true;
}

function FixedUpdate () {
	
	if(Input.GetKey("w"))
	{
		rb.MovePosition(transform.position + transform.up * Time.deltaTime*speed);
	}
	else if(Input.GetKey("s"))
	{
		rb.MovePosition(transform.position - transform.up * Time.deltaTime*speed);
	}
	
}