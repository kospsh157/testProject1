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
    iFrame.src = url;
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
