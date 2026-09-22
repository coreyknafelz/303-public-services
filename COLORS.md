# COLORS.md — ClearCase Color Tokens

Five custom color families for the ClearCase design system. All scales follow the familiar 50–950 convention and are implemented as CSS custom properties in `src/assets/styles/tokens.css`.

---

## CSS Token Usage

```css
:root {
  --shadow-grey-50: #f2eff6;
  --shadow-grey-600: #604a82;
  --color-primary: var(--shadow-grey-600);
  --color-focus-ring: var(--shadow-grey-500);
}
```

Components should use semantic tokens such as `--color-primary`, `--color-border`, and `--color-status-action` rather than hardcoding palette values. The complete token definitions live in `src/assets/styles/tokens.css`.

For reference, the palette families are:

```css
/* Palette names represented in tokens.css */
--shadow-grey-50 ... --shadow-grey-950;
--vintage-grape-50 ... --vintage-grape-950;
--mauve-shadow-50 ... --mauve-shadow-950;
--faded-copper-50 ... --faded-copper-950;
--dusty-taupe-50 ... --dusty-taupe-950;
```

The original palette values remain documented below for design reference.

<!--
      colors: {
        'shadow-grey': {
          50:  '#f2eff6',
          100: '#e4dfec',
          200: '#c9beda',
          300: '#ae9ec7',
          400: '#937db5',
          500: '#795da2',
          600: '#604a82',
          700: '#483861',
          800: '#302541',
          900: '#181320',
          950: '#110d17',
        },
        'vintage-grape': {
          50:  '#f2f0f5',
          100: '#e5e0eb',
          200: '#ccc2d6',
          300: '#b2a3c2',
          400: '#9885ad',
          500: '#7f6699',
          600: '#65527a',
          700: '#4c3d5c',
          800: '#33293d',
          900: '#19141f',
          950: '#120e15',
        },
        'mauve-shadow': {
          50:  '#f5f0f2',
          100: '#eae1e5',
          200: '#d6c2cb',
          300: '#c1a4b1',
          400: '#ac8697',
          500: '#98677d',
          600: '#795364',
          700: '#5b3e4b',
          800: '#3d2932',
          900: '#1e1519',
          950: '#150e12',
        },
        'faded-copper': {
          50:  '#f5f1ef',
          100: '#ece4df',
          200: '#d8c8c0',
          300: '#c5ada0',
          400: '#b19281',
          500: '#9e7661',
          600: '#7e5f4e',
          700: '#5f473a',
          800: '#3f2f27',
          900: '#201813',
          950: '#16110e',
        },
        'dusty-taupe': {
          50:  '#f5f1ef',
          100: '#ece3df',
          200: '#d8c6c0',
          300: '#c5aaa0',
          400: '#b18e81',
          500: '#9e7161',
          600: '#7e5b4e',
          700: '#5f443a',
          800: '#3f2d27',
          900: '#201713',
          950: '#16100e',
        },
      },
    },
  },
}
```
-->

---

## Palette Reference

### Shadow Grey
A cool violet-purple with blue undertones. The most chromatic family in the palette — suited for primary actions, focus rings, and brand moments.

| Token | Hex | Usage |
|---|---|---|
| `shadow-grey-50`  | `#f2eff6` | Page backgrounds, subtle tints |
| `shadow-grey-100` | `#e4dfec` | Card fills, hover states |
| `shadow-grey-200` | `#c9beda` | Borders, dividers |
| `shadow-grey-300` | `#ae9ec7` | Placeholder text, disabled states |
| `shadow-grey-400` | `#937db5` | Secondary labels, muted icons |
| `shadow-grey-500` | `#795da2` | Primary interactive (links, toggles) |
| `shadow-grey-600` | `#604a82` | Primary buttons, active states |
| `shadow-grey-700` | `#483861` | Hover on primary buttons |
| `shadow-grey-800` | `#302541` | High-contrast text on light |
| `shadow-grey-900` | `#181320` | Near-black headings |
| `shadow-grey-950` | `#110d17` | Maximum contrast, dark mode base |

---

### Vintage Grape
A warmer, slightly desaturated purple. Closely related to Shadow Grey but with more red in the midtones. Works well for secondary UI elements and informational callouts.

| Token | Hex | Usage |
|---|---|---|
| `vintage-grape-50`  | `#f2f0f5` | Secondary surface backgrounds |
| `vintage-grape-100` | `#e5e0eb` | Subtle info callout backgrounds |
| `vintage-grape-200` | `#ccc2d6` | Info callout borders |
| `vintage-grape-300` | `#b2a3c2` | Icon fills, badge outlines |
| `vintage-grape-400` | `#9885ad` | Secondary action text |
| `vintage-grape-500` | `#7f6699` | Secondary buttons, tags |
| `vintage-grape-600` | `#65527a` | Pressed secondary states |
| `vintage-grape-700` | `#4c3d5c` | Rich label text |
| `vintage-grape-800` | `#33293d` | Dark surface text |
| `vintage-grape-900` | `#19141f` | Deep background panels |
| `vintage-grape-950` | `#120e15` | Maximum dark |

---

### Mauve Shadow
A red-shifted grey-pink. Lower chroma than the purples — functions as a neutral that still reads as part of the family. Good for status surfaces that need warmth without urgency.

| Token | Hex | Usage |
|---|---|---|
| `mauve-shadow-50`  | `#f5f0f2` | Warm neutral backgrounds |
| `mauve-shadow-100` | `#eae1e5` | Card fills, input backgrounds |
| `mauve-shadow-200` | `#d6c2cb` | Borders on warm surfaces |
| `mauve-shadow-300` | `#c1a4b1` | Muted decorative elements |
| `mauve-shadow-400` | `#ac8697` | Secondary icon fills |
| `mauve-shadow-500` | `#98677d` | Tertiary interactive elements |
| `mauve-shadow-600` | `#795364` | On-hold status color |
| `mauve-shadow-700` | `#5b3e4b` | On-hold status: hover |
| `mauve-shadow-800` | `#3d2932` | Deep warm surface |
| `mauve-shadow-900` | `#1e1519` | Near-black warm |
| `mauve-shadow-950` | `#150e12` | Maximum dark warm |

---

### Faded Copper
A desaturated terracotta-brown. The warmest family — bridges the purple-cool families toward an earthy neutral. Useful for document states, in-progress indicators, and warm accents.

| Token | Hex | Usage |
|---|---|---|
| `faded-copper-50`  | `#f5f1ef` | Document upload backgrounds |
| `faded-copper-100` | `#ece4df` | Warm card fills |
| `faded-copper-200` | `#d8c8c0` | Warm borders |
| `faded-copper-300` | `#c5ada0` | Warm placeholder fills |
| `faded-copper-400` | `#b19281` | Warm muted text |
| `faded-copper-500` | `#9e7661` | In-progress/uploading accent |
| `faded-copper-600` | `#7e5f4e` | Warm action color (subtle) |
| `faded-copper-700` | `#5f473a` | Dark warm text |
| `faded-copper-800` | `#3f2f27` | Deep earthy surface |
| `faded-copper-900` | `#201813` | Near-black earthy |
| `faded-copper-950` | `#16110e` | Maximum dark earthy |

---

### Dusty Taupe
Near-identical in structure to Faded Copper, but with a slightly cooler, greyer midtone. Useful as a true neutral that still belongs to the palette — footers, borders, disabled states, metadata text.

| Token | Hex | Usage |
|---|---|---|
| `dusty-taupe-50`  | `#f5f1ef` | Neutral page fills |
| `dusty-taupe-100` | `#ece3df` | Neutral card fills |
| `dusty-taupe-200` | `#d8c6c0` | Subtle neutral borders |
| `dusty-taupe-300` | `#c5aaa0` | Disabled element fills |
| `dusty-taupe-400` | `#b18e81` | Disabled text |
| `dusty-taupe-500` | `#9e7161` | Metadata, captions |
| `dusty-taupe-600` | `#7e5b4e` | Footer text, secondary labels |
| `dusty-taupe-700` | `#5f443a` | Body text on pale backgrounds |
| `dusty-taupe-800` | `#3f2d27` | Strong neutral text |
| `dusty-taupe-900` | `#201713` | Near-black neutral |
| `dusty-taupe-950` | `#16100e` | Maximum dark neutral |

---

## Semantic Assignments

Recommended mappings from palette families to ClearCase UI roles. Adjust per component as needed — these are starting points, not constraints.

| Role | Light mode token | Dark mode token |
|---|---|---|
| Page background | `shadow-grey-50` | `shadow-grey-950` |
| Card / surface | `white` / `shadow-grey-50` | `shadow-grey-900` |
| Primary border | `shadow-grey-200` | `shadow-grey-800` |
| Body text | `shadow-grey-900` | `shadow-grey-50` |
| Secondary text | `dusty-taupe-600` | `dusty-taupe-400` |
| Muted / caption | `dusty-taupe-400` | `dusty-taupe-600` |
| Primary action | `shadow-grey-600` | `shadow-grey-400` |
| Primary action hover | `shadow-grey-700` | `shadow-grey-300` |
| Secondary action | `vintage-grape-500` | `vintage-grape-400` |
| Focus ring | `shadow-grey-500` | `shadow-grey-400` |
| Status: Action Needed | `faded-copper-600` | `faded-copper-400` |
| Status: Action Needed bg | `faded-copper-50` | `faded-copper-900` |
| Status: On Track | `--color-status-track` (`--teal-600`) | `--color-status-track` (`--teal-400`) |
| Status: On Hold | `mauve-shadow-600` | `mauve-shadow-400` |
| Status: On Hold bg | `mauve-shadow-50` | `mauve-shadow-900` |
| Upload in progress | `faded-copper-500` | `faded-copper-400` |

---

## Notes

- **Faded Copper vs Dusty Taupe:** These two families share the same 50 value (`#f5f1ef`) and diverge subtly in the mid-range. Faded Copper reads warmer and browner; Dusty Taupe reads cooler and greyer. Use Faded Copper for interactive warm states (upload progress, in-progress indicators) and Dusty Taupe for static neutral roles (metadata, footers, disabled).
- **Status: On Track** uses the supplemental `--teal-*` tokens in `src/assets/styles/tokens.css`; the source palette remains warm-to-neutral.
- **Accessibility:** All text pairings should be verified against WCAG AA (4.5:1 for body, 3:1 for large text). The 600–900 range on any family will pass on white; 400–500 values may not — test before using as text colors.
- **Dark mode:** All 950 values are dark enough to serve as dark mode page backgrounds. The palette is intentionally warm-dark (no pure `#000000`), which reads better on OLED screens and aligns with the ClearCase tone.

---

*Last updated: September 2026*
