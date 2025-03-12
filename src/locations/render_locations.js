const tabGroup = document.querySelector("tab-group");

tabGroup.setDefaultTab({
    title: "Новое пространство",
    src: "./locations/new_location/new_location.html",
    active: true,
});

const TabsOptions = {
    closable: false,
    src: "./locations/location.html",
    webviewAttributes: {
        preload: './preload.js',
        nodeIntegration: true,
        contextIsolation: true,
        webviewTag: true,
    }
}

const tabs = ["Общее пространство", "Пространство1", "Моё", "Лето2020", "Анапа"];

tabs.forEach((tab, index) => {
    if (index === 0) {
        tabGroup.addTab({
            ...TabsOptions,
            title: tab,
            active: true,
        });
    }
    tabGroup.addTab({
        ...TabsOptions,
        title: tab,
    });
});