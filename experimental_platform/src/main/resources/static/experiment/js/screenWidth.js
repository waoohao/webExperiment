$(document).ready(function() {
	var windowWidth = window.screen.availWidth;
	var windowHeight = window.screen.availHeight;
	document.getElementById("experimentAreaHeight").style.height = (0.6 * windowHeight) + "px";
	//document.getElementById("experimentAreaHeight").style.width = windowWidth + "px";
	document.getElementById("experimentalDoc").style.height = (0.6 * windowHeight) + "px";
	document.getElementById("terminal1").style.height = (0.6 * windowHeight) + "px";
	//alert(windowWidth);
	//alert(windowHeight);
});