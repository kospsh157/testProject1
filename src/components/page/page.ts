// 기본적으로, Dom 요소를 만들고, 어떤 Dom 요소에 어떤식으로 붙여나가면서 웹사이트 구성을 할 지 생각하자.
// 그러면 어떤식으로 객체를 만들어야 하는지 구성이 대충 보인다.

import { BaseComponent, Component } from "../BaseComponent.js";

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
export class Page extends BaseComponent<HTMLElement> implements Composable {
  constructor() {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new ItemPageComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
  }
}

// PageItemComponent
export class ItemPageComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(
      '<li class="pageItem">\
              <section class="pageItemBody"></section>\
              <div class="pageItem">\
                 <button class="close">&times;</button>\
              </div>\
          </li>'
    );
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".pageItemBody"
    )! as HTMLElement;
    child.attachTo(container);
  }
}

// Page클래스와, ItemPageComponent클래스에 각각 addChild()함수를 가지고 있다. 이것들을 인터페이스화 해서
// 사용해보자
// 이런 조립해서 사용하는 것에 쓰이는 함수들을 모아 인터페이스시켜서 사용하고 대체로 이름을 조립해서 사용하다는 뜻의
// composable이라고 명명해서 쓴다.
export interface Composable {
  addChild(child: Component): void;
}
