/* @flow */
export const desktopWidth = 992;
export const largeDesktopWidth = 1200;
export const mobileWidth = 480;
export const mobileOnlyWidth = 300;
export const tabletWidth = 768;
export const tabletLandscapeWidth = 1024;

export const desktop = `@media (min-width: ${desktopWidth}px)`;
export const handheldLandscape = `@media only screen and (orientation: landscape)`;
export const largeDesktop = `@media (min-width: ${largeDesktopWidth}px)`;
export const mobile = `@media (min-width: ${mobileWidth}px)`;
export const mobileOnly = `@media (max-width:  ${mobileWidth}px)`;
export const tablet = `@media (min-width: ${tabletWidth}px)`;
export const tabletLandscape = `@media (min-width: ${tabletLandscapeWidth}px)`;
export const IEMobile =
    "@media (-ms-high-contrast: active), (-ms-high-contrast: none)";
export const IETablet = `@media (min-width: ${tabletWidth}px) and (-ms-high-contrast: active), (min-width: ${tabletWidth}px) and (-ms-high-contrast: none)`;
export const IEDesktop = `@media (min-width: ${desktopWidth}px) and (-ms-high-contrast: active), (min-width: ${desktopWidth}px) and (-ms-high-contrast: none)`;
