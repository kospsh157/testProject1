import { Composable, ItemPageComponent, Page } from "./components/page/Page.js"; // 지금은 따로 리액트나 다른 프레임워크를 쓰지 않고 있기 때문에, 확장자명 .js까지 적어줘야한다.
import { Image } from "./components/page/item/Image.js";
import { Note } from "./components/page/item/Note.js";
import { Todo } from "./components/page/item/Todo.js";
import { Youtube } from "./components/page/item/Youtube.js";
import { Component } from "./components/BaseComponent.js";
import {
  Dialog,
  MediaDataInput,
  TextDataInput,
} from "./components/dialog/Dialog.js";
import { MediaInput } from "./components/dialog/Input/MediaInput.js";
import { TextInput } from "./components/dialog/Input/TextInput.js";

// 이 파일은 스타트 포인트가 될 파일이다.

// 생성자를 받아서 바로 쓰기 위한, 생성자 타입 정의.
type inputSectionType<T extends (MediaDataInput | TextDataInput) & Component> =
  {
    new (): T;
  };

class App {
  private readonly page: Component & Composable; // 이렇게 인터페이스로 명시해두면, 나중에 어떤 page가 와도
  // 다 담을 수 있다. 타입끼리 &으로 묶으면, 동시에 Component이면서 Composable를 구현하는 타입이라는 뜻이다.

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new Page(ItemPageComponent); // 사실 이렇게 생성자 안에서 만들어서 추가하는 것은 위험하다. 원래는 생성자 밖에서 만들어서
    // 디펜젼시 인젝션으로 주입시켜서 쓰는게 디커플링되고 좋다.

    // 외부 생성자 주입으로 리팩토링을 했다.
    // 그리고 그 결과로, 이제는 ItemPageComponent클래스를 그냥 넣어주기만 해도 알아서 내부적으로, 그 클래스의 생성자를 호출해서 사용한다.

    this.page.attachTo(appRoot); // 여기서 appRoot는 index.html의 .documnet클래스이다. 즉 가장 페이지를 표시해준 가장 큰 부모이다.
    // page를 생성하고, 그 page를 attachTo()함수를 이용해 .document에 붙여 넣는 것이다.

    // Example1 Image
    const img = new Image(
      "You can save image, youtube, note, todo on here.",
      "https://picsum.photos/800/400"
    );
    this.page.addChild(img);

    // Example2 Youtube
    const yout = new Youtube(
      "The important thing is to prepare the resources and time to get back up from failure.",
      "https://youtu.be/3KvdWd9iqAY"
    );
    this.page.addChild(yout);

    // Note1 Usage
    const pForNote1 = document.createElement("p");
    pForNote1.innerHTML = `
      If you want add a image, click image button and type 'https://picsum.photos/500/250' at URL. <br>
      You can get a random image from this url.
    `;
    const note1 = new Note("MyList Usage (Add Image)", pForNote1);
    this.page.addChild(note1);

    // Note2 Usage
    const pForNote2 = document.createElement("p");
    pForNote2.innerHTML = `<p>
      If you want add Youtube video, click video button and type youtube url you want at URL.<br>
      (Sometimes there are YouTube videos that doesn't work.)
    </p>`;
    const note2 = new Note("MyList Usage (Add Video)", pForNote2);
    this.page.addChild(note2);

    // Note3 About Project
    const p = document.createElement("p");
    p.innerHTML = `
      <p>
        I done this project during learning in Dream-coding Academy(Online). I have learned about TypeScript and OOP in this project. <br/>
        Dram-Coding Academy url: <a href = https://academy.dream-coding.com>https://academy.dream-coding.com</a> (Korean) <br/>
        She(teacher) is very nice and I know she is currently working as a manager in the USA. <br/>
        I learned a lot from watching her coding style.<br/>
        During this project, I did not simply follow her code, but understood and digested it with my own.<br/>
      </p>
    `;
    const note3 = new Note("About this project", p);
    this.page.addChild(note3);

    // Todo
    const todo = new Todo("I have to do", "Find Job");
    this.page.addChild(todo);

    // 유튜브 추가
    // const youtube = new Youtube(
    //   "Youtube Video",
    //   "https://www.youtube.com/watch?v=CfPxlb8-ZQ0"
    // );
    // this.page.addChild(youtube);

    // // Note 컴포넌트 추가
    // const note = new Note("Hello World", "I want to No War");
    // this.page.addChild(note);

    // // Todo 컴포넌트 추가
    // const todo = new Todo("This is Todo", "Todo Body");
    // this.page.addChild(todo);

    this.bindInputToElement("#newImage", MediaInput, (input: MediaInput) => {
      return new Image(input.title, input.url);
    });

    this.bindInputToElement("#newVideo", MediaInput, (input: MediaInput) => {
      return new Youtube(input.title, input.url);
    });

    this.bindInputToElement("#newNote", TextInput, (input: TextInput) => {
      const para = document.createElement("p");
      para.textContent = input.body;
      return new Note(input.title, para);
    });

    this.bindInputToElement("#newTodo", TextInput, (input: TextInput) => {
      return new Todo(input.title, input.body);
    });

    // // Todo 버튼을 누르면, 다이얼로그 모달창이 뜨게하기.
    // const todoBtn = document.querySelector("#newTodo")! as HTMLButtonElement;
    // todoBtn.addEventListener("click", () => {
    //   const dialog = new Dialog();
    //   const inputSection = new TextInput();
    //   dialog.addChild(inputSection);

    //   // dialog에 콜백함수 전달하기.
    //   dialog.setCloseBtn(() => {
    //     dialog.removeFrom(dialogRoot);
    //   });

    //   dialog.setSubmitBtn(() => {
    //     // 이미지 등록 처리하고 나서
    //     const todo = new Todo(inputSection.title, inputSection.body);
    //     this.page.addChild(todo);

    //     // 다이어로그창 없애기.
    //     dialog.removeFrom(dialogRoot);
    //   });

    //   // 모달창이므로 Page 컴포넌트에 포함시키는게 아니라, 그냥 전체창으로 나타냈다가 기능을 다하면 사라지게 한다.
    //   dialog.attachTo(dialogRoot);
    // });
  } //  Constructor End

  // 반복되는 코드를 없애고자, 함수로 리펙토링한다.
  // 여기서 주의하게 봐야할 것은 3번째 인자로 주는 익명함수이다.
  // 함수를 정의하는 매개변수로써, 익명함수를 전달할때는 다음과 같은 개념을 알고있어야 한다.
  // 1. 매개변수에서 익명함수를 단지 인터페이스만 알려줄뿐이다. 그 익명함수로 들어가는 매개변수의 타입과,
  // 그 익명함수의 리턴타입만을 명시할 뿐이다.
  // 2. 실제로 이 함수를 사용하는 시점에서 3번째 인자인, 익명함수를 작성하게 될 것이다.
  // 3. 그리고 이 익명함수에 들어가는 인자는 그게 신경 쓸 필요 없다. 결국 내부적으로 본체 함수에서는
  // 이 익명함수를 받아서, 무조건 이 인자에 내부적으로 이미 생성된, input인스턴스를 넣게 된다.
  // 콜백함수를 익명함수로 받아 쓰는 디자인 코드개념을 보면 더욱 이해가 좋을 것 같다.
  private bindInputToElement<
    T extends (MediaDataInput | TextDataInput) & Component
  >(
    selector: string,
    inputSectionCon: inputSectionType<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new Dialog();
      const input = new inputSectionCon();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      // dialog에 콜백함수 전달하기.
      dialog.setCloseBtn(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setSubmitBtn(() => {
        // 이미지 등록 처리하고 나서
        const section = makeSection(input);
        this.page.addChild(section);

        // 다이어로그창 없애기.
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// 어플리케이션이 시작되면 App을 만들고, root인, document에 .document요소를 받아와서 App의 생성자 인자로 넣어준다.
// 그럼 App이 알아서 PageComponent를 만들고 거기 안에다 붙여 넣을 것이다.
new App(document.querySelector(".document")! as HTMLElement, document.body);
// 타입 어썰션을 사용한 이유는 쿼리셀렉터의 리턴이 null일 수도 있기 때문에 타입스크립트 컴파일러가 에러를 일으킨다. 하지만 여기에서 .document클래스 요소는 index.html에 고정으로 박혀있는 요소이다.
// 따라서 동적으로 뭔가 변할 일이 없기 때문에, 확실하기 때문에 바로 걍 타입 어썰션을 줘서 에러를 잡는다.
// 일단 이렇게 하고, tsc -w 와치 모드로 컴파일하면 지금까지 한 내용이 라이브서버로 떠야 한다.
// new App을 안하면, App을 만들어 놓고 사용하지 않는다는 이유로 제대로 빌드가 되지 않는다.
