/* @flow */
/**
* Include this HOC at the top of your Application
* add this to your global styles, however you manage them
* ":focus:not([data-focus-ring])": { outlineWidth: 0 }
**/

import * as React from "react";

// utils
import {initializeFocusRing, teardownFocusRing} from "./focusRing.js";

const withFocusRing = (Component: *) => {
    class FocusRing extends React.PureComponent {
        componentDidMount() {
            initializeFocusRing();
        }

        componentWillUnmount() {
            teardownFocusRing();
        }

        render() {
            return <Component />;
        }
    }

    return FocusRing;
};

export {withFocusRing};
