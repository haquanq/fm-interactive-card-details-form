export const addSpaceBetweenCharactars = (text: string, charCount: number, spaceCount: number) => {
    return text.split("").reduce((result, char, index) => {
        return result + (index % charCount === 0 ? " ".repeat(spaceCount) : "") + char;
    }, "");
};
