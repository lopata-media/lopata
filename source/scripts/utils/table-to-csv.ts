export function convertTableToCsv(table: HTMLElement, separator: string = ","): string {
    const rows = table.querySelectorAll("tr");

    const csv = [];
    for (let i = 0; i < rows.length; i++) {
        let row = [];
        let cols = rows[i].querySelectorAll("td, th")
        for (let j = 0; j < cols.length; j++) {
            let data = cols[j].textContent?.replace(/(\r\n|\n|\r)/gm, "")
                .replace(/(\s\s)/gm, " ")
                .replace(/"/g, `""`);
            if (data !== null) {
                row.push(`"${data}"`);
            }
        }
        csv.push(row.join(separator));
    }

    return csv.join("\n");
}