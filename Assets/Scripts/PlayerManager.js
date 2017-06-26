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
public var Quieto : boolean = false;
private var framesParaQuieto : int = 24;
public var tempZ : Vector3;
public var rot : GameObject;

//Variables para volver arriba cuando uno se cae
public var rememberTemp : Vector3;

//errores
var errorRot : float;

function Start () {
	anim = GetComponent.<Animator>();
	rb = GetComponent.<Rigidbody>();
	
	rb.isKinematic = false;
	temp = transform.localScale;
	
	rememberTemp = transform.localPosition;
}

function Update () {

	//Actualizar Posicion
	tempZ.x = transform.localPosition.x;
	tempZ.y = transform.localPosition.y;
	
	walk();
	
	//Saltar
	if (Input.GetKey("space") && !Jumping)
	{
		Quieto = false;
		Jumping = true;
		Jump();
	}
	
	if(Jumping && rb.velocity.y > 0 && cerca(transform.localPosition.z,-47.5,2.5))
	{
		transform.localPosition = Vector3(transform.localPosition.x,transform.localPosition.y,-52.5);
	}
	else if(Jumping && rb.velocity.y <= 0 && cerca(transform.localPosition.z,-52.5,0.5))
	{
		transform.localPosition = Vector3(transform.localPosition.x,transform.localPosition.y,-47.5);
	}
	//mantener en un rango a player en z
	
	
	//Reset Animation
	if (!Input.GetKey("space") && !Input.GetKey("a") && !Input.GetKey("d") && !Jumping)
	{
		if (framesParaQuieto <= 0)
			Quieto = true;
		else if(!Quieto)
			framesParaQuieto--;
		anim.SetInteger("State",0);
		rb.velocity = Vector3(0, rb.velocity.y, 0);
	}
	else
		framesParaQuieto = 24;
		
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

//En caso de que colisione con otro objeto
function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "Plataforma" && Jumping)
	{
		Jumping = false;
		anim.SetInteger("State",0);
	}
	if(other.gameObject.tag == "Plataforma" && !Quieto)
	{
		tempZ = transform.localPosition;
		tempZ.z = other.gameObject.GetComponent(Zdistance).distZ;
	}
}

//En caso de que este en contacto con otro objeto
function OnCollisionStay(other : Collision)
{
	if(other.gameObject.tag == "Plataforma")
	{
		rememberTemp = transform.localPosition;
	}
	if(other.gameObject.tag == "Muerte")
	{
		transform.localPosition = rememberTemp;
	}
}

function cerca (val : float,aprox : float, epsilon : float) {
	
	return (val - aprox < epsilon) && (val - aprox > -epsilon);
	
}