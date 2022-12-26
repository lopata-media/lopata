import {initQuickListen} from "./modules/audio";
import {initDetails} from "./modules/details";
import {initTableExport} from "./modules/table-export";

initQuickListen(document);
initDetails(document);
initTableExport(document);

type AmpStoryElement = HTMLElement & {
    isReady: boolean,
    pause(): void,
    play(): void,
    getStories(): any[],
    show(href: string, id: number | null, options: { animate: boolean }): void,
};

initStoryPlayer(document);

function initStoryPlayer(element: HTMLElement | Document) {
    const player = element.querySelector<AmpStoryElement>("amp-story-player");

    if (player === null) {
        return;
    }

    if (player.isReady) {
        initCarousel(player);
    } else {
        player.addEventListener('ready', () => {
            initCarousel(player);
        });
    }
}

function initCarousel(player: AmpStoryElement) {
   initializeCards(player);

    player.addEventListener('amp-story-player-close', () => {
        closePlayer(player);
    });

    // For swipe down to close.
    //initializeTouchListeners();
}

function closePlayer(playerElement: AmpStoryElement) {
    playerElement.pause();
    document.body.classList.toggle('lightbox-open', false);
    const lightbox = playerElement.closest('.lightbox');
    lightbox?.classList?.add('closed');
}


export function initializeCards(player: AmpStoryElement) {
    const lightboxElement = player.closest('.lightbox');

    if (lightboxElement === null) {
        throw new Error("No lightbox element found");
    }

    lightboxElement.addEventListener('click', () => {
        document.body.classList.toggle('lightbox-open');
    });

    const stories = player.getStories();

    const cards = document.querySelectorAll(".story-list-item");

    console.log(stories)

    cards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            player.show(stories[idx].href, null, {animate: false});
            document.body.classList.toggle('lightbox-open');
            lightboxElement.classList.remove('closed');
            player.play();
        });
    });
}

