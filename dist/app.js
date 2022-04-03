import { ItemPageComponent, Page } from "./components/page/Page.js";
import { Image } from "./components/page/item/Image.js";
import { Note } from "./components/page/item/Note.js";
import { Todo } from "./components/page/item/Todo.js";
import { Youtube } from "./components/page/item/Youtube.js";
import { Dialog } from "./components/dialog/Dialog.js";
class App {
    constructor(appRoot) {
        this.page = new Page(ItemPageComponent);
        this.page.attachTo(appRoot);
        const img = new Image("https://picsum.photos/800/400", "Image Title");
        this.page.addChild(img);
        const youtube = new Youtube("Youtube Video", "https://www.youtube.com/watch?v=CfPxlb8-ZQ0");
        this.page.addChild(youtube);
        const note = new Note("Hello World", "I want to No War");
        this.page.addChild(note);
        const todo = new Todo("This is Todo", "Todo Body");
        this.page.addChild(todo);
        const imageBtn = document.querySelector("#newImage");
        imageBtn.addEventListener("click", () => {
            console.log("이미지 버튼 클릭");
            const dialog = new Dialog();
            dialog.setCloseBtn = () => {
                dialog.removeFrom(document.body);
            };
            dialog.setSubmitBtn = () => {
                dialog.removeFrom(document.body);
            };
            dialog.attachTo(document.body);
        });
    }
}
new App(document.querySelector(".document"));
