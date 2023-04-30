import { getActiveTabURL } from "./utils.js";


document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");
  console.log(activeTab);
  if (activeTab.url.includes("codeforces.com") && activeTab.url.includes("problem")) {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = `<div class="title">Hope You Like our Work.</div>`;
  }else{
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = `<div class="title">Please Open a Codeforces Problem.</div>`;
  }
});

