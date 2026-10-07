import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Clock3, MapPin,
  Menu, Phone, Star, Utensils, X,
} from 'lucide-react';

const ADDRESS = 'Plot no. 1739, Opp Ramdev Plus Apartment, Near Anmol Bakery, Opp Lane Bakrol Square, Near Sama Hostel, Vallabh Vidyanagar, Anand, Gujarat 388315';
const PHONE = 'tel:09725537075';
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const images = {
  biryani: '/bethak-hero.jpg',
  thali: '/bethak-thali.jpg',
  ambience: '/bethak-ambience.jpg',
};

const navItems = [
  ['Home', '#home'], ['Our Food', '#food'], ['About', '#about'],
  ['Reviews', '#reviews'], ['Gallery', '#gallery'], ['Visit Us', '#visit'],
];

const galleryItems = [
  { src: images.biryani, alt: 'Illustrative editorial image of matka biryani', label: 'Matka biryani' },
  { src: images.thali, alt: 'Illustrative editorial image of a Gujarati thali', label: 'Gujarati thali' },
  { src: images.ambience, alt: 'Illustrative editorial image of warm Indian cafe ambience', label: 'Cafe atmosphere' },
  { src: images.thali, alt: 'Illustrative editorial image representing Indian dining', label: 'Indian dining' },
  { src: images.biryani, alt: 'Illustrative editorial image representing Kathiyawadi food', label: 'Kathiyawadi food' },
  { src: images.ambience, alt: 'Illustrative editorial image of a dinner setting', label: 'Dinner setting' },
];

function SectionHeading({ tag, children, detail }: { tag: string; children: ReactNode; detail?: string }) {
  return <div className="mb-10 md:mb-14"><span className="eyebrow">{tag}</span><h2 className="section-title mt-5 max-w-3xl">{children}</h2>{detail && <p className="mt-5 max-w-xl text-[.98rem] leading-7 text-[#756b5e]">{detail}</p>}</div>;
}

function ActionLink({ href, children, dark = false, className = '' }: { href: string; children: ReactNode; dark?: boolean; className?: string }) {
  return <a href={href} className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-ring ${dark ? 'bg-[#2b241e] text-[#f8f0df] hover:bg-[#45362b]' : 'bg-[#a84f33] text-[#fff5e3] hover:bg-[#8f402a]'} ${className}`}>{children}</a>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.title = 'BETHAK THE CAFE & RESTRO | Matka Biryani & Gujarati Thali in Anand';
    const description = 'Visit BETHAK THE CAFE & RESTRO in Vallabh Vidyanagar, Anand for signature matka biryani, Gujarati thali, Kathiyawadi food and fast-food options.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'BETHAK THE CAFE & RESTRO',
      description: 'Versatile cafe and restaurant serving signature matka biryani and Gujarati thali. Fast foods, kathiyawadi dinner lunch.',
      telephone: '+91-9725537075',
      priceRange: '₹1–200 per person (approximate)',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot no. 1739, Opp Ramdev Plus Apartment, Near Anmol Bakery, Opp Lane Bakrol Square, Near Sama Hostel',
        addressLocality: 'Vallabh Vidyanagar, Anand',
        addressRegion: 'Gujarat',
        postalCode: '388315',
        addressCountry: 'IN',
      },
    };
    let schema = document.querySelector<HTMLScriptElement>('script[data-bethak-schema]');
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.bethakSchema = 'true';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);
  }, []);

  useEffect(() => {
    if (activeImage === null) {
      galleryTriggerRef.current?.focus();
      return;
    }
    if (!document.querySelector('[role="dialog"]')) return;
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') setActiveImage((activeImage + 1) % galleryItems.length);
      if (event.key === 'ArrowLeft') setActiveImage((activeImage + galleryItems.length - 1) % galleryItems.length);
      if (event.key === 'Tab') {
        const controls = document.querySelectorAll<HTMLElement>('[role="dialog"] button');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell min-h-[100dvh] bg-[#f6f0e3] text-[#302820]">
      <header className={`header fixed inset-x-0 top-0 z-40 ${scrolled ? 'scrolled' : 'bg-[#211b16]/30'}`}>
        <nav aria-label="Main navigation" className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 ${scrolled ? 'h-[68px]' : 'h-[82px]'} transition-all`}>
          <a href="#home" aria-label="BETHAK home" className="group leading-none text-[#fff5e3] focus-ring">
            <span className={`serif block text-[1.52rem] font-bold tracking-[.14em] ${scrolled ? 'text-[#33291f]' : ''}`}>BETHAK</span>
            <span className={`mt-1 block text-[.54rem] font-semibold tracking-[.22em] ${scrolled ? 'text-[#765f4a]' : 'text-[#f5d7a7]'}`}>THE CAFE &amp; RESTRO</span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(([name, href]) => <a key={name} href={href} className={`text-[.76rem] font-semibold tracking-wide transition hover:text-[#cf8a52] focus-ring ${scrolled ? 'text-[#4f4438]' : 'text-[#f8f0df]'}`}>{name}</a>)}
          </div>
          <div className="hidden lg:block"><a href={PHONE} className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 focus-ring ${scrolled ? 'bg-[#a84f33] text-[#fff5e3]' : 'border border-white/45 text-white hover:bg-white/10'}`}><Phone size={15} /> Call Now</a></div>
          <div className="flex items-center gap-3 lg:hidden">
            <a aria-label="Call BETHAK" href={PHONE} className={`grid size-10 place-items-center rounded-full ${scrolled ? 'bg-[#a84f33] text-white' : 'border border-white/40 text-white'}`}><Phone size={17} /></a>
            <button type="button" data-testid="button-toggle-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} className={`grid size-10 place-items-center rounded-full focus-ring ${scrolled ? 'text-[#33291f]' : 'text-white'}`}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
          </div>
        </nav>
        {menuOpen && <div id="mobile-menu" className="menu-panel absolute inset-x-0 top-full border-t border-[#dfd1bd] bg-[#f8f2e7] px-5 pb-5 pt-2 shadow-xl lg:hidden">
          {navItems.map(([name, href]) => <a key={name} href={href} onClick={closeMenu} className="flex min-h-12 items-center border-b border-[#e7dccb] text-sm font-semibold text-[#3e3429] focus-ring">{name}<ArrowUpRight className="ml-auto" size={15} /></a>)}
          <a href={PHONE} onClick={closeMenu} className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#a84f33] font-semibold text-white"><Phone size={16} /> Call Now</a>
        </div>}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[720px] items-end overflow-hidden bg-[#211a15] pb-16 pt-28 text-[#fff5e3] md:min-h-[790px] md:items-center md:pb-12">
          <img className="hero-visual absolute inset-0 h-full w-full object-cover object-[58%_center]" src={images.biryani} alt="Illustrative editorial food photograph of a matka biryani, not a BETHAK restaurant photograph" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1712]/90 via-[#201a15]/65 to-[#231a12]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241b14]/65 via-transparent to-[#211a15]/15" />
          <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-8 md:px-10 md:pb-0">
            <div className="max-w-[720px]">
              <div className="reveal inline-flex items-center gap-3 rounded-full border border-white/30 bg-[#fff8eb]/10 px-4 py-2 text-[.67rem] font-semibold uppercase tracking-[.17em] backdrop-blur-sm"><span className="size-1.5 rounded-full bg-[#e1a65a]" /> VALLABH VIDYANAGAR · ANAND</div>
              <h1 className="reveal reveal-delay-1 mt-7"><span className="serif block text-[clamp(4.3rem,13vw,8.8rem)] font-semibold leading-[.83] tracking-[-.065em]">BETHAK</span><span className="mt-4 block text-[.76rem] font-semibold tracking-[.34em] text-[#f1c77f] md:text-sm">THE CAFE &amp; RESTRO</span></h1>
              <h2 className="serif reveal reveal-delay-2 mt-9 max-w-2xl text-[clamp(2.5rem,5.3vw,4.5rem)] leading-[1.08] tracking-[-.035em]">A Taste Worth<br className="hidden sm:block" /> Coming Back For</h2>
              <p className="reveal reveal-delay-2 mt-5 max-w-[565px] text-[.97rem] leading-7 text-[#f2e8d6]/90 md:text-[1.05rem]">From signature matka biryani and Gujarati thali to fast food and Kathiyawadi favourites, discover a versatile dining experience in Vallabh Vidyanagar.</p>
              <div className="reveal reveal-delay-2 mt-8 flex flex-wrap gap-3">
                <ActionLink href="#food"><span>Explore Our Food</span><ArrowDownRight size={17} /></ActionLink>
                <ActionLink href={MAPS} dark><span>Get Directions</span><ArrowUpRight size={16} /></ActionLink>
              </div>
              <a href={PHONE} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#f2dfbc] underline decoration-white/35 underline-offset-4 hover:text-white focus-ring"><Phone size={14} /> Call Now · 097255 37075</a>
            </div>
          </div>
          <div className="absolute bottom-8 right-10 hidden items-center gap-3 text-[.62rem] uppercase tracking-[.19em] text-white/70 md:flex"><span className="h-px w-12 bg-white/50" /> A place to gather</div>
        </section>

        <section aria-label="Restaurant highlights" className="relative z-10 -mt-1 bg-[#e8dfce]">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-[#cfc1ad] px-5 py-7 md:grid-cols-4 md:px-10 md:py-8">
            {[
              ['SIGNATURE', 'Matka Biryani'],
              ['GUJARATI', 'Thali'],
              ['₹1–200', 'Approx. per person'],
              ['VALLABH VIDYANAGAR', 'Anand'],
            ].map(([label, value]) => <div key={label} className="px-4 py-2 first:pl-0 md:px-7"><div className="text-[.61rem] font-bold tracking-[.15em] text-[#a25335]">{label}</div><div className="serif mt-2 text-[1.08rem] font-semibold leading-tight md:text-[1.35rem]">{value}</div></div>)}
          </div>
        </section>

        <section id="food" className="section-pad bg-[#f6f0e3]">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 md:grid-cols-[.83fr_1.17fr] md:items-end">
              <SectionHeading tag="A table worth gathering around">What Makes BETHAK Worth the Visit?</SectionHeading>
              <p className="mb-12 max-w-lg text-[.98rem] leading-7 text-[#756b5e] md:justify-self-end">A versatile cafe and restaurant with signature Indian food, traditional Gujarati dining and Kathiyawadi favourites, with more to explore across the menu.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: 'Signature Matka Biryani', text: "A signature BETHAK speciality served as one of the restaurant's highlighted food experiences.", src: images.biryani, alt: 'Illustrative matka biryani editorial image' },
                { title: 'Gujarati Thali', text: "A traditional Gujarati dining option featured among BETHAK's signature offerings.", src: images.thali, alt: 'Illustrative Gujarati thali editorial image' },
                { title: 'Kathiyawadi Food', text: "Explore Kathiyawadi flavours alongside the restaurant's broader lunch and dinner offerings.", src: images.ambience, alt: 'Illustrative Indian dining atmosphere, not a BETHAK photograph' },
              ].map((item, index) => <article key={item.title} className={`food-card group ${index === 0 ? 'md:translate-y-7' : ''}`}>
                <div className="relative h-[310px] overflow-hidden rounded-[2px] bg-[#d5c7b1] md:h-[355px]"><img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-[#f8f2e7]/90 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-[.13em] text-[#665440]">Visual representation</span><span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-[#f5ead6] text-[#a84f33] transition group-hover:rotate-45"><ArrowUpRight size={19} /></span></div>
                <div className="flex gap-4 pt-5"><span className="serif text-[1.05rem] text-[#b15b3a]">0{index + 1}</span><div><h3 className="serif text-[1.45rem] font-semibold">{item.title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-[#756b5e]">{item.text}</p></div></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#30261e] px-5 py-16 text-[#f8f0df] md:px-10 md:py-[5.5rem]">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="eyebrow !text-[#e5b572]">Find your kind of comfort</span><h2 className="serif mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-tight tracking-[-.04em]">Something for Every Craving</h2></div><span className="max-w-sm text-sm leading-6 text-[#d4c4af]">A versatile spread of cafe and restaurant favourites, from signature specialities to quick bites.</span></div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#786858] bg-[#786858] md:grid-cols-4">
              {[
                ['01', 'Matka Biryani', 'Signature speciality.', images.biryani],
                ['02', 'Gujarati Thali', 'Traditional Gujarati dining.', images.thali],
                ['03', 'Kathiyawadi', 'Kathiyawadi lunch and dinner options.', images.ambience],
                ['04', 'Fast Food', 'Fast-food options available at the restaurant.', images.thali],
              ].map(([num, name, text, src]) => <article key={num} className="group relative min-h-[245px] overflow-hidden bg-[#3a2e24] md:min-h-[290px]">
                <img src={src} alt={`Illustrative editorial image representing ${name.toLowerCase()}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201914] via-[#241b15]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6"><span className="text-[.61rem] font-bold tracking-[.18em] text-[#e9bd7c]">{num} / FOOD</span><h3 className="serif mt-2 text-[1.4rem] font-semibold md:text-[1.6rem]">{name}</h3><p className="mt-1 text-xs leading-5 text-[#e4d6c5]">{text}</p></div>
              </article>)}
            </div>
            <p className="mt-4 text-[.67rem] text-[#bcae9f]">Food imagery is illustrative and does not depict BETHAK’s actual dishes.</p>
          </div>
        </section>

        <section id="about" className="section-pad bg-[#ece3d3]">
          <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.05fr_.95fr] md:items-center">
            <div className="relative min-h-[430px] overflow-hidden bg-[#c3aa8d] md:min-h-[570px]"><img src={images.ambience} alt="Illustrative editorial image of a warm cafe dining room, not BETHAK itself" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#241a13]/60 to-transparent" /><div className="absolute bottom-6 left-6 max-w-[230px] border-l border-[#f2c889] pl-4 text-sm leading-6 text-[#fff4e1]">A visual impression of a warm Indian dining atmosphere.</div><div className="absolute right-5 top-5 rounded-full border border-white/60 bg-[#f6f0e3]/90 px-3 py-2 text-[.6rem] font-bold uppercase tracking-[.13em]">Atmosphere, represented</div></div>
            <div className="py-4 md:pl-5"><SectionHeading tag="A neighbourhood table">Welcome to BETHAK</SectionHeading><p className="mt-1 text-[1.03rem] leading-8 text-[#5f5549]">BETHAK THE CAFE &amp; RESTRO is a versatile cafe and restaurant in Vallabh Vidyanagar, Anand, offering a mix of signature Indian food, Gujarati thali, Kathiyawadi lunch and dinner, and fast-food options.</p><p className="mt-5 text-[1.03rem] leading-8 text-[#5f5549]">Whether you're stopping by for a meal, catching up with friends, or looking for a place to enjoy Indian flavours, BETHAK brings together food, atmosphere and value in one place.</p><div className="mt-8 flex items-center gap-4 border-t border-[#d0c3b0] pt-6"><span className="grid size-12 place-items-center rounded-full bg-[#a84f33] text-[#fff4e1]"><Utensils size={20} /></span><div><div className="font-semibold">Fast foods, kathiyawadi dinner lunch</div><div className="mt-1 text-sm text-[#756b5e]">Vallabh Vidyanagar, Anand</div></div></div></div>
          </div>
        </section>

        <section className="bg-[#d7c6ad] px-5 py-[4.5rem] md:px-10 md:py-[6.5rem]">
          <div className="mx-auto grid max-w-[1200px] overflow-hidden bg-[#f5eee0] md:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[340px] md:min-h-[480px]"><img src={images.ambience} alt="Illustrative image representing a pleasant Indian cafe atmosphere" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#261a12]/15" /><div className="absolute bottom-5 left-5 rounded-full bg-[#f5eee0]/90 px-3 py-2 text-[.59rem] font-bold uppercase tracking-[.12em] text-[#594a39]">Illustrative atmosphere image</div></div>
            <div className="flex flex-col justify-center p-7 md:p-12 lg:p-16"><span className="eyebrow">The feeling, in their words</span><h2 className="serif mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-[1.08] tracking-[-.04em]">Good Food.<br />Good Vibe.<br /><span className="text-[#a84f33]">Good Company.</span></h2><p className="mt-5 max-w-md text-[.96rem] leading-7 text-[#756b5e]">Guests have mentioned good food quality, freshness, affordable pricing, lighting, vibe, atmosphere and service in their reviews. Every visit is its own experience.</p><div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#d8cbb9] pt-6">
              {['Fresh food', 'Good lighting', 'Pleasant vibe', 'Service'].map((item) => <div key={item} className="flex items-center gap-2.5 text-sm font-medium"><span className="grid size-6 place-items-center rounded-full bg-[#e6dac8] text-[#a84f33]"><Star size={12} fill="currentColor" /></span>{item}</div>)}
            </div><span className="mt-5 text-[.67rem] text-[#827568]">Themes mentioned by customers in supplied reviews.</span></div>
          </div>
        </section>

        <section id="reviews" className="section-pad bg-[#f6f0e3]">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading tag="Notes from the table">What Our Guests Say</SectionHeading><div className="mb-12 text-sm text-[#756b5e]">Three guest reviews, shared as written.</div></div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Tushar Sharma', 'Good quality fresh food at an affordable price with good lighting and vibe.'],
                ['chandramani Mishra', 'Liked the atmosphere of this place and service 👍'],
                ['Zala Surydeepsinh', 'Tasty food and staff behaviour is good.'],
              ].map(([name, quote], index) => <figure key={name} className={`border-t-2 border-[#ab583a] bg-[#eee5d6] p-6 md:p-8 ${index === 1 ? 'md:translate-y-7' : ''}`}><div className="text-[.62rem] font-bold uppercase tracking-[.14em] text-[#a84f33]">Guest review</div><blockquote className="serif mt-6 min-h-[100px] text-[1.35rem] leading-[1.45]">“{quote}”</blockquote><figcaption className="mt-7 border-t border-[#d8cbb9] pt-4 text-sm font-semibold">{name}</figcaption></figure>)}
            </div>
          </div>
        </section>

        <section aria-label="Third-party ratings and price" className="bg-[#a84f33] text-[#fff4e1]">
          <div className="mx-auto grid max-w-[1200px] divide-y divide-white/25 px-5 py-8 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-10 md:py-9">
            {[
              ['3.5/5', 'Zomato', '327 votes'],
              ['3.6/5', 'magicpin', '319 votes'],
              ['₹1–200', 'Approx. price per person', 'Indicative range'],
            ].map(([rating, source, note]) => <div key={source} className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0 md:justify-center md:gap-6 md:py-1 md:first:pt-1 md:last:pb-1"><div className="serif text-[2.2rem] font-semibold leading-none md:text-[2.5rem]">{rating}</div><div className="min-w-[135px] md:min-w-0"><div className="font-semibold">{source}</div><div className="mt-1 text-xs text-[#f1d9c2]">{note}</div></div></div>)}
          </div>
        </section>

        <section id="gallery" className="section-pad bg-[#ece3d3]">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><SectionHeading tag="A glimpse of the table">Food, mood &amp; moments</SectionHeading><p className="mb-12 max-w-sm text-sm leading-6 text-[#756b5e]">A visual moodboard for Indian dining. These editorial images are illustrative and are not photographs of BETHAK or its actual dishes.</p></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {galleryItems.map((item, index) => <button key={`${item.label}-${index}`} type="button" data-testid={`button-gallery-${index + 1}`} onClick={(event) => { galleryTriggerRef.current = event.currentTarget; setActiveImage(index); }} aria-label={`Open illustrative image: ${item.label}`} className={`gallery-tile focus-ring group relative block overflow-hidden bg-[#c2ae93] text-left ${index === 0 || index === 4 ? 'aspect-[.87]' : 'aspect-[1.13]'} ${index === 1 ? 'md:mt-10' : ''} ${index === 3 ? 'md:mt-10' : ''}`}>
                <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover" />
                <div className="gallery-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#211811]/75 via-transparent to-transparent p-4 text-white md:p-5"><span className="text-[.58rem] uppercase tracking-[.14em] text-[#f1c47f]">Illustrative image</span><span className="serif mt-1 text-lg">{item.label}</span></div>
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-[#f6f0e3]/90 text-[#3c3024] md:opacity-0 md:transition group-hover:opacity-100"><ArrowUpRight size={16} /></span>
              </button>)}
            </div>
          </div>
        </section>

        <section className="relative min-h-[520px] overflow-hidden bg-[#241a13] text-[#fff5e3] md:min-h-[580px]">
          <img src={images.ambience} alt="Illustrative editorial image suggesting a warm dining atmosphere, not BETHAK itself" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241a13]/90 via-[#241a13]/60 to-[#241a13]/30" />
          <div className="relative mx-auto flex min-h-[520px] max-w-[1200px] flex-col justify-center px-5 py-16 md:min-h-[580px] md:px-10"><span className="eyebrow !text-[#e6b46f]">Make room for a good moment</span><h2 className="serif mt-6 max-w-3xl text-[clamp(3.1rem,8vw,6.8rem)] leading-[.98] tracking-[-.05em]">Your Next<br /><i className="font-medium text-[#e5b572]">BETHAK</i> Awaits</h2><p className="serif mt-6 max-w-xl text-[1.25rem] leading-8 text-[#f2e5d1]">Come for the food. Stay for the atmosphere. Make it a BETHAK.</p><div className="mt-8 flex flex-wrap gap-3"><ActionLink href="#visit">Find Us <ArrowUpRight size={16} /></ActionLink><ActionLink href={PHONE} dark><Phone size={15} /> Call 097255 37075</ActionLink></div><span className="mt-5 text-xs text-white/70">Atmospheric image is illustrative, not a photograph of BETHAK.</span></div>
        </section>

        <section id="visit" className="section-pad bg-[#f6f0e3]">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading tag="Come by, find your seat">Find Your Way to BETHAK</SectionHeading>
            <div className="grid gap-8 md:grid-cols-[.88fr_1.12fr]">
              <div className="space-y-0 border-y border-[#d9cbb7]">
                <div className="flex gap-4 border-b border-[#d9cbb7] py-5"><span className="mt-1 text-[#a84f33]"><MapPin size={19} /></span><div><div className="text-[.64rem] font-bold uppercase tracking-[.15em] text-[#a25335]">Address</div><p className="mt-2 text-[.93rem] leading-6">{ADDRESS}</p></div></div>
                <div className="flex gap-4 border-b border-[#d9cbb7] py-5"><span className="mt-1 text-[#a84f33]"><Phone size={18} /></span><div><div className="text-[.64rem] font-bold uppercase tracking-[.15em] text-[#a25335]">Call</div><a href={PHONE} className="mt-2 inline-block text-lg font-semibold hover:text-[#a84f33] focus-ring">097255 37075</a></div></div>
                <div className="flex gap-4 border-b border-[#d9cbb7] py-5"><span className="mt-1 text-[#a84f33]"><Clock3 size={19} /></span><div><div className="text-[.64rem] font-bold uppercase tracking-[.15em] text-[#a25335]">Current listing</div><p className="mt-2 font-semibold">Current listing: Opens 7 PM</p></div></div>
                <div className="flex gap-4 py-5"><span className="mt-1 text-[#a84f33]"><Utensils size={19} /></span><div><div className="text-[.64rem] font-bold uppercase tracking-[.15em] text-[#a25335]">Business description</div><p className="mt-2 font-semibold">24-Hour Restaurant</p><p className="mt-1 text-xs leading-5 text-[#756b5e]">Described as a 24-hour cafe and restaurant; shown separately from current listing information.</p></div></div>
                <div className="flex flex-wrap gap-3 pb-3 pt-2"><ActionLink href={MAPS}>Get Directions <ArrowUpRight size={16} /></ActionLink><ActionLink href={PHONE} dark><Phone size={15} /> Call Now</ActionLink></div>
              </div>
              <div className="map-pattern relative flex min-h-[370px] items-center justify-center overflow-hidden md:min-h-[480px]">
                <div className="absolute left-[12%] top-[17%] rounded-full bg-[#f2eadc]/70 px-3 py-2 text-[.61rem] font-semibold text-[#786b58]">VALLABH VIDYANAGAR</div>
                <div className="absolute bottom-[16%] right-[12%] rounded-full bg-[#f2eadc]/70 px-3 py-2 text-[.61rem] font-semibold text-[#786b58]">ANAND · GUJARAT</div>
                <div className="relative mx-5 w-full max-w-[380px] border border-[#d3c3aa] bg-[#f8f2e7] p-6 text-center shadow-[0_16px_50px_rgba(66,47,26,.13)] md:p-8">
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#a84f33] text-[#fff5e3]"><MapPin size={21} /></span><h3 className="serif mt-4 text-[1.5rem] font-semibold">BETHAK THE CAFE &amp; RESTRO</h3><p className="mt-2 text-sm text-[#756b5e]">Vallabh Vidyanagar, Anand</p><a href={MAPS} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a84f33] underline underline-offset-4 focus-ring">Open in Google Maps <ArrowUpRight size={15} /></a>
                </div>
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b78860]/30" />
                <span className="absolute bottom-3 left-3 text-[.58rem] uppercase tracking-[.13em] text-[#776a58]">Schematic location graphic · directions open Google Maps</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#e7dbc8] px-5 py-16 md:px-10 md:py-[5.5rem]">
          <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 md:flex-row md:items-center">
            <div><span className="eyebrow">A table is waiting</span><h2 className="serif mt-5 text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-tight tracking-[-.05em]">Hungry Yet?</h2><p className="mt-3 max-w-xl text-[.97rem] leading-7 text-[#685c4d]">Make your way to BETHAK and discover signature Indian flavours, thali, Kathiyawadi food and more.</p><a href={PHONE} className="mt-4 inline-block text-sm font-semibold text-[#a84f33] focus-ring">097255 37075</a></div>
            <div className="flex flex-wrap gap-3"><ActionLink href={PHONE}><Phone size={16} /> Call Now</ActionLink><ActionLink href={MAPS} dark>Get Directions <ArrowUpRight size={16} /></ActionLink></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#29221b] px-5 pb-24 pt-12 text-[#f4e9d7] md:px-10 md:pb-10 md:pt-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1fr_1fr_1fr]">
            <div><a href="#home" className="inline-block focus-ring"><span className="serif block text-3xl font-bold tracking-[.14em]">BETHAK</span><span className="mt-1 block text-[.58rem] font-semibold tracking-[.23em] text-[#e3b876]">THE CAFE &amp; RESTRO</span></a><p className="mt-5 max-w-xs text-sm leading-6 text-[#d4c4b1]">Fast foods, kathiyawadi dinner lunch</p><p className="mt-1 text-sm text-[#d4c4b1]">Vallabh Vidyanagar, Anand, Gujarat</p><a className="mt-3 inline-block text-sm text-[#efc78d] focus-ring" href={PHONE}>097255 37075</a></div>
            <div><h2 className="text-[.66rem] font-bold uppercase tracking-[.17em] text-[#e3b876]">Explore</h2><div className="mt-4 grid grid-cols-2 gap-y-3">{navItems.map(([name, href]) => <a key={name} href={href} className="text-sm text-[#e1d4c1] transition hover:text-white focus-ring">{name}</a>)}</div></div>
            <div><h2 className="text-[.66rem] font-bold uppercase tracking-[.17em] text-[#e3b876]">Visit BETHAK</h2><p className="mt-4 text-sm leading-6 text-[#d4c4b1]">{ADDRESS}</p><a href={MAPS} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#efc78d] focus-ring">Get Directions <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="flex flex-col gap-3 pt-5 text-[.69rem] text-[#bcae9d] md:flex-row md:items-center md:justify-between"><span>© 2026 BETHAK THE CAFE &amp; RESTRO. All rights reserved.</span><span>Local flavours · Vallabh Vidyanagar, Anand</span></div>
        </div>
      </footer>

      <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid h-[66px] grid-cols-3 border-t border-[#d4c4ad] bg-[#f8f2e7]/98 shadow-[0_-8px_24px_rgba(40,28,18,.1)] md:hidden">
        <a href={PHONE} className="flex flex-col items-center justify-center gap-1 text-[.66rem] font-bold text-[#a84f33] focus-ring"><Phone size={18} />Call</a>
        <a href={MAPS} className="flex flex-col items-center justify-center gap-1 border-x border-[#e0d4c3] text-[.66rem] font-bold text-[#3f3429] focus-ring"><MapPin size={18} />Directions</a>
        <a href="#food" className="flex flex-col items-center justify-center gap-1 text-[.66rem] font-bold text-[#3f3429] focus-ring"><Utensils size={18} />Food</a>
      </nav>

      {activeImage !== null && <div className="lightbox fixed inset-0 z-[60] flex items-center justify-center bg-[#17120e]/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-label={`Illustrative gallery image: ${galleryItems[activeImage].label}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}>
        <button ref={closeButtonRef} type="button" data-testid="button-close-lightbox" onClick={() => setActiveImage(null)} aria-label="Close gallery image" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-white/35 text-white hover:bg-white/10 focus-ring"><X size={22} /></button>
        <button type="button" data-testid="button-previous-image" onClick={() => setActiveImage((activeImage + galleryItems.length - 1) % galleryItems.length)} aria-label="Previous gallery image" className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring md:left-8"><ArrowLeft size={20} /></button>
        <figure className="max-h-full max-w-[1000px]"><img src={galleryItems[activeImage].src} alt={galleryItems[activeImage].alt} className="max-h-[78vh] max-w-full object-contain" /><figcaption className="mt-4 flex flex-col gap-1 text-center text-white sm:flex-row sm:justify-between sm:text-left"><span className="serif text-xl">{galleryItems[activeImage].label}</span><span className="text-xs text-[#c7b8a5]">Illustrative editorial image · not a BETHAK photograph</span></figcaption></figure>
        <button type="button" data-testid="button-next-image" onClick={() => setActiveImage((activeImage + 1) % galleryItems.length)} aria-label="Next gallery image" className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring md:right-8"><ArrowRight size={20} /></button>
      </div>}
    </div>
  );
}

export default App;
