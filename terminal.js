/* =========================================================================
   An actual terminal for the portfolio.
   Open with the pill in the corner, Cmd/Ctrl+K, or backtick.
   Everything it prints comes from the same facts as the resume, so it cannot
   drift into saying something the rest of the site does not.
   ========================================================================= */

(function () {
  'use strict';

  const EMAIL = 'shrivastava.shubham219@live.com';

  const PROJECTS = {
    shipguarde: {
      tag: 'founder / 2026',
      line: 'Release-quality platform. Multi-agent runs on every URL and pull request.',
      stack: 'TypeScript / Next.js 15 / Fastify / BullMQ / PostgreSQL / Playwright',
      url: 'https://shipguarde.com',
    },
    ocularis: {
      tag: 'open source / Apache-2.0',
      line: 'Autonomous browsing agent. Goal planning, critic loops, recovery strategies.',
      stack: 'Python / FastAPI / Playwright / pgvector / Next.js',
      url: 'https://github.com/shubham-shrivastava/ocularis',
    },
    nexdocs: {
      tag: '0 to 1 / solo',
      line: 'RAG knowledge platform. pgvector retrieval, 40+ tRPC endpoints, 3 delivery modes.',
      stack: 'Next.js / tRPC / NestJS / FastAPI / PostgreSQL / Redis',
      url: 'https://nexdocs.in',
    },
    railway: {
      tag: 'full-stack / solo',
      line: "Scheduler built on Railway's public GraphQL API. Cron spin-up, health dashboard.",
      stack: 'Next.js 14 / NestJS / GraphQL / Prisma / PostgreSQL',
      url: 'https://railway-control-center-frontend.up.railway.app/',
    },
    timedial: {
      tag: 'macOS / App Store',
      line: 'Menu-bar timezone app for distributed teams.',
      stack: 'SwiftUI / AppKit / Combine',
      url: 'https://apps.apple.com/in/app/timedial/id6758935499?mt=12',
    },
  };

  const EXPERIENCE = [
    ['2026 - now', 'Founder & Principal Engineer', 'ShipGuarde'],
    ['2019 - now', 'Full Stack Developer', 'Luzmo (formerly Cumul.io)'],
    ['2018 - 2019', 'Backend Developer', 'Luzmo (formerly Cumul.io)'],
    ['2016 - 2017', 'Software Engineer', 'Persistent Systems'],
  ];

  const SKILLS = {
    languages: 'TypeScript, JavaScript, Python, SQL',
    frontend: 'React, Next.js (App Router, RSC, SSR), Tailwind, design systems, a11y',
    backend: 'Node.js, Fastify, NestJS, FastAPI, REST, GraphQL, tRPC, queues',
    data: 'PostgreSQL, Prisma, pgvector, Redis, MongoDB, Docker, AWS',
    ai: 'LLM features, multi-agent orchestration, RAG, eval harnesses, tracing',
    quality: 'Playwright, Vitest, Jest, Cypress, visual regression, CI/CD',
  };

  let el = {};
  let history = [];
  let historyIndex = -1;
  let busy = false;

  /* ------------------------------------------------------------ printing */

  function line(html, cls) {
    const div = document.createElement('div');
    div.className = 'term-line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    el.output.appendChild(div);
    el.body.scrollTop = el.body.scrollHeight;
    return div;
  }

  function blank() {
    line('&nbsp;');
  }

  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Types a line out one character at a time. Slow enough to read, fast enough
  // that nobody waits for it, and skipped entirely for reduced-motion.
  function type(text, cls) {
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const div = line('', cls);
    if (instant) {
      div.innerHTML = text;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      let i = 0;
      const tick = () => {
        // Reveal in small chunks so long lines do not crawl.
        i = Math.min(text.length, i + 3);
        div.innerHTML = text.slice(0, i);
        el.body.scrollTop = el.body.scrollHeight;
        if (i < text.length) setTimeout(tick, 8);
        else resolve();
      };
      tick();
    });
  }

  const kv = (k, v) => `<span class="term-key">${k.padEnd(12)}</span>${v}`;

  /* ----------------------------------------------------------- commands */

  const COMMANDS = {
    help() {
      line('<span class="term-dim">Commands. Tab completes, arrow keys walk history.</span>');
      blank();
      const rows = [
        ['about', 'who I am, briefly'],
        ['skills', 'what I work in'],
        ['experience', 'where I have worked'],
        ['projects', 'what I have shipped'],
        ['open <name>', 'open a project in a new tab'],
        ['resume', 'open the resume'],
        ['contact', 'how to reach me'],
        ['email', 'copy my email to the clipboard'],
        ['social', 'links'],
        ['theme', 'flip light and dark'],
        ['goto <section>', 'scroll the page somewhere'],
        ['clear', 'clear the screen'],
        ['exit', 'close the terminal'],
      ];
      rows.forEach(([c, d]) => line(kv(c, `<span class="term-dim">${d}</span>`)));
    },

    async about() {
      await type('Founder and senior full-stack engineer. 9+ years.');
      await type('Eight of them at Luzmo, a Belgian company, on European hours from India.');
      await type('Now building ShipGuarde, a release-quality platform, mostly alone.');
      blank();
      line('<span class="term-dim">I like the unglamorous half: the retry that does not swallow a real failure,</span>');
      line('<span class="term-dim">the error message that says what to actually do. Nobody thanks you. They just do not leave.</span>');
    },

    whoami() {
      line('shubham');
    },

    skills() {
      Object.entries(SKILLS).forEach(([k, v]) => line(kv(k, v)));
    },

    experience() {
      EXPERIENCE.forEach(([when, role, org]) =>
        line(`<span class="term-key">${when.padEnd(12)}</span>${role} <span class="term-dim">/ ${org}</span>`),
      );
    },

    projects() {
      Object.entries(PROJECTS).forEach(([name, p]) => {
        line(`<span class="term-accent">${name}</span>  <span class="term-dim">${p.tag}</span>`);
        line(`  ${p.line}`);
        line(`  <span class="term-dim">${p.stack}</span>`);
        blank();
      });
      line('<span class="term-dim">open &lt;name&gt; to visit one.</span>');
    },

    open(arg) {
      if (!arg) return line(`<span class="term-warn">open what? try: ${Object.keys(PROJECTS).join(', ')}</span>`);
      const p = PROJECTS[arg.toLowerCase()];
      if (!p) return line(`<span class="term-warn">no project "${esc(arg)}". try: ${Object.keys(PROJECTS).join(', ')}</span>`);
      line(`opening <span class="term-accent">${arg}</span> ...`);
      window.open(p.url, '_blank', 'noopener');
    },

    resume() {
      line('opening resume ...');
      window.open('resume.html', '_blank', 'noopener');
    },

    contact() {
      line(kv('email', `<a href="mailto:${EMAIL}">${EMAIL}</a>`));
      line(kv('location', 'Pune, India / works CET hours'));
      line(kv('linkedin', '<a href="https://linkedin.com/in/shubhamshrivastav" target="_blank" rel="noopener">/in/shubhamshrivastav</a>'));
      blank();
      line('<span class="term-dim">Type "email" to copy the address.</span>');
    },

    async email() {
      try {
        await navigator.clipboard.writeText(EMAIL);
        line(`<span class="term-ok">copied</span> ${EMAIL}`);
      } catch {
        line(`<span class="term-warn">clipboard blocked.</span> ${EMAIL}`);
      }
    },

    social() {
      line(kv('github', '<a href="https://github.com/shubham-shrivastava" target="_blank" rel="noopener">github.com/shubham-shrivastava</a>'));
      line(kv('linkedin', '<a href="https://linkedin.com/in/shubhamshrivastav" target="_blank" rel="noopener">linkedin.com/in/shubhamshrivastav</a>'));
      line(kv('shipguarde', '<a href="https://shipguarde.com" target="_blank" rel="noopener">shipguarde.com</a>'));
    },

    theme() {
      document.querySelector('.theme-switch')?.click();
      line(`theme is now <span class="term-accent">${document.body.classList.contains('dark-mode') ? 'dark' : 'light'}</span>`);
    },

    goto(arg) {
      const targets = ['home', 'about', 'skills-experience', 'projects', 'contact'];
      const key = (arg || '').toLowerCase();
      const match = targets.find((t) => t === key || t.startsWith(key));
      if (!match) return line(`<span class="term-warn">where? try: ${targets.join(', ')}</span>`);
      document.getElementById(match)?.scrollIntoView({ behavior: 'smooth' });
      line(`scrolling to <span class="term-accent">${match}</span>`);
      close();
    },

    ls() {
      line('about  skills  experience  projects  resume  contact');
    },

    clear() {
      el.output.innerHTML = '';
    },

    exit() {
      close();
    },

    /* ---- easter eggs. Small, and they do not pretend to be anything ---- */

    sudo(arg) {
      line(`<span class="term-warn">shubham is not in the sudoers file. This incident has been reported.</span>`);
      if (arg) line('<span class="term-dim">(it has not been reported)</span>');
    },

    coffee() {
      line('<span class="term-warn">418</span> I am a teapot. Ask again after 9am IST.');
    },

    hire() {
      line('<span class="term-ok">Available and reading.</span> Try "contact", or the form at the bottom of the page.');
    },
  };

  const ALIASES = { '?': 'help', man: 'help', cls: 'clear', quit: 'exit', close: 'exit', work: 'experience', me: 'about' };

  /* -------------------------------------------------------------- input */

  async function run(raw) {
    const input = raw.trim();
    line(`<span class="term-prompt">${promptText()}</span> ${esc(input)}`, 'term-echo');
    if (!input) return;

    history.unshift(input);
    historyIndex = -1;

    const [cmdRaw, ...rest] = input.split(/\s+/);
    const cmd = ALIASES[cmdRaw.toLowerCase()] || cmdRaw.toLowerCase();
    const fn = COMMANDS[cmd];

    if (!fn) {
      line(`<span class="term-warn">${esc(cmdRaw)}: command not found.</span> Type <span class="term-accent">help</span>.`);
      return;
    }
    busy = true;
    try {
      await fn(rest.join(' '));
    } catch (err) {
      line(`<span class="term-warn">something broke: ${esc(err.message)}</span>`);
    }
    busy = false;
    blank();
  }

  const promptText = () => 'shubham@portfolio:~$';

  function complete() {
    const val = el.input.value.trim();
    if (!val) return;
    const parts = val.split(/\s+/);
    if (parts.length === 1) {
      const hits = Object.keys(COMMANDS).filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (hits.length === 1) el.input.value = hits[0] + ' ';
      else if (hits.length > 1) line(hits.join('  '));
    } else if (parts[0] === 'open') {
      const hits = Object.keys(PROJECTS).filter((p) => p.startsWith((parts[1] || '').toLowerCase()));
      if (hits.length === 1) el.input.value = 'open ' + hits[0];
      else if (hits.length > 1) line(hits.join('  '));
    }
  }

  /* ------------------------------------------------------------ open/close */

  let opened = false;

  function open() {
    el.root.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => el.input.focus(), 60);
    if (!opened) {
      opened = true;
      greet();
    }
  }

  function close() {
    el.root.classList.remove('active');
    // Only release the scroll lock if the lightbox is not also holding it.
    document.body.style.overflow =
      document.getElementById('lightbox')?.classList.contains('active') ? 'hidden' : '';
  }

  async function greet() {
    await type('<span class="term-accent">shubham shrivastav</span> / founder &amp; senior full-stack engineer');
    line('<span class="term-dim">Type <span class="term-accent">help</span> for commands. Esc closes.</span>');
    blank();
  }

  /* ----------------------------------------------------------------- init */

  function init() {
    el.root = document.getElementById('terminal');
    if (!el.root) return;
    el.body = el.root.querySelector('.term-body');
    el.output = el.root.querySelector('.term-output');
    el.input = el.root.querySelector('.term-input');

    el.root.querySelector('.term-close').addEventListener('click', close);
    el.root.addEventListener('mousedown', (e) => {
      if (e.target === el.root) close();
    });
    el.body.addEventListener('click', () => el.input.focus());

    document.querySelectorAll('[data-terminal-open]').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      }),
    );

    el.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (busy) return;
        const v = el.input.value;
        el.input.value = '';
        run(v);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        complete();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < history.length - 1) el.input.value = history[++historyIndex];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) el.input.value = history[--historyIndex];
        else {
          historyIndex = -1;
          el.input.value = '';
        }
      } else if (e.key === 'Escape') {
        close();
      }
    });

    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName || '');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        el.root.classList.contains('active') ? close() : open();
      } else if (e.key === '`' && !typing) {
        e.preventDefault();
        open();
      } else if (e.key === 'Escape' && el.root.classList.contains('active')) {
        close();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
