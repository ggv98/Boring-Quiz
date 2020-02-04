let usernameElem = document.getElementById("page-header-username");
(function(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      usernameElem.innerText = "Hello" + " " + user.displayName;
    } else {
      alert ("If use firefox go to incognito mode")
      window.location = "index.html";
    }
  });
})();
const exit = () =>{
   console.log( logout());
    window.location = "index.html";
} 