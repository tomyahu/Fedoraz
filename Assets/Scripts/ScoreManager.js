#pragma strict

private var count : int;
public var countText : UnityEngine.UI.Text;
public var winText : UnityEngine.UI.Text;

public var totalPickUps : int;

function Start () {
	count = 0;
	SetCountText();
	winText.text = "";
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag ("PickUp")) {
			other.gameObject.SetActive(false);
			count += 1;
			SetCountText();
			if(count == totalPickUps){
				winText.text = "Game Over lol";
			}
	}
}

function SetCountText() {
	countText.text = "Score: " + count.ToString();
}