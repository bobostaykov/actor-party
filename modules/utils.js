/**
 * File with global helper functions
 */

import i18n from "i18n";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import Toast from "react-native-toast-message";
import {
  ANIMATION_DURATION,
  TMDB_ARTIST_PAGE_URL,
  TMDB_MOVIE_PAGE_URL,
} from "../modules/constants";

export const platformAndroid = Platform.OS === "android";
export const platformIOS = Platform.OS === "ios";

/**
 * LayoutAnimation automatically animates a transformation on screen
 */
let experimentalSet = false;
export const autoAnimate = (duration = ANIMATION_DURATION) => {
  // in order for LayoutAnimation to work on Android
  if (
    platformAndroid &&
    UIManager.setLayoutAnimationEnabledExperimental &&
    !experimentalSet
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
    experimentalSet = true;
  }

  LayoutAnimation.configureNext({
    ...LayoutAnimation.Presets.easeInEaseOut,
    duration,
  });
};

/**
 * Opens the TMDB profile page of the given movie or artist
 */
export const openMovieOrArtistPage = async (id, isArtist = false) => {
  if (await InAppBrowser.isAvailable()) {
    InAppBrowser.open(
      (isArtist ? TMDB_ARTIST_PAGE_URL : TMDB_MOVIE_PAGE_URL) + id
    )
      .then((result) => {
        if (!result) {
          Toast.show({ text2: i18n.t("errors.web_page") });
        }
      })
      .catch(() => Toast.show({ text2: i18n.t("errors.web_page") }));
  }
};

export const fetchFromTmdb = (url) => {
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + tmdbAccessToken,
    },
  });
};
