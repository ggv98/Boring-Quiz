
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', event => {
	const formData = new FormData(event.target);
	
	const email = formData.get('email');
	const password = formData.get('password');

	event.preventDefault();

	login(email, password, (success, errorCode, errorMessage) => {
		if (success) {
			alert("Successfully loged in your acc!");
			window.location = 'main.html';
		} else {
			document.getElementById("validation").innerHTML = "" + errorMessage;
		}
	});
});