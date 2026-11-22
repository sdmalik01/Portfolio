"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const ThreeHero = dynamic(() => import("./ThreeHero"), { ssr: false });
const CloudScene = dynamic(() => import("./CloudScene"), { ssr: false });

const image = (name: string) => `/images/${encodeURIComponent(name)}`;

const projects = [
  {
    number: "001",
    type: "AEROSPACE",
    title: "MGMUCanSat",
    status: "COMPETITION / 2026",
    description: "An autonomous CanSat architecture for stabilization, real-time telemetry, environmental sensing and controlled recovery.",
    tags: ["STM32", "BNO055", "BMP388", "XBee"],
  },
  {
    number: "002",
    type: "AUTONOMY",
    title: "NIDAR",
    status: "IN DEVELOPMENT / 2026",
    description: "A scout-and-delivery drone system for flood response, aerial perception and autonomous target handoff.",
    tags: ["ROS2", "Computer Vision", "GCS"],
  },
  {
    number: "003",
    type: "STRATOSPHERE",
    title: "HAPS",
    status: "CONCEPT DEVELOPMENT",
    description: "A high-altitude pseudo-satellite platform for persistent surveillance and communication relay.",
    tags: ["Airframe", "Propulsion", "Solar", "Payload"],
  },
  {
    number: "004",
    type: "HEALTHCARE",
    title: "Rehabilitation Wearable",
    status: "PATENT-ORIENTED / 2025–26",
    description: "A multi-sensor wearable ecosystem for continuous motion, vital-sign and rehabilitation monitoring.",
    tags: ["ESP32", "MPU6050", "MAX30102"],
  },
  {
    number: "005",
    type: "RESEARCH",
    title: "STELLAR",
    status: "MANUSCRIPT / IEEE",
    description: "A hybrid AI approach combining transformer semantics, NLP and mathematical fusion for misinformation verification.",
    tags: ["Python", "Transformers", "NLP"],
  },
];

export default function Portfolio() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setLoaderDone(true);
      return;
    }

    const timer = window.setTimeout(() => setLoaderDone(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          },
        );
      });
    }, root);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loaderDone]);

  useEffect(() => {
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={root} className="site-shell">
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="scroll-trace" aria-hidden="true"><span /></div>
      <div className="hud-frame" aria-hidden="true">
        <i className="hud-frame__corner hud-frame__corner--tl" />
        <i className="hud-frame__corner hud-frame__corner--tr" />
        <i className="hud-frame__corner hud-frame__corner--bl" />
        <i className="hud-frame__corner hud-frame__corner--br" />
        <i className="hud-frame__line hud-frame__line--top" />
        <i className="hud-frame__line hud-frame__line--bottom" />
      </div>
      <AnimatePresence>
        {!loaderDone && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
            <div className="loader__grid" />
            <div className="loader__orb"><span /></div>
            <div className="loader__copy">
              <p>CAPTAIN SYNDROME ARCHIVE</p>
              <h2>SYSTEM BOOT</h2>
              <div className="loader__line"><motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.35 }} /></div>
              <div className="loader__meta"><span>IDENTITY VERIFIED</span><b>100</b></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="nav">
        <a className="nav__brand" href="#top" aria-label="Back to top">
          <span>CS</span><b>CAPTAIN<br />SYNDROME</b>
        </a>
        <button className="nav__toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav__links nav__links--open" : "nav__links"} aria-label="Primary navigation">
          {["About", "Missions", "Research", "Leadership", "Journey", "Future", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__stars" />
          <div className="hero__clouds" />
          <div className="hero__clouds3d"><CloudScene /></div>
          <div className="hero__three"><ThreeHero /></div>
          <div className="hero__content">
            <p className="eyebrow"><span /> ENGINEERING THE UNEXPECTED · INDIA</p>
            <h1><span>SAYYAD</span><strong>MALIK</strong></h1>
            <div className="hero__statement">
              <p>I BUILD THINGS THAT THINK.</p>
              <b>AND DREAM THINGS THAT FLY.</b>
            </div>
          </div>
          <div className="hero__hud hero__hud--left">
            <span>29.91° N</span><span>75.20° E</span><span>AEROSPACE / 001</span>
          </div>
          <div className="hero__hud hero__hud--right">
            <b>ACTIVE</b><span>OBSERVATION</span><span>SYSTEMS ONLINE</span>
          </div>
          <a className="hero__discover" href="#about"><span>↓</span> DISCOVER THE ARCHIVE</a>
        </section>

        <section className="identity" id="about">
          <div className="section-index" data-reveal><span>01</span><b>ORIGIN</b></div>
          <div className="identity__portrait" data-reveal>
            <Image src={image("WhatsApp Image 2026-11-22 at 5.59.43 PM (1).jpeg")} alt="Sayyad Malik outdoors" fill sizes="(max-width: 700px) 90vw, 42vw" />
            <div className="portrait__label">PERSON 001 / SAYYAD MALIK</div>
          </div>
          <div className="identity__copy" data-reveal>
            <p className="eyebrow">THE HUMAN BEHIND THE HARDWARE</p>
            <h2>CAPTAIN<br /><i>SYNDROME</i></h2>
            <p>I have never been particularly interested in staying inside the boundaries of what already exists. I am fascinated by systems that need to become smarter, machines that need to become autonomous, and environments where engineering becomes significantly harder.</p>
            <p>I learn by building. I grow by competing. I lead by creating opportunities for others.</p>
            <div className="identity__domains">
              {["AUTONOMY", "AEROSPACE", "ROBOTICS", "AI", "RESEARCH", "SPACE"].map((domain) => <span key={domain}>{domain}</span>)}
            </div>
          </div>
        </section>

        <section className="missions" id="missions">
          <div className="section-heading" data-reveal>
            <div className="section-index"><span>02</span><b>MISSION LOG</b></div>
            <h2>SELECTED<br /><i>EXPERIMENTS</i></h2>
          </div>
          <div className="mission-grid">
            {projects.map((project, index) => (
              <motion.article
                className={`mission mission--${index + 1}`}
                key={project.number}
                data-reveal
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mission__visual">
                  <span className="mission__number">{project.number}</span>
                  {index === 0 && <Image src={image("WhatsApp Image 2026-11-22 at 5.59.44 PM (7).jpeg")} alt="MGMU CanSat team emblem" fill sizes="(max-width: 700px) 100vw, 60vw" />}
                  {index === 1 && <Image src={image("WhatsApp Image 2026-11-22 at 5.59.44 PM (2).jpeg")} alt="Drone prototype in hand" fill sizes="(max-width: 700px) 100vw, 60vw" />}
                  {index === 2 && <Image src={image("WhatsApp Image 2026-11-22 at 5.59.44 PM (3).jpeg")} alt="Hexacopter in flight" fill sizes="(max-width: 700px) 100vw, 60vw" />}
                  {index === 3 && <Image src={image("WhatsApp Image 2026-11-22 at 5.59.44 PM (8).jpeg")} alt="Embedded project hardware" fill sizes="(max-width: 700px) 100vw, 60vw" />}
                  {index === 4 && <Image src={image("WhatsApp Image 2026-11-22 at 5.59.43 PM (4).jpeg")} alt="Engineering presentation" fill sizes="(max-width: 700px) 100vw, 60vw" />}
                  <div className="mission__scan" />
                </div>
                <div className="mission__body">
                  <p>{project.type} <span>{project.status}</span></p>
                  <h3>{project.title}</h3>
                  <div className="mission__rule" />
                  <p>{project.description}</p>
                  <div className="mission__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="research" id="research">
          <div className="section-index" data-reveal><span>03</span><b>RESEARCH ARCHIVE</b></div>
          <div className="research__heading" data-reveal>
            <p className="eyebrow">PAPERS / PATENTS / ONGOING WORK</p>
            <h2>INTELLIGENCE,<br /><i>DOCUMENTED.</i></h2>
          </div>
          <div className="research__grid">
            {[
              ["01", "Enhanced Hybrid AI Fake News Detection System", "Submitted to IEEE Xplore; accepted for presentation at an international information technology conference, China."],
              ["02", "IoT-Based Smart Sustainable Food & Famine Management", "Published on the IRDCP platform, covering real-time monitoring and food-security systems."],
              ["03", "Individualized Stroke Rehabilitation Support", "Ongoing research on adaptive AI therapy, wearable sensing and rehabilitation support."],
              ["04", "Autonomous Descent & Recovery Architecture", "Patent application in process for the CanSat dual descent and recovery architecture."],
            ].map(([number, title, copy]) => (
              <article key={number} data-reveal>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="leadership" id="leadership">
          <div className="leadership__image" data-reveal>
            <Image src={image("WhatsApp Image 2026-11-22 at 5.59.43 PM (6).jpeg")} alt="Student leadership team" fill sizes="(max-width: 700px) 100vw, 58vw" />
          </div>
          <div className="leadership__copy" data-reveal>
            <div className="section-index"><span>04</span><b>COMMUNITY</b></div>
            <h2>BUILD PEOPLE.<br /><i>BUILD TECH.</i></h2>
            <p>I do not only want to build technology. I want to build environments where people can build technology together.</p>
            <ul>
              <li><b>GDG on Campus</b><span>Lead · MGM University</span></li>
              <li><b>IEEE Student Branch</b><span>Special Interest Group Head</span></li>
              <li><b>NSS Chapter</b><span>260+ student volunteers coordinated</span></li>
            </ul>
          </div>
        </section>

        <section className="journey" id="journey">
          <div className="section-heading" data-reveal>
            <div className="section-index"><span>05</span><b>TRAJECTORY</b></div>
            <h2>THE JOURNEY<br /><i>SO FAR</i></h2>
          </div>
          <div className="timeline">
            {[
              ["2024", "BEGINNING", "Started an engineering journey across IT, research, communities and technical exploration."],
              ["2025", "BUILDING", "Joined IIT Mandi minor programmes, expanded research work and entered student leadership."],
              ["2026", "GOING AIRBORNE", "CanSat, NIDAR, HAPS, robotics and autonomous-systems work enter a national competitive arena."],
              ["2027—28", "NEXT TRAJECTORY", "Advanced research, publications, aerospace systems and preparation for the next engineering frontier."],
            ].map(([year, title, copy]) => (
              <article key={year} data-reveal>
                <span>{year}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="future" id="future">
          <div className="future__horizon" />
          <div className="future__copy" data-reveal>
            <div className="section-index"><span>06</span><b>DESTINATION</b></div>
            <p className="eyebrow">BEYOND THE ATMOSPHERE</p>
            <h2>I WANT TO ENGINEER<br />SYSTEMS THAT CAN<br /><i>THINK INDEPENDENTLY.</i></h2>
            <p>My direction is aerospace engineering, flight autonomy, space robotics, HAPS and intelligent machines for environments too difficult or distant for humans to reach alone.</p>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__main" data-reveal>
            <div className="section-index"><span>07</span><b>CONNECTION</b></div>
            <p className="eyebrow">THE NEXT MISSION MAY BEGIN WITH A CONVERSATION.</p>
            <h2>LET&apos;S BUILD<br /><i>THE UNEXPECTED.</i></h2>
            <a className="contact__email" href="mailto:sdmalikwork01@gmail.com">sdmalikwork01@gmail.com <span>↗</span></a>
          </div>
          <div className="contact__links" data-reveal>
            <a href="https://github.com/sdmalik01" target="_blank" rel="noreferrer">GITHUB <span>↗</span></a>
            <a href="https://linkedin.com/in/sayyad-malik" target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a>
            <a href="https://www.instagram.com/captain.syndrome/" target="_blank" rel="noreferrer">INSTAGRAM <span>↗</span></a>
            <a href="/resume/MalikUpdatedCV.pdf" target="_blank" rel="noreferrer">DOWNLOAD CV <span>↓</span></a>
          </div>
        </section>
      </main>

      <footer>
        <b>CAPTAIN SYNDROME</b>
        <span>© 2026 · SAYYAD MALIK</span>
      </footer>
    </div>
  );
}
