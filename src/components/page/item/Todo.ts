import { BaseComponent } from "../../BaseComponent.js";

export class Todo extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(
      '<section class="todo">\
        <h2 class="todoTitle"></h2>\
        <input type="checkbox" class="todoCheckBox">\
    </section>'
    );

    const todoTitle = this.element.querySelector(
      ".todoTitle"
    )! as HTMLHeadingElement;
    todoTitle.textContent = title;

    const todoCheck = this.element.querySelector(
      ".todoCheckBox"
    )! as HTMLInputElement;
    todoCheck.insertAdjacentText("afterend", todo);
  }
}
