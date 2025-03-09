const { ipcRenderer} = require('electron');
const ipc = require('electron').ipcRenderer;
const { dialog } = require('electron').remote;
const buttonCreated = document.getElementById('add-file-button');
const fs = require('node:fs');
const file = document.getElementById("file_id");

file.addEventListener("change", (event) => {
    console.log('asdasdas');
    // const u = document.getElementById("divv");
    // u.textContent = event.target.files[0].name;
    // const content = 'Some content!';
    // fs.writeFile('./test.txt', content, err => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         // file written successfully
    //     }
    // });
    // ipcRenderer.send("save-file", event.target.files[0]);
});

// buttonCreated.addEventListener('click', function (event) {
//     dialog.showOpenDialog({
//         properties: ['openFile', 'openDirectory']
//     }).then( result => {
//         if (!result.canceled && result.filePaths.length > 0) {
//             ipcRenderer.send('save-file', result.filePaths[0]); // Отправляем первый выбранный путь
//         }
//     });
// });



document.getElementById("add").addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;
    ipcRenderer.send("save-file", file.path);
});
