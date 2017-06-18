#pragma strict

//Animator Controller
private var anim : Animator;
//RigidBody
private var rb : Rigidbody;

//Variables para saltar
public var Jumping : boolean = true;
public var jumpSpeed : int;

//Variables para caminar
public var walkSpeed: int;


//errores
var errorRot : float;

function Start () {
	anim = GetComponent.<Animator>();
	rb = GetComponent.<Rigidbody>();
	
	rb.isKinematic = false;
}

function Update () {

	walk();
	
	//Saltar
	if (Input.GetKey("space") && !Jumping)
	{
		Jumping = true;
		Jump();
	}
	
	
	//Reset Animation
	if (!Input.GetKey("space") && !Input.GetKey("a") && !Input.GetKey("d") && !Jumping)
	{
		anim.SetInteger("State",0);
		rb.velocity = Vector3(0, rb.velocity.y, 0);
	}
		
	//Evitar inclinacion
	if (!cerca(0.0,transform.eulerAngles.x,errorRot))
		transform.eulerAngles = Vector3(0, transform.eulerAngles.y, transform.eulerAngles.z);
	
	if (!cerca(0.0,transform.eulerAngles.y,errorRot))
		transform.eulerAngles = Vector3(transform.eulerAngles.x, 0, transform.eulerAngles.z);
	
	if (!cerca(0.0,transform.eulerAngles.z,errorRot))
		transform.eulerAngles = Vector3(transform.eulerAngles.x, transform.eulerAngles.y, 0);
}

function walk() {

	if (Input.GetKey("d") && !Input.GetKey("a"))
	{
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		rb.velocity = Vector3(walkSpeed, rb.velocity.y, 0);
	}
	else if (Input.GetKey("a") && !Input.GetKey("d"))
	{
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		rb.velocity = Vector3(-walkSpeed, rb.velocity.y, 0);
	}
	
}

//Salto
function Jump () {
	
	rb.AddForce(Vector3(rb.velocity.x, jumpSpeed, rb.velocity.z));
	anim.SetInteger("State",3);

}

//En caso de que choque con otro objeto
function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "Plataforma" && Jumping)
	{
		Jumping = false;
		anim.SetInteger("State",0);
	}
}

function cerca (val : float,aprox : float, epsilon : float) {
	
	return (val - aprox < epsilon) && (val - aprox > -epsilon);
	
}