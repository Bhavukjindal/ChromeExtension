// import fetchLocation from "./fetchLocation.js";

const endpt = "http://localhost:3000/api/v1/problems";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "callApi") {
    fetch(endpt,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify(postValues),
    })
      .then(response => response.json())
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
