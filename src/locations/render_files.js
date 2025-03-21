const files = ["file.png", "cyber.avif", "qwe.jpg", "5.txt", "web.webp"];


function onMouseOver() {
    this.src = './../static/file_download.svg';
}

function onMouseOut() {
    this.src = './../static/file.svg';
}

function downloadFile(file) {
    window.api.send("open-file-download-dialog", file);
}

function saveFile() {
    window.api.send("open-file-save-dialog");
}

function openFile(file) {
    window.api.send("open-file", file);
}

function addPlus(block) {
    const div = document.createElement("div");
    const image = document.createElement("img");
    const text = document.createElement("label");

    text.textContent = "Добавить";
    text.classList.add("label-add");

    image.src = "./../static/file_plus.svg";
    image.style.marginBottom = "5px";

    div.appendChild(text)
    text.appendChild(image);

    div.onclick = saveFile;

    block.appendChild(div);
}

function renderFiles(items) {
    const filesList = document.getElementById("files_block");

    filesList.innerHTML = "";

    items.forEach((item) => {
        const file = document.createElement("div");
        const image = document.createElement("img");
        const text = document.createElement("span");

        const img = document.createElement("img");
        img.src = "./../static/open.svg"
        // img.style.display="flex";
        img.style.width="20px";
        img.style.height="20px";
        img.style.flexDirection="column";
        img.onclick = () => openFile(item);

        text.textContent = item;
        text.style.display="flex";
        text.appendChild(img);

        image.src = "./../static/file.svg";
        image.onmouseover = onMouseOver;
        image.onmouseout = onMouseOut;
        image.onclick = () => downloadFile(item);

        file.appendChild(image)
        file.appendChild(text)
        filesList.appendChild(file);
    });

    addPlus(filesList);
}

renderFiles(files);