import { ItemPageComponent, Page } from "./components/page/Page.js";
import { Image } from "./components/page/item/Image.js";
import { Note } from "./components/page/item/Note.js";
import { Todo } from "./components/page/item/Todo.js";
import { Youtube } from "./components/page/item/Youtube.js";
import { Dialog, } from "./components/dialog/Dialog.js";
import { MediaInput } from "./components/dialog/Input/MediaInput.js";
import { TextInput } from "./components/dialog/Input/TextInput.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new Page(ItemPageComponent);
        this.page.attachTo(appRoot);
        const img = new Image("You can save image, youtube, note, todo on here.", "https://picsum.photos/800/400");
        this.page.addChild(img);
        const yout = new Youtube("The important thing is to prepare the resources and time to get back up from failure.", "https://youtu.be/3KvdWd9iqAY");
        this.page.addChild(yout);
        const pForNote1 = document.createElement("p");
        pForNote1.innerHTML = `
      If you want add a image, click image button and type 'https://picsum.photos/500/250' at URL. <br>
      You can get a random image from this url.
    `;
        const note1 = new Note("MyList Usage (Add Image)", pForNote1);
        this.page.addChild(note1);
        const pForNote2 = document.createElement("p");
        pForNote2.innerHTML = `<p>
      If you want add Youtube video, click video button and type youtube url you want at URL.<br>
      (Sometimes there are YouTube videos that doesn't work.)
    </p>`;
        const note2 = new Note("MyList Usage (Add Video)", pForNote2);
        this.page.addChild(note2);
        const p = document.createElement("p");
        p.innerHTML = `
      <p>
        I done this project during learning in Dream-coding Academy(Online). I have learned about TypeScript and OOP in this project. <br/>
        Dram-Coding Academy url: <a href = https://academy.dream-coding.com>https://academy.dream-coding.com</a> (Korean) <br/>
        She(teacher) is very nice and I know she is currently working as a manager in the USA. <br/>
        I learned a lot from watching her coding style.<br/>
        During this project, I did not simply follow her code, but understood and digested it with my own.<br/>
      </p>
    `;
        const note3 = new Note("About this project", p);
        this.page.addChild(note3);
        const todo = new Todo("I have to do", "Find Job");
        this.page.addChild(todo);
        this.bindInputToElement("#newImage", MediaInput, (input) => {
            return new Image(input.title, input.url);
        });
        this.bindInputToElement("#newVideo", MediaInput, (input) => {
            return new Youtube(input.title, input.url);
        });
        this.bindInputToElement("#newNote", TextInput, (input) => {
            const para = document.createElement("p");
            para.textContent = input.body;
            return new Note(input.title, para);
        });
        this.bindInputToElement("#newTodo", TextInput, (input) => {
            return new Todo(input.title, input.body);
        });
    }
    bindInputToElement(selector, inputSectionCon, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener("click", () => {
            const dialog = new Dialog();
            const input = new inputSectionCon();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setCloseBtn(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setSubmitBtn(() => {
                const section = makeSection(input);
                this.page.addChild(section);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector(".document"), document.body);
