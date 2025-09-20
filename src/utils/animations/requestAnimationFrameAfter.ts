export const requestAnimationFrameAfter = (durationMS: number, callback: () => void) => {
    let startTime: number | null = null;
    let requestingFrameId = -1;

    const recursiveCallback = (currentTime: number) => {
        if (startTime === null) {
            startTime = currentTime;
        }

        if (currentTime - startTime >= durationMS) {
            callback();
        } else {
            requestAnimationFrame(recursiveCallback);
        }
    };

    requestAnimationFrame(recursiveCallback);

    return () => {
        cancelAnimationFrame(requestingFrameId);
    };
};
