var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
let NNCoopAudio = class NNCoopAudio extends LitElement {
    src = "";
    loop = false;
    autoplay = false;
    muted = false;
    preload = "auto";
    coop = false;
    controls = false;
    uniq = Math.random()
        .toString(36)
        .substring(7);
    audioElement;
    audioEvent = (e) => {
        const event = e;
        if (event.detail.status === "play" && event.detail.uniq !== this.uniq) {
            const audio = this.shadowRoot?.querySelector("#audio");
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
    disconnectedCallback() {
        window.removeEventListener("nncoopaudio", this.audioEvent);
        super.disconnectedCallback();
    }
    onPlay() {
        if (this.coop) {
            window.dispatchEvent(new CustomEvent("nncoopaudio", {
                detail: {
                    status: "play",
                    uniq: this.uniq,
                },
            }));
        }
    }
    render() {
        return html `
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
};
__decorate([
    property({ type: String })
], NNCoopAudio.prototype, "src", void 0);
__decorate([
    property({ type: Boolean })
], NNCoopAudio.prototype, "loop", void 0);
__decorate([
    property({ type: Boolean })
], NNCoopAudio.prototype, "autoplay", void 0);
__decorate([
    property({ type: Boolean })
], NNCoopAudio.prototype, "muted", void 0);
__decorate([
    property({ type: String })
], NNCoopAudio.prototype, "preload", void 0);
__decorate([
    property({ type: Boolean })
], NNCoopAudio.prototype, "coop", void 0);
__decorate([
    property({ type: Boolean })
], NNCoopAudio.prototype, "controls", void 0);
__decorate([
    state()
], NNCoopAudio.prototype, "uniq", void 0);
__decorate([
    query("#audio")
], NNCoopAudio.prototype, "audioElement", void 0);
NNCoopAudio = __decorate([
    customElement("nn-coop-audio")
], NNCoopAudio);
export { NNCoopAudio };
//# sourceMappingURL=nn-coop-audio.js.map