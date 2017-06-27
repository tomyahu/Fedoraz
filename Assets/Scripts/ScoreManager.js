#pragma strict

private var count : int;
public var countText : UnityEngine.UI.Text;
public var winImage : UnityEngine.UI.Image;
public var totalPickUps : int;
public var player : GameObject;

function Start () {
	count = 0;
	SetCountText();
	winImage.gameObject.SetActive(false);
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag ("PickUp")) {
			other.gameObject.SetActive(false);
			count += 1;
			SetCountText();
	}
}

function SetCountText() {
	countText.text = "Faltan " + (totalPickUps-count).ToString();
}

function goal() {
	if (count == totalPickUps)
		win();
}

function win() {
	winImage.gameObject.SetActive(true);
	player.GetComponent(PlayerManager).win();
}