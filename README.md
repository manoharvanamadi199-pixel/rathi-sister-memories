# Happy Raksha Bandhan — Surprise Website 🎁❤️

A personal, animated surprise website for your sister, built with plain
HTML, CSS and JavaScript only (no frameworks, no PHP, no database).

## Files

```
rakhi-surprise/
├── index.html              ← page structure & content (edit text here)
├── style.css                ← all styling & animations
├── script.js                 ← all interactivity (gallery, quiz, gift box, music)
└── assets/
    ├── photos/               ← put photo1.jpg … photo5.jpg here
    └── music/                ← put song.mp3 here
```

## How to run it on your computer

You don't need to install anything.

**Easiest way:**
1. Unzip the folder if it's zipped.
2. Double-click `index.html`. It will open directly in your browser
   (Chrome, Edge, Firefox, Safari all work).

**If the music doesn't play when double-clicking the file directly**
(some browsers block audio/local files slightly differently), run a tiny
local server instead — still 100% free, no install beyond what's on your
computer already:

- **Windows/Mac/Linux with Python installed:**
  Open a terminal in the `rakhi-surprise` folder and run:
  ```
  python3 -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.

- **VS Code users:** install the free "Live Server" extension, right-click
  `index.html`, and choose "Open with Live Server".

## How to personalize it

### 1. Add your real photos
Drop 5 photos into `assets/photos/` named:
`photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`
(Using different names or `.png`? Just update the `src="assets/photos/..."`
paths inside `index.html`, in the section commented `SECTION 2 — OUR
MEMORIES (GALLERY)`.)

You can also edit each `<p class="caption">...</p>` line to write your own
caption under each photo.

### 2. Add your music
Drop your song into `assets/music/` and name it `song.mp3`.
It will never autoplay — she has to press the music button herself.

### 3. Edit the text
Every section in `index.html` has an HTML comment like:
```html
<!-- EDIT HERE: ... -->
```
telling you exactly what you can safely change — memory card stories, the
letter, the "why you're special" reasons, and the quiz questions/answers.
You don't need to touch `style.css` or `script.js` unless you want to.

### 4. Quiz answers
In the quiz section, whichever `<button class="quiz-option">` has
`correct` added to its class (e.g. `class="quiz-option correct"`) is the
right answer. Move the `correct` class to whichever option is actually true
for your real questions.

## What's inside, section by section

1. **Intro screen** — "Hey Sister", building anticipation, with a
   "Start The Surprise" button.
2. **Raksha Bandhan Wish** — the opening emotional message with floating
   hearts and a floating rakhi icon.
3. **Our Memories (gallery)** — a slideshow of your photos with arrows and
   dots, auto-advancing every ~4.5 seconds.
4. **Our Memories (story cards)** — short funny/emotional memory cards
   that animate in as she scrolls.
5. **A Message From Your Brother** — a handwritten-letter-styled section.
6. **Why You Are Special** — 8 animated reason cards.
7. **How Well Do You Know Your Brother?** — a 5-question quiz with a
   warm result message at the end, replayable.
8. **Final Surprise** — an animated gift box she taps to open, which
   triggers confetti/hearts and reveals your final message.

A soft gold "thread" runs down the right edge of the screen on larger
screens, lighting up little charms as she scrolls — a nod to the rakhi
thread itself, tying every section together.

## About the one external resource used

The only thing loaded from outside your files is **Google Fonts**
(Cormorant Garamond, Poppins, and Caveat) via `fonts.googleapis.com`.
This is a free, no-signup, no-cost service from Google used purely to
load nicer typefaces — nothing is uploaded or tracked in a way that
affects your site's content. If you'd rather have a fully offline site,
you can delete the two `<link>` tags for fonts in `index.html`'s `<head>`
and the site will fall back to a clean system serif/sans-serif automatically.

No other libraries, paid services, PHP, or databases are used anywhere.

Happy Raksha Bandhan! 🧿❤️
