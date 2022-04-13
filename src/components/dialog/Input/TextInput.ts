import { BaseComponent } from "../../BaseComponent.js";
import { TextDataInput } from "../Dialog.js";

export class TextInput
  extends BaseComponent<HTMLElement>
  implements TextDataInput
{
  constructor() {
    super(
      '<div>\
        <div class="formContainer">\
          <label for="title">Title</label>\
          <input type="text" id="title" />\
        </div>\
        <div class="formContainer">\
          <label for="body">Body</label>\
          <textarea type="text" row="3" id="body"></textarea>\
        </div>\
      </div>'
    );
  }

  get title() {
    const ele = this.element.querySelector("#title")! as HTMLInputElement;
    return ele.value;
  }

  get body() {
    const ele = this.element.querySelector("#body")! as HTMLInputElement;
    return ele.value;
  }
}
