const images = [
  "656418707_122102484704984342_3721329421791740690_n.webp",
  "656460640_122102479664984342_2392256002775577945_n.webp",
  "656612288_122102480666984342_6329144599795540528_n.webp",
  "656644682_122102485160984342_1759402794611514744_n.webp",
  "656649309_122102481260984342_8584029440451170629_n.webp",
  "656680050_122102480624984342_5899010925813335624_n.webp",
  "656680050_122102487092984342_9133088125169053642_n.webp",
  "656680067_122102487182984342_7205375524153833302_n.webp",
  "656722139_122102478914984342_8972870450699631819_n.webp",
  "656741081_122102477024984342_7840228287092579218_n.webp",
  "656744684_122102476892984342_8335932651011162193_n.webp",
  "656768558_122102477720984342_8465778032789400688_n.webp",
  "656795686_122102486894984342_6896462770078041246_n.webp",
  "656797853_122102486810984342_864382113883562315_n.webp",
  "656873704_122102486852984342_4319322600912318498_n.webp",
  "656889940_122102478998984342_2610566991791424439_n.webp",
  "656975234_122102483090984342_7620111838103323381_n.webp",
  "657074978_122102484854984342_5944988337282519633_n.webp",
  "657079903_122102477684984342_3573905087831219825_n.webp",
  "657177076_122102482076984342_1858456847742686828_n.webp",
  "657188207_122102487026984342_6484629420088359387_n.webp",
  "657293650_122102477768984342_7447611253531036412_n.webp",
  "657314698_122102487272984342_8469001240232452851_n.webp",
  "657328895_122102482310984342_3165671872111323423_n.webp",
  "657373638_122102479634984342_5515154664199506378_n.webp",
  "657405100_122102482070984342_8328822883757728332_n.webp",
  "657418161_122102487224984342_78248888537227463_n.webp",
  "657456529_122102478908984342_1558836679299517337_n.webp",
  "657472594_122102487518984342_3602334838587033913_n.webp",
  "657472605_122102487464984342_8282869640797494683_n.webp",
  "657534754_122102476862984342_2306013864229489441_n.webp",
  "657555845_122102478854984342_6117020293037693215_n.webp",
  "657596061_122102480600984342_2087765462810808944_n.webp",
  "657625588_122102484788984342_931487186840931960_n.webp",
  "657697257_122102487362984342_3262289930518506598_n.webp",
  "657867724_122102487578984342_6409721496018449772_n.webp",
  "657937218_122102482352984342_1262604573013964974_n.webp",
  "657937312_122102482136984342_8193275133502135941_n.webp",
  "657938767_122102476928984342_209777545773442935_n.webp",
  "658142209_122102481254984342_620844770412471208_n.webp",
  "658356679_122102487416984342_1076509861048376448_n.webp",
  "658367171_122102479592984342_3637093294807060571_n.webp"
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Gallery
  const gallery = document.getElementById('masonry-gallery');
  
  images.forEach((imgSrc, index) => {
    const item = document.createElement('div');
    item.className = 'masonry-item scroll-reveal';
    item.style.transitionDelay = `${(index % 8) * 0.1}s`;
    
    item.innerHTML = `
      <img src="${imgSrc}" alt="Création Fil d'Or" loading="lazy">
      <div class="overlay">
        <span class="icon">🔍</span>
      </div>
    `;
    
    // Lightbox click handler
    item.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(item);
  });

  // 2. Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const nextBtn = document.querySelector('.lightbox-next');
  const prevBtn = document.querySelector('.lightbox-prev');
  let currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex];
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentImageIndex];
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  // Close when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // 3. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));

  // 4. Navbar Sticky Shrink
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Set hero background delay
  setTimeout(() => {
    document.querySelector('.hero').classList.add('loaded');
  }, 100);

  // 5. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
});
