#pragma strict

public var player : GameObject;

public var temp : Vector3;

function Start () {

}

function Update () {
	
	temp = player.transform.localPosition;
	temp.z = transform.localPosition.z;
	transform.localPosition = temp;
	
	
	
}