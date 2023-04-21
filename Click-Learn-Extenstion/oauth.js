window.onload = function() {
  chrome.storage.local.get('accessToken', function(result) {
    const token = result.accessToken;
    console.log('Token retrieved from storage:', token);

    if (result.accessToken) {
      getUserInfo(token);
    }
  });

  document.querySelector('#loginGoogle').addEventListener('click', function(token) {
    document.getElementsByClassName("loader")[0].style.display = "block";

    chrome.identity.getAuthToken({interactive: true, scopes: ['profile','email']}, function(token) {
      chrome.storage.local.set({ 'accessToken': token }, function() {
        console.log("Value is set to " + token);
      });
      getUserInfo(token);
    });
  });

  document.getElementById("logoutGoogle").addEventListener('click', function() {
    document.getElementsByClassName("loader")[0].style.display = "block";
    chrome.storage.local.get('accessToken', function(result) {
      const token = result.accessToken;
      if (token) {
        revokeToken(token);
        chrome.identity.removeCachedAuthToken({token: token}, function() {
          console.log('Token removed.');
          chrome.storage.local.remove('accessToken', function() {
            console.log('Access token removed from storage.');
            document.getElementsByClassName("loader")[0].style.display = "none";
            document.getElementById("loginGoogle").style.display = "flex";
            document.getElementById("logoutGoogle").style.display = "none";
            document.getElementById("welcome_name").innerHTML = "";
          });
        });
      }
    });
  });

};

//  function getUserInfo(token) {
//   let init = {
//     method: 'GET',
//     async: true,
//     headers: {
//       Authorization: 'Bearer ' + token,
//       'Content-Type': 'application/json'
//     },
//     'contentType': 'json'
//   };
//   fetch(
//     'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses&key=AIzaSyAeyJVqlcotDtxTynhsN9p6HO0_V-gzEts',
//     init)
//     .then((response) => response.json())
//     .then(function(data) {
//       console.log(data);
//       console.log(data.emailAddresses[0].value);
//       document.getElementsByClassName("loader")[0].style.display = "none";
//       document.getElementById("welcome_name").innerHTML = "Hello" + " " + data.names[0].givenName + " " + data.names[0].familyName;
//       document.getElementById("loginGoogle").style.display = "none";
//       document.getElementById("logoutGoogle").style.display = "block";
//     });
// }

function getUserInfo(token) {
  let init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };
  fetch(
    'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses&key=AIzaSyAeyJVqlcotDtxTynhsN9p6HO0_V-gzEts',
    init)
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
      document.getElementsByClassName("loader")[0].style.display = "none";
      document.getElementById("welcome_name").innerHTML = "Hello" + " " + data.names[0].givenName + " " + data.names[0].familyName;
      document.getElementById("loginGoogle").style.display = "none";
      document.getElementById("logoutGoogle").style.display = "block";
      
      // Extract email address from response
      const email = data.emailAddresses[0].value;
      console.log(email);
    });
}


function revokeToken(token) {
  fetch('https://accounts.google.com/o/oauth2/revoke?token=' + token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    console.log('Token revoked:', response);
  }).catch(error => {
    console.error('Error revoking token:', error);
  });
}