import { BaseComponent, Component } from "../BaseComponent.js";
import { Composable } from "../page/Page.js";

type submitListener = () => void;
type closeListener = () => void;

export class Dialog extends BaseComponent<HTMLElement> implements Composable {
  private submitBtn?: submitListener;
  private closeBtn?: closeListener;
  constructor() {
    super(
      `<dialog class='dialog'>\
        <div class='dialogContainer'>\
          <button class='closeDialog'>&times;</button>\
          <div class='dialogBody'>\
           
          </div>\
          <button class='submitBtn'>ADD</button>\
        </div>\
      </dialog>`
    );

    const closeBtn = this.element.querySelector(
      ".closeDialog"
    )! as HTMLButtonElement;
    const submitBtn = this.element.querySelector(
      ".submitBtn"
    )! as HTMLButtonElement;

    submitBtn.onclick = () => {
      this.submitBtn && this.submitBtn();
    };
    closeBtn.onclick = () => {
      this.closeBtn && this.closeBtn();
    };
  }

  setCloseBtn(callBack: closeListener) {
    this.closeBtn = callBack;
  }

  setSubmitBtn(callBack: submitListener) {
    this.submitBtn = callBack;
  }

  addChild(child: Component): void {
    const body = this.element.querySelector(".dialogBody")! as HTMLElement;
    child.attachTo(body);
  }
}
