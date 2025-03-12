const files = ["Item 1", "Item 2", "Item 3", "Item 4"];


function onMouseOver() {
    this.src = './../static/file_download.svg';
}

function onMouseOut() {
    this.src = './../static/file.svg';
}

// function downloadFile(file) {
// }

function saveFile(event) {
    window.api.send("open-file-save-dialog");
}

function addPlus(block) {
    const div = document.createElement("div");
    const image = document.createElement("img");
    const text = document.createElement("label");
    const input = document.createElement("input");

    // input.id = "add-file";
    // input.style.display = "none";
    // input.type = "file";

    text.textContent = "Добавить";
    text.classList.add("label-add");

    image.src = "./../static/file_plus.svg";
    image.style.marginBottom = "5px";

    div.appendChild(text)
    text.appendChild(image);
    // text.appendChild(input)

    // div.htmlFor = "add-file";

    div.onclick = saveFile;

    // input.onchange = saveFile;

    block.appendChild(div);
}

function renderFiles(items) {
    const filesList = document.getElementById("files_block");

    filesList.innerHTML = "";

    items.forEach((item) => {
        const file = document.createElement("div");
        const image = document.createElement("img");
        const text = document.createElement("span");

        text.textContent = item;

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