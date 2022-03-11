import { BaseComponent } from "../../BaseComponent.js";

export class Note extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(
      '<section class="note">\
        <h2 class="noteTitle"></h2>\
        <p class="noteBody"></p>\
    </section>'
    );

    const h2Title = this.element.querySelector(
      ".noteTitle"
    )! as HTMLHeadingElement;
    h2Title.textContent = title;

    const h2Body = this.element.querySelector(
      ".noteBody"
    )! as HTMLParagraphElement;
    h2Body.textContent = body;
  }
}
