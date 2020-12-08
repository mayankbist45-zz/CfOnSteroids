params = {
  active: true,
  currentWindow: true,
};
function magic() {
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

function doReset() {
  document.getElementById("bloodyForm").style.display = "none";
  document.getElementById("resetButton").style.display = "none";
  document.getElementById("message").style.display = "block";
  document.getElementById("reloadButton").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submitButton").addEventListener("click", magic);
  document.getElementById("resetButton").addEventListener("click", () => {
    doReset();
    chrome.tabs.query(params, function (tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, { message: "reset" });
    });
  });
  document
    .getElementById("reloadButton")
    .addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(
          tabs[0].id,
          { url: tabs[0].url },
          () => window.close()
        );
      });
    });
});
