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
        'For a standard data cable run inside a building, what is the minimum EuroClass reaction-to-fire rating the cable must meet?',
      correct: 'Cca-s1b,d2,a2',
      distractors: ['Dca-s1b,d2,a2', 'Eca-s1b,d2,a2', 'Fca-s1b,d2,a2'],
      explanation:
        'Indoor telecommunication cable must meet at least Cca-s1b,d2,a2 under the CPR/EuroClass system. The main class (Cca) describes flame spread; the s, d and a sub-ratings describe smoke, flaming droplets and acidity.',
      standardRef: 'CPR / EuroClass',
    },
    {
      question:
        'Looking only at the smoke rating in these EuroClass codes, which cable would give off the least smoke in a fire?',
      correct: 'B2ca s1a d1 a1',
      distractors: ['Eca', 'Cca s1b d2 a2', 'Dca s2 d2 a2'],
      explanation:
        "The 's' digit indicates smoke production: s1a is the least, then s1b, s1, s2 and s3 the most. B2ca s1a d1 a1 has the lowest smoke rating shown.",
      standardRef: 'CPR / EuroClass',
    },
    {
      question: 'Three of the cables below are communications cables. Which one is really a power cable?',
      correct: '3 core 13 amp 230 volt mains cable',
      distractors: ['Cat 5e 4 pair data cable', '1308 3 pair telephone cable', '2 pair intruder alarm cable'],
      explanation:
        'Data, telephone and intruder-alarm cables are communications cables. A 230 V mains lead is a power cable, not a telecommunication cable. Selecting the wrong cable can be costly to the installer.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'A cable will run on the outside of a building, exposed to sun and weather, with no duct or conduit. What must the chosen cable provide?',
      correct: 'Installation cables shall be UV resistant with weather resistant, protective outer sheaths',
      distractors: [
        'Installation cables shall be white cables',
        'Installation cables shall be a minimum of Cat 5e and S/FTP',
        'Installation cables shall be a minimum of Cat 6 and F/FTP',
      ],
      explanation:
        "Exposed external cables need extra protection from sunlight and weather, so the outer sheath is treated to resist UV and wear. The cable specification is the designer's responsibility.",
      standardRef: 'BS EN 50174-3',
    },
    {
      question: 'What is the maximum length allowed for a Class Ea permanent link?',
      correct: '90 metres',
      distractors: ['55 metres', '100 metres', '1000 metres'],
      explanation:
        "The Class Ea permanent link (the fixed installed cable) is limited to 90 m so the standard's performance can be guaranteed.",
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'Including a patch cord at each end, what is the maximum length of a Class Ea channel?',
      correct: '100 metres',
      distractors: ['55 metres', '90 metres', '1000 metres'],
      explanation:
        'The Class Ea channel is the 90 m permanent link plus a patch cord at each end (often called 90+10), giving a 100 m maximum.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'If the patch cords on a Class Ea channel are longer than 20 metres, the maximum channel length drops to:',
      correct: '95 metres',
      distractors: ['80 metres', '90 metres', '100 metres'],
      explanation:
        'Long patch cords behave electrically differently to the permanent cable, so where patch cords exceed 20 m the channel is shortened to 95 m to keep performance.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'For a cabinet, frame or rack of 21 U or fewer, what is the smallest bonding-conductor cross-section allowed?',
      correct: '4 mm²',
      distractors: ['2.5 mm²', '10 mm²', '16 mm²'],
      explanation:
        'Per HD 60364-5-54, a rack of 21 U or fewer uses a bonding conductor of at least 4 mm². Incorrectly sized earth conductors are a safety issue.',
      standardRef: 'HD 60364-5-54',
    },
    {
      question:
        'For a cabinet, frame or rack larger than 21 U, what is the smallest bonding-conductor cross-section allowed?',
      correct: '16 mm²',
      distractors: ['2.5 mm²', '4 mm²', '10 mm²'],
      explanation:
        'Per HD 60364-5-54, a rack larger than 21 U uses a bonding conductor of at least 16 mm². Incorrectly sized earth conductors are a safety issue.',
      standardRef: 'HD 60364-5-54',
    },
    {
      question: 'What size earth bond does a wall-mounted 12 U communication cabinet with a glass door need?',
      correct: 'Minimum cross-sectional area of 4 mm²',
      distractors: [
        'It does not need one',
        'Minimum cross-sectional area of 2.5 mm²',
        'Minimum cross-sectional area of 10 mm²',
      ],
      explanation:
        'A 12 U cabinet (≤ 21 U) requires a bonding conductor of at least 4 mm². Always check the requirement before installing.',
      standardRef: 'HD 60364-5-54',
    },
    {
      question: 'Which Ethernet standard from the list will Cat 5e cable carry?',
      correct: '100baseT',
      distractors: ['100baseSX', '10base2', '10base5'],
      explanation:
        'Cat 5e supports 100baseT (and up to 1000baseT). The 10base2/10base5 standards are legacy coaxial Ethernet, and 100baseSX is a fibre standard.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'You need a 10 Gbps link that runs 500 metres. Which cable type is suitable?',
      correct: 'Fibre optic cable',
      distractors: ['Co-ax cable', 'Cat 6A cable', 'Cat 7 cable'],
      explanation:
        'Cat 6A and Cat 7 can carry 10 Gbps but not over 500 m, so a fibre optic link must be used for that distance.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'A 10 Gbps link has to reach 2000 metres. Which cable type should be used?',
      correct: 'Single-mode fibre optic cable',
      distractors: ['Multi-mode fibre optic cable OM2', 'Multi-mode fibre optic cable OM4', 'Co-ax cable'],
      explanation:
        'OM4 multi-mode can carry 10 Gbps but not to 2000 m, so a single-mode fibre link is required for that distance.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'Three of these are real fibre core/cladding sizes. Which one does not exist?',
      correct: '100/125',
      distractors: ['9/125', '50/125', '62.5/125'],
      explanation:
        '9/125 is single-mode; 50/125 and 62.5/125 are multi-mode. 100/125 is not an available core/cladding size.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'In construction, the abbreviation CPR stands for what?',
      correct: 'Construction Products Regulations',
      distractors: [
        'Cable Product Regulations',
        'Construction Product Requirements',
        'Construction Protection Regulations',
      ],
      explanation:
        'The Construction Products Regulations provide a common technical language to assess the performance of construction products, including data cabling.',
      standardRef: 'Construction Products Regulations',
    },
    {
      question: 'What is meant by the abbreviation DoP?',
      correct: 'Declaration of Performance',
      distractors: ['Declaration of Product', 'Details of Performance', 'Declaration of Personnel'],
      explanation:
        "The Declaration of Performance describes a product's characteristics in relation to its fire resistance.",
      standardRef: 'Construction Products Regulations',
    },
    {
      question: 'When a product carries CE marking, what does that mark confirm?',
      correct: 'Meet EU safety, health or environmental requirements',
      distractors: [
        'Meet worldwide requirements',
        'Were made in the European Union',
        'Meet EU performance requirements',
      ],
      explanation:
        'CE marking indicates conformity with health, safety and environmental protection standards for products sold within the European Economic Area.',
      standardRef: 'CE marking / CPR',
    },
  ],
  'Containment Systems': [
    {
      question:
        'What is the smallest installed bend radius BS EN 50174-2 allows for 4-pair balanced (twisted-pair) cable?',
      correct: 'Eight times the cable diameter',
      distractors: [
        'Four times the cable diameter',
        'Ten times the cable diameter',
        'Twelve times the cable diameter',
      ],
      explanation:
        'For 4-pair balanced cabling the standard sets the installed minimum bend radius at eight times the cable diameter. Tighter bends degrade crosstalk and return-loss performance.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'For optical fibre and coaxial cable, what minimum installed bend radius does BS EN 50174-2 set?',
      correct: 'Ten times the cable diameter',
      distractors: [
        'Four times the cable diameter',
        'Eight times the cable diameter',
        'Twelve times the cable diameter',
      ],
      explanation:
        'Optical fibre and coaxial cables use ten times the cable diameter as the installed minimum bend radius. Manufacturer figures may allow tighter short-term pulling, but the installed cable must meet the standard.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Equipment for a 19-inch rack is measured in U (or RU). How tall is one rack unit?',
      correct: '44.45 mm (1.75 inches)',
      distractors: ['50 mm (2 inches)', '30 mm (1 inch)', '25 mm (1 inch)'],
      explanation:
        'One rack unit (1U) is 44.45 mm, i.e. 1.75 inches. Rack equipment is sized in whole units (1U, 2U, 4U, etc.).',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Under BS EN 50174-2, which statement best describes a cable management system?',
      correct:
        'It includes ducts and tubes housing, or intended to house, blown IT cables and/or cable elements',
      distractors: [
        'It does not include ducts and tubes',
        'It does not include tubes for blown IT cables or cable elements',
        'It means the boxes or drums the cables are delivered in',
      ],
      explanation:
        'A cable management system is anything designed to contain or support cabling along its route, including ducts and tubes used for blown fibre or copper. Delivery packaging is not part of it.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What does BS EN 50174-2 say about using the grid of a suspended ceiling to carry a pathway?',
      correct: 'It shall not be used as support for pathway systems',
      distractors: [
        'It may be used as support for multiple cables',
        'It may be used to support devices within the suspended ceiling',
        'It may be used as support for pathway systems',
      ],
      explanation:
        'It is not good practice to loose-lay cables or fix pathways to suspended ceiling grids. Containment must be permanently affixed to the fabric of the building.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Joints between sections of metallic containment should be bonded in line with which standard?',
      correct: 'BS EN 50174-2',
      distractors: ['ISO 11801', 'BS EN 57921', 'BS EN 50173'],
      explanation:
        'Continuity bonding between sections of metallic containment is carried out in accordance with BS EN 50174-2 to ensure technical conformance of the installation.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'What working clearance does BS EN 50174 require on the faces of cabinets, frames and racks where access is needed?',
      correct: 'A minimum clearance of 1.2 m on all faces where access is required',
      distractors: [
        'A minimum clearance of 1 m on all faces where access is required',
        'A minimum clearance of 1.2 m on all faces',
        'A minimum clearance of 2 m on all faces where access is required',
      ],
      explanation:
        'The standard sets a minimum 1.2 m clearance on the faces of cabinets, frames and racks where access is required, so equipment can be worked on safely.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'In which location does BS EN 50174 say cabinets, frames and racks must NOT be sited?',
      correct: 'In toilet facilities',
      distractors: ['Outside', 'On a roof', 'In a basement'],
      explanation:
        'The standard prohibits siting cabinets, frames and racks in toilet or washroom facilities, which are damp and unsuitable environments for equipment.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How far off the fixing surface should tray-work pathways sit under BS EN 50174?',
      correct: 'At least 25 mm from the fixing surface',
      distractors: [
        'Fixed flush to the fixing surface',
        'At least 50 mm from the fixing surface',
        'With no clearance from the fixing surface',
      ],
      explanation:
        'Tray-work should stand at least 25 mm off the fixing surface, allowing access and air circulation around the cables.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'On a bent conduit run, how often does BS EN 50174 want draw-box access points?',
      correct: 'At intervals no greater than 12 m, to allow draw-boxes',
      distractors: [
        'At intervals no greater than 90 m, to allow draw-boxes',
        'At intervals greater than 12 m, to allow draw-boxes',
        'At intervals greater than 20 m, to allow draw-boxes',
      ],
      explanation:
        'Access (draw) points are needed at least every 12 m on bent conduit runs so cables can be drawn in without excessive tension or damage.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        "With no maker's figure available, what is the widest spacing BS EN 50174 allows between non-continuous supports (basket, ladder or hooks)?",
      correct: '1500 mm',
      distractors: ['500 mm', '1000 mm', '2000 mm'],
      explanation:
        'Where the maker gives no figure, non-continuous supports such as basket, ladder or hooks should be no more than 1500 mm apart to control sag and load.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        "With no maker's figure available, what is the maximum cable stacking height BS EN 50174 allows on continuous supports such as trays?",
      correct: '150 mm',
      distractors: ['50 mm', '100 mm', '500 mm'],
      explanation:
        'On continuous supports such as trays, cable stacking height is limited to 150 mm to avoid crushing lower cables and to manage heat build-up.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'Cable management should be chosen against the MICE environmental classification taken from which standard?',
      correct: 'BS EN 50173',
      distractors: ['BS 50310', 'BS 6701', 'BS EN 50174'],
      explanation:
        'Cable management is selected against the MICE environmental classification defined in BS EN 50173, matching the system to the conditions it will face.',
      standardRef: 'BS EN 50173',
    },
    {
      question: 'How many 90° bends does BS EN 50174 allow in a conduit between pulling points?',
      correct: 'No more than two',
      distractors: ['No more than one', 'No more than three', 'No more than four'],
      explanation:
        'Too many bends between pull points makes it impossible to draw cable in safely, so the limit is two 90° bends between pulling points.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'What is the most cumulative change of direction BS EN 50174 permits in a conduit between pulling points?',
      correct: '180°',
      distractors: ['90°', '270°', '360°'],
      explanation:
        'The total (cumulative) change of direction between pull points must not exceed 180°, otherwise cables can snag, stretch or be damaged when drawn in.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the largest number of cables BS EN 50174 allows in a single balanced-data bundle?',
      correct: '24 cables',
      distractors: ['19 cables', '48 cables', '100 cables'],
      explanation:
        'Oversized bundles trap heat and increase interference between cables, so bundle size is limited to 24 cables.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How does BS EN 50174 say cables should be installed in a vertical pathway such as a riser?',
      correct: 'Lowered rather than pulled upwards',
      distractors: [
        'Pushed upwards in bundles',
        'Pulled upwards rather than lowered',
        'Pulled upwards in bundles',
      ],
      explanation:
        'Lowering cables down a riser puts far less strain on them than pulling them up, reducing the risk of stretching or damage.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What do the letters in M.I.C.E stand for in BS EN 50173?',
      correct: 'Mechanical, Ingress, Climatic/Chemical, Electromagnetic',
      distractors: [
        'Material, Insulation, Colour, Effect',
        'Measure, Insure, Cut, Erect',
        'Mechanical, Insulation, Cable, Earth',
      ],
      explanation:
        'MICE classifies the environment by Mechanical, Ingress (dust/water), Climatic/Chemical and Electromagnetic conditions, guiding the choice of cabling and containment.',
      standardRef: 'BS EN 50173',
    },
    {
      question: 'Under BS EN 50174, what must the installer make sure of when selecting a pathway?',
      correct: 'That it is able to support the mass of the cables to be installed',
      distractors: [
        'That it is the correct colour for the cables',
        'That it is only for the cables installed today',
        'That it is 100% bigger than the cables need',
      ],
      explanation:
        'Pathways must be chosen to carry the weight of the cables they will hold; under-rated containment can fail and fall from the surface.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How strong must the fixings and supports for a pathway be under BS EN 50174?',
      correct: 'Able to carry twice the combined mass of the pathway and its cables',
      distractors: [
        'Able to carry only the cables to be installed today',
        'Able to carry only the mass of the pathway system',
        'Able to carry just the combined mass of the pathway and its cables',
      ],
      explanation:
        'Fixings must carry twice the combined weight of the pathway plus its cables, giving a safety margin for future additions and dynamic loads.',
      standardRef: 'BS EN 50174-2',
    },
  ],
  'Cable Laying': [
    {
      question: 'Which fibre type has a core and cladding of 50/125 micrometres (µm)?',
      correct: 'OM3',
      distractors: ['OM1', 'OS2', 'OS1'],
      explanation:
        'OM3 multi-mode has a 50/125 core/cladding. OS1 and OS2 are 9/125 single-mode, and OM1 is 62.5/125.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'Which copper category is rated for up to 10000 Mbps (10 Gbps)?',
      correct: 'Cat6a',
      distractors: ['Cat5e', 'Cat6', 'Cat7'],
      explanation:
        'Cat6a is specified for 10 Gbps over the full 100 m. If unsure which cable to install, speak to the designer.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'Which cable would you use for multi-pair (multicore) telephone connections?',
      correct: 'CW1308B',
      distractors: ['Cat5e', 'Cat6a', 'Cat8'],
      explanation: 'CW1308 is the traditional multi-pair telephone cable used for voice/multicore telephony.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'A fibre cable has a yellow jacket. Which fibre type does that colour usually indicate?',
      correct: 'Single-mode',
      distractors: ['Multi-mode', 'OM1', 'Cat6a'],
      explanation:
        'Typical jacket colours: orange OM2, aqua OM4, lime green OM5 and yellow single-mode. Always confirm by reading the print on the jacket, as colours can vary by client request.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'An RJ45 plug terminates which kind of cable?',
      correct: 'Copper',
      distractors: ['Fibre', 'OS1', 'Multi-mode'],
      explanation:
        'An RJ45 (Registered Jack 45, also called 8P8C) terminates copper twisted-pair data cable.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'For Cat 6 cable, which bend-radius figure is the lower one that the finished installation must meet?',
      correct: 'The minimum bend radius installed',
      distractors: [
        'The minimum bend radius during installation',
        'The minimum bend radius during termination',
        'The minimum bend radius during testing',
      ],
      explanation:
        'Standards state the minimum bend radius for the installed cable. You may exceed it briefly during installation/termination, but the final installed cable must comply or it will fail testing.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        "As a general rule, a fibre cable's minimum bend radius is at least how many times its outer diameter (OD)?",
      correct: '10 times',
      distractors: ['2 times', '8 times', '12 times'],
      explanation:
        'For fibre, the installed minimum bend radius is generally 10× the outer diameter. Exceeding it degrades performance and shows up on modern test equipment.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'To keep Cat6a performance, the minimum bend radius for UTP and shielded cable is how many times the outer diameter (OD)?',
      correct: '4 times',
      distractors: ['2 times', '6 times', '10 times'],
      explanation:
        'Cat6a UTP and shielded cable use a minimum installed bend radius of 4× the outside diameter to maintain performance.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which of these cables has a noticeably larger minimum bend radius?',
      correct: 'Cat6a',
      distractors: ['Cat 5', 'Cat 5e', 'Cat 6'],
      explanation:
        'Cat6a is a larger, stiffer cable than Cat 5/5e/6, so it has a significantly larger minimum bend radius.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question:
        'What conduit fill percentage does BS EN 50174 recommend so there is room for bend radius and future growth?',
      correct: '40%',
      distractors: ['25%', '60%', '100%'],
      explanation:
        'A 40% fill ratio leaves room for bend radius and future cables. Because of gaps between cables, 40% looks surprisingly full in practice.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which statement about pathways and containment is correct?',
      correct:
        'The pathway must have smooth surfaces, free of burrs, sharp edges, projections and pressure points that can damage cable insulation',
      distractors: [
        'Only rolled-edge tray should be used for copper cables',
        'You should always take the most direct route',
        'There is no need to bond/earth metallic containment',
      ],
      explanation:
        'Badly installed containment is the most likely cause of cable damage during installation, so pathways must be smooth and free of anything that could damage the cable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: "When choosing a cable type or category, what should be the installer's main concern?",
      correct: 'Bandwidth',
      distractors: ['Cost', 'Ease of install', 'What is already installed'],
      explanation:
        "A designer weighs many factors, but the installer's primary driver is providing the required service (bandwidth).",
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'Network connectivity is decided by which of the following?',
      correct: 'All factors',
      distractors: ['Standards compliance', 'Budget', 'Client preference'],
      explanation:
        'The installer is given the network specification, but the designer arrives at it by considering all of these factors.',
      standardRef: 'BS EN 50173-1',
    },
    {
      question: 'What health and safety risk is most associated with working on fibre optic cable?',
      correct: 'Eye damage',
      distractors: ['Electrocution', 'Crush injury', 'Back injury'],
      explanation:
        'Glass shards and invisible transmission light can both cause irreparable eye damage, so eye protection and care are essential when working with fibre.',
      standardRef: 'Health & safety guidance',
    },
    {
      question: 'What should cables be permanently fixed to?',
      correct: 'The building structure',
      distractors: [
        'The false ceiling grid',
        'Loose laid within the ceiling void',
        'The ceiling support wires',
      ],
      explanation:
        'BS 7671 and BS 6701 require cables to be permanently affixed to the fabric of the building to prevent premature collapse in a fire.',
      standardRef: 'BS 6701 / BS 7671',
    },
    {
      question:
        'When terminating Cat 6 at jacks and patch panels, how much untwist is the most that should be allowed?',
      correct: '6 mm',
      distractors: ['12 mm', '13 mm', '15 mm'],
      explanation:
        'Twist rates are carefully calculated for performance. For Cat 6, untwist should be no more than 6 mm at terminations.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How much slack cable is recommended inside the cabinet?',
      correct: '6 m',
      distractors: ['As much as is practicable', '4 m', '10 m'],
      explanation:
        'Leaving around 6 m of slack allows for re-termination or panel moves without leaving an unmanageable amount of excess cable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the maximum recommended pulling tension for a 24 AWG cable?',
      correct: '110 N (25 lbf)',
      distractors: ['100 N (22.5 lbf)', '120 N (26.9 lbf)', '125 N (28 lbf)'],
      explanation:
        'Excessive pulling tension stretches or deforms the copper and plastic. For 24 AWG cable the maximum recommended tension is 110 N (25 lbf).',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Why are hook and loop ties preferred over plastic ties?',
      correct: 'They are safer for users and create fewer pressure points',
      distractors: ['They are cheaper', 'They come in different colours', 'They are easier to install'],
      explanation:
        'Hook and loop ties adjust easily, create less pressure on cables, need no trimming and leave no sharp burrs.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Pulling copper data cable too hard mainly causes which problem?',
      correct: "It changes the cable's electrical characteristics",
      distractors: [
        "It changes the cable's category",
        "It changes the cable's weight",
        "It changes the cable's colour",
      ],
      explanation:
        'Over-tensioning stretches and deforms the cable, changing its electrical characteristics and leading to failed test results.',
      standardRef: 'BS EN 50174-2',
    },
  ],
  'Cable Dressing': [
    {
      question: 'Is there a fixed industry standard for how much slack to leave on installed cable?',
      correct: 'There are guidelines only',
      distractors: [
        'Yes, as per electrical industry standard',
        'Yes, as per data industry standard',
        'Yes, as per Telecommunications standard',
      ],
      explanation:
        'No specific standard dictates the amount of slack; it is best practice to leave enough for re-termination or minor moves.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Why are cables labelled?',
      correct: 'To identify the individual cable',
      distractors: ['To identify the wire map', 'To identify the length', 'To identify the cost of cable'],
      explanation:
        'With thousands of identical-looking cables, labelling while pulling them in is the only reliable way to identify each individual cable later.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the best way to secure Cat6a cabling on a horizontal cable tray?',
      correct: 'Hook and loop fastenings',
      distractors: ['Cable ties', 'Metal cable ties', 'Nothing'],
      explanation:
        'Hook and loop is most suitable: it adjusts easily, puts less pressure on cables and presents less injury risk than nylon or metal ties.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'On a vertical riser, what is the furthest apart metal cable ties should be?',
      correct: 'Every 2 m',
      distractors: ['Every 300 mm', 'Every 1 m', 'Every 3 m'],
      explanation:
        'Cables in vertical risers are secured more regularly than on horizontal runs to reduce strain; metal ties should be no more than 2 m apart.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How tightly should plastic (nylon) cable ties be done up?',
      correct: 'Mild tension, enough to hold but not to deform the cables',
      distractors: [
        'Tight enough that the cable jacket is squeezed',
        'Tight, using pliers for extra force',
        'Loose, leaving cables space to move',
      ],
      explanation:
        'Over-tightened nylon ties damage cables and harm performance. Apply only mild tension, enough to hold the bundle without deforming it.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Where might pinch points be found on an installation?',
      correct: 'On any part of an installation',
      distractors: [
        'Only in cable tray installations',
        'Only in cable ducting installations',
        'Only during termination',
      ],
      explanation:
        'Pinch points occur anywhere two surfaces meet or there is a gap that a cable is drawn through, so they can arise on any part of an installation.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Regarding cable labels, which of these statements is correct?',
      correct: 'All of these statements',
      distractors: [
        'The labels need to match at each end of the cable',
        'The labels can be a number, letter or both',
        'Labels can give building/floor/comms details',
      ],
      explanation:
        'Labelling supports easy working, testing, repairs and additions. Labels should match at both ends, can use numbers/letters, and can carry building/floor/comms detail.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What should you write temporary cable labels with during installation?',
      correct: 'A permanent marker',
      distractors: ['A pencil', 'A biro', 'The same colour'],
      explanation:
        'A fine-point permanent marker is used so the information does not rub off as the cable is handled and pulled through the building.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Once the installation is finished, how should cables be permanently identified?',
      correct: 'With durably affixed, readable labels resistant to environmental conditions',
      distractors: [
        'With a handwritten reference in biro on the cable',
        'With a handwritten reference on electrical tape',
        'Left to be completed by the customer',
      ],
      explanation:
        'Permanent identification uses durable, readable labels that resist the environment, so the installation can be tested, repaired or extended in an organised way.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which of these applies to cable labels?',
      correct: 'All of these statements',
      distractors: [
        'Labels should be affixed to the cable sheath',
        'Labels should contain a unique reference',
        'Labels should be affixed to termination points',
      ],
      explanation:
        'Labels should be on the sheath and at termination points and carry a unique reference — all of these apply.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Who decides the style and format of the cable labels?',
      correct: 'The customer, as specified in the contract',
      distractors: [
        'Anyone — they can duplicate existing schemes',
        'The cable manufacturer',
        'Whoever owns the labelling machine',
      ],
      explanation:
        'The installer may suggest a sensible scheme, but the labelling style is ultimately specified by the customer in the contract.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the largest bundle size allowed for copper data cables?',
      correct: '24',
      distractors: ['50', '72', '100'],
      explanation:
        'Oversized bundles cause excess heat and interference, so copper data cable bundles are limited to 24.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the main reason to use cable socking?',
      correct: 'To give a neat presentation',
      distractors: [
        'To protect from heat',
        'To protect against EMI',
        'To support the cables along their entire length',
      ],
      explanation:
        'Nylon cable socks, used correctly, make an installation look neater and more manageable; used badly they hinder changes and trap heat.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When socking cables in a cabinet, what should you bear in mind?',
      correct: 'All of these statements',
      distractors: [
        'Patch panels can be relocated',
        'Cable IDs can be seen',
        'Cables from different panels are sleeved separately',
      ],
      explanation:
        'All apply: allow for panel relocation, keep IDs visible, and sleeve cables from different panels separately.',
      standardRef: 'BS EN 50174-2',
    },
  ],
  'Fire Regulations': [
    {
      question: "An IT cable's reaction to fire is governed by which set of statutory regulations?",
      correct: 'The Construction Products Regulations 2013',
      distractors: [
        'The Regulatory Reform (Fire Safety) Order 2005',
        'The Electricity at Work Regulations 1989',
        'The Building Regulations 2010',
      ],
      explanation:
        'The Construction Products Regulations classify cables for flame spread, heat, smoke, droplets and acidity, which tells you where they may be installed.',
      standardRef: 'Construction Products Regulations 2013',
    },
    {
      question: "In the context of an IT cable's fire performance, what does the term CPR mean?",
      correct: 'Construction Products Regulations',
      distractors: ['Cable Products Regulations', 'Cable Products Rules', 'Construction Products Rules'],
      explanation:
        'CPR stands for the Construction Products Regulations, which provide a common technical language to assess product performance including data cabling.',
      standardRef: 'Construction Products Regulations',
    },
    {
      question: 'New internal data cabling in a building must reach which minimum CPR EuroClass?',
      correct: 'Cca-s1b,d2,a2',
      distractors: ['Dca-s1b,d2,a2', 'Fca', 'Aca'],
      explanation:
        'CPR rates cables for flame spread, heat, smoke, droplets and acidity. New internal data cabling must meet at least Cca-s1b,d2,a2.',
      standardRef: 'CPR / EuroClass',
    },
    {
      question: 'Where is the manufacturer required to show the CPR EuroClass for a data cable?',
      correct: 'On the CE marked label on the cable reel',
      distractors: [
        "On the manufacturer's website",
        "On the manufacturer's data sheet",
        'On the cable itself',
      ],
      explanation:
        'The manufacturer may also show it on the website, data sheet or cable, but it MUST be on the CE marked label on the packaging (reel, drum or box).',
      standardRef: 'Construction Products Regulations',
    },
    {
      question:
        'Which of these is NOT an acceptable way to reduce separation between unscreened metallic IT cables and power cables where they pass through a fire barrier?',
      correct: 'Enclosing the cables in a plastic conduit through the structure',
      distractors: [
        'Enclosing the cables in separate metal conduit',
        'Enclosing the cables in separate metal trunking',
        'Enclosing the cables in separate metal ducts',
      ],
      explanation:
        'Correctly installed metallic containment screens data cables; plastic containment does not, so a plastic conduit is not a satisfactory method.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'After running an extra cable through a fire-rated wall, when should the fire seal that was removed be put back?',
      correct: 'As soon as practicable',
      distractors: [
        'At the end of the working day',
        'When the system has been fully commissioned',
        'On completion of the work',
      ],
      explanation:
        'A penetrated fire barrier raises fire-spread risk to an unacceptable level, so the seal must be reinstated as soon as practicable.',
      standardRef: 'BS 9999 / BS 476',
    },
    {
      question:
        'When planning a cable route in a new building, what should apply to openings made in fire-separating structures?',
      correct: 'All of these statements',
      distractors: [
        'Openings should be as few as possible',
        'Openings should be as small as possible',
        'Openings should be fire stopped',
      ],
      explanation:
        'Penetrations through fire barriers are inevitable, so openings should be as few and as small as possible and properly fire stopped — all apply.',
      standardRef: 'BS 9999',
    },
    {
      question: 'Which of these materials is NOT suitable for sealing openings in a fire-separating wall?',
      correct: 'Multi-purpose filler',
      distractors: ['Cement mortar', 'Mineral fibre', 'Gypsum based plaster'],
      explanation:
        'Not all materials are suitable for fire-rated barriers; multi-purpose filler is not. When in doubt, seek advice.',
      standardRef: 'BS 476 / fire-stopping guidance',
    },
    {
      question: 'How do intumescent fire-stopping materials work?',
      correct: 'They expand when subject to heat',
      distractors: [
        'They shrink when subject to heat',
        'They expand when subject to gas and smoke',
        'They prevent the transmission of sound',
      ],
      explanation:
        'Fire-stopping can be intumescent, endothermic or ablative. Intumescent materials expand when subject to heat to seal the opening.',
      standardRef: 'Fire-stopping guidance',
    },
    {
      question:
        'You find an unsealed hole in a fire-rated wall that has not been fire stopped. What should you do?',
      correct: 'Report it',
      distractors: [
        'Ignore it',
        'Find some fire stop material and fill the gap yourself',
        "Use decorator's sealant to fill the gap",
      ],
      explanation:
        'Fire stopping must be installed and checked by a qualified, certified person, so an unsealed hole should be reported.',
      standardRef: 'Fire-stopping guidance',
    },
    {
      question:
        'You need to add IT cables to a pathway that is already sealed with fire-stop material. How should you handle the seal?',
      correct: 'Carefully remove the firestop material and store it safely for re-installation',
      distractors: [
        'Remove and dispose of the existing firestop material',
        'Avoid the existing route and create a new one',
        'Reroute cables to avoid fire-separating structures',
      ],
      explanation:
        'Some firestop systems are designed to be removed, reinstalled and reused. Remove carefully and store for re-installation, knowing your system type.',
      standardRef: 'Fire-stopping guidance',
    },
    {
      question:
        'Below what internal cross-sectional area does a trunking through a fire-rated wall not need internal fire seals?',
      correct: '710 mm² (32 mm diameter conduit or 25 x 25 trunking permitted)',
      distractors: ['1070 mm²', '1710 mm²', '7100 mm²'],
      explanation:
        "BS 7671 advises that internal fire seals are not required where the trunking's internal cross-sectional area is no greater than 710 mm².",
      standardRef: 'BS 7671',
    },
    {
      question: 'Which cable support product helps stop cabling collapsing early in a fire?',
      correct: 'Steel cable ties',
      distractors: [
        'Wall-mounted plastic trunking',
        'Plastic cable tray suspended from the ceiling',
        'Non-metallic cable ties',
      ],
      explanation:
        'Non-metallic supports melt in a fire, collapsing the cabling. Steel cable ties resist this, provided they are fixed to the fabric of the building.',
      standardRef: 'BS 7671 / BS 6701',
    },
    {
      question: 'In which situation is temporary sealing of a fire-rated structure acceptable?',
      correct: 'During the installation process',
      distractors: [
        'On completion of the cabling system',
        'On completion and handover of the building',
        'During the commissioning of services',
      ],
      explanation:
        'A temporary seal is permissible during installation where access is needed repeatedly; all openings must be permanently sealed once work is complete.',
      standardRef: 'Fire-stopping guidance',
    },
  ],
  'Safe Cable Installation': [
    {
      question: 'What is the fewest people needed to install cable from a drum?',
      correct: '2 people',
      distractors: ['1 person', '3 people', '4 people'],
      explanation:
        'One person must stay with the drum to control its speed while at least one other pulls the cable, so a minimum of two is required.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'You notice friction damage while pulling cable from a box. What is the right action?',
      correct: 'Stop, trace back along the pathway to find and fix the cause, and replace the damaged cable',
      distractors: [
        'Stop, cut the cable past the damage and carry on',
        'Note which cable it is and check the test results later',
        'Carry on — it is only friction on the sheath',
      ],
      explanation:
        'Friction damage usually means a rough surface in the pathway. Stop, find and correct the cause, and replace the damaged cable before continuing.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'A cable drum is badly damaged and you can see the cable inside it. What should you do?',
      correct: 'Do not use it and report it to your supervisor',
      distractors: [
        'Use the drum, but stand clear while it spins',
        'Use the cable, but unwind it by hand without spinning',
        'Repair the drum and use it as normal',
      ],
      explanation:
        "If a drum is heavily damaged you cannot be sure of the cable's quality, so it should not be used and should be reported.",
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'A cable drum is heavily splintered around its edge. What is the correct action?',
      correct:
        'If the cable is unaffected, wear gloves and use a suitable tool to remove the splinters before use',
      distractors: [
        'Use it as is, but stand at a distance while it spins',
        'Do not use it at all',
        'Return it to stock and use a different drum',
      ],
      explanation:
        'Edge splintering is common; where the cable is unaffected, remove loose splinters with gloves and a suitable tool before using the drum.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'What is the correct way to pay cable off a wooden drum?',
      correct: 'Mount the drum on a metal A-frame and spindle',
      distractors: [
        'Hang the drum from a tied-off rope',
        'Rest the drum between two chairs on a broom handle',
        'Rest the drum between two chairs on a length of steel conduit',
      ],
      explanation:
        'Always use the correct equipment: a metal A frame and spindle. Improvising endangers people and the installation quality.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'How is the number of Cat6A drums one person may carry at once decided?',
      correct: 'By the risk assessment',
      distractors: [
        'It is always a 2-person lift, never one',
        'There is no limit — it depends on the individual',
        'No more than 3, so vision is not blocked',
      ],
      explanation:
        'Carrying drums is a manual-handling task; the safe number is determined by the risk assessment for the conditions and individuals involved.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'A stack of cable boxes topples over. What should you do?',
      correct: 'Stop work straight away and restack the boxes safely',
      distractors: [
        'Finish the current run, then restack the boxes safely',
        'Stop the job and report it to your supervisor',
        'Replace the boxes once the fallen ones are empty',
      ],
      explanation:
        'Fallen boxes tangle easily, risking cable damage or injury, so stop immediately and restack them safely.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'What is the minimum number of people needed to pull cable safely from boxes?',
      correct: '2 people',
      distractors: ['1 person', '3 people', '4 people'],
      explanation:
        'One person controls the pull from the boxes and another pulls the cable, so a minimum of two is required; an obstruction may require more.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'When loose-laying cable around a 90-degree corner in a corridor, what is best practice?',
      correct: 'Station someone on the corner to feed the cable',
      distractors: [
        'Pull the whole length round in one go',
        'Put a drum on the corner for strain relief',
        'Put the box on the corner, pull one way then fleet back the rest',
      ],
      explanation:
        'Someone on the corner keeps the cable in sight and minimises strain, preventing the cable from rubbing on the corner.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'When is it acceptable to use a knife during installation work?',
      correct: 'Knife use should be avoided',
      distractors: [
        'When stripping the sheath from a cable',
        'Any time, instead of the proper tool, if it retracts',
        'When there is no screwdriver to hand',
      ],
      explanation:
        'Specialist tools exist for every cabling task, so knives should be avoided — always use the right tool for the job.',
      standardRef: 'Tooling guidance',
    },
    {
      question:
        'Cable is being pulled on basket between two offices, through a wall on a straight run above a false ceiling. How many people are needed to do it correctly?',
      correct: '3 people',
      distractors: ['1 person', '2 people', '4 people'],
      explanation:
        'With an obstruction such as a wall between the offices, best practice is one controlling the feed and one each side of the obstruction — three people.',
      standardRef: 'Manual handling / risk assessment',
    },
    {
      question: 'What is the right aid for pulling a cable bundle through an enclosed pathway?',
      correct: 'A nylon cable rod',
      distractors: ['A trunking lid', 'A stretched-out wire coat hanger', 'A broom handle'],
      explanation: 'Use the tool designed for the task — a nylon cable rod — rather than improvising.',
      standardRef: 'Tooling guidance',
    },
    {
      question: 'Which tool removes the yellow aramid (Kevlar) layer from a fibre optic cable?',
      correct: 'Kevlar scissors',
      distractors: ['A utility knife', 'A hacksaw', 'Bolt cutters'],
      explanation: 'The yellow aramid (Kevlar) strength member is cut with purpose-made Kevlar scissors.',
      standardRef: 'Tooling guidance',
    },
    {
      question: 'When fitting a new hacksaw blade, which way should the teeth point?',
      correct: 'Forwards',
      distractors: ["It doesn't matter", 'Backwards', 'It depends on the type of hacksaw'],
      explanation: 'Hacksaw blades cut on the forward stroke, so the teeth should point forwards.',
      standardRef: 'Tooling guidance',
    },
    {
      question: 'How many Cat6a cables will fit in a 20 mm conduit?',
      correct: '2 cables',
      distractors: ['6 cables', '12 cables', '24 cables'],
      explanation:
        'Fill calculators that account for cable diameter, bend radius and fill ratio show only 2 Cat6a cables fit a 20 mm conduit.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which containment best suits running 12 Cat 6 cables along an office wall at desk height?',
      correct: '50 mm x 50 mm trunking',
      distractors: ['18 mm conduit', '300 mm steel tray', '100 mm x 54 mm wire basket'],
      explanation:
        "Steel tray and wire basket are not suitable at desk height in an office, and 18 mm conduit can't hold 12 cables, so 50 x 50 trunking is best.",
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'What is the best tool for trimming excess Cat 6 cable?',
      correct: 'Side cutters',
      distractors: ['A hacksaw', 'A jigsaw', 'Scissors'],
      explanation:
        'Side cutters are designed to cut small core-size cables, making them the most appropriate tool.',
      standardRef: 'Tooling guidance',
    },
    {
      question: 'Which pen is best for temporarily labelling a cable as you pull it in?',
      correct: 'A fine point permanent marker',
      distractors: ['A felt tip', 'A ball point', 'A chalk pen'],
      explanation:
        'A fine-point permanent marker writes neatly and does not rub off while the cable is handled and pulled through the building.',
      standardRef: 'Tooling guidance',
    },
    {
      question: 'What fastening is best for temporarily dressing cables?',
      correct: 'Hook and loop',
      distractors: ['150 mm x 7.6 mm nylon ties', 'Wire ties', '300 mm x 13 mm nylon ties'],
      explanation: 'Temporary dressing needs frequent adjustment, so hook and loop is most suitable.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which tool correctly strips the outer sheath from copper data cable?',
      correct: 'A cyclops / rotary stripper',
      distractors: ['A Stanley knife with a fully retractable blade', 'Scissors', 'A sharp pen knife'],
      explanation:
        'Use the tool designed for the task: a cyclops/rotary cable stripper, which scores the sheath without nicking the conductors.',
      standardRef: 'Tooling guidance',
    },
  ],
  'Personal Safety': [
    {
      question: 'Which gloves should you wear when pulling in data cable?',
      correct: 'Correctly fitting EN420 compliant gloves',
      distractors: ['Leather gloves', 'Blue latex gloves', 'Cotton gloves with palm grips'],
      explanation:
        'Any safety equipment must comply with the relevant standard — here, correctly fitting EN420 compliant gloves.',
      standardRef: 'EN 420',
    },
    {
      question: 'Who is PPE designed to protect?',
      correct: 'The person wearing it',
      distractors: [
        'The wearer and people in the immediate vicinity',
        'Everyone in the vicinity of the installation',
        'The local health & safety representative',
      ],
      explanation: 'PPE is PERSONAL protective equipment, designed to protect the user wearing it.',
      standardRef: 'PPE at Work Regulations',
    },
    {
      question: 'What base-to-height ratio gives a safe ladder angle?',
      correct: '1:4',
      distractors: ['1:2', '1:8', '4:1'],
      explanation:
        'The 1:4 base-to-height ratio (one out, four up) minimises the risk of the ladder slipping or falling.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'Working on step-ladders and needing both hands for a task, how do you stay safe?',
      correct: 'Keep 3 points of contact using two feet and another part of the body',
      distractors: [
        'Put both feet on the same step',
        'Keep 3 points of contact using two feet and one hand',
        'Wear a safety harness clipped to the step-ladder',
      ],
      explanation:
        'On steps you must keep 3 points of contact; when both hands are needed you can use two feet plus another part of the body against the steps.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'You identify or suspect asbestos-containing material. What should you do?',
      correct: 'Stop work, put up a warning sign and keep others out of the area',
      distractors: [
        'For low-grade asbestos, finish the work and sweep up afterwards',
        "Carry on, using 'wet drilling' where you need penetrations",
        'Stop work and look for another pathway',
      ],
      explanation:
        'Asbestos can be present in any building built before 2000. Stop work immediately, warn others, keep people out and seek advice.',
      standardRef: 'Control of Asbestos Regulations 2012',
    },
    {
      question: 'For PPE to be suitable, what must it be?',
      correct: 'Assessed as appropriate to the risk and suitable for the working conditions',
      distractors: [
        'Risk-reducing and comfortable for the wearer',
        'Risk-reducing and highly visible',
        'Serviceable, suitable and a correct fit',
      ],
      explanation:
        'The onsite risk assessment identifies the specific PPE needed; PPE must be appropriate to the risk and suitable for the conditions.',
      standardRef: 'PPE at Work Regulations',
    },
    {
      question: 'Which PPE is required to pull cable on a live construction site?',
      correct: 'All of these items',
      distractors: ['Hard hat and facemask', 'Gloves and glasses', 'Safety boots and hi-viz jacket'],
      explanation:
        'The minimum on a working site is hard hat, facemask, gloves, goggles, safety boots and hi-viz — all of these items; some sites require more.',
      standardRef: 'PPE at Work Regulations',
    },
    {
      question: 'Which safety helmet should you wear when installing cabling at height?',
      correct: 'A BS EN 397 compliant helmet',
      distractors: ['A company branded helmet', 'A black helmet', 'A yellow helmet'],
      explanation:
        'Safety equipment must comply with the relevant standard; head protection should be a BS EN 397 compliant helmet.',
      standardRef: 'BS EN 397',
    },
    {
      question: "Who is responsible for supplying an employee's PPE?",
      correct: 'The employer',
      distractors: ['The employee', 'The site storeman', 'The site health and safety advisor'],
      explanation:
        'Under the Health and Safety at Work Act, the employer is responsible for providing PPE to employees.',
      standardRef: 'Health and Safety at Work Act 1974',
    },
    {
      question: 'How often should the ladders or steps you are using be inspected?',
      correct: 'Daily, before use',
      distractors: ['Monthly', 'Weekly', 'Daily, after use'],
      explanation:
        'The user should carry out a daily pre-use inspection of ladders and platforms before climbing them, whatever the local reporting policy.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question:
        'What is the best access equipment for pulling cable into an overhead basket at 4.8 m in a large warehouse?',
      correct: 'A Mobile Elevated Working Platform (MEWP)',
      distractors: ['Telescopic ladders', 'Mobile steps', 'Extendable ladders'],
      explanation:
        'Where space allows, a more stable and secure platform such as a MEWP should be used for working at this height.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'The stitching on a safety harness is starting to fray. What should you do?',
      correct: 'Report it, take it out of use and get another set',
      distractors: [
        'Report it, use it, and set it aside at the end of the day',
        'Use it and report it at the end of the day',
        'Use it, but take extra care',
      ],
      explanation:
        'Damaged or worn safety equipment must be removed from use and replaced, so quarantine the harness and obtain another.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'You are working at ground level right beside a large, open pit. What is correct?',
      correct: 'Wear suitable equipment for working at height',
      distractors: [
        'Carry on working as normal',
        'Stop work until the pit is closed',
        'Just work with extra caution',
      ],
      explanation:
        'The HSE definition of working at height includes anywhere a fall could cause injury, so working next to an open pit requires suitable working-at-height equipment.',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question: 'Which of these is NOT advised when lifting or carrying equipment?',
      correct: 'Carrying items that block your view, without assistance',
      distractors: [
        'Bending your knees rather than your back',
        'Avoiding twisting or leaning sideways',
        'Keeping the load close to your waist while moving',
      ],
      explanation:
        'Safe manual handling keeps loads close and avoids twisting; carrying items that block your view without help is not advised.',
      standardRef: 'Manual Handling Operations Regulations 1992',
    },
    {
      question: 'Which of these should you NOT do while pulling in cables?',
      correct: 'Push cables through holes without first checking the exit point',
      distractors: [
        'Pull several cables at once',
        'Work in teams or pairs',
        'Keep a clear view of the area being worked on',
      ],
      explanation:
        'Always survey the route first. Pushing cables through holes without checking the exit point risks damage and injury.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How should a large communications cabinet be moved?',
      correct: 'By following the Assess, Plan, Prepare, Move procedure',
      distractors: ["By 'walking' it from side to side", 'By dragging it', 'By carrying it between 2 people'],
      explanation:
        'Moving a large cabinet is a manual-handling task; follow the Assess, Plan, Prepare, Move procedure with safety as the priority.',
      standardRef: 'Manual Handling Operations Regulations 1992',
    },
    {
      question: 'What is the correct way to move a large cable drum?',
      correct: 'Use a team and wheel it, with one person acting as banksman',
      distractors: ['Wheel it on your own', 'Tip it on its side and use trolley jacks', 'Drag it with a 4x4'],
      explanation:
        'A large drum is a manual-handling task; use a team and a banksman, keeping safety the primary concern.',
      standardRef: 'Manual Handling Operations Regulations 1992',
    },
    {
      question:
        'You arrive on site and nothing is keeping the public out of your work area. What should you do?',
      correct: 'Section the area off with signage and barriers, then seek guidance once it is secure',
      distractors: [
        'Work quickly to keep the risk short-lived',
        'Tie a rope across to block access',
        'Make extra noise so people know you are there',
      ],
      explanation:
        'Make the area safe first with signage and barriers — some action is better than none — then confirm the correct arrangements once it is secure.',
      standardRef: 'Health and safety guidance',
    },
    {
      question:
        "You start work in a shared office corridor but the proper signage isn't available. What is the correct action?",
      correct: 'Get hold of the correct signage to properly cordon off the area',
      distractors: [
        'Put any available signage in the middle of the work area',
        'Stay alert and verbally warn anyone who walks in',
        'Block the access points with tools or materials',
      ],
      explanation:
        'Safety of yourself and others comes first, so obtain the correct signage to properly cordon off the area before working.',
      standardRef: 'Health and safety guidance',
    },
    {
      question: 'What is the purpose of putting up warning and guarding signs?',
      correct: 'To protect you, your fellow workers and anyone else affected by the work',
      distractors: [
        'To protect the public',
        'To protect yourself',
        'To protect workers from legal action after an accident',
      ],
      explanation:
        'Warning and guarding signs protect you, your fellow workers and anyone else who could be affected by the work.',
      standardRef: 'Health and safety guidance',
    },
  ],
  'Other Services': [
    {
      question:
        "If the IT cable's specification or use is unknown, what minimum separation from power cable is recommended?",
      correct: '200 mm',
      distractors: ['50 mm', '150 mm', '500 mm'],
      explanation:
        'Data performance suffers from EMI near power cables. Where the IT cable is unknown, the recommended minimum separation is 200 mm.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'How far can data cable and screened power cable run alongside each other without separation?',
      correct: '35 m',
      distractors: ['40 m', '45 m', '50 m'],
      explanation:
        'Separation depends on the power carried and the distance between cables. Data and screened power cables can run together for up to 35 m.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'With no divider in place, what is the minimum gap between screened backbone cabling and unscreened power cable?',
      correct: '50 mm',
      distractors: ['0 mm', '30 mm', '200 mm'],
      explanation:
        'With no divider, screened backbone cabling and unscreened power cables should be separated by at least 50 mm to limit EMI.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Where it has to cross a power cable, how should network cabling cross it?',
      correct: 'At right angles',
      distractors: [
        'Separated by a metal divider',
        'Where screened cables are used',
        'Separated by an insulated divider',
      ],
      explanation:
        'EMI is strongest when cables run parallel; crossing at right angles (90°) reduces induced interference to almost nil.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'How far should metallic IT cable be kept from fluorescent light fittings?',
      correct: 'At least 130 mm',
      distractors: ['At least 30 mm', 'At least 50 mm', 'At least 100 mm'],
      explanation:
        'Fluorescent fittings create EMI and power flickers that interfere with data frames, so metallic IT cables should be kept at least 130 mm away.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Why is adequate separation between telecommunication wiring and power cabling needed?',
      correct: 'To prevent danger to persons from induced voltages',
      distractors: [
        'To allow for future expansion of the telecoms system',
        'To give maintenance staff room to work',
        'So power and telecoms cable can be told apart',
      ],
      explanation:
        'Where cables run too close, voltages as well as signals can be induced, which can cause damage or injury — separation prevents this danger.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'The 50 mm separation for parallel power and telecoms cabling is based on which two factors?',
      correct: 'The power flowing in the power cable and the distance from the telecommunications cabling',
      distractors: [
        'The power in the power cable and the distance from the containment',
        'The overall length of the power and telecoms cabling',
        'The power in the telecoms cable and the distance from the power cable',
      ],
      explanation:
        'Separation is calculated from the power flowing through the power cable and the physical distance between it and the telecommunications cabling.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question: 'Which of these will NOT help reduce electrical interference on copper data cable?',
      correct: 'Using unscreened twisted pair cable',
      distractors: [
        'Using screened twisted pair cable',
        'Running cable in mechanically and electrically continuous conduit',
        'Physically separating the cables',
      ],
      explanation:
        'Screening, continuous metallic conduit and physical separation all reduce EMI; unscreened twisted pair offers no such screening.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'When burying a telecommunication cable, which HSE guidance document helps you meet your legal duties?',
      correct: 'HSG47',
      distractors: ['HSR25', 'GS38', 'HSG85'],
      explanation:
        "HSG47 ('Avoiding danger from underground services') is the HSE guidance for work involving buried services.",
      standardRef: 'HSG47',
    },
    {
      question:
        'Which regulation would NOT apply when burying a telecom cable near other underground services?',
      correct: 'The Work at Height Regulations 2005',
      distractors: [
        'The Construction (Design and Management) Regulations 2007',
        'The Pipelines Safety Regulations 1996',
        'The Management of Health & Safety at Work Regulations 1999',
      ],
      explanation:
        'Working in an open trench is not normally working at height, so the Work at Height Regulations would not apply (unlike near an open pit/chamber).',
      standardRef: 'Work at Height Regulations 2005',
    },
    {
      question:
        'Before entering a cable chamber to lay cable into ducts, what is the first action you should take?',
      correct: 'Test for explosive and noxious gases with a portable gas detector',
      distractors: [
        'Put up a tent to shelter from the weather',
        'Remove the chamber lids and start installing',
        'Put on waterproof clothing',
      ],
      explanation:
        'Underground structures can collect explosive, poisonous and odourless gases, so test with a portable gas detector before entry.',
      standardRef: 'Confined spaces guidance',
    },
    {
      question: 'Which duct colour would be the wrong choice for telecommunications buried in the ground?',
      correct: 'Yellow',
      distractors: ['White', 'Black', 'Grey'],
      explanation:
        'The NJUG colour guidance reserves yellow for gas, so a yellow duct would not be suitable for telecommunications.',
      standardRef: 'NJUG guidance',
    },
    {
      question:
        'What is the minimum recommended burial depth for a telecommunication cable under a footpath?',
      correct: '500 mm',
      distractors: ['250 mm-450 mm', '450 mm-600 mm', '600 mm'],
      explanation:
        'BS EN 50174-3 Table 3 gives minimum recommended bore depths; below a footpath the figure is 500 mm.',
      standardRef: 'BS EN 50174-3',
    },
    {
      question: 'Which cable management system can shield data cabling from electromagnetic interference?',
      correct: 'Metallic trunking',
      distractors: ['Plastic conduit', 'Plastic trunking', 'Non-metallic trunking'],
      explanation:
        'A correctly installed, earthed metallic trunking acts as a screen, absorbing EMI and feeding it to earth; plastic systems cannot.',
      standardRef: 'BS EN 50174-2',
    },
    {
      question:
        'What is the minimum recommended burial depth for a telecommunication cable under a road or carriageway?',
      correct: '600 mm',
      distractors: ['250 mm-350 mm', '750 mm-1200 mm', '750 mm'],
      explanation:
        'BS EN 50174-3 Table 3 gives minimum recommended bore depths; below a road or carriageway the figure is 600 mm.',
      standardRef: 'BS EN 50174-3',
    },
  ],
  'Waste Management': [
    {
      question: 'Does a construction site need a waste management policy?',
      correct: 'Yes, and it must be followed',
      distractors: [
        'Yes, but it is only advisory',
        'No, but it is good practice',
        'No, it is down to the individual',
      ],
      explanation:
        'Site waste management plans are mandatory for construction sites (DEFRA Waste Strategy / Construction Resources and Waste roadmap), so the policy must be followed.',
      standardRef: 'DEFRA Waste Strategy',
    },
    {
      question: 'How should empty cable boxes be disposed of?',
      correct: "As directed in your company's waste management policy",
      distractors: ['Left for the cleaner', 'In the recycling skip', 'In the general skip'],
      explanation:
        "Sites have different recycling processes and contracts, so the only sure way is to follow your company's waste management policy.",
      standardRef: 'Company waste management policy',
    },
    {
      question: 'How should leftover cable still on its drum be disposed of?',
      correct: "As directed in your company's waste management policy",
      distractors: ['Kept for its scrap value', 'In the general skip', 'In the recycling skip'],
      explanation:
        "Recycling and metal-waste arrangements vary by site, so dispose of waste cable as directed by your company's waste management policy.",
      standardRef: 'Company waste management policy',
    },
    {
      question: 'How should a fibre sharps bin be dealt with?',
      correct: 'Sent away for specialist disposal',
      distractors: [
        'Emptied into the general skip',
        'Emptied into the recycling skip',
        'Bagged up and put in a normal bin',
      ],
      explanation:
        'Glass fibre shards are a specialist waste and must be sent away for correct disposal by a specialist company.',
      standardRef: 'Company waste management policy',
    },
    {
      question: 'How should empty wooden cable drums be disposed of?',
      correct: "As directed in your company's waste management policy",
      distractors: ['Broken down and put in the recycling skip', 'Put in the general site skip', 'Sold on'],
      explanation:
        "Most policies return drums to the manufacturer for reuse as the most sustainable option, so follow your company's waste management policy.",
      standardRef: 'Company waste management policy',
    },
  ],
};

function answerLetterForId(id: string): AnswerChoice {
  // FNV-1a 32-bit hash -> deterministic letter per question ID (not position).
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
