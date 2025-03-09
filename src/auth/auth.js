const TabGroup = require("electron-tabs");
const fs = require("fs");
const path = require("node:path");

const tabGroup = document.querySelector("tab-group");

const TabsOptions = {
    closable: false,
}

tabGroup.addTab({
    ...TabsOptions,
    title: "Регистрация",
    src: "./groups/registration.html",
});

tabGroup.addTab({
    ...TabsOptions,
    title: "Вход",
    src: "./groups/login.html",
});