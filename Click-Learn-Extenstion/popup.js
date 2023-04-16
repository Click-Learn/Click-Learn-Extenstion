let isImageAppended = false;
let icon;
var token;
document.addEventListener('selectionchange', () => {
  chrome.storage.local.get('accessToken', function(result) {
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



  if(isSingleWord(text)){

    
    const EnglishSelectedText = document.createElement("p");
    EnglishSelectedText.textContent = text;
    ModalENContainer.appendChild(EnglishSelectedText);
  } else {
    const EnglishSelectedText = document.createElement("p");
    EnglishSelectedText.textContent = "נא לסמן מילה אחת";
    ModalENContainer.appendChild(EnglishSelectedText);

  }

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
