/* @flow */
import {canUseDOM} from "exenv";

/**
 * @method checkIsAdBlockEnabled
 */
export const checkIsAdBlockEnabled = (): Promise<*> => {
    return new Promise((resolve: Function): * => {
        let isAdBlockEnabled = false;

        if (canUseDOM) {
            const testAd = document.createElement("div");
            testAd.innerHTML = "&nbsp;";
            testAd.style.position = "absolute";
            testAd.style.height = "50px";
            testAd.style.left = "-100px";
            testAd.style.top = "-100px";
            testAd.className = "adsbox";
            document && document.body && document.body.appendChild(testAd);
            window.requestIdleCallback(() => {
                if (testAd.offsetHeight === 0) {
                    isAdBlockEnabled = true;
                }
                testAd.style.display = "none";
                resolve(isAdBlockEnabled);
            });
        } else {
            resolve(isAdBlockEnabled);
        }

        return;
    });
};

class AdBlockChecker {
    constructor() {
        this.isAdBlockEnabled = null;
    }

    checkAdBlock = (): Promise<*> => {
        return new Promise((resolve: (...args: Array<*>) => *) => {
            if (this.isAdBlockEnabled) {
                resolve(this.isAdBlockEnabled);
            }

            return checkIsAdBlockEnabled()
                .then((isAdBlockEnabled: boolean) => {
                    this.isAdBlockEnabled = isAdBlockEnabled;

                    resolve(isAdBlockEnabled);
                })
                .catch((error: Error) => {
                    console.error("Error checking for adBlocker", error);
                });
        });
    };

    isAdBlockEnabled: ?boolean;
}

export default new AdBlockChecker();
