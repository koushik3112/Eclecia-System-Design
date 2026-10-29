import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Menu, X, Sparkles, Palette, Type, Layers3, Component, Download, ExternalLink, Monitor, Smartphone, Printer, Music2, Drama, Camera, Brush, ChevronRight } from "lucide-react";

const palette = [
  { name: "Midnight Navy", role: "Primary · Backgrounds, headers, layouts", hex: "#09151D", text: "#F4EBDD" },
  { name: "Antique Gold", role: "Primary accent · Logo, highlights, CTAs", hex: "#C18B43", text: "#09151D" },
  { name: "Burgundy Red", role: "Secondary · Cultural accents, poster highlights", hex: "#7E202B", text: "#FFFFFF" },
  { name: "Deep Teal", role: "Secondary · Supporting graphics and patterns", hex: "#14504D", text: "#FFFFFF" },
  { name: "Antique Ivory", role: "Tertiary · Text, subtle backgrounds", hex: "#D9C39B", text: "#09151D" },
  { name: "Vermilion", role: "Tertiary · Small highlights and icons", hex: "#C8462D", text: "#FFFFFF" },
];
const complements = [
  { name: "Dark Burnt Brown", hex: "#1D1109", for: "Midnight Navy" },
  { name: "Royal Blue", hex: "#4379C1", for: "Antique Gold" },
  { name: "Muted Turquoise", hex: "#207E73", for: "Burgundy Red" },
  { name: "Deep Maroon", hex: "#501417", for: "Deep Teal" },
  { name: "Dusty Blue", hex: "#9BB1D9", for: "Antique Ivory" },
  { name: "Cyan Teal", hex: "#2DAFC8", for: "Vermilion" },
];
const tokens = `:root {
  --color-midnight: #09151D;
  --color-gold: #C18B43;
  --color-burgundy: #7E202B;
  --color-teal: #14504D;
  --color-ivory: #D9C39B;
  --color-vermilion: #C8462D;
  --color-surface: #12212A;
  --color-surface-raised: #1A2C35;
  --color-text: #F4EBDD;
  --color-border: #39434A;
  --font-display: "Cinzel", serif;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --content-max: 1280px;
}`;
const nav = [
  ["Overview", "overview"], ["Colors", "colors"], ["Typography", "typography"],
  ["Components", "components"], ["Applications", "applications"], ["Tokens", "tokens"]
];

function SectionTitle({ eyebrow, title, desc, id }) {
  return <div id={id} className="mb-7 scroll-mt-28">
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.28em] text-[#C18B43]">{eyebrow}</p>
    <h2 className="font-editorial text-3xl font-medium text-[#F4EBDD] md:text-4xl">{title}</h2>
    {desc && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B6B7B2]">{desc}</p>}
  </div>;
}
function Swatch({ color, copied, onCopy, compact=false }) {
  return <button onClick={() => onCopy(color)} className={`focus-ring group text-left ${compact ? "" : "w-full"}`} title={`Copy ${color}`}>
    <div className={`relative rounded-xl border border-white/10 transition duration-200 group-hover:-translate-y-1 group-hover:border-[#C18B43]/70 ${compact ? "h-16 w-16" : "h-28 w-full"}`} style={{backgroundColor: color}}>
      {copied === color && <span className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"><Check size={13}/></span>}
    </div>
    <div className="mt-2 flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-[#F4EBDD]">{color}</span>
      {copied === color ? <Check size={13} className="text-[#C18B43]"/> : <Copy size={12} className="text-[#7C898B] opacity-0 transition group-hover:opacity-100"/>}
    </div>
  </button>;
}

export default function App() {
  const [copied, setCopied] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("overview");
  const [buttonState, setButtonState] = useState("default");
  const [notice, setNotice] = useState("");

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setNotice(`Copied ${value}`);
      window.setTimeout(() => { setCopied(""); setNotice(""); }, 1600);
    } catch {
      setNotice("Copy is unavailable in this browser. Select and copy the value manually.");
      window.setTimeout(() => setNotice(""), 2500);
    }
  }
  function downloadTokens() {
    const blob = new Blob([tokens], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "eclecia-design-tokens.css"; a.click();
    URL.revokeObjectURL(url);
  }

  return <div className="min-h-screen overflow-hidden bg-[#09151D] text-[#F4EBDD]">
    <header className="sticky top-0 z-50 border-b border-[#C18B43]/20 bg-[#09151D]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-4 md:px-8">
        <a href="#overview" className="focus-ring flex items-center gap-3 rounded-sm" onClick={() => setActive("overview")}>
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[#C18B43]/70 text-[#C18B43]"><Sparkles size={19}/></div>
          <div><div className="font-display text-lg tracking-[.12em] text-[#E8BB70]">ECLECIA</div><div className="text-[9px] uppercase tracking-[.22em] text-[#9CA5A4]">Design system</div></div>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setActive(id)} className={`focus-ring rounded text-xs transition hover:text-[#E8BB70] ${active===id ? "text-[#E8BB70]" : "text-[#B6B7B2]"}`}>{label}</a>)}
        </nav>
        <div className="hidden sm:flex">
          <button onClick={downloadTokens} className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[#C18B43]/60 px-4 py-2.5 text-xs font-semibold text-[#E8BB70] transition hover:bg-[#C18B43] hover:text-[#09151D]"><Download size={14}/> Export CSS tokens</button>
        </div>
        <button className="focus-ring rounded-md p-2 text-[#E8BB70] lg:hidden" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav className="grid gap-1 border-t border-white/10 px-5 py-3 lg:hidden">{nav.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>{setActive(id);setMenuOpen(false)}} className="rounded-lg px-3 py-2 text-sm text-[#D9C39B] hover:bg-white/5">{label}</a>)}</nav>}
    </header>

    <main>
      <section id="overview" className="pattern-bg relative scroll-mt-24">
        <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full border border-[#C18B43]/10"/>
        <div className="pointer-events-none absolute -right-8 -top-12 h-72 w-72 rounded-full border border-[#C18B43]/10"/>
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C18B43]/30 bg-[#C18B43]/5 px-3 py-1.5 text-[10px] uppercase tracking-[.2em] text-[#D9C39B]"><span className="h-1.5 w-1.5 rounded-full bg-[#C18B43]"/> Brand foundations · v1.0</div>
            <p className="mb-1 font-display text-xs tracking-[.34em] text-[#D9C39B]">HERITAGE INSTITUTE OF TECHNOLOGY, KOLKATA</p>
            <h1 className="gold-text my-4 font-display text-5xl font-semibold leading-[1.08] tracking-[.04em] sm:text-7xl xl:text-8xl">ECLECIA</h1>
            <p className="mb-7 font-editorial text-xl italic text-[#D9C39B] md:text-2xl">Where culture comes alive.</p>
            <p className="max-w-xl text-sm leading-7 text-[#B6B7B2] md:text-base">A unified visual language rooted in Indian culture and crafted for contemporary storytelling across brochures, posters, digital experiences and print media.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#colors" className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[#C18B43] px-5 py-3 text-sm font-semibold text-[#09151D] transition hover:bg-[#D5A45E]">Explore the system <ArrowUpRight size={16}/></a>
              <a href="#applications" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[#C18B43]/50 px-5 py-3 text-sm font-semibold text-[#F4EBDD] transition hover:bg-white/5">See applications <ChevronRight size={16}/></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">{["Regal","Artistic","Cultural","Youthful","Contemporary"].map(x=><span key={x} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[.16em] text-[#AAB1AE]">{x}</span>)}</div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-[#C18B43]/15"/>
            <div className="ornament relative overflow-hidden rounded-2xl border border-[#C18B43]/35 bg-gradient-to-br from-[#12212A] via-[#0b1920] to-[#09151D] p-6 sm:p-9">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#C18B43]/20"/>
              <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-[#C18B43]/20"/>
              <div className="relative z-10 text-center">
                <Sparkles className="mx-auto mb-4 text-[#C18B43]" size={30} strokeWidth={1}/>
                <p className="font-display text-[10px] tracking-[.35em] text-[#D9C39B]">A CELEBRATION OF</p>
                <h2 className="gold-text my-4 font-display text-4xl leading-tight sm:text-5xl">Art · Music<br/>Culture</h2>
                <div className="gold-rule mx-auto my-5 max-w-[180px]"/>
                <p className="font-editorial text-sm italic text-[#D9C39B]">Tradition, reimagined.</p>
                <div className="mt-8 grid grid-cols-3 gap-2 text-center">
                  {[["01","Create"],["02","Connect"],["03","Celebrate"]].map(([n,t])=><div key={n} className="rounded-lg border border-white/10 bg-black/10 px-2 py-3"><div className="font-display text-lg text-[#C18B43]">{n}</div><div className="mt-1 text-[9px] uppercase tracking-widest text-[#9BA6A4]">{t}</div></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-rule"/>

      <section className="mx-auto max-w-[1380px] px-5 py-16 md:px-8 md:py-20">
        <SectionTitle id="colors" eyebrow="01 / Color language" title="The palette" desc="A cinematic foundation of midnight navy and antique gold, balanced with rich cultural accents. Select any swatch to copy its HEX value."/>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((c,i)=><div key={c.hex} className="panel group rounded-2xl p-3 transition hover:-translate-y-1 hover:border-[#C18B43]/60">
            <button onClick={()=>copyText(c.hex)} className="focus-ring relative block h-36 w-full overflow-hidden rounded-xl text-left" style={{background:c.hex}} aria-label={`Copy ${c.name} ${c.hex}`}>
              <span className="absolute bottom-3 left-3 rounded-full bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[.16em]" style={{color:c.text}}>{i<2?"Primary":i<4?"Secondary":"Tertiary"}</span>
              <span className="absolute right-3 top-3 rounded-full bg-black/20 p-2" style={{color:c.text}}>{copied===c.hex?<Check size={15}/>:<Copy size={15}/>}</span>
            </button>
            <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-4">
              <div><h3 className="font-medium text-[#F4EBDD]">{c.name}</h3><p className="mt-1 text-xs leading-5 text-[#9FAAA8]">{c.role}</p></div>
              <button onClick={()=>copyText(c.hex)} className="focus-ring rounded-md border border-white/10 px-2 py-1.5 font-mono text-[11px] text-[#D9C39B] hover:border-[#C18B43]/60">{copied===c.hex?"Copied":c.hex}</button>
            </div>
          </div>)}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="panel rounded-2xl p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#C18B43]">Suggested color ratio</p>
            <div className="flex h-5 overflow-hidden rounded-full">
              {[["#09151D",60],["#C18B43",20],["#7E202B",10],["#14504D",5],["#D9C39B",5]].map(([color,pct])=><div key={color} style={{background:color,width:`${pct}%`}} title={`${color}: ${pct}%`}/>)}
            </div>
            <div className="mt-4 space-y-3">{[["Midnight Navy","60%","#09151D"],["Antique Gold","20%","#C18B43"],["Burgundy Red","10%","#7E202B"],["Teal + Ivory","10%","#14504D"]].map(([n,p,c])=><div key={n} className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-[#C3C8C4]"><i className="h-2.5 w-2.5 rounded-sm" style={{background:c}}/>{n}</span><span className="font-mono text-[#D9C39B]">{p}</span></div>)}</div>
            <p className="mt-4 text-[10px] leading-5 text-[#7F8C8D]">Suggested usage ratios, not measured website values. Ivory and vermilion share the final 5% accent allowance.</p>
          </div>
          <div className="panel rounded-2xl p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#C18B43]">Complementary accents</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {complements.map(c=><div key={c.hex} className="rounded-xl border border-white/5 bg-black/10 p-2.5"><div className="mb-2 h-12 rounded-lg border border-white/10" style={{background:c.hex}}/><p className="text-xs font-medium">{c.name}</p><p className="mt-1 font-mono text-[10px] text-[#D9C39B]">{c.hex}</p><p className="mt-1 text-[10px] text-[#7F8C8D]">For {c.for}</p></div>)}
            </div>
            <p className="mt-4 text-[10px] leading-5 text-[#7F8C8D]">Complementary values are proposed hue-wheel accents. Use them sparingly so they do not overpower the core brand palette.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0C1A22]">
        <div className="mx-auto max-w-[1380px] px-5 py-16 md:px-8 md:py-20">
          <SectionTitle id="typography" eyebrow="02 / Type system" title="Expressive, not excessive" desc="Pair a classical display serif with an editorial heading face and a clean sans-serif for the interface. Keep small text highly legible."/>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="panel rounded-2xl p-6"><p className="text-[10px] uppercase tracking-[.2em] text-[#C18B43]">Display / Cinzel</p><p className="gold-text mt-5 font-display text-5xl">Aa</p><h3 className="mt-3 font-display text-lg">CINZEL</h3><p className="mt-2 text-xs leading-5 text-[#9FAAA8]">Logo, major titles, hero lettering. Elegant, classical, ceremonial.</p></div>
            <div className="panel rounded-2xl p-6"><p className="text-[10px] uppercase tracking-[.2em] text-[#C18B43]">Editorial / Playfair Display</p><p className="mt-5 font-editorial text-5xl text-[#F4EBDD]">Aa</p><h3 className="mt-3 font-editorial text-lg">PLAYFAIR DISPLAY</h3><p className="mt-2 text-xs leading-5 text-[#9FAAA8]">Section titles and campaign headlines. Expressive, literary, premium.</p></div>
            <div className="panel rounded-2xl p-6"><p className="text-[10px] uppercase tracking-[.2em] text-[#C18B43]">Interface / Inter</p><p className="mt-5 font-sans text-5xl font-medium text-[#F4EBDD]">Aa</p><h3 className="mt-3 font-sans text-lg">INTER / MANROPE</h3><p className="mt-2 text-xs leading-5 text-[#9FAAA8]">Body copy, schedules, forms and buttons. Modern, neutral, readable.</p></div>
          </div>
          <div className="panel mt-4 rounded-2xl p-5">
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-[#C18B43]">Type scale</p>
            <div className="space-y-4">
              {[["Display","64–96 px","600–700"],["H1","48 px","600"],["H2","36 px","600"],["H3","24 px","600"],["Body","16 px","400"],["Caption","12–14 px","400–500"]].map(([n,s,w])=><div key={n} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0"><span className="text-sm text-[#D9C39B]">{n}</span><span className="font-mono text-xs text-[#AAB1AE]">{s}</span><span className="font-mono text-xs text-[#7F8C8D]">{w}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-16 md:px-8 md:py-20">
        <SectionTitle id="components" eyebrow="03 / Component library" title="Small details, one language" desc="Reusable interaction patterns for registration pages, event listings and digital campaigns."/>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="panel rounded-2xl p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between"><h3 className="font-editorial text-xl">Primary button</h3><span className="rounded-full border border-[#C18B43]/30 px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#D9C39B]">Interactive</span></div>
            <div className="flex min-h-44 flex-col items-center justify-center gap-5 rounded-xl border border-white/5 bg-[#09151D] p-5">
              <button disabled={buttonState==="disabled"} onMouseDown={()=>setButtonState("pressed")} onMouseUp={()=>setButtonState("hover")} onMouseLeave={()=>setButtonState("default")} onFocus={()=>setButtonState("focus")} onBlur={()=>setButtonState("default")} className={`focus-ring inline-flex min-h-12 items-center gap-3 rounded-lg border px-6 py-3 text-sm font-semibold transition ${buttonState==="disabled"?"cursor-not-allowed border-[#C18B43]/20 bg-[#C18B43]/30 text-[#D9C39B]/50":buttonState==="pressed"?"scale-[.98] border-[#A97532] bg-[#A97532] text-[#09151D]":buttonState==="hover"?"border-[#D5A45E] bg-[#D5A45E] text-[#09151D] shadow-[0_4px_18px_#C18B4330]":buttonState==="focus"?"border-[#C18B43] bg-[#C18B43] text-[#09151D] outline outline-2 outline-offset-4 outline-[#F4EBDD]":"border-[#C18B43] bg-[#C18B43] text-[#09151D] hover:bg-[#D5A45E]"}`}>Register Now <ArrowUpRight size={17}/></button>
              <div className="flex flex-wrap justify-center gap-2">{["default","hover","pressed","focus","disabled"].map(s=><button key={s} onClick={()=>setButtonState(s)} className={`focus-ring rounded-md border px-2.5 py-1.5 text-[10px] capitalize ${buttonState===s?"border-[#C18B43] text-[#E8BB70]":"border-white/10 text-[#9FAAA8] hover:border-white/30"}`}>{s}</button>)}</div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs"><div><p className="text-[#7F8C8D]">Padding</p><p className="mt-1 text-[#D9C39B]">14px 26px</p></div><div><p className="text-[#7F8C8D]">Minimum height</p><p className="mt-1 text-[#D9C39B]">48px</p></div><div><p className="text-[#7F8C8D]">Corner radius</p><p className="mt-1 text-[#D9C39B]">8px</p></div><div><p className="text-[#7F8C8D]">Transition</p><p className="mt-1 text-[#D9C39B]">180ms ease</p></div></div>
          </div>
          <div className="panel rounded-2xl p-5 sm:p-7">
            <h3 className="mb-6 font-editorial text-xl">Event card</h3>
            <div className="overflow-hidden rounded-xl border border-[#C18B43]/25 bg-[#12212A]">
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-[#7E202B] via-[#351D27] to-[#09151D]">
                <div className="absolute -right-5 -top-12 h-44 w-44 rounded-full border border-[#C18B43]/30"/><div className="absolute -right-1 -top-6 h-32 w-32 rounded-full border border-[#C18B43]/20"/>
                <Music2 size={44} strokeWidth={1} className="text-[#E8BB70]"/>
                <span className="absolute bottom-3 left-4 rounded-full bg-black/30 px-3 py-1 text-[9px] uppercase tracking-[.18em] text-[#F4EBDD]">Live performance</span>
              </div>
              <div className="p-5"><p className="text-[10px] uppercase tracking-[.2em] text-[#C18B43]">Music · Competition</p><h4 className="mt-2 font-editorial text-2xl">Sound of the City</h4><p className="mt-2 text-xs leading-5 text-[#AAB1AE]">A celebration of rhythm, voices and new discoveries.</p><button className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#E8BB70]">Explore event <ArrowUpRight size={14}/></button></div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[["Navigation","Minimal links, clear active state, one prominent CTA"],["Forms","Visible labels, clear validation, 48px touch targets"],["Cards","Strong imagery, muted borders, short descriptions"]].map(([h,d])=><div key={h} className="rounded-xl border border-white/10 p-4"><h3 className="text-sm font-semibold text-[#D9C39B]">{h}</h3><p className="mt-2 text-xs leading-5 text-[#8F9A99]">{d}</p></div>)}
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0C1A22]">
        <div className="mx-auto max-w-[1380px] px-5 py-16 md:px-8 md:py-20">
          <SectionTitle id="applications" eyebrow="04 / Applications" title="One identity, many formats" desc="Keep the core palette and type hierarchy consistent while adapting the composition to each medium."/>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="group overflow-hidden rounded-2xl border border-[#C18B43]/30 bg-[#09151D]">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#351D27] via-[#0b1921] to-[#09151D] p-6 text-center">
                <div className="absolute -left-12 top-5 h-48 w-48 rounded-full border border-[#C18B43]/25"/><div className="absolute -left-7 top-10 h-36 w-36 rounded-full border border-[#C18B43]/15"/>
                <Sparkles className="mb-4 text-[#C18B43]" size={25}/><p className="font-display text-[9px] tracking-[.28em] text-[#D9C39B]">HERITAGE INSTITUTE OF TECHNOLOGY</p><h3 className="gold-text my-5 font-display text-4xl">ECLECIA</h3><p className="font-editorial text-sm italic text-[#D9C39B]">Where culture comes alive.</p><div className="gold-rule my-5 w-20"/><p className="font-display text-sm tracking-widest text-[#F4EBDD]">CULTURE · ART · MUSIC</p><p className="mt-8 text-xs text-[#C18B43]">FESTIVAL BROCHURE</p>
              </div><div className="flex items-center justify-between p-4"><div><h4 className="text-sm font-semibold">Brochure cover</h4><p className="mt-1 text-xs text-[#899593]">A4 portrait · print-first</p></div><Printer size={18} className="text-[#C18B43]"/></div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-[#C18B43]/30 bg-[#09151D]">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#14504D] via-[#10252b] to-[#09151D] p-6 text-center">
                <div className="absolute -right-10 -top-5 h-52 w-52 rounded-full border border-[#C18B43]/25"/><Camera className="mb-5 text-[#D9C39B]" size={30} strokeWidth={1}/><p className="font-display text-[10px] tracking-[.3em] text-[#D9C39B]">CAPTURE THE MOMENT</p><h3 className="mt-4 font-editorial text-4xl text-[#F4EBDD]">Frames<br/><span className="italic text-[#E8BB70]">of culture</span></h3><p className="mt-6 max-w-[180px] text-xs leading-5 text-[#C4CBC7]">Photography · Visual storytelling · Creative vision</p><span className="mt-8 border border-[#C18B43]/60 px-4 py-2 text-[10px] uppercase tracking-widest text-[#E8BB70]">Submit your work</span>
              </div><div className="flex items-center justify-between p-4"><div><h4 className="text-sm font-semibold">Event poster</h4><p className="mt-1 text-xs text-[#899593]">4:5 social · poster-ready concept</p></div><Camera size={18} className="text-[#C18B43]"/></div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-[#C18B43]/30 bg-[#09151D]">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#7E202B] via-[#351D27] to-[#09151D] p-6 text-center">
                <Drama className="mb-5 text-[#E8BB70]" size={32} strokeWidth={1}/><p className="font-display text-[10px] tracking-[.3em] text-[#D9C39B]">THE STAGE IS YOURS</p><h3 className="gold-text mt-4 font-display text-4xl">Perform.</h3><h3 className="font-editorial text-3xl italic text-[#F4EBDD]">Express.</h3><h3 className="font-editorial text-3xl italic text-[#F4EBDD]">Inspire.</h3><div className="gold-rule my-6 w-20"/><p className="text-xs uppercase tracking-[.2em] text-[#D9C39B]">Dance · Drama · Music</p><span className="mt-8 rounded-md bg-[#C18B43] px-4 py-2 text-xs font-semibold text-[#09151D]">Join the celebration ↗</span>
              </div><div className="flex items-center justify-between p-4"><div><h4 className="text-sm font-semibold">Competition creative</h4><p className="mt-1 text-xs text-[#899593]">Campaign variation</p></div><Brush size={18} className="text-[#C18B43]"/></div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[["Print","300 DPI output, CMYK conversion, 3mm bleed where required",Printer],["Digital","RGB colors, compressed assets, responsive layouts",Monitor],["Social","4:5 feed, 9:16 stories, consistent safe margins",Smartphone]].map(([title,desc,Icon])=><div key={title} className="flex gap-3 rounded-xl border border-white/10 p-4"><Icon className="mt-1 shrink-0 text-[#C18B43]" size={18}/><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#899593]">{desc}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-16 md:px-8 md:py-20">
        <SectionTitle id="tokens" eyebrow="05 / Developer handoff" title="Design tokens" desc="Starter CSS variables for implementation. Export the token file to use the palette and foundational styles in your own project."/>
        <div className="overflow-hidden rounded-2xl border border-[#C18B43]/25 bg-[#061016]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#C8462D]"/><span className="h-2 w-2 rounded-full bg-[#C18B43]"/><span className="h-2 w-2 rounded-full bg-[#14504D]"/><span className="ml-2 text-xs text-[#AAB1AE]">eclecia-tokens.css</span></div><button onClick={()=>copyText(tokens)} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs text-[#D9C39B] hover:border-[#C18B43]/50">{copied===tokens?<Check size={13}/>:<Copy size={13}/>} Copy code</button></div>
          <pre className="overflow-x-auto p-5 text-xs leading-6 text-[#D9C39B] sm:p-6"><code>{tokens}</code></pre>
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#C18B43]/25 bg-[#12212A] p-5 sm:flex-row sm:items-center">
          <div><h3 className="font-editorial text-xl">Ready for implementation</h3><p className="mt-2 max-w-xl text-xs leading-5 text-[#9FAAA8]">React + Tailwind CSS + custom CSS. Responsive sections, interactive swatches, component state previews and exportable tokens.</p></div>
          <button onClick={downloadTokens} className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#C18B43] px-4 py-3 text-xs font-semibold text-[#09151D] transition hover:bg-[#D5A45E]"><Download size={15}/> Download tokens</button>
        </div>
        <div className="mt-8 rounded-xl border border-[#C18B43]/15 p-4 text-xs leading-6 text-[#899593]"><strong className="text-[#D9C39B]">Brand note:</strong> This is a proposed working system based on the palette explored in this conversation. Confirm the official logo, exact source HEX values and event dates with the ECLECIA team before publishing. For print, convert artwork to CMYK and check text contrast and small details.</div>
      </section>
    </main>

    <footer className="border-t border-[#C18B43]/20 bg-[#061016]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-3 px-5 py-7 text-xs text-[#7F8C8D] sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div><span className="font-display tracking-[.18em] text-[#C18B43]">ECLECIA</span><span className="mx-2">·</span>Visual design system</div>
        <p>Heritage Institute of Technology, Kolkata · Brand foundations v1.0</p>
        <a href="#overview" className="focus-ring inline-flex items-center gap-1 text-[#D9C39B] hover:text-[#E8BB70]">Back to top ↑</a>
      </div>
    </footer>
    {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-[#C18B43]/40 bg-[#12212A] px-4 py-2.5 text-xs text-[#F4EBDD] shadow-2xl">{notice}</div>}
  </div>;
}