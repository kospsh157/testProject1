import { BaseComponent } from "../../BaseComponent.js";

export class Todo extends BaseComponent<HTMLElement> {
  private cnt: number = 1;
  constructor(title: string, todo: string) {
    super(
      '<section class="todo">\
        <h2 class="pageItemTitle todoTitle"></h2>\
        <div class="todoList">\
          <div>\
            <input type="checkbox" id="todoCheckbox"/>\
            <label for= "todoCheckbox" class= "todoLabel"></label>\
          </div>\
        </div>\
        <div><button class = "addMoreTodo">Add todo</button></div>\
    </section>'
    );

    const todoTitle = this.element.querySelector(
      ".todoTitle"
    )! as HTMLHeadingElement;
    todoTitle.textContent = title;

    const todoCheckLabel = this.element.querySelector(
      ".todoLabel"
    )! as HTMLInputElement;
    todoCheckLabel.textContent = todo;

    const addTodosBtn = this.element.querySelector(
      ".addMoreTodo"
    )! as HTMLButtonElement;

    // Call back of addTodoButton
    addTodosBtn.onclick = () => {
      this.cnt++;
      const eleDiv = document.createElement("div");

      const eleInput = document.createElement("input");
      const confirmBtn = document.createElement("button");
      const cancelBtn = document.createElement("button");
      confirmBtn.setAttribute("class", "todoConfirmBtn");
      cancelBtn.setAttribute("class", "todoCancelBtn");

      eleInput.setAttribute("class", "addTodoInput");
      confirmBtn.textContent = "Confirm";
      cancelBtn.textContent = "Cancel";

      // call back of confirmBtn
      confirmBtn.onclick = () => {
        const labelValue = eleInput.value;
        const list = this.element.querySelector(".todoList")! as HTMLDivElement;
        list.removeChild(eleDiv);

        // create new todo line
        const newDiv = document.createElement("div");
        const check = document.createElement("input");
        check.setAttribute("id", `checkBox${this.cnt}`);
        check.setAttribute("type", "checkbox");
        const label = document.createElement("label");
        label.setAttribute("for", `checkBox${this.cnt}`);
        label.setAttribute("class", "todoLabel");
        label.textContent = labelValue;
        newDiv.appendChild(check);
        newDiv.appendChild(label);

        // add this todo to parent div
        list.appendChild(newDiv);
      };

      // call back of cancelBtn
      cancelBtn.onclick = () => {
        const list = this.element.querySelector(".todoList")! as HTMLDivElement;
        list.removeChild(eleDiv);
      };

      // show input window to user to fill todo thing
      eleDiv.appendChild(eleInput);
      eleDiv.appendChild(confirmBtn);
      eleDiv.appendChild(cancelBtn);
      const eleList = this.element.querySelector(
        ".todoList"
      )! as HTMLDivElement;
      eleList.appendChild(eleDiv);
      eleInput.focus();
    };
    //End Call back of addTodoButton
  }
}
