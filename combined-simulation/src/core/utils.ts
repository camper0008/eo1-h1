export const range = (min: number, max: number, step = 1): number[] => {
    const res: number[] = [];
    for (let i = min; i < max; i += step) {
        res.push(i);
    }
    return res;
};
