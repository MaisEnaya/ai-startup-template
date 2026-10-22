"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReducedMotion, useScroll, motion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Command, Globe2, Menu, Plus, ShieldCheck, Sparkles, X } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode, useEffect, useRef, useState } from "react";
import { site, type Locale } from "@/content/site";
import { templateConfigSchema } from "@/content/schema";

const CoreScene = dynamic(() => import("@/components/scene/CoreScene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn("3D scene fallback activated", error.message, info.componentStack); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function TemplateExperience({ initialLocale = "en" }: { initialLocale?: Locale }) {
  const router = useRouter();
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
  const shouldReduceMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accent, setAccent] = useState<string>(site.brand.colors.blue);
  const [sceneEnabled, setSceneEnabled] = useState<boolean>(site.scene.enabled);
  const t = site.content[locale];
  const rtl = locale === "ar";
  const DirectionArrow = rtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [locale, rtl]);

  useEffect(() => {
    const config = templateConfigSchema.safeParse(site);
    if (!config.success) console.error("Template configuration is invalid", config.error.flatten());
  }, []);

  function switchLocale() {
    const nextLocale: Locale = rtl ? "en" : "ar";
    setLocale(nextLocale);
    router.push(nextLocale === "ar" ? "/ar" : "/");
  }

  const destinations = {
    quote: rtl ? site.destinations.arabicQuote : site.destinations.quote,
    contact: rtl ? site.destinations.arabicContact : site.destinations.contact,
    services: rtl ? "https://www.begeniustech.sa/ar/services" : site.destinations.services,
    work: rtl ? "https://www.begeniustech.sa/ar/portfolio" : site.destinations.work,
    trust: rtl ? "https://www.begeniustech.sa/ar/trust" : site.destinations.trust,
    about: rtl ? "https://www.begeniustech.sa/ar/about" : site.destinations.about,
    agentic: rtl ? "https://www.begeniustech.sa/ar/services/agentic-ai-solutions" : site.destinations.agentic,
    enterpriseAi: rtl ? "https://www.begeniustech.sa/ar/services/secure-enterprise-ai-systems" : site.destinations.enterpriseAi,
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const sceneFallback = <div className="core-fallback" role="img" aria-label="Abstract segmented intelligence core" />;
  const allowScene = sceneEnabled && !shouldReduceMotion;
  const heroTitle = rtl ? t.heroTitle : <>Build bold digital<br className="desktop-break" /> products with<br className="desktop-break" /> confidence <span className="hero-italic">&amp; impact.</span></>;

  return (
    <main className="site-shell" style={{ "--accent": accent } as React.CSSProperties}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand-lockup" href={site.destinations.home} aria-label={site.brand.name + " home"}><Image src={site.brand.logo} alt="BeGeniusTech" width={148} height={44} priority unoptimized /></a>
        <nav className="desktop-nav" aria-label={rtl ? "التنقل الرئيسي" : "Main navigation"}>{t.navigation.map((item, index) => <a key={item} href={["#capabilities", "#approach", "#work", "#trust"][index]}>{item}</a>)}</nav>
        <div className="header-actions">
          <button className="language-switch" onClick={switchLocale} aria-label={rtl ? "Switch to English" : "التبديل إلى العربية"}><Globe2 size={15} strokeWidth={1.7} /><span>{rtl ? "EN" : "عربي"}</span></button>
          <a className="header-cta" href={destinations.quote}>{t.startProject}<ArrowUpRight size={15} /></a>
          <button className="menu-toggle" aria-label={menuOpen ? t.closeMenu : t.mobileMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label={rtl ? "التنقل الرئيسي" : "Main navigation"}>{t.navigation.map((item, index) => <a key={item} href={["#capabilities", "#approach", "#work", "#trust"][index]} onClick={() => setMenuOpen(false)}>{item}<DirectionArrow size={16} /></a>)}<a className="mobile-nav-cta" href={destinations.quote}>{t.startProject}<ArrowUpRight size={16} /></a></nav>}
      </header>

      <div id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="live-dot" />{t.heroEyebrow}</div><h1 id="hero-title" className="hero-title">{heroTitle}</h1><p className="hero-description">{t.heroBody}</p><div className="hero-actions"><a className="button button-primary" href={destinations.quote}>{t.startProject}<ArrowUpRight size={16} /></a><a className="text-link" href="#work">{t.viewWork}<DirectionArrow size={16} /></a></div></div>
          <div className="hero-art" aria-label={t.orbit}><div className="orbit-label orbit-label-top"><span className="orbit-pip" />{rtl ? "ذكاء متصل" : "CONNECTED INTELLIGENCE"}</div><div className="core-halo" /><div className="core-visual"><SceneBoundary fallback={sceneFallback}>{allowScene ? <CoreScene progress={scrollYProgress} reduced={false} /> : sceneFallback}</SceneBoundary></div><span className="art-index">CORE / 001</span></div>
        </section>

        <section className="story-section" id="capabilities" ref={storyRef} aria-labelledby="story-title">
          <div className="story-sticky">
            <div className="story-intro"><span className="section-index">01 / THE ECOSYSTEM</span><p className="eyebrow">{t.storyEyebrow}</p><h2 id="story-title">{t.storyTitle}</h2><p className="body-copy">{t.storyBody}</p></div>
            <div className="service-list">{t.services.map((service, index) => <a className="service-row" href={index === 3 ? destinations.agentic : destinations.services} key={service.number}><span className="service-number">{service.number}</span><span className="service-copy"><strong>{service.title}</strong><span>{service.body}</span></span><span className="service-tag">{service.label}</span><span className="service-arrow"><ArrowUpRight size={17} /></span></a>)}</div>
            <div className="story-visual" aria-hidden="true"><div className="visual-grid" /><div className="core-visual story-core"><SceneBoundary fallback={sceneFallback}>{allowScene ? <CoreScene progress={scrollYProgress} reduced={false} /> : sceneFallback}</SceneBoundary></div><span className="story-coordinate">24° 42′ 42.8″ N<br />46° 40′ 28.7″ E</span><span className="story-signal"><i />{rtl ? "الأنظمة متصلة" : "SYSTEMS CONNECTED"}</span></div>
          </div>
        </section>

        <section className="ai-section section-pad" id="ai" aria-labelledby="ai-title">
          <div className="ai-art" aria-hidden="true"><div className="diagram-grid" /><div className="diagram-center"><span className="diagram-ring" /><span className="diagram-core"><Sparkles size={22} /></span><span className="diagram-caption">BEGENIUS / AI</span></div><div className="diagram-node node-a"><span className="node-icon">01</span><span>{rtl ? "تحديد الهدف" : "GOAL"}</span></div><div className="diagram-node node-b"><span className="node-icon">02</span><span>{rtl ? "الوصول إلى المعرفة" : "KNOWLEDGE"}</span></div><div className="diagram-node node-c"><span className="node-icon">03</span><span>{rtl ? "المراجعة البشرية" : "HUMAN REVIEW"}</span></div><svg className="beam-lines" viewBox="0 0 600 440" preserveAspectRatio="none"><path d="M108 94 C166 94 206 166 292 214" /><path d="M490 115 C432 115 391 172 309 216" /><path d="M490 357 C418 357 391 268 307 222" /><circle cx="108" cy="94" r="3" /><circle cx="490" cy="115" r="3" /><circle cx="490" cy="357" r="3" /></svg><div className="concept-note"><span className="live-dot" />{t.disclosure}</div></div>
          <div className="ai-copy"><span className="section-index">02 / GOVERNED AI</span><p className="eyebrow">{t.aiEyebrow}</p><h2 id="ai-title">{t.aiTitle}</h2><p className="body-copy">{t.aiBody}</p><div className="ai-links"><a className="text-link" href={destinations.agentic}>{t.agentic}<DirectionArrow size={16} /></a><a className="text-link" href={destinations.enterpriseAi}>{t.enterprise}<DirectionArrow size={16} /></a></div></div>
        </section>

        <section className="approach-section section-pad" id="approach" aria-labelledby="approach-title"><div className="section-heading approach-heading"><div><span className="section-index">03 / DELIVERY MODEL</span><p className="eyebrow">{t.processEyebrow}</p><h2 id="approach-title">{t.processTitle}</h2></div><span className="approach-mark"><Command size={24} strokeWidth={1.2} /></span></div><div className="steps-grid">{t.steps.map((step, index) => <motion.article className="step" key={step.title} initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.07 }}><span className="step-number">0{index + 1}<i /></span><h3>{step.title}</h3><p>{step.body}</p><span className="step-symbol">{index === 0 ? <Globe2 /> : index === 1 ? <Sparkles /> : index === 2 ? <Plus /> : <Check />}</span></motion.article>)}</div></section>

        <section className="work-section section-pad" id="work" aria-labelledby="work-title"><div className="section-heading work-heading"><div><span className="section-index">04 / SELECTED WORK</span><p className="eyebrow">{t.workEyebrow}</p><h2 id="work-title">{t.workTitle}</h2><p className="body-copy work-lead">{t.workLead}</p></div><a className="text-link work-all" href={destinations.work}>{t.allWork}<DirectionArrow size={16} /></a></div><div className="project-grid">{t.projects.map((project, index) => <a className={`project-card project-card-${index + 1}`} href={project.href} target="_blank" rel="noreferrer" key={project.title}><div className="project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 720px) 100vw, 50vw" unoptimized /><span className="project-image-shade" /><span className="project-image-action" aria-hidden="true"><ArrowUpRight /></span><span className="project-count">0{index + 1} / 03</span></div><div className="project-meta"><span>{project.category}</span><span>{t.sourceLabel}<ArrowUpRight size={12} /></span></div><h3>{project.title}</h3><p>{project.client}</p></a>)}</div></section>

        <section className="trust-section section-pad" id="trust" aria-labelledby="trust-title"><div className="trust-top"><span className="section-index">05 / TRUST & QUALITY</span><ShieldCheck size={25} strokeWidth={1.35} /></div><div className="trust-layout"><div><p className="eyebrow">{t.trustEyebrow}</p><h2 id="trust-title">{t.trustTitle}</h2></div><div className="trust-detail"><p className="body-copy">{t.trustBody}</p><ul>{t.trustItems.map(item => <li key={item}><Check size={14} />{item}</li>)}</ul><a className="text-link" href={destinations.trust}>{t.trustLink}<DirectionArrow size={16} /></a></div></div></section>

        <section className="faq-section section-pad" aria-labelledby="faq-title"><div className="faq-heading"><span className="section-index">06 / FAQ</span><p className="eyebrow">{t.faqEyebrow}</p><h2 id="faq-title">{t.faqTitle}</h2></div><div className="faq-list">{t.faqs.map((faq, index) => <details className="faq-item" key={faq.question} open={index === 0}><summary><span className="faq-count">0{index + 1}</span><span>{faq.question}</span><ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}</div></section>

        <section className="closing-section" aria-labelledby="closing-title"><div className="closing-glow" /><div className="closing-orb"><span /><i /><b /></div><div className="closing-copy"><span className="eyebrow">{t.ctaEyebrow}</span><h2 id="closing-title">{t.ctaTitle}</h2><p>{t.ctaBody}</p><a className="button button-light" href={destinations.quote}>{t.contact}<ArrowUpRight size={16} /></a></div><span className="closing-caption">BG / RIYADH — 2026</span></section>
      </div>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a href={rtl ? site.destinations.arabicHome : site.destinations.home} aria-label={site.brand.name + " home"}><Image src={site.brand.logo} alt="BeGeniusTech" width={148} height={44} unoptimized /></a><p>{t.footerLabel}</p></div><div className="footer-column"><span>{rtl ? "استكشف" : "EXPLORE"}</span><a href={destinations.about}>{t.about}</a><a href={destinations.services}>{t.navigation[0]}</a><a href={destinations.work}>{t.navigation[2]}</a><a href={destinations.trust}>{t.navigation[3]}</a></div><div className="footer-column"><span>{rtl ? "تواصل" : "SAY HELLO"}</span><a href={destinations.quote}>{t.startProject}<ArrowUpRight size={13} /></a><a href={destinations.contact}>{t.contact}<ArrowUpRight size={13} /></a><a href={site.destinations.whatsapp} target="_blank" rel="noreferrer">+966 54 893 8610</a><a href={site.destinations.email}>info@begeniustech.com</a></div><div className="footer-note"><span className="live-dot" />{t.location}<span className="footer-note-small">BUILT WITH CLARITY & CARE</span></div></div><div className="footer-bottom"><span>© 2026 BeGeniusTech</span><span>CR NO. 1010987016</span><a href="#main-content">BACK TO TOP <ArrowUpRight size={13} /></a></div></footer>

      <button className="config-trigger" onClick={() => setSettingsOpen(!settingsOpen)} aria-expanded={settingsOpen} aria-label={settingsOpen ? t.closeConfig : t.configToggle}><Command size={15} /><span>{t.configToggle}</span></button>
      {settingsOpen && <aside className="config-panel" aria-label={t.configuration}><div className="config-header"><span>{t.configuration}</span><button onClick={() => setSettingsOpen(false)} aria-label={t.closeConfig}><X size={16} /></button></div><p>{t.configurationNote}</p><label className="config-field"><span>{t.accentLabel}</span><input type="color" value={accent} onChange={event => setAccent(event.target.value)} /></label><div className="config-field"><span>{t.sceneLabel}</span><button className={`config-switch ${sceneEnabled ? "is-on" : ""}`} onClick={() => setSceneEnabled(!sceneEnabled)}>{sceneEnabled ? t.sceneOn : t.sceneOff}<span /></button></div><div className="config-field"><span>{t.localeLabel}</span><button className="config-switch" onClick={switchLocale}>{rtl ? t.arName : t.enName}<ArrowUpRight size={14} /></button></div><small>{t.fallbackNote}</small></aside>}
    </main>
  );
}
