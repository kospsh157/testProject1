// attachTo를 계속 사용하기 위해서 인터페이스로 따로 빼서 만들어 보자
export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

// 반복해서 나오는 것들을 모아서 부모 클래스로 만들고
// 나중에 자식 클래스에서 상속 받아서 사용하는 방식으로 구조를 짠다.
// 나중에 베이스 컴포넌트 말고 다른 종류의 컴포넌트를 만들고 Component만 구현시켜주면 attachTo()함수를 계속 쓸 수 있다.
export class BaseComponent<T extends HTMLElement> implements Component {
  // 자식쪽에서 element를 사용할 것이므로, protected로 은닉화 한다.
  protected readonly element: T; // 먼저 사용할 요소를 담을 메모리방을 설정해준다.

  constructor(htmlStr: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlStr;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin"): void {
    parent.insertAdjacentElement(position, this.element);
  }
}
