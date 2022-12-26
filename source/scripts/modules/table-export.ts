import TableToExcel from "@linways/table-to-excel";
import {saveAs} from "file-saver";
import {convertTableToCsv} from "../utils/table-to-csv";
import IziToast from "izitoast";

function initExportAsExcelButton(actionsContainer: HTMLElement): void {
    const exportButton = document.createElement("button");
    exportButton.classList.add("table-action", "table-action_xlsx");
    exportButton.textContent = "xlsx";
    exportButton.type = "button";

    exportButton.addEventListener("click", ({target}) => {
        if (target instanceof HTMLElement) {
            const table = target.closest(".table-wrapper")?.querySelector(".table");
            if (table) {
                TableToExcel.convert(table, {
                    name: "table1.xlsx",
                    sheet: {
                        name: table.querySelector("caption")?.textContent ?? "Sheet",
                    }
                });

                IziToast.show({
                    message: "Файл добавлен в загрузки.",
                    progressBar: false,
                });
            }
        }
    })

    actionsContainer.appendChild(exportButton);
}

function initExportAsCsvButton(container: HTMLElement) {
    const exportButton = document.createElement("button");
    exportButton.classList.add("table-action", "table-action_csv");
    exportButton.append("csv");

    exportButton.type = "button";

    exportButton.addEventListener("click", async ({target}) => {
        if (target instanceof HTMLElement) {
            const table = target.closest(".table-wrapper")?.querySelector(".table");
            if (table instanceof HTMLElement) {
                const blob = new Blob([convertTableToCsv(table)], {type: "data:text/csv;charset=utf-8"});
                saveAs(blob, "file.csv");

                IziToast.show({
                    message: "Файл добавлен в загрузки.",
                    progressBar: false,
                });
            }
        }
    })

    container.appendChild(exportButton);
}

async function selectElementContents(element: HTMLElement) {
    const blob = new Blob([convertTableToCsv(element, "\t")], {type: "text/plain"});
    const type = "text/plain";
    await navigator.clipboard.write([new ClipboardItem({ [type]:blob} )]);
}

function initCopyButton(container: HTMLElement) {
    const exportButton = document.createElement("button");
    exportButton.classList.add("table-action");
    exportButton.textContent = "Скопировать";
    exportButton.type = "button";

    exportButton.addEventListener("click", async ({target}) => {
        if (target instanceof HTMLElement) {
            const table = target.closest(".table-wrapper")?.querySelector(".table");
            if (table instanceof HTMLElement) {
                await selectElementContents(table);

                IziToast.show({
                    message: "Таблица скопирована.",
                    progressBar: false,
                });
            }
        }
    })

    container.appendChild(exportButton);
}

function initTableAction(wrapper: HTMLElement): void {
    let tableActionsElement = wrapper.querySelector<HTMLElement>(".table-actions");

    if (tableActionsElement === null) {
        tableActionsElement = document.createElement("div");
        tableActionsElement.classList.add("table-actions");
        wrapper.appendChild(tableActionsElement);
    }

    initCopyButton(tableActionsElement);
    initExportAsExcelButton(tableActionsElement);
    initExportAsCsvButton(tableActionsElement);
}

export function initTableExport(target: HTMLElement | Document) {
    target.querySelectorAll<HTMLElement>(".table-wrapper").forEach(initTableAction);
}