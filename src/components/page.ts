export class PageComponent {
  private element: HTMLUListElement; // 먼저 사용할 요소를 담을 메모리방을 설정해준다.
  constructor() {
    this.element = document.createElement("ul"); // 브라우저 다큐먼트 api를 이용해 ul요소를 생성한다.
    this.element.setAttribute("class", "page"); // ul의 속성을 설정해준다. class 속성값을 page로 정한다.
    this.element.textContent = "This is PageComponent"; // 글자 내용을 다음으로 넣어준다.
  }

  // 이 PageComponent는 html에서 main body가 될 부분이다. 따라서 어떤 페이지가 와도 그것을 받고 보여줘야한다.
  // 따라서 어떤 요소가 오든 그것을 받아서, 이 페이지에 붙여서 나타내주는 함수가 필요하다.
  // position은 요소를 어디에다가 추가할 지 정하는 인자이다.
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    // position은 만약 인자를 특별히 넣어주지 않으면 기본적으로 afterbegin 위치에 넣기로 한다.
    parent.insertAdjacentElement(position, this.element);
  }
}
