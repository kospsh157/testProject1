import { BaseComponent } from "../../BaseComponent.js";

export class MediaInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(
      '<div>\
        <div class="formContainer">\
          <label for="title">Title</label>\
          <input type="text" id="title" />\
          <label for="url">URL</label>\
          <input type="text" id="url" />\
        </div>\
      </div>'
    );
  }

  get title() {
    const ele = this.element.querySelector("#title")! as HTMLInputElement;
    return ele.value;
  }

  get url() {
    const ele = this.element.querySelector("#url")! as HTMLInputElement;
    return ele.value;
  }
}
