let isImageAppended = false;
let icon;
var token;
document.addEventListener('selectionchange', () => {
  chrome.storage.local.get('accessToken', function (result) {
    token = result.accessToken;
  });


  const selectedText = window.getSelection().toString();
  if (selectedText && !isImageAppended) {
    icon = document.createElement("img");
    icon.id = "icon";
    icon.src = "https://i.ibb.co/9t8DNZX/image-2.png";
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
async function showModal(text) {
  const modal = document.createElement("div");
  // modal.style.zIndex = "9999";
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
  // modal.style.overflow = "auto";
  modal.style.margin = "0";
  modal.style.padding = "0";
  modal.style.display = "flex";
  modal.style.flexDirection = "column";


  const modalHeader = document.createElement("div");
  modalHeader.style.marginTop = "0"
  modalHeader.style.width = "100%";
  modalHeader.style.height = "70px";
  modalHeader.style.borderRadius = "20px 20px 20px 20px";
  modalHeader.style.backgroundColor = "#2CCD85";

  const logo = document.createElement("img");
  logo.style.width = "50%";
  logo.style.margin = "6px 10px";
  logo.src = "https://i.ibb.co/C09NZwD/CLICK-LEARN-4.png";


  // Create an anchor element
  const logoLink = document.createElement("a");
  logoLink.href = "http://localhost:3000/";
  logoLink.style.display = "inline-block";

  logoLink.appendChild(logo);

  modalHeader.appendChild(logoLink);


  modal.appendChild(modalHeader);


  const ModalENContainer = document.createElement("div");
  ModalENContainer.style.margin = "15px auto 0 auto";
  ModalENContainer.style.width = "85%";
  ModalENContainer.style.height = "40px";
  ModalENContainer.style.backgroundColor = "white";
  ModalENContainer.style.boxShadow = "rgba(0, 0, 0, 0.15) 0px 0px 7px 0px";
  ModalENContainer.style.borderRadius = "10px";
  // ModalENContainer.style.overflow = "auto";
  ModalENContainer.style.padding = "5px";
  ModalENContainer.style.textAlign = "center";

  modal.appendChild(ModalENContainer);


  const ModalHEContainer = document.createElement("div");
  ModalHEContainer.style.margin = "10px auto 0 auto";
  ModalHEContainer.style.width = "85%";
  ModalHEContainer.style.height = "40px";
  ModalHEContainer.style.backgroundColor = "white";
  ModalHEContainer.style.boxShadow = "rgba(0, 0, 0, 0.15) 0px 0px 7px 0px";
  ModalHEContainer.style.borderRadius = "10px";
  // ModalHEContainer.style.overflow = "auto";
  ModalHEContainer.style.padding = "5px";
  ModalHEContainer.style.textAlign = "center";

  modal.appendChild(ModalHEContainer);



  if (isSingleWord(text)) {


    const EnglishSelectedText = document.createElement("p");
    EnglishSelectedText.textContent = text;
    EnglishSelectedText.id = "EnglishWordTag";
    EnglishSelectedText.style.color = "#252525"
    ModalENContainer.appendChild(EnglishSelectedText);

    translateWord(text).then((hebrewWord) => {
      const HebrewTransltedText = document.createElement("p");
      HebrewTransltedText.textContent = hebrewWord;
      HebrewTransltedText.id = "HebrewWordTag";
      HebrewTransltedText.style.color = "#252525"
      ModalHEContainer.appendChild(HebrewTransltedText);
    });
  } else {
    const EnglishSelectedText = document.createElement("p");
    EnglishSelectedText.textContent = "נא לסמן מילה אחת";
    EnglishSelectedText.id = "moreThanOneWord";
    EnglishSelectedText.style.color = "#252525"
    ModalENContainer.appendChild(EnglishSelectedText);

    ModalHEContainer.style.display = "none";

  }


  const saveWordButton = document.createElement("button");
  saveWordButton.textContent = "שמור את המילה";
  saveWordButton.style.backgroundColor = "#2CCD85";
  saveWordButton.style.color = "white";
  saveWordButton.style.margin = "10px auto 0 auto";
  saveWordButton.style.border = "none";
  saveWordButton.style.borderRadius = "6px";
  saveWordButton.style.height = "34px";
  saveWordButton.style.width = "156px";

  // Create a div element
  const divElement = document.createElement("div");
  divElement.style.textAlign = "center"; // Optional: Align the link to the center

  // Create an anchor element
  const anchorElement = document.createElement("a");
  anchorElement.textContent = "מעבר לאתר";
  anchorElement.href = "http://localhost:3000/";
  anchorElement.style.display = "inline-block"; // Optional: Align the link to the center
  anchorElement.style.marginTop = "5px"; // Optional: Add some margin to the top

  // Append the anchor element to the div element
  divElement.appendChild(anchorElement);
  modal.appendChild(divElement);


  if (ModalHEContainer.style.display === "none") {
    saveWordButton.style.display = "none";
  }

  saveWordButton.addEventListener("mouseover", function () {
    saveWordButton.style.backgroundColor = "#3FD1A2";
    saveWordButton.style.cursor = "pointer";
  });

  saveWordButton.addEventListener("mouseout", function () {
    saveWordButton.style.backgroundColor = "#2CCD85";
  });

  saveWordButton.addEventListener('click', async () => {
    var englishWord = document.getElementById("EnglishWordTag").textContent;
    console.log(englishWord);
    var hebrewWord = document.getElementById("HebrewWordTag").textContent;
    console.log(hebrewWord);
    englishWord = cutWord(englishWord)
    hebrewWord = cutWord(hebrewWord)
    console.log(englishWord);
    console.log(hebrewWord);

    try {
      const email = await getEmailFromUser();
      console.log(email);

      const url = "http://localhost:4000/saveWordromExtenstion";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ hebrewWord, englishWord, email })
      });

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = await response.json();
      console.log(data);

      // Create a new element to hold the response
      const responseElement = document.createElement("div");
      responseElement.textContent = data.message;
      responseElement.style.margin = "15px auto";
      responseElement.style.textAlign = "center";
      responseElement.style.fontSize = "20px";


      // Replace the button with the response element
      saveWordButton.replaceWith(responseElement);
      // return data;
    } catch (error) {
      console.error(error);
    }
  });


  let loggedIn = false;
  try {
    const userEmail = await getEmailFromUser();
    if (userEmail) {
      loggedIn = true;
    }
  } catch (error) {
    loggedIn = false;
  }

  if (loggedIn) {

    modal.appendChild(saveWordButton);
  } else {

    const loginText = document.createElement("p");
    // const test = document.getElementById("moreThanOneWord").value;
    // console.log("here will se the value",test);
    loginText.textContent = "התחבר בשביל לשמור את המילה";
    loginText.id = "try";
    loginText.style.margin = "10px auto";
    loginText.style.textAlign = "center";
    loginText.style.fontSize = "16px";
    modal.appendChild(loginText);


  }

  // modal.appendChild(saveWordButton)




  const closeButton = document.createElement("button");
  closeButton.textContent = "סגור";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "16px";
  closeButton.style.color = "white";
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



function isSingleWord(str) {
  // Remove leading and trailing spaces
  str = str.trim();
  // Check if there are any spaces left in the string
  return !/\s/.test(str);
}



async function translateWord(word) {
  const url = "http://localhost:4000/translateTheWord";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word })
    });

    if (!response.ok) {
      throw new Error("Translation request failed");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}


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
    'https://people.googleapis.com/v1/people/me?personFields=names&key=AIzaSyAeyJVqlcotDtxTynhsN9p6HO0_V-gzEts',
    init)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
    });
}


function getEmailFromUser() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get('accessToken', function (result) {
      const token = result.accessToken;

      if (result.accessToken) {
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
          .then(function (data) {
            const email = data.emailAddresses[0].value;
            resolve(email);
          })
          .catch(function (error) {
            reject(error);
          });
      } else {
        reject(new Error('Access token not found.'));
      }
    });
  });
}

// async function saveWordToServer(){
//   const email = await getEmailFromUser();

//   // send to the backend with the email in body
// }

function cutWord(word) {
  return word.trim();
}
