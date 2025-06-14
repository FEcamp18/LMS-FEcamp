import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        inknut: ["Inknut Antiqua", ...fontFamily.sans],
        prompt: ["Prompt", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "light-gray": "#B7A99B",
        "light-brown": "#A27757",
        "dark-gray": "#86796E",
        "dark-brown": "#3D322A",
        cream: "#E3DACC",
        brown: "#584234",
        success: "#92CE86",
        error: "#F98181",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        }
      },
      keyframes: {
          'x-move': {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(40px)' },
          },
          'y-move': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(40px)' },
          },
        },
        animation: {
          'x-move': 'x-move 5s ease-in-out infinite alternate',
          'x-move-reverse': 'x-move 5s ease-in-out infinite alternate',
          'y-move': 'y-move 5s ease-in-out infinite alternate',
        },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config
