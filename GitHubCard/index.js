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
  const outerDivChildren = [];
  const innerDivChildren = [];

  // Outer div
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
  innerDivChildren.push(nameHeading);

  // p: username
  const pUsername = createElementWithText('p', username);
  pUsername.classList.add('username');
  innerDivChildren.push(pUsername);

  // p: location
  createAndPushElement('p', `Location: ${location}`, innerDivChildren);

  // p: profile
  const pProfile = createElementWithText('p', 'Profile:');
  const aProfile = createElementWithText('a', githubURL);
  aProfile.setAttribute('href', githubURL);
  pProfile.appendChild(aProfile);
  innerDivChildren.push(pProfile);

  // p: followers
  createAndPushElement('p', `Followers: ${followers}`, innerDivChildren);

  // p: following
  createAndPushElement('p', `Following: ${following}`, innerDivChildren);
  
  // p: bio
  createAndPushElement('p', `Bio: ${bio}`, innerDivChildren);

  // Stretch: contribution graph
  const graphDiv = document.createElement('div');
  graphDiv.classList.add('calendar');
  graphDiv.style.width = 'auto';
  graphDiv.id = 'calendar';
  innerDivChildren.push(graphDiv);
  outerDiv.style.width = '1045px'; // An ideal width for the graph

  // Call the github calendar library function
  GitHubCalendar('#calendar', username);

  // Append child nodes to their destination parent nodes
  appendChildren(innerDivChildren, innerDiv);
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

  // Remove the calendar id from the previous card
  // if necessary
  cardsArr = Array.from(cardsDiv.childNodes);
  cardIdx = cardsArr.indexOf(newCard);
  console.log(cardsArr, cardIdx)
  if (cardIdx > 0) {
    const cardToModify = cardsArr[cardIdx - 1]
    if (cardToModify.id =='#calendar') {
      cardToModify.removeAttribute('id');
    }
  }
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