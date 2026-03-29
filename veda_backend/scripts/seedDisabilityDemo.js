/**
 * Seeds disability-support themed demo content (services, home, about, FAQ, podcasts, etc.).
 * Clears existing content collections but keeps users. Run: npm run seed:demo
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Services = require("../models/services");
const About = require("../models/about");
const Dashboard = require("../models/dashboard");
const PathNav = require("../models/path");
const Faq = require("../models/faq");
const Podcast = require("../models/podcast");
const Resource = require("../models/resource");
const Blog = require("../models/blogs");
const Contact = require("../models/contact");
const Review = require("../models/review");
const Social = require("../models/social");

const root = path.join(__dirname, "..");

const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

function writeAsset(subdir, filename) {
  const dir = path.join(root, "uploads", subdir);
  fs.mkdirSync(dir, { recursive: true });
  const full = path.join(dir, filename);
  fs.writeFileSync(full, PNG_1X1);
  const rel = path.join("uploads", subdir, filename).replace(/\\/g, "/");
  return { filename, location: rel };
}

async function clearContent() {
  await Promise.all([
    Services.deleteMany({}),
    About.deleteMany({}),
    Dashboard.deleteMany({}),
    PathNav.deleteMany({}),
    Faq.deleteMany({}),
    Podcast.deleteMany({}),
    Resource.deleteMany({}),
    Blog.deleteMany({}),
    Contact.deleteMany({}),
    Review.deleteMany({}),
    Social.deleteMany({}),
  ]);
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI");
    process.exit(1);
  }
  await mongoose.connect(uri);
  await clearContent();

  const svcAssets = (key) => ({
    banner: writeAsset("services", `demo-${key}-banner.png`),
    image: writeAsset("services", `demo-${key}-thumb.png`),
  });

  const serviceDefs = [
    {
      key: "coord",
      name: "Support Coordination",
      sortName: "We help you understand your plan, choose providers, and coordinate services so supports work together.",
      titleOne: "Person-centred planning",
      containtOne:
        "Our support coordinators walk beside you through NDIS or equivalent funding. We focus on your goals, choice, and control—linking therapists, community programs, and daily supports without overwhelming you with jargon.",
      titleTwo: "Advocacy and capacity building",
      containtTwo:
        "We assist with plan reviews, service agreements, and resolving issues with providers. You stay in charge; we help you build confidence to self-advocate over time.",
    },
    {
      key: "daily",
      name: "Daily Living & Personal Care",
      sortName: "Respectful assistance with everyday routines at home and in the community.",
      titleOne: "Dignity-first personal care",
      containtOne:
        "Trained support workers provide assistance with grooming, meal preparation, medication prompts (as per plan), and household tasks—always aligned with your preferences and cultural needs.",
      titleTwo: "Flexible scheduling",
      containtTwo:
        "Morning, evening, or weekend shifts where available. We match staff skills to your communication style, sensory needs, and mobility requirements.",
    },
    {
      key: "community",
      name: "Community Access & Participation",
      sortName: "Inclusive outings, skills, and social connection.",
      titleOne: "Get out and belong",
      containtOne:
        "From sports, arts, and volunteering to learning public transport, we support you to join activities that matter to you—with accessibility and pacing that respect your energy and boundaries.",
      titleTwo: "Skill building",
      containtTwo:
        "We practice money handling, wayfinding, and social scenarios in real settings so confidence grows step by step.",
    },
    {
      key: "allied",
      name: "Allied Health & Therapies",
      sortName: "OT, physio, speech, and behaviour supports coordinated with your goals.",
      titleOne: "Evidence-informed therapy",
      containtOne:
        "We coordinate with OT, physiotherapy, speech pathology, and positive behaviour support practitioners to align recommendations with your home, school, or workplace.",
      titleTwo: "Whole-team communication",
      containtTwo:
        "Therapists, support workers, and family share clear goals and strategies so everyone pulls in the same direction.",
    },
    {
      key: "sil",
      name: "Supported Independent Living (SIL)",
      sortName: "Shared or individual living with 24/7 or rostered support as funded.",
      titleOne: "Safe, accessible homes",
      containtOne:
        "We focus on compatible housemates, accessible design, and consistent rosters so daily life is predictable and respectful of sensory and communication needs.",
      titleTwo: "Life skills at home",
      containtTwo:
        "Cooking, budgeting, and household routines are practiced with patient coaching toward the independence level you want.",
    },
    {
      key: "planmgmt",
      name: "Plan Management",
      sortName: "We pay provider invoices and help you track your budget—NDIS plan-managed participants.",
      titleOne: "Less paperwork",
      containtOne:
        "We process invoices in line with NDIS price guides, query discrepancies with providers, and give you clear statements so you always know what is left in each category.",
      titleTwo: "Transparent reporting",
      containtTwo:
        "Monthly summaries in plain language. Ask us anything—no silly questions when it comes to your funding.",
    },
  ];

  for (const s of serviceDefs) {
    const b = svcAssets(s.key);
    await Services.create({
      name: s.name,
      sortName: s.sortName,
      titleOne: s.titleOne,
      containtOne: s.containtOne,
      titleTwo: s.titleTwo,
      containtTwo: s.containtTwo,
      banner: b.banner.filename,
      bannerLocation: b.banner.location,
      image: b.image.filename,
      imageLocation: b.image.location,
    });
  }

  const abBanner = writeAsset("about", "demo-about-banner.png");
  const abVision = writeAsset("about", "demo-vision-banner.png");
  await About.create({
    name: "VIDA Disability Support",
    titleOne: "Who we are",
    titleTwo: "Inclusion is our baseline",
    containtOne:
      "VIDA is a disability support organisation built on respect, accessibility, and listening first. We work with participants, families, and carers across the lifespan—honouring neurodiversity, physical disability, psychosocial diversity, and complex support needs.",
    visionTitleOne: "Our vision",
    visionDesscriptionOne:
      "A community where every person has real choice, meaningful connection, and services that adapt to them—not the other way around.",
    visionTitleTwo: "Our mission",
    visionDesscriptionTwo:
      "Deliver safe, skilled, and compassionate supports; uphold your rights; and continuously improve through participant feedback and staff training.",
    banner: abBanner.filename,
    bannerLocation: abBanner.location,
    visionBanner: abVision.filename,
    visionBannerLocation: abVision.location,
  });

  const d1 = writeAsset("dashboard", "demo-home-banner1.png");
  const d2 = writeAsset("dashboard", "demo-home-banner2.png");
  const d3 = writeAsset("dashboard", "demo-home-img1.png");
  const d4 = writeAsset("dashboard", "demo-home-img2.png");
  await Dashboard.create({
    banner1: d1.filename,
    banner1Location: d1.location,
    banner2: d2.filename,
    banner2Location: d2.location,
    card_title: "Disability support that fits you",
    card_main_title: "Choice, dignity, and skilled support every day",
    card_content:
      "From coordination and daily living to community access and allied health, VIDA teams work with you to turn your plan into real life—safely, clearly, and at your pace.",
    Link: "/services",
    homePageTitleOne: "Why families choose VIDA",
    homePageTitleTwo: "Participant-led, transparent, and local",
    homePageDescription:
      "We invest in training, safeguarding, and plain-language communication. Your goals drive the support plan; we bring the consistency and heart.",
    homageImageOne: d3.filename,
    homageImageOneLocation: d3.location,
    homePageImageTwo: d4.filename,
    homePageImageTwoLocation: d4.location,
  });

  const nav = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/services" },
    { title: "About Us", path: "/about-us" },
    { title: "Our Vision", path: "/our-vision" },
    { title: "FAQ", path: "/faq" },
    { title: "Resources", path: "/resources" },
    { title: "Podcast", path: "/podcast" },
    { title: "Founder", path: "/founder" },
    { title: "Careers", path: "/career" },
    { title: "Contact", path: "/contact" },
  ];
  await PathNav.insertMany(nav);

  const faqs = [
    {
      question: "Who can access VIDA supports?",
      answer:
        "We support NDIS participants, people exploring eligibility, and families seeking guidance. Contact us with your situation—we will be honest about what we can offer or who else might help.",
    },
    {
      question: "How do I get started?",
      answer:
        "Call or email our intake team. We discuss your goals, funding (e.g. NDIS plan-managed, NDIA-managed, or self-managed where applicable), and match you with the right services.",
    },
    {
      question: "Can I choose my support workers?",
      answer:
        "Yes, where practicable we consider personality fit, communication style, and any cultural or gender preferences you have. Safeguarding and rostering still need to work for everyone.",
    },
    {
      question: "What if I am non-speaking or use AAC?",
      answer:
        "We respect all communication modes. Staff receive training on AAC basics and partner with your speech pathologist where plans require it.",
    },
    {
      question: "How do you handle behaviour support?",
      answer:
        "We follow positive behaviour support principles and any behaviour support plan in place. Restrictive practices are only where authorised, monitored, and reviewed as required by law.",
    },
    {
      question: "Do you support psychosocial disability?",
      answer:
        "Yes. We work collaboratively with mental health clinicians and use trauma-informed approaches. Recovery-oriented goals are welcome.",
    },
    {
      question: "What about emergencies or after hours?",
      answer:
        "Rosters and on-call arrangements depend on your service agreement. For life-threatening emergencies always call your local emergency number first.",
    },
    {
      question: "How do I give feedback or make a complaint?",
      answer:
        "You can speak to your coordinator, use our complaints form, or contact an external advocacy body. We take complaints seriously and respond within published timeframes.",
    },
    {
      question: "Is my information kept private?",
      answer:
        "We comply with privacy laws applicable to health and disability information. We only share what is necessary for your care or as you consent.",
    },
    {
      question: "Can supports happen at school or work?",
      answer:
        "Yes—community and school-based supports are common where funded and agreed in your plan. We coordinate with educators and employers respectfully.",
    },
  ];
  await Faq.insertMany(faqs);

  const podEpisodes = [
    {
      name: "Understanding your NDIS plan—in plain English",
      link: "https://example.org/vida-podcast/episode-1",
    },
    {
      name: "Sensory-friendly days out: tips from participants",
      link: "https://example.org/vida-podcast/episode-2",
    },
    {
      name: "Supported decision making with families",
      link: "https://example.org/vida-podcast/episode-3",
    },
    {
      name: "Allied health teamwork: OT and support workers together",
      link: "https://example.org/vida-podcast/episode-4",
    },
  ];
  for (let i = 0; i < podEpisodes.length; i++) {
    const pic = writeAsset("prodcast", `demo-podcast-${i}.png`);
    await Podcast.create({
      name: podEpisodes[i].name,
      link: podEpisodes[i].link,
      picture: pic.filename,
      pictureLocation: pic.location,
    });
  }

  const resources = [
    {
      titleOne: "Easy-read: Your rights",
      descriptionOne:
        "A simple summary of your rights in disability services, including saying no, privacy, and how to complain.",
      titleTwo: "Checklist: Before you sign a service agreement",
      descriptionTwo:
        "Key questions about fees, cancellations, notice periods, and who to call if something feels wrong.",
    },
    {
      titleOne: "Guide: Preparing for a plan review",
      descriptionOne:
        "Collect goals, reports, and examples of what worked—so your next plan reflects real life.",
      titleTwo: "Template: Weekly support routine",
      descriptionTwo:
        "A blank planner to map therapies, community, and rest days in one view.",
    },
    {
      titleOne: "Accessibility: Visiting our offices",
      descriptionOne:
        "Step-free access, quiet waiting options, and how to request communication supports before you arrive.",
      titleTwo: "Emergency contacts card",
      descriptionTwo:
        "Fill-in PDF for wallet or phone lock screen—medical alerts and key supporters.",
    },
    {
      titleOne: "For carers: Preventing burnout",
      descriptionOne:
        "Short strategies for sleep, boundaries, and asking for respite without guilt.",
      titleTwo: "Glossary: NDIS words explained",
      descriptionTwo:
        "Plain-language definitions for common funding and plan terms.",
    },
  ];
  for (let i = 0; i < resources.length; i++) {
    const pic = writeAsset("resource", `demo-resource-${i}.png`);
    await Resource.create({
      ...resources[i],
      picture: pic.filename,
      pictureLocation: pic.location,
    });
  }

  const founderPic = writeAsset("blog", "demo-founder.png");
  await Blog.create({
    title: "A message from our Founder",
    expertise: "CEO & Founder, VIDA Disability Support",
    email: "founder@vida-support.example.org",
    phone_no: "+61 400 000 000",
    description:
      "I started VIDA after seeing how often brilliant people were boxed in by rigid services. We built this organisation so participants set the direction—whether that is learning to cook, joining a footy club, or living with friends. Our teams train continuously in safeguarding, accessibility, and respectful communication. If we can support you or your family, we would be honoured to listen.",
    picture: founderPic.filename,
    pictureLocation: founderPic.location,
  });

  const contactOffices = [
    {
      location: "Melbourne Hub — Collingwood",
      email: "hello@vida-support.example.org",
      phone: "+61 3 9000 0000",
      suffix: "melb",
    },
    {
      location: "Regional Outreach — Geelong",
      email: "regional@vida-support.example.org",
      phone: "+61 3 9000 0001",
      suffix: "gee",
    },
  ];
  for (const c of contactOffices) {
    const img = writeAsset("contact", `demo-contact-${c.suffix}.png`);
    await Contact.create({
      image: img.filename,
      path: img.location,
      location: c.location,
      email: c.email,
      phone: c.phone,
    });
  }

  const reviews = [
    {
      text: "Our coordinator actually listens. Plans stopped feeling scary and we finally linked OT with daily support.",
      rating: 5,
      name: "Samira K.",
      post: "Parent & carer",
    },
    {
      text: "I asked for a worker who understands AAC. VIDA matched me with someone patient and creative.",
      rating: 5,
      name: "Jordan T.",
      post: "NDIS participant",
    },
    {
      text: "Community days are flexible—if I need a quiet afternoon, no guilt. That matters for my anxiety.",
      rating: 4,
      name: "Alex R.",
      post: "Participant",
    },
    {
      text: "Invoices and budgets are explained in language I understand. Plan management has been stress-free.",
      rating: 5,
      name: "Priya M.",
      post: "Plan-managed participant",
    },
    {
      text: "SIL house feels respectful. Rosters are stable and staff know my routines.",
      rating: 5,
      name: "Chris L.",
      post: "SIL resident",
    },
  ];
  for (let i = 0; i < reviews.length; i++) {
    const pic = writeAsset("ratting", `demo-review-${i}.png`);
    await Review.create({
      ...reviews[i],
      picture: pic.filename,
      pictureLocation: pic.location,
    });
  }

  await Social.create({
    facebook: "https://facebook.com/example-vida-support",
    twitter: "https://twitter.com/example_vida",
    instagram: "https://instagram.com/example_vida_support",
    email: "hello@vida-support.example.org",
    linkedin: "https://linkedin.com/company/example-vida-support",
    youtube: "https://youtube.com/@examplevidasupport",
    whatsapp: "https://wa.me/61400000000",
    telegram: "https://t.me/example_vida",
  });

  await mongoose.disconnect();
  console.log("Demo disability-support data seeded successfully.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
