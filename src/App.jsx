import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#story' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Contact', href: '#contact' },
];

const collectionCards = [
  {
    number: '01',
    title: 'The Everyday Edit',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    alt: 'Model in a minimal neutral-toned outfit standing outdoors',
  },
  {
    number: '02',
    title: 'Occasion Wear',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    alt: 'Elegant woman in evening dress with sophisticated styling',
  },
  {
    number: '03',
    title: 'The Statement Collection',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    alt: 'Fashion model in a dramatic red ensemble against an editorial backdrop',
  },
];

const lookbookImages = [
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const revealItems = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const startHeroVideo = () => {
    const video = heroVideoRef.current;

    if (!video) return;

    video.play().catch(() => {
      setHeroVideoFailed(true);
      setHeroVideoPlaying(false);
    });
  };

  return (
    <div className="page-shell">
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav container" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="Maison Élan home">
            MAISON ÉLAN
          </a>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>

          <button className="bag-button" aria-label="Shopping bag">
            <span>Bag</span>
            <span className="bag-icon">⌂</span>
          </button>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          {heroVideoFailed && <div className="hero-fallback" aria-hidden="true" />}
          <video
            ref={heroVideoRef}
            className={`hero-video ${heroVideoPlaying ? 'is-playing' : ''} ${
              heroVideoFailed ? 'has-failed' : ''
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={startHeroVideo}
            onPlaying={() => {
              setHeroVideoFailed(false);
              setHeroVideoPlaying(true);
            }}
            onError={() => {
              setHeroVideoFailed(true);
              setHeroVideoPlaying(false);
            }}
          >
            <source src="/videos/boutique-3d.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-content container reveal" style={{ animationDelay: '0.12s' }}>
            <p className="eyebrow">THE ART OF DRESSING BEAUTIFULLY</p>
            <h1>
              Wear Your
              <span>Own Story.</span>
            </h1>
            <p className="hero-copy">
              Discover thoughtfully curated styles that celebrate your individuality,
              your confidence, and every moment that makes you unique.
            </p>
            <div className="cta-group">
              <a href="#collections" className="btn primary">
                EXPLORE THE COLLECTION
              </a>
              <a href="#story" className="text-link">
                DISCOVER OUR WORLD
              </a>
            </div>
          </div>
        </section>

        <section id="collections" className="collection-section container reveal">
          <div className="section-header">
            <p className="section-kicker">DRESSED IN YOUR ELEMENT</p>
            <h2>Pieces that feel like you. Styles that stay with you.</h2>
          </div>

          <div className="editorial-grid">
            {collectionCards.map((card) => (
              <article key={card.title} className="collection-card">
                <div className="image-wrap">
                  <img src={card.image} alt={card.alt} loading="lazy" />
                </div>
                <div className="card-meta">
                  <span>{card.number}</span>
                  <h3>{card.title}</h3>
                  <span className="arrow">→</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="story-section container reveal">
          <div className="story-visual">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury fashion portrait of a woman in a refined editorial pose"
              loading="lazy"
            />
          </div>
          <div className="story-copy">
            <p className="section-kicker">OUR STORY</p>
            <h2>MORE THAN WHAT YOU WEAR.</h2>
            <p>
              Style is personal. It is found in the details, expressed through
              confidence, and remembered long after the moment has passed.
            </p>
            <p>
              Discover a collection designed to make every occasion feel like your own.
            </p>
          </div>
        </section>

        <section className="campaign reveal">
          <div className="campaign-overlay" aria-hidden="true" />
          <div className="container campaign-inner">
            <p className="section-kicker">LIMITED EDIT</p>
            <h2>MAKE EVERY ENTRANCE COUNT.</h2>
            <p>
              Find the pieces that turn ordinary moments into something unforgettable.
            </p>
            <a href="#lookbook" className="btn primary light">
              EXPLORE THE LOOKBOOK
            </a>
          </div>
        </section>

        <section id="lookbook" className="lookbook-section container reveal">
          <div className="section-header narrow">
            <p className="section-kicker">LOOKBOOK</p>
            <h2>Curated moments, beautifully lived.</h2>
          </div>
          <div className="lookbook-grid">
            {lookbookImages.map((src, index) => (
              <figure key={`${src}-${index}`} className={`lookbook-item item-${index + 1}`}>
                <img src={src} alt="Editorial fashion photography" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section container reveal">
          <div className="contact-copy">
            <p className="section-kicker">WELCOME IN</p>
            <h2>YOUR NEXT FAVOURITE LOOK STARTS HERE.</h2>
            <p>
              Explore the collection and find a style that feels unmistakably yours.
            </p>
          </div>
          <div className="contact-actions">
            <a href="#collections" className="btn primary">
              EXPLORE COLLECTION
            </a>
            <a href="https://wa.me/15551234567" className="btn secondary" target="_blank" rel="noreferrer">
              GET IN TOUCH
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
