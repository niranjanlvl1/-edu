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
  X,
} from "lucide-react";

import lvlLogo from "@/assets/lvl1-logo.png.asset.json";
import lvlArc from "@/assets/lvl1-arc.png";
import metal1 from "@/assets/metal-piece-1.png";
import metal2 from "@/assets/metal-piece-2.png";
import metal3 from "@/assets/metal-piece-3.png";

const lvlMark = lvlArc;

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ----------------------------- small primitives ---------------------------- */

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

function MetalPiece({
  src,
  className = "",
  alt = "",
}: {
  src: string;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt}
      loading="lazy"
      width={1024}
      height={1024}
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

/* ----------------------------- header + marquee ---------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <a href="#top" className="flex items-center">
          <img
            src={lvlLogo.url}
            alt="LVL 1"
            width={120}
            height={72}
            className="h-11 w-auto select-none"
            draggable={false}
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["The System", "#system"],
            ["Curriculum", "#course"],
            ["Results", "#results"],
            ["FAQ", "#faq"],
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
          href="#offer"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium font-cta text-background transition-transform hover:-translate-y-0.5"
        >
          Join Now
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}

function Marquee() {
  const items = [
    "STOP HOPING. ENGINEER IT.",
    "EXECUTION OVER MOTIVATION",
    "TURN GOALS INTO QUESTS",
    "LEVEL UP FASTER",
    "TOP 1% PRODUCTIVITY",
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
      {/* static crumpled metal pieces */}
      <MetalPiece
        src={metal1}
        className="absolute -left-24 top-32 w-80 opacity-90 -rotate-12"
      />
      <MetalPiece
        src={metal3}
        className="absolute -right-20 bottom-10 w-64 opacity-80 rotate-6"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-20 pb-28 md:pt-28 md:pb-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center justify-between md:col-span-8">
            <Eyebrow>New / Founding Cohort · 2026</Eyebrow>
            <div className="hidden items-center gap-2 md:flex">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Enrollment open
              </span>
            </div>
          </div>

          <h1 className="col-span-12 mt-8 display-xl text-[clamp(3rem,9vw,9rem)]">
            Stop hoping you'll become productive.
            <br />
            <span className="text-accent">Engineer it.</span>
          </h1>

          <div className="col-span-12 mt-10 flex flex-col gap-10 md:col-span-7 md:mt-14">
            <p className="text-xl leading-tight text-foreground/80 md:text-2xl">
              The Top 1% Productivity System helps ambitious founders, creators and
              professionals build an execution system that makes progress inevitable.
              No motivation. No hustle culture. No productivity hacks — just a complete
              operating system that turns any goal into executable quests.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#offer"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-base font-medium font-cta text-background transition-transform hover:-translate-y-0.5"
              >
                Start Your Upgrade
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#system"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-base font-medium font-cta text-foreground transition-colors hover:bg-secondary"
              >
                See The System
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {["Lifetime Updates", "Practical Templates", "AI Workflows", "14-Day Guarantee"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-accent" /> {t}
                  </li>
                ),
              )}
            </ul>
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
  const stages = [
    { label: "Goal", lvl: 0 },
    { label: "Questline", lvl: 1 },
    { label: "Level 12", lvl: 12 },
    { label: "Level 46", lvl: 46 },
    { label: "Level 99", lvl: 99 },
  ];
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
            <div className="font-display text-lg font-semibold">Goal → Level 99</div>
          </div>
        </div>
        <div className="rounded-full border border-border px-3 py-1 font-mono text-xs">
          XP {xp}/1000
        </div>
      </div>
      <div className="relative mt-6 h-3 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="mt-6 space-y-2">
        {stages.map((s, i) => {
          const reached = pct >= (i / (stages.length - 1)) * 100;
          return (
            <li
              key={s.label}
              className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2 font-medium">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${reached ? "bg-accent" : "bg-border"}`}
                />
                {s.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                LVL {s.lvl.toString().padStart(2, "0")}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* -------------------------------- trust strip ------------------------------- */

function TrustStrip() {
  const pills = ["First Principles", "Systems Thinking", "MECE", "AI", "Behavioral Design"];
  return (
    <section className="relative border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-6 items-center">
          <h3 className="col-span-12 font-display text-2xl leading-tight md:col-span-6 md:text-3xl">
            Most productivity advice teaches motivation.
            <br />
            <span className="text-accent">We teach execution.</span>
          </h3>
          <div className="col-span-12 md:col-span-6">
            <div className="mb-4 eyebrow">Built on</div>
            <div className="flex flex-wrap gap-2">
              {pills.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- problem ------------------------------- */

function Problem() {
  const collected = [
    "Bookmarks",
    "Courses",
    "YouTube videos",
    "Notes",
    "Notion templates",
    "Advice",
    "Ideas",
  ];
  return (
    <section id="problem" className="relative border-t border-border overflow-hidden">
      <MetalPiece
        src={metal2}
        className="absolute -right-32 top-20 w-96 opacity-70 rotate-12"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>01 — The Problem</Eyebrow>
          </div>
          <h2 className="col-span-12 display-xl text-[clamp(2.5rem,7vw,6rem)] md:col-span-8">
            You don't have a productivity problem.
            <br />
            You have an <span className="text-accent">execution problem.</span>
          </h2>
          <div className="col-span-12 md:col-span-4" />
          <div className="col-span-12 mt-10 space-y-6 text-lg leading-relaxed text-foreground/80 md:col-span-8 md:text-xl">
            <p>
              Every ambitious person eventually hits the same wall. Not because they aren't
              capable — because their brain becomes overloaded.
            </p>
            <p>You collect:</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 font-display text-xl text-foreground md:grid-cols-3 md:text-2xl">
              {collected.map((c) => (
                <li key={c} className="border-b border-border pb-2">
                  {c}.
                </li>
              ))}
            </ul>
            <p className="text-foreground">Yet your goals barely move.</p>
            <p>
              Eventually you start believing{" "}
              <span className="italic text-foreground">"I'm just inconsistent."</span>
            </p>
            <p className="font-display text-2xl text-foreground md:text-3xl">
              You're not. You're comparing your Level 1 to someone else's Level 99.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- operating system ------------------------- */

function OS() {
  const swaps = [
    ["Instead of forcing discipline", "we redesign the environment where discipline happens."],
    ["Instead of adding more tasks", "we reduce friction until action becomes obvious."],
    ["Instead of hoping you stay motivated", "we engineer momentum."],
  ];
  return (
    <section className="relative border-t border-border bg-foreground text-background overflow-hidden">
      <MetalPiece
        src={metal1}
        className="absolute -left-24 -top-16 w-80 opacity-60 -rotate-12"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow text-background/60">02 — The New OS</div>
          </div>
          <h2 className="col-span-12 display-xl text-[clamp(2.5rem,7vw,6rem)] md:col-span-8">
            Meet your new operating system.
            <br />
            <span className="text-accent">The Top 1% Productivity System.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {swaps.map(([a, b]) => (
            <div
              key={a}
              className="rounded-3xl border border-background/20 bg-background/5 p-8"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-background/60">
                {a}
              </div>
              <div className="mt-4 font-display text-2xl leading-tight">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- framework --------------------------------- */

function System() {
  const pillars = [
    {
      n: "①",
      icon: Zap,
      label: "Input",
      tagline: "Control what enters your brain.",
      body:
        "Instead of consuming everything, capture only what matters.",
      list: [
        "Second Brain",
        "Information Filtering",
        "AI Capture",
        "Knowledge Compression",
        "Decision Frameworks",
      ],
      result: "Your brain becomes clear.",
    },
    {
      n: "②",
      icon: Cpu,
      label: "Process",
      tagline: "Turn goals into executable quests.",
      body:
        "The heart of Lvl 1. Every goal becomes Quest → Levels → Tasks → Micro actions → Calendar → Completion → XP → Next level.",
      list: [
        "Quest architecture",
        "Level design",
        "Micro-actions",
        "Calendar loops",
        "XP tracking",
      ],
      result: 'Only "Complete today\'s quest."',
    },
    {
      n: "③",
      icon: Target,
      label: "Output",
      tagline: "Become impossible to outwork.",
      body: "Instead of working longer, you'll create more per hour.",
      list: [
        "Deep Work",
        "AI leverage",
        "Automation",
        "Execution systems",
        "Decision speed",
        "Content systems",
        "Business systems",
        "Leverage loops",
      ],
      result: "Compounding output.",
    },
    {
      n: "④",
      icon: Compass,
      label: "Environment",
      tagline: "Engineer a world that makes success easier.",
      body: "Because environment beats willpower. Every time.",
      list: [
        "Digital Workspace",
        "Notifications",
        "Phone",
        "Calendar",
        "Physical Workspace",
        "People",
        "Habit Loops",
        "Default Choices",
      ],
      result: "Effortless action.",
    },
  ];
  return (
    <section id="system" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>03 — The Framework</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              The Top 1%
              <br />
              <span className="text-accent">Productivity Framework.</span>
            </h2>
          </div>
          <p className="col-span-12 self-end text-lg text-foreground/80 md:col-span-6 md:col-start-7">
            Every productive person eventually masters four systems. Most people only
            optimize one. LVL 1 makes all four click together.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-bold text-accent">
                    {p.n}
                  </span>
                  <p.icon className="h-6 w-6" strokeWidth={2.25} />
                </div>
                <span className="font-mono text-xs text-muted-foreground">Pillar</span>
              </div>
              <div className="mt-8 font-display text-4xl font-bold tracking-tight">
                {p.label}
              </div>
              <p className="mt-2 font-display text-lg text-foreground/80">{p.tagline}</p>
              <p className="mt-4 text-sm text-foreground/70">{p.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.list.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs"
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="font-mono uppercase tracking-widest text-muted-foreground">
                  Result
                </span>
                <span className="font-display font-semibold">{p.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- course --------------------------------- */

function Course() {
  const modules = [
    {
      n: "01",
      title: "The Psychology of Top 1%",
      body: "Identity. Beliefs. Execution. Speed. Why most ambitious people stay stuck.",
    },
    {
      n: "02",
      title: "The Input Engine",
      body: "Second Brain. AI Capture. Knowledge. Reading. Thinking. Information Diet.",
    },
    {
      n: "03",
      title: "Questification",
      body: "How to turn any goal into Levels 1–99. This becomes your personal game.",
    },
    {
      n: "04",
      title: "Execution Engine",
      body: "Planning. Calendars. Priority. Deep Work. Focus. Decision Making. Anti-Procrastination.",
    },
    {
      n: "05",
      title: "Output Multiplication",
      body: "AI. Automation. Leverage. Business Systems. Content Systems. Execution Systems.",
    },
    {
      n: "06",
      title: "Environment Design",
      body: "Workspace. Phone. Notifications. Sleep. Energy. People. Defaults.",
    },
    {
      n: "07",
      title: "The Lifetime System",
      body: "Health. Wealth. Relationships. Career. Learning. Every future goal follows the same framework.",
    },
  ];
  return (
    <section
      id="course"
      className="relative border-t border-border bg-foreground text-background overflow-hidden"
    >
      <MetalPiece
        src={metal3}
        className="absolute -right-16 top-20 w-72 opacity-60 rotate-6"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow text-background/60">04 — Inside the Course</div>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Seven modules.
              <br />
              <span className="text-accent">One complete system.</span>
            </h2>
          </div>
          <p className="col-span-12 self-end text-lg text-background/70 md:col-span-6 md:col-start-7">
            Each module is a playable chapter — video lessons, playbooks and quest
            templates you actually run. Finish one, unlock the next.
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
  body,
}: {
  n: string;
  title: string;
  body: string;
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
        setTilt({ x: y * -6, y: x * 8 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative overflow-hidden rounded-3xl border border-background/15 bg-background/5 p-7 transition-transform duration-200"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-sm tracking-widest text-background/80">
          MOD · {n}
        </span>
        <Mark className="h-6 w-6 opacity-80" />
      </div>
      <h3 className="mt-10 font-display text-2xl font-bold leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm text-background/70">{body}</p>
      <div className="mt-8 flex items-center justify-between border-t border-background/15 pt-4 text-xs text-background/70">
        <span className="font-mono uppercase tracking-widest">Chapter</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

/* ------------------------------- bonuses ------------------------------- */

function Bonuses() {
  const items = [
    { title: "Top 1% Notion Dashboard", desc: "Your daily execution cockpit." },
    { title: "AI Prompt Library", desc: "Copy-paste prompts for every workflow." },
    { title: "Quest Builder Templates", desc: "Turn any goal into Levels 1–99." },
    { title: "Goal Assessment Framework", desc: "Diagnose what to work on first." },
    { title: "Weekly Planning System", desc: "The exact ritual we run every Sunday." },
    { title: "Execution Checklists", desc: "Deep work, decision, environment audits." },
    { title: "Lifetime Updates", desc: "Every future revision, free forever." },
    { title: "Priority Calculator", desc: "Kill the noise. Do the one thing." },
    { title: "Community Waitlist", desc: "Founding member pricing + future discount.", soon: true },
  ];
  return (
    <section className="relative border-t border-border overflow-hidden">
      <MetalPiece
        src={metal2}
        className="absolute -left-20 top-10 w-72 opacity-60 -rotate-6"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>05 — What's included</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Bonuses <span className="text-accent">included free.</span>
            </h2>
          </div>
        </div>
        <div className="mt-14 divide-y divide-border border-y border-border">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-secondary/40"
            >
              <div className="col-span-1 font-mono text-xs text-muted-foreground">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="col-span-11 md:col-span-6">
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
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

/* ---------------------------- why this works ---------------------------- */

function WhyItWorks() {
  const domains = ["Gym.", "Business.", "Career.", "Relationships.", "Money."];
  return (
    <section className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>06 — Why this works</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              Techniques change.
              <br />
              <span className="text-accent">Architecture compounds.</span>
            </h2>
          </div>
          <div className="col-span-12 space-y-6 text-lg text-foreground/80 md:col-span-6 md:col-start-7">
            <p>
              Most productivity courses teach techniques. Lvl 1 teaches architecture.
              Once you understand how execution works, every new goal becomes easier.
            </p>
            <p className="font-display text-2xl text-foreground">
              Everything becomes another questline.
            </p>
            <ul className="flex flex-wrap gap-3">
              {domains.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-background px-4 py-2 font-display text-lg"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ philosophy ------------------------------ */

function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden border-t border-border">
      <MetalPiece
        src={metal1}
        className="absolute -right-24 top-10 w-96 opacity-70 rotate-12"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <Eyebrow>07 — The Philosophy</Eyebrow>
        <p className="display-xl mt-6 max-w-5xl text-[clamp(2.25rem,6vw,5.5rem)]">
          Everyone starts at <span className="text-accent">Level 1.</span>
          <br />
          Not knowing isn't failure. It's simply your current level.
        </p>
        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-4 text-lg text-foreground/80">
            <p>The entrepreneur making $10 million started here.</p>
            <p>The athlete you admire started here.</p>
            <p>The confident speaker started here.</p>
            <p className="font-display text-2xl text-foreground">
              Stop comparing your beginning to someone else's mastery. Level up instead.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ who it's for ---------------------------- */

function WhoFor() {
  const forList = [
    "Founders",
    "Creators",
    "Students",
    "Knowledge workers",
    "ADHD entrepreneurs",
    "High-agency people",
    "Anyone obsessed with improving",
  ];
  const notFor = [
    "People looking for motivation",
    "People wanting overnight success",
    "People unwilling to execute",
  ];
  return (
    <section id="results" className="relative border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <Eyebrow>08 — Who this is for</Eyebrow>
        <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
          Built for <span className="text-accent">high-agency people.</span>
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-background p-8">
            <div className="eyebrow">For</div>
            <ul className="mt-6 space-y-3">
              {forList.map((f) => (
                <li key={f} className="flex items-center gap-3 font-display text-xl">
                  <Check className="h-5 w-5 text-accent" strokeWidth={3} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-background p-8">
            <div className="eyebrow">Not for</div>
            <ul className="mt-6 space-y-3">
              {notFor.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 font-display text-xl text-muted-foreground"
                >
                  <X className="h-5 w-5" strokeWidth={3} /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ roadmap ------------------------------- */

function Roadmap() {
  const rows = [
    ["Today", "Overwhelmed."],
    ["Week One", "Clear."],
    ["Week Two", "Executing daily."],
    ["Month One", "Momentum."],
    ["Three Months", "Compounding."],
    ["One Year", "Your life looks unrecognizable."],
  ];
  return (
    <section className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>09 — The Roadmap</Eyebrow>
            <h2 className="mt-6 display-xl text-[clamp(2.25rem,5vw,4.5rem)]">
              From overwhelmed
              <br />
              to <span className="text-accent">unrecognizable.</span>
            </h2>
          </div>
        </div>
        <div className="mt-14 divide-y divide-border border-y border-border">
          {rows.map(([when, state], i) => (
            <div
              key={when}
              className="grid grid-cols-12 items-center gap-4 py-6"
            >
              <div className="col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="col-span-10 md:col-span-4">
                <div className="font-display text-2xl font-semibold md:text-3xl">{when}</div>
              </div>
              <div className="col-span-12 md:col-span-7">
                <div className="font-display text-xl text-foreground/80 md:text-2xl">
                  {state}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- offer -------------------------------- */

function Offer() {
  const included = [
    "Complete course",
    "Templates",
    "AI systems",
    "Quest framework",
    "Future updates",
    "Bonus resources",
    "Community waitlist",
  ];
  const upgrade = [
    ["Level 1", "Course", "The Top 1% Productivity System."],
    ["Level 2", "Execution Community", "Weekly accountability, live coaching, leaderboards."],
    ["Level 3", "Done-With-You", "Personal execution system built with our team."],
    ["Level 4", "Done-For-You", "We architect your life or business end-to-end."],
  ];
  return (
    <section id="offer" className="relative overflow-hidden border-t border-border bg-foreground text-background">
      <MetalPiece
        src={metal2}
        className="absolute -right-24 -top-16 w-96 opacity-50 rotate-12"
      />
      <MetalPiece
        src={metal3}
        className="absolute -left-16 bottom-0 w-64 opacity-50 -rotate-6"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <div className="eyebrow text-background/60">10 — The Offer</div>
            <h2 className="mt-6 display-xl text-[clamp(2.5rem,6vw,5.5rem)]">
              The Top 1%
              <br />
              <span className="text-accent">Productivity System.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg text-background/70">
              A complete operating system. Not another course you'll bookmark and forget.
            </p>
            <ul className="mt-10 space-y-2">
              {included.map((i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <Check className="h-5 w-5 text-accent" strokeWidth={3} /> {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <div className="rounded-3xl border border-background/20 bg-background/5 p-8">
              <div className="flex items-center gap-3">
                <Mark className="h-10 w-10" />
                <div>
                  <div className="eyebrow text-background/60">Launch pricing</div>
                  <div className="font-display text-xl font-bold">Founding cohort · 2026</div>
                </div>
              </div>
              <div className="mt-8 flex items-end gap-4">
                <span className="font-display text-6xl font-bold leading-none">$97</span>
                <span className="pb-2 font-mono text-sm text-background/60 line-through">
                  $197
                </span>
              </div>
              <a
                href="#waitlist"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-6 py-4 text-base font-medium font-cta text-foreground transition-transform hover:-translate-y-0.5"
              >
                Start Your Upgrade
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="mt-6 rounded-2xl border border-background/20 bg-background/5 p-5">
                <div className="eyebrow text-background/60">14-Day Guarantee</div>
                <p className="mt-2 text-sm text-background/80">
                  Try it. Use it. Implement it. If you genuinely apply the framework and
                  don't believe it helped you execute with more clarity, we'll refund you
                  within 14 days. No interrogation. No guilt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="eyebrow text-background/60">Future upgrade path</div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {upgrade.map(([lvl, name, desc]) => (
              <div
                key={lvl}
                className="rounded-3xl border border-background/20 bg-background/5 p-6"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-accent">
                  {lvl}
                </div>
                <div className="mt-3 font-display text-2xl font-bold">{name}</div>
                <p className="mt-2 text-sm text-background/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- waitlist -------------------------------- */

function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const goal = formData.get("goal") as string;

    try {
      // Send to Systeme.io
      const response = await fetch(
        "https://api.systeme.io/api/v1/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "u9jtipq1l49i4kztcehwwc24ajhrtrpbv7886vwzcxi0qm9lgp2n40qr07hsieex",
          },
          body: JSON.stringify({
            email: email,
            first_name: goal || "Founder",
            custom_fields: {
              goal: goal,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-border bg-secondary/40"
    >
      <MetalPiece
        src={metal1}
        className="absolute -left-24 top-10 w-80 opacity-70 -rotate-12"
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-28 md:py-40">
        <div className="col-span-12 md:col-span-6">
          <Eyebrow>11 — Final Call</Eyebrow>
          <h2 className="mt-6 display-xl text-[clamp(2.5rem,6vw,5.5rem)]">
            Stop collecting productivity advice.
            <br />
            Start <span className="text-accent">collecting completed quests.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg text-foreground/80">
            Everything you've achieved started at Level 1. Everything you're dreaming
            about still does. Become the fastest version of yourself.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-background p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-3">
              <Mark className="h-10 w-10" />
              <div>
                <div className="eyebrow">Join Now</div>
                <div className="font-display text-xl font-bold">
                  The Top 1% Productivity System
                </div>
              </div>
            </div>
            {submitted ? (
              <div className="mt-8 flex flex-col items-start gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1 font-mono text-xs uppercase tracking-widest text-background">
                  <Check className="h-3 w-3" /> Quest accepted
                </div>
                <p className="text-lg font-medium">
                  You're in. Check your inbox — Level 1 is on its way.
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <label className="mt-8 block">
                  <span className="eyebrow">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@ready.to"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-4 text-base outline-none focus:border-foreground"
                  />
                </label>
                <label className="mt-4 block">
                  <span className="eyebrow">One goal you're speed-running</span>
                  <input
                    type="text"
                    name="goal"
                    placeholder="Ship my first product…"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-4 text-base outline-none focus:border-foreground"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-base font-medium font-cta text-background transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {loading ? "Joining..." : "Join The Top 1% Productivity System"}
                  {!loading && (
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </button>
                <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <Plus className="h-3 w-3" /> Launch pricing locked for founders — $97
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
    <footer id="faq" className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <img
            src={lvlLogo.url}
            alt="LVL 1"
            width={180}
            height={108}
            loading="lazy"
            className="h-16 w-auto select-none"
            draggable={false}
          />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The Top 1% Productivity System. Engineer execution. Level up faster.
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
      <TrustStrip />
      <Problem />
      <OS />
      <System />
      <Course />
      <Bonuses />
      <WhyItWorks />
      <Philosophy />
      <WhoFor />
      <Roadmap />
      <Offer />
      <Waitlist />
      <Footer />
    </div>
  );
}
