import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Code2, ExternalLink, GitBranch, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from './services/api';
import { portfolio } from './data/portfolio';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import profileImage from './assets/profile-photo.jpeg';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(window.scrollY / scrollableHeight, 1);
        progressRef.current?.style.setProperty('--scroll-progress', progress);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}

function HomePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  usePageTitle('Deepak Omkar | Full-Stack Developer');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray('.section .reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34, rotateX: 2, transformPerspective: 1000 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 0.55,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [isLoaded]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const heroStats = useMemo(
    () => [
      { label: 'Open to Work', value: 'Available' },
      { label: 'Core Stack', value: 'React + Node.js' },
      { label: 'Focus', value: 'Product thinking' },
    ],
    []
  );

  const profileHighlights = useMemo(
    () => ['Full-Stack Developer', 'API & Backend Systems', 'Product Mindset'],
    []
  );

  if (!isLoaded) return <Loader />;

  return (
    <>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((prev) => !prev)} isScrolled={isScrolled} />

      <main>
        <section id="home" className="hero-section">
          <div className="background-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <motion.div className="hero-copy reveal" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
              <p className="eyebrow text-muted">Hi, I&apos;m {portfolio.profile.name}</p>
              <h1>
                Full-Stack Developer
                <span>Building scalable web applications</span>
              </h1>
              <p className="hero-lead">{portfolio.profile.tagline}</p>

              <div className="cta-row">
                <a href="#projects" className="button primary">View Projects <ArrowRight size={18} /></a>
                <a href={portfolio.profile.resumeUrl} className="button secondary" download="Deepak_Omkar_Resume.pdf">Download Resume</a>
              </div>

              <div className="availability-pill">
                <span className="status-dot" />
                Open to Work
              </div>

              <div className="mini-stats">
                {heroStats.map((item) => (
                  <div key={item.label} className="mini-stat-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="hero-visual reveal" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.1 }}>
              <HeroScene />
              <div className="profile-card">
                <div className="profile-image-shell">
                  <img src={profileImage} alt={portfolio.profile.name} />
                </div>
                <div className="profile-overlay">
                  <div className="profile-tag">Available for Opportunities</div>
                  <div className="profile-highlight-list">
                    {profileHighlights.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="container section">
          <div className="section-heading reveal">
            <p className="eyebrow text-muted">About</p>
            <h2>Full-stack engineer with product-thinking and clean execution.</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy reveal">
              <p>
                Motivated Computer Science Engineering graduate with a strong foundation in Python, SQL, and Java. Skilled in building academic projects,
                including CRUD-based systems and full-stack web applications. I enjoy turning ideas into working products by combining clean UI design,
                backend logic, and solid problem-solving.
              </p>
              <p>
                My focus is on developing reliable, user-friendly applications and learning through hands-on implementation. I&apos;m looking to contribute to
                impactful projects, grow as a software engineer, and build solutions that solve real user problems.
              </p>

              <div className="domains">
                {['Frontend', 'Backend', 'Database', 'API Development', 'Authentication', 'Deployment'].map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>

            <div className="stats-grid reveal">
              {portfolio.stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  {stat.hint ? <small>{stat.hint}</small> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section dark-panel">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow text-muted">Skills</p>
              <h2>Technology ecosystem built for product delivery.</h2>
            </div>

            <div className="skills-grid">
              {Object.entries(portfolio.skills).map(([category, items]) => (
                <div key={category} className="skill-card reveal">
                  <div className="skill-card-header">
                    <Code2 size={18} />
                    <h3>{category}</h3>
                  </div>
                  <div className="chip-row">
                    {items.map((item) => (
                      <span key={item} className="chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="container section">
          <div className="section-heading reveal">
            <p className="eyebrow text-muted">Projects</p>
            <h2>Product-focused work showing how I solve problems.</h2>
          </div>

          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <motion.article key={project.id} className="project-card reveal" whileHover={{ y: -8, rotateX: 2, rotateY: -1 }} transition={{ duration: 0.25 }}>
                <img src={project.image} alt={project.name} />
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.category || 'Product Engineering'}</span>
                    {project.featured ? <span className="featured-pill">Featured</span> : null}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.shortDescription}</p>
                  <div className="chip-row compact">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="chip">{tech}</span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <a href={project.githubUrl || '#'} target="_blank" rel="noreferrer" className="button small tertiary">GitHub</a>
                    <a href={project.liveUrl || '#'} target="_blank" rel="noreferrer" className="button small secondary">Live Demo</a>
                    <Link to={`/projects/${project.slug}`} className="button small primary">Case Study</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="section dark-panel">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow text-muted">Experience</p>
              <h2>Building product experience and technical depth.</h2>
            </div>

            <div className="timeline reveal">
              {portfolio.experience.map((item) => (
                <div key={item.company} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <div className="timeline-topline">
                      <div>
                        <h3>{item.company}</h3>
                        <p>{item.role}</p>
                      </div>
                      <span>{item.duration}</span>
                    </div>
                    <ul>
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                    <div className="chip-row compact">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="chip">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="container section">
          <div className="section-heading reveal">
            <p className="eyebrow text-muted">Education</p>
            <h2>Computer Science foundation with practical engineering focus.</h2>
          </div>

          <div className="education-grid reveal">
            {portfolio.education.map((item) => (
              <div key={item.degree} className="education-card">
                <GraduationCap size={22} />
                <h3>{item.degree}</h3>
                <p>{item.college}</p>
                <span>{item.year}</span>
                <ul>
                  {item.coursework.map((course) => <li key={course}>{course}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="section dark-panel">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow text-muted">Certifications</p>
              <h2>Continuous learning and technical curiosity.</h2>
            </div>

            <div className="cert-grid reveal">
              {portfolio.certifications.map((cert) => (
                <div key={cert.name} className="cert-card">
                  <BadgeCheck size={24} />
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <small>{cert.date}</small>
                  <small>{cert.credentialId}</small>
                  <a href={cert.verificationUrl} target="_blank" rel="noreferrer">Verification link</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container section contact-section">
          <div className="section-heading reveal">
            <p className="eyebrow text-muted">Contact</p>
            <h2>Let&apos;s build something meaningful.</h2>
          </div>

          <div className="contact-layout">
            <div className="contact-info reveal">
              <div className="info-row"><Mail size={18} /><a href="mailto:deepak.omkar1234@gmail.com">deepak.omkar1234@gmail.com</a></div>
              <div className="info-row"><Phone size={18} /><a href="tel:+919353965892">+91-9353965892</a></div>
              <div className="info-row"><MapPin size={18} /><span>Bengaluru, Karnataka</span></div>
              <div className="info-row"><GitBranch size={18} /><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div>
              <div className="info-row"><ExternalLink size={18} /><a href="https://www.linkedin.com/in/deepak-omkar-721436357/?isSelfProfile=true" target="_blank" rel="noreferrer">LinkedIn</a></div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <h3>{portfolio.profile.name}</h3>
            <p>{portfolio.profile.role}</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/deepak-omkar-721436357/?isSelfProfile=true" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:deepak.omkar1234@gmail.com">Email</a>
          </div>
          <p>© 2026 Deepak Omkar</p>
        </div>
      </footer>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    return newErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/contact', form);
      setStatus({ type: 'success', message: response.data.message || 'Message sent successfully.' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Something went wrong while submitting.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
          {errors.email && <small>{errors.email}</small>}
        </label>
      </div>

      <label>
        <span>Subject</span>
        <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Project inquiry" />
        {errors.subject && <small>{errors.subject}</small>}
      </label>

      <label>
        <span>Message</span>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="6" placeholder="Tell me about your opportunity or project." />
        {errors.message && <small>{errors.message}</small>}
      </label>

      {status.message ? <div className={`form-status ${status.type}`}>{status.message}</div> : null}

      <button type="submit" className="button primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = portfolio.projects.find((item) => item.slug === slug);

  usePageTitle(project ? `${project.name} | Deepak Omkar` : 'Project Not Found');

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <div className="case-study-shell">
      <div className="container case-study">
        <Link className="back-link" to="/">← Back to portfolio</Link>
        <header className="case-header">
          <p className="eyebrow text-muted">Project Case Study</p>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </header>

        <div className="case-image-wrap">
          <img src={project.image} alt={project.name} />
        </div>

        <div className="case-grid">
          <section>
            <h2>Overview</h2>
            <p>{project.description}</p>
          </section>
          <section>
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </section>
          <section>
            <h2>Features</h2>
            <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </section>
          <section>
            <h2>Architecture</h2>
            <pre>{project.architecture}</pre>
          </section>
          <section>
            <h2>Technology Stack</h2>
            <div className="chip-row">
              {project.technologies.map((tech) => <span key={tech} className="chip">{tech}</span>)}
            </div>
          </section>
          <section>
            <h2>Challenges</h2>
            <ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul>
          </section>
          <section>
            <h2>How I solved them</h2>
            <ul>{project.howSolved.map((point) => <li key={point}>{point}</li>)}</ul>
          </section>
          <section>
            <h2>Results</h2>
            <ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul>
          </section>
        </div>

        <div className="case-links">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="button primary">GitHub</a>
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button secondary">Live Demo</a>
        </div>
      </div>
    </div>
  );
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  usePageTitle('Admin Login');

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', form);
      localStorage.setItem('portfolio_admin_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell">
      <div className="container admin-login-wrap">
        <form className="admin-login" onSubmit={submit}>
          <p className="eyebrow text-muted">Admin Access</p>
          <h1>Login</h1>
          <label>
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          {error ? <div className="form-status error">{error}</div> : null}
          <button type="submit" className="button primary" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageTitle('Admin Dashboard');

  useEffect(() => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    Promise.all([
      api.get('/projects'),
      api.get('/contact'),
    ])
      .then(([projectsResponse, messagesResponse]) => {
        setProjects(projectsResponse.data);
        setMessages(messagesResponse.data);
      })
      .catch(() => {
        navigate('/admin');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    navigate('/admin');
  };

  if (loading) return <div className="container loading-wrap"><p>Loading dashboard...</p></div>;

  return (
    <div className="admin-shell">
      <div className="container admin-dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow text-muted">Admin Dashboard</p>
            <h1>Portfolio Control Center</h1>
          </div>
          <button type="button" className="button secondary" onClick={logout}>Logout</button>
        </header>

        <div className="dashboard-grid">
          <section className="admin-panel">
            <h2>Projects</h2>
            <ul>{projects.map((project) => <li key={project.id}>{project.name}</li>)}</ul>
          </section>
          <section className="admin-panel">
            <h2>Messages</h2>
            <ul>{messages.map((message) => <li key={message.id}>{message.name}: {message.subject}</li>)}</ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  usePageTitle('404 — Page Not Found');

  return (
    <div className="not-found-shell">
      <div className="container not-found">
        <p className="eyebrow text-muted">404</p>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="button primary">Back to Home</Link>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
