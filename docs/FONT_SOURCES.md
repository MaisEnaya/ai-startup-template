# Font sources

Self-hosted fonts and licenses are in `public/fonts/`.

| Family | Role | Files / weights | Upstream and license |
|---|---|---|---|
| League Spartan | Latin display | Variable WOFF2 (one file, 100–900 axis) | https://github.com/theleagueof/league-spartan · SIL OFL 1.1 · 43,512 bytes |
| Junction | Latin body | Regular 400 and Bold 700 OTF | https://github.com/theleagueof/junction · SIL OFL 1.1 · 24,980 / 26,868 bytes |
| Noto Sans Arabic | Arabic locale | Arabic variable WOFF2 subset, 100–900 | https://github.com/notofonts/arabic via `@fontsource-variable/noto-sans-arabic` · SIL OFL 1.1 · see installed package for exact version |

English loads the two League faces. The Arabic font is locally bundled via Next.js `next/font/local`, uses Arabic shaping, and is selected only when document direction is RTL. The Latin League families do not claim Arabic glyph coverage. Preload Arabic only when needed; it is configured with `preload: false`.

Preserve copyright and OFL notices. Junction has Reserved Font Name `Junction`: do not rename any modified font to that name. No font files were converted or subset manually.
