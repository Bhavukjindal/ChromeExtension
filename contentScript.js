(() => 
{
  let accountClassDiv = document.getElementsByClassName("lang-chooser")[0];
  let checkLogin = accountClassDiv.querySelectorAll('div');
  let loggedin = false;
  if (checkLogin.length === 2) {
    loggedin = false;
  } else {
    loggedin = true;
  }

  let newRow = `<tr>
                  <td class="left bottom" colspan="1">
                    <span class="contest-state-phase"><span>
                    <button style="font-size:30px" class="boring">&#128542;</button>
                    <button style="font-size:30px" class="nice">&#128516;</button>
                    <button style="font-size:30px" class="amazing">&#128525;</button>
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
  }

  document.querySelector('.boring').addEventListener('click', async () => {
    // Send a message to the background script to execute the API call
    const response = await chrome.runtime.sendMessage({ action: 'callApi' });
    console.log(response);
  });

}
)();
