import type { AnswerChoice, Question, QuestionSection } from '../types/question';

type Spec = {
  question: string;
  correct: string;
  distractors: [string, string, string];
  explanation: string;
  standardRef?: string;
};

const answerChoices: AnswerChoice[] = ['A', 'B', 'C', 'D'];

const sectionOrder: QuestionSection[] = [
  'Product Selection',
  'Containment Systems',
  'Cable Laying',
  'Cable Dressing',
  'Fire Regulations',
  'Safe Cable Installation',
  'Personal Safety',
  'Other Services',
  'Waste Management',
];

const sectionSpecs: Record<QuestionSection, Spec[]> = {
  'Product Selection': [
    {
      question:
        'A specification calls for a standard indoor data cable in a normal building route. Which EuroClass reaction-to-fire code is the one to learn for this scenario?',
      correct: 'Cca-s1b,d2,a2',
      distractors: ['Dca-s1b,d2,a2', 'Eca-s1b,d2,a2', 'Fca-s1b,d2,a2'],
      explanation:
        'Indoor telecommunications cable in a normal building is typically rated Cca-s1b,d2,a2. The main letter (Cca) describes flame spread; the s, d and a sub-ratings describe smoke production, flaming droplets and acidity.',
      standardRef: 'CPR / EN 13501-6 EuroClass',
    },
    {
      question: 'Among the listed cable codes, which produces the least smoke when burning?',
      correct: 'B2ca s1a d1 a1',
      distractors: ['Eca', 'Cca s1b d2 a2', 'Dca s2 d2 a2'],
      explanation:
        'The "s" digit in the EuroClass notation indicates smoke production. s1a is the lowest smoke level available, so B2ca s1a d1 a1 produces less smoke than s1b or s2 alternatives.',
      standardRef: 'CPR / EN 13501-6 EuroClass',
    },
    {
      question:
        'Which one of the following is NOT a telecommunications cable and instead belongs to the electrical power installation?',
      correct: '3 core 13 amp 230 volt mains cable',
      distractors: ['Cat5e 4 pair data cable', '1308 3 pair telephone cable', '2 pair intruder alarm cable'],
      explanation:
        'Data, telephone and intruder-alarm cables are communications-type cables. A 230 V mains lead is a low-voltage power cable and falls under the electrical installation, not the telecoms installation.',
      standardRef: 'BS EN 50173-1 (definitions)',
    },
    {
      question:
        'A data cable will run on the outside of a building, exposed to sunlight and weather, with no duct or conduit cover. What is the right selection criterion?',
      correct: 'Choose a UV-resistant cable with a sheath rated for outdoor exposure',
      distractors: [
        'Choose a standard indoor white-sheath cable',
        'Choose Cat 5e S/FTP and consider nothing else',
        'Choose Cat 6 F/FTP and consider nothing else',
      ],
      explanation:
        'External installation introduces UV and weather exposure. Sheath material and rating, not just the data category, decide whether the cable is suitable. BS EN 50174-3 covers external installation requirements.',
      standardRef: 'BS EN 50174-3',
    },
    {
      question:
        'For a Class EA balanced copper installation, what is the design length limit for the permanent link?',
      correct: '90 metres',
      distractors: ['55 metres', '100 metres', '1000 metres'],
      explanation:
        'The Class EA permanent link is limited to 90 m. The 100 m figure is the total channel length, which includes the permanent link plus equipment and patch cords.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'What is the standard maximum channel length for a Class EA balanced copper link, including normal patch and equipment cords?',
      correct: '100 metres',
      distractors: ['55 metres', '90 metres', '1000 metres'],
      explanation:
        'The channel is the permanent link plus cords at each end. For Class EA the total channel length is 100 m, leaving 10 m for the cords above the 90 m permanent link.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'If patch cords on a Class EA channel are longer than 20 m, what channel length should the design use?',
      correct: '95 metres',
      distractors: ['80 metres', '90 metres', '100 metres'],
      explanation:
        'Where total cord length exceeds 20 m, the channel allowance for the fixed cabling is reduced to 95 m to keep insertion loss within the Class EA budget.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'Under HD 60364-5-54, a cabinet, frame or rack of 21U or less requires what minimum bonding conductor size?',
      correct: '4 mm² minimum bonding conductor',
      distractors: [
        '2.5 mm² minimum bonding conductor',
        '10 mm² minimum bonding conductor',
        '16 mm² minimum bonding conductor',
      ],
      explanation:
        'Smaller cabinets (≤21U) require at least a 4 mm² protective bonding conductor under HD 60364-5-54. Larger frames require a 16 mm² conductor.',
      standardRef: 'HD 60364-5-54 / BS 7671',
    },
    {
      question:
        'Under HD 60364-5-54, what is the minimum bonding conductor size for a cabinet, frame or rack larger than 21U?',
      correct: '16 mm² minimum bonding conductor',
      distractors: [
        '2.5 mm² minimum bonding conductor',
        '4 mm² minimum bonding conductor',
        '10 mm² minimum bonding conductor',
      ],
      explanation:
        'For larger racks (>21U), HD 60364-5-54 calls for at least a 16 mm² bonding conductor. The same standard sits behind BS 7671 earthing and bonding rules.',
      standardRef: 'HD 60364-5-54 / BS 7671',
    },
    {
      question:
        'A 12U wall-mounted communications cabinet with a glass door is being installed. What size protective bonding conductor is required?',
      correct: '4 mm² minimum bonding conductor',
      distractors: [
        'No bonding conductor is needed',
        '2.5 mm² minimum bonding conductor',
        '10 mm² minimum bonding conductor',
      ],
      explanation:
        'A 12U wall cabinet is within the small-cabinet bracket (≤21U), so the 4 mm² minimum bonding conductor applies regardless of the door material.',
      standardRef: 'HD 60364-5-54',
    },
    {
      question: 'Of the Ethernet application names listed, which is supported over Cat5e balanced cabling?',
      correct: '100baseT',
      distractors: ['100baseSX', '10base2', '10base5'],
      explanation:
        '100baseT runs over balanced twisted-pair such as Cat5e. 100baseSX is optical, while 10base2 and 10base5 are legacy coaxial Ethernet variants.',
      standardRef: 'IEEE 802.3',
    },
    {
      question: 'A 10 Gb/s link must run 500 m between two buildings. Which media family is appropriate?',
      correct: 'Fibre optic cable',
      distractors: ['Co-axial cable', 'Cat 6A balanced cable', 'Cat 7 or Cat 8 balanced cable'],
      explanation:
        'Balanced copper categories such as Cat 6A, Cat 7 or Cat 8 are limited to about 100 m at 10 Gb/s. At 500 m, fibre is the correct media family.',
      standardRef: 'ISO/IEC 11801-1',
    },
    {
      question: 'A 10 Gb/s link must reach 2 km. Which media is the correct choice?',
      correct: 'Single-mode fibre optic cable',
      distractors: ['Multimode fibre OM1 or OM2', 'Multimode fibre OM3 or OM4', 'Multimode fibre OM5'],
      explanation:
        'Multimode fibre grades are intended for short reach, typically a few hundred metres at 10 Gb/s. For kilometre-scale 10 Gb/s links, single-mode fibre is used.',
      standardRef: 'ISO/IEC 11801-1',
    },
    {
      question: 'Which of the following core/cladding fibre sizes is NOT a standard telecoms fibre size?',
      correct: '100/125',
      distractors: ['9/125', '50/125', '62.5/125'],
      explanation:
        '9/125 µm is single-mode; 50/125 µm and 62.5/125 µm are multimode. 100/125 is not a recognised standard size for telecoms fibre.',
      standardRef: 'ITU-T G.652 / ISO/IEC 11801-1',
    },
    {
      question:
        'In the context of construction-product cable performance, what does the abbreviation CPR stand for?',
      correct: 'Construction Products Regulations',
      distractors: [
        'Cable Product Regulations',
        'Construction Product Requirements',
        'Construction Protection Regulations',
      ],
      explanation:
        'CPR refers to the Construction Products Regulations, which set the framework for declaring the performance of construction products, including reaction-to-fire performance for cables.',
      standardRef: 'EU Regulation 305/2011 / UK CPR 2013',
    },
    {
      question:
        'When discussing construction-product cable documentation, what does the abbreviation DoP stand for?',
      correct: 'Declaration of Performance',
      distractors: ['Declaration of Product', 'Details of Performance', 'Declaration of Personnel'],
      explanation:
        'A Declaration of Performance is the document in which a manufacturer states the declared characteristics of a construction product, including any reaction-to-fire EuroClass rating.',
      standardRef: 'CPR Article 4',
    },
    {
      question: 'What does CE marking on a cable product actually indicate?',
      correct: 'The product meets the applicable EU safety, health or environmental requirements',
      distractors: [
        'The product meets every worldwide standard',
        'The product was manufactured in the European Union',
        'The product meets only data transmission requirements',
      ],
      explanation:
        'CE marking is a conformity mark covering the relevant EU directives or regulations that apply to that product class. It is not a statement of origin and is not a worldwide approval.',
      standardRef: 'EU Regulation 765/2008',
    },
  ],
  'Containment Systems': [
    {
      question:
        'When laying 4-pair balanced cable into containment, what minimum bend radius does BS EN 50174-2 generally suggest?',
      correct: 'Eight times the cable outside diameter',
      distractors: [
        'Four times the cable outside diameter',
        'Ten times the cable outside diameter',
        'Twelve times the cable outside diameter',
      ],
      explanation:
        'For 4-pair balanced cabling, BS EN 50174-2 uses 8× the outside diameter as the installed bend-radius guide. Tighter bends affect crosstalk and return loss.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'For optical fibre and coaxial cables in installed containment, what minimum bend radius does BS EN 50174-2 indicate?',
      correct: 'Ten times the cable outside diameter',
      distractors: [
        'Four times the cable outside diameter',
        'Eight times the cable outside diameter',
        'Twelve times the cable outside diameter',
      ],
      explanation:
        'For fibre and coax, BS EN 50174-2 uses 10× the cable outside diameter as the installed bend-radius reference. Manufacturer values may be tighter for short-term pulling but installed bends should follow the standard.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is one rack unit (1U) on a standard 19 inch frame?',
      correct: '44.45 mm (1.75 inches)',
      distractors: ['50 mm (2 inches)', '30 mm (approximately 1.2 inches)', '25 mm (1 inch)'],
      explanation:
        '1U on a 19 inch rack is 44.45 mm (1.75 inches) high. Rack-mountable equipment is sized in whole rack units (1U, 2U, 4U, etc.).',
      standardRef: 'EIA-310 / IEC 60297',
    },
    {
      question: 'Which statement best describes a cable management system?',
      correct:
        'A set of pathway products such as tray, basket, ducts and tubes used to support or contain cabling',
      distractors: [
        'Only metallic tray installed below floor level',
        'Only tubes intended for blown fibre or blown copper',
        'The boxes or drums in which cables are delivered to site',
      ],
      explanation:
        'A cable management system covers the full range of pathway products designed to contain or support cabling, including ducts and tubes for blown installation. The shipping packaging is not a management system.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Can a suspended ceiling grid be used to support a network cabling pathway?',
      correct: 'No — pathway systems must be fixed to suitable building fabric, not to the ceiling grid',
      distractors: [
        'Yes, provided the cable bundle is small',
        'Yes, provided devices are mounted in the same ceiling',
        'Yes, for short pathway runs only',
      ],
      explanation:
        'Suspended ceiling grids are not rated to carry cable pathway loads. Containment must be fixed to the structure itself so the ceiling grid only carries its own weight.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Before adding more cables to an existing containment route, what should you check?',
      correct: 'That the containment and its fixings can carry the additional cable load',
      distractors: [
        'Only that the new cables physically fit through the route',
        'Only that the new cable colour matches existing cables',
        'Only that the route remains visible from below',
      ],
      explanation:
        'Adding cables increases weight and may exceed the design loading of the containment and its fixings. Loading should be verified before the additional cables are pulled in.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'When routing containment through a designated escape route, what is the primary installation requirement?',
      correct: 'Use supports and materials suitable for the location and the fire-safety requirements',
      distractors: [
        'Use the cheapest containment available to keep costs down',
        'Use plastic containment because it is easier to install',
        'Hide the containment behind decorative panels regardless of fire rating',
      ],
      explanation:
        'Escape routes have specific fire-safety requirements. Containment, fixings and any sealing must be selected so that the route remains safe during evacuation or a fire condition.',
      standardRef: 'BS EN 50174-2 / Building Regs Part B',
    },
    {
      question: 'You are refitting trunking lids after pulling cables. What is the correct practice?',
      correct: 'Replace the lids without trapping, pinching or crushing any cable',
      distractors: [
        'Force the lid closed and adjust cables later',
        'Leave the lid loose if the cables seem tight',
        'Tighten lid screws fully even if a cable is pinched',
      ],
      explanation:
        'A trapped or crushed cable can fail performance tests and can be damaged over time. Lids should close cleanly without any pressure on cables.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Several services are about to share the same containment. What must be confirmed first?',
      correct: 'That separation, identification and compatibility between services are acceptable',
      distractors: [
        'That all services use the same coloured cable',
        'That only one service has a written specification',
        'That the largest service is installed last regardless of route',
      ],
      explanation:
        'Shared containment must respect electrical separation, EMI considerations, identification and any client policy. The route should be managed so one service does not compromise another.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When containment changes direction, which accessory choice is correct?',
      correct: 'Use bend accessories that maintain the required cable bend radius',
      distractors: [
        'Use a sharp 90° angle to save material',
        'Use any bend that physically fits the space',
        'Cut the containment freehand and bend it manually',
      ],
      explanation:
        'Bends in containment must not force cables below their permitted bend radius. Manufacturer-supplied bend accessories are designed to maintain that geometry.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'After cutting containment on site, what must be done before installing cable?',
      correct: 'Deburr the cut edges and protect cables from any sharp metal or plastic',
      distractors: [
        'Leave the cut edges if the installation is hidden',
        'Apply paint over burrs in place of removing them',
        'Cover the burrs with PVC tape only',
      ],
      explanation:
        'Site-cut containment can leave sharp burrs that abrade or cut cable sheaths during installation and later movement. Burrs should be removed or covered with a purpose-made bushing.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'You are fixing containment to a weak or unusual substrate. What is the right approach?',
      correct: 'Use fixings rated for that substrate and for the expected containment load',
      distractors: [
        'Use the same fixings as elsewhere on site, regardless of substrate',
        'Use longer screws and ignore the substrate type',
        'Use double-sided tape if drilling is inconvenient',
      ],
      explanation:
        'Containment is only as safe as its fixings and background. The substrate, the load and the environment all influence the correct fixing.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When restraining cables on containment, what is the correct use of cable ties?',
      correct: 'Use suitable restraints and avoid over-tightening that deforms the cable',
      distractors: [
        'Pull every tie as tight as possible for a neat finish',
        'Use wire ties because they are cheaper than nylon',
        'Tie groups of 50 cables together for speed',
      ],
      explanation:
        'Over-tight ties can crush balanced cable and impair transmission performance. Restraints should hold the bundle without changing cable geometry.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Containment is being installed in an area likely to need future additions. What must be considered?',
      correct: 'Keep inspection and maintenance access available along the route',
      distractors: [
        'Hide the route entirely so users cannot see it',
        'Block access once the cables are pulled in',
        'Run cabling tight to walls so no access is possible',
      ],
      explanation:
        'Network cabling routes need to remain testable and maintainable. Containment should be installed so that lids, joints and access points are reachable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'A cable route passes through a damp or corrosive area. Which choice is correct?',
      correct: 'Select corrosion-resistant containment and fixings suitable for the environment',
      distractors: [
        'Use standard mild steel because painted finish is enough',
        'Use plain plastic for all wet locations regardless of fire rating',
        'Use any galvanised steel without checking the grade',
      ],
      explanation:
        'Moisture and chemical environments shorten the life of unsuitable containment and can weaken support over time. The grade of containment and fixings should be chosen for the environment.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Containment is being installed across a building expansion joint. What must be allowed for?',
      correct: 'Building movement, so containment and cables are not strained when the structure moves',
      distractors: [
        'No movement, because the joint is decorative',
        'No movement, because the cable is flexible enough',
        'A rigid bridge across the joint with no expansion accessory',
      ],
      explanation:
        'Expansion joints exist because the building moves. Rigid containment across the joint will be damaged in time and may transfer strain to cabling.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'When metallic containment forms part of the installation, what should be done about bonding?',
      correct: 'Follow the electrical design for bonding the containment as required',
      distractors: [
        'Bond every section to every other section with mains earth',
        'Never bond metallic containment under any circumstance',
        'Bond only the section closest to the door',
      ],
      explanation:
        'Metallic containment may need protective bonding depending on the design and on electrical safety requirements. The electrical design dictates the bonding strategy.',
      standardRef: 'HD 60364-5-54 / BS 7671',
    },
    {
      question:
        'Cables are being installed in a void above suspended ceiling tiles. What is the correct practice?',
      correct: 'Keep cables on supported containment, not loose on ceiling tiles',
      distractors: [
        'Lay cables loose on the ceiling tiles for speed',
        'Tape cables to the ceiling grid hangers',
        'Drape cables over the lighting fittings',
      ],
      explanation:
        'Ceiling tiles and grid members are not cable supports. Cabling above ceilings should run on proper tray, basket or another suitable pathway.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When using basket tray for data cabling, what is the correct dressing principle?',
      correct: 'Support cables without sharp pressure points, excessive sag or deformation',
      distractors: [
        'Stack cables as deep as possible to use all available space',
        'Tie every metre as tight as possible regardless of sag',
        'Leave large sags between supports to act as service loops',
      ],
      explanation:
        'Basket tray performs well when the cable is supported evenly. Sharp pressure points, heavy stacking and severe sag all distort cable geometry.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What should be inspected on containment before handover?',
      correct: 'Sharp edges, missing lids, poor support, overfilling and incomplete fire stopping',
      distractors: [
        'Only the colour of the containment',
        'Only the brand name of the manufacturer',
        'Only the position of unrelated services nearby',
      ],
      explanation:
        'Containment quality directly affects safety, maintainability and link performance. The above items are common defects that should be picked up before handover.',
      standardRef: 'BS EN 50174-2',
    },
  ],
  'Cable Laying': [
    {
      question: 'During installation of Cat 6A or shielded UTP, what minimum bend radius is generally used?',
      correct: 'At least four times the cable outside diameter',
      distractors: [
        'At least two times the cable outside diameter',
        'At least six times the cable outside diameter',
        'At least ten times the cable outside diameter',
      ],
      explanation:
        'During installation, Cat 6A and shielded UTP normally use a 4× outside-diameter bend radius. The installed (in service) value can be tighter than during pulling.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Of Cat 5, Cat 5e, Cat 6 and Cat 6A, which is most sensitive to tight bends?',
      correct: 'Cat 6A',
      distractors: ['Cat 5', 'Cat 5e', 'Cat 6'],
      explanation:
        'Higher-performance balanced cabling is more sensitive to geometry. Of the four categories listed, Cat 6A has the largest bend-radius concern.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'How many Cat 6A cables does the guide use as the example fill for a 20 mm conduit?',
      correct: '2 Cat 6A cables',
      distractors: ['6 Cat 6A cables', '12 Cat 6A cables', '24 Cat 6A cables'],
      explanation:
        'For Cat 6A in a 20 mm conduit, the example is 2 cables. Fill should always be checked against cable outside diameter, bends and pull length.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'For 12 Cat 6 cables routed at desk height in an office, which containment is suitable from the listed options?',
      correct: '50 mm × 50 mm trunking',
      distractors: ['18 mm conduit', '300 mm steel tray', '100 mm × 54 mm wire basket'],
      explanation:
        '50 mm × 50 mm trunking gives a tidy, accessible route at desk height for a small bundle such as 12 Cat 6 cables. The others are either too small or oversized for the location.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When pulling a bundle of cables together, what should the installer manage?',
      correct: 'The bundle so cables do not cross, twist or exceed tension limits',
      distractors: [
        'Only the speed of the pull, not the bundle geometry',
        'Only the bundle weight, not the friction at bends',
        'Only the box order, not the cable layout',
      ],
      explanation:
        'A managed bundle reduces friction and avoids overstressing individual cables. Crossed or twisted cables increase pulling tension and damage risk.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'If a pulling lubricant is needed, what must be verified?',
      correct: 'That the lubricant is compatible with the cable sheath and the installation method',
      distractors: [
        'That it is the cheapest one on the van',
        'That it is the same one used for electrical mains cable',
        'That it is brightly coloured so leaks are visible',
      ],
      explanation:
        'Incompatible lubricants can chemically attack the cable sheath or leave residue that affects later termination. Manufacturer-approved lubricant is the correct choice.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How much spare cable should be left at an outlet?',
      correct: 'A sensible service loop, without forcing tight coils or bends',
      distractors: [
        'No slack at all, to keep the cable straight',
        '10 metres in a tight coil for future use',
        'Any amount, coiled around a screw head',
      ],
      explanation:
        'A short service loop supports termination and future re-work. The slack must respect bend radius and must not exceed any tested length budget.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'You are pulling cable in cold conditions. What is the first thing to check?',
      correct: 'The manufacturer minimum installation temperature for that cable',
      distractors: [
        'The colour of the cable sheath',
        'The retail price of the cable',
        'The pack quantity on the box',
      ],
      explanation:
        'Many cables become brittle below their installation temperature limit. Pulling a cable below that temperature can crack the sheath and damage the conductors.',
      standardRef: 'Manufacturer data / BS EN 50174-2',
    },
    {
      question: 'How should data cabling be separated from sources of electromagnetic interference?',
      correct: 'Keep adequate distance, or use suitable barriers, between IT cable and noise sources',
      distractors: [
        'Use ordinary insulating tape between cables',
        'Rely on the cable colour for EMI immunity',
        'Use distance only on cables shorter than 1 m',
      ],
      explanation:
        'Balanced cabling rejects common-mode noise, but is not immune. Adequate separation, screening and proper containment all reduce induced noise.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'On a long vertical drop, how should the cable be supported?',
      correct: 'Supported at appropriate intervals so strain is not carried by the termination',
      distractors: [
        'Hanging entirely from the top connector',
        'Tied at the bottom only, with no support above',
        'Coiled at the top to absorb the weight',
      ],
      explanation:
        'Long vertical runs can exert significant weight on the termination if not supported. Intermediate supports prevent strain on connectors and conductors.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When passing cable through a drilled hole, what is the correct practice?',
      correct: 'Protect the cable from rough edges and avoid compressing it in the opening',
      distractors: [
        'Wedge the cable in the hole to hold it in place',
        'Drill the hole smaller than the cable for grip',
        'Use the rough edge to strip the sheath',
      ],
      explanation:
        'Rough or oversized openings can damage the cable sheath. A grommet or bushing protects the cable and helps maintain fire compartmentation where required.',
      standardRef: 'BS EN 50174-2 / Building Regs Part B',
    },
    {
      question: 'You must cross a power cable with a data cable. What is the correct technique?',
      correct: 'Cross at a right angle and avoid long parallel runs nearby',
      distractors: [
        'Cross in a long parallel section to keep the route tidy',
        'Cross only where both cables share the same containment',
        'Cross only where another data cable runs alongside',
      ],
      explanation:
        'A right-angle crossing minimises the parallel exposure between the cables. Long parallel runs increase EMI coupling, even where a single crossing is necessary.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Before pulling cable through a conduit, what must be checked?',
      correct: 'The conduit fill, bend count and draw-in access',
      distractors: [
        'Only the conduit colour',
        'Only the conduit length',
        'Only the conduit manufacturer name',
      ],
      explanation:
        'A conduit that is too full, has too many bends or has limited draw-in points can over-tension cable during installation. These factors must be checked before pulling.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'You plan to use an existing route for new cabling. What is the correct first step?',
      correct: 'Survey the route to confirm capacity, condition and suitability',
      distractors: [
        'Assume the route is fine because it was used previously',
        'Pull in cables and check capacity afterwards',
        'Cut the existing containment to add the new cables',
      ],
      explanation:
        'Existing routes may be overloaded, damaged, blocked or no longer suitable. A short survey before pulling new cables avoids damage to existing services.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How should cable ends be treated during installation, before termination?',
      correct: 'Keep them clean, capped and protected from dust and moisture',
      distractors: [
        'Leave them in standing water for cooling',
        'Drag them across the floor for identification',
        'Tape them to live mains cables for support',
      ],
      explanation:
        'Contamination at the cable end can affect later termination and test results. Caps or bags keep the ends clean until termination is ready.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When during installation should cables be identified?',
      correct: 'At both ends before final termination and testing',
      distractors: [
        'Only after handover, if the client asks',
        'Only at the patch panel end',
        'Only on cables longer than 50 m',
      ],
      explanation:
        'Identifying both ends before termination prevents cross-connection and saves re-work during testing. Final labels can be applied at termination.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the correct rule for protecting installed cable from crushing?',
      correct: 'Do not stand on cables, trap them under materials or compress them with fixings',
      distractors: [
        'Stand on cables only briefly to flatten them',
        'Use the bundle as a workbench for tools',
        'Pin cables down with heavy fixings to keep them in place',
      ],
      explanation:
        'Crushing changes cable geometry and can cause faults that are not visible from the outside. Even short crushing events can fail performance tests.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How should the draw-in sequence be planned for a multi-cable pull?',
      correct: 'Plan the order so cables do not tangle and pulling force stays within limits',
      distractors: [
        'Pull every cable at once with no planning',
        'Pull the shortest cable last regardless of route',
        'Pull cables in random order to save time',
      ],
      explanation:
        'A planned sequence makes the pull safer, reduces friction and prevents tangles that can damage the bundle.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When routing pre-terminated assemblies, what is the priority?',
      correct: 'Protect connectors and pulling socks so terminations are not damaged',
      distractors: [
        'Pull connectors first without any cover',
        'Use the connector as a drag handle',
        'Remove pulling socks before pulling',
      ],
      explanation:
        'Pre-terminated assemblies arrive ready to plug in. Damaged connectors mean a failed link, so pulling protection is essential.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Before terminating an installed cable, what should be done?',
      correct: 'Inspect for sheath damage, kinks, crushing and any route issue',
      distractors: [
        'Terminate immediately and rely on testing later',
        'Cut off both ends without inspection',
        'Tape over visible damage and terminate',
      ],
      explanation:
        'Pre-termination inspection catches damage early so the link is not certified with hidden defects.',
      standardRef: 'BS EN 50174-2',
    },
  ],
  'Cable Dressing': [
    {
      question: 'When dressing copper pairs into a patch panel, what is the rule about pair twist?',
      correct: 'Keep the pair twist as close to the termination point as practical',
      distractors: [
        'Untwist pairs as far as needed to make conductors lie flat',
        'Remove the pair separator and untwist all pairs before dressing',
        'Use cable colour to decide how much twist can be removed',
      ],
      explanation:
        'Excessive untwisting at the termination increases crosstalk and reduces NEXT/return loss performance. Each cable category has a maximum untwist value, typically very short.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the maximum copper data cable bundle size given in the guide?',
      correct: '24 cables in a bundle',
      distractors: ['50 cables in a bundle', '72 cables in a bundle', '100 cables in a bundle'],
      explanation:
        'For data cabling the bundle limit referenced is 24 cables. Larger bundles can increase heat, cross-bundle interference and pulling tension.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which restraint is best for temporarily dressing cables during installation?',
      correct: 'Hook and loop fastening',
      distractors: ['150 mm × 7.6 mm nylon cable ties', 'Steel wire ties', '300 mm × 13 mm nylon cable ties'],
      explanation:
        'Hook and loop fastening can be released and re-applied without crushing the cable. Nylon ties pulled tight risk deforming balanced cable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How should patch cords in a cabinet be managed?',
      correct: 'Routed so ports remain identifiable and cords are not sharply bent',
      distractors: [
        'Bundled tightly across the front of the panel',
        'Looped behind the equipment in any direction',
        'Cut shorter on site to reduce slack',
      ],
      explanation:
        'Patch cord routing affects identification, airflow and reliability. Pre-made cords should not be cut and re-terminated on site.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is correct practice for dressing fibre patch leads?',
      correct: 'Use bend-management features and avoid tight loops',
      distractors: [
        'Hang fibre leads from connectors only',
        'Pull each lead as tight as possible across the door',
        'Tie fibre leads to copper bundles for support',
      ],
      explanation:
        'Fibre is more sensitive to bend than copper. Bend-management spools, ducts and trays keep the minimum bend radius without sharp loops.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When copper and fibre share a cabinet, how should they be dressed?',
      correct: 'Each media type is supported and accessible without strain on the other',
      distractors: [
        'Mixed into one bundle for a tidy front view',
        'Fibre laid on top of copper as the highest layer',
        'Copper laid on top of fibre as the highest layer',
      ],
      explanation:
        'Different media have different handling needs. Separate vertical and horizontal management for each type keeps the installation maintainable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the correct approach to service loops left in a cabinet?',
      correct: 'Provide enough slack for maintenance without creating unmanaged coils',
      distractors: [
        'Leave 5 m of slack coiled loosely on the floor',
        'Leave no slack so maintenance is faster',
        'Coil the slack tightly around the patch panel',
      ],
      explanation:
        'Service loops should be controlled so they do not block airflow, cross bend-radius limits or create future maintenance hazards.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When dressing cable behind an outlet faceplate, what should be avoided?',
      correct: 'Crushing the cable or exceeding the bend radius',
      distractors: [
        'Leaving service slack inside the box',
        'Using the manufacturer outlet jack',
        'Recording the cable identifier',
      ],
      explanation:
        'The last few centimetres of cable still influence the certified link performance. Pinching or kinking behind the plate can fail the test.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the purpose of cable management bars in a rack?',
      correct: 'To support cables and patch cords so the connector does not carry strain',
      distractors: [
        'To hide unused ports from view',
        'To replace the need for labelling',
        'To act as the primary cable identification feature',
      ],
      explanation:
        'Management bars take mechanical strain off connectors and keep cords clear of equipment ventilation paths.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What must cable dressing not do in an active equipment cabinet?',
      correct: 'Obstruct equipment ventilation or airflow paths',
      distractors: [
        'Use the cabinet manufacturer cable trays',
        'Identify cables on both sides of the cabinet',
        'Provide a service loop for the patching field',
      ],
      explanation:
        'Blocked airflow leads to higher equipment temperatures and reduced reliability. Cable bundles should never sit across intake or exhaust grilles.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'After dressing a cabinet, what must remain true of the labels?',
      correct: 'Each label remains readable and associated with the correct cable or port',
      distractors: [
        'Labels can be removed once the cables look tidy',
        'Labels can be reused on different cables to save material',
        'Labels are only required at the user outlet',
      ],
      explanation:
        'A tidy installation is not maintainable if identification is hidden, swapped or destroyed during dressing.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When reworking a dressed cable bundle, what is the right method?',
      correct: 'Release the restraints and redress the bundle carefully',
      distractors: [
        'Pull individual cables out through the tight bundle',
        'Cut the bundle in half and rejoin it later',
        'Add new cables on top without releasing the existing ones',
      ],
      explanation:
        'Dragging individual cables out can abrade sheaths and disturb existing terminations. The bundle should be opened and redressed properly.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How close to a termination should the last cable tie be placed?',
      correct: 'Far enough away to avoid stressing the connector or the conductor entry',
      distractors: [
        'Right against the connector body for grip',
        'Inside the connector housing for neatness',
        'Around the conductors above the jacket strip',
      ],
      explanation:
        'A restraint too close to a termination can pull the conductors out of position or stress the entry. A small offset keeps the termination stable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Does Cat 7 or Cat 8 patching change basic dressing discipline?',
      correct: 'No — bend radius, restraint and labelling still apply',
      distractors: [
        'Yes, higher categories are immune to tight bends',
        'Yes, bundle them more tightly than Cat 5e',
        'Yes, cable colour replaces the need for testing',
      ],
      explanation:
        'Higher category cables still need correct geometry, restraint and identification. Performance gains are lost quickly if dressing discipline slips.',
      standardRef: 'BS EN 50173-1 / BS EN 50174-2',
    },
  ],
  'Fire Regulations': [
    {
      question: 'Which framework sets the reaction-to-fire classification system used for IT cables?',
      correct: 'Construction Products Regulations 2013 (CPR)',
      distractors: [
        'Regulatory Reform (Fire Safety) Order 2005',
        'Electricity at Work Regulations 1989',
        'Building Regulations 2010',
      ],
      explanation:
        'The CPR / EuroClass system is the construction-products framework used to classify cable reaction to fire (EN 13501-6). The Fire Safety Order and Building Regs sit at a higher level.',
      standardRef: 'CPR / EN 13501-6',
    },
    {
      question: 'In the context of cable fire performance, what does CPR stand for?',
      correct: 'Construction Products Regulations',
      distractors: ['Cable Products Regulations', 'Cable Products Rules', 'Construction Products Rules'],
      explanation:
        'CPR is the Construction Products Regulations, which set the harmonised framework for declared product performance, including reaction to fire for cables.',
      standardRef: 'CPR',
    },
    {
      question:
        'For a new data-cable installation in a normal building, which EuroClass code is the one to learn?',
      correct: 'Cca-s1b,d2,a2',
      distractors: ['Dca-s1b,d2,a2', 'Fca', 'Aca'],
      explanation:
        'Cca-s1b,d2,a2 is the EuroClass code typically used for new fixed data-cable installation. Aca is non-combustible (rare for telecoms) and Fca is the lowest rating.',
      standardRef: 'CPR / EN 13501-6',
    },
    {
      question: 'Where must a cable manufacturer display the CPR EuroClass classification for a data cable?',
      correct: 'On the CE-marked label on the cable reel, box or spool',
      distractors: [
        'Only on the manufacturer website',
        'Only on the manufacturer data sheet',
        'Only printed directly on the cable jacket',
      ],
      explanation:
        'The CE-marked label on the packaging is the mandatory location for the EuroClass classification. Websites and data sheets may carry it too, but the label is the controlling reference.',
      standardRef: 'CPR Article 7',
    },
    {
      question: 'What records should be kept for completed fire-stopping work?',
      correct: 'Location, product used, installer, rating and date for each seal',
      distractors: [
        'Only the cost of the materials used',
        'Only the project reference number',
        'No records, because fire stopping is verbal sign-off',
      ],
      explanation:
        'Fire-stopping records support the building fire strategy and demonstrate that compartmentation has been correctly reinstated.',
      standardRef: 'BS 9999 / Regulatory Reform (Fire Safety) Order 2005',
    },
    {
      question: 'Can different fire-stopping products be mixed in one penetration?',
      correct: 'No — use only tested systems and combinations specified by the manufacturer',
      distractors: [
        'Yes, as long as both are fire-rated for any duration',
        'Yes, if expanding foam is one of the products',
        'Yes, when one is the cheaper alternative',
      ],
      explanation:
        'Fire-stopping performance is based on tested systems. Improvised combinations of products invalidate the tested rating.',
      standardRef: 'BS EN 1366 / Manufacturer data',
    },
    {
      question: 'You notice annular gaps around cables passing through a wall. What is the correct action?',
      correct: 'Seal the gaps using the specified fire-stopping system',
      distractors: [
        'Ignore the gaps if they are above a ceiling',
        'Cover them with plastic tape only',
        'Fill them with general-purpose silicone',
      ],
      explanation:
        'Even small gaps allow smoke spread and break compartmentation. Sealing must use the specified system, not improvised material.',
      standardRef: 'BS 9999',
    },
    {
      question: 'How should the reaction-to-fire marking on an installed cable be verified?',
      correct: 'Check the marking or supplied documentation against the project specification',
      distractors: [
        'Trust the cable colour alone',
        'Trust the reel weight alone',
        'Ignore the marking once the cable is on site',
      ],
      explanation:
        'The installed cable should be traceable to the project requirement via the EuroClass marking on the packaging or jacket and the supplied DoP.',
      standardRef: 'CPR / EN 13501-6',
    },
    {
      question: 'What is the correct practice when routing cables through a protected shaft?',
      correct: 'Maintain the fire protection and service separation of the shaft',
      distractors: [
        'Treat the shaft as ordinary containment',
        'Tape over the access panels permanently',
        'Use the shaft for additional storage',
      ],
      explanation:
        'Protected shafts are part of the building fire strategy. Cabling work must not damage the shaft construction or its compartmentation.',
      standardRef: 'BS 9999 / Approved Document B',
    },
    {
      question: 'You are working close to live fire-alarm cabling. What is the correct approach?',
      correct: 'Follow the agreed isolation or permit process and avoid disturbing the system',
      distractors: [
        'Disconnect the alarm temporarily without telling anyone',
        'Tape over alarm sounders for quiet work',
        'Reroute the alarm to suit the new cable run',
      ],
      explanation:
        'Life-safety systems must not be impaired without proper authorisation. A documented isolation procedure protects building occupants and the installer.',
      standardRef: 'BS 5839-1',
    },
    {
      question: 'What should be done with redundant cabling found during a new installation?',
      correct: 'Remove or make safe the redundant cable where required by the fire strategy and scope',
      distractors: [
        'Leave all redundant cabling in place regardless',
        'Cut redundant cabling off at the wall only',
        'Bundle redundant cabling with the new installation',
      ],
      explanation:
        'Unused cables add fire load and can mislead future workers. Removal or making safe should follow the project scope and fire strategy.',
      standardRef: 'BS 6701 / BS 9999',
    },
    {
      question: 'What fixings should be used for a fire-stopping system?',
      correct: 'Fixings and collars that match the tested system',
      distractors: [
        'Any general-purpose screw from the van',
        'Adhesive tape rated for moisture only',
        'Cable ties used as collar substitutes',
      ],
      explanation:
        'Substituting fixings can invalidate the fire-test certification of the seal. The system must be installed as tested.',
      standardRef: 'BS EN 1366',
    },
    {
      question: 'When should fire-stopping be confirmed complete?',
      correct: 'Before ceilings, risers or other concealments are closed up',
      distractors: [
        'After handover, during routine maintenance',
        'After the first fire-alarm test',
        'Only when a complaint is received',
      ],
      explanation:
        'Once concealments close, missing or defective seals are difficult and expensive to find and remediate. Inspection must happen before close-up.',
      standardRef: 'BS 9999',
    },
    {
      question: 'You find incomplete or damaged fire-stopping. What is the correct action?',
      correct: 'Report it immediately through the project process',
      distractors: [
        'Leave a verbal message for the next shift',
        'Cover it up to avoid disputes',
        'Wait until handover and raise it then',
      ],
      explanation:
        'Fire-safety defects must not be left to informal resolution or hidden at handover. A formal report supports remediation and audit trail.',
      standardRef: 'Regulatory Reform (Fire Safety) Order 2005',
    },
  ],
  'Safe Cable Installation': [
    {
      question: 'When pulling cable from a drum, how should the work be staffed?',
      correct: 'At least two people, one controlling the drum and one pulling',
      distractors: [
        'One person pulling directly from the drum',
        'Three people are always required regardless of route',
        'Four people are always required regardless of route',
      ],
      explanation:
        'Drum control is a separate task from pulling. One person controls drum speed and overrun; at least one other person manages the pull.',
      standardRef: 'BS 6701 / BS EN 50174-2',
    },
    {
      question:
        'While pulling cable from a box, you notice friction damage to the sheath. What is the correct action?',
      correct: 'Stop, find and correct the rough point, then replace the damaged length',
      distractors: [
        'Cut the cable past the damaged section and continue',
        'Note the cable number and check the test results later',
        'Continue because only the sheath is marked',
      ],
      explanation:
        'Friction damage usually points to a rough or sharp point in the route. Continuing will damage more cable, and sheath damage may be a sign of deeper harm.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'A delivered cable drum is damaged enough to expose the cable. What should you do?',
      correct: 'Do not use the drum and report it to the supervisor',
      distractors: [
        'Use the drum while standing clear of it',
        'Pull the cable off manually without spinning the drum',
        'Repair the drum on site and use it normally',
      ],
      explanation:
        'A badly damaged drum means the cable inside cannot be trusted. The drum should not be used for installation and certification.',
      standardRef: 'BS 6701',
    },
    {
      question: 'A wooden drum is splintered around the rim but the cable seems fine. What is correct?',
      correct: 'Wear gloves, remove the splinters with a suitable tool, then use the drum',
      distractors: [
        'Use the drum as found, just stand back',
        'Never use a splintered drum, in any condition',
        'Return every splintered drum to stock without checking',
      ],
      explanation:
        'Splinters are an injury and cable-damage hazard. With the hazard controlled, the drum can be used if the cable itself is undamaged.',
      standardRef: 'Manual Handling Operations Regulations 1992',
    },
    {
      question: 'What is the correct support when paying cable off a wooden drum?',
      correct: 'A metal A-frame and spindle designed for the drum',
      distractors: [
        'A tied-off rope between two beams',
        'Two chairs and a broom handle',
        'Two chairs and a length of steel conduit',
      ],
      explanation:
        'Improvised drum supports are unsafe and can collapse during the pull. A proper A-frame and spindle handle the drum weight and allow controlled rotation.',
      standardRef: 'BS 6701',
    },
    {
      question: 'How many Cat 6A cable drums should one person carry at a time?',
      correct: 'Use the task risk assessment to decide',
      distractors: [
        'None — it is always a two-person lift',
        'As many as the person feels able to carry',
        'No more than three so vision is not blocked',
      ],
      explanation:
        'Manual handling depends on drum size, weight, route, distance and the individual. The risk assessment, not a fixed number, drives the decision.',
      standardRef: 'Manual Handling Operations Regulations 1992',
    },
    {
      question: 'A stack of cable boxes collapses while you are working. What is the correct response?',
      correct: 'Stop immediately and restack the boxes safely',
      distractors: [
        'Finish the current cable run first',
        'Report it but keep pulling cable',
        'Replace boxes only when they are empty',
      ],
      explanation:
        'Collapsed boxes create trip and pulling hazards and can tangle cable. The work area should be made safe before continuing.',
      standardRef: 'CDM Regulations 2015',
    },
    {
      question: 'What is the minimum staffing for pulling cable from boxes?',
      correct: 'At least two people',
      distractors: [
        'One person, if the route is short',
        'Three people in every case',
        'Four people in every case',
      ],
      explanation:
        'Two people is the minimum: one feeding the box, one pulling. More are added when route obstructions require additional control.',
      standardRef: 'BS 6701',
    },
    {
      question: 'You are loose-laying cable around a 90° corridor corner. What is the correct method?',
      correct: 'Station someone at the corner to feed and control the cable',
      distractors: [
        'Pull the entire length around the corner in one movement',
        'Use a drum at the corner as strain relief',
        'Put the cable box on the corner and fleet back later',
      ],
      explanation:
        'A person at the corner reduces rubbing, controls bend radius and keeps the moving cable visible to the team.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the correct rule for using knives during data-cabling work?',
      correct: 'Avoid knives where a proper specialist tool is available',
      distractors: [
        'Use a knife whenever removing sheath',
        'Use a retractable knife in place of specialist tools',
        'Use a knife as a screwdriver when convenient',
      ],
      explanation:
        'Purpose-made stripping and cutting tools reduce both injury risk and cable damage. Knives are a last resort.',
      standardRef: 'PUWER 1998',
    },
    {
      question:
        'You are pulling between two offices through a straight false-ceiling route with basket already installed. How many people are needed?',
      correct: 'Three people',
      distractors: ['One person', 'Two people', 'Four people'],
      explanation:
        'Three people is the typical minimum: one at the box, one feeding the route, and one at the receiving end.',
      standardRef: 'BS 6701',
    },
    {
      question: 'Which tool is suitable for pulling a bundle through an enclosed pathway?',
      correct: 'Nylon cable rods',
      distractors: ['A trunking lid', 'A straightened wire coat hanger', 'A broom handle'],
      explanation:
        'Cable rods are designed to be pushed through pathways and joined as required. Improvised items can damage cable or get stuck in the route.',
      standardRef: 'PUWER 1998',
    },
    {
      question: 'You discover suspect asbestos-containing material on the route. What must you do?',
      correct: 'Stop work and follow the site asbestos procedure',
      distractors: [
        'Drill carefully and continue',
        'Cover it with tape and continue',
        'Move it out of the route by hand',
      ],
      explanation:
        'Suspect asbestos must not be disturbed without the correct survey and controls. The site procedure determines the next steps.',
      standardRef: 'Control of Asbestos Regulations 2012',
    },
    {
      question: 'What is the correct tool for cutting the yellow fibrous strength member in a fibre cable?',
      correct: 'Kevlar (aramid) scissors',
      distractors: ['A utility knife', 'A hacksaw', 'Bolt cutters'],
      explanation:
        'Aramid yarn dulls ordinary scissors quickly. Purpose-made Kevlar scissors cut cleanly without slipping or damaging the fibre.',
      standardRef: 'Manufacturer guidance',
    },
    {
      question: 'When fitting a new hacksaw blade, which way must the teeth face?',
      correct: 'Forward, so the saw cuts on the forward stroke',
      distractors: [
        'It does not matter which way',
        'Backwards, so the saw cuts on the return stroke',
        'Choose direction based on the hacksaw type',
      ],
      explanation:
        'Hacksaw blades are designed to cut on the forward stroke. Fitting them backwards reduces cut efficiency and increases breakage risk.',
      standardRef: 'PUWER 1998',
    },
    {
      question: 'Which tool is correct for cutting excess Cat 6 cable?',
      correct: 'Side cutters',
      distractors: ['A hacksaw', 'A jigsaw', 'Scissors'],
      explanation:
        'Side cutters cleanly cut small-diameter copper conductors and the cable jacket. A hacksaw or jigsaw is oversized for the job.',
      standardRef: 'Manufacturer guidance',
    },
    {
      question: 'How should a cable be temporarily marked during pulling?',
      correct: 'With a fine-point permanent marker',
      distractors: ['A felt tip pen', 'A ball point pen', 'A chalk pen'],
      explanation:
        'A fine-point permanent marker survives handling during pulling. Felt tip, ballpoint and chalk marks rub off too easily.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which restraint is correct for temporarily fastening cables that may need adjustment later?',
      correct: 'Hook and loop fastening',
      distractors: ['150 mm × 7.6 mm nylon ties', 'Steel wire ties', '300 mm × 13 mm nylon ties'],
      explanation:
        'Hook and loop fasteners can be released and reapplied without crushing the cable, which makes them ideal for dressing work that may still be adjusted.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What tool is correct for stripping the outer sheath of copper data cable?',
      correct: 'A cyclops / rotary cable stripper',
      distractors: ['A retractable utility knife', 'Scissors', 'A sharp pen knife'],
      explanation:
        'Purpose-made strippers control the cut depth and reduce damage to the inner pairs and foils. Knives and scissors easily cut too deep.',
      standardRef: 'Manufacturer guidance',
    },
    {
      question: 'Once cabling is installed but not yet handed over, what protection is needed?',
      correct: 'Protect cables from use as supports and from damage by follow-on trades',
      distractors: [
        'No protection is needed until handover',
        'Only the patch panel side needs protection',
        'Cables are deemed protected as soon as the lid is fitted',
      ],
      explanation:
        'Installed cable can still be damaged on site before handover. Physical protection and clear signage reduce that risk.',
      standardRef: 'CDM Regulations 2015',
    },
  ],
  'Personal Safety': [
    {
      question: 'Which gloves should be used when pulling in data cable?',
      correct: 'Correctly fitting EN 420 compliant work gloves',
      distractors: [
        'Heavy leather rigger gloves',
        'Blue disposable latex gloves',
        'Light cotton gloves with palm grips',
      ],
      explanation:
        'EN 420 sets the general requirements for protective gloves. Fit, dexterity and suitability to the task all matter.',
      standardRef: 'EN 420',
    },
    {
      question: 'Who is PPE primarily designed to protect?',
      correct: 'The person wearing it',
      distractors: ['Everyone in the work area', 'Only the site safety representative', 'Only the client'],
      explanation:
        'PPE is personal protective equipment. It is the last line of defence and protects the wearer.',
      standardRef: 'PPE at Work Regulations 1992 (as amended)',
    },
    {
      question: 'What is the correct base-to-height ratio for a leaning ladder?',
      correct: '1 : 4 (base out, height up)',
      distractors: ['1 : 2', '1 : 8', '4 : 1'],
      explanation:
        'A leaning ladder should be set so the base is one unit out for every four units of height — about 75°.',
      standardRef: 'HSE INDG455 / Work at Height Regulations 2005',
    },
    {
      question: 'You need both hands free for a task on a step-ladder. How do you stay safe?',
      correct: 'Maintain three points of contact using two feet and part of the body against the ladder',
      distractors: [
        'Keep both feet on the same step',
        'Use two feet and one hand only',
        'Wear a fall harness attached to the step-ladder',
      ],
      explanation:
        'When both hands are in use, stability still needs three points of contact. The body, knee or hip can act as the third point.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'You find a material you suspect contains asbestos. What is the immediate action?',
      correct: 'Stop work, warn others and prevent access to the area',
      distractors: [
        'Finish the work and sweep up later',
        'Continue with wet drilling',
        'Quietly choose another route without controlling the area',
      ],
      explanation:
        'Suspect asbestos must not be disturbed. The area must be controlled while the site asbestos procedure takes over.',
      standardRef: 'Control of Asbestos Regulations 2012',
    },
    {
      question: 'How do you decide whether a given PPE item is suitable?',
      correct: 'Assess it against the actual risk and the working conditions',
      distractors: [
        'Pick whichever is most comfortable',
        'Pick whichever is most visible',
        'Use it if it fits and is in date, regardless of risk',
      ],
      explanation:
        'PPE suitability comes from the risk assessment and the conditions on the day. Comfort and brand are not selection criteria.',
      standardRef: 'PPE at Work Regulations 1992 (as amended)',
    },
    {
      question: 'For pulling cable on an active construction site, which PPE should be used?',
      correct: 'Hard hat, eye protection, gloves, safety boots, hi-vis and a face mask where required',
      distractors: [
        'Hard hat and face mask only',
        'Gloves and safety glasses only',
        'Safety boots and hi-vis only',
      ],
      explanation:
        'A live construction site has multiple hazards at once. The full PPE set is normally required for cable pulling.',
      standardRef: 'CDM Regulations 2015',
    },
    {
      question: 'Which standard should a safety helmet meet for general cabling work at height?',
      correct: 'BS EN 397',
      distractors: [
        'A specific company-branded standard',
        'No standard, helmet colour is enough',
        'No standard, helmet style is enough',
      ],
      explanation:
        'BS EN 397 is the standard for industrial safety helmets. Brand and colour are organisational identifiers, not protection ratings.',
      standardRef: 'BS EN 397',
    },
    {
      question: 'Who must provide an employee with the PPE required for their work?',
      correct: 'The employer',
      distractors: ['The employee', 'The site storeman', 'The site health and safety adviser'],
      explanation:
        'Employers must provide suitable PPE free of charge where the risk assessment identifies that PPE is needed.',
      standardRef: 'PPE at Work Regulations 1992 (as amended)',
    },
    {
      question: 'How often should ladders or step-ladders be inspected before use?',
      correct: 'Visually inspected by the user before each use, in addition to any formal inspections',
      distractors: [
        'Monthly only, by the supervisor',
        'Weekly only, by the storeman',
        'After use, not before',
      ],
      explanation: 'A pre-use visual check by the user catches obvious defects between formal inspections.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'You see a near miss but no injury. What should you do?',
      correct: 'Report it through the site near-miss process',
      distractors: [
        'Ignore it because no one was hurt',
        'Tell only the people directly involved',
        'Wait until something similar causes an injury, then report',
      ],
      explanation:
        'Near-miss reporting is the simplest way to prevent repeat incidents before someone is injured.',
      standardRef: 'RIDDOR 2013 (reporting culture)',
    },
    {
      question: 'When should hearing protection be worn?',
      correct: 'When the work or area noise assessment requires it',
      distractors: [
        'Never, because cabling is quiet work',
        'Only on outdoor sites',
        'Only when the wearer chooses',
      ],
      explanation:
        'Noise exposure can come from drilling, cutting or nearby activities. The noise assessment drives the requirement.',
      standardRef: 'Control of Noise at Work Regulations 2005',
    },
    {
      question: 'How should dust exposure from drilling be controlled?',
      correct: 'Use extraction, damping or respiratory protection appropriate to the task',
      distractors: [
        'Open a window and continue without controls',
        'Wear a tied bandana over the nose and mouth',
        'Drill faster so the dust settles quickly',
      ],
      explanation:
        'Dust controls should be designed in before the task starts. The hierarchy is elimination, control at source, then PPE.',
      standardRef: 'COSHH 2002 / HSG260',
    },
    {
      question: 'Before using a step-up, podium or tower, what must be done?',
      correct: 'Inspect the access equipment and confirm it is suitable for the task',
      distractors: [
        'Use it without inspection if it was used yesterday',
        'Use it without inspection if it was delivered today',
        'Use it as long as it is the right colour for the site',
      ],
      explanation: 'Access equipment must be in safe condition and suitable for the task and load.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'You are working near occupied areas of a building. What is the rule?',
      correct: 'Segregate the work area and protect users from tools, dust and trailing leads',
      distractors: [
        'Continue without barriers because users will avoid the area',
        'Use tape only to indicate the boundary',
        'Trust users to look out for themselves',
      ],
      explanation:
        'Installers must consider the safety of others, not only their own team. Physical segregation is normally required.',
      standardRef: 'CDM Regulations 2015',
    },
    {
      question:
        'You need to use a chemical product such as a cleaner, lubricant or sealant. What is correct?',
      correct: 'Read the safety data sheet and apply the required controls',
      distractors: [
        'Use it as you would any other product',
        'Use it only if it smells acceptable',
        'Use it only if its label is the same colour as previous products',
      ],
      explanation:
        'Some products require gloves, ventilation, eye protection or special disposal. The safety data sheet (SDS) lists the controls.',
      standardRef: 'COSHH 2002',
    },
    {
      question: 'What should you know before starting work on a new site?',
      correct: 'The site first-aid arrangements and emergency procedure',
      distractors: [
        'Only the name of the site canteen',
        'Only the closest car park',
        'Only the supervisor mobile number',
      ],
      explanation:
        'Quick access to first aid matters when cuts, eye injuries or falls occur. The site induction should cover these arrangements.',
      standardRef: 'Health and Safety (First-Aid) Regulations 1981',
    },
    {
      question: 'Conditions on site no longer match the agreed method statement. What is correct?',
      correct: 'Stop work and escalate before continuing',
      distractors: [
        'Continue and adjust the method silently',
        'Continue if the supervisor is unavailable',
        'Continue if the change seems small',
      ],
      explanation:
        'A method statement only remains valid while the actual conditions match the plan. Significant changes require review.',
      standardRef: 'Management of H&S at Work Regulations 1999',
    },
    {
      question: 'What is the correct rule for using mobile phones on site?',
      correct: 'Follow site rules and avoid distraction during safety-critical tasks',
      distractors: [
        'Use phones freely at all times',
        'Use phones only during cable pulling',
        'Use phones only while climbing ladders',
      ],
      explanation:
        'Phone distraction is a recognised contributor to trips, falls and tool injuries. Site rules normally restrict use to specific areas.',
      standardRef: 'CDM Regulations 2015',
    },
    {
      question: 'When leaving the work area at the end of a task, what must be done?',
      correct: 'Clear tools, waste and temporary controls before leaving or handing over',
      distractors: [
        'Leave the area exactly as the work finished',
        'Leave tools in case they are needed tomorrow',
        'Leave waste for the cleaner to manage',
      ],
      explanation:
        'End-of-task housekeeping prevents hazards for other workers and building users coming into the area later.',
      standardRef: 'CDM Regulations 2015',
    },
  ],
  'Other Services': [
    {
      question:
        'Where the IT cable specification or application is unknown, what minimum separation should be kept from power cable?',
      correct: '200 mm',
      distractors: ['50 mm', '150 mm', '500 mm'],
      explanation:
        'Where the IT cable details are unknown, the guide uses 200 mm as the conservative minimum separation from power cable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Data cables run alongside screened power cables with no separation. What is the maximum shared run length?',
      correct: '35 m',
      distractors: ['40 m', '45 m', '50 m'],
      explanation: 'For this no-separation, screened-power scenario, the maximum length is 35 m.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Screened backbone cabling runs next to unscreened power cabling with no physical divider. What separation should be maintained?',
      correct: '50 mm',
      distractors: ['0 mm', '30 mm', '200 mm'],
      explanation:
        'For screened backbone next to unscreened power with no divider, 50 mm is the minimum separation used.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Where a network cable must cross a power cable, what is the correct angle?',
      correct: 'At right angles (90°)',
      distractors: [
        'Only where a metallic divider separates the cables',
        'Only where screened cables are used on both sides',
        'Only where an insulated divider separates the cables',
      ],
      explanation:
        'A right-angle crossing minimises the parallel exposure between cables and the resulting EMI.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'What minimum separation should be kept between metallic IT cable and fluorescent luminaires?',
      correct: '130 mm',
      distractors: ['30 mm', '50 mm', '100 mm'],
      explanation:
        'Fluorescent luminaires can be a significant EMI source. The guide uses 130 mm as the minimum separation.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Why must telecoms wiring and power cabling be separated?',
      correct: 'To prevent danger to persons from induced voltages, as well as to protect performance',
      distractors: [
        'Only to allow future telecoms expansion',
        'Only to provide maintenance workspace',
        'Only to make cable identification easier',
      ],
      explanation:
        'Separation protects both transmission performance and personal safety, because induced voltage on telecoms cable can become a shock hazard.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which two factors mainly drive the 50 mm EMI separation recommendation?',
      correct: 'Current in the power cable and physical distance from the telecoms cabling',
      distractors: [
        'Power cable length and telecoms cable length',
        'Current in the telecoms cable and distance from power',
        'Current in the power cable and distance from containment',
      ],
      explanation:
        'EMI coupling rises with the current in the power cable and falls with the distance from the telecoms cable. The 50 mm figure assumes typical conditions.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which of the following does NOT help reduce electrical interference on copper data cables?',
      correct: 'Installing unscreened twisted pair (UTP) cable',
      distractors: [
        'Installing screened twisted pair (S/FTP, F/FTP) cable',
        'Installing mechanically and electrically continuous metal conduit',
        'Increasing the physical separation between cables',
      ],
      explanation:
        'Screening, metallic containment and physical separation all reduce EMI. Plain UTP on its own is not an EMI control method.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Which HSE guidance covers safe work near underground services such as buried telecoms cable?',
      correct: 'HSG47',
      distractors: ['HSR25', 'GS38', 'HSG85'],
      explanation: 'HSG47 ("Avoiding danger from underground services") is the relevant HSE guidance.',
      standardRef: 'HSE HSG47',
    },
    {
      question:
        'Of the following, which legal requirement is normally NOT engaged by ordinary buried telecoms cable work near underground services?',
      correct: 'Work at Height Regulations 2005',
      distractors: [
        'Construction (Design and Management) Regulations 2007',
        'Pipelines Safety Regulations 1996',
        'Management of Health and Safety at Work Regulations 1999',
      ],
      explanation:
        'Work at Height applies only where falls are a risk (for example deep pits). Ordinary buried-service work primarily engages CDM, PSR and the management regulations.',
      standardRef: 'HSE HSG47',
    },
    {
      question: 'Before entering a cable chamber for duct installation work, what must be done?',
      correct: 'Test for explosive and noxious gases with a portable gas detector',
      distractors: [
        'Pitch a tent to keep weather out',
        'Remove all chamber lids and start work',
        'Wear waterproof clothing only',
      ],
      explanation:
        'Chambers can contain invisible hazardous gases. Pre-entry gas testing is required, often as part of a confined-space procedure.',
      standardRef: 'Confined Spaces Regulations 1997',
    },
    {
      question: 'Which of the following buried duct colours is NOT suitable for telecommunications ductwork?',
      correct: 'Yellow',
      distractors: ['White', 'Black', 'Grey'],
      explanation:
        'Yellow is associated with gas and is not used for telecoms ductwork. White, black and grey are typical telecoms duct colours.',
      standardRef: 'NJUG Guidelines',
    },
    {
      question:
        'Under BS EN 50174-3, what is the minimum recommended depth for telecoms cable below a footpath?',
      correct: '500 mm',
      distractors: ['250 mm – 450 mm', '450 mm – 600 mm', '600 mm'],
      explanation: 'Below a footpath, BS EN 50174-3 Table 3 sets a minimum depth of 500 mm.',
      standardRef: 'BS EN 50174-3 Table 3',
    },
    {
      question:
        'Which cable management system can act as an earthed screen and help reduce EMI on data cabling?',
      correct: 'Metallic trunking',
      distractors: ['Plastic conduit', 'Plastic trunking', 'Non-metallic basket'],
      explanation:
        'A correctly bonded metallic containment can act as a screen, reducing the EMI environment around the cabling.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Under BS EN 50174-3, what is the minimum recommended depth for telecoms cable below a road or carriageway?',
      correct: '600 mm',
      distractors: ['250 mm – 350 mm', '750 mm – 1200 mm', '750 mm'],
      explanation: 'Below a road or carriageway, BS EN 50174-3 Table 3 sets a minimum depth of 600 mm.',
      standardRef: 'BS EN 50174-3 Table 3',
    },
  ],
  'Waste Management': [
    {
      question: 'Is a site waste-management policy required on a construction site?',
      correct: 'Yes, and it must be followed',
      distractors: [
        'Yes, but it is advisory only',
        'No, but it is good practice',
        'No — it is the individual worker’s responsibility',
      ],
      explanation:
        'The site waste-management policy is mandatory and controls the disposal route for each waste stream.',
      standardRef: 'Environmental Protection Act 1990 / EPR 2016',
    },
    {
      question: 'How should empty cable boxes be disposed of on site?',
      correct: 'According to the company / site waste-management policy',
      distractors: [
        'Leave them for the cleaner to deal with',
        'Place them in any recycling skip available',
        'Place them in the general skip without checking',
      ],
      explanation:
        'Even where cardboard looks recyclable, the site policy determines the correct skip or collection route.',
      standardRef: 'Environmental Protection Act 1990',
    },
    {
      question: 'How should waste cable left on cable drums be disposed of?',
      correct: 'According to the company / site waste-management policy',
      distractors: [
        'Keep it for personal scrap value',
        'Put it in the general skip without checking',
        'Put it in any recycling skip without checking',
      ],
      explanation:
        'Waste cable may be recyclable or subject to a site-specific contract. The policy decides the disposal route.',
      standardRef: 'Environmental Protection Act 1990',
    },
    {
      question: 'A fibre sharps bin is full. How should it be disposed of?',
      correct: 'Sent away for specialist disposal',
      distractors: [
        'Emptied into the general skip',
        'Emptied into the recycling skip',
        'Sealed in a bag and put in a normal bin',
      ],
      explanation:
        'Fibre shards are a specialist waste stream. They must not be emptied into general or mixed recycling skips.',
      standardRef: 'Hazardous Waste Regulations 2005',
    },
    {
      question: 'How should empty wooden cable drums be dealt with?',
      correct: 'According to the company / site waste-management policy',
      distractors: [
        'Break them down before putting in any recycling skip',
        'Put them in the general site skip',
        'Sell them privately for personal gain',
      ],
      explanation:
        'Many sites return drums to the supplier for reuse, or use a defined disposal route. Do not improvise outside the policy.',
      standardRef: 'Waste (England and Wales) Regulations 2011',
    },
    {
      question: 'Cable offcuts contain copper conductors. Which statement applies?',
      correct: 'They are usually segregated for metal recycling under the site policy',
      distractors: [
        'They can go in the general skip if small',
        'They can be taken home as personal scrap',
        'They can be burned on site to recover copper',
      ],
      explanation:
        'Copper is a valuable, recoverable material. Site policy normally requires segregation into a metals stream, not the general skip.',
      standardRef: 'Waste (England and Wales) Regulations 2011',
    },
    {
      question: 'You find unlabelled waste containers in the work area. What is the correct action?',
      correct: 'Do not add waste to them — report and label them according to site procedure',
      distractors: [
        'Use them for any waste because they are empty',
        'Use them for mixed waste so they are not wasted',
        'Move them to another location so they are out of the way',
      ],
      explanation:
        'Unlabelled containers can lead to cross-contamination between waste streams and to incorrect disposal. They must be identified before use.',
      standardRef: 'Environmental Protection (Duty of Care) Regulations 1991',
    },
    {
      question: 'Solvent-based cleaner has been used on site. How is the empty container handled?',
      correct: 'As hazardous waste, following the site procedure for chemical containers',
      distractors: [
        'Place it in the general skip once it is empty',
        'Rinse it and put it in the recycling skip',
        'Take it home for personal use',
      ],
      explanation:
        'Containers that held solvents or other chemicals are normally classified as hazardous waste, even when "empty".',
      standardRef: 'Hazardous Waste Regulations 2005',
    },
    {
      question:
        'A small amount of cable offcuts falls into the ceiling void during installation. What is correct?',
      correct: 'Retrieve the offcuts and dispose of them through the waste route',
      distractors: [
        'Leave them — they are out of sight',
        'Push them further into the void to hide them',
        'Sweep them through to the next room',
      ],
      explanation:
        'Offcuts left in voids increase fire load and can be mistaken later for installed cable. They must be retrieved and disposed of properly.',
      standardRef: 'Environmental Protection Act 1990 / Fire Strategy',
    },
    {
      question: 'What is the principle behind the waste hierarchy used on site?',
      correct: 'Prevent, prepare for reuse, recycle, recover, then dispose as a last resort',
      distractors: [
        'Dispose first to keep the area clear',
        'Recycle everything regardless of contamination',
        'Recover energy before any other option',
      ],
      explanation:
        'The waste hierarchy directs sites to prevent waste first and treat disposal as the last option. It applies to packaging, offcuts and damaged stock.',
      standardRef: 'Waste (England and Wales) Regulations 2011',
    },
    {
      question:
        'A reel of cable is damaged but not yet opened. What is the best first step under the waste hierarchy?',
      correct: 'Check whether the supplier will accept it back for reuse or repair',
      distractors: [
        'Put it straight into the general skip',
        'Cut the cable up to fit it into the bin',
        'Sell it on personally to recover cost',
      ],
      explanation:
        'Reuse sits above recycling in the waste hierarchy. Returning damaged stock prevents waste in the first place.',
      standardRef: 'Waste (England and Wales) Regulations 2011',
    },
    {
      question: 'What information is normally required on a waste transfer note?',
      correct: 'Waste description, quantity, parties involved and EWC code where relevant',
      distractors: [
        'Only the driver’s name',
        'Only the customer’s purchase order',
        'Only the disposal site postcode',
      ],
      explanation:
        'A waste transfer note records the duty-of-care trail for waste leaving a site. Standard fields include description, quantity and the parties.',
      standardRef: 'Environmental Protection (Duty of Care) Regulations 1991',
    },
    {
      question: 'Where are WEEE rules relevant on a cabling site?',
      correct:
        'When removing or disposing of electrical and electronic equipment such as switches or active hardware',
      distractors: [
        'Whenever any packaging is thrown away',
        'Whenever any wooden drum is disposed of',
        'Whenever any cardboard is disposed of',
      ],
      explanation:
        'The WEEE Regulations cover waste electrical and electronic equipment, including active network hardware being removed during a refit.',
      standardRef: 'WEEE Regulations 2013',
    },
    {
      question: 'A spill of cleaning solvent occurs on a hard floor. What is the correct first action?',
      correct:
        'Contain the spill, follow the site procedure and treat the absorbent material as hazardous waste',
      distractors: [
        'Wash it down the nearest drain',
        'Sweep it into the general skip',
        'Cover it with cardboard and continue work',
      ],
      explanation:
        'Solvent spills require containment and proper disposal of the contaminated absorbent. Discharge to drains is normally prohibited and can be a criminal offence.',
      standardRef: 'COSHH 2002 / Environmental Protection Act 1990',
    },
    {
      question:
        'A reel of cable is left over at the end of a job but is still in good condition. What is the preferred outcome under the waste hierarchy?',
      correct: 'Return it to stock for reuse on a future job',
      distractors: [
        'Dispose of it in the general skip to clear the van',
        'Cut it up and bag it as small offcuts',
        'Keep it personally and decide later',
      ],
      explanation:
        'Reusing usable stock is the preferred outcome. Disposal of usable material is wasteful and may breach duty-of-care expectations.',
      standardRef: 'Waste (England and Wales) Regulations 2011',
    },
  ],
};

function answerLetterForId(id: string): AnswerChoice {
  // FNV-1a 32-bit hash → deterministic letter per question ID (not position).
  let hash = 0x811c9dc5;
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return answerChoices[Math.abs(hash) % answerChoices.length];
}

function buildChoices(
  correctAnswer: AnswerChoice,
  correct: string,
  distractors: [string, string, string],
): Record<AnswerChoice, string> {
  const wrongAnswers = [...distractors];
  const choices = {} as Record<AnswerChoice, string>;

  answerChoices.forEach((choice) => {
    if (choice === correctAnswer) {
      choices[choice] = correct;
    } else {
      const next = wrongAnswers.shift();
      choices[choice] = next ?? '';
    }
  });

  return choices;
}

function toQuestion(section: QuestionSection, spec: Spec, index: number): Question {
  const sectionNumber = sectionOrder.indexOf(section) + 1;
  const id = `nia-${sectionNumber.toString().padStart(2, '0')}-${(index + 1).toString().padStart(3, '0')}`;
  const correctAnswer = answerLetterForId(id);
  const choices = buildChoices(correctAnswer, spec.correct, spec.distractors);

  return {
    id,
    section,
    question: spec.question,
    choices,
    correctAnswer,
    explanation: spec.explanation,
    standardRef: spec.standardRef,
  };
}

export const questions: Question[] = sectionOrder.flatMap((section) =>
  sectionSpecs[section].map((spec, index) => toQuestion(section, spec, index)),
);
