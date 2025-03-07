const TabGroup = require("electron-tabs");

const tabGroup = document.querySelector("tab-group");

tabGroup.setDefaultTab({
    title: "Новое пространство",
    src: "./locations/new_location/new_location.html",
    active: true,
});

const TabsOptions = {
    closable: false,
    // webviewAttributes: {
    //     "height": "30px",
    // },
    src: "./locations/location.html",
}

const tabs = ["Общее пространство", "Пространство1", "Моё", "Лето2020", "Анапа"];

tabs.forEach(tab => {
    tabGroup.addTab({
        ...TabsOptions,
        title: tab,
    });
});