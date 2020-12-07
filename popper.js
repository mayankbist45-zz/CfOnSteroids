// document.addEventListener("DOMContentLoaded", function () {
//   let button = document.getElementByClassName("btn");
//   button.addEventListener("click", magic);
// });

params = {
  active: true,
  currentWindow: true,
};
function magic() {
  console.log("clicked the motherfucker");
  let now = document.getElementsByTagName("input");
  let msg = {};
  for (let i = 0; i < now.length; i++) {
    console.log(now[i].value);
    msg[now[i].id] = now[i].value;
  }
  msg["role"] = document.getElementById("role").value;
  console.log(msg);

  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submitButton").addEventListener("click", magic);
  document.getElementById("resetButton").addEventListener("click", () => {
    chrome.tabs.query(params, function (tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, { message: "reset" });
    });
  });
});
