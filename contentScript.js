// import { getActiveTabURL } from "./utils.js";

(() => 
{
    // Get the current URL
    const currentUrl = window.location.href;
    let accountClassDiv = document.getElementsByClassName("lang-chooser")[0];
    let checkLogin = accountClassDiv.querySelectorAll('div');
    let selectedButton = "";
    let [boringCount, niceCount, amazingCount] = [0, 0, 0];
    let buttonTypes = {
      "boring": 0,
      "nice": 1,
      "amazing": 2
    }
  
  let loggedin = false;

  if (checkLogin.length === 2) {
    loggedin = false;
  } else {
    loggedin = true;
  }


  let tableDataofReactions = "";
  let emojiButtons = "";

  let newRow = `<tr>
                  <td class="left bottom" colspan="1">
                    <span class="contest-state-phase"><span>
                    <button style="font-size:30px;background-color:aliceblue" class="boring" id="boring emoji" title="boring">&#128542;</button>
                    <button style="font-size:30px;background-color:aliceblue" class="nice" id="nice emoji" title="nice">&#128516;</button>
                    <button style="font-size:30px;background-color:aliceblue" class="amazing" id="amazing emoji" title="amazing">&#128525;</button>
                  </td>
                </tr>`;

  if (loggedin) {
    let tableBody = document.getElementsByClassName('rtable')[0].querySelector('tbody');
    let bottomMostElement = tableBody.querySelectorAll('tr')[tableBody.querySelectorAll('tr').length - 1];
    let tableData = bottomMostElement.querySelectorAll('td')[0];
    // remove class bottom from tableData
    tableData.classList.remove('bottom');
    // add innerHTML as table row in tableBody
    tableBody.innerHTML += newRow;

    tableDataofReactions = document.getElementsByClassName('left bottom')[0];
    // console.log(tableDataofReactions);
    emojiButtons = tableDataofReactions.querySelectorAll('button');
  }




  function isdigit(str) {
    return /^\d+$/.test(str);
  }

  // split the currentUrl into array using '/' as separator and then traverse on that array
  let urlArray = currentUrl.split('/');
  console.log(currentUrl);
  let contestId = "";
  for (let i = 0; i < urlArray.length; i++) {
    if(isdigit(urlArray[i][0])){
      contestId = urlArray[i];
      console.log(contestId);
      break;
    }
  }

  let problemName = document.getElementsByClassName("title")[0].innerText.split('. ')[1];
  console.log(problemName);

  let problemId = contestId + "-" + problemName;
  let userId = checkLogin[checkLogin.length-1].querySelectorAll('a')[0].innerText;
  console.log(userId);

  let currentUserData = "";
  if (window.location.href.includes('codeforces.com') && window.location.href.includes('problem')) {
    // Call the API using fetch()
    fetch(`http://localhost:3000/api/v1/users?problemId=${problemId}&userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      })
      .then(response =>{
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Process the response data
        currentUserData = data;
        console.log(data);
        selectedButton = emojiButtons[buttonTypes[data.emoji]];
        if(selectedButton){
          selectedButton.style["background-color"] = "green";
        }
      })
      .catch(error => {
        console.error(error);
      });

      // fetch(`http://localhost:3000/api/v1/users?problemId=${problemId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   }
      //   })
      //   .then(response =>{
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      //   })
      //   .then(data => {
      //     // Process the response data
      //     console.log(data);
      //     [boringCount, niceCount, amazingCount] = [data[0], data[1], data[2]];
      //     console.log("setValues",boringCount, niceCount, amazingCount);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
  }

  function handleButtonClickEventForProblem(selectedButton,newButton){
    newButton.style["background-color"] = "green";
    selectedButton.style["background-color"] = "aliceblue";
    chrome.runtime.sendMessage({ problemId : problemId,currentEmoji: newButton.classList[0], prevEmoji : selectedButton.classList[0] , apiFor : "Problem" }, function(response) {
      // Handle the API response or error message
      if (response.message === "apiResponse") {
        console.log("API response:", response.data);
      } else if (response.message === "apiError") {
        console.error("API error:", response.error);
      }
    });
  }

  function handleButtonClickEventForUser(selectedButton,newButton){
    chrome.runtime.sendMessage({ problemId : problemId,currentEmoji: newButton.classList[0], userId : userId , apiFor : "user" }, function(response) {
      // Handle the API response or error message
      if (response.message === "apiResponse") {
        console.log("API response:", response.data);
      } else if (response.message === "apiError") {
        console.error("API error:", response.error);
      }
    });
  }
  
  
  const boringButton = emojiButtons[0];
  boringButton.addEventListener("click", function() {
    // Send a message to background.js to call the API
    if(selectedButton!=boringButton){
      handleButtonClickEventForProblem(selectedButton,boringButton)
      handleButtonClickEventForUser(selectedButton,boringButton)
      selectedButton = boringButton;
    }
  });

  const niceButton = emojiButtons[1];
  niceButton.addEventListener("click", function() {
    if(selectedButton!=niceButton){
      handleButtonClickEventForProblem(selectedButton,niceButton)
      handleButtonClickEventForUser(selectedButton,niceButton)
      selectedButton = niceButton;
    
    }
  });

  const amazingButton = emojiButtons[2];
  amazingButton.addEventListener("click", function() {
    if(selectedButton!=amazingButton){
      handleButtonClickEventForProblem(selectedButton,amazingButton)
      handleButtonClickEventForUser(selectedButton,amazingButton)
      selectedButton = amazingButton;
    }
  });

}
)();
