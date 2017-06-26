#pragma strict

private var count : int;
public var countText : UnityEngine.UI.Text;
public var winImage : UnityEngine.UI.Image;
public var totalPickUps : int;

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
			if(count == totalPickUps) {
				winImage.gameObject.SetActive(true);
			}
	}
}

function SetCountText() {
	countText.text = "Score: " + count.ToString();
}