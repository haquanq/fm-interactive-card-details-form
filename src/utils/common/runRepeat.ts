export const runRepeat = (count: number, callback: (index: number) => void) => {
    [...Array(count)].forEach((_, index) => callback(index));
};
