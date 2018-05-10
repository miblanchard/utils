#!/bin/bash
# shellcheck disable=SC2016

# Debug Mode
# set -x

# Requires that you have installed Android Studio

# add this to your bash/zsh profile (or wherever you choose to install it)
# Android Studio lines
# export ANDROID_HOME=$HOME/Library/Android/sdk

main()
{
    ADB="$ANDROID_HOME/platform-tools/adb"
    EMULATOR="$ANDROID_HOME/tools/emulator"
    AVD=$($EMULATOR -list-avds | head -n 1)
    if [ -z "$AVD" ]; then
        echo "No Android Virtual Device configured, please follow the steps to setup a device: https://developer.android.com/studio/run/managing-avds.html" 1>&2
        exit 126;
    fi
    devices=$($ADB devices | wc -l)
    if [ "$devices" -lt 3 ]; then
        echo "Booting Android Emulator ${AVD}..."
        "$EMULATOR" @"$AVD" -netdelay none -no-boot-anim -netspeed full -timezone America/Los_Angeles > /dev/null 2>&1 &
        "$ADB" wait-for-device shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done;'
    fi
}

main
