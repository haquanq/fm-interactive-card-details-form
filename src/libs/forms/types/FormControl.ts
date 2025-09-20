export type FormControl = {
    focus: () => void;
    blur: () => void;
    getName: () => string;
    validate: () => boolean;
};
