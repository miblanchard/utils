#!/usr/bin/env node

/* @flow */
const opn = require("opn");

function reactNativeDebugger() {
  return opn("readme.md", {app: "React Native Debugger", wait: false}).catch(
    e => {
      if (e.signal === "SIGINT") {
        return;
      }
      console.log(
        "\x1b[33m%s\x1b[0m",
        `You do not have React Native Debugger installed, please run ./shell/setup.sh or brew update && brew cask install react-native-debugger`
      );
    }
  );
}

exports.reactNativeDebugger = reactNativeDebugger;
