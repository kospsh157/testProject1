import { BaseComponent } from "../../BaseComponent.js";

export class Youtube extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      "<section>\
            <div class='youtube'><iframe class='youtubeFrame'></iframe></div>\
            <h3 class='youtubeTitle'></h3>\
         </section>"
    );

    const youtubeTitle = this.element.querySelector(
      ".youtubeTitle"
    )! as HTMLHeadingElement;
    youtubeTitle.textContent = title;

    const iFrame = this.element.querySelector(
      ".youtubeFrame"
    )! as HTMLIFrameElement;
    iFrame.src = this.convertToURL(url);
  }

  // 정규 표현식을 사용하여 사용자가 받아온 유튜브 주소중에 필요한 부분만 취해서
  // embeded URL 식으로 바꿔서 리턴한다.
  private convertToURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))$/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // 아무것도 매칭되는 것이 없다면, 그냥 생성자에 입력된 url 리턴.
    // 원래는 처리를 해줘야 한다.
    return url;
  }
}

// <iframe
//   width="1280"
//   height="720"
//   src="https://www.youtube.com/embed/rOkIzvJJ1nY"
//   title="YouTube video player"
//   frameborder="0"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen
// ></iframe>;
