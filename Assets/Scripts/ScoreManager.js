#pragma strict

private var count : int;
public var countText : UnityEngine.UI.Text;

function Start () {
	count = 0;
	SetCountText();
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
	countText.text = "Score: " + count.ToString();
}