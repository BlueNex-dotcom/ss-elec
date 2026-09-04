/* ============================================================================
   SITE CONFIG — reskin an entire client site by editing THIS one file.
   Business details, services, service areas, reviews and imagery all live here.
   ============================================================================ */
window.SITE = {
  name: "Voltline Electrical",
  tagline: "Your local electrician for a safe, sorted home",
  phone: "0113 460 1122",
  email: "hello@voltline.co.uk",
  area: "Leeds & West Yorkshire",
  areaShort: "Leeds",
  hours: "Mon to Sat, 7am to 7pm · 24/7 emergencies",
  rating: "4.9",
  reviewCount: "214",
  yearsEstablished: 2009,
  studio: "StarScaling",
  studioUrl: "https://starscaling.com",

  // Deployment
  baseUrl: "https://www.voltline.co.uk",     // live domain (no trailing slash)
  formEndpoint: "",                          // GHL inbound-webhook URL. Blank = demo mode.
  images: { about: "", gallery: ["", "", "", "", "", ""] }, // real photo URLs on the live site
  mapEmbed: "",                              // Google Maps "Embed a map" src on the live site
  address: { street: "Unit 4, Kirkstall Rd", locality: "Leeds", region: "West Yorkshire", postcode: "LS4 2AZ", country: "GB" },
  geo: { lat: 53.8008, lng: -1.5491 },
  social: { facebook: "", instagram: "" },

  accreditations: [
    ["shield", "NICEIC", "Approved Contractor"],
    ["cert", "Part P", "Registered"],
    ["doc", "18th Edition", "Qualified"],
    ["wallet", "£5m", "Public Liability"],
    ["bolt", "OZEV", "EV Installer"],
  ],

  stats: [
    { n: 15, suffix: "+", label: "Years experience" },
    { n: 6200, suffix: "+", label: "Jobs completed" },
    { n: 4.9, decimals: 1, label: "Average rating" },
    { n: 60, prefix: "<", suffix: " min", label: "Emergency response" },
  ],

  guarantees: [
    { icon: "shield", title: "Certified & registered", desc: "Part P registered and NICEIC approved. Every job notified and certified." },
    { icon: "doc", title: "Backed in writing", desc: "A 12-month workmanship guarantee with every completed job." },
    { icon: "wallet", title: "Fixed, upfront prices", desc: "You approve the price before we start. No call-out fee, no surprises." },
    { icon: "clock", title: "On time & tidy", desc: "We turn up when we say, protect your home, and clean up after." },
  ],

  reviews: [
    { name: "Sarah H.", meta: "Fuse board · Headingley", text: "Board kept tripping and two firms never showed. Voltline came same day, found the fault in 20 minutes and fitted a new consumer unit. Spotless." },
    { name: "Mark T.", meta: "EV charger · Horsforth", text: "Tidy, punctual and clearly knew their stuff. Install was faster than quoted and they walked me through everything. Wouldn't use anyone else." },
    { name: "Priya R.", meta: "EICR · Chapel Allerton", text: "Needed a landlord certificate fast. Booked next day, professional report emailed the same evening. Fair price and genuinely lovely people." },
    { name: "David C.", meta: "Rewire · Pudsey", text: "Full rewire of a 1930s semi. Clear quote, no mess left behind, and every socket exactly where we wanted. Couldn't fault them." },
    { name: "Emma W.", meta: "Lighting · Roundhay", text: "Fitted downlights across the whole ground floor plus outdoor lights. Really tidy work and great advice on what would look best." },
    { name: "James P.", meta: "Emergency · Morley", text: "Lost all power at 9pm with a newborn in the house. Answered straight away and had us back on within the hour. Absolute lifesavers." },
  ],

  // The service pages. Each becomes /<slug>.html and is listed on the home + services pages.
  services: [
    {
      slug: "fuse-boards", name: "Fuse board upgrades", short: "Fuse boards", icon: "board", hot: false,
      h1: "Fuse board & consumer unit upgrades",
      lede: "Swap an old, unsafe fuse box for a modern RCD-protected consumer unit, fully tested and certified.",
      intro: [
        "If your home still has an old-style fuse box with rewireable fuses, it offers none of the protection modern wiring regulations require. A modern consumer unit adds RCD and RCBO protection that cuts the power in a fraction of a second if a fault could give someone a shock.",
        "We supply and fit modern consumer units across " + "the area" + ", test every circuit, and hand you a full Electrical Installation Certificate for your records.",
      ],
      includes: [
        "Free assessment and fixed, upfront price",
        "Modern RCD/RCBO-protected consumer unit supplied and fitted",
        "Every circuit tested and labelled clearly",
        "Full Electrical Installation Certificate issued",
        "Work notified under Part P Building Regulations",
        "Tidy, careful work with minimal disruption",
      ],
      faqs: [
        { q: "How long does a fuse board replacement take?", a: "Most domestic consumer unit upgrades are completed in a single day. We'll confirm timings when we quote." },
        { q: "Will my power be off all day?", a: "Only for part of the job. We isolate circuits in stages and keep disruption to a minimum, and we'll always let you know before the power goes off." },
        { q: "Do I get a certificate?", a: "Yes. Every upgrade comes with a full Electrical Installation Certificate and is notified under Part P." },
      ],
    },
    {
      slug: "rewires", name: "Full & partial rewires", short: "Rewires", icon: "house",
      h1: "Full & partial house rewiring",
      lede: "Whole-home and partial rewiring with minimal mess, clear fixed pricing, and full certification.",
      intro: [
        "Old or damaged wiring is a genuine fire and shock risk, and it rarely meets today's standards. Whether you're renovating, have just bought a period property, or your sockets and lights are showing their age, a rewire brings everything up to a safe, modern standard.",
        "We plan the work around you, agree exactly where every socket and switch goes, and keep the mess to an absolute minimum. When we're done, the installation is tested, certified and ready for years of safe use.",
      ],
      includes: [
        "Free survey and detailed, fixed quotation",
        "Full or partial rewires to the 18th Edition",
        "New sockets, switches and lighting positioned to suit you",
        "Careful work that protects your home and décor",
        "Full testing and Electrical Installation Certificate",
        "12-month workmanship guarantee",
      ],
      faqs: [
        { q: "How long does a rewire take?", a: "A typical three-bedroom home takes around 5 to 8 days depending on access and scope. We'll give you a clear schedule with your quote." },
        { q: "Do I need to move out?", a: "Usually not. We work room by room so you can stay in the property, and we'll agree the plan with you first." },
        { q: "How much does a rewire cost?", a: "It depends on the size and condition of the property. We give a fixed, itemised price after a free survey, with no obligation." },
      ],
    },
    {
      slug: "ev-chargers", name: "EV charger installation", short: "EV chargers", icon: "ev",
      h1: "EV charger installation",
      lede: "OZEV-approved home and workplace charge-point installation, neatly done and safely certified.",
      intro: [
        "Charging at home is cheaper and far more convenient than relying on public chargers. As approved installers we fit the leading home charge points, set them up on your app, and make sure your consumer unit and earthing are ready to support it safely.",
        "We handle the whole job: a tidy cable run, a properly protected circuit, testing, and certification, so you can plug in and go.",
      ],
      includes: [
        "Advice on the right charger for your car and driveway",
        "Approved 7kW smart chargers supplied and fitted",
        "Dedicated, protected circuit and earthing checks",
        "Neat cable routing and a tidy finish",
        "App set-up and a full demonstration",
        "Tested, certified and notified under Part P",
      ],
      faqs: [
        { q: "How long does an EV charger install take?", a: "Most installs are completed in a few hours on the same day." },
        { q: "Can you install any charger?", a: "We fit the main approved brands and will recommend the best option for your car and property. If you've already bought one, we can usually fit that too." },
        { q: "Do I need my fuse board upgraded first?", a: "Not always. We check your existing board and earthing as part of the quote and tell you honestly if anything needs doing." },
      ],
    },
    {
      slug: "eicr-testing", name: "EICR & safety certificates", short: "EICR & testing", icon: "cert",
      h1: "EICR & electrical safety certificates",
      lede: "Electrical safety inspections and certificates for homeowners and landlords, to the 18th Edition.",
      intro: [
        "An Electrical Installation Condition Report (EICR) is a thorough inspection of your property's wiring, sockets and consumer unit. Landlords are legally required to have a valid EICR at least every five years, and homeowners often get one for peace of mind or before selling.",
        "We carry out the inspection with minimal disruption, explain anything that needs attention in plain English, and email your certificate promptly.",
      ],
      includes: [
        "Full inspection and testing of the installation",
        "Clear, plain-English report of any issues found",
        "Fast, professional certificate for landlords and sellers",
        "Fixed price with no hidden extras",
        "Any remedial work quoted separately and clearly",
        "Reminders when your next inspection is due",
      ],
      faqs: [
        { q: "How long is an EICR valid?", a: "For rented homes it's a maximum of five years, or at change of tenancy. Owner-occupiers are advised to test every ten years." },
        { q: "How long does the inspection take?", a: "A typical domestic EICR takes 2 to 4 hours depending on the size of the property and number of circuits." },
        { q: "What if it fails?", a: "We'll explain exactly what needs doing and why, and give you a clear, separate quote for any remedial work. There's no obligation to use us for it." },
      ],
    },
    {
      slug: "emergency-electrician", name: "24/7 emergency electrician", short: "Emergency", icon: "bolt", hot: true, badge: "24/7",
      h1: "24/7 emergency electrician",
      lede: "Lost power, tripping RCD or a burning smell? A qualified electrician on the way, day or night.",
      intro: [
        "Electrical emergencies don't wait for office hours. A total power loss, a fuse board that won't reset, scorched sockets or a burning smell all need a qualified electrician quickly and safely.",
        "We answer the phone day and night and aim to be with you fast, make the situation safe, and get your power back on with a clear, fair price agreed before we start.",
      ],
      includes: [
        "Genuine 24/7 phone line, answered by a real electrician",
        "Fast local response, typically under an hour",
        "Made safe first, then a clear fixed price to fix",
        "Power loss, faults, scorched sockets and tripping boards",
        "No inflated 'emergency' mark-ups",
        "Fully tested and certified once repaired",
      ],
      faqs: [
        { q: "What counts as an electrical emergency?", a: "Total loss of power, a consumer unit that keeps tripping, burning smells, scorch marks, sparking sockets, or exposed live wiring. If in doubt, call us and switch off at the mains." },
        { q: "How quickly can you get here?", a: "For local emergencies we typically arrive within the hour. Call us and we'll give you an honest ETA." },
        { q: "Do you charge more at night?", a: "We're upfront about any out-of-hours rate before we set off, and we never inflate prices because it's an emergency." },
      ],
    },
    {
      slug: "lighting", name: "Lighting & sockets", short: "Lighting & sockets", icon: "bulb",
      h1: "Lighting, sockets & extra power",
      lede: "Downlights, extra sockets, outdoor lighting and smart controls, fitted properly and safely.",
      intro: [
        "The right lighting transforms a room, and having sockets where you actually need them makes daily life easier. From a few spotlights to a full lighting scheme, indoor or out, we fit it neatly and safely.",
        "We'll advise on the best options for the look and feel you want, then install everything to a high standard with the minimum of mess.",
      ],
      includes: [
        "LED downlights and spotlights",
        "Extra sockets, USB points and outdoor power",
        "Garden, security and feature lighting",
        "Smart lighting and dimmer controls",
        "Advice on layout and energy-efficient options",
        "Neat, tested and certified work",
      ],
      faqs: [
        { q: "Can you fit smart lighting?", a: "Yes, we install smart switches, dimmers and app-controlled lighting and will set it up and show you how it works." },
        { q: "Do you do outdoor lighting?", a: "Absolutely, from security and garden lighting to outdoor sockets, all properly weatherproofed and protected." },
      ],
    },
  ],

  // Towns for local-SEO landing pages: each becomes /electrician-in-<slug>.html
  locations: [
    { slug: "leeds", name: "Leeds" },
    { slug: "headingley", name: "Headingley" },
    { slug: "horsforth", name: "Horsforth" },
    { slug: "chapel-allerton", name: "Chapel Allerton" },
    { slug: "roundhay", name: "Roundhay" },
    { slug: "pudsey", name: "Pudsey" },
    { slug: "morley", name: "Morley" },
    { slug: "otley", name: "Otley" },
    { slug: "wetherby", name: "Wetherby" },
    { slug: "garforth", name: "Garforth" },
  ],
};
