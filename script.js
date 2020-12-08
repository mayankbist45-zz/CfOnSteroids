chrome.storage.sync.get(
  ["haveData", "rating", "handle", "role", "contribution"],
  function (result) {
    if (result.haveData) {
      handle = result.handle;
      rating = result.rating;
      role = result.role;
      contribution = result.contribution;
      changeColorAndRole();
    }
  }
);

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
  if (message.message == "reset") {
    chrome.storage.sync.set({ haveData: false });
    return;
  }
  handle = message.handle;
  rating = message.rating;
  role = message.role;
  contribution = message.contribution;
  if(contribution.length && Number(contribution[0]) != NaN)
    contribution = '+' + contribution;
  console.log("contribution", contribution);

  chrome.storage.sync.set(
    {
      handle: handle,
      rating: rating,
      role: role,
      contribution: contribution,
      haveData: true,
    },
    changeColorAndRole()
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

function trim(curhandle) {
  let id = 0;
  for (let i = 0; i < curhandle.length; i++) {
    if (curhandle[i] == " ") id = i + 1;
  }
  curhandle = curhandle.substr(id);
  return curhandle;
}

function changeColorAndRole() {
  let userArray = document.getElementsByClassName("rated-user");

  for (let i = 0; i < userArray.length; i++) {
    let ele = userArray[i];
    let curHandle = ele.getAttribute("title");
    curHandle = trim(curHandle);
    console.log(curHandle);
    if (curHandle == handle) {
      makeThat(ele);
    }
  }
  let childs = document.getElementsByClassName("propertyLinks")[0].children;
  childs[0].children[1].innerHTML = rating;
  if (contribution != undefined && contribution.length) childs[1].children[1].innerHTML = contribution;
  makeThat(childs[0].children[1]);

  let tempData = document.getElementsByClassName("main-info");
  if (
    tempData.length &&
    trim(tempData[0].children[1].children[0].getAttribute("title")) == handle
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
      pointer.innerText = role + ",";
      makeThat(pointer);
      pointer = userInfo[i].children[1].children[0].children[2].children[1];
      pointer.innerText = rating;
      makeThat(pointer);

      if(contribution != undefined && contribution.length){
        pointer = userInfo[i].children[1].children[1].children[1].innerHTML = contribution;
      } 
    }
  }
}
