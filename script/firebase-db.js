var firebaseConfig = {
    apiKey: "AIzaSyBzF1H28INVCR7UYaizxmwlhu3GSD_OMtQ",
    authDomain: "boring-quiz.firebaseapp.com",
    databaseURL: "https://boring-quiz.firebaseio.com",
    projectId: "boring-quiz",
    storageBucket: "boring-quiz.appspot.com",
    messagingSenderId: "409552787706",
    appId: "1:409552787706:web:862ce46dff2bd0a2fb9143"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const login = (email, password, callback) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        // Success - redirect
        callback(true);
    }, (error) => {
        const errorCode = error.code;
        //Here we use the error message like it is returned by the firebase (the message is in english)
        const errorMessage = error.message;

        // handle error with login
        callback(false, errorCode, errorMessage);
    });
};
const logout = () => {
    return firebase.auth().signOut();
};

const register = (username, email, password, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
        data.user.updateProfile({
            displayName: username
        }).then(function () {
            callback(true);
        }, function (error) {
            console.log(error);
        });
    }, (error) => {
        const errorCode = error.code;
        let errorMessage;

        // Here we analyze the code and set custom error message (in bulgarian) just for the sake of the exersice
        switch (errorCode) {
            case 'auth/weak-password':
                {
                    errorMessage = "Registration failed. Weak password.";
                    break;
                }
            case 'auth/email-already-in-use':
                {
                    errorMessage = "Registration failed. Email is already used.";
                    break;
                }
            case 'auth/invalid-email':
                {
                    errorMessage = "Registration failed. Email is not valid.";
                    break;
                }
            default:
                {
                    errorMessage = "Registration failed.";
                }
        }

        callback(false, errorCode, errorMessage);
    });
};