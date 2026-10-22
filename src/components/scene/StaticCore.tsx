export function StaticCore() {
  return (
    <svg className="core-poster" viewBox="0 0 620 620" role="img" aria-label="Abstract segmented blue and silver intelligence core illustration">
      <defs>
        <radialGradient id="core-halo"><stop stopColor="#60b7ff" stopOpacity=".2"/><stop offset="1" stopColor="#60b7ff" stopOpacity="0"/></radialGradient>
        <linearGradient id="core-silver" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#fff"/><stop offset=".48" stopColor="#bec9d7"/><stop offset="1" stopColor="#69798c"/></linearGradient>
        <linearGradient id="core-blue" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#77c8ff"/><stop offset=".45" stopColor="#297ef2"/><stop offset="1" stopColor="#073f9f"/></linearGradient>
        <filter id="core-shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="12"/><feOffset dy="13"/><feComponentTransfer><feFuncA type="linear" slope=".26"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="310" cy="304" r="272" fill="url(#core-halo)"/>
      <g fill="none" stroke="#73b8ff" strokeOpacity=".3" strokeWidth="1.4">
        <path d="M310 310 116 168M310 310 501 175M310 310 522 439M310 310 118 455"/>
        <circle cx="116" cy="168" r="4" fill="#9bcaff"/><circle cx="501" cy="175" r="4" fill="#9bcaff"/><circle cx="522" cy="439" r="4" fill="#9bcaff"/><circle cx="118" cy="455" r="4" fill="#9bcaff"/>
      </g>
      <g filter="url(#core-shadow)" transform="translate(310 306) rotate(-20)">
        <path d="M0-188a188 188 0 0 1 154 80l-49 37a128 128 0 0 0-105-55z" fill="url(#core-silver)"/>
        <path d="M154-108a188 188 0 0 1 16 167l-58-21a128 128 0 0 0-11-113z" fill="url(#core-blue)"/>
        <path d="M170 59a188 188 0 0 1-119 127l-18-59a128 128 0 0 0 79-89z" fill="url(#core-silver)"/>
        <path d="M51 186a188 188 0 0 1-169-24l37-48a128 128 0 0 0 114 13z" fill="url(#core-blue)"/>
        <path d="M-118 162a188 188 0 0 1-68-156l60 1a128 128 0 0 0 46 106z" fill="url(#core-silver)"/>
        <path d="M-186 6A188 188 0 0 1-103-157l34 49a128 128 0 0 0-35 115z" fill="url(#core-blue)"/>
        <path d="M-103-157A188 188 0 0 1 0-188v62a128 128 0 0 0-69 18z" fill="url(#core-silver)"/>
        <circle r="64" fill="#081629" stroke="#80c7ff" strokeOpacity=".7" strokeWidth="2"/>
        <circle r="47" fill="url(#core-blue)"/>
        <circle cx="-12" cy="-13" r="19" fill="#d5f2ff" fillOpacity=".78"/>
        <circle r="28" fill="none" stroke="#d9f2ff" strokeOpacity=".45"/>
      </g>
      <g fill="#b9ddff"><circle cx="116" cy="168" r="8"/><circle cx="501" cy="175" r="8"/><circle cx="522" cy="439" r="8"/><circle cx="118" cy="455" r="8"/></g>
    </svg>
  );
}
