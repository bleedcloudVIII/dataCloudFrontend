const { ipcRenderer } = require("electron");

document.getElementById("accountImage").addEventListener("click", () => {
    ipcRenderer.send("open-modal");
});

ipcRenderer.on("modal-opened", () => {
    console.log("Modal window opened");
});