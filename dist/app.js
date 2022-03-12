import { Page } from "./components/page/Page.js";
import { Image } from "./components/page/item/Image.js";
import { Note } from "./components/page/item/Note.js";
import { Todo } from "./components/page/item/Todo.js";
import { Youtube } from "./components/page/item/Youtube.js";
class App {
    constructor(appRoot) {
        this.page = new Page();
        this.page.attachTo(appRoot);
        const img = new Image("https://picsum.photos/800/400", "Image Title");
        img.attachTo(appRoot, "beforeend");
        const youtube = new Youtube("Youtube Video", "https://www.youtube.com/watch?v=CfPxlb8-ZQ0");
        youtube.attachTo(appRoot, "beforeend");
        const note = new Note("Hello World", "I want to No War");
        note.attachTo(appRoot, "beforeend");
        const todo = new Todo("This is Todo", "Todo Body");
        todo.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".document"));
