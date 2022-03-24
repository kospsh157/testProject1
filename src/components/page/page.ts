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

    // page컴포넌트에서 item컴포넌트를 만들때 삭제 버튼 콜백함수를 넣어준다.
    // setOnCloseBtnListener 함수는 인자로 들어온 함수를 자신의 맴버변수에 넣어주는 셋터 함수이다.
    // 그리고 그 인자로는 콜백함수로써, 익명함수로 여기서 작성해서 들어간다.
    item.setOnCloseBtnListener(() => {
      item.removeFrom(this.element); // 여기있는 this는 Page HTML Element이다.
      // 그리고 그것이 온전히 itempage에서 실행될때까지 연결된다.
      // itempage컴포넌트는 하위 컴포넌트라 상위 컴포넌트의 객체 주소를 모른다.
      // 따라서 이렇게 상위 컴포넌트에서 this로 바로 그냥 전달해주는 것이다.
      // 햇갈리지 말아야 할 것이 있는데, 이렇게 넣어주는 this에는 이 값이 직접적으로 전달되지만,
      // 상속을 통한 this는 무조건 그냥 자기자신이다.
      // 따라서 이렇게 외부에서 하위컴포넌트의 멤버변수에 콜백함수를 넣어주는 이유가 여기에 this는 상속받는 this, 즉
      // 자기 자신이 아니라, 상위 컴포넌트인 Page 오브젝트를 전달해줘야하기 때문이다.
    });
  }
}

// BtnListener
// 이 함수는 완전히 빈 껍데기용도로 쓰인는 함수이다. 나중에 부모쪽에서 익명함수을 바로 작성해서 넣는다.
// 주의할 점은 => void를 써야 리턴 타입이 void가 된다. () => {}는 리턴타입이 {}이다.
type OnCloseBtnListener = () => void;

// PageItemComponent
export class ItemPageComponent extends BaseComponent<HTMLElement> {
  private onCloseBtnListener?: OnCloseBtnListener;

  constructor() {
    super(
      '<li class="pageItem">\
              <section class="pageItemBody"></section>\
              <div class="pageItem">\
                 <button class="close">&times;</button>\
              </div>\
          </li>'
    );
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.onCloseBtnListener && this.onCloseBtnListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".pageItemBody"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseBtnListener(callBackFunc: OnCloseBtnListener): void {
    this.onCloseBtnListener = callBackFunc;
  }
}

// Page클래스와, ItemPageComponent클래스에 각각 addChild()함수를 가지고 있다. 이것들을 인터페이스화 해서
// 사용해보자
// 이런 조립해서 사용하는 것에 쓰이는 함수들을 모아 인터페이스시켜서 사용하고 대체로 이름을 조립해서 사용하다는 뜻의
// composable이라고 명명해서 쓴다.
export interface Composable {
  addChild(child: Component): void;
}

// itemPageComponent에 삭제 버튼 리스너 달기
/*  
  1. 주인공들 
    1. Component 인터페이스   1. Composable 인터페이스
      1. baseComponent
        1. Page 컴포넌트
          1. itemPageComponent
            1. 리스너와 콜백 함수
  2. 리스너와 콜백 함수를 어디에 달아야 할 것인가? 
  3. itemPage컴포넌트에 아이템을 생성해서 addChild()함수로 붙인다. 그리고
  그것을 다시 page에 붙이는 방식으로 추가가된다. 
  그리고 이것을 page, 즉 부모클래스에서 추가가 이뤄진다.
  그럼 삭제도 부모에서 해야 되지 않을까? 
  

*/
