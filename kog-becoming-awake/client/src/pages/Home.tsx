/**
 * KOG Design Reminder — Sanctuary Editorial:
 * Use spacious editorial chapters, warm ivory and Kingdom Mineral fields, a DM Serif/Manrope hierarchy,
 * fine index rules, cropped imagery, and measured interactions that feel like invitations rather than marketing.
 */
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "Practice", href: "#practice" },
  { label: "Journal", href: "#journal" },
];

function HorizonMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`horizon-mark${compact ? " horizon-mark--compact" : ""}`} aria-hidden="true">
      <span className="horizon-mark__sun" />
      <span className="horizon-mark__glint" />
      <span className="horizon-mark__line" />
    </span>
  );
}

function KogWordmark() {
  return (
    <span className="kog-wordmark" aria-label="KOG">
      <span>K</span>
      <span className="kog-wordmark__o" aria-hidden="true"><span /></span>
      <span>G</span>
    </span>
  );
}

function ArrowLink({ children, href = "#journal", inverse = false }: { children: React.ReactNode; href?: string; inverse?: boolean }) {
  return (
    <a className={`arrow-link${inverse ? " arrow-link--inverse" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowDownRight size={18} strokeWidth={1.7} />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const closeMenu = () => setMenuOpen(false);

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setSubscriptionMessage("Enter an email to prepare your subscription.");
      return;
    }
    setSubscriptionMessage("Thank you for your interest. The first issue is taking shape.");
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="KOG home" onClick={closeMenu}>
          <HorizonMark />
          <KogWordmark />
          <span className="brand-lockup__descriptor">Kingdom of God</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} className="nav-link">{item.label}</a>)}
          <a href="#contact" className="nav-link nav-link--accent">Join in</a>
        </nav>

        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} strokeWidth={1.6} /> : <Menu size={23} strokeWidth={1.6} />}
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <span className="eyebrow eyebrow--light">KOG / Index</span>
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href} onClick={closeMenu} style={{ transitionDelay: `${80 + index * 55}ms` }}>
            {item.label}<ArrowUpRight size={23} strokeWidth={1.3} />
          </a>
        ))}
        <a href="#contact" onClick={closeMenu} style={{ transitionDelay: "245ms" }}>Join in<ArrowUpRight size={23} strokeWidth={1.3} /></a>
      </div>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-art" role="img" aria-label="A group sharing a meal and conversation" />
          <div className="hero-wash" />
          <div className="hero-meta eyebrow eyebrow--light">KOG / A community in the making</div>
          <div className="hero-content">
            <p className="hero-kicker">There is more to this life.</p>
            <h1 id="hero-title">The Kingdom is<br /><em>closer</em> than we think.</h1>
            <div className="hero-bottom-line">
              <p>A faith-centered community for noticing, receiving, and practicing what is already breaking in.</p>
              <ArrowLink href="#vision" inverse>Explore the way</ArrowLink>
            </div>
          </div>
          <span className="hero-issue">01 / 04</span>
          <a className="scroll-cue" href="#vision" aria-label="Scroll to vision"><span>Scroll to enter</span><span className="scroll-cue__line" /></a>
        </section>

        <section className="vision-section section-rule" id="vision" aria-labelledby="vision-title">
          <div className="section-index"><span>01</span><span>Vision</span></div>
          <div className="vision-layout">
            <div className="vision-lead">
              <p className="eyebrow">A way of life, practiced together</p>
              <h2 id="vision-title">What if belonging were less about fitting in, and more about <em>becoming awake?</em></h2>
            </div>
            <div className="vision-copy">
              <p>KOG is a gathering of people who are learning to pay attention: to God, to one another, and to the life that is right in front of us.</p>
              <p>We are drawn to the kind of faith that makes room at the table, carries hope into ordinary places, and looks like good news from the inside out.</p>
              <ArrowLink href="#practice">Read our practices</ArrowLink>
            </div>
          </div>
        </section>

        <section className="image-feature-section" aria-label="A shared table">
          <div className="image-feature image-feature--table">
            <div className="image-feature__shade" />
            <div className="image-feature__caption"><span className="eyebrow eyebrow--light">A common table</span><p>Come as you are. Stay for what grows between us.</p></div>
          </div>
          <div className="image-feature-note"><span>Not a program.</span><span>A people learning a new way.</span></div>
        </section>

        <section className="practice-section section-rule" id="practice" aria-labelledby="practice-title">
          <div className="section-index"><span>02</span><span>Practice</span></div>
          <div className="practice-heading"><p className="eyebrow">A shared rule of life</p><h2 id="practice-title">Small things, faithfully held.</h2></div>
          <div className="practice-list">
            <article className="practice-item"><span className="practice-number">01</span><div><h3>Make room</h3><p>Pause long enough to notice who and what is asking to be seen.</p></div><span className="practice-symbol">+</span></article>
            <article className="practice-item"><span className="practice-number">02</span><div><h3>Eat together</h3><p>Practice a table big enough for stories, questions, and unexpected guests.</p></div><span className="practice-symbol">+</span></article>
            <article className="practice-item"><span className="practice-number">03</span><div><h3>Be good news</h3><p>Carry the peace, justice, and repair we hope to see into the places we already live.</p></div><span className="practice-symbol">+</span></article>
          </div>
        </section>

        <section className="manifesto-section" aria-labelledby="manifesto-title">
          <div className="manifesto-figure" role="img" aria-label="A shared work table" />
          <div className="manifesto-panel">
            <span className="eyebrow eyebrow--light">The work of hope</span>
            <h2 id="manifesto-title">The holy is not somewhere else.</h2>
            <p>It is in the neighbour, the street, the meal, the work in your hands. We begin there.</p>
            <ArrowLink href="#contact" inverse>Find your place</ArrowLink>
            <HorizonMark compact />
          </div>
        </section>

        <section className="journal-section section-rule" id="journal" aria-labelledby="journal-title">
          <div className="section-index"><span>03</span><span>Journal</span></div>
          <div className="journal-layout">
            <div><p className="eyebrow">Notes from the threshold</p><h2 id="journal-title">A small letter for a larger life.</h2></div>
            <div className="journal-form-wrap" id="contact">
              <p>Receive occasional reflections, conversations, and practical ways to keep making room.</p>
              <form className="journal-form" onSubmit={handleSubscribe} noValidate>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input id="email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
                <button type="submit" aria-label="Prepare subscription"><ArrowUpRight size={20} strokeWidth={1.6} /></button>
              </form>
              <p className="form-note">{subscriptionMessage || "The journal opens with KOG’s first season."}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="footer-brand" href="#top" aria-label="Back to top"><HorizonMark /><KogWordmark /></a>
          <p>Kingdom of God<br />A community in the making.</p>
        </div>
        <div className="footer-links"><a href="#vision">Vision</a><a href="#practice">Practice</a><a href="#journal">Journal</a><a href="#top">Instagram</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} KOG</span><span>Made for the everyday holy.</span></div>
      </footer>
    </div>
  );
}
