export const range = (max: number, min = 0, step = 1): number[] => {
    const res: number[] = [];
    for (let i = min; i < max; i += step) {
        res.push(i);
    }
    return res;
};

const notRamHungryPrintIterations: { [key: number]: number } = {};
export const notRamHungryPrint = (
    id: number,
    max: number,
    // deno-lint-ignore no-explicit-any
    ...msg: any[]
) => {
    if (notRamHungryPrintIterations[id] !== undefined)
        notRamHungryPrintIterations[id] = 0;
    if (notRamHungryPrintIterations[id] < max) console.log(msg);
    notRamHungryPrintIterations[id]++;
};
