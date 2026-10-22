# Component reuse ledger

This project uses small, focused open-source dependencies; no remote demo site is embedded.

| Requirement | Reused implementation/source | License | Use and modifications |
|---|---|---|---|
| React framework and routed pages | [Next.js](https://github.com/vercel/next.js), App Router; package lock records installed version | MIT | Static English and Arabic routes; custom editorial composition. |
| Typed UI and rendering | [React](https://github.com/facebook/react) and TypeScript | MIT | Accessible semantic HTML, client-side locale/settings and canvas boundary. |
| In-view and reduced-motion effects | [Motion for React](https://github.com/motiondivision/motion) | MIT | `whileInView`, `useScroll`, `useReducedMotion`; one shared motion system. |
| 3D scene | [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | MIT | Single canvas scene with custom intelligence-core geometry and document scroll state. |
| Scene utilities | [Drei](https://github.com/pmndrs/drei) `Environment`, `Float`, `Line`, `PerformanceMonitor` | MIT | Procedural studio lighting, idle floating, 3D connectors and DPR quality adjustment. |
| Configuration validation | [Zod](https://github.com/colinhacks/zod) | MIT | Validates URL/config options; no executable customer-supplied code. |
| Icons | [Lucide](https://github.com/lucide-icons/lucide) | ISC | Small, inline UI icons. |
| Display font | [League Spartan](https://github.com/theleagueof/league-spartan) | SIL OFL 1.1 | Self-hosted variable WOFF2; local OFL notice. |
| Body font | [Junction](https://github.com/theleagueof/junction) | SIL OFL 1.1 | Self-hosted regular and bold OTF; local OFL notice. |
| Arabic font | [Noto Sans Arabic](https://github.com/notofonts/arabic), delivered by `@fontsource-variable/noto-sans-arabic` | SIL OFL 1.1 | Next.js local font embedding; subset for Arabic script. |

Tailark and shadcn/ui were reviewed as candidates but not copied: the custom page needed a unified, RTL-aware layout, so installing ready-made blocks/primitives would add dependencies without meaningful reuse. Magic UI / Paper shader blocks were not used. The 3D geometry, procedural poster, layout, service/work cards, trust panel and disclosure list are project-specific components.

Package versions are pinned by `package-lock.json`; inspect it for the exact versions used. Review upstream notices before redistributing changes.
