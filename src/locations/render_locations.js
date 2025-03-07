const TabGroup = require("electron-tabs");

// Select tab-group
const tabGroup = document.querySelector("tab-group");

// Setup the default tab which is created when the "New Tab" button is clicked
tabGroup.setDefaultTab({
    title: "New Page",
    src: "./locations/new_location/new_location.html",
    active: true,
});

const TabsOptions = {
    closable: false,
}

tabGroup.addTab({
    ...TabsOptions,
    title: "electron",
    src: ""
});
tabGroup.addTab({
    ...TabsOptions,
    title: "oiuytr",
    src: ""
});
tabGroup.addTab({
    ...TabsOptions,
    title: "876543q",
    src: ""
});
tabGroup.addTab({
    ...TabsOptions,
    title: "thrtgefe",
    src: "./locations/location.html"
});