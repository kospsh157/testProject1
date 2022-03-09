// 기본적으로, Dom 요소를 만들고, 어떤 Dom 요소에 어떤식으로 붙여나가면서 웹사이트 구성을 할 지 생각하자.
// 그러면 어떤식으로 객체를 만들어야 하는지 구성이 대충 보인다.

import { BaseComponent } from "./baseComponent.js";

// export class PageComponent {
//   private element: HTMLUListElement; // 먼저 사용할 요소를 담을 메모리방을 설정해준다.
//   constructor() {
//     this.element = document.createElement("ul"); // 브라우저 다큐먼트 api를 이용해 ul요소를 생성한다.
//     this.element.setAttribute("class", "page"); // ul의 속성을 설정해준다. class 속성값을 page로 정한다.
//     this.element.textContent = "This is PageComponent"; // 글자 내용을 다음으로 넣어준다.
//   }

//   // 이 PageComponent는 html에서 main body가 될 부분이다. 따라서 어떤 페이지가 와도 그것을 받고 보여줘야한다.
//   // 따라서 어떤 요소가 오든 그것을 받아서, 이 페이지에 붙여서 나타내주는 함수가 필요하다.
//   // position은 요소를 어디에다가 추가할 지 정하는 인자이다.
//   attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
//     // position은 만약 인자를 특별히 넣어주지 않으면 기본적으로 afterbegin 위치에 넣기로 한다.
//     parent.insertAdjacentElement(position, this.element);
//   }
// }

// Refactoring
export class Page extends BaseComponent<HTMLElement> {
  constructor() {
    super('<ul class="page">This is PageComponent</ul>');
  }
}
