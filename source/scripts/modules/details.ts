import {DetailsAnimation} from "@cypress-design/details-animation";

export function initDetails(target: HTMLElement | Document) {
    target.querySelectorAll<HTMLDetailsElement>(".details").forEach((det) => {
        new DetailsAnimation(det, det.querySelector<HTMLElement>(".details-content")!, 300)
    });
}