chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true }).then(setMemo)
  .catch((error) => console.error(error));



function setMemo() {
  fetch("./text.txt")
    .then((res) => res.text())
    .then((text) => {
      document.body.querySelector('#memo').innerText = text;
    })
    .catch((e) => console.error(e));
}
