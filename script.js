/* ================================================================
   RAKSHA BANDHAN SURPRISE — SCRIPT
   Sections:
   1. Placeholder image generator (so it looks nice before you add real photos)
   2. Intro screen + "Start The Surprise" transition
   3. Ambient particle background (hearts + sparkles)
   4. Floating hearts inside the wish section
   5. Scroll-reveal animations + the gold "thread" progress bar
   6. Photo gallery / slideshow
   7. Mini quiz game
   8. Final gift box + confetti
   9. Music player
   ================================================================ */

/* ---------------------------------------------------------------
   1. PLACEHOLDER IMAGES
   If a photoN.jpg file is missing (because you haven't added your
   real photos yet), we generate a soft, on-theme placeholder so the
   site still looks good. Once you drop real files into
   assets/photos/photo1.jpg ... photo5.jpg, they'll be used automatically
   and this function will simply never be called.
--------------------------------------------------------------- */
window.PLACEHOLDER_IMG = function (n) {
  const colors = ["#F7CFE0", "#EFE3F3", "#FFE3EE", "#F3D9E6", "#E9D6F0"];
  const c = colors[(n - 1) % colors.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c}"/>
          <stop offset="100%" stop-color="#C2185B" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <text x="50%" y="47%" font-family="Poppins, sans-serif" font-size="34" fill="#8E1146" text-anchor="middle" font-weight="600">Add photo${n}.jpg here</text>
      <text x="50%" y="57%" font-family="Poppins, sans-serif" font-size="20" fill="#8E1146" text-anchor="middle" opacity="0.75">assets/photos/photo${n}.jpg</text>
    </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
};

/* ---------------------------------------------------------------
   2. INTRO SCREEN
--------------------------------------------------------------- */
const introScreen = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const mainSite = document.getElementById("mainSite");

startBtn.addEventListener("click", () => {
  introScreen.classList.add("hide");
  document.body.style.overflow = "auto";
  setTimeout(() => {
    mainSite.classList.add("visible");
  }, 200);
  // A gentle scroll to the first section once the transition begins
  setTimeout(() => {
    document.getElementById("section-wish").scrollIntoView({ behavior: "smooth" });
  }, 500);
});

// Lock scrolling behind the intro until she clicks start
document.body.style.overflow = "hidden";

/* ---------------------------------------------------------------
   3. AMBIENT PARTICLE BACKGROUND (hearts + sparkles)
   Lightweight canvas animation — no external library needed.
--------------------------------------------------------------- */
(function ambientParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const symbols = ["✨", "❤️", "🌸"];
  const COUNT = window.innerWidth < 700 ? 16 : 28;

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: 10 + Math.random() * 14,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.4,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: 0.15 + Math.random() * 0.25,
      wobble: Math.random() * Math.PI * 2,
    };
  }
  particles = Array.from({ length: COUNT }, makeParticle);

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.wobble += 0.01;
      p.x += Math.sin(p.wobble) * 0.3 + p.drift * 0.1;
      if (p.y < -30) {
        p.y = h + 30;
        p.x = Math.random() * w;
      }
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ---------------------------------------------------------------
   4. FLOATING HEARTS in the wish section
--------------------------------------------------------------- */
(function floatingHearts() {
  const container = document.querySelector(".floating-hearts");
  if (!container) return;
  const emojis = ["❤️", "💕", "🌸", "✨"];
  for (let i = 0; i < 18; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.animationDuration = 6 + Math.random() * 8 + "s";
    span.style.animationDelay = Math.random() * 8 + "s";
    span.style.fontSize = 0.9 + Math.random() * 1.2 + "rem";
    container.appendChild(span);
  }
})();

/* ---------------------------------------------------------------
   5. SCROLL REVEAL + GOLD THREAD PROGRESS
--------------------------------------------------------------- */
(function scrollReveal() {
  const revealTargets = document.querySelectorAll(
    ".reveal-block, .memory-card, .special-card, .letter-paper"
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );
  revealTargets.forEach((el) => io.observe(el));

  // Stagger memory & special cards slightly for a nicer cascade
  document.querySelectorAll(".memory-grid, .special-grid").forEach((grid) => {
    [...grid.children].forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });
  });
})();

(function threadProgress() {
  const fill = document.getElementById("threadFill");
  const charms = document.querySelectorAll(".thread-charm");
  const sections = document.querySelectorAll(".section");
  if (!fill || !sections.length) return;

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.height = Math.min(100, Math.max(0, pct)) + "%";

    let activeIndex = 0;
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) {
        activeIndex = Number(sec.dataset.sectionIndex);
      }
    });
    charms.forEach((c) => {
      c.classList.toggle("lit", Number(c.dataset.section) <= activeIndex);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ---------------------------------------------------------------
   6. PHOTO GALLERY / SLIDESHOW
--------------------------------------------------------------- */
(function gallery() {
  const slides = document.querySelectorAll(".slide");
  const dotsWrap = document.getElementById("slideDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  if (!slides.length) return;

  let current = 0;
  let autoTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll("span");

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  resetAuto();
})();

/* ---------------------------------------------------------------
   7. MINI QUIZ GAME
--------------------------------------------------------------- */
(function quiz() {
  const questions = document.querySelectorAll(".quiz-question");
  const progressFill = document.getElementById("quizProgressFill");
  const result = document.getElementById("quizResult");
  const restartBtn = document.getElementById("quizRestart");
  const resultEmoji = document.getElementById("quizResultEmoji");
  const resultTitle = document.getElementById("quizResultTitle");
  const resultText = document.getElementById("quizResultText");
  if (!questions.length) return;

  let score = 0;
  const total = questions.length;

  // EDIT HERE: customize the funny/emotional results shown at the end
  const outcomes = [
    { min: 0, max: 1, emoji: "😅", title: "You barely know me... yet you love me anyway!", text: "Score doesn't matter — you've still put up with me your whole life, and that says everything." },
    { min: 2, max: 3, emoji: "😄", title: "Not bad, sibling detective!", text: "You know me better than most people ever will. Comes with years of shared chaos." },
    { min: 4, max: total, emoji: "🏆", title: "You know me better than I know myself!", text: "Of course you do — you've been my sister since day one. Nobody reads me like you do." },
  ];

  questions.forEach((q, index) => {
    const options = q.querySelectorAll(".quiz-option");
    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        const isCorrect = opt.classList.contains("correct");
        options.forEach((o) => {
          o.disabled = true;
          if (o.classList.contains("correct")) o.classList.add("selected-correct");
        });
        if (isCorrect) score++;
        else opt.classList.add("selected-wrong");

        progressFill.style.width = `${((index + 1) / total) * 100}%`;

        setTimeout(() => {
          if (index + 1 < total) {
            q.classList.remove("active");
            questions[index + 1].classList.add("active");
          } else {
            showResult();
          }
        }, 900);
      });
    });
  });

  function showResult() {
    questions.forEach((q) => q.classList.remove("active"));
    const outcome = outcomes.find((o) => score >= o.min && score <= o.max) || outcomes[outcomes.length - 1];
    resultEmoji.textContent = outcome.emoji;
    resultTitle.textContent = outcome.title;
    resultText.textContent = outcome.text;
    result.classList.add("active");
  }

  restartBtn.addEventListener("click", () => {
    score = 0;
    progressFill.style.width = "0%";
    result.classList.remove("active");
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === 0);
      q.querySelectorAll(".quiz-option").forEach((o) => {
        o.disabled = false;
        o.classList.remove("selected-correct", "selected-wrong");
      });
    });
  });
})();

/* ---------------------------------------------------------------
   8. FINAL GIFT BOX + CONFETTI
--------------------------------------------------------------- */
(function finalGift() {
  const giftBox = document.getElementById("giftBox");
  const finalPre = document.getElementById("finalPre");
  const finalReveal = document.getElementById("finalReveal");
  const confettiCanvas = document.getElementById("confetti-canvas");
  if (!giftBox) return;

  let opened = false;

  giftBox.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    giftBox.classList.add("opened");
    launchConfetti();

    setTimeout(() => {
      finalPre.classList.add("hide");
      finalReveal.classList.add("show");
    }, 900);
  });

  function launchConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    function resize() {
      confettiCanvas.width = confettiCanvas.offsetWidth;
      confettiCanvas.height = confettiCanvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#D4AF37", "#C2185B", "#F7CFE0", "#ffffff", "#8E1146"];
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * confettiCanvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 10,
      shape: Math.random() > 0.5 ? "rect" : "heart",
    }));

    let frame = 0;
    const maxFrames = 260;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      pieces.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          drawHeart(ctx, p.w);
        }
        ctx.restore();
      });
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    draw();
  }

  function drawHeart(ctx, size) {
    ctx.beginPath();
    const s = size / 2;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(s, -s * 0.6, s * 1.6, s * 0.5, 0, s * 1.4);
    ctx.bezierCurveTo(-s * 1.6, s * 0.5, -s, -s * 0.6, 0, s * 0.3);
    ctx.fill();
  }
})();

/* ---------------------------------------------------------------
   9. MUSIC PLAYER
   EDIT: replace assets/music/song.mp3 with your own track.
   Playback only ever starts from a direct click, never automatically.
--------------------------------------------------------------- */
(function musicPlayer() {
  const audio = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");
  if (!audio || !toggle) return;

  toggle.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        toggle.classList.add("playing");
        toggle.setAttribute("aria-label", "Pause background music");
      } else {
        audio.pause();
        toggle.classList.remove("playing");
        toggle.setAttribute("aria-label", "Play background music");
      }
    } catch (err) {
      // If song.mp3 hasn't been added yet, playback will fail silently here.
      console.warn("Music couldn't play — did you add assets/music/song.mp3?", err);
    }
  });
})();
