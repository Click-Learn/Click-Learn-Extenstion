window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        console.log(token);
      });
    });
  };


  window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
        document.getElementsByClassName("loader")[0].style.display = "block";
        document.getElementById("loginGoogle").disabled = true;
        setTimeout(() => {
            document.getElementsByClassName("loader")[0].style.display = "none";
        }, 2000)
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
                    console.log(data);
                });
                document.getElementById("loginGoogle").disabled = false;
            });
        });
    
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
  
  
  
        document.getElementById("logoutGoogle").addEventListener('click', function() {
            chrome.identity.getAuthToken({interactive: false}, function(token) {
              if (token) {
                chrome.identity.removeCachedAuthToken({token: token}, function() {
                  console.log('Token removed.');
                });
              }
            });
          });
  
    };



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
  

  function showProgressBar() {
    let loaderDiv = document.getElementById("loader");
    loaderDiv.innerHTML = '<progress id="progressBar" value="0" max="100"></progress>';
  }
  