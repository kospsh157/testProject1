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

// 이 타입이 의미하는 바는, ItemContainer 타입을 생성하는 모든 생성자는 다 이것과 매칭된다는 뜻이다.
// 따라서 인터페이스로 받지 말고, 이런식으로 생성자를 넣어 줄 수 있다.
// 이런 타입을, 생성자의 인자로써, 받는 구현체들은 모두 이런 타입에 대한 데이터를 다 받을 수 있다.
type ItemContainerConstructor = {
  new (): ItemContainer;
};

export class Page extends BaseComponent<HTMLElement> implements Composable {
  // ItemContainer인터페이스 타입을 받는 것이 아니라, 그것을 생성시키는 생성자 타입을 하나 만들어서 그 타입을 넣어준다.
  // 그러면 나중에 App에서 Page클래스를 사용할때, 생성자 인자로써 ItemContainer의 구현체를 넣는 것이 아니라, 그 구현체의 생성자를 넣어주는 것이다.
  // 왜 이렇게 하는지는 모르겠다. 아마도 내 예상으로는, 인터페이스로 받게 되면, 인터페이스는 new키워드를 사용해서 생성할 수 없기 때문에 한번 더 꼬아서 생성자 타입을 만들어서 넣어주는것으로 파악된다.
  constructor(private itemContainer: ItemContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new this.itemContainer();

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

// PageItemComponent의 부모격이 되는 인터페이스를 작성하자. 그러면 나중에 다양한 종류의 PageItemComponent로
// item들을 감싸서 Page에 추가할 수 있다.
// 이는 Component, Composable 인터페이스를 구현해야 한다. (인터페이스끼리의 구현은 상속 키워드인 extends로 연결해준다. 타입스크립트는 기본적으로 다중상속을 지원하지 않는다.
// 다만, 인터페이스 끼리는 얼마든지 다중상속이 가능하다.)

// 기존의 쓰던 모든 api함수들은 Component, Composable에 있지만 클로즈 버튼의 콜백함수 셋터 함수는 없다. 따라서 여기서 정의해줘야 한다.
// 인터페이스를 쓰는 이유는 이제 여러가지 버전의 itemContainer들을 사용할 계획이기 때문이다.
interface ItemContainer extends Component, Composable {
  setOnCloseBtnListener(callBackFunc: OnCloseBtnListener): void;
}

// PageItemComponent
export class ItemPageComponent
  extends BaseComponent<HTMLElement>
  implements ItemContainer
{
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
