/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

axios.get('https://api.github.com/users/dvwhite')
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log("Error:", err)
  });


  //////////////////////
 // Helper functions //
//////////////////////

/*
* A generic element component that sets the textContent after creation
* @param {string} elementStr: The string defining the element to create
* @param {string} elementText: The text to set as the element.textContent
* @returns: The element created
*/
function createElementWithText(elementStr, elementText) {
  const element = document.createElement(elementStr);
  if (elementText != '') {
    element.textContent = elementText;
  }
  return element;
}

/*
* A generic element component that sets the textContent after creation
* @param {string} elementStr: The string defining the element to create
* @param {string} elementText: The text to set as the element.textContent
* @param {string} arrToPushTo: The array to push the element to
* @returns: none
*/
function createAndPushElement(elementStr, elementText, arrToPushTo) {
  const element = createElementWithText(elementStr, elementText);
  arrToPushTo.push(element);
}


  //////////////////////
 //    Components    //
//////////////////////


// {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
// config: {url: "https://api.github.com/users/dvwhite", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
// data:
// avatar_url: "https://avatars0.githubusercontent.com/u/47503507?v=4"
// bio: null
// blog: ""
// company: null
// created_at: "2019-02-10T17:26:54Z"
// email: null
// events_url: "https://api.github.com/users/dvwhite/events{/privacy}"
// followers: 25
// followers_url: "https://api.github.com/users/dvwhite/followers"
// following: 29
// following_url: "https://api.github.com/users/dvwhite/following{/other_user}"
// gists_url: "https://api.github.com/users/dvwhite/gists{/gist_id}"
// gravatar_id: ""
// hireable: null
// html_url: "https://github.com/dvwhite"
// id: 47503507
// location: "Charlottesville, VA"
// login: "dvwhite"
// name: "David White"
// node_id: "MDQ6VXNlcjQ3NTAzNTA3"
// organizations_url: "https://api.github.com/users/dvwhite/orgs"
// public_gists: 0
// public_repos: 22
// received_events_url: "https://api.github.com/users/dvwhite/received_events"
// repos_url: "https://api.github.com/users/dvwhite/repos"
// site_admin: false
// starred_url: "https://api.github.com/users/dvwhite/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/dvwhite/subscriptions"
// type: "User"
// updated_at: "2019-12-12T03:04:04Z"
// url: "https://api.github.com/users/dvwhite"}


//  <div class="card">
//   <img src={image url of user} />
//   <div class="card-info">
//     <h3 class="name">{users name}</h3>
//     <p class="username">{users user name}</p>
//     <p>Location: {users location}</p>
//     <p>Profile:  
//       <a href={address to users github page}>{address to users github page}</a>
//     </p>
//     <p>Followers: {users followers count}</p>
//     <p>Following: {users following count}</p>
//     <p>Bio: {users bio}</p>
//   </div>
// </div>


/*
* Create a card component intended for adding to the DOM
* @param {object} cardObj: The object containing data used to create the card
* @returns {object} card: The card created by the function
*/
function createCard(cardObj) {
  const data = cardObj.data;
  
  // Profile data
  const avatarImgURL = data.avatar_url;
  const name = data.name;
  const username = data.login;
  const location = data.location;
  const githubURL = data.html_url;
  const followers = data.followers;
  const following = data.following;
  const bio = data.bio;

  // Create the component HTML
  const outerDivChildren = [];
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('card');

  // Avatar img
  const avatarImg = document.createElement('img');
  avatarImg.setAttribute('src', avatarImgURL);
  outerDivChildren.push(avatarImg);

  // Profile content
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('card-info');
  outerDivChildren.push(innerDiv);

  // h3
  const nameHeading = createElementWithText('h3', name);
  nameHeading.classList.add('name');
  outerDivChildren.push(nameHeading);

  // p: username
  const pUsername = createElementWithText('p', username);
  pUsername.classList.add('username');
  outerDivChildren.push(pUsername);

  // p: location
  createAndPushElement('p', `Location: ${location}`, outerDivChildren);


}