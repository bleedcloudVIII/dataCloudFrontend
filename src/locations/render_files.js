const files = ["Item 1", "Item 2", "Item 3", "Item 4"];


function onMouseOver() {
    this.src = './../static/file_download.svg';
}

function onMouseOut() {
    this.src = './../static/file.svg';
}

function onFileClick(file) {
    console.log(file);
    console.log('aasdasaasc');
}

function addPlus(block) {
    const file = document.createElement("div");
    const image = document.createElement("img");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = "add";
    input.style.display = "none";
    input.type = "file";

    label.textContent = "Добавить";
    label.htmlFor = "add";
    label.classList.add("label-add");

    image.src = "./../static/file_plus.svg";
    image.style.marginBottom = "5px";

    file.appendChild(label)
    label.appendChild(image);
    file.appendChild(input)

    block.appendChild(file);
}

function renderFiles(items) {
    const filesList = document.getElementById("files_block");

    filesList.innerHTML = "";

    // Проходим по массиву и создаем элементы
    items.forEach((item) => {
        const file = document.createElement("div");
        const image = document.createElement("img");
        const text = document.createElement("span");

        text.textContent = item;

        image.src = "./../static/file.svg";
        image.onmouseover = onMouseOver;
        image.onmouseout = onMouseOut;
        image.onclick = function () {
            onFileClick(item)
        };

        file.appendChild(image)
        file.appendChild(text)
        filesList.appendChild(file);
    });

    addPlus(filesList);
}

renderFiles(files);