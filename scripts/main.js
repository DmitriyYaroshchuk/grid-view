import {dataClass} from "./dataClass.js";

document.addEventListener('DOMContentLoaded', () => {
    const gridView = new GridView();
    gridView.render(dataClass);
});