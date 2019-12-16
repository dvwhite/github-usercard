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

// Globals
const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <div class="row">
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
  <div class="row">
    <div class="calendar">
      <img class="graph" src=""/>
    </div>
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
* @param {Array} arrToPushTo: The array to push the element to
* @returns: none
*/
function createAndPushElement(elementStr, elementText, arrToPushTo) {
  const element = createElementWithText(elementStr, elementText);
  arrToPushTo.push(element);
}

/*
* Append all child nodes to the parent node
* @param {Array} children: The array of child nodes
* @param {object} parent: The parent node to append to
*/
function appendChildren(children, parent) {
  children.forEach(child => parent.appendChild(child));
}


  ////////////////////////////
 //    Components / API    //
////////////////////////////

/*
* Create a card component intended for adding to the DOM
* @param {object} cardObj: The object containing data used to create the card
* @returns {object} card: The card created by the function
*/
function createCard(data) {
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

  // Arrays of child nodes
  // These are pushed as content is created, then later  
  // appended to the parent node using Array.forEach 
  const outerDivChildren = [];
  const profileDivChildren = [];
  const firstRowChildren = [];
  const secondRowChildren = [];

  // Outer div
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('card');
  outerDiv.style.flexDirection = 'column';

  // Stretch: The component will have two rows:
  // First row will be the profile pic,
  // Second row will be the graph

  // Row one
  const firstRowDiv = document.createElement('div');
  firstRowDiv.classList.add('row');
  firstRowDiv.style.display = 'flex';
  outerDivChildren.push(firstRowDiv);

  // Profile div
  const outerProfileDiv = document.createElement('div');
  outerProfileDiv.classList.add('card-info');
  outerProfileDiv.style.display = 'flex'; 

  // Avatar img
  const avatarDiv = document.createElement('div');
  const avatarImg = document.createElement('img');
  avatarImg.setAttribute('src', avatarImgURL);
  avatarDiv.appendChild(avatarImg);
  outerProfileDiv.appendChild(avatarDiv);

  // Profile content
  const profileDiv = document.createElement('div');
  outerProfileDiv.appendChild(profileDiv);
  profileDiv.style.display = 'flex';
  profileDiv.style.flexDirection = 'column';
  firstRowChildren.push(outerProfileDiv);

  // h3
  const nameHeading = createElementWithText('h3', name);
  nameHeading.classList.add('name');
  profileDivChildren.push(nameHeading);

  // p: username
  const pUsername = createElementWithText('p', username);
  pUsername.classList.add('username');
  profileDivChildren.push(pUsername);

  // p: location
  createAndPushElement('p', `Location: ${location}`, profileDivChildren);

  // p: profile
  const pProfile = createElementWithText('p', 'Profile:');
  const aProfile = createElementWithText('a', githubURL);
  aProfile.setAttribute('href', githubURL);
  pProfile.appendChild(aProfile);
  profileDivChildren.push(pProfile);

  // p: followers
  createAndPushElement('p', `Followers: ${followers}`, profileDivChildren);

  // p: following
  createAndPushElement('p', `Following: ${following}`, profileDivChildren);
  
  // p: bio
  const pBio = document.createElement('p');
  pBio.textContent = `Bio: ${bio}`;
  profileDivChildren.push(pBio);

  // Row two
  const secondRowDiv = document.createElement('div');
  secondRowDiv.classList.add('row');
  outerDivChildren.push(secondRowDiv);

  // Stretch: contribution graph
  const graphDiv = document.createElement('div');
  secondRowChildren.push(graphDiv);
  // graphDiv.classList.add('calendar');

  // graph properties
  const graphImg = document.createElement('img');
  graphImg.src = `http://ghchart.rshah.org/${data.login}`;
  graphImg.alt = "dvwhite's Github chart";

  // graph styles
  graphImg.style.width = '100%';
  graphImg.style.border = '1px solid lightgray';
  graphDiv.style. paddingTop = '1rem';

  // Append graph
  graphDiv.appendChild(graphImg);

  // Append child nodes to their destination parent nodes
  appendChildren(profileDivChildren, profileDiv);
  appendChildren(firstRowChildren, firstRowDiv);
  appendChildren(secondRowChildren, secondRowDiv);
  appendChildren(outerDivChildren, outerDiv);
  return outerDiv;
}

/*
* Creates a card using the card data and appends it to cards div
* @param {object} cardData: The data used to create the card
* @param {object} cardsDiv: The parent div to append the new card to
* @returns: none
*/
function createAndAppendCard(cardData, cardsDiv) {
  const newCard = createCard(cardData);
  cardsDiv.appendChild(newCard);
}

/*
* Create cards and append them to the destination element
* @param {object} cardsObj: The object with children to add to the parent node
* @param {object} destination: The parent node to append to 
* @returns: none
*/
function createAndAppendFollowerCards(cardsObj, destination, apiURL) {
  const cards = cardsObj.data;
  cards.forEach(card => {
    userLogin = card.login;
    userAPIURL = apiURL + userLogin;
    addGitHubUserCard(userAPIURL, destination);
  });
}

/*
* Get GitHub user data using the GitHub API
* @param {string} apiURL: The github api URL
*/
function getGithubUserData(apiURL) {
  return axios.get(apiURL);
}

/*
* Get GitHub user card using data from the GitHub API
* @param {string} apiURL: The github api URL
* @param {object} destination: The destination to add card to
*/
function addGitHubUserCard(apiURL, destination) {
  getGithubUserData(apiURL)
  .then(response => {
    const cardData = response.data;
    createAndAppendCard(cardData, destination, apiURL)
  })
  .catch(err => {
    console.log("Error:", err)
  });
}

// Get and use API data
const ghBaseAPIURL = 'https://api.github.com/users/';
const initialUser = 'dvwhite';
const ghAPIURL = ghBaseAPIURL + initialUser;
getGithubUserData(ghAPIURL)
  .then(response => {
    // Add profile card for the user
    const cardData = response.data;
    const cardsDiv = document.querySelector('.cards');
    createAndAppendCard(cardData, cardsDiv, ghAPIURL);

    // Get cards for each of the user's followers
    const followersURL = response.data.followers_url;
    return axios.get(followersURL);
  })
  .then(followersResponse => {
    const cardsDiv = document.querySelector('.cards');
    createAndAppendFollowerCards(followersResponse, cardsDiv, ghBaseAPIURL);
  })
  .catch(err => {
    console.log("Error:", err);
  });