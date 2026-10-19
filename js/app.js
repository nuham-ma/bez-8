import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Switcher Setup
  let currentLang = localStorage.getItem('bez8_lang') || 'am';

  const langBtnsAm = document.querySelectorAll('.lang-btn-am');
  const langBtnsEn = document.querySelectorAll('.lang-btn-en');
  const htmlRoot = document.documentElement;

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('bez8_lang', lang);
    htmlRoot.setAttribute('lang', lang);

    // Update active class on toggle buttons
    langBtnsAm.forEach(btn => btn.classList.toggle('active', lang === 'am'));
    langBtnsEn.forEach(btn => btn.classList.toggle('active', lang === 'en'));

    // Translate all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update WhatsApp dynamic URLs for menu items
    updateWhatsAppLinks();

    // Re-check live status text
    updateLiveStatus();
  }

  langBtnsAm.forEach(btn => btn.addEventListener('click', () => setLanguage('am')));
  langBtnsEn.forEach(btn => btn.addEventListener('click', () => setLanguage('en')));

  // 2. Mobile Drawer Navigation
  const menuToggleBtn = document.querySelector('.menu-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open');
    menuToggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
    menuToggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggleBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  mobileDrawerBackdrop?.addEventListener('click', closeDrawer);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. Live Open/Closed Hours Status
  // Opening hours: 7:00 AM (07:00) to 9:30 PM (21:30) East Africa Time (UTC+3)
  function updateLiveStatus() {
    const statusTextEl = document.getElementById('live-status-text');
    const pulseDot = document.getElementById('live-pulse-dot');
    if (!statusTextEl) return;

    // Get current time in Addis Ababa (UTC+3)
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const eatMinutes = (utcHours * 60 + utcMinutes + 3 * 60) % 1440;

    const openMinutes = 7 * 60; // 07:00 AM
    const closeMinutes = 21 * 60 + 30; // 09:30 PM (21:30)

    const isOpen = eatMinutes >= openMinutes && eatMinutes < closeMinutes;

    if (isOpen) {
      statusTextEl.textContent = translations[currentLang].live_open_now;
      statusTextEl.parentElement.classList.remove('closed');
      statusTextEl.parentElement.classList.add('open');
      if (pulseDot) {
        pulseDot.style.backgroundColor = '#22C55E';
        pulseDot.style.boxShadow = '0 0 10px #22C55E';
      }
    } else {
      statusTextEl.textContent = translations[currentLang].live_closed_now;
      statusTextEl.parentElement.classList.remove('open');
      statusTextEl.parentElement.classList.add('closed');
      if (pulseDot) {
        pulseDot.style.backgroundColor = '#F59E0B';
        pulseDot.style.boxShadow = '0 0 10px #F59E0B';
      }
    }
  }

  // 4. Menu Filter Tabs
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isPopular = card.getAttribute('data-popular') === 'true';

        let show = false;
        if (filter === 'all') {
          show = true;
        } else if (filter === 'popular') {
          show = isPopular;
        } else if (filter === category) {
          show = true;
        }

        if (show) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. WhatsApp Link Dynamic Pre-fill Generator
  function updateWhatsAppLinks() {
    const orderButtons = document.querySelectorAll('.btn-order-item');
    orderButtons.forEach(btn => {
      const itemTitleKey = btn.getAttribute('data-item-title-key');
      const itemTitle = translations[currentLang][itemTitleKey] || 'BEZ/8 Special Dish';
      const prefix = translations[currentLang].wa_order_prefix;
      const message = encodeURIComponent(`${prefix}${itemTitle}`);
      btn.setAttribute('href', `https://wa.me/251978454772?text=${message}`);
    });

    const generalWaBtn = document.querySelectorAll('.btn-whatsapp-general');
    generalWaBtn.forEach(btn => {
      const message = encodeURIComponent(translations[currentLang].wa_general_inquiry);
      btn.setAttribute('href', `https://wa.me/251978454772?text=${message}`);
    });
  }

  // 6. Interactive Lightbox for Gallery
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const captionKey = item.getAttribute('data-caption-key');
      const caption = captionKey && translations[currentLang][captionKey]
        ? translations[currentLang][captionKey]
        : (img ? img.alt : 'BEZ/8 Cafe');
      if (img) openLightbox(img.src, caption);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 7. Copy Address to Clipboard
  const copyAddressBtn = document.getElementById('btn-copy-address');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const addressText = currentLang === 'am'
        ? "ኮልፌ ሊኳንዳ፤ ከባሻ ግሮሰሪ 100 ሜትር ገባ ብሎ፣ አዲስ አበባ"
        : "Kolfe Likwanda, 100m past Basha Grocery, Addis Ababa, Ethiopia";

      try {
        await navigator.clipboard.writeText(addressText);
        const originalText = copyAddressBtn.innerHTML;
        const copiedLabel = translations[currentLang].btn_copied || "ተገልብጧል!";
        copyAddressBtn.innerHTML = `✓ ${copiedLabel}`;
        copyAddressBtn.classList.add('copied');

        setTimeout(() => {
          copyAddressBtn.innerHTML = originalText;
          copyAddressBtn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    });
  }

  // 8. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-fade');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 9. Back to Top Button Handler
  const backToTopBtn = document.getElementById('btn-back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initialize
  setLanguage(currentLang);
  updateLiveStatus();
  setInterval(updateLiveStatus, 60000);
});
