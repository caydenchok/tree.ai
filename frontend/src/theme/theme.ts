import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#f2fbe8',
    100: '#dff7c7',
    200: '#9be16e',  // Main brand color
    300: '#8ed95d',
    400: '#7ac746',
    500: '#63b02f',
    600: '#4c8a24',
    700: '#366519',
    800: '#21400f',
    900: '#0d1b05',
    // Modern theme colors
    primary: '#CDF683',
    secondary: '#181A0F',
    text: '#5F6A77',
    black: '#000000',
    white: {
      primary: '#FFFFFF',
      translucent: '#FFFFFF8C',
    },
    dark: {
      primary: '#22271D',
      secondary: '#181A0F',
    },
    hover: '#D8F89B',
    active: '#B9E364'
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8faf5',
    dark: '#1a202c',
  },
  accent: {
    50: '#ffe5f8',
    100: '#ffb8e8',
    200: '#ff8ad8',
    300: '#ff5cc8',
    400: '#ff2eb8',
    500: '#ff00a8',
    600: '#cc0086',
    700: '#990064',
    800: '#660042',
    900: '#330021',
  },
};

const fonts = {
  heading: "'Montserrat', 'SF Pro Display', system-ui, sans-serif",
  body: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  mono: "'SF Mono', 'JetBrains Mono', monospace",
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'lg',
      _hover: {
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
      transition: 'all 0.2s',
    },
    variants: {
      solid: {
        bg: 'brand.primary',
        color: 'brand.dark.primary',
        _hover: {
          bg: 'brand.hover',
          _disabled: {
            bg: 'brand.primary',
          },
        },
        _active: {
          bg: 'brand.active',
        },
      },
      outline: {
        borderColor: 'brand.primary',
        color: 'brand.primary',
        _hover: {
          bg: 'whiteAlpha.100',
        },
      },
      ghost: {
        color: 'brand.primary',
        _hover: {
          bg: 'whiteAlpha.100',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'lg',
        bg: 'white',
        overflow: 'hidden',
        transition: 'all 0.2s',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
        },
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          borderRadius: 'lg',
          bg: 'whiteAlpha.50',
          _hover: {
            bg: 'whiteAlpha.100',
          },
          _focus: {
            bg: 'whiteAlpha.100',
            borderColor: 'brand.primary',
          },
        },
      },
      outline: {
        field: {
          bg: 'white',
          borderColor: 'brand.text',
          _hover: {
            borderColor: 'brand.primary',
          },
          _focus: {
            borderColor: 'brand.primary',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Tabs: {
    variants: {
      'soft-rounded': {
        tab: {
          color: 'brand.text',
          _selected: {
            color: 'brand.dark.primary',
            bg: 'brand.primary',
          },
        },
      },
      'enclosed-colored': {
        tab: {
          borderRadius: 'lg',
          _selected: {
            bg: 'brand.primary',
            color: 'brand.dark.primary',
          },
        },
      },
    },
  },
};

const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'brand.dark.primary' : 'background.primary',
      color: props.colorMode === 'dark' ? 'brand.white.primary' : 'gray.800',
    },
  }),
};

const layerStyles = {
  gradientBg: {
    bgGradient: 'linear(to-br, brand.900, accent.900)',
  },
  glass: {
    bg: 'whiteAlpha.100',
    backdropFilter: 'blur(10px)',
    borderRadius: 'xl',
    border: '1px solid',
    borderColor: 'whiteAlpha.200',
  },
};

const textStyles = {
  gradient: {
    bgGradient: 'linear(to-r, brand.200, accent.200)',
    bgClip: 'text',
    fontWeight: 'bold',
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
  layerStyles,
  textStyles,
});

export default theme;
