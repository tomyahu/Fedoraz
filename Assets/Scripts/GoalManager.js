#pragma strict

public var concreteCollector : GameObject;

function Start () {

}

function Update () {

}

function OnCollisionStay(other : Collision) {
	if (other.gameObject.CompareTag ("Player")) {
			concreteCollector.GetComponent(ScoreManager).goal();
	}
}