import { setupTextField } from "./libs/forms/setupTextField";
import { addSpaceBetweenCharactars } from "./utils/common/addSpacesBetweenCharacters";
import { jumpInAnimate } from "./utils/animations/jumpInAnimate";
import { runRepeat } from "./utils/common/runRepeat";

const ccNameTextField = setupTextField("#cc-name-text-field", {
    type: "letters-only",
    onInput: (e) => {
        const input = e.target as HTMLInputElement;
        const mirrorElement = document.querySelector(".credit-card__front-name") as HTMLElement;
        mirrorElement.textContent = input.value !== "" ? input.value : "Jane Appleseed";
    },
});

const ccNumberTextField = setupTextField("#cc-number-text-field", {
    type: "digits-only",
    onInput: (e) => {
        const input = e.target as HTMLInputElement;

        const digitElements = document.querySelectorAll(".credit-card__front-number > span") as NodeListOf<HTMLElement>;

        const trimmedValue = input.value.replaceAll(" ", "").slice(0, 16);
        runRepeat(16, (index) => {
            const digit = digitElements[index];
            const char = index >= trimmedValue.length ? "0" : trimmedValue[index];

            if (char !== digit.textContent) {
                jumpInAnimate(digit, char);
            }
        });

        input.value = addSpaceBetweenCharactars(trimmedValue, 4, 1);
    },
    customValidator: (value) => {
        if (/\d{4} \d{4} \d{4} \d{4}/.test(value) === false) {
            return "Please provide correct credit card number.";
        }
        return "";
    },
});

const ccExpireMonthTextField = setupTextField("#cc-expire-month-text-field", {
    type: "digits-only",
    group: document.querySelector("#cc-expire-text-field") as HTMLElement,
    onInput: (e) => {
        const digitElements = document.querySelectorAll(
            ".credit-card__front-expire-month > span"
        ) as NodeListOf<HTMLElement>;

        const input = e.target as HTMLInputElement;

        runRepeat(2, (index) => {
            const digit = digitElements[index];
            const char = index >= input.value.length ? "0" : input.value[index];

            if (char !== digit.textContent) {
                jumpInAnimate(digit, char);
            }
        });
    },
    customValidator: (value) => {
        if (parseFloat(value) > 12) {
            return "Invalid month.";
        }
        return "";
    },
});

const ccExpireYeartextField = setupTextField("#cc-expire-year-text-field", {
    type: "digits-only",
    group: document.querySelector("#cc-expire-text-field") as HTMLElement,
    onInput: (e) => {
        const input = e.target as HTMLInputElement;

        const digitElements = document.querySelectorAll(
            ".credit-card__front-expire-year > span"
        ) as NodeListOf<HTMLElement>;

        runRepeat(2, (index) => {
            const digit = digitElements[index];
            const char = index >= input.value.length ? "0" : input.value[index];

            if (char !== digit.textContent) {
                jumpInAnimate(digit, char);
            }
        });
    },
    customValidator: (value) => {
        const currentYear = new Date().getFullYear();
        const invalidYear = parseInt((currentYear - 1).toString().slice(2, 4)) >= parseInt(value);
        if (invalidYear) {
            return "Invalid year.";
        }
        return "";
    },
});

const ccCvcTextField = setupTextField("#cc-cvc-text-field", {
    type: "digits-only",
    onInput: (e) => {
        const input = e.target as HTMLInputElement;
        const digitElements = document.querySelectorAll(".credit-card__back-cvc > span") as NodeListOf<HTMLElement>;
        runRepeat(3, (index) => {
            const digit = digitElements[index];
            const char = index >= input.value.length ? "0" : input.value[index];

            if (char !== digit.textContent) {
                jumpInAnimate(digit, char);
            }
        });
    },
});

const detailsFormContainer = document.querySelector(".details__inner") as HTMLElement;
const detailsForm = document.querySelector(".details__form") as HTMLFormElement;
const detailsFormMessage = document.querySelector(".details__form-message") as HTMLElement;
const successModalContainer = document.querySelector(".success") as HTMLElement;

let successModalOpening = false;

const showSuccessSection = () => {
    detailsFormContainer.hidden = true;
    successModalContainer.removeAttribute("hidden");
    successModalContainer.setAttribute("tabindex", "0");
    successModalContainer.focus();
    successModalOpening = true;
};

detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const invalidFields = [];

    if (!ccNameTextField.validate()) invalidFields.push(ccNameTextField);
    if (!ccNumberTextField.validate()) invalidFields.push(ccNumberTextField);
    if (!ccExpireMonthTextField.validate()) invalidFields.push(ccExpireMonthTextField);
    if (!ccExpireYeartextField.validate()) invalidFields.push(ccExpireYeartextField);
    if (!ccCvcTextField.validate()) invalidFields.push(ccCvcTextField);

    if (invalidFields.length === 0) {
        showSuccessSection();
        detailsFormMessage.textContent = "";
    } else {
        detailsFormMessage.textContent = `Submission failed. Please check again fields: ${invalidFields
            .map((v) => v.getName())
            .join(", ")}`;
    }
});
