const { ipcRenderer } = require("electron");

document.getElementById("accountImage").addEventListener("click", () => {
    ipcRenderer.send("open-modal");
});
