// export class ImgComponent {
//   private element: HTMLElement;
//   constructor(url: string, title: string) {
//     const template = document.createElement("template");
//     template.innerHTML = `<section class="image">
//   <div class="imageHolder"><img class="imageThumbnail" /></div>
//   <p class="imageTitle"></p>
// </section>`;
//     // 생성한 템플릿을 멤버변수에 담으면서 초기화한다.
//     this.element = template.content.firstElementChild! as HTMLElement;

//     // 이미지Element에 동적으로 사용자로 부터 받은 인자값을 이용해 만들기 위한 코드
//     const imageElement = this.element.querySelector(
//       ".imageThumbnail"
//     )! as HTMLImageElement;
//     imageElement.src = url;
//     imageElement.alt = title;

//     const titleElement = this.element.querySelector(
//       ".imageTitle"
//     )! as HTMLParagraphElement;
//     titleElement.textContent = title;
//   }
//   attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
//     // position은 만약 인자를 특별히 넣어주지 않으면 기본적으로 afterbegin 위치에 넣기로 한다.
//     parent.insertAdjacentElement(position, this.element);
//   }
// }

// Refactoring
import { BaseComponent } from "../../BaseComponent.js";
export class Image extends BaseComponent<HTMLElement> {
  constructor(url: string, title: string) {
    super(
      '<section class="image"><div class="imageHolder">\
      <img class="imageThumbnail"/> </div><h2 class="imageTitle"></h2></section>'
    );

    const imageElement = this.element.querySelector(
      ".imageThumbnail"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      ".imageTitle"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}
