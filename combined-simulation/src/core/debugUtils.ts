// deno-lint-ignore-file no-explicit-any

const notRamHungryPrintIterations: { [key: number]: number } = {};
export const notRamHungryPrint = (id: number, max: number, ...msg: any[]) => {
    if (notRamHungryPrintIterations[id] === undefined)
        notRamHungryPrintIterations[id] = 0;
    if (notRamHungryPrintIterations[id] < max) console.log(...msg);
    notRamHungryPrintIterations[id]++;
};

const htmlMonitoringItems: { [key: string]: any } = {};
let htmlMonitoringInterval: number | null = null;
export const setHtmlMonitorItem = (key: string, value: any) => {
    const div = document.querySelector<HTMLDivElement>("#monitor");
    if (!div) return;
    htmlMonitoringItems[key] = value;
    if (htmlMonitoringInterval === null)
        htmlMonitoringInterval = setInterval(() => {
            div.innerHTML = `<pre><code>${JSON.stringify(
                htmlMonitoringItems,
                null,
                4
            )}</code></pre>`;
        }, 100);
};
