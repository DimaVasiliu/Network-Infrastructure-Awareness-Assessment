/**
 * Cable Code Decoder reference data.
 *
 * Each entry is a code, name or designation the user will encounter on the
 * job (or in an exam). For each one we provide:
 *   - title:        what the code is called
 *   - codeExample:  the canonical form people search for (used to match search)
 *   - summary:      one-sentence plain English description
 *   - parts:        a breakdown of every letter / digit in the code
 *   - whatItMeans:  longer explanation of practical implications
 *   - typicalUse:   "you see this when…"
 *   - watchOuts:    common mistakes / things students get wrong
 *   - standardRef:  the standard or regulation that defines it
 *   - quiz:         3 mini quick-fire questions tied to this code
 *
 * The data file is plain TypeScript (no React imports) so it can be unit
 * tested or reused by other screens later.
 */

export type CableCodePart = {
  label: string;
  meaning: string;
};

export type CableCodeQuiz = {
  question: string;
  answer: string;
  why: string;
};

export type CableCode = {
  id: string;
  category: 'EuroClass' | 'Fibre' | 'Channel' | 'Ethernet' | 'Standard' | 'Regulation' | 'Bonding';
  title: string;
  codeExample: string;
  summary: string;
  parts: CableCodePart[];
  whatItMeans: string;
  typicalUse: string;
  watchOuts: string;
  standardRef: string;
  searchTerms: string[];
  quiz: [CableCodeQuiz, CableCodeQuiz, CableCodeQuiz];
};

export const cableCodes: CableCode[] = [
  {
    id: 'cca-s1b-d2-a2',
    category: 'EuroClass',
    title: 'Cca-s1b,d2,a2 — standard indoor data cable',
    codeExample: 'Cca-s1b,d2,a2',
    summary:
      'EuroClass reaction-to-fire code typically used for new indoor telecoms / data cabling in a normal building.',
    parts: [
      {
        label: 'Cca',
        meaning:
          'Main class — flame spread / heat release performance. A=non-combustible (highest), B/C/D = progressively lower, E=basic ignition, F=no performance declared.',
      },
      {
        label: 's1b',
        meaning:
          'Smoke production. s1a = lowest smoke, s1b = next, s2 = limited, s3 = no requirement. s1b is good but not the absolute best.',
      },
      {
        label: 'd2',
        meaning:
          'Flaming droplets. d0 = none, d1 = some within 10 min, d2 = not d0 or d1. d2 is the lowest performance tier for droplets.',
      },
      {
        label: 'a2',
        meaning:
          'Acidity of combustion gases. a1 = lowest acidity, a2 = medium, a3 = no requirement. a2 is moderate.',
      },
    ],
    whatItMeans:
      'A reasonably good general-purpose indoor cable. Better than Eca but not as good as B2ca s1a d1 a1. Fits most office, retail and light commercial routes.',
    typicalUse:
      'Most new structured cabling jobs in a normal building specify Cca-s1b,d2,a2 by default. You will see this on cable reels and data sheets.',
    watchOuts:
      'Do not confuse the main class letter with the sub-ratings. Cca with weak sub-ratings can still pass for the route, but Dca / Eca have weaker flame performance overall.',
    standardRef: 'CPR / EN 13501-6',
    searchTerms: ['cca', 'cca-s1b', 'indoor cable', 'euroclass'],
    quiz: [
      {
        question: 'In Cca-s1b,d2,a2, what does the "s1b" describe?',
        answer: 'Smoke production',
        why: 'The "s" digit always describes smoke. s1a is lowest, s1b next, then s2, then s3.',
      },
      {
        question: 'Which is the better fire performance: Cca-s1b,d2,a2 or Dca-s1b,d2,a2?',
        answer: 'Cca',
        why: 'The main class letter ranks A > B > C > D > E > F. Lower letter is better flame performance.',
      },
      {
        question: 'What does "a2" describe in the EuroClass code?',
        answer: 'Acidity of combustion gases',
        why: 'The "a" suffix records gas acidity. a1 is lowest acidity, a2 medium, a3 no requirement.',
      },
    ],
  },
  {
    id: 'b2ca-s1a-d1-a1',
    category: 'EuroClass',
    title: 'B2ca s1a d1 a1 — premium low-smoke cable',
    codeExample: 'B2ca s1a d1 a1',
    summary:
      'High-performance EuroClass code for routes where smoke and droplet behaviour matter (escape routes, public buildings, healthcare).',
    parts: [
      {
        label: 'B2ca',
        meaning: 'Main class. Only Aca is higher; B2ca is the top class generally available for cabling.',
      },
      { label: 's1a', meaning: 'Lowest smoke production tier.' },
      { label: 'd1', meaning: 'Some flaming droplets within 10 minutes (better than d2).' },
      { label: 'a1', meaning: 'Lowest acidity tier for combustion gases.' },
    ],
    whatItMeans:
      'Best practical specification you will see. Often required by the project for escape routes, vertical risers, datacentres, healthcare and public buildings.',
    typicalUse:
      'Read the spec — if the architect or fire engineer demands low smoke + low droplets, B2ca s1a d1 a1 is the answer.',
    watchOuts: 'Higher cost. Do not substitute for Cca unless approved by the design.',
    standardRef: 'CPR / EN 13501-6',
    searchTerms: ['b2ca', 's1a', 'low smoke', 'premium cable'],
    quiz: [
      {
        question: 'Which has lower smoke production: s1a or s1b?',
        answer: 's1a',
        why: 's1a is the lowest-smoke tier. s1b is just below it.',
      },
      {
        question: 'Is B2ca better or worse fire performance than Cca?',
        answer: 'Better',
        why: 'A > B > C > D > E > F. B2ca outperforms Cca in flame spread / heat release.',
      },
      {
        question: 'In which scenario would you typically specify B2ca s1a d1 a1?',
        answer: 'Escape routes / public buildings',
        why: 'Low smoke + low droplets + low acidity is what fire safety designs ask for in escape and public spaces.',
      },
    ],
  },
  {
    id: 'class-ea',
    category: 'Channel',
    title: 'Class EA — Cat 6A balanced copper performance',
    codeExample: 'Class EA',
    summary:
      'Performance class for balanced copper cabling that runs 10GBASE-T at 100 m channel (typically Cat 6A cabling).',
    parts: [
      {
        label: 'Class',
        meaning: 'A defined transmission performance bracket from ISO/IEC 11801-1 / BS EN 50173-1.',
      },
      { label: 'E', meaning: 'Base class E corresponds to Category 6 (250 MHz).' },
      {
        label: 'A (subscript)',
        meaning: 'The "augmented" version of class E, defined up to 500 MHz — Cat 6A.',
      },
    ],
    whatItMeans:
      'Class EA supports 10GBASE-T at the standard 100 m channel. The permanent link must be ≤ 90 m and the channel ≤ 100 m. If patch cords exceed 20 m, the channel is reduced to 95 m.',
    typicalUse: 'Modern office cabling for 10G to desk. Look for Cat 6A on the cable jacket.',
    watchOuts:
      "Don't confuse the permanent link length (90 m) with the channel length (100 m). The 100 m includes the patch and equipment cords at both ends.",
    standardRef: 'BS EN 50173-1',
    searchTerms: ['class ea', 'cat 6a', 'cat6a', '90m', '100m', '10gbase-t'],
    quiz: [
      {
        question: 'What is the maximum Class EA permanent link length?',
        answer: '90 metres',
        why: 'Permanent link is the fixed cabling between outlets. 90 m leaves 10 m for cords (channel total = 100 m).',
      },
      {
        question: 'If your patch cords total more than 20 m, what does the Class EA channel limit become?',
        answer: '95 metres',
        why: 'Longer cords use up more of the insertion-loss budget, so the fixed portion must shrink.',
      },
      {
        question: 'What Ethernet application is Class EA designed for?',
        answer: '10GBASE-T',
        why: 'Class EA / Cat 6A was specified to support 10 Gb/s over balanced copper at 100 m.',
      },
    ],
  },
  {
    id: 'fibre-9-125',
    category: 'Fibre',
    title: '9/125 — single-mode fibre',
    codeExample: '9/125',
    summary: 'Core / cladding size for single-mode fibre, used for long-distance links.',
    parts: [
      { label: '9', meaning: 'Core diameter in micrometres (µm). 9 µm is the standard single-mode core.' },
      { label: '125', meaning: 'Cladding diameter in micrometres (the layer around the core).' },
    ],
    whatItMeans:
      'Single-mode fibre. Used for long distances (campus backbone, building-to-building, telecoms). Typically lit by a laser source. Lower loss per km than multimode.',
    typicalUse: 'Kilometre-scale 10 Gb/s links and longer-distance backbones.',
    watchOuts:
      'A 9/125 fibre will not work with multimode transceivers and vice versa. Always match the fibre type to the optic.',
    standardRef: 'ITU-T G.652 / ISO/IEC 11801-1',
    searchTerms: ['9/125', 'single mode', 'sm fibre', 'long distance'],
    quiz: [
      {
        question: 'What does the "9" in 9/125 mean?',
        answer: 'Core diameter (9 µm)',
        why: 'The first number is the optical core diameter; the second is the cladding diameter.',
      },
      {
        question: 'Is 9/125 single-mode or multimode?',
        answer: 'Single-mode',
        why: 'A 9 µm core is too small to support multiple light modes — it is single-mode.',
      },
      {
        question: 'Which would you pick for a 2 km 10 Gb/s link?',
        answer: 'Single-mode (9/125)',
        why: 'At kilometre distances, multimode loss is too high. Single-mode handles long runs.',
      },
    ],
  },
  {
    id: 'fibre-50-125-om3',
    category: 'Fibre',
    title: '50/125 OM3 — multimode fibre, short-reach 10 Gb/s',
    codeExample: '50/125 OM3',
    summary:
      'Multimode fibre size with the OM3 performance grade — used for short-reach 10 Gb/s links inside a building.',
    parts: [
      { label: '50', meaning: 'Core diameter in µm — multimode core size.' },
      { label: '125', meaning: 'Cladding diameter in µm.' },
      {
        label: 'OM3',
        meaning:
          'Performance grade. OM1/2 = older, OM3 = laser-optimised for 10 Gb/s up to ~300 m, OM4 = ~400 m, OM5 = wideband.',
      },
    ],
    whatItMeans:
      'Cheaper short-reach option for 10 Gb/s using VCSEL lasers. Common in datacentre rows and in-building backbones.',
    typicalUse: 'Within a building, especially between switches in the same room or floor.',
    watchOuts:
      'OM3 has a distance limit of around 300 m for 10 Gb/s. Beyond that you need OM4 (~400 m) or move to single-mode.',
    standardRef: 'ISO/IEC 11801-1',
    searchTerms: ['50/125', 'om3', 'multimode', 'mm fibre', '10g'],
    quiz: [
      {
        question: 'Is 50/125 OM3 single-mode or multimode?',
        answer: 'Multimode',
        why: 'A 50 µm core is wide enough to carry multiple light modes.',
      },
      {
        question: 'Roughly how far can OM3 carry 10 Gb/s?',
        answer: 'About 300 metres',
        why: 'OM3 is laser-optimised for 300 m at 10 Gb/s; OM4 extends to about 400 m.',
      },
      {
        question: 'When would you choose OM3 over 9/125 single-mode?',
        answer: 'Short in-building links where cost matters',
        why: 'Multimode + VCSEL is cheaper than single-mode + laser for short distances.',
      },
    ],
  },
  {
    id: 'fibre-62-5-125',
    category: 'Fibre',
    title: '62.5/125 — legacy multimode fibre',
    codeExample: '62.5/125',
    summary:
      'Older multimode fibre size (OM1). Found in legacy installations, not used for new high-speed links.',
    parts: [
      { label: '62.5', meaning: 'Larger multimode core (µm), originally chosen for LED light sources.' },
      { label: '125', meaning: 'Standard cladding diameter.' },
    ],
    whatItMeans:
      'A legacy multimode size you will encounter on retrofit jobs. Limited distance for 10 Gb/s (~30 m). New cabling is normally 50/125 OM3+.',
    typicalUse: 'Existing buildings from the 1990s / early 2000s.',
    watchOuts:
      'Mixing 62.5/125 patch cords with 50/125 backbone fibre causes high coupling loss. Match the fibre size across the link.',
    standardRef: 'ISO/IEC 11801-1',
    searchTerms: ['62.5', 'om1', 'legacy fibre'],
    quiz: [
      {
        question: 'What OM grade does 62.5/125 typically correspond to?',
        answer: 'OM1',
        why: 'The 62.5 µm core size aligns with OM1, the oldest multimode performance grade.',
      },
      {
        question: 'Why is 62.5/125 limited for 10 Gb/s?',
        answer: 'Higher modal dispersion → short reach',
        why: 'The wider core and older bandwidth-distance product limits 10 Gb/s to very short runs.',
      },
      {
        question: 'You find 62.5/125 patch cords in a 50/125 backbone link. What happens?',
        answer: 'High loss at the join',
        why: 'Mismatch between core sizes causes a coupling loss penalty — always match fibre types.',
      },
    ],
  },
  {
    id: 'eth-100baset',
    category: 'Ethernet',
    title: '100baseT — 100 Mb/s Ethernet over twisted pair',
    codeExample: '100baseT',
    summary: 'Older Ethernet application name. 100 Mb/s, baseband, twisted pair (typically Cat 5 / 5e).',
    parts: [
      { label: '100', meaning: 'Data rate in megabits per second.' },
      { label: 'base', meaning: 'Baseband signalling (the cable is dedicated to one Ethernet signal).' },
      { label: 'T', meaning: 'Twisted-pair copper media.' },
    ],
    whatItMeans:
      'A medium-speed Ethernet variant from the late 1990s, still very common on legacy office cabling. Cat 5e supports it.',
    typicalUse: 'Older outlets, IP phones, legacy printers.',
    watchOuts:
      'Do not assume "baseT" always means 100 Mb/s — 10baseT (10 Mb/s) and 1000baseT (1 Gb/s) follow the same pattern.',
    standardRef: 'IEEE 802.3',
    searchTerms: ['100baset', 'fast ethernet', '100mbps'],
    quiz: [
      {
        question: 'What does the "100" in 100baseT mean?',
        answer: '100 Mb/s',
        why: 'The number is the data rate in megabits per second.',
      },
      {
        question: 'Will 100baseT run over Cat 5e?',
        answer: 'Yes',
        why: 'Cat 5e easily supports 100baseT — and also 1000baseT (1 Gb/s).',
      },
      {
        question: 'What does the "T" stand for in 100baseT?',
        answer: 'Twisted-pair copper',
        why: 'The suffix letter denotes the media. T = twisted pair, X/SX/LX = fibre variants.',
      },
    ],
  },
  {
    id: 'hd-60364-5-54',
    category: 'Bonding',
    title: 'HD 60364-5-54 — earthing and bonding',
    codeExample: 'HD 60364-5-54',
    summary:
      'European harmonised document covering earthing and protective bonding for low-voltage installations.',
    parts: [
      { label: 'HD', meaning: 'Harmonised Document (Cenelec) — used across Europe.' },
      { label: '60364', meaning: 'Low-voltage electrical installations.' },
      { label: '5', meaning: 'Part 5 — selection and erection of electrical equipment.' },
      { label: '54', meaning: 'Chapter 54 — earthing arrangements and protective conductors.' },
    ],
    whatItMeans:
      'The reference for sizing protective bonding conductors on communications cabinets / racks. Sits behind BS 7671 in the UK.',
    typicalUse: 'Sizing the earth bonding conductor for a cabinet or frame.',
    watchOuts: 'Cabinet ≤ 21U → minimum 4 mm² bonding. Cabinet > 21U → minimum 16 mm² bonding.',
    standardRef: 'HD 60364-5-54 / BS 7671',
    searchTerms: ['hd 60364', 'bonding', 'earthing', '4mm', '16mm'],
    quiz: [
      {
        question: 'Under HD 60364-5-54, what is the minimum bonding conductor for a cabinet ≤ 21U?',
        answer: '4 mm²',
        why: 'Small cabinets use a 4 mm² minimum protective bonding conductor.',
      },
      {
        question: 'What is the minimum bonding conductor for a cabinet > 21U?',
        answer: '16 mm²',
        why: 'Larger frames require 16 mm² minimum bonding.',
      },
      {
        question: 'Which UK wiring regulation sits in front of HD 60364-5-54?',
        answer: 'BS 7671',
        why: 'BS 7671 is the UK wiring regulations; it adopts the HD 60364 framework.',
      },
    ],
  },
  {
    id: 'bs-en-50174-2',
    category: 'Standard',
    title: 'BS EN 50174-2 — indoor cabling installation',
    codeExample: 'BS EN 50174-2',
    summary:
      'European standard for the practical installation of information technology cabling inside buildings.',
    parts: [
      { label: 'BS', meaning: 'British Standard (UK adoption).' },
      { label: 'EN', meaning: 'European norm.' },
      { label: '50174', meaning: 'Information technology — cabling installation series.' },
      { label: '2', meaning: 'Part 2 — installation planning and practices inside buildings.' },
    ],
    whatItMeans:
      'The day-to-day reference for installing data cabling: bend radius, support, containment, separation from power, restraint, dressing.',
    typicalUse: 'Most of the "how to do it right" facts in the assessment come from BS EN 50174-2.',
    watchOuts:
      'Different parts exist: -1 (specification), -2 (indoor), -3 (outdoor). Pick the right one for the question.',
    standardRef: 'BS EN 50174-2',
    searchTerms: ['50174', '50174-2', 'indoor cabling', 'installation'],
    quiz: [
      {
        question: 'What does BS EN 50174-2 cover?',
        answer: 'Indoor cabling installation practices',
        why: 'Part 2 of the series is the indoor installation handbook.',
      },
      {
        question: 'What bend radius does BS EN 50174-2 use for 4-pair balanced cable in installed condition?',
        answer: '8 × cable outside diameter',
        why: 'Indoor 4-pair balanced cable installed bend radius is 8× the cable diameter.',
      },
      {
        question: 'What does BS EN 50174-2 say about resting cables on ceiling tiles?',
        answer: "Don't — use proper containment",
        why: 'Suspended ceiling grids are not cable supports. Use tray, basket or trunking.',
      },
    ],
  },
  {
    id: 'bs-en-50174-3',
    category: 'Standard',
    title: 'BS EN 50174-3 — outdoor cabling installation',
    codeExample: 'BS EN 50174-3',
    summary: 'European standard for outdoor and external information technology cabling installation.',
    parts: [
      { label: 'BS EN 50174', meaning: 'Cabling installation series.' },
      { label: '3', meaning: 'Part 3 — installation planning and practices outside buildings.' },
    ],
    whatItMeans:
      'Reference for buried, aerial and external cabling. Sets minimum depths under footpaths and carriageways.',
    typicalUse: 'Burial depth tables, duct selection, separation from buried services.',
    watchOuts:
      'Footpath depth = 500 mm. Road / carriageway = 600 mm. These are minimum recommended depths in Table 3.',
    standardRef: 'BS EN 50174-3 Table 3',
    searchTerms: ['50174-3', 'outdoor', 'buried', '500mm', '600mm'],
    quiz: [
      {
        question: 'BS EN 50174-3 minimum recommended depth below a footpath?',
        answer: '500 mm',
        why: 'Footpath burial depth is 500 mm under Table 3.',
      },
      {
        question: 'BS EN 50174-3 minimum recommended depth below a carriageway?',
        answer: '600 mm',
        why: 'Roads carry heavier loads so cables go deeper — 600 mm.',
      },
      {
        question: 'Which yellow item should never appear in a telecoms duct context?',
        answer: 'A yellow duct (it means gas)',
        why: 'Yellow is reserved for gas in UK street works colour coding.',
      },
    ],
  },
  {
    id: 'cpr',
    category: 'Regulation',
    title: 'CPR — Construction Products Regulations',
    codeExample: 'CPR',
    summary:
      'EU / UK framework that sets out declared performance for construction products — including the EuroClass cable system.',
    parts: [
      { label: 'C', meaning: 'Construction' },
      { label: 'P', meaning: 'Products' },
      { label: 'R', meaning: 'Regulations' },
    ],
    whatItMeans:
      'Cables sold for permanent installation must carry a CE mark, a Declaration of Performance (DoP) and a EuroClass rating under the CPR framework.',
    typicalUse: 'Check the CE-marked label on the reel/box for the EuroClass code — it is mandatory.',
    watchOuts:
      'CPR does not just mean "cable" — it covers many construction products. In a cabling context, it specifically refers to reaction-to-fire classification.',
    standardRef: 'CPR / EN 13501-6',
    searchTerms: ['cpr', 'construction products', 'ce mark', 'dop'],
    quiz: [
      {
        question: 'What does CPR stand for in a cabling context?',
        answer: 'Construction Products Regulations',
        why: 'Not "Cable Products Regulations" — it is the broader EU/UK framework.',
      },
      {
        question: 'What does DoP stand for?',
        answer: 'Declaration of Performance',
        why: "The DoP is the manufacturer's statement of declared performance characteristics.",
      },
      {
        question: 'Where must the CPR EuroClass appear on a cable product?',
        answer: 'On the CE-marked label on the reel / box',
        why: 'Packaging label is the mandatory location. Web/data sheet are supplementary.',
      },
    ],
  },
  {
    id: 'euroclass-aca',
    category: 'EuroClass',
    title: 'Aca — non-combustible (top of the EuroClass scale)',
    codeExample: 'Aca',
    summary: 'The highest EuroClass main class — essentially non-combustible. Rare for cables.',
    parts: [
      {
        label: 'A',
        meaning: 'Highest main class: no significant contribution to fire growth.',
      },
      { label: 'ca', meaning: '"cables" — applied to reaction-to-fire cable classifications.' },
    ],
    whatItMeans:
      'Real Aca cables are uncommon because most plastic insulation contributes some heat release. You will normally see B2ca or Cca as the upper band in real specifications.',
    typicalUse: 'Specialised mineral-insulated cables in extreme fire scenarios.',
    watchOuts: "Don't assume any cable with an Aca on a data sheet meets the test — confirm the DoP.",
    standardRef: 'CPR / EN 13501-6',
    searchTerms: ['aca', 'non combustible', 'top class'],
    quiz: [
      {
        question: 'Which is the highest EuroClass reaction-to-fire class?',
        answer: 'Aca',
        why: 'A > B > C > D > E > F. Aca is the top of the scale.',
      },
      {
        question: 'Why is Aca rarely seen on telecoms cables?',
        answer: 'Plastic jackets contribute some heat release',
        why: 'Standard data-cable construction cannot pass the Aca test.',
      },
      {
        question: 'If a job is specified "low fire load", which class is more realistic?',
        answer: 'B2ca s1a d1 a1',
        why: 'B2ca with strong sub-ratings is the practical "best available" for cabling.',
      },
    ],
  },
  {
    id: 'euroclass-dca-eca-fca',
    category: 'EuroClass',
    title: 'Dca / Eca / Fca — lower EuroClass tiers',
    codeExample: 'Dca · Eca · Fca',
    summary: 'The lower three EuroClass main classes. You will see these on cheaper or older stock.',
    parts: [
      { label: 'Dca', meaning: 'Limited contribution to fire — below Cca.' },
      { label: 'Eca', meaning: 'Basic ignition resistance only.' },
      { label: 'Fca', meaning: 'No performance declared (the lowest tier).' },
    ],
    whatItMeans:
      'For most new fixed installations Cca-s1b,d2,a2 is the minimum acceptable. Dca / Eca are sometimes used for temporary or industrial outdoor routes; Fca should generally be avoided.',
    typicalUse: 'Legacy stock, temporary site cabling, very low-spec routes.',
    watchOuts:
      "Don't substitute Dca / Eca for Cca on a spec without written approval — it changes the building's fire performance.",
    standardRef: 'CPR / EN 13501-6',
    searchTerms: ['dca', 'eca', 'fca', 'low euroclass', 'cheap cable'],
    quiz: [
      {
        question: 'Which EuroClass main class is the lowest?',
        answer: 'Fca',
        why: 'Fca means no performance declared — the weakest position on the scale.',
      },
      {
        question: 'Is Eca acceptable as a substitute for Cca on a building project?',
        answer: 'Only if the design approves it',
        why: 'Substitution changes the declared performance — get sign-off in writing.',
      },
      {
        question: 'On a spec calling for Cca-s1b,d2,a2, what about Dca-s1b,d2,a2?',
        answer: 'Worse flame performance — not equivalent',
        why: 'Main class drops from C to D regardless of identical sub-ratings.',
      },
    ],
  },
  {
    id: 'cat-5e-6-6a-7-8',
    category: 'Channel',
    title: 'Cat 5e / 6 / 6A / 7 / 8 — balanced copper category names',
    codeExample: 'Cat 5e · Cat 6 · Cat 6A · Cat 7 · Cat 8',
    summary:
      'Manufacturer "category" labels that map onto ISO/IEC transmission Classes. You will see them on cable jackets and component labels.',
    parts: [
      { label: 'Cat 5e', meaning: '100 MHz · Class D · supports 1000baseT (1 Gb/s) at 100 m.' },
      {
        label: 'Cat 6',
        meaning: '250 MHz · Class E · supports 1 Gb/s comfortably, 10 Gb/s only at short reach.',
      },
      { label: 'Cat 6A', meaning: '500 MHz · Class EA · supports 10GBASE-T at 100 m.' },
      {
        label: 'Cat 7',
        meaning: '600 MHz · Class F · screened design, not normally used in modern installations.',
      },
      {
        label: 'Cat 8',
        meaning: '2000 MHz · Class I / II · for short datacentre links (~30 m) at 25/40 Gb/s.',
      },
    ],
    whatItMeans:
      'Pick the lowest category that meets the speed and reach you need. For modern offices, Cat 6A is the typical "to-the-desk" cable.',
    typicalUse:
      'Match category to active equipment: 1 Gb/s → Cat 6, 10 Gb/s → Cat 6A, in-rack 25/40 Gb/s → Cat 8.',
    watchOuts:
      'Mixing components from different categories drops the channel to the lowest one. Cat 7 is a manufacturer label, not an IEEE Ethernet application.',
    standardRef: 'BS EN 50173-1 / ISO/IEC 11801-1',
    searchTerms: ['cat 5e', 'cat5e', 'cat 6', 'cat6', 'cat 6a', 'cat6a', 'cat 7', 'cat7', 'cat 8', 'cat8'],
    quiz: [
      {
        question: 'Which category does Class EA correspond to?',
        answer: 'Cat 6A',
        why: 'Class EA is the BS EN 50173-1 performance class that matches Cat 6A.',
      },
      {
        question: 'You need 10GBASE-T to the desk at 100 m. Minimum category?',
        answer: 'Cat 6A',
        why: 'Cat 6 only supports 10 Gb/s at short reach. Cat 6A handles 100 m channels.',
      },
      {
        question: 'What does mixing Cat 6 components with a Cat 6A cable do to the channel?',
        answer: 'Drops it to Cat 6 performance',
        why: 'The channel performs at the lowest-rated component in the link.',
      },
    ],
  },
  {
    id: 'utp-ftp-sftp',
    category: 'Channel',
    title: 'UTP / F/FTP / S/FTP — cable construction codes',
    codeExample: 'UTP · F/FTP · S/FTP',
    summary: 'Letters that tell you how (and whether) a balanced cable is screened.',
    parts: [
      { label: 'U', meaning: 'Unscreened (no overall screen).' },
      { label: 'F', meaning: 'Foil screen (overall or per pair).' },
      { label: 'S', meaning: 'Braid screen (overall).' },
      { label: 'TP', meaning: 'Twisted pair construction.' },
      { label: '/', meaning: 'Separates the overall screen (before /) from the per-pair screen (after /).' },
    ],
    whatItMeans:
      'UTP = unscreened twisted pair. F/UTP = overall foil, unscreened pairs. F/FTP = overall foil + foil per pair. S/FTP = overall braid + foil per pair (highest immunity).',
    typicalUse:
      'UTP for ordinary offices. F/FTP or S/FTP where EMI sources are nearby (industrial sites, fluorescent fittings, parallel power runs).',
    watchOuts:
      'Screened cable only works if the screen is properly bonded at the panel and terminated correctly at the outlet.',
    standardRef: 'BS EN 50173-1',
    searchTerms: ['utp', 'ftp', 's/ftp', 'sftp', 'f/ftp', 'fftp', 'screened', 'unscreened'],
    quiz: [
      {
        question: 'What does S/FTP mean?',
        answer: 'Overall braid + foil-screened pairs',
        why: 'S = braid screen overall, FTP = foil-screened twisted pairs.',
      },
      {
        question: 'Does an unbonded screen still protect against EMI?',
        answer: 'No — the screen must be bonded',
        why: 'An unbonded screen acts as an antenna and can make EMI worse.',
      },
      {
        question: 'Which is the simpler construction: UTP or F/FTP?',
        answer: 'UTP',
        why: 'UTP has no screen at all. F/FTP has overall foil plus per-pair foil.',
      },
    ],
  },
  {
    id: 'fibre-om-grades',
    category: 'Fibre',
    title: 'OM1 / OM2 / OM3 / OM4 / OM5 — multimode fibre performance grades',
    codeExample: 'OM1 · OM2 · OM3 · OM4 · OM5',
    summary: 'Performance grades for multimode fibre. Higher number = longer reach at high data rates.',
    parts: [
      { label: 'OM1', meaning: '62.5/125, legacy, LED-driven. ~33 m at 10 Gb/s.' },
      { label: 'OM2', meaning: '50/125, legacy, LED-driven. ~82 m at 10 Gb/s.' },
      { label: 'OM3', meaning: '50/125, laser-optimised. 300 m at 10 Gb/s.' },
      { label: 'OM4', meaning: '50/125, improved bandwidth. 400 m at 10 Gb/s, 150 m at 40/100 Gb/s.' },
      {
        label: 'OM5',
        meaning: '50/125, wideband — supports SWDM for higher aggregate speeds on a single fibre pair.',
      },
    ],
    whatItMeans:
      'For new installations stick to OM3 / OM4 (or OM5 for short-wave wavelength-multiplexing). OM1 / OM2 are legacy.',
    typicalUse: 'In-building backbones and short datacentre links.',
    watchOuts:
      'OM3 → OM4 → OM5 are colour-coded aqua / aqua / lime-green. Mixing grades works at the lowest-grade distance.',
    standardRef: 'ISO/IEC 11801-1',
    searchTerms: ['om1', 'om2', 'om3', 'om4', 'om5', 'multimode'],
    quiz: [
      {
        question: 'Which OM grade supports 10 Gb/s up to ~400 m?',
        answer: 'OM4',
        why: 'OM3 = 300 m, OM4 = 400 m, OM5 = wideband but similar reach to OM4 at 10 Gb/s.',
      },
      {
        question: 'What jacket colour is OM4?',
        answer: 'Aqua (same as OM3)',
        why: 'OM3 and OM4 share aqua. OM5 is lime-green.',
      },
      {
        question: 'Which OM grade is laser-optimised but oldest of the laser-optimised set?',
        answer: 'OM3',
        why: 'OM3 was the first laser-optimised grade. OM4 and OM5 followed.',
      },
    ],
  },
  {
    id: 'bs-7671',
    category: 'Regulation',
    title: 'BS 7671 — UK Wiring Regulations',
    codeExample: 'BS 7671',
    summary: 'The UK national rules for electrical installations. Sits over the top of HD 60364 in the UK.',
    parts: [
      { label: 'BS', meaning: 'British Standard.' },
      { label: '7671', meaning: 'Number designation for the IET Wiring Regulations.' },
    ],
    whatItMeans:
      'BS 7671 incorporates the HD 60364 series and adds UK-specific rules. Bonding sizes for racks/cabinets come from this stack.',
    typicalUse:
      'Reference whenever the electrical installation interacts with the cabling: bonding, earthing, separation from power.',
    watchOuts:
      'BS 7671 is updated periodically (current 18th Edition + amendments). Always check which edition / amendment your project uses.',
    standardRef: 'BS 7671 / HD 60364',
    searchTerms: ['bs 7671', 'bs7671', 'wiring regulations', 'iet regs', '18th edition'],
    quiz: [
      {
        question: 'BS 7671 is also known as the…',
        answer: 'IET Wiring Regulations',
        why: 'BS 7671 is the formal designation for the wiring regs published by the IET.',
      },
      {
        question: 'Which European series does BS 7671 incorporate?',
        answer: 'HD 60364',
        why: 'BS 7671 adopts the HD 60364 framework with UK-specific additions.',
      },
      {
        question: 'Why does BS 7671 matter for a data cabling installer?',
        answer: 'Earthing, bonding, and separation from power',
        why: 'Bonding sizes and EMI separation rules come from this stack.',
      },
    ],
  },
  {
    id: 'hsg47',
    category: 'Regulation',
    title: 'HSG47 — Avoiding danger from underground services',
    codeExample: 'HSG47',
    summary:
      'HSE guidance document for safe work near buried services such as electricity, gas and telecoms.',
    parts: [
      { label: 'HSG', meaning: 'Health and Safety Guidance (an HSE publication series).' },
      { label: '47', meaning: 'Document number — buried services.' },
    ],
    whatItMeans:
      'Whenever you dig, scan first. HSG47 covers detection equipment, drawings, permits, safe digging techniques and how to handle finds.',
    typicalUse: 'Outdoor work — laying or repairing buried telecoms duct, accessing chambers, trenching.',
    watchOuts: 'Outside HSE references like HSG47 are not optional — they back up CDM 2015 duties.',
    standardRef: 'HSE HSG47',
    searchTerms: ['hsg47', 'buried services', 'cat scan', 'safe digging'],
    quiz: [
      {
        question: 'What does HSG47 cover?',
        answer: 'Avoiding danger from underground services',
        why: "HSE's HSG47 is the buried-services safety guide.",
      },
      {
        question: 'Before digging near buried cabling, what do you do first?',
        answer: 'Survey with detection equipment (cat & genny)',
        why: 'HSG47 lists scan + drawings + permit as standard pre-dig steps.',
      },
      {
        question: 'Does HSG47 apply to a buried telecoms duct job?',
        answer: 'Yes',
        why: 'Telecoms duct work near other services falls squarely within HSG47.',
      },
    ],
  },
  {
    id: 'coshh',
    category: 'Regulation',
    title: 'COSHH 2002 — Control of Substances Hazardous to Health',
    codeExample: 'COSHH',
    summary:
      'The UK regulations covering exposure to hazardous substances at work — dust, solvents, fibre shards, cleaners.',
    parts: [
      { label: 'C', meaning: 'Control' },
      { label: 'OS', meaning: 'Of Substances' },
      { label: 'H', meaning: 'Hazardous' },
      { label: 'H', meaning: 'to Health' },
    ],
    whatItMeans:
      'For each hazardous product (cleaner, solvent, lubricant, expanding foam, dusts) you must read the safety data sheet (SDS), assess the risk, control exposure and provide PPE if needed.',
    typicalUse: 'Drilling dust, fibre splice cleaning solvents, sealant chemicals, optical cable wipes.',
    watchOuts:
      'COSHH does not include radiation, asbestos or biological agents at work — those have separate regs (IRR, CAR 2012, BBV).',
    standardRef: 'COSHH 2002',
    searchTerms: ['coshh', 'hazardous substances', 'sds', 'safety data sheet'],
    quiz: [
      {
        question: 'What is the first document you consult before using a new chemical product?',
        answer: 'The safety data sheet (SDS)',
        why: 'The SDS lists hazards, controls and PPE — COSHH expects you to read it.',
      },
      {
        question: 'Is drilling dust covered by COSHH?',
        answer: 'Yes',
        why: 'Dust is a hazardous substance for the lungs — extraction or RPE is required.',
      },
      {
        question: 'Does COSHH cover asbestos?',
        answer: 'No — asbestos has its own regs (CAR 2012)',
        why: 'COSHH explicitly excludes asbestos. CAR 2012 covers it.',
      },
    ],
  },
  {
    id: 'rack-unit-1u',
    category: 'Standard',
    title: '1U / 19 inch rack — equipment height unit',
    codeExample: '1U · 19″ rack',
    summary: 'Standard rack form factor and the U / RU unit that measures equipment height.',
    parts: [
      { label: '19″', meaning: 'External width of the rack frame opening.' },
      { label: '1U', meaning: '44.45 mm (1.75 inches) of vertical space.' },
      { label: 'RU', meaning: 'Same as U — "rack unit".' },
    ],
    whatItMeans:
      'Equipment is sized in whole U: a switch might be 1U, a small server 2U, a chassis 4U. Cabinet height (e.g. 42U) tells you how much equipment fits.',
    typicalUse:
      'Specifying cabinets, patch panels and switches. Bonding rules also reference cabinet height (≤21U vs >21U).',
    watchOuts:
      'Different cabinet manufacturers vary the depth; rail-to-rail spacing is the bit that has to match 19 inch.',
    standardRef: 'EIA-310 / IEC 60297',
    searchTerms: ['1u', '19 inch', '19 rack', 'rack unit', 'ru'],
    quiz: [
      {
        question: 'How tall is 1U?',
        answer: '44.45 mm (1.75 inches)',
        why: '1U on a 19 inch rack is standardised at 44.45 mm.',
      },
      {
        question: 'What standard width does 19 inch refer to?',
        answer: 'External rail opening width',
        why: 'The 19 inch dimension is the rail-to-rail opening, not the outside cabinet dimension.',
      },
      {
        question: 'Which bonding bracket applies to a 12U wall cabinet?',
        answer: '≤21U — 4 mm² minimum',
        why: '12U sits within the small-cabinet bracket; HD 60364-5-54 says 4 mm² minimum.',
      },
    ],
  },
  {
    id: 'mice',
    category: 'Standard',
    title: 'MICE — environmental classification',
    codeExample: 'MICE',
    summary:
      'A four-part code from BS EN 50173 that classifies the environment a cabling system has to survive, used to select the right cable and containment.',
    parts: [
      { label: 'M', meaning: 'Mechanical — shock, vibration, impact, crush and tensile stress.' },
      {
        label: 'I',
        meaning: 'Ingress — solids and liquids (dust and water), similar in spirit to IP ratings.',
      },
      { label: 'C', meaning: 'Climatic / Chemical — temperature, humidity and exposure to chemicals.' },
      { label: 'E', meaning: 'Electromagnetic — EMI, surges and the electromagnetic environment.' },
    ],
    whatItMeans:
      'Each letter is given a level (1, 2 or 3): 1 = ordinary office-type conditions, 2 = light industrial, 3 = industrial / harsh. You match the cabling and containment to the MICE level of the space.',
    typicalUse:
      'Choosing cable construction and pathway systems — BS EN 50174 says the selection of cable management shall take the MICE classification into account.',
    watchOuts:
      'MICE is defined in BS EN 50173, not BS EN 50174. The numbers after each letter (e.g. M2 I1 C1 E2) are the severity levels, not a product code.',
    standardRef: 'BS EN 50173',
    searchTerms: ['mice', 'environmental classification', 'm i c e', 'm1 i1 c1 e1'],
    quiz: [
      {
        question: 'What do the letters M, I, C and E stand for?',
        answer: 'Mechanical, Ingress, Climatic/Chemical, Electromagnetic',
        why: 'MICE classifies the four environmental stresses a cabling system must withstand.',
      },
      {
        question: 'Which standard defines the MICE classification?',
        answer: 'BS EN 50173',
        why: 'MICE comes from BS EN 50173; BS EN 50174 then tells you to use it when selecting cable management.',
      },
      {
        question: 'What does a higher MICE level number (e.g. 3) indicate?',
        answer: 'A harsher environment',
        why: 'Level 1 is ordinary/office, 2 is light industrial, 3 is harsh/industrial.',
      },
    ],
  },
  {
    id: 'bs-en-50174-install-limits',
    category: 'Standard',
    title: 'BS EN 50174 install limits — the key numbers',
    codeExample: 'BS EN 50174 limits',
    summary:
      'The practical installation limits from BS EN 50174 that come up most often: clearances, support spacing, conduit bends and bundle size.',
    parts: [
      {
        label: 'Cabinet access',
        meaning: '1.2 m clearance on cabinet/frame/rack faces where access is required.',
      },
      { label: 'Tray clearance', meaning: 'Tray-work sits at least 25 mm off the fixing surface.' },
      { label: 'Conduit draw access', meaning: 'Draw-box access at least every 12 m on bent conduit runs.' },
      {
        label: 'Support spacing',
        meaning:
          'Non-continuous supports (basket/ladder/hooks) ≤ 1500 mm apart where the maker gives no figure.',
      },
      { label: 'Stacking height', meaning: 'Continuous supports (trays) — cable stacking height ≤ 150 mm.' },
      {
        label: 'Conduit bends',
        meaning: 'No more than two 90° bends, and ≤ 180° cumulative, between pulling points.',
      },
      { label: 'Bundle size', meaning: 'Balanced data cable bundles ≤ 24 cables.' },
      { label: 'Fixings', meaning: 'Pathway fixings rated for twice the combined mass of pathway + cables.' },
    ],
    whatItMeans:
      'These are the "how far / how many / how tight" figures BS EN 50174 sets so cables can be pulled in without damage and pathways stay safely loaded.',
    typicalUse:
      'Planning containment routes, conduit runs and cabinet locations; deciding bundle sizes and support spacing on site.',
    watchOuts:
      'Risers: lower cables rather than pulling them up. Suspended-ceiling grids are never a pathway support. Manufacturer figures, where they exist, take priority over these defaults.',
    standardRef: 'BS EN 50174-2',
    searchTerms: [
      '50174 limits',
      '1.2m clearance',
      '25mm tray',
      '12m draw box',
      '1500mm support',
      '150mm stacking',
      '24 cables',
      'conduit bends',
      'fixings',
    ],
    quiz: [
      {
        question: 'What clearance is required on cabinet faces where access is needed?',
        answer: '1.2 m',
        why: 'BS EN 50174 sets 1.2 m on faces requiring access so equipment can be worked on safely.',
      },
      {
        question: 'How many 90° bends are allowed in a conduit between pulling points?',
        answer: 'Two (and ≤ 180° cumulative)',
        why: 'More than two bends, or more than 180° total, makes safe cable pulling impossible.',
      },
      {
        question: 'What is the maximum balanced-data bundle size?',
        answer: '24 cables',
        why: 'Larger bundles trap heat and increase interference, so 24 is the limit.',
      },
    ],
  },
];

export function searchCableCodes(query: string): CableCode[] {
  const q = query.trim().toLowerCase();
  if (!q) return cableCodes;
  return cableCodes.filter((code) => {
    const haystack = [
      code.codeExample,
      code.title,
      code.summary,
      ...code.searchTerms,
      ...code.parts.map((p) => `${p.label} ${p.meaning}`),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
