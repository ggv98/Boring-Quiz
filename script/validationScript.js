
var inputs = document.getElementsByClassName("input");

function showValidationMessage() {
	document.getElementById("validation").style.display = "block";
}

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', event => {
	const formData = new FormData(event.target);
	
	const username = formData.get('username');
	const email = formData.get('email');
	const password = formData.get('password');

	event.preventDefault();

	auth.register(username, email, password, (success, errorCode, errorMessage) => {
		if (success) {
			window.location = 'posts.html';
		} else {
			errors.classList.add('errors-visible');
			errors.innerText = errorMessage;
		}
	});
});

function validationFunc() {
	let insertedUserName = inputs[0].value;
	let insertedEmail = inputs[1].value
	let insertedPassword = inputs[2].value;
	let checkValidity;

	document.getElementById("validation").innerHTML = "";

	let isPasswordCorrect = checkValidityPassword(insertedPassword);
	let isUserNameCorrect = checkValidityUserName(insertedUserName);

	checkValidity = isPasswordCorrect && isUserNameCorrect;

	if (checkValidity) {
		register(insertedUserName, insertedEmail, insertedPassword, (success, errorCode, errorMessage) => {
			console.log("dsfdsfsdfsd", success);
			if (success) {
				alert("The registration is made successfully!");
				window.location = 'main.html';
			} else {
				document.getElementById("validation").innerHTML += errorMessage;
			}
		}	
		);
	} else {
	showValidationMessage();
}

return checkValidity;
}

// checks and sends validation message
function checkValidityPassword(insertedPassword) {
	let smallLetter = false;
	let capitalLetter = false;
	let specialLetter = false;
	let errorMessageField = document.getElementById("validation");

	for (char of insertedPassword) {
		if (char >= 'a' && char <= 'z') {
			smallLetter = true;
		} else if (char >= 'A' && char <= 'Z') {
			capitalLetter = true;
		} else if (char == '!' || char == '@' || char == '#' ||
			char == '$' || char == '%' || char == '^' || char == '&') {
			specialLetter = true;
		}
	}

	if (!smallLetter) {
		errorMessageField.innerHTML += "Password must contain at least one small letter!<BR>"
	}
	if (!capitalLetter) {
		errorMessageField.innerHTML += "Password must contain at least one capital letter!<BR>";
	}
	if (!specialLetter) {
		errorMessageField.innerHTML += "Password must contain at least one special letter (!@#$%^&)!<BR>";
	}
	if (insertedPassword.length < 6) {
		errorMessageField.innerHTML += "Password length must be at least 6 characters<BR>";
	}

	return smallLetter && capitalLetter &&
		specialLetter && insertedPassword.length >= 6;
}

/* Not used in project */
function checkValidityEmail(insertedEmail) {
	let standardCharacterMails = false;
	let isThereDot = false;
	let errorElement = document.getElementById("validation");

	for (char of insertedEmail) {
		if (char == '@') {
			standardCharacterMails = true;
		} else if (char == '.') {
			isThereDot = true;
		}
	}


	if (!standardCharacterMails) {
		errorElement.innerHTML += "There is not '@' character in your mail!<BR>";
	}
	if (!isThereDot) {
		errorElement.innerHTML += "There is not '.' in your mail<BR>";
	}
	if (insertedEmail.length < 5) {
		errorElement.innerHTML += "Your mail should contain at least 5 characters!<BR>";
	}

	return standardCharacterMails && isThereDot && insertedEmail.length >= 5;
}

// check and sends validation message
function checkValidityUserName(insertedUserName) {
	let errorElement = document.getElementById("validation");

	let hasMinSizeLimit = insertedUserName.length > 5;
	let hasMaxSizeLimit = insertedUserName.length < 20;

	if (!hasMinSizeLimit) {
		errorElement.innerHTML += "User name has to be minimum 5 character long <BR>";
	}
	if (!hasMaxSizeLimit) {
		errorElement.innerHTML += "User name has to be maximum 20 charactes long! <BR>"
	}

	return hasMinSizeLimit && hasMaxSizeLimit;
}
