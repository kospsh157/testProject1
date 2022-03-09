import { Page } from "./components/page/Page.js";
import { Image } from "./components/page/item/Image.js";
class App {
    constructor(appRoot) {
        this.page = new Page();
        this.page.attachTo(appRoot);
        this.img = new Image("https://picsum.photos/800/400", "Image Title");
        this.img.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".document"));
