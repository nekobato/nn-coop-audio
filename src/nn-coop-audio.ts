import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("nn-coop-audio")
export class NNCoopAudio extends LitElement {
  @property({ type: String }) src: string = "";
  @property({ type: Boolean }) loop: boolean = false;
  @property({ type: Boolean }) autoplay: boolean = false;
  @property({ type: Boolean }) muted: boolean = false;
  @property({ type: String }) preload: "none" | "metadata" | "auto" = "auto";
  @property({ type: Boolean }) coop: boolean = false;
  @property({ type: Boolean }) controls: boolean = false;
  @state() uniq: string = Math.random()
    .toString(36)
    .substring(7);
  @query("#audio") audioElement!: HTMLAudioElement;

  private audioEvent = (e: Event) => {
    const event = e as CustomEvent;
    if (event.detail.status === "play" && event.detail.uniq !== this.uniq) {
      const audio = this.shadowRoot?.querySelector("#audio") as HTMLAudioElement;
      console.log(audio);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  };

  firstUpdated() {
    window.addEventListener("nncoopaudio", this.audioEvent);
  }

  disconnectedCallback(): void {
    window.removeEventListener("nncoopaudio", this.audioEvent);
    super.disconnectedCallback();
  }

  onPlay() {
    if (this.coop) {
      window.dispatchEvent(
        new CustomEvent("nncoopaudio", {
          detail: {
            status: "play",
            uniq: this.uniq,
          },
        })
      );
    }
  }

  render() {
    return html`
      <style>
        :host {
          height: 40px;
          display: inline-flex;
        }
        audio {
          height: 100%;
        }
      </style>
      <audio
        id="audio"
        ?loop=${this.loop}
        ?autoplay=${this.autoplay}
        ?muted=${this.muted}
        .preload=${this.preload}
        @play=${this.onPlay}
        ?controls=${this.controls}
      >
        <source .src=${this.src} />
      </audio>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nn-coop-audio": NNCoopAudio;
  }
}
