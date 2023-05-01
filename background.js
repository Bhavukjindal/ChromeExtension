// import fetchLocation from "./fetchLocation.js";

const endptForProblem = "http://localhost:3000/api/v1/problems";
const endptForUser = "http://localhost:3000/api/v1/users";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.apiFor === "Problem") {
    let bodyForProblem = {
      "problemId" : request.problemId,
      "previousEmoji" : request.prevEmoji,
      "currentEmoji" : request.currentEmoji
    }
    console.log(request.prevEmoji);
    console.log(JSON.stringify(bodyForProblem));
    fetch(endptForProblem,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify(bodyForProblem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // send response back to content.js
        sendResponse({ message: "apiResponse", data: data });
      })
      .catch(error => {
        console.error(error);
        // send error response back to content.js
        sendResponse({ message: "apiError", error: error });
      });
    // return true to indicate that you will send a response asynchronously
    return true;
  }else{
    let bodyForUser = {
      "problemId" : request.problemId,
      "userId" : request.userId,
      "currentEmoji" : request.currentEmoji
    }
    
    console.log(JSON.stringify(bodyForUser));
    fetch(endptForUser,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify(bodyForUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // send response back to content.js
        sendResponse({ message: "apiResponse", data: data });
      })
      .catch(error => {
        console.error(error);
        // send error response back to content.js
        sendResponse({ message: "apiError", error: error });
      });
    // return true to indicate that you will send a response asynchronously
    return true;
  }
});
