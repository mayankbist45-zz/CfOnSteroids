
let Entities = {
  Headquarters: "user-admin",
  Unrated: "user-black",
  Newbie: "user-gray",
  Pupil: "user-green",
  Specialist: "user-cyan",
  Expert: "user-blue",
  "Candidate Master": "user-violet",
  Master: "user-orange",
  "International Master": "user-orange",
  Grandmaster: "user-red",
  "International Grandmaster": "user-red",
  "Legendary Grandmaster": "user-legendary",
};
let handle;
let rating;
let role;
let contribution;

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  if(message.message == "reset"){
    chrome.storage.sync.set({haveData: false});
    return;
  }
  handle = message.handle;
  rating = message.rating;
  role = message.role;
  contribution = message.contribution;
  console.log(contribution);

  chrome.storage.sync.set(
    {
      handle: handle,
      rating: rating,
      role: role,
      haveData: true,
    },
    changeColorAndRole
  );
}
function makeThat(ele) {
  let additionalClasses = [];
  ele.classList.forEach((user) => {
    if (user.substr(0, 4) == "user") additionalClasses.push(user);
  });
  additionalClasses.forEach((val) => {
    ele.classList.remove(val);
  });
  console.log(Entities[role], role);
  ele.classList.add(Entities[role]);
}
function changeColorAndRole() {
  let userArray = document.getElementsByClassName("rated-user");

  for (let i = 0; i < userArray.length; i++) {
    let ele = userArray[i];
    // console.log(ele.innerText);
    if (ele.innerHTML == handle) {
      makeThat(ele);
    }
  }
  let childs = document.getElementsByClassName("propertyLinks")[0].children;
  childs[0].children[1].innerHTML = rating;
  makeThat(childs[0].children[1]);

  let tempData = document.getElementsByClassName("main-info");
  if (
    tempData.length &&
    tempData[0].children[1].children[0].innerText == handle
  ) {
    let userData = document.getElementsByClassName("user-rank");
    for (let i = 0; i < userData.length; i++) {
      userData[i].children[0].innerText = role;
      makeThat(userData[i].children[0]);
    }
    let userInfo = document.getElementsByClassName("info");
    for (let i = 0; i < userInfo.length; i++) {
      let pointer = userInfo[i].children[1].children[0].children[1];
      pointer.innerText = rating;
      makeThat(pointer);
      pointer = userInfo[i].children[1].children[0].children[2].children[0];
      pointer.innerText = role + ',';
      makeThat(pointer);
      pointer = userInfo[i].children[1].children[0].children[2].children[1];
      pointer.innerText = rating;
      makeThat(pointer);
    }
  }
}
chrome.storage.sync.get(
  ["haveData", "rating", "handle", "role"],
  function (result) {
    if (result.haveData) {
      handle = result.handle;
      rating = result.rating;
      role = result.role;
      // console.log("changing colors");
      changeColorAndRole();
    }
  }
);
