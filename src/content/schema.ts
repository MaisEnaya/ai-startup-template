import { z } from "zod";

const safeHref = z.string().refine((value) => {
  if (value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["https:", "http:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, "Use a valid web, email, or in-page URL");

export const templateConfigSchema = z.object({
  version: z.literal("1.0.0"),
  brand: z.object({
    name: z.string().min(1).max(80),
    logo: safeHref,
    colors: z.object({ ink: z.string(), paper: z.string(), blue: z.string(), mint: z.string() }),
    typography: z.object({ display: z.string(), body: z.string(), arabic: z.string() }),
  }),
  destinations: z.record(z.string(), safeHref),
  scene: z.object({
    enabled: z.boolean(),
    mode: z.enum(["segmented-core", "poster", "off"]),
    motionIntensity: z.number().min(0).max(1),
    quality: z.enum(["auto", "low", "high"]),
    maxDpr: z.number().min(0.5).max(2),
  }),
});

export type TemplateConfig = z.infer<typeof templateConfigSchema>;
