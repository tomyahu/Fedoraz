#pragma strict

public var player : GameObject;

function Start () {

}

function Update () {
	
	var temp : Vector3 = player.transform.position;
	transform.position = temp;
	
	var temp2 = player.transform.rotation;
	transform.rotation = temp2;
	
	
}