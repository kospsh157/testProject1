import { BaseComponent } from "../../BaseComponent.js";

export class Note extends BaseComponent<HTMLElement> {
  constructor(title: string, body: HTMLParagraphElement) {
    super(
      '<section class="note">\
        <h2 class="pageItemTitle noteTitle"></h2>\
        <div class="noteBody"></div>\
    </section>'
    );

    const h2Title = this.element.querySelector(
      ".noteTitle"
    )! as HTMLHeadingElement;
    h2Title.textContent = title;

    const h2Body = this.element.querySelector(
      ".noteBody"
    )! as HTMLParagraphElement;
    h2Body.appendChild(body);
  }
}
