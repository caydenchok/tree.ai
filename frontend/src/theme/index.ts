import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    primary: '#22C55E',
    secondary: '#0967D2',
    accent: '#F59E0B',
    white: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6',
    },
    black: {
      primary: '#1F2937',
      secondary: '#4B5563',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    green: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
  },
  // Semantic colors
  background: {
    primary: '#F9FAFB',
    secondary: '#F3F4F6',
    accent: '#E5E7EB',
  },
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    accent: '#6B7280',
  },
  accent: {
    primary: '#22C55E',
    secondary: '#0967D2',
    tertiary: '#F59E0B',
  },
  success: {
    primary: '#10B981',
    light: '#D1FAE5',
    dark: '#065F46',
  },
  error: {
    primary: '#EF4444',
    light: '#FEE2E2',
    dark: '#991B1B',
  },
  warning: {
    primary: '#F59E0B',
    light: '#FEF3C7',
    dark: '#92400E',
  },
  info: {
    primary: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1E40AF',
  }
};

const fonts = {
  heading: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    variants: {
      solid: (props: any) => ({
        bg: 'brand.primary',
        color: 'brand.white.primary',
        _hover: {
          bg: 'brand.green.600',
          _disabled: {
            bg: 'brand.primary',
          },
        },
      }),
      outline: (props: any) => ({
        border: '2px solid',
        borderColor: 'brand.primary',
        color: props.colorMode === 'dark' ? 'brand.white.primary' : 'brand.primary',
        _hover: {
          bg: 'brand.primary',
          color: 'brand.white.primary',
        },
      }),
      ghost: {
        color: 'brand.primary',
        _hover: {
          bg: 'brand.green.50',
        },
      },
      link: {
        color: 'brand.primary',
        _hover: {
          textDecoration: 'none',
          color: 'brand.green.600',
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      color: 'text.primary',
      fontWeight: 'bold',
    },
  },
  Text: {
    baseStyle: {
      color: 'text.primary',
    },
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'brand.gray.900' : 'background.primary',
      color: props.colorMode === 'dark' ? 'brand.white.primary' : 'text.primary',
    },
  }),
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  config,
  styles,
});

export default theme;
