/* ============================================================================
   APP.JS — shared engine for every page. Injects header/footer, renders page
   content from config.js, draws the graphics, wires the form + schema.
   Edit CONTENT in config.js, not here.
   ============================================================================ */
(function () {
  const S = window.SITE || {};
  const yr = new Date().getFullYear();

  const ICONS = {
    bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    board:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>',
    house:'<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
    ev:'<rect x="4" y="3" width="11" height="18" rx="2"/><path d="M9 8h3l-2 4h3l-4 5"/><path d="M15 9h3a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-3 0v-2"/>',
    bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3Z"/>',
    cert:'<path d="M6 3h12v13l-6 3-6-3Z"/><path d="m9 10 2 2 4-4"/>',
    shield:'<path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6Z"/><path d="m9 12 2 2 4-4"/>',
    doc:'<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    wallet:'<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16 14h2"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/>',
    camera:'<path d="M4 8h3l2-2.5h6L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',
    phone:'<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1Z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    check:'<path d="m5 13 4 4L19 7"/>',
    star:'<path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5Z"/>',
  };
  const ico = (p, fill) => `<svg viewBox="0 0 24 24" fill="${fill?'currentColor':'none'}" stroke="${fill?'none':'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const svg = (name, fill) => ico(ICONS[name] || ICONS.bolt, fill);
  const phoneSvg = ico(ICONS.phone, true);
  const arrowSvg = ico(ICONS.arrow, false);

  const digits = s => (s || "").replace(/[^0-9+]/g, "");
  const tel = "tel:" + digits(S.phone);
  const mailto = "mailto:" + S.email;
  const esc = s => (s == null ? "" : String(s)).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  /* ---------------- graphics ---------------- */
  function consumerUnit(mode) {
    if (mode === "old") {
      let c = "";
      for (let i = 0; i < 6; i++) { const x = 104 + i * 46, p = i === 2;
        c += `<rect x="${x}" y="${p?138:150}" width="34" height="66" rx="4" fill="#cbb489" stroke="#a5895d"/><rect x="${x+7}" y="${p?148:160}" width="20" height="30" rx="3" fill="#ece0c4" stroke="#a5895d"/><circle cx="${x+17}" cy="${p?188:200}" r="5" fill="#8a6a3d"/>`; }
      return `<svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Old rewireable fuse box"><defs><linearGradient id="ob" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe6d0"/><stop offset="1" stop-color="#ddceac"/></linearGradient></defs><rect x="34" y="70" width="372" height="176" rx="8" fill="url(#ob)" stroke="#b39a6c"/><rect x="46" y="82" width="348" height="152" rx="5" fill="#e3d6b6" stroke="#b39a6c"/><rect x="56" y="150" width="36" height="66" rx="4" fill="#2c2c2c"/><rect x="64" y="160" width="20" height="20" rx="2" fill="#4a4a4a"/><text x="58" y="230" fill="#7a6a48" font-family="Manrope" font-size="10" font-weight="700">MAIN</text>${c}<path d="M120 82q6-26 26-30M250 82q-4-24-24-30M330 78q8-18 28-16" stroke="#9c7f4e" stroke-width="2.4" fill="none" opacity=".7"/><ellipse cx="322" cy="150" rx="40" ry="22" fill="#000" opacity=".12"/><path d="M356 92l7 7-7 7-7-7z" fill="#e5484d"/></svg>`;
    }
    let m = "";
    for (let i = 0; i < 10; i++) { const x = 118 + i * 24, on = i % 3 !== 0;
      m += `<rect x="${x}" y="150" width="18" height="60" rx="3" fill="#f4f7fb" stroke="#cfd8e6"/><rect x="${x+4}" y="${on?158:184}" width="10" height="18" rx="2.5" fill="${on?'#12a150':'#c9d3e0'}"/>`; }
    return `<svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modern consumer unit"><defs><linearGradient id="cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef2f7"/></linearGradient></defs><rect x="34" y="66" width="372" height="176" rx="14" fill="url(#cu)" stroke="#d4dce7"/><rect x="34" y="66" width="372" height="30" rx="14" fill="#0f4c81"/><rect x="34" y="86" width="372" height="12" fill="#0f4c81"/><text x="52" y="86" fill="#eaf3fb" font-family="Archivo,sans-serif" font-weight="800" font-size="15">CONSUMER UNIT</text><rect x="50" y="150" width="46" height="60" rx="4" fill="#f4f7fb" stroke="#cfd8e6"/><rect x="60" y="158" width="26" height="18" rx="3" fill="#e5484d"/>${m}<rect x="366" y="150" width="30" height="60" rx="4" fill="#f4f7fb" stroke="#cfd8e6"/><rect x="373" y="158" width="16" height="18" rx="3" fill="#f59009"/><rect x="50" y="120" width="346" height="20" rx="4" fill="#e9f2fb" stroke="#d3e6f8"/><text x="60" y="134" fill="#0e5ea6" font-family="Manrope" font-size="11" font-weight="700">RCD-protected · 18th Edition · Tested &amp; certified</text></svg>`;
  }
  function mapGraphic() {
    const t = S.locations ? S.locations.map(l => l.name) : [];
    const pts = [[108,94],[360,108],[150,238],[356,236],[252,286],[82,182]];
    const pin = (x,y,l,main) => { const s = main?1:0.72, col = main?'#df7f00':'#0f4c81';
      return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="12" rx="9" ry="3" fill="#0f1b2d" opacity=".12"/><path d="M0-24C8-24 15-17 15-9 15-1 0 11 0 11 0 11-15-1-15-9-15-17-8-24 0-24Z" fill="${col}"/><circle cy="-9" r="5.4" fill="#fff"/></g><text x="${x}" y="${y+27}" text-anchor="middle" font-family="Manrope,sans-serif" font-size="${main?13:11.5}" font-weight="${main?800:600}" fill="${main?'#0f1b2d':'#54627a'}">${esc(l)}</text>`; };
    let sec = ""; for (let i = 0; i < pts.length; i++) if (t[i+1]) sec += pin(pts[i][0], pts[i][1], t[i+1], false);
    return `<svg viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Service area map"><rect width="480" height="340" fill="#eef2f7"/><path d="M-20 238 Q 130 206 270 246 T 520 226 L520 360 L-20 360Z" fill="#e2ecf7"/><g stroke="#d7dfe9" stroke-width="5" fill="none"><path d="M0 108 Q 170 84 340 134 T 500 118"/><path d="M150 -12 Q 176 150 256 210"/><path d="M472 66 Q 352 128 300 250"/></g><g stroke="#9db6d1" stroke-width="1.4" stroke-dasharray="2 5" opacity=".7"><line x1="230" y1="150" x2="108" y2="94"/><line x1="230" y1="150" x2="356" y2="236"/><line x1="230" y1="150" x2="252" y2="286"/></g>${sec}${pin(230,150,t[0]||S.areaShort,true)}</svg>`;
  }
  function mapEl() { return S.mapEmbed
    ? `<iframe src="${S.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Service area map"></iframe>`
    : mapGraphic(); }
  function photoSlot(img, cap, icon) {
    return img ? `<img src="${img}" alt="${esc(cap)}">`
      : `<div class="ph-in">${svg(icon||'camera')}<span>Your photo here</span></div><div class="ph-cap">${esc(cap)}</div>`;
  }

  /* ---------------- shared chrome ---------------- */
  const navLinks = [["/services.html","Services"],["/about.html","Why us"],["/our-work.html","Our work"],["/reviews.html","Reviews"],["/areas.html","Areas"],["/contact.html","Contact"]];
  function header() {
    return `<div class="topbar"><div class="wrap">
      <span class="stars">★★★★★</span> <span><b>${esc(S.rating)}</b>/5 from <b>${esc(S.reviewCount)}</b> reviews</span>
      <span class="sep hide-sm"></span><span class="hide-sm">NICEIC Approved &amp; Part P Registered</span>
      <span class="tb-right"><span class="hide-sm">Need us today?</span> <a href="${tel}">${esc(S.phone)}</a></span></div></div>
    <header><div class="wrap nav">
      <a href="/" class="brand"><span class="mark" aria-hidden="true">${svg('bolt',true)}</span><span>${esc(S.name)}<small>${esc(S.areaShort)}</small></span></a>
      <nav>${navLinks.map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}</nav>
      <span class="spacer"></span>
      <a class="btn btn-accent" href="${tel}">${phoneSvg}<span class="hdr-cta-text">${esc(S.phone)}</span></a>
    </div></header>`;
  }
  function footer() {
    const svcs = (S.services||[]).map(s=>`<a href="/${s.slug}.html">${esc(s.name)}</a>`).join('');
    const areas = (S.locations||[]).slice(0,6).map(l=>`<a href="/electrician-in-${l.slug}.html">${esc(l.name)}</a>`).join('');
    return `<footer><div class="wrap">
      <div class="foot-grid">
        <div><a href="/" class="brand"><span class="mark" aria-hidden="true">${svg('bolt',true)}</span><span>${esc(S.name)}<small>${esc(S.areaShort)}</small></span></a>
          <p>Certified domestic &amp; commercial electricians covering ${esc(S.area)}. Fully insured, Part P registered, 18th Edition qualified.</p></div>
        <div class="foot-col"><h5>Services</h5>${svcs}</div>
        <div class="foot-col"><h5>Areas</h5>${areas}</div>
        <div class="foot-col"><h5>Get in touch</h5>
          <a href="${tel}">${esc(S.phone)}</a><a href="${mailto}">${esc(S.email)}</a><div>${esc(S.hours)}</div></div>
      </div>
      <div class="foot-bot"><div>© ${yr} ${esc(S.name)} · NICEIC Approved Contractor</div>
        <div>Website by <a href="${S.studioUrl||'#'}" style="color:inherit">${esc(S.studio)}</a></div></div>
    </div></footer>`;
  }
  function callbar() {
    return `<div class="callbar"><a class="btn btn-accent" href="${tel}">${phoneSvg}Call now</a><a class="btn btn-brand" href="/contact.html">Free quote</a></div>`;
  }

  /* ---------------- shared blocks ---------------- */
  function ctaBand(title, text) {
    return `<section class="cta-band"><div class="wrap">
      <h2>${title||'Need an electrician you can trust?'}</h2>
      <p>${text||'Call now for honest advice and a fast, fixed-price quote. No call-out fee.'}</p>
      <div class="row"><a class="btn btn-accent" href="${tel}">${phoneSvg}Call ${esc(S.phone)}</a>
      <a class="btn btn-outline" href="/contact.html">Request a call-back${arrowSvg}</a></div></div></section>`;
  }
  function leadForm() {
    return `<form class="lead reveal" id="leadForm" novalidate>
      <div id="formFields">
        <div class="fh">Request a free call-back</div>
        <div class="fsub">Takes 20 seconds. No obligation, no call-out fee.</div>
        <div class="field" id="f-name"><label>Your name <span class="req">*</span></label><input name="name" autocomplete="name" placeholder="e.g. Sarah Hughes"><span class="err-msg">Please enter your name.</span></div>
        <div class="row2"><div class="field" id="f-phone"><label>Phone <span class="req">*</span></label><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="07123 456789"><span class="err-msg">Enter a valid phone number.</span></div>
        <div class="field" id="f-postcode"><label>Postcode</label><input name="postcode" autocomplete="postal-code" placeholder="LS1 4DY"></div></div>
        <div class="field" id="f-service"><label>What do you need? <span class="req">*</span></label><select name="service"><option value="">Choose a service…</option>${(S.services||[]).map(s=>`<option>${esc(s.name)}</option>`).join('')}<option>Something else</option></select><span class="err-msg">Please pick a service.</span></div>
        <div class="field"><label>Details <span style="color:var(--faint);font-weight:500">(optional)</span></label><textarea name="message" placeholder="Briefly, what's happening?"></textarea></div>
        <label class="consent"><input type="checkbox" name="consent"><span>It's fine to contact me about my enquiry. We'll never share your details.</span></label>
        <button type="submit" class="btn btn-accent">Get my free call-back${arrowSvg}</button>
        <div class="form-note">Your details stay private. Average response under one hour.</div>
      </div>
      <div class="form-done" id="formDone"><div class="ok">${ico(ICONS.check,false)}</div><h3>Got it, thank you!</h3>
        <p>A qualified electrician will call you shortly. Need us right now? Call <b>${esc(S.phone)}</b>.</p></div>
    </form>`;
  }
  function contactCards() {
    return `<div class="cc-list">
      <a class="cc" href="${tel}"><span class="ci">${phoneSvg}</span><span><span class="lab">Call us</span><span class="val">${esc(S.phone)}</span></span></a>
      <a class="cc" href="${mailto}"><span class="ci">${ico(ICONS.mail,false)}</span><span><span class="lab">Email us</span><span class="val" style="font-size:16px">${esc(S.email)}</span></span></a>
    </div>`;
  }

  /* ---------------- page: HOME ---------------- */
  function homeHTML() {
    return `
    <section class="hero"><div class="wrap">
      <div class="hero-copy">
        <div class="h-badges"><span class="chip emg"><span class="d"></span>24/7 Emergency call-out</span><span class="chip"><span class="d"></span>No call-out fee</span></div>
        <h1 class="hero-h">Your local electrician for a <em>safe, sorted</em> home.</h1>
        <p class="hero-sub">Fuse-board upgrades, rewires, EV chargers and emergency repairs across <b>${esc(S.area)}</b>. On time, fixed price, and fully certified.</p>
        <div class="hero-cta"><a class="btn btn-accent" href="${tel}">${phoneSvg}Call ${esc(S.phone)}</a><a class="btn btn-outline" href="/contact.html">Get a free quote${arrowSvg}</a></div>
        <div class="hero-trust"><div class="t">${ico(ICONS.check,false)}<b>Same-day</b>&nbsp;emergencies</div><div class="t">${ico(ICONS.check,false)}<b>12-month</b>&nbsp;guarantee</div><div class="t">${ico(ICONS.check,false)}<b>£5m</b>&nbsp;insured</div></div>
      </div>
      <div class="hero-art reveal"><div class="frame">${consumerUnit('new')}</div>
        <div class="float rev"><div class="fi" style="background:var(--good-050);color:var(--good)">${svg('star',true)}</div><div><small>Google rating</small><b>${esc(S.rating)} ★★★★★</b></div></div>
        <div class="float cert"><div class="fi" style="background:var(--brand-050);color:var(--brand-600)">${svg('cert',false)}</div><div><small>Every job</small><b>Tested &amp; certified</b></div></div>
      </div>
    </div></section>
    <div class="accred"><div class="wrap"><span class="lab">Approved &amp; accredited by</span><div class="logos">${(S.accreditations||[]).map(([i,a,b])=>`<span class="acc">${svg(i)}<span>${esc(a)}<small>${esc(b)}</small></span></span>`).join('')}</div></div></div>
    <section class="sec wrap"><div class="sec-head reveal"><span class="eyebrow">Our services</span><h2>Every electrical job, one trusted team</h2><p>From a flickering light to a full rewire. Domestic, commercial and landlord work, all to the 18th Edition.</p></div>
      <div class="svc-grid">${(S.services||[]).map(s=>`<a class="svc ${s.hot?'hot':''}" href="/${s.slug}.html">${s.badge?`<span class="badge">${esc(s.badge)}</span>`:''}<div class="ico">${svg(s.icon)}</div><h3>${esc(s.name)}</h3><p>${esc(s.lede)}</p><span class="link">Learn more ${arrowSvg}</span></a>`).join('')}</div></section>
    <section class="why"><div class="sec wrap why-grid">
      <div class="photo reveal" style="aspect-ratio:4/5">${photoSlot(S.images&&S.images.about,'Your team / van photo','camera')}</div>
      <div class="reveal"><span class="eyebrow">Why choose us</span><h2 style="font-size:clamp(28px,3.8vw,40px);margin-top:16px">Local electricians you can rely on</h2>
        <p style="color:var(--muted);margin-top:16px;font-size:17.5px">We're a small, local team, not a call centre. You get the same qualified electrician each visit, a price agreed before any work starts, and every job signed off to national safety standards.</p>
        <ul class="guar">${(S.guarantees||[]).map(g=>`<li><span class="gi">${svg(g.icon)}</span><span><h4>${esc(g.title)}</h4><p>${esc(g.desc)}</p></span></li>`).join('')}</ul></div>
    </div></section>
    <section class="sec wrap"><div class="sec-head reveal"><span class="eyebrow">Recent work</span><h2>The difference a proper job makes</h2><p>Tired, unsafe fuse boxes replaced with modern, RCD-protected consumer units, fully tested and certified.</p></div>
      <div class="ba reveal"><figure class="ba-card before"><div class="art">${consumerUnit('old')}</div><figcaption class="cap"><span class="tag">Before</span><b>Unsafe rewireable fuse box</b></figcaption></figure>
      <figure class="ba-card after"><div class="art">${consumerUnit('new')}</div><figcaption class="cap"><span class="tag">After</span><b>New RCD-protected consumer unit</b></figcaption></figure></div>
      <p class="ba-note">On your live site, this becomes a gallery of your own before and after photos.</p></section>
    <section class="statsband"><div class="wrap stats reveal">${(S.stats||[]).map(st=>`<div class="stat"><div class="n" data-n="${st.n}" data-dec="${st.decimals||0}" data-pre="${st.prefix||''}" data-suf="${st.suffix||''}">${st.prefix||''}0${st.suffix||''}</div><div class="l">${esc(st.label)}</div></div>`).join('')}</div></section>
    ${reviewsSection()}
    ${areasSection()}
    ${contactSection()}`;
  }

  function reviewsSection(full) {
    const list = full ? (S.reviews||[]) : (S.reviews||[]).slice(0,3);
    const avc = ['#0f4c81','#0e5ea6','#f59009'];
    return `<section class="sec wrap" id="reviews"><div class="sec-head reveal"><span class="eyebrow">Reviews</span><h2>Trusted by <span style="color:var(--brand-600)">${esc(S.reviewCount)}</span>+ local homes &amp; businesses</h2><p>Most of our work comes from word of mouth. Here's why.</p></div>
      <div class="reviews reveal">${list.map((r,i)=>`<figure class="rev"><div class="top"><span class="stars">★★★★★</span><span class="g">${svg('star',true)} Google</span></div><blockquote><p>“${esc(r.text)}”</p></blockquote><figcaption class="who"><span class="av" style="background:${avc[i%3]}">${esc(r.name.trim()[0])}</span><span><b>${esc(r.name)}</b><span>${esc(r.meta)}</span></span></figcaption></figure>`).join('')}</div></section>`;
  }
  function areasSection() {
    return `<section class="areas" id="areas"><div class="sec wrap area-grid">
      <div class="reveal"><span class="eyebrow">Where we work</span><h2 style="font-size:clamp(28px,3.8vw,40px);margin-top:16px">Proudly covering <span style="color:var(--brand-600)">${esc(S.areaShort)}</span> &amp; nearby</h2>
        <p style="color:var(--muted);margin-top:16px;font-size:17px">Fast, local response across the region. Not sure if we cover you? Give us a call, we probably do.</p>
        <div class="area-list">${(S.locations||[]).map(l=>`<a href="/electrician-in-${l.slug}.html"><span>${svg('pin')}${esc(l.name)}</span></a>`).join('')}</div></div>
      <div class="mapbox reveal">${mapEl()}</div></div></section>`;
  }
  function contactSection() {
    return `<section class="sec cta-sec" id="contact"><div class="wrap cta-inner">
      <div class="cta-copy reveal"><span class="eyebrow">Get in touch</span><h2>Tell us the problem and we'll call you straight back</h2>
        <p>Emergency or planned, leave your number and a qualified electrician will ring you, usually within the hour during working hours.</p>${contactCards()}</div>
      ${leadForm()}</div></section>`;
  }

  /* ---------------- page: SERVICE ---------------- */
  function serviceHTML(key) {
    const s = (S.services||[]).find(x => x.slug === key);
    if (!s) return `<section class="sec wrap"><h1>Service not found</h1></section>`;
    return `
    <section class="page-hero"><div class="wrap">
      <div class="crumbs"><a href="/">Home</a>${arrowSvg}<a href="/services.html">Services</a>${arrowSvg}<span>${esc(s.name)}</span></div>
      <h1>${esc(s.h1)}</h1><p class="lede">${esc(s.lede)}</p>
      <div class="hero-cta"><a class="btn btn-accent" href="${tel}">${phoneSvg}Call ${esc(S.phone)}</a><a class="btn btn-outline" href="/contact.html">Get a quote${arrowSvg}</a></div>
    </div></section>
    <section class="sec wrap"><div class="two-col">
      <div class="prose reveal">
        ${(s.intro||[]).map((p,i)=>`<p class="${i===0?'lead':''}">${esc(p)}</p>`).join('')}
        <h2>What's included</h2><ul>${(s.includes||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
        <h2>Common questions</h2><div class="faq">${(s.faqs||[]).map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
      </div>
      <aside class="aside reveal">
        <div class="card quote"><h4>Free, fixed-price quote</h4><div class="big">${esc(S.phone)}</div><p>Call now or request a call-back. No call-out fee.</p><a class="btn btn-accent" href="${tel}">${phoneSvg}Call now</a></div>
        <div class="card"><h4>Why ${esc(S.name)}?</h4><ul class="prose" style="margin-top:6px">${(S.guarantees||[]).slice(0,3).map(g=>`<li>${esc(g.title)}</li>`).join('')}</ul><a class="btn btn-outline" href="/contact.html" style="margin-top:8px">Request a call-back</a></div>
      </aside>
    </div></section>
    ${otherServices(key)}
    ${reviewsSection()}
    ${ctaBand()}`;
  }
  function otherServices(exclude) {
    const list = (S.services||[]).filter(s => s.slug !== exclude).slice(0,3);
    return `<section class="sec wrap"><div class="sec-head reveal"><span class="eyebrow">More services</span><h2>We also help with</h2></div>
      <div class="tiles">${list.map(s=>`<a class="tile" href="/${s.slug}.html"><div class="ico">${svg(s.icon)}</div><h3>${esc(s.name)}</h3><p>${esc(s.lede)}</p><span class="link">Learn more ${arrowSvg}</span></a>`).join('')}</div></section>`;
  }

  /* ---------------- page: LOCATION ---------------- */
  function locationHTML(key) {
    const l = (S.locations||[]).find(x => x.slug === key);
    if (!l) return `<section class="sec wrap"><h1>Area not found</h1></section>`;
    const n = l.name;
    return `
    <section class="page-hero"><div class="wrap">
      <div class="crumbs"><a href="/">Home</a>${arrowSvg}<a href="/areas.html">Areas</a>${arrowSvg}<span>${esc(n)}</span></div>
      <h1>Electrician in ${esc(n)}</h1><p class="lede">${esc(S.name)} is your local, fully certified electrician in ${esc(n)}. Fuse boards, rewires, EV chargers, EICRs and 24/7 emergency call-out, on time and fixed price.</p>
      <div class="hero-cta"><a class="btn btn-accent" href="${tel}">${phoneSvg}Call ${esc(S.phone)}</a><a class="btn btn-outline" href="/contact.html">Get a quote${arrowSvg}</a></div>
    </div></section>
    <section class="sec wrap"><div class="two-col">
      <div class="prose reveal">
        <p class="lead">Looking for a reliable electrician in ${esc(n)}? We're a local, NICEIC-approved team covering ${esc(n)} and the surrounding area, trusted by ${esc(S.reviewCount)}+ homes and businesses with a ${esc(S.rating)}-star rating.</p>
        <p>Whether it's an emergency call-out, a fuse board that keeps tripping, a full rewire or a new EV charger, we turn up when we say, agree a fixed price before we start, and leave every job tested and certified.</p>
        <h2>Electrical services in ${esc(n)}</h2>
        <ul>${(S.services||[]).map(s=>`<li><a href="/${s.slug}.html" style="color:var(--brand-600);font-weight:600">${esc(s.name)}</a></li>`).join('')}</ul>
        <h2>Why ${esc(n)} chooses us</h2>
        <ul>${(S.guarantees||[]).map(g=>`<li>${esc(g.title)}: ${esc(g.desc)}</li>`).join('')}</ul>
      </div>
      <aside class="aside reveal">
        <div class="card quote"><h4>Local electrician in ${esc(n)}</h4><div class="big">${esc(S.phone)}</div><p>Fast response across ${esc(n)}. Call or request a call-back.</p><a class="btn btn-accent" href="${tel}">${phoneSvg}Call now</a></div>
        <div class="card"><h4>Also covering</h4><div class="area-list" style="margin-top:6px">${(S.locations||[]).filter(x=>x.slug!==key).slice(0,6).map(x=>`<a href="/electrician-in-${x.slug}.html"><span>${svg('pin')}${esc(x.name)}</span></a>`).join('')}</div></div>
      </aside>
    </div></section>
    ${reviewsSection()}
    ${ctaBand('Need an electrician in '+esc(n)+'?')}`;
  }

  /* ---------------- page: SERVICES INDEX / AREAS / REVIEWS / GALLERY / ABOUT / CONTACT ---------------- */
  function servicesIndexHTML() {
    return `<section class="page-hero"><div class="wrap"><div class="crumbs"><a href="/">Home</a>${arrowSvg}<span>Services</span></div>
      <h1>Our electrical services</h1><p class="lede">Domestic, commercial and landlord work across ${esc(S.area)}, all completed to the 18th Edition and fully certified.</p></div></section>
      <section class="sec wrap"><div class="tiles">${(S.services||[]).map(s=>`<a class="tile" href="/${s.slug}.html"><div class="ico">${svg(s.icon)}</div><h3>${esc(s.name)}</h3><p>${esc(s.lede)}</p><span class="link">Learn more ${arrowSvg}</span></a>`).join('')}</div></section>${ctaBand()}`;
  }
  function areasHTML() {
    return `<section class="page-hero"><div class="wrap"><div class="crumbs"><a href="/">Home</a>${arrowSvg}<span>Areas</span></div>
      <h1>Areas we cover</h1><p class="lede">Fast, local response across ${esc(S.area)}. If your town isn't listed, give us a call, we probably cover you.</p></div></section>
      <section class="sec wrap"><div class="area-grid"><div>
        <div class="tiles" style="grid-template-columns:repeat(2,1fr)">${(S.locations||[]).map(l=>`<a class="tile" href="/electrician-in-${l.slug}.html"><div class="ico">${svg('pin')}</div><h3>${esc(l.name)}</h3><p>Local electrician in ${esc(l.name)}</p></a>`).join('')}</div>
      </div><div class="mapbox reveal">${mapEl()}</div></div></section>${ctaBand()}`;
  }
  function reviewsPageHTML() {
    return `<section class="page-hero"><div class="wrap"><div class="crumbs"><a href="/">Home</a>${arrowSvg}<span>Reviews</span></div>
      <h1>What our customers say</h1><p class="lede">Rated ${esc(S.rating)} out of 5 by ${esc(S.reviewCount)}+ local homes and businesses.</p></div></section>${reviewsSection(true)}${ctaBand()}`;
  }
  function galleryHTML() {
    const imgs = (S.images && S.images.gallery) || [];
    const cells = imgs.length ? imgs : new Array(6).fill("");
    return `<section class="page-hero"><div class="wrap"><div class="crumbs"><a href="/">Home</a>${arrowSvg}<span>Our work</span></div>
      <h1>Recent work</h1><p class="lede">A selection of recent jobs across ${esc(S.area)}. On your live site this is a gallery of your own photos.</p></div></section>
      <section class="sec wrap"><div class="gallery">${cells.map((im,i)=>`<div class="photo">${photoSlot(im,'Job photo '+(i+1),'camera')}</div>`).join('')}</div></section>${ctaBand()}`;
  }
  function aboutHTML() {
    return `<section class="page-hero"><div class="wrap"><div class="crumbs"><a href="/">Home</a>${arrowSvg}<span>Why us</span></div>
      <h1>About ${esc(S.name)}</h1><p class="lede">A small, local, fully certified team you can actually rely on.</p></div></section>
      <section class="sec wrap"><div class="why-grid"><div class="photo reveal" style="aspect-ratio:4/5">${photoSlot(S.images&&S.images.about,'Your team / van photo','camera')}</div>
        <div class="prose reveal"><p class="lead">We've been keeping homes and businesses across ${esc(S.area)} safe and powered since ${S.yearsEstablished||''}. We're not a call centre or a national chain, just a local team who take pride in doing the job properly.</p>
        <p>Every electrician is qualified to the 18th Edition and Part P registered, so every job is notified, tested and certified. We agree a fixed price before we start, turn up when we say, and treat your home like our own.</p>
        <ul class="guar">${(S.guarantees||[]).map(g=>`<li><span class="gi">${svg(g.icon)}</span><span><h4>${esc(g.title)}</h4><p>${esc(g.desc)}</p></span></li>`).join('')}</ul></div></div></section>
      <section class="statsband"><div class="wrap stats reveal">${(S.stats||[]).map(st=>`<div class="stat"><div class="n" data-n="${st.n}" data-dec="${st.decimals||0}" data-pre="${st.prefix||''}" data-suf="${st.suffix||''}">${st.prefix||''}0${st.suffix||''}</div><div class="l">${esc(st.label)}</div></div>`).join('')}</div></section>${ctaBand()}`;
  }
  function contactHTML() {
    return `<section class="page-hero"><div class="wrap"><div class="crumbs"><a href="/">Home</a>${arrowSvg}<span>Contact</span></div>
      <h1>Get in touch</h1><p class="lede">Emergency or planned, tell us the problem and a qualified electrician will call you straight back.</p></div></section>
      <section class="sec wrap"><div class="cta-inner">
        <div class="cta-copy reveal"><span class="eyebrow">Contact us</span><h2 style="font-size:clamp(26px,3.4vw,36px);margin-top:14px">We'll call you back, usually within the hour</h2>
          <p style="color:var(--muted);margin-top:14px;font-size:17px">Lines open ${esc(S.hours)}.</p>${contactCards()}
          <div class="mapbox reveal" style="margin-top:22px">${mapEl()}</div></div>
        ${leadForm()}</div></section>`;
  }

  /* ---------------- config binding + widgets ---------------- */
  function initReveals() {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: .06 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
  function countUp(el) { const t = +el.dataset.n, dec = +el.dataset.dec, pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = performance.now();
    (function tick(now){ const p = Math.min(1,(now-t0)/1400), e = 1-Math.pow(1-p,3), v = t*e; el.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString()) + suf; if (p<1) requestAnimationFrame(tick); })(t0); }
  function initStats() { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } }), { threshold: .5 }); document.querySelectorAll('.stat .n').forEach(n => io.observe(n)); }
  function initForm() {
    const form = document.getElementById('leadForm'); if (!form) return;
    const setErr = (id,b) => document.getElementById(id).classList.toggle('invalid',b);
    form.addEventListener('submit', async e => { e.preventDefault(); const f = form.elements;
      const okN = f.name.value.trim().length>1, okP = digits(f.phone.value).replace('+','').length>=7, okS = !!f.service.value;
      setErr('f-name',!okN); setErr('f-phone',!okP); setErr('f-service',!okS);
      if (!(okN&&okP&&okS)) { (form.querySelector('.invalid input,.invalid select')||{}).focus?.(); return; }
      const payload = { name:f.name.value.trim(), phone:f.phone.value.trim(), postcode:f.postcode.value.trim(), service:f.service.value, message:f.message.value.trim(), source:location.href };
      if (S.formEndpoint) { try { await fetch(S.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); } catch(err){} }
      document.getElementById('formFields').style.display='none';
      document.getElementById('formDone').style.display='block';
      document.getElementById('formDone').scrollIntoView({behavior:'smooth',block:'center'});
    });
  }
  function injectSchema(page, key) {
    const a = S.address||{}, g = S.geo||{};
    const ld = { "@context":"https://schema.org","@type":"Electrician","name":S.name,"telephone":S.phone,"email":S.email,
      "areaServed":S.area,"priceRange":"££","url":(S.baseUrl||'')+location.pathname,
      "address":{"@type":"PostalAddress","streetAddress":a.street,"addressLocality":a.locality,"addressRegion":a.region,"postalCode":a.postcode,"addressCountry":a.country||"GB"},
      "aggregateRating":{"@type":"AggregateRating","ratingValue":S.rating,"reviewCount":S.reviewCount} };
    if (g.lat && g.lng) ld.geo = { "@type":"GeoCoordinates","latitude":g.lat,"longitude":g.lng };
    const sc = document.createElement('script'); sc.type='application/ld+json'; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc);
    // FAQ schema on service pages
    if (page === 'service') { const s = (S.services||[]).find(x=>x.slug===key);
      if (s && s.faqs && s.faqs.length) { const fq = { "@context":"https://schema.org","@type":"FAQPage","mainEntity":s.faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}})) };
        const s2 = document.createElement('script'); s2.type='application/ld+json'; s2.textContent = JSON.stringify(fq); document.head.appendChild(s2); } }
  }

  /* ---------------- boot ---------------- */
  const set = (id, html) => { const n = document.getElementById(id); if (n) n.innerHTML = html; };
  set('site-header', header());
  set('site-footer', footer());
  set('site-callbar', callbar());

  const app = document.getElementById('app');
  const page = app ? app.dataset.page : null;
  const key = app ? app.dataset.key : null;
  if (app) {
    const R = { home:homeHTML, services:servicesIndexHTML, areas:areasHTML, reviews:reviewsPageHTML, gallery:galleryHTML, about:aboutHTML, contact:contactHTML };
    if (page === 'service') app.innerHTML = serviceHTML(key);
    else if (page === 'location') app.innerHTML = locationHTML(key);
    else if (R[page]) app.innerHTML = R[page]();
  }
  // year fill for static legal pages
  document.querySelectorAll('[data-year]').forEach(n => n.textContent = yr);
  document.querySelectorAll('[data-cfg]').forEach(el => { const k = el.getAttribute('data-cfg'); if (S[k] != null) el.textContent = S[k]; });
  document.querySelectorAll('[data-tel]').forEach(el => el.href = tel);
  document.querySelectorAll('[data-mailto]').forEach(el => el.href = mailto);

  // Auto page title + meta description (keeps SEO tags config-driven on reskin)
  function metaInfo(page, key) {
    const n = S.name, area = S.areaShort;
    if (page === 'service') { const s = (S.services||[]).find(x=>x.slug===key)||{}; return [`${s.h1} in ${area} | ${n}`, s.lede]; }
    if (page === 'location') { const l = (S.locations||[]).find(x=>x.slug===key)||{}; return [`Electrician in ${l.name} | ${n}`, `Local, certified electrician in ${l.name}. Fuse boards, rewires, EV chargers, EICRs and 24/7 emergency call-out. Call ${S.phone}.`]; }
    const map = {
      home:[`Electrician in ${area} | ${n}`, `${n}: certified local electricians across ${S.area}. Fuse boards, rewires, EV chargers, EICRs and 24/7 emergency call-out. Fixed prices, fully insured.`],
      services:[`Electrical services in ${area} | ${n}`, `Domestic, commercial and landlord electrical services across ${S.area}, all to the 18th Edition.`],
      areas:[`Areas we cover | ${n}`, `${n} covers ${S.area}. Find your local, certified electrician.`],
      reviews:[`Reviews | ${n}`, `Rated ${S.rating} out of 5 by ${S.reviewCount}+ local customers across ${S.area}.`],
      gallery:[`Our recent work | ${n}`, `A selection of recent electrical work across ${S.area}.`],
      about:[`About us | ${n}`, `${n}: local, certified electricians serving ${S.area} since ${S.yearsEstablished||''}. Fully insured and Part P registered.`],
      contact:[`Contact | ${n}`, `Call ${S.phone} for a fast, fixed-price quote from your local electrician in ${area}.`],
    };
    return map[page] || [n, S.tagline];
  }
  if (page) {
    const [t, d] = metaInfo(page, key);
    if (t) document.title = t;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    if (d) m.content = d;
  }
  if (S.baseUrl) {
    const canon = S.baseUrl.replace(/\/$/, '') + location.pathname;
    let l = document.querySelector('link[rel="canonical"]');
    if (!l) { l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l); }
    l.href = canon;
    let og = document.querySelector('meta[property="og:url"]');
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', 'og:url'); document.head.appendChild(og); }
    og.content = canon;
  }

  initReveals(); initStats(); initForm();
  if (page) injectSchema(page, key);
})();
