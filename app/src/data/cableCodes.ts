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
