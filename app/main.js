const cardHolderNameTextbox = {
    containerElement: document.querySelector(".textbox.cardholder-name"),
    inputElement: document.querySelector(".textbox.cardholder-name .textbox__input"),
    hintElement: document.querySelector(".textbox.cardholder-name .textbox__hint"),
    displayElement: document.querySelector(".card__front__name"),
    defaultValue: "Jane Appleseed",

    /**
     * @param {string} message
     */
    showError(message) {
        this.hintElement.style.display = "block";
        this.hintElement.textContent = message;
        this.inputElement.setAttribute("aria-invalid", "true");
    },

    clearError() {
        this.hintElement.style.display = "";
        this.hintElement.textContent = "";
        this.inputElement.setAttribute("aria-invalid", "false");
    },

    /**
     * @returns {boolean}
     */
    checkValid() {
        const isEmpty = this.inputElement.value === "";
        if (isEmpty) this.showError("Can't be blank");
        else this.clearError();
        return isEmpty;
    },

    /**
     * @param {InputEvent} e
     */
    handleInput(e) {
        let val = "";

        let spaced = false;
        for (let i = 0; i < e.target.value.length; i++) {
            const c = e.target.value[i];
            if (/[a-zA-Z]/.test(c)) {
                spaced = false;
                val += c;
            } else if (c == " " && !spaced) {
                spaced = true;
                val += c;
            } else break;

            if (val.length == 26) break;
        }

        if (val == "") {
            this.displayElement.textContent = this.defaultValue;
        } else {
            this.displayElement.textContent = val;
        }

        e.target.value = val;
    },
    init() {
        this.inputElement.addEventListener("input", (e) => this.handleInput(e));
    },
};

const cardNumberTextbox = {
    containerElement: document.querySelector(".textbox.card-number"),
    inputElement: document.querySelector(".textbox.card-number .textbox__input"),
    hintElement: document.querySelector(".textbox.card-number .textbox__hint"),
    digitElements: document.querySelectorAll(".card__front__number span:not([data-ws])"),

    /**
     * @param {number} idx
     * @param {string} value
     */
    updateDigit(idx, value) {
        if (this.digitElements[idx].textContent == value) return;

        const parentElement = this.digitElements[idx];
        const holder = document.createElement("span");
        holder.textContent = value;
        holder.style.display = "block";
        holder.style.transform = "translateY(6px) scale(1.3)";

        parentElement.textContent = null;
        parentElement.appendChild(holder);

        requestAnimationFrame(() => {
            holder.style.transition = "transform 200ms ease";
            holder.style.transform = "translateY(0) scale(1)";
        });
    },

    /**
     * @param {string} message
     */
    showError(message) {
        this.hintElement.textContent = message;
        this.hintElement.style.display = "block";
        this.inputElement.setAttribute("aria-invalid", "true");
    },

    clearError() {
        this.hintElement.textContent = "";
        this.hintElement.style.display = "";
        this.inputElement.setAttribute("aria-invalid", "false");
    },

    /**
     * @returns {boolean}
     */
    checkValid() {
        const isEmpty = this.inputElement.value === "";
        if (isEmpty) this.showError("Can't be blank");
        else this.clearError();
        return isEmpty;
    },

    /**
     * @param {InputEvent} e
     */
    handleInput(e) {
        /** @type {string} val */
        let val = "";
        for (let i = 0; i < e.target.value.length; i++) {
            const v = e.target.value[i];

            if (/\d/.test(v)) val += v;
            else if (v == " ") continue;
            else break;

            if (val.length == 16) break;
        }

        let caretIndex = e.target.selectionStart;

        if (caretIndex > 15) caretIndex -= 3;
        else if (caretIndex > 15) caretIndex -= 2;
        else if (caretIndex > 5) caretIndex -= 1;

        if (caretIndex < val.length) {
            val = val.slice(0, caretIndex);
            console.log(val);
        }

        const groupedDigits = [];
        let groupFour = "";
        for (let i = 0; i < 16; i++) {
            if (i >= val.length) {
                this.updateDigit(i, "0");
                continue;
            }

            this.updateDigit(i, val[i]);

            groupFour += val[i];
            if (groupFour.length == 4 || i == val.length - 1) {
                groupedDigits.push(groupFour);
                groupFour = "";
            }
        }
        e.target.value = groupedDigits.join(" ");
    },

    init() {
        this.inputElement.addEventListener("input", (e) => this.handleInput(e));
    },
};

const cardExpireMonthTextbox = {
    containerElement: document.querySelector(".textbox.expire-month"),
    inputElement: document.querySelector(".textbox.expire-month .textbox__input"),
    hintElement: document.querySelector(".textbox.expire-month .textbox__hint"),
    digitElements: document.querySelectorAll(".card__front__expire-month span:not([data-ws])"),

    /**
     * @param {number} idx
     * @param {string} value
     */
    updateDigit(idx, value) {
        if (this.digitElements[idx].textContent == value) return;

        const parentElement = this.digitElements[idx];
        const holder = document.createElement("span");
        holder.textContent = value;
        holder.style.display = "block";
        holder.style.transform = "translateY(6px) scale(1.3)";

        parentElement.textContent = null;
        parentElement.appendChild(holder);

        requestAnimationFrame(() => {
            holder.style.transition = "transform 200ms ease";
            holder.style.transform = "translateY(0) scale(1)";
        });
    },

    /**
     * @param {string} message
     */
    showError(message) {
        this.hintElement.textContent = message;
        this.hintElement.style.display = "block";
        this.inputElement.setAttribute("aria-invalid", "true");
    },

    clearError() {
        this.hintElement.textContent = "";
        this.hintElement.style.display = "";
        this.inputElement.setAttribute("aria-invalid", "false");
    },

    /**
     * @returns {boolean}
     */
    checkValid() {
        const isEmpty = this.inputElement.value === "";
        if (isEmpty) this.showError("Can't be blank");
        else this.clearError();
        return isEmpty;
    },

    /**
     * @param {InputEvent} e
     */
    handleInput(e) {
        let val = "";

        for (let i = 0; i < e.target.value.length; i++) {
            const v = e.target.value[i];
            if (/\d/.test(v)) {
                val += v;
            } else if (v == " ") continue;
            else break;

            if (val.length == 3) {
                break;
            }
        }

        val = Math.min(parseInt(val), 12).toString();

        val = val.replace(/^0+/, "");

        if (val.length > 0 && val.length < 2) {
            val = "0" + val;
        }

        for (let i = 0; i < 2; i++) {
            if (i >= val.length) {
                this.updateDigit(i, "0");
            } else {
                this.updateDigit(i, val[i]);
            }
        }

        e.target.value = val;
    },
    init() {
        this.inputElement.addEventListener("input", (e) => this.handleInput(e));
    },
};

const cardExpireYearTextbox = {
    containerElement: document.querySelector(".textbox.expire-year"),
    inputElement: document.querySelector(".textbox.expire-year .textbox__input"),
    hintElement: document.querySelector(".textbox.expire-year .textbox__hint"),
    digitElements: document.querySelectorAll(".card__front__expire-year span:not([data-ws])"),

    settings: {
        maxLength: 3,
    },

    /**
     * @param {number} idx
     * @param {string} value
     */
    updateDigit(idx, value) {
        if (this.digitElements[idx].textContent == value) return;

        const parentElement = this.digitElements[idx];
        const holder = document.createElement("span");
        holder.textContent = value;
        holder.style.display = "block";
        holder.style.transform = "translateY(6px) scale(1.3)";

        parentElement.textContent = null;
        parentElement.appendChild(holder);

        requestAnimationFrame(() => {
            holder.style.transition = "transform 200ms ease";
            holder.style.transform = "translateY(0) scale(1)";
        });
    },

    /**
     * @param {string} message
     */
    showError(message) {
        this.hintElement.textContent = message;
        this.hintElement.style.display = "none";
        this.inputElement.setAttribute("aria-invalid", "true");
    },

    clearError() {
        this.hintElement.textContent = "";
        this.hintElement.style.display = "";
        this.inputElement.setAttribute("aria-invalid", "false");
    },

    /**
     * @returns {boolean}
     */
    checkValid() {
        const isEmpty = this.inputElement.value === "";
        if (isEmpty) this.showError("Can't be blank");
        else this.clearError();
        return isEmpty;
    },

    /**
     * @param {InputEvent} e
     */
    handleInput(e) {
        let val = "";
        for (let i = 0; i < e.target.value.length; i++) {
            const v = e.target.value[i];
            if (/\d/.test(v)) {
                val += v;
            } else if (v == " ") continue;
            else break;

            if (val.length == this.settings.maxLength) {
                break;
            }
        }

        val = val.replace(/^0+/, "");

        if (val.length > 0 && val.length < 2) {
            console.log(val);
            val = "0" + val;
        }

        if (val.length > 2) {
            val = val.slice(0, 2);
        }

        for (let i = 0; i < 2; i++) {
            if (i >= val.length) {
                this.updateDigit(i, "0");
            } else {
                this.updateDigit(i, val[i]);
            }
        }

        e.target.value = val;
    },
    init() {
        this.inputElement.addEventListener("input", (e) => this.handleInput(e));
    },
};

const cardCvcNumberTextbox = {
    containerElement: document.querySelector(".textbox.cvc-number"),
    inputElement: document.querySelector(".textbox.cvc-number .textbox__input"),
    hintElement: document.querySelector(".textbox.cvc-number .textbox__hint"),
    digitElements: document.querySelectorAll(".card__back__cvc span"),

    settings: {
        maxLength: 3,
    },

    /**
     * @param {number} idx
     * @param {string} value
     */
    updateCvcNumberDigit(idx, value) {
        if (this.digitElements[idx].textContent == value) return;

        const parentElement = this.digitElements[idx];
        const holder = document.createElement("span");
        holder.textContent = value;
        holder.style.display = "block";
        holder.style.transform = "translateY(6px) scale(1.3)";

        parentElement.textContent = null;
        parentElement.appendChild(holder);

        requestAnimationFrame(() => {
            holder.style.transition = "transform 200ms ease";
            holder.style.transform = "translateY(0) scale(1)";
        });
    },
    /**
     * @param {string} message
     */
    showError(message) {
        this.hintElement.textContent = message;
        this.hintElement.style.display = "block";
        this.inputElement.setAttribute("aria-invalid", "true");
    },

    clearError() {
        this.hintElement.textContent = "";
        this.hintElement.style.display = "";
        this.inputElement.setAttribute("aria-invalid", "false");
    },

    /**
     * @returns {boolean}
     */
    checkValid() {
        const isEmpty = this.inputElement.value === "";
        if (isEmpty) this.showError("Can't be blank");
        else this.clearError();
        return isEmpty;
    },
    handleInput(e) {
        let val = "";

        for (let i = 0; i < e.target.value.length; i++) {
            const v = e.target.value[i];
            if (/\d/.test(v)) {
                val += v;
            } else if (v == " ") continue;
            else break;

            if (val.length == this.settings.maxLength) {
                break;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (i >= val.length) {
                this.updateCvcNumberDigit(i, "0");
            } else {
                this.updateCvcNumberDigit(i, val[i]);
            }
        }

        e.target.value = val;
    },
    init() {
        this.inputElement.addEventListener("input", (e) => this.handleInput(e));
    },
};

const cardDetailsForm = {
    formContainer: document.querySelector(".details__inner"),
    formElement: document.querySelector(".details__form"),
    messageElement: document.querySelector("#form-error-messages"),
    successModal: document.querySelector(".success__modal"),
    successModalOpening: false,

    showSuccessModal() {
        this.formContainer.setAttribute("hidden", "");
        this.successModal.removeAttribute("hidden");
        this.successModalOpening = true;
        this.successModal.setAttribute("tabindex", "0");
        this.successModal.focus();
    },

    bootstrap() {
        cardHolderNameTextbox.init();
        cardNumberTextbox.init();
        cardExpireMonthTextbox.init();
        cardExpireYearTextbox.init();
        cardCvcNumberTextbox.init();
    },

    init() {
        this.bootstrap();
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.messageElement.textContent = "";

            let valid = true;
            let errorMessages = "";
            let expireMonthEmpty = false;
            let expireYearEmpty = false;

            if (cardHolderNameTextbox.checkValid()) {
                errorMessages += "Cardholder name can't be empty, ";
                valid = false;
            }
            if (cardNumberTextbox.checkValid()) {
                errorMessages += "Card number can't be empty, ";
                valid = false;
            }
            if (cardExpireMonthTextbox.checkValid()) {
                errorMessages += "Expire month can't be empty, ";
                valid = false;
                expireMonthEmpty = true;
            }
            if (cardExpireYearTextbox.checkValid()) {
                errorMessages += "Expire year can't be empty, ";
                valid = false;
                expireYearEmpty = true;
            }
            if (cardCvcNumberTextbox.checkValid()) {
                errorMessages += "CVC number can't be empty, ";
                valid = false;
            }

            const msg = document.querySelector(".details__expire__hint");
            if (expireMonthEmpty || expireYearEmpty) {
                msg.textContent = "Can't be blank";
                msg.style.display = "block";
            } else {
                msg.textContent = "";
                msg.style.display = "";
            }

            this.messageElement.textContent = errorMessages;

            if (!valid) return;

            this.showSuccessModal();
        });
    },
};

cardDetailsForm.init();
