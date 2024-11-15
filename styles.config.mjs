export const color = {
  black: "#000000",
  white: "#ffffff",
  main: "#545454", //dark grey
  secondary: "#dddcc7", // beige
  accent: "#ffffff", // white
  secondaryAccent: "#b3822a", // burnt orange
  red: "#ff0000",
  blue: "#1b52ee",
  lightGrey: "#eeede3",
};

export const breakpoints = {
  mobile: "360px",
  mobileMd: "480px",
  mobileLg: "550px",
  tablet: "640px",
  tabletMd: "768px",
  tabletLg: "960px",
  desktop: "1200px",
  desktopMd: "1440px",
  desktopLg: "1600px",
  desktopHD: "1920px",
  desktop4k: "2200px",
};

export const spacing = {
  none: "0",
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  std: "16px",
  md: "24px",
  lg: "32px",
  xl: "40px",
  xxl: "48px",
  xxxl: "56px",
  xxxxl: "64px",
  xl5: "80px",
  xl6: "96px",
  xl7: "128px",
};

export const fontFamily = {
  title: "'Geist Mono', monospace",
  body: "'Geist Mono', monospace",
  accent: "'Geist Sans', sans-serif",
};

export const fontSize = {
  size36: "36px",
  size32: "32px",
  size22: "22px",
  size18: "18px",
  size16: "16px",
  size14: "14px",
  size12: "12px",
  size10: "10px",
};

export const lineHeight = {
  size36: "36px",
  size32: "32px",
  size22: "22px",
  size18: "18px",
  size16: "16px",
  size14: "14px",
  size12: "12px",
  size10: "10px",
};

export const fontWeight = {
  thin: "100",
  extraLight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
};

export const transition = {
  fast: "250ms ease-in-out",
  medium: "500ms ease-in-out",
  slow: "1000ms ease-in-out",
};

export const boxShadow = {
  light: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
};

export const fontFamilies = {
  geistMono: {
    "font-family": fontFamily.geistMono,
  },
  geistSans: {
    "font-family": fontFamily.geistSans,
  },
};

export const typography = {
  h1: {
    "font-size": fontSize.size36,
    "line-height": lineHeight.size36,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.title,
  },
  h2: {
    "font-size": fontSize.size32,
    "line-height": lineHeight.size32,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.title,
  },
  h3: {
    "font-size": fontSize.size22,
    "line-height": lineHeight.size22,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.title,
  },
  h4: {
    "font-size": fontSize.size18,
    "line-height": lineHeight.size18,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.title,
  },
  h5: {
    "font-size": fontSize.size16,
    "line-height": lineHeight.size16,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.title,
  },
  h6: {
    "font-size": fontSize.size14,
    "line-height": lineHeight.size14,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.title,
  },
  body1: {
    "font-size": fontSize.size22,
    "line-height": lineHeight.size22,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.body,
  },
  body2: {
    "font-size": fontSize.size18,
    "line-height": lineHeight.size22,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.body,
  },
  body3: {
    "font-size": fontSize.size16,
    "line-height": lineHeight.size22,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.body,
  },
  body4: {
    "font-size": fontSize.size14,
    "line-height": lineHeight.size18,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.body,
  },
  body5: {
    "font-size": fontSize.size12,
    "line-height": lineHeight.size16,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.body,
  },
  body6: {
    "font-size": fontSize.size10,
    "line-height": lineHeight.size14,
    "font-weight": fontWeight.normal,
    "font-family": fontFamily.body,
  },
  thin: {
    "font-weight": fontWeight.thin,
  },
  extraLight: {
    "font-weight": fontWeight.extraLight,
  },
  light: {
    "font-weight": fontWeight.light,
  },
  normal: {
    "font-weight": fontWeight.normal,
  },
  medium: {
    "font-weight": fontWeight.medium,
  },
  semiBold: {
    "font-weight": fontWeight.semiBold,
  },
  bold: {
    "font-weight": fontWeight.bold,
  },
  extraBold: {
    "font-weight": fontWeight.extraBold,
  },
  black: {
    "font-weight": fontWeight.black,
  },
};

const STYLES = {
  variables: {
    color,
    breakpoints,
    spacing,
    fontSize,
    lineHeight,
    transition,
    fontFamily,
    boxShadow,
  },
  classNames: {
    typography,
    fontFamilies,
  },
};

export default STYLES;
