# AI Startup Template — BeGeniusTech

A responsive bilingual (English/Arabic RTL) company website template built with Next.js, React, TypeScript, Motion, and React Three Fiber. It includes a scroll-linked, procedural segmented-core scene, with a static poster when motion is reduced or the scene is switched off.

## Local development

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Validate before publishing:

```sh
npm run typecheck
npm run build
```

## Customize

- Edit company copy, project entries, colors, font tokens, and destinations in `src/content/site.ts`.
- Validate configuration and URL destinations in `src/content/schema.ts`.
- Adjust the core geometry, lighting, pointer response, and reduced-motion behavior in `src/components/scene/CoreScene.tsx`.
- Update the no-WebGL/reduced-motion poster in `src/components/scene/StaticCore.tsx`.
- English is `/`; Arabic is `/ar`. Arabic text uses a locally bundled Noto Sans Arabic variable face and logical CSS properties.
- Replace approved local company media under `public/assets`. Preserve company logo proportions and confirm rights to media before reusing this starter for another client.

## Deployment

This is a standard Next.js app and is deployable to Vercel or any compatible Node.js host. For Vercel, import this directory as the repository root, select Next.js, and use `npm run build`. No secret environment variables are required. Do not configure a public deployment until you have approved the repository visibility and deployment target.

## Source and reuse notes

See [COMPONENT_REUSE.md](COMPONENT_REUSE.md), [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), and [docs/FONT_SOURCES.md](docs/FONT_SOURCES.md). Company statements and project imagery were sourced from the BeGeniusTech website; refer to `content/source-map.json` for the content map.

## Known limitations

- The Epiminds reference loaded its page, but its 3D character module/media was not available for visual inspection in the research browser. The scene here is an original branded abstraction, not a recreation of that character.
- Project imagery is sourced from company-published image paths; some selected project entries reuse one of the images shown on the source site. Confirm each image-to-project association during client content review.
- Public accessibility and performance vary by deployment provider/device. No production Web Vitals or multi-device lab benchmarks are asserted here.
