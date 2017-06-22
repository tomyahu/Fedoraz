#pragma strict

//Animator Controller
private var anim : Animator;

//RigidBody
@HideInInspector
public var rb : Rigidbody;

//Variables para saltar
@HideInInspector
public var Jumping : boolean = true;
public var jumpSpeed : int;

//Variables para caminar
public var walkSpeed: int;

//Variables para Animacion
@HideInInspector
public var temp : Vector3;

//Variables de Rotacion
@HideInInspector
public var Quieto : boolean = false;
private var framesParaQuieto : int;
public var rot : GameObject;

//errores
var errorRot : float;

function Start () {
	anim = GetComponent.<Animator>();
	rb = GetComponent.<Rigidbody>();
	
	rb.isKinematic = false;
	temp = transform.localScale;
}

function Update () {

	walk();
	
	//Saltar
	if (Input.GetKey("space") && !Jumping)
	{
		Quieto = false;
		Jumping = true;
		Jump();
	}
	
	
	//Reset Animation
	if (!Input.GetKey("space") && !Input.GetKey("a") && !Input.GetKey("d") && !Jumping)
	{
		if(framesParaQuieto <= 0)
		{
			Quieto = true;
		}
		else
		{
			framesParaQuieto--;
		}
		anim.SetInteger("State",0);
		rb.velocity = Vector3(0, rb.velocity.y, 0);
	}
	else
	{
		framesParaQuieto = 5;
	}
		
	//Evitar inclinacion
	if (!cerca(0.0,transform.eulerAngles.x,errorRot))
		transform.eulerAngles = Vector3(0, transform.eulerAngles.y, transform.eulerAngles.z);
	
	if (!cerca(0.0,transform.eulerAngles.z,errorRot))
		transform.eulerAngles = Vector3(transform.eulerAngles.x, transform.eulerAngles.y, 0);
}

function walk() {

	if (cerca(0,rot.transform.eulerAngles.y,1))
		walkS();
	else if (cerca(180,rot.transform.eulerAngles.y,1))
		walkN();
	else if (cerca(90,rot.transform.eulerAngles.y,1))
		walkE();
	else if (cerca(270,rot.transform.eulerAngles.y,1))
	{
		walkW();
	}
	
	
}

function walkS() {

	if (Input.GetKey("d") && !Input.GetKey("a"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		
		if (transform.localScale.x < 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(walkSpeed, rb.velocity.y, 0);
	}
	else if (Input.GetKey("a") && !Input.GetKey("d"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		if (transform.localScale.x > 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(-walkSpeed, rb.velocity.y, 0);
	}
	
}

function walkN() {

	if (Input.GetKey("d") && !Input.GetKey("a"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		
		if (transform.localScale.x < 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(-walkSpeed, rb.velocity.y, 0);
	}
	else if (Input.GetKey("a") && !Input.GetKey("d"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		if (transform.localScale.x > 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(walkSpeed, rb.velocity.y, 0);
	}
	
}

function walkW() {

	if (Input.GetKey("d") && !Input.GetKey("a"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		
		if (transform.localScale.x < 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(0, rb.velocity.y, walkSpeed);
	}
	else if (Input.GetKey("a") && !Input.GetKey("d"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		if (transform.localScale.x > 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(0, rb.velocity.y, -walkSpeed);
	}
	
}

function walkE() {

	if (Input.GetKey("d") && !Input.GetKey("a"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		
		if (transform.localScale.x < 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(0, rb.velocity.y, -walkSpeed);
	}
	else if (Input.GetKey("a") && !Input.GetKey("d"))
	{
		Quieto = false;
		if (anim.GetInteger("State") == 0)
			anim.SetInteger("State",1);
		
		if (transform.localScale.x > 0)
		{
			temp.x *= -1;
			transform.localScale = temp;
		}
		
		rb.velocity = Vector3(0, rb.velocity.y, walkSpeed);
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