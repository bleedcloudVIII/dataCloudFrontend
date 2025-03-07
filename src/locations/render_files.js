const files = ["Item 1", "Item 2", "Item 3", "Item 4"];

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


        file.appendChild(image)
        file.appendChild(text)
        filesList.appendChild(file);
    });
}

renderFiles(files);