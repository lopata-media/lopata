export function initQuickListen(target: HTMLElement | Document) {
    target.querySelectorAll(".quick-listen-button").forEach((button) => {
        button.addEventListener("click", async ({target}) => {
            if (target instanceof Element) {
                const audioElement = target.parentNode?.querySelector("audio");

                if (audioElement) {
                    audioElement.addEventListener("pause", () => {
                        target.classList.remove("quick-listen-button_playing");
                    });

                    if (audioElement.paused) {
                        target.classList.add("quick-listen-button_playing");
                        await audioElement.play();
                    } else {
                        await audioElement.pause();
                    }
                }
            }
        });
    });
}