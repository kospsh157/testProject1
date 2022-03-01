import { PageComponent } from "./components/page.js"; // 지금은 따로 리액트나 다른 프레임워크를 쓰지 않고 있기 때문에, 확장자명 .js까지 적어줘야한다.

// 이 파일은 스타트 포인트가 될 파일이다.
class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
  }
}
// 어플리케이션이 시작되면 App을 만들고, root인, document에 .document요소를 받아와서 App의 생성자 인자로 넣어준다.
// 그럼 App이 알아서 PageComponent를 만들고 거기 안에다 붙여 넣을 것이다.
new App(document.querySelector(".document")! as HTMLElement);
// 타입 어썰션을 사용한 이유는 쿼리셀렉터의 리턴이 null일 수도 있기 때문에 타입스크립트 컴파일러가 에러를 일으킨다. 하지만 여기에서 .document클래스 요소는 index.html에 고정으로 박혀있는 요소이다.
// 따라서 동적으로 뭔가 변할 일이 없기 때문에, 확실하기 때문에 바로 걍 타입 어썰션을 줘서 에러를 잡는다.

// 일단 이렇게 하고, tsc -w 와치 모드로 컴파일하면 지금까지 한 내용이 라이브서버로 떠야 한다.

// new App을 안하면, App을 만들어 놓고 사용하지 않는다는 이유로 제대로 빌드가 되지 않는다.
