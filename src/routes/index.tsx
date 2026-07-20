import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Zap,
  Target,
  Cpu,
  Compass,
  Lock,
  Check,
  Plus,
} from "lucide-react";

import lvlMark from "@/assets/lvl1-mark.png";
import chromeSculpture from "@/assets/chrome-sculpture.png";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ----------------------------- small primitives ---------------------------- */

function Foil({
  variant = "silver",
  className = "",
}: {
  variant?: "silver" | "gold" | "purple";
  className?: string;
}) {
  const cls =
    variant === "gold" ? "foil-gold" : variant === "purple" ? "foil-purple" : "foil-silver";
  return <div className={`${cls} ${className}`} aria-hidden />;
}

function FoilText({
  children,
  variant = "silver",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "silver" | "gold" | "purple";
  className?: string;
}) {
  const cls =
    variant === "gold"
      ? "foil-text-gold"
      : variant === "purple"
        ? "foil-text-purple"
        : "foil-text-silver";
  return <span className={`${cls} ${className}`}>{children}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function Mark({ className = "" }: { className?: string }) {
  return (
    <img
      src={lvlMark}
      alt="LVL 1 mark"
      width={64}
      height={64}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

/* ----------------------------- header + marquee ---------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <Mark className="h-7 w-7" />
          <span className="font-display text-lg font-bold tracking-tight">
            LVL <span className="foil-text-purple">1</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Philosophy", "#philosophy"],
            ["System", "#system"],
            ["Course", "#course"],
            ["Manifesto", "#manifesto"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#waitlist"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Join waitlist
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}

function Marquee() {
  const items = [
    "EVERYTHING'S A STEP AHEAD",
    "TURN PROCRASTINATION BORING",
    "I AM SPEED",
    "START AT LEVEL 1",
    "LEVEL UP FASTER",
  ];
  return (
    <div className="relative overflow-hidden border-y border-border bg-foreground py-4 text-background">
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-14 font-display text-sm tracking-[0.3em]">
            {t}
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* floating chrome sculptures */}
      <img
        src={chromeSculpture}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 w-72 opacity-90 animate-float-slower"
      />
      <img
        src={chromeSculpture}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-24 w-56 rotate-45 opacity-80 animate-float-slow"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-20 pb-28 md:pt-28 md:pb-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center justify-between md:col-span-8">
            <Eyebrow>New / Founding Cohort · 2026</Eyebrow>
            <div className="hidden items-center gap-2 md:flex">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Waitlist open
              </span>
            </div>
          </div>

          <h1 className="col-span-12 mt-8 display-xl text-[clamp(3.5rem,12vw,12rem)]">
            Everyone starts
            <br />
            at <FoilText variant="purple">Level&nbsp;1.</FoilText>
          </h1>

          <div className="col-span-12 mt-10 flex flex-col gap-10 md:col-span-7 md:mt-14">
            <p className="text-xl leading-tight text-foreground/80 md:text-2xl">
              The difference is how fast you level up. LVL&nbsp;1 is a premium execution
              system that turns overwhelming goals into quest lines — so you stop planning
              your life and start speed-running it.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-base font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Claim Level 1
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#system"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                See the system
              </a>
            </div>
          </div>

          <div className="col-span-12 mt-10 md:col-span-5 md:mt-14">
            <XPCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function XPCard() {
  const [xp, setXp] = useState(120);
  useEffect(() => {
    const id = setInterval(() => setXp((v) => (v >= 940 ? 120 : v + 7)), 90);
    return () => clearInterval(id);
  }, []);
  const pct = Math.min(100, (xp / 1000) * 100);
  return (
    <div className="relative rounded-3xl border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mark className="h-9 w-9" />
          <div>
            <div className="eyebrow">Player · you</div>
            <div className="font-display text-lg font-semibold">Level 1 → 2</div>
          </div>
        </div>
        <div className="rounded-full border border-border px-3 py-1 font-mono text-xs">
          XP {xp}/1000
        </div>
      </div>
      <div className="relative mt-6 h-3 overflow-hidden rounded-full bg-secondary">
        <div
          className="foil-purple h-full rounded-full transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          { l: "Quests", v: "3" },
          { l: "Streak", v: "12d" },
          { l: "Focus", v: "94%" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-background/60 p-3">
            <div className="font-display text-xl font-bold">{s.v}</div>
            <div className="eyebrow mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- philosophy ------------------------------- */

function Philosophy() {
  return (
    <section id="philosophy" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>01 — The Problem</Eyebrow>
          </div>
          <h2 className="col-span-12 display-xl text-[clamp(2.5rem,7vw,6rem)] md:col-span-8">
            You're comparing your <FoilText variant="silver">Level&nbsp;1</FoilText>
            <br />
            to someone else's <FoilText variant="gold">Level&nbsp;99.</FoilText>
          </h2>
          <div className="col-span-12 md:col-span-4" />
          <div className="col-span-12 mt-10 space-y-6 text-lg leading-relaxed text-foreground/80 md:col-span-8 md:text-xl">
            <p>
              The overwhelm isn't real. It's a rendering bug. You loaded into the game,
              looked around, and saw everyone else with maxed-out gear. Nobody told you
              they started here too.
            </p>
            <p className="text-foreground">
              You're not behind. You're just Level&nbsp;1.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- system --------------------------------- */

function System() {
  const pillars = [
    {
      icon: Zap,
      label: "Input",
      desc: "Curate what enters your mind. Signal over slop.",
      foil: "purple" as const,
    },
    {
      icon: Cpu,
      label: "Process",
      desc: "Turn thoughts into repeatable rituals that compound.",
      foil: "silver" as const,
    },
    {
      icon: Target,
      label: "Output",
      desc: "Ship visible reps. Progress beats perfection, always.",
      foil: "gold" as const,
    },
    {
      icon: Compass,
      label: "Environment",
      desc: "Design a world where the right move is the easy move.",
      foil: "silver" as const,
    },
  ];
  return (
    <section id="system" className="relative border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>02 — The Framework</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Four pillars.
              <br />
              One <FoilText variant="purple">execution engine.</FoilText>
            </h2>
          </div>
          <p className="col-span-12 self-end text-lg text-foreground/80 md:col-span-6 md:col-start-7">
            LVL&nbsp;1 isn't hacks. It's the physics of getting things done — broken into
            four systems that plug into each other and quietly compound.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-start justify-between">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                  <Foil variant={p.foil} className="absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p.icon
                      className="h-6 w-6 text-background mix-blend-difference"
                      strokeWidth={2.25}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-10 font-display text-3xl font-bold tracking-tight">
                {p.label}
              </div>
              <p className="mt-3 text-sm text-foreground/70">{p.desc}</p>
              <div className="mt-8 h-px w-full bg-border" />
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-widest text-muted-foreground">
                  Pillar
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- quests transformation ---------------------------- */

function Quests() {
  return (
    <section className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>03 — Goals become quests</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Delete the
              <br />
              <span className="line-through decoration-accent decoration-[6px]">
                to-do list.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-lg text-foreground/80">
              Endless lists paralyze. Quest lines pull. LVL&nbsp;1 turns every goal into a
              chain of small, executable moves — with levels, XP, and progress bars that
              make procrastination feel boring.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="grid grid-cols-1 gap-3">
              <BeforeAfter
                before="Get in shape"
                after="Quest: Move for 20 min · +40 XP"
                pct={65}
              />
              <BeforeAfter
                before="Launch the product"
                after="Quest: Ship landing v1 · +120 XP"
                pct={82}
                foil="gold"
              />
              <BeforeAfter
                before="Read more books"
                after="Quest: 10 pages before phone · +15 XP"
                pct={40}
                foil="silver"
              />
              <BeforeAfter
                before="Fix my sleep"
                after="Quest: Lights out 22:30 · +25 XP"
                pct={28}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({
  before,
  after,
  pct,
  foil = "purple",
}: {
  before: string;
  after: string;
  pct: number;
  foil?: "silver" | "gold" | "purple";
}) {
  return (
    <div className="group grid grid-cols-12 items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-secondary/50">
      <div className="col-span-12 flex items-center gap-3 md:col-span-4">
        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Before
        </span>
        <span className="text-foreground/60 line-through">{before}</span>
      </div>
      <div className="col-span-12 flex items-center gap-3 md:col-span-5">
        <span className="rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-background">
          Quest
        </span>
        <span className="font-medium">{after}</span>
      </div>
      <div className="col-span-12 md:col-span-3">
        <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full ${foil === "gold" ? "foil-gold" : foil === "silver" ? "foil-silver" : "foil-purple"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>LVL {Math.ceil(pct / 20)}</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- course --------------------------------- */

function Course() {
  const modules = [
    { n: "01", title: "The Level 1 Mindset", foil: "silver" as const, xp: 200 },
    { n: "02", title: "Quest Design", foil: "purple" as const, xp: 320 },
    { n: "03", title: "Execution Sprints", foil: "gold" as const, xp: 280 },
    { n: "04", title: "Environment Architecture", foil: "silver" as const, xp: 240 },
    { n: "05", title: "Input Diet", foil: "purple" as const, xp: 180 },
    { n: "06", title: "The Speed Loop", foil: "gold" as const, xp: 420 },
  ];
  return (
    <section id="course" className="relative border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow text-background/60">04 — The Course</div>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Six modules.
              <br />
              <FoilText variant="gold">Collect them all.</FoilText>
            </h2>
          </div>
          <p className="col-span-12 self-end text-lg text-background/70 md:col-span-6 md:col-start-7">
            Each module is a collectible card in the LVL&nbsp;1 deck — video lessons,
            playbooks, and quest templates you actually run. Complete a card, unlock the
            next.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <ModuleCard key={m.n} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({
  n,
  title,
  foil,
  xp,
}: {
  n: string;
  title: string;
  foil: "silver" | "gold" | "purple";
  xp: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ x: y * -8, y: x * 10 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-background/15 bg-background/5 p-6 transition-transform duration-200"
    >
      <Foil
        variant={foil}
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/85" />
      <div className="relative flex h-full flex-col justify-between text-background">
        <div className="flex items-start justify-between">
          <span className="font-mono text-sm tracking-widest text-background/90 mix-blend-difference">
            MOD · {n}
          </span>
          <span className="rounded-full bg-background/90 px-2 py-0.5 font-mono text-[10px] tracking-widest text-foreground">
            +{xp} XP
          </span>
        </div>
        <div>
          <Mark className="h-8 w-8 opacity-90" />
          <h3 className="mt-4 font-display text-3xl font-bold leading-none tracking-tight">
            {title}
          </h3>
          <div className="mt-6 flex items-center justify-between text-xs text-background/80">
            <span className="font-mono uppercase tracking-widest">Collectible</span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- bonuses ------------------------------- */

function Bonuses() {
  const items = [
    { title: "Quest template vault", desc: "Plug-and-play playbooks for 40+ goals." },
    { title: "Founders' community", desc: "Ship in public with the first cohort.", soon: true },
    { title: "1:1 coaching upgrade", desc: "Book a strategist for boss-battle weeks.", soon: true },
    { title: "Execution OS (beta)", desc: "The full app. Waitlist inside the course.", soon: true },
  ];
  return (
    <section className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>05 — What's inside</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Bonus <FoilText variant="silver">loot.</FoilText>
            </h2>
          </div>
        </div>
        <div className="mt-14 divide-y divide-border border-y border-border">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group grid grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-secondary/40"
            >
              <div className="col-span-1 font-mono text-xs text-muted-foreground">
                0{i + 1}
              </div>
              <div className="col-span-11 md:col-span-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {it.title}
                </h3>
              </div>
              <div className="col-span-9 text-foreground/70 md:col-span-4">{it.desc}</div>
              <div className="col-span-3 flex justify-end md:col-span-1">
                {it.soon ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <Lock className="h-3 w-3" /> Soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-background">
                    <Check className="h-3 w-3" /> Included
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- pull quote ------------------------------- */

function PullQuote() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <img
        src={chromeSculpture}
        aria-hidden
        alt=""
        className="pointer-events-none absolute -right-24 top-10 w-96 rotate-12 opacity-70 animate-float-slow"
      />
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <p className="display-xl max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)]">
          Everything's a step ahead.
          <br />
          Turn procrastination <FoilText variant="purple">boring.</FoilText>
          <br />
          I am <FoilText variant="gold">speed.</FoilText>
        </p>
      </div>
    </section>
  );
}

/* --------------------------------- waitlist -------------------------------- */

function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-border bg-secondary/40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-28 md:py-40">
        <div className="col-span-12 md:col-span-6">
          <Eyebrow id="manifesto">06 — Manifesto</Eyebrow>
          <h2 className="mt-6 display-xl text-[clamp(2.5rem,6vw,5.5rem)]">
            Join the generation that believes
            <br />
            <FoilText variant="purple">nothing is impossible.</FoilText>
          </h2>
          <p className="mt-8 max-w-md text-lg text-foreground/80">
            You're not buying another productivity system. You're joining a movement of
            people who decided that every goal is a quest — and Level&nbsp;1 is a proud
            place to start.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-3xl border border-border bg-background p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-3">
              <Mark className="h-10 w-10" />
              <div>
                <div className="eyebrow">Founding waitlist</div>
                <div className="font-display text-xl font-bold">Claim your Level 1</div>
              </div>
            </div>
            {submitted ? (
              <div className="mt-8 flex flex-col items-start gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1 font-mono text-xs uppercase tracking-widest text-background">
                  <Check className="h-3 w-3" /> Quest accepted
                </div>
                <p className="text-lg font-medium">
                  You're in. Check your inbox — the first quest is on its way.
                </p>
              </div>
            ) : (
              <>
                <label className="mt-8 block">
                  <span className="eyebrow">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="you@ready.to"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-4 text-base outline-none focus:border-foreground"
                  />
                </label>
                <label className="mt-4 block">
                  <span className="eyebrow">One goal you're speed-running</span>
                  <input
                    type="text"
                    placeholder="Ship my first product…"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-4 text-base outline-none focus:border-foreground"
                  />
                </label>
                <button
                  type="submit"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-base font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  Join the founding cohort
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <Plus className="h-3 w-3" /> Early pricing locked for founders
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Mark className="h-10 w-10" />
            <span className="font-display text-2xl font-bold tracking-tight">
              LVL <span className="foil-text-purple">1</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Not another productivity app. The beginning of a movement for people who
            refuse to stay Level&nbsp;1.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
          <div className="font-mono uppercase tracking-widest">© 2026 LVL 1</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground">
              X
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- page ---------------------------------- */

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <Philosophy />
      <System />
      <Quests />
      <Course />
      <Bonuses />
      <PullQuote />
      <Waitlist />
      <Footer />
    </div>
  );
}
