import { LitElement } from "lit";
export declare class NNCoopAudio extends LitElement {
    src: string;
    loop: boolean;
    autoplay: boolean;
    muted: boolean;
    preload: "none" | "metadata" | "auto";
    coop: boolean;
    controls: boolean;
    uniq: string;
    audioElement: HTMLAudioElement;
    private audioEvent;
    firstUpdated(): void;
    disconnectedCallback(): void;
    onPlay(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "nn-coop-audio": NNCoopAudio;
    }
}
//# sourceMappingURL=nn-coop-audio.d.ts.map