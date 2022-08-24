import {
  extendTheme,
  withDefaultColorScheme,
  theme as base,
} from "@chakra-ui/react";
import type { CustomThemeTypings } from "@chakra-ui/react";

const colors: CustomThemeTypings = {
  primary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
};

const components: CustomThemeTypings = {
  Container: {
    baseStyle: {
      maxW: "container.xl",
    },
  },
  Button: {
    baseStyle: {
      borderRadius: "lg",
    },
  },
};

const fonts: CustomThemeTypings = {
  heading: `'Montserrat', ${base.fonts.heading}`,
  body: `'Montserrat', ${base.fonts.body}`,
};

const theme = extendTheme({ colors, components, fonts });

export default theme;
