/* eslint-disable no-undef */
/**
 * App Config File
 */
const AppConfig = {
  //apiBaseUrl: 'http://03da0bbe.ngrok.io/api/v1',
   //apiBaseUrl: "http://603c0679.ngrok.io/api/v1",
  apiBaseUrl: "http://core-dev.signingdesk.com/api/v1", //Server
  // apiBaseUrl: "http://bd6e4651.ngrok.io/api/v1", //Server
  // apiDataBaseUrl: "http://core-dev.signingdesk.com/",
  // apiBaseUrl: "http://core-dev.signingdesk.com/api/v1/data/85e39610-6532-4fd6-b245-ec8d22f6374e/f1f57b06-73ea-4e7b-9973-719c6063b7ac/c93e2c3a-927e-4b98-a0ae-f09bf2e4f64d/sample.pdf", //Server
  //apiBaseUrl: "http://28e45926.ngrok.io/api/v1", //Saqlain System
  appLogo: require("Assets/img/site-logo.png"), // App Logo
  brandName: "SigningDesk", // Brand Name
  navCollapsed: false, // Sidebar collapse
  darkMode: false, // Dark Mode
  boxLayout: false, // Box Layout
  rtlLayout: false, // RTL Layout
  miniSidebar: false, // Mini Sidebar
  enableSidebarBackgroundImage: true, // Enable Sidebar Background Image
  sidebarImage: require("Assets/img/sidebar-4.jpg"), // Select sidebar image
  isDarkSidenav: true, // Set true to dark sidebar
  enableThemeOptions: true, // Enable Theme Options
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "en"
  },
  enableUserTour: process.env.NODE_ENV === "production" ? true : false, // Enable / Disable User Tour
  copyRightText: "SigningDesk © 2019 All Rights Reserved.", // Copy Right Text
  // light theme colors
  themeColors: {
    primary: "#5D92F4",
    secondary: "#677080",
    success: "#00D014",
    danger: "#FF3739",
    warning: "#FFB70F",
    info: "#00D0BD",
    dark: "#464D69",
    default: "#FAFAFA",
    greyLighten: "#A5A7B2",
    grey: "#677080",
    white: "#FFFFFF",
    purple: "#896BD6",
    yellow: "#D46B08"
  },
  // dark theme colors
  darkThemeColors: {
    darkBgColor: "#424242"
  }
};

export default AppConfig;
