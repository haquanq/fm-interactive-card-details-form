import { requestAnimationFrameAfter } from "./requestAnimationFrameAfter";

export const jumpInAnimate = (element: HTMLElement, textContent?: string) => {
    requestAnimationFrame(() => {
        if (textContent) element.textContent = textContent;
        element.style.transform = "translateY(6px) scale(1.3)";

        requestAnimationFrame(() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches === false) {
                element.style.transition = "transform 200ms ease";
            }
            element.style.transform = "translateY(0) scale(1)";

            requestAnimationFrameAfter(200, () => {
                element.removeAttribute("style");
            });
        });
    });
};
