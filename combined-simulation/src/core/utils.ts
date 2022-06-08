export const range = (max: number, min = 0, step = 1): number[] => {
    const res: number[] = [];
    for (let i = min; i < max; i += step) {
        res.push(i);
    }
    return res;
};
