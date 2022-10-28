"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;


//on loginForm form submit run this function
//submits user data to API and creates new User instance 
async function login(evt) {
  evt.preventDefault();
  const username = $("#login-username").val();
  const password = $("#login-password").val();
  // set currentUser to new User instance
  currentUser = await User.login(username, password);
  $loginForm.trigger("reset");
  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}
$loginForm.on("submit", login);


//collect user's info, runs User.signup method, returns new User instace
async function signup(evt) {
  evt.preventDefault();
  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();
  // on Create Account form submit run User.signup
  // set currentUser to new User instance
  currentUser = await User.signup(username, password, name);
  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  $signupForm.trigger("reset");
}
$signupForm.on("submit", signup);

//when logout button clicked, clear local storage and reload page
function logout(evt) {
  localStorage.clear();
  location.reload();
}
$navLogOut.on("click", logout);

//called on page load start(). Checks local storage for username&token
//attempts to log in
async function checkForRememberedUser() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;
  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
  //returns User object, assign this to currentUser
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
  // console.debug("saveUserCredentialsInLocalStorage");
  //if currentUser is set to true (user is logged in), save token & username in local storage
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {

  //hides all compenents first
  hidePageComponents();
  // display current stories 
  putStoriesOnPage();
  $allStoriesList.show(); 
  
  // update Nav bar
  updateNavOnLogin();
  // retrieve's currentUser information
  generateUserProfile();
}


//userProfile populated 
//generate user profile page based off current user instance
function generateUserProfile() {
  $("#profile-name").text(currentUser.name);
  $("#profile-username").text(currentUser.username);
  $("#profile-account-date").text(currentUser.createdAt.slice(0, 10));
}