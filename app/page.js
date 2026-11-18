import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  Mail,
  MessageCircle,
  Send,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PortfolioGrid from "@/components/PortfolioGrid";
import SiteHeader from "@/components/SiteHeader";
import { showPortfolio } from "@/lib/site-config";

const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Interfaces accesibles, rápidas y adaptables a cualquier pantalla.",
    icon: Code2,
    tags: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Backend",
    description: "Lógica de negocio, servicios y comunicación entre sistemas.",
    icon: Server,
    tags: ["Node.js", "Express.js", "APIs REST", "Integraciones"],
  },
  {
    number: "03",
    title: "Datos & herramientas",
    description: "Estructuras mantenibles para construir y evolucionar productos.",
    icon: Database,
    tags: ["PostgreSQL", "MongoDB", "Git", "Docker"],
  },
];

const services = [
  {
    number: "01",
    title: "Desarrollo web Full Stack",
    description: "Aplicaciones web a medida, desde la interfaz hasta la lógica del servidor.",
    icon: Workflow,
    tags: ["Web apps", "Responsive", "Integración"],
  },
  {
    number: "02",
    title: "APIs y sistemas",
    description: "Servicios REST e integraciones para conectar productos y automatizar procesos.",
    icon: Braces,
    tags: ["REST", "Automatización", "Servicios"],
  },
  {
    number: "03",
    title: "Mejora y mantenimiento",
    description: "Optimización, nuevas funcionalidades y evolución de aplicaciones existentes.",
    icon: Sparkles,
    tags: ["Performance", "Soporte", "Evolución"],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader showPortfolio={showPortfolio} />
      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />

          <div className="section-shell hero-layout grid gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span className="status-dot" />
                INGENIERO DE SISTEMAS <i /> FULL STACK
              </p>
              <h1 className="hero-title">
                Convierto ideas en <span className="text-gradient">productos</span>
                <span className="hero-title-last">digitales.</span>
              </h1>
              <p className="hero-description">
                Soy <strong>Jorwi Garcia</strong>. Diseño y desarrollo experiencias web modernas que conectan lógica,
                rendimiento y una experiencia clara para las personas.
              </p>

              <div className="hero-actions">
                <a className="button-primary" href={showPortfolio ? "#portafolio" : "#servicios"}>
                  {showPortfolio ? "Explorar portafolio" : "Ver servicios"} <ArrowUpRight size={17} />
                </a>
                <a className="button-quiet" href="#contacto">
                  Hablemos <ArrowRight size={16} />
                </a>
              </div>

              <div className="hero-meta">
                <div className="hero-meta-icons" aria-hidden="true">
                  <span><Code2 size={15} /></span>
                  <span><Braces size={15} /></span>
                  <span><Database size={15} /></span>
                </div>
                <div>
                  <span className="meta-label">ENFOQUE</span>
                  <strong>Frontend · Backend · Producto</strong>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="Ilustración de código y desarrollo web" role="img">
              <div className="visual-ring visual-ring-one" />
              <div className="visual-ring visual-ring-two" />
              <div className="visual-core"><Braces size={47} strokeWidth={1.15} /></div>

              <div className="float-chip float-chip-left"><span className="chip-icon"><Code2 size={15} /></span> clean code</div>
              <div className="float-chip float-chip-right"><span className="chip-sparkle"><Sparkles size={15} /></span> ideas → producto</div>

              <div className="code-window">
                <div className="code-window-top">
                  <div className="window-dots"><i /><i /><i /></div>
                  <span>jorwi.dev <b>—</b> developer.js</span>
                  <span className="window-menu">•••</span>
                </div>
                <div className="code-content">
                  <div><span className="line-number">01</span><code><b>const</b> <em>developer</em> = {'{'}</code></div>
                  <div><span className="line-number">02</span><code className="code-indent"><b>mindset</b>: <i>&quot;solve real problems&quot;</i>,</code></div>
                  <div><span className="line-number">03</span><code className="code-indent"><b>frontend</b>: <i>&quot;thoughtful interfaces&quot;</i>,</code></div>
                  <div><span className="line-number">04</span><code className="code-indent"><b>backend</b>: <i>&quot;solid foundations&quot;</i>,</code></div>
                  <div><span className="line-number">05</span><code className="code-indent"><b>focus</b>: <i>&quot;continuous growth&quot;</i></code></div>
                  <div><span className="line-number">06</span><code>{'};'}</code></div>
                  <div className="code-blank"><span className="line-number">07</span><code /></div>
                  <div><span className="line-number">08</span><code><span className="code-purple">build</span>(<i>&quot;something meaningful&quot;</i>);</code></div>
                </div>
                <div className="code-window-footer">
                  <span><i /> READY TO BUILD</span>
                  <span>UTF-8&nbsp;&nbsp; JS</span>
                </div>
              </div>

              <div className="visual-caption"><span /> DESDE LA IDEA HASTA PRODUCCIÓN</div>
            </div>
          </div>

          <a className="scroll-cue" href="#sobre-mi" aria-label="Deslizar a la sección sobre mí">
            <span>DESLIZA PARA EXPLORAR</span><ArrowDownRight size={15} />
          </a>
        </section>

        <div className="ticker-strip" aria-label="Áreas de trabajo">
          <div className="ticker-track section-shell">
            <span>DESARROLLO WEB</span><i />
            <span>ARQUITECTURA DE SOFTWARE</span><i />
            <span>APIS & INTEGRACIONES</span><i />
            <span>EXPERIENCIAS DIGITALES</span><i />
          </div>
        </div>

        <section className="section about-section" id="sobre-mi">
          <div className="section-shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker"><span>01</span> SOBRE MÍ</p>
                <h2 className="section-title">Pienso en sistemas.<br /><span>Construyo soluciones.</span></h2>
              </div>
              <p className="section-intro">
                Tecnología con intención: decisiones claras, código mantenible y experiencias pensadas para las personas.
              </p>
            </div>

            <div className="about-grid grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
              <div className="about-statement">
                <div className="statement-icon"><Sparkles size={18} /></div>
                <span className="statement-label">MI FORMA DE VERLO</span>
                <p>Lo que está bien construido no solo funciona: también se entiende, se siente natural y puede crecer.</p>
                <div className="statement-signature"><span>JG</span><i /> INGENIERÍA CON PROPÓSITO</div>
                <div className="statement-orb" aria-hidden="true" />
              </div>

              <div className="about-copy">
                <p>
                  Como Ingeniero de Sistemas Full Stack, puedo abordar una solución de extremo a extremo: desde la
                  experiencia de usuario hasta la lógica de negocio y la integración de datos.
                </p>
                <p>
                  Me interesa crear productos digitales que resuelvan problemas reales con una base técnica sólida,
                  una interfaz cuidada y espacio para evolucionar.
                </p>
                <div className="about-highlights">
                  <div><span>01</span><strong>Visión integral</strong><small>De la interfaz a la infraestructura</small></div>
                  <div><span>02</span><strong>Enfoque práctico</strong><small>Soluciones claras y mantenibles</small></div>
                  <div><span>03</span><strong>Mejora continua</strong><small>Aprender, medir y evolucionar</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="habilidades">
          <div className="section-shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker"><span>02</span> HABILIDADES</p>
                <h2 className="section-title">Una base sólida.<br /><span>Un stack en evolución.</span></h2>
              </div>
              <p className="section-intro">
                Tecnologías de ejemplo para personalizar según tu experiencia. Sin porcentajes: las herramientas son parte de una solución, no una medida de impacto.
              </p>
            </div>

            <div className="skill-grid grid gap-4 md:grid-cols-3">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article className="skill-card" key={group.number}>
                    <div className="card-topline"><span>{group.number} / DISCIPLINA</span><Icon size={19} strokeWidth={1.6} /></div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <div className="skill-tags">
                      {group.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section services-section" id="servicios">
          <div className="section-shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker"><span>03</span> SERVICIOS</p>
                <h2 className="section-title">De un reto real<br /><span>a una solución útil.</span></h2>
              </div>
              <p className="section-intro">
                Acompañamiento técnico para convertir una necesidad en un producto digital claro, confiable y preparado para crecer.
              </p>
            </div>

            <div className="service-list">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-row" key={service.number}>
                    <span className="service-number">{service.number}</span>
                    <div className="service-icon"><Icon size={21} strokeWidth={1.6} /></div>
                    <div className="service-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="service-tags">
                      {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <a href="#contacto" aria-label={`Consultar por ${service.title}`}><ArrowUpRight size={19} /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {showPortfolio && (
          <section className="section portfolio-section" id="portafolio">
            <div className="section-shell">
              <div className="section-heading-row portfolio-heading">
                <div>
                  <p className="section-kicker"><span>04</span> PORTAFOLIO</p>
                  <h2 className="section-title">Trabajo que habla<br /><span>por sí mismo.</span></h2>
                </div>
                <p className="section-intro">
                  Espacios de ejemplo para tus casos de estudio. Añade el reto, tu solución, las tecnologías y los enlaces de cada proyecto.
                </p>
              </div>

              <PortfolioGrid />
              <div className="portfolio-footnote"><span /> Proyectos editables · Sustituye el contenido de ejemplo antes de publicar</div>
            </div>
          </section>
        )}

        <section className="section contact-section" id="contacto">
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-shell contact-layout grid gap-12 lg:grid-cols-[.84fr_1.16fr]">
            <div className="contact-copy">
              <p className="section-kicker"><span>{showPortfolio ? "05" : "04"}</span> CONTACTO</p>
              <h2 className="section-title">¿Tienes una idea?<br /><span>Hagámosla realidad.</span></h2>
              <p className="contact-description">
                Cuéntame qué quieres construir, mejorar o resolver. Estoy a un mensaje de distancia.
              </p>

              <div className="contact-methods">
                <a className="contact-method" href="mailto:jgjg.0503@gmail.com">
                  <span className="contact-method-icon"><Mail size={18} /></span>
                  <span><small>ESCRÍBEME</small><strong>jgjg.0503@gmail.com</strong></span>
                  <ArrowUpRight size={17} />
                </a>
                <a className="contact-method" href="https://wa.me/584169646008" target="_blank" rel="noopener noreferrer" aria-label="Escríbeme por WhatsApp">
                  <span className="contact-method-icon"><MessageCircle size={18} /></span>
                  <span><small>ESCRÍBEME POR WHATSAPP</small><strong>0416 964 6008</strong></span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="contact-availability"><span className="status-dot" /> CONTACTO DIRECTO</div>
            </div>

            <div className="contact-form-card">
              <div className="form-card-heading">
                <div><span className="form-card-index">01 / NUEVO MENSAJE</span><h3>Cuéntame tu proyecto</h3></div>
                <span className="form-decoration"><Send size={18} /></span>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="brand footer-brand" href="#inicio" aria-label="Volver al inicio">
            <span className="brand-mark">jg<span>.</span></span>
            <span className="brand-copy"><strong>JORWI GARCIA</strong><small>INGENIERO · FULL STACK</small></span>
          </a>
          <p>Diseñado para construir lo que sigue.</p>
          <a className="back-to-top" href="#inicio">VOLVER ARRIBA <ArrowUpRight size={14} /></a>
          <span className="footer-copyright">© {new Date().getFullYear()} Jorwi Garcia</span>
        </div>
      </footer>
    </>
  );
}
