let isImageAppended = false;
let icon;

document.addEventListener('selectionchange', () => {
  const selectedText = window.getSelection().toString();
  if (selectedText && !isImageAppended) {
    icon = document.createElement("img");
    icon.id = "icon";
    icon.src = "https://i.ibb.co/QXWwJ9h/Click-Learn-Icon.png";
    icon.width = 30;
    icon.style.cursor = "pointer";
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    icon.style.position = "absolute";
    icon.style.zIndex = "999999";
    icon.style.top = `${rect.top + 20 + window.pageYOffset}px`;
    icon.style.left = `${rect.left + 45 + window.pageXOffset}px`;
    document.documentElement.appendChild(icon);
    chrome.runtime.sendMessage({ text: selectedText });
    isImageAppended = true;
  
    setTimeout(() => {
      icon.remove();
      isImageAppended = false;
    }, 10000);
  }

  icon.addEventListener("click", () => {
    const selectedText = window.getSelection().toString();
    showModal(selectedText);
  });
});

document.addEventListener('mousedown', (e) => {
  if (icon && !icon.contains(e.target) && e.target !== icon) {
    icon.remove();
    isImageAppended = false;
  } 
});
function showModal(text) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.width = "300px";
  modal.style.MaxWidth = "400px";
  modal.style.height = "260px";
  modal.style.maxHeight = "300px";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "white";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  modal.style.zIndex = "999999";
  modal.style.borderRadius = "20px";
  modal.style.overflow = "auto";
  modal.style.margin = "0";
  modal.style.padding = "0";
  
  const modalHeader = document.createElement("div");
  modalHeader.style.marginTop = "0"
  modalHeader.style.width = "100%";
  modalHeader.style.height = "70px";
  modalHeader.style.borderRadius = "20px 20px 20px 20px";
  modalHeader.style.backgroundColor = "#55B85E";
  
  modal.appendChild(modalHeader);
  
  
  const ModalENContainer = document.createElement("div");
  ModalENContainer.style.margin = "15px auto 0 auto";
  ModalENContainer.style.width = "85%";
  ModalENContainer.style.height = "70px";
  ModalENContainer.style.backgroundColor = "white";
  ModalENContainer.style.boxShadow = "rgba(0, 0, 0, 0.15) 0px 0px 7px 0px";
  ModalENContainer.style.borderRadius = "10px";
  ModalENContainer.style.overflow = "auto";
  ModalENContainer.style.padding = "5px";
  ModalENContainer.style.textAlign = "right";
  
  modal.appendChild(ModalENContainer);
  
  
  const ModalHEContainer = document.createElement("div");
  ModalHEContainer.style.margin = "15px auto 0 auto";
  ModalHEContainer.style.width = "85%";
  ModalHEContainer.style.height = "60px";
  ModalHEContainer.style.backgroundColor = "white";
  ModalHEContainer.style.boxShadow = "rgba(0, 0, 0, 0.15) 0px 0px 7px 0px";
  ModalHEContainer.style.borderRadius = "10px";
  ModalHEContainer.style.overflow = "auto";
  ModalHEContainer.style.padding = "5px";
  ModalHEContainer.style.textAlign = "right";

  modal.appendChild(ModalHEContainer);





  const EnglishSelectedText = document.createElement("p");
  EnglishSelectedText.textContent = text;
  ModalENContainer.appendChild(EnglishSelectedText);

  const HebrewTransltedText = document.createElement("p");
  HebrewTransltedText.textContent = text;
  ModalHEContainer.appendChild(HebrewTransltedText);



  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "16px";
  closeButton.style.color = "gray";
  closeButton.addEventListener("click", () => {
    console.log(modal);
    document.body.removeChild(modal);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  });
  modal.appendChild(closeButton);

  document.body.appendChild(modal);

  document.addEventListener("mousedown", (event) => {
    if (!modal.contains(event.target)) {
      modal.remove();
    }
  });
}


// openAuth(){
//   document.body.append()
// }
// openAuth() {
//   document.body.innerHTML("<a href="https://accounts.google.com/o/oauth2/auth?state=%7B%22csrf%22%3A%22fed92707-6b3c-441a-96c4-32a098488080%22%2C%22success_page%22%3Anull%2C%22pkce_oauth%22%3Anull%7D&amp;scope=email+profile&amp;client_id=600979030768-7o35cjq1gv138e22oj0j39u0bp0mn3hj.apps.googleusercontent.com&amp;redirect_uri=https%3A%2F%2Ftodoist.com%2FUsers%2FgplusRedirect&amp;response_type=token&amp;apppackagename=com.todoist&amp;prompt=select_account" data-gtm-id="google-provider-link" aria-disabled="false" class="nFxHGeI SNaOf6C W-FS4gj _8313bd46 f169a390 _95951888 _2a3b75a1 _56a651f6"><div aria-hidden="true" class="a44d4350 _2a3b75a1 _509a57b4 e5a9206f"><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="MfSWZ05" aria-hidden="true"><g fill="none" fill-rule="evenodd"><path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"></path><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"></path><path d="M0 0h18v18H0z"></path></g></svg></div><span class="_0051d171 _2a3b75a1 f973eed0 f6342c26">Continue with Google</span></a>")
// }
// function openAuth() {
//   const iframe = document.createElement('iframe');
//   iframe.setAttribute('src', 'https://accounts.google.com/gsi/select?client_id=542417165126-tajqofllkjmbkpjm2uvvg6tskvio897g.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=aPZNxhmkBcHKeJpafc1gTw&channel_id=1e2a8848e5f05fb38227cdb6e2e06104ff3cc7f00ca14f9c102ab5071186004f&origin=https%3A%2F%2Fwww.voice-box-ai.com');
//   iframe.setAttribute('width', 500);
//   iframe.setAttribute('height', 800);

//   // const container = document.getElementById(containerId);
//   body.appendChild(iframe);
// }

// document.getElementById("openAuth").addEventListener("click", () => {
//   const iframe = document.createElement('iframe');
//   iframe.setAttribute('src', 'https://accounts.google.com/gsi/select?client_id=542417165126-tajqofllkjmbkpjm2uvvg6tskvio897g.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=aPZNxhmkBcHKeJpafc1gTw&channel_id=1e2a8848e5f05fb38227cdb6e2e06104ff3cc7f00ca14f9c102ab5071186004f&origin=https%3A%2F%2Fwww.voice-box-ai.com');
//   iframe.setAttribute('width', 500);
//   iframe.setAttribute('height', 800);


//   document.getElementById("iframeAuth").appendChild(iframe);
// })


// function onSignIn(googleUser) {
//   // Get the user's ID token and basic profile information
//   var id_token = googleUser.getAuthResponse().id_token;
//   var profile = googleUser.getBasicProfile();
// console.log(id_token);
// console.log(profile);
//   // Send the ID token to your server to authenticate the user
//   // ...
// }





document.addEventListener("DOMContentLoaded", function () {
  console.log(document.domain);//It outputs id of extension to console
  chrome.tabs.query({ //This method output active URL 
      "active": true,
      "currentWindow": true,
      "status": "complete",
      "windowType": "normal"
  }, function (tabs) {
      for (tab in tabs) {
          console.log(tabs[tab].url);
      }
  });
});
// openAuth(500, 800);

// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//   if (request.method == "getSelection")
//     sendResponse({data: window.getSelection().toString()});
//   else
//     sendResponse({}); // snub them.
// });




  // function saveToEmail(translation) {
  //   var accessToken = null;
  //   chrome.identity.getAuthToken({interactive: true}, function(token) {
  //     accessToken = token;
  //     chrome.identity.getProfileUserInfo(function(userInfo) {
  //       var email = userInfo.email;
  //       var subject = "New translation: " + translation;
  //       var body = "Translation: " + translation;
  //       var message = "To: " + email + "\r\n" +
  //                     "Subject: " + subject + "\r\n\r\n" +
  //                     body;
  //       var encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_');
  //       var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages/send";
  //       fetch(url, {
  //         method: "POST",
  //         headers: {
  //           "Authorization": "Bearer " + accessToken,
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           "raw": encodedMessage
  //         })
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //       });
  //     });
  //   });
  // }



  // function saveToEmailAndServer(translation) {
  //   saveToEmail(translation);
  //   fetch('https://example.com/api/save-translation', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({translation: translation})
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   });
  // }