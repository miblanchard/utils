/**
 * inspired by
 * https://github.com/WICG/focus-ring
 *
 * moves the functionality into helper methods instead of immediately invoking on the window per the original
 * uses data-attributes instead of classes
 * Easily used in conjunction with a React HOC that handles your whole app
 */
let hadKeyboardEvent = false;
let keyboardThrottleTimeoutID = 0;
let elWithFocusRing;

const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};

/**
 * Computes whether the given element should automatically trigger the
 * `focus-ring` data attribute being added, i.e. whether it should always match
 * `[data-focus-ring]` when focused.
 * @param {Element} el
 * @return {boolean}
 */
const focusTriggersKeyboardModality = el => {
  const type = el.type;
  const tagName = el.tagName;

  if (tagName === "INPUT" && inputTypesWhitelist[type] && !el.readonly)
    return true;

  if (tagName === "TEXTAREA" && !el.readonly) return true;

  if (el.contentEditable === "true") return true;

  return false;
};

/**
 * Add the `focus-ring` Data Attribute to the given element if it was not added by
 * the author.
 * @param {Element} el
 */
const addFocusRingDataAttribute = el => {
  if (el.hasAttribute("data-focus-ring")) return;
  el.setAttribute("data-focus-ring", "true");
  // Keep a reference to the element to which the data-focus-ring DataAttribute is applied
  // so the focus-ring DataAttribute can be restored to it if the window regains
  // focus after being blurred.
  elWithFocusRing = el;
};

/**
 * Remove the `data-focus-ring` DataAttribute from the given element if it was not
 * originally added by the author.
 * @param {Element} el
 */
const removeFocusRingDataAttribute = el => {
  if (!el.hasAttribute("data-focus-ring")) return;
  el.removeAttribute("data-focus-ring");
};

/**
 * On `keydown`, set `hadKeyboardEvent`, to be removed 100ms later if there
 * are no further keyboard events.  The 100ms throttle handles cases where
 * focus is redirected programmatically after a keyboard event, such as
 * opening a menu or dialog.
 */
const onKeyDown = () => {
  hadKeyboardEvent = true;

  // `activeElement` defaults to document.body if nothing focused,
  // so check the active element is actually focused.
  const activeElement = document.activeElement;
  if (activeElement.tagName === "BODY") return;

  if (keyboardThrottleTimeoutID !== 0) clearTimeout(keyboardThrottleTimeoutID);
  keyboardThrottleTimeoutID = setTimeout(() => {
    hadKeyboardEvent = false;
    keyboardThrottleTimeoutID = 0;
  }, 100);
};

/**
 * On `focus`, add the `focus-ring` Data Attribute to the target if:
 * - a keyboard event happened in the past 100ms, or
 * - the focus event target triggers "keyboard modality" and should always
 *   have a focus ring drawn.
 * @param {Event} e
 */
const onFocus = e => {
  if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target))
    addFocusRingDataAttribute(e.target);
};

/**
 * On `blur`, remove the `focus-ring` DataAttribute from the target.
 * @param {Event} e
 */
const onBlur = e => {
  removeFocusRingDataAttribute(e.target);
};

/**
 * When the window regains focus, restore the focus-ring DataAttribute to the element
 * to which it was previously applied.
 */
const onWindowFocus = () => {
  if (document.activeElement === elWithFocusRing) {
    addFocusRingDataAttribute(elWithFocusRing);
  }
};

export const initializeFocusRing = () => {
  document.body.addEventListener("keydown", onKeyDown, true);
  document.body.addEventListener("blur", onBlur, true);
  document.body.addEventListener("focus", onFocus, true);
  window.addEventListener("focus", onWindowFocus, true);
};

export const teardownFocusRing = () => {
  document.body.removeEventListener("keydown", onKeyDown, true);
  document.body.removeEventListener("blur", onBlur, true);
  document.body.removeEventListener("focus", onFocus, true);
  window.removeEventListener("focus", onWindowFocus, true);
};
