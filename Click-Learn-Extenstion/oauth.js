  window.onload = function() {
    chrome.storage.local.get('accessToken', function(result) {
      const token = result.accessToken;
      console.log('Token retrieved from storage:', token);

    if(result.accessToken){
      chrome.identity.getAuthToken({interactive: true,scopes: ['profile']}, function(accessToken) {
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
              'https://people.googleapis.com/v1/people/me?personFields=names&key=AIzaSyAeyJVqlcotDtxTynhsN9p6HO0_V-gzEts',
              init)
              .then((response) => response.json())
              .then(function(data) {
                document.getElementsByClassName("loader")[0].style.display = "none";
                document.getElementById("welcome_name").innerHTML = "Hello"+ " " + data.names[0].givenName + " " + data.names[0].familyName
                document.getElementById("loginGoogle").style.display = "none";
                document.getElementById("logoutGoogle").style.display = "block";
              });
          });
    }

  });

    document.querySelector('#loginGoogle').addEventListener('click', function(token) {
        document.getElementsByClassName("loader")[0].style.display = "block";
        getToken().then(() => {
          document.getElementsByClassName("loader")[0].style.display = "none";
          document.getElementById("welcome_name").innerHTML = "Hello"+ " " + data.names[0].givenName + " " + data.names[0].familyName
          document.getElementById("loginGoogle").style.display = "none";
          document.getElementById("logoutGoogle").style.display = "block";
        });

        });

        function getToken(){
          chrome.identity.getAuthToken({interactive: true,scopes: ['profile']}, function(token) {
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
                  'https://people.googleapis.com/v1/people/me?personFields=names&key=AIzaSyAeyJVqlcotDtxTynhsN9p6HO0_V-gzEts',
                  init)
                  .then((response) => response.json())
                  .then(function(data) {
                    console.log(token);
              
                    chrome.storage.local.set({ 'accessToken': token }).then(() => {
                      console.log("Value is set to " + token);
                    });
                    console.log(data);
                    return data
             
                  });
              });
        }
  
  
  
  
        document.getElementById("logoutGoogle").addEventListener('click', function() {
        document.getElementsByClassName("loader")[0].style.display = "block";
        chrome.identity.getAuthToken({interactive: true}, function(token) {
          console.log(token);
          if (token) {
            chrome.identity.removeCachedAuthToken({token: token}, function() {
              console.log('Token removed.');
              document.getElementsByClassName("loader")[0].style.display = "none";
                  document.getElementById("loginGoogle").style.display = "flex";
                  document.getElementById("logoutGoogle").style.display = "none";
                  document.getElementById("welcome_name").innerHTML = "";
                });
              }
            });
          });
  
    };

    function showProgressBar() {
      let loaderDiv = document.getElementById("loader");
      loaderDiv.innerHTML = '<progress id="progressBar" value="0" max="100"></progress>';
    }
    

      
        
    // document.querySelector('button').addEventListener('click', function() {
    //     document.getElementsByClassName("loader")[0].style.display = "block";
    //     document.getElementById("loginGoogle").disabled = true;
    //     setTimeout(() => {
    //         document.getElementsByClassName("loader")[0].style.display = "none";
    //     }, 2000)
    //     chrome.identity.getAuthToken({interactive: true}, function(token) {
    //         let init = {
    //             method: 'GET',
    //             async: true,
    //             headers: {
    //                 Authorization: 'Bearer ' + token,
    //                 'Content-Type': 'application/json'
    //             },
    //             'contentType': 'json'
    //         };
    //         fetch(
    //             'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyAeyJVqlcotDtxTynhsN9p6HO0_V-gzEts',
    //             init)
    //             .then((response) => response.json())
    //             .then(function(data) {
    //                 console.log(data)
    //             });
    //             document.getElementById("loginGoogle").disabled = false;
    //         });
    //     });


  //   function revokeToken() {
  //     user_info_div.innerHTML = "";
  //     chrome.identity.getAuthToken({ interactive: false }, 
  //       function (current_token) {
  //         if (!chrome.runtime.lastError) {
  //           // @corecode_begin removeAndRevokeAuthToken
  //           // @corecode_begin removeCachedAuthToken
  //           // Remove the local cached token
  //           chrome.identity.removeCachedAuthToken({token: current_token}, function(){});
  //           // @corecode_end removeCachedAuthToken
  
  //           // Make a request to revoke token in the server
  //           var xhr = new XMLHttpRequest();
  //           xhr.open(
  //           "GET", 
  //           "https://accounts.google.com/o/oauth2/revoke?token=" + current_token);
              
  //           xhr.send();
  //           // @corecode_end removeAndRevokeAuthToken
  
  //           // Update the user interface accordingly
  //           changeState(STATE_START);
  //           sampleSupport.log("Token revoked and removed from cache. " + 
  //             "Check chrome://identity-internals to confirm.");
  //         }
  //     });
  // }
//   window.onload = function() {
  
//     // Logout button event listener
//     document.getElementById("logoutGoogle").addEventListener('click', function() {
//       chrome.identity.getAuthToken({interactive: false}, function(token) {
//         if (token) {
//           chrome.identity.removeCachedAuthToken({token: token}, function() {
//             console.log('Token removed.');
//           });
//         }
//       });
//     });
//   };
  
