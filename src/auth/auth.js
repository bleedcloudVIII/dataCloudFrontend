const tabGroup = document.querySelector("tab-group");

const TabsOptions = {
    closable: false,
}

tabGroup.addTab({
    ...TabsOptions,
    title: "Регистрация",
    src: "./groups/registration.html",
    active: true
});

tabGroup.addTab({
    ...TabsOptions,
    title: "Вход",
    src: "./groups/login.html",
});