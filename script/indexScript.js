
const loginForm = document.getElementById('login-form');
function showValidationMessage() {
	document.getElementById("validation").style.display = "block";
}
function hideValidationMessage() {
	document.getElementById("validation").style.display = "none";
}
loginForm.addEventListener('submit', event => {
	const formData = new FormData(event.target);
	
	const email = formData.get('email');
	const password = formData.get('password');

	event.preventDefault();

	login(email, password, (success, errorCode, errorMessage) => {
		if (success) {
			hideValidationMessage();
			window.location = 'main.html';
		} else {
			showValidationMessage();
			document.getElementById("validation").innerText = "" + errorMessage;
		}
	});
});