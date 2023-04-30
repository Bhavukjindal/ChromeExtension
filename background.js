// import fetchLocation from "./fetchLocation.js";

const endpt = "http://localhost:3000/api/v1/problems";

let postValues = {
  "problemId" : "1822 Magic Triples",
  "previousEmoji" : "",
  "currentEmoji" : "nice"
}


function callTheApi(){
  fetch(endpt,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json','Accept': 'application/json',},
    body: JSON.stringify(postValues),
  })
  .then(function (response) {
      responseClone = response.clone(); // 2
      return response.json();
  })
  .then(data=> {
      console.log(data);
  })
  .catch(error => console.log(error));
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'callApi') {
    // Execute your API call here
    fetch(endpt,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json','Accept': 'application/json'},
      body: JSON.stringify(postValues),
    })
    .then(function (response) {
        responseClone = response.clone(); // 2
        console.log(response.json());
        return response.json();
    })
    .then(data=> {
        console.log(data);
        sendResponse(data);
    })
    .catch(error => console.log(error));
  }
});
