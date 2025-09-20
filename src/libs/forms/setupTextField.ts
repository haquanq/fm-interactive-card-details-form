import { FormControl } from "./types/FormControl";

type TextFieldPresets = {
    type: "letters-only" | "digits-only";
    customValidator?: (value: string) => string;
    onInput?: (e: Event) => void;
    group?: HTMLElement;
};

export const setupTextField = (id: `#${string}`, preset: TextFieldPresets): FormControl => {
    const wrapper = document.querySelector(id) as HTMLElement;
    const input = wrapper.querySelector(".text-field__input") as HTMLInputElement;
    const hint = (preset.group || wrapper).querySelector(".text-field__hint") as HTMLElement;

    input.addEventListener("beforeinput", (e) => {
        if (e.data === null) return;

        if (preset.type === "letters-only") {
            const lettersAndSpacesOnlyPattern = /^[a-zA-Z ]*$/g;
            if (!lettersAndSpacesOnlyPattern.test(e.data as string)) {
                e.preventDefault();
            }
        }

        if (preset.type === "digits-only") {
            const digitsOnlyPattern = /^[0-9]*$/g;
            if (!digitsOnlyPattern.test(e.data as string)) {
                e.preventDefault();
            }
        }
    });

    input.addEventListener("input", (e) => {
        if (preset.onInput) preset.onInput(e as Event);
    });

    const helpers = {
        validate: () => {
            let errorMessage = "";
            if (input.validity.valueMissing) {
                errorMessage = "Can't leave blank.";
            } else if (preset.customValidator) {
                errorMessage = preset.customValidator(helpers.getValue());
            }

            if (errorMessage !== "") {
                helpers.showError(errorMessage);
                return false;
            }

            helpers.clearError();
            return true;
        },
        showError: (message: string) => {
            preset.group?.setAttribute("aria-invalid", "true");
            wrapper.setAttribute("aria-invalid", "true");
            input.setAttribute("aria-invalid", "true");
            hint.textContent = message;
        },

        clearError: () => {
            preset.group?.setAttribute("aria-invalid", "false");
            wrapper.setAttribute("aria-invalid", "false");
            input.setAttribute("aria-invalid", "false");
            hint.textContent = "";
        },

        getName: () => {
            return input.name;
        },

        getValue: () => {
            return input.value;
        },

        focus: () => {
            input.focus();
        },

        reset: () => {
            input.value = "";
            helpers.clearError();
        },
    };

    const eventHandlers = {
        blurEvent: () => {
            helpers.validate();
        },
    };

    input.addEventListener("blur", eventHandlers.blurEvent);
    return { ...helpers };
};
