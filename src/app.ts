import { Composable, ItemPageComponent, Page } from "./components/page/Page.js"; // 지금은 따로 리액트나 다른 프레임워크를 쓰지 않고 있기 때문에, 확장자명 .js까지 적어줘야한다.
import { Image } from "./components/page/item/Image.js";
import { Note } from "./components/page/item/Note.js";
import { Todo } from "./components/page/item/Todo.js";
import { Youtube } from "./components/page/item/Youtube.js";
import { Component } from "./components/BaseComponent.js";
import { Dialog } from "./components/dialog/Dialog.js";
import { MediaInput } from "./components/dialog/Input/MediaInput.js";

// 이 파일은 스타트 포인트가 될 파일이다.
class App {
  private readonly page: Component & Composable; // 이렇게 인터페이스로 명시해두면, 나중에 어떤 page가 와도
  // 다 담을 수 있다. 타입끼리 &으로 묶으면, 동시에 Component이면서 Composable를 구현하는 타입이라는 뜻이다.

  constructor(appRoot: HTMLElement) {
    this.page = new Page(ItemPageComponent); // 사실 이렇게 생성자 안에서 만들어서 추가하는 것은 위험하다. 원래는 생성자 밖에서 만들어서
    // 디펜젼시 인젝션으로 주입시켜서 쓰는게 디커플링되고 좋다.

    // 외부 생성자 주입으로 리팩토링을 했다.
    // 그리고 그 결과로, 이제는 ItemPageComponent클래스를 그냥 넣어주기만 해도 알아서 내부적으로, 그 클래스의 생성자를 호출해서 사용한다.

    this.page.attachTo(appRoot); // 여기서 appRoot는 index.html의 .documnet클래스이다. 즉 가장 페이지를 표시해준 가장 큰 부모이다.
    // page를 생성하고, 그 page를 attachTo()함수를 이용해 .document에 붙여 넣는 것이다.

    // 이미지 컴포넌트 추가
    // const img = new Image("https://picsum.photos/800/400", "Image Title");
    // this.page.addChild(img);

    // 유튜브 추가
    const youtube = new Youtube(
      "Youtube Video",
      "https://www.youtube.com/watch?v=CfPxlb8-ZQ0"
    );
    this.page.addChild(youtube);

    // Note 컴포넌트 추가
    const note = new Note("Hello World", "I want to No War");
    this.page.addChild(note);

    // Todo 컴포넌트 추가
    const todo = new Todo("This is Todo", "Todo Body");
    this.page.addChild(todo);

    // Image 버튼을 누르면, 다이얼로그 모달창이 뜨게하기.
    const imageBtn = document.querySelector("#newImage")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new Dialog();
      const inputSection = new MediaInput();
      dialog.addChild(inputSection);

      // dialog에 콜백함수 전달하기.
      dialog.setCloseBtn(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setSubmitBtn(() => {
        // 이미지 등록 처리하고 나서
        const img = new Image(inputSection.url, inputSection.title);
        this.page.addChild(img);

        // 다이어로그창 없애기.
        dialog.removeFrom(document.body);
      });

      // 모달창이므로 Page 컴포넌트에 포함시키는게 아니라, 그냥 전체창으로 나타냈다가 기능을 다하면 사라지게 한다.
      dialog.attachTo(document.body);
    });
  }
}
// 어플리케이션이 시작되면 App을 만들고, root인, document에 .document요소를 받아와서 App의 생성자 인자로 넣어준다.
// 그럼 App이 알아서 PageComponent를 만들고 거기 안에다 붙여 넣을 것이다.
new App(document.querySelector(".document")! as HTMLElement);
// 타입 어썰션을 사용한 이유는 쿼리셀렉터의 리턴이 null일 수도 있기 때문에 타입스크립트 컴파일러가 에러를 일으킨다. 하지만 여기에서 .document클래스 요소는 index.html에 고정으로 박혀있는 요소이다.
// 따라서 동적으로 뭔가 변할 일이 없기 때문에, 확실하기 때문에 바로 걍 타입 어썰션을 줘서 에러를 잡는다.

// 일단 이렇게 하고, tsc -w 와치 모드로 컴파일하면 지금까지 한 내용이 라이브서버로 떠야 한다.

// new App을 안하면, App을 만들어 놓고 사용하지 않는다는 이유로 제대로 빌드가 되지 않는다.
