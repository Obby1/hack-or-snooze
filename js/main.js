"use strict";

// define JQuery variables

const $body = $("body");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmitStory = $("#nav-submit-story");
const $submitForm = $("#submit-form");
const $storiesLists = $(".stories-list");
const $favoritedStories = $("#favorited-stories");
const $ownStories = $("#my-stories");
const $userProfile = $("#user-profile");
const $stars = $("#starry-night")


/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $storiesLists,
    $submitForm,
    $loginForm,
    $signupForm,
    $userProfile
  ];
  components.forEach(c => c.hide());
}

//This functions starts the app by checking if a user is remembered and loading
// stories to start 
async function start() {
  // checks for user credentials on local storage or returns false
  await checkForRememberedUser();

  // connects with API and pulls up current stories, displays on page
  await getAndShowStoriesOnStart();

  // if we get a logged-in user update user UI (updates Nav:
  // shows logout button, submit, favorites, my stories)
  if (currentUser) updateUIOnUserLogin();
}


//removes splash overlay 
setTimeout(function(){
  $(`#splash-overlay`).remove();
  $stars.show();
}, 3100)

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");

$(start);
