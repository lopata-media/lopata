function getSearchTargetText(element: Element): string {
    return element.textContent.trim().toLowerCase();
}

function isMatch(element: HTMLElement, search: string): boolean {
    const normalizedSearch = search.trim().toLowerCase();

    const targets = element.querySelectorAll("[data-search-target]");

    if (targets.length === 0) {
        const searchText = getSearchTargetText(element);

        if (searchText.includes(normalizedSearch)) {
            return true;
        }
    }

    for (let i = 0; i < targets.length; i++) {
        const currentTarget = targets.item(i);
        const searchText = getSearchTargetText(currentTarget);

        if (searchText.includes(normalizedSearch)) {
            return true;
        }
    }

    return false;
}

document.querySelectorAll<HTMLInputElement>("[data-search-input]")
    .forEach((element) => {
        const searchName = element.getAttribute("data-search-input");
        const searchTarget = document.querySelector(`[data-search-items="${searchName}"]`);
        element.addEventListener("input", ({target}) => {
            if (target instanceof HTMLInputElement) {
                for (let i = 0; i < searchTarget.childElementCount; i++) {
                    const searchTargetItem = searchTarget.children.item(i);
                    if (searchTargetItem instanceof HTMLElement) {
                        searchTargetItem.style.display = isMatch(searchTargetItem, target.value) ? "block" : "none";
                    }
                }
            }
        });
    });