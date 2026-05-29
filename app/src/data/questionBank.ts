import type { AnswerChoice, Question, QuestionSection } from '../types/question';

type Seed = {
  prompt: string;
  correct: string;
  explanation: string;
  distractors?: [string, string, string];
};

const sectionSeeds: Record<QuestionSection, Seed[]> = {
  'Product Selection': [
    seed('specifying indoor telecommunications cable for a normal building route', 'Cca-s1b,d2,a2', 'For the guide topic map, Cca-s1b,d2,a2 is the indoor telecommunications cable EuroClass fact to learn. The code combines flame class with smoke, droplet and acidity sub-ratings under the CPR/EuroClass system.', ['Dca-s1b,d2,a2', 'Eca-s1b,d2,a2', 'Fca-s1b,d2,a2']),
    seed('choosing the listed cable code with the lowest smoke production', 'B2ca s1a d1 a1', 'In the EuroClass notation, the s value describes smoke production. s1a is the lowest smoke option among the listed codes.', ['Eca', 'Cca s1b d2 a2', 'Dca s2 d2 a2']),
    seed('checking whether a cable belongs to telecommunications rather than low-voltage power', '3 core 13 amp 230 volt mains cable', 'Cat5e data cable, 1308 telephone cable and 2 pair intruder alarm cable are communications-type examples. A 230 volt mains cable belongs to the electrical power installation.', ['Cat5e 4 pair data cable', '1308 3 pair telephone cable', '2 pair intruder alarm cable']),
    seed('selecting exposed external cable that is not in duct, conduit or another cover', 'Use UV resistant cable with a weather-resistant protective sheath.', 'External exposure changes the cable-selection requirement. The sheath must be suitable for sunlight and weather, not just the data category. BS EN 50174-3 is the external-installation standard area to review.', ['Use white indoor cable.', 'Use Cat 5e S/FTP as the only requirement.', 'Use Cat 6 F/FTP as the only requirement.']),
    seed('setting the design limit for a Class Ea balanced copper permanent link', '90 metres', 'The Class Ea permanent link fact used for this assessment topic is 90 m. The separate channel value includes patching and equipment cords.', ['55 metres', '100 metres', '1000 metres']),
    seed('setting the maximum Class Ea channel length with normal patching allowance', '100 metres', 'A channel includes the permanent link plus cords. For the Class Ea channel topic, use 100 m as the full channel value.', ['55 metres', '90 metres', '1000 metres']),
    seed('allowing for Class Ea channels where patch cords exceed 20 metres', '95 metres', 'Long patch cords reduce the acceptable channel arrangement. The guide topic uses 95 m for this long-patch-cord scenario.', ['80 metres', '90 metres', '100 metres']),
    seed('bonding a cabinet, frame or rack of 21U or less under HD 60364-5-54', 'Minimum 4 mm2 bonding conductor', 'The guide topic maps small rack bonding to HD 60364-5-54 and a 4 mm2 minimum bonding conductor.', ['Minimum 2.5 mm2 bonding conductor', 'Minimum 10 mm2 bonding conductor', 'Minimum 16 mm2 bonding conductor']),
    seed('bonding a cabinet, frame or rack larger than 21U under HD 60364-5-54', 'Minimum 16 mm2 bonding conductor', 'For racks above 21U, the fact to learn is the larger 16 mm2 bonding conductor requirement. Also review the relevant earthing and bonding principles in BS 7671.', ['Minimum 2.5 mm2 bonding conductor', 'Minimum 4 mm2 bonding conductor', 'Minimum 10 mm2 bonding conductor']),
    seed('bonding a wall-mounted 12U communications cabinet with a glass door', 'Minimum 4 mm2 bonding conductor', 'A 12U wall cabinet falls within the small-cabinet bonding scenario. The assessment topic uses a 4 mm2 value.', ['No bonding conductor is needed.', 'Minimum 2.5 mm2 bonding conductor', 'Minimum 10 mm2 bonding conductor']),
    seed('matching Cat5e cabling to the Ethernet names listed in the guide', '100baseT', 'Cat5e supports 100baseT in the listed options. The other listed Ethernet names are not the Cat5e choice in this topic.', ['100baseSX', '10base2', '10base5']),
    seed('choosing media for a 10 Gb/s link over 500 metres', 'Fibre optic cable', 'At 500 m, balanced copper categories such as Cat6A, Cat7 or Cat8 are not the right medium for this 10 Gb/s scenario. Fibre is the correct media family.', ['Co-ax cable', 'Cat 6A cable', 'Cat 7 or Cat8 cable']),
    seed('choosing media for a 10 Gb/s link over 2000 metres', 'Single-mode fibre optic cable', 'For kilometre-scale 10 Gb/s links, single-mode fibre is the appropriate choice. OM1, OM2, OM3, OM4 and OM5 are multimode grades rather than the long-distance answer here.', ['Multimode fibre optic cable OM1 or OM2', 'Multimode fibre optic cable OM3 or OM4', 'Multimode fibre optic cable OM5']),
    seed('checking fibre core and cladding sizes from the listed examples', '100/125', '9/125 is single-mode, while 50/125 and 62.5/125 are multimode sizes. 100/125 is the non-standard listed option in the guide topic.', ['9/125', '50/125', '62.5/125']),
    seed('expanding the abbreviation CPR in the construction-products cable context', 'Construction Products Regulations', 'For this assessment topic, CPR refers to the Construction Products Regulations framework used for construction product performance, including cable reaction to fire.', ['Cable Product Regulations', 'Construction Product Requirements', 'Construction Protection Regulations']),
    seed('expanding the abbreviation DoP for construction-product cable documentation', 'Declaration of Performance', 'A Declaration of Performance records the declared characteristics of a construction product, including reaction-to-fire performance where applicable.', ['Declaration of Product', 'Details of Performance', 'Declaration of Personnel']),
    seed('interpreting CE marking on a cable product', 'The product meets applicable EU safety, health or environmental requirements.', 'CE marking is a conformity mark. It is not a statement that the product was manufactured in the EU or that it meets every worldwide requirement.', ['The product meets worldwide requirements.', 'The product was made in the European Union.', 'The product meets only data transmission requirements.']),
  ],
  'Containment Systems': [
    seed('applying BS EN 50174-2 bend-radius guidance to 4-pair balanced cable', 'Eight times the cable diameter', 'The guide topic maps 4-pair balanced cable containment work to an 8x cable-diameter bend-radius value.', ['Four times the cable diameter', 'Ten times the cable diameter', 'Twelve times the cable diameter']),
    seed('applying BS EN 50174-2 bend-radius guidance to optical fibre and coaxial cable', 'Ten times the cable diameter', 'For optical fibre and coaxial cable in this topic map, use the 10x cable-diameter bend-radius value.', ['Four times the cable diameter', 'Eight times the cable diameter', 'Twelve times the cable diameter']),
    seed('working with 19 inch rack equipment height units', '1U is 44.45 mm or 1.75 inches', 'The U/RU value is a rack unit used for equipment height in 19 inch cabinets and racks.', ['1U is 50 mm or 2 inches', '1U is 30 mm or 1 inch', '1U is 25 mm or 1 inch']),
    seed('identifying what counts as a cable management system', 'It can include ducts and tubes for blown information technology cables or cable elements.', 'A cable management system is broader than tray alone and includes pathway products designed to contain or support cabling.', ['It excludes ducts and tubes.', 'It excludes tubes for blown information technology cables.', 'It means only the boxes or drums the cables arrive in.']),
    seed('deciding whether a suspended ceiling grid can support network cabling pathways', 'Do not use suspended ceiling grids as support for pathway systems.', 'Containment and pathway systems should be fixed to suitable building fabric, not hung from ceiling grid members.', ['Use it to support multiple cable bundles.', 'Use it to support devices within the suspended ceiling.', 'Use it to support pathway systems when the route is short.']),
    seed('checking containment loading before adding cables', 'Confirm the containment and fixings can carry the additional cable load.', 'Adding cables to a route without checking capacity can overload the containment system.'),
    seed('routing containment in an escape route', 'Use supports and materials suitable for the location and fire-safety requirements.', 'Installations in escape routes must not create additional risk during evacuation or fire conditions.'),
    seed('installing trunking lids after cabling', 'Refit lids without trapping or crushing cables.', 'A neatly closed containment system is not acceptable if the lid compresses the cable bundle.'),
    seed('using shared containment for multiple services', 'Verify separation, identification, and service compatibility before sharing containment.', 'Shared routes must be managed so one service does not compromise another.'),
    seed('choosing bend accessories for containment', 'Use accessories that maintain cable bend radius through direction changes.', 'Containment bends should not force cables below their permitted bend radius.'),
    seed('cutting containment on site', 'Deburr cut edges and protect cables from sharp metal or plastic.', 'Site-cut containment can leave burrs that damage cable sheaths during installation.'),
    seed('fixing containment to weak building fabric', 'Use fixings suitable for the substrate and expected load.', 'The strongest tray or basket is only safe if the fixings and background can support it.'),
    seed('using cable ties directly to containment', 'Avoid over-tightening ties and use suitable restraint methods.', 'Tight restraints can deform communications cable and affect transmission performance.'),
    seed('maintaining access to containment', 'Keep inspection and maintenance access available where future work is likely.', 'Cabling routes need to be maintainable for testing, additions, and fault finding.'),
    seed('routing containment in damp areas', 'Select corrosion-resistant containment and fixings suitable for the environment.', 'Moisture can corrode unsuitable containment and weaken support over time.'),
    seed('crossing expansion joints', 'Allow for building movement so containment and cables are not strained.', 'Rigid installation across movement points can damage containment or cable during building movement.'),
    seed('bonding metallic containment', 'Follow the electrical design for bonding where metallic containment is part of the installation.', 'Metallic containment may need bonding depending on the design and electrical safety requirements.'),
    seed('installing containment above ceilings', 'Keep routes orderly and supported rather than laying cables loose on ceiling tiles.', 'Ceiling grids are not cable support systems and should not carry the cable installation.'),
    seed('using basket tray for data cabling', 'Dress cables so they are supported without sharp pressure points or excessive sag.', 'Basket tray can work well when cables are placed and supported without deformation.'),
    seed('checking containment before handover', 'Inspect for sharp edges, missing lids, poor support, overfilling, and incomplete fire stopping.', 'Containment quality affects safety, maintainability, and cabling performance after handover.'),
  ],
  'Cable Laying': [
    seed('maintaining Cat6A or shielded UTP performance around bends', 'Keep the bend radius at least four times the outside diameter.', 'The guide topic uses a 4x outside-diameter bend-radius value for Cat6A UTP and shielded cable during installation.', ['Keep the bend radius at least two times the outside diameter.', 'Keep the bend radius at least six times the outside diameter.', 'Keep the bend radius at least ten times the outside diameter.']),
    seed('comparing bend-radius sensitivity across Cat5, Cat5e, Cat6 and Cat6A', 'Cat6A has the larger bend-radius concern in the listed group.', 'Higher performance balanced cabling is more sensitive to geometry. The guide topic highlights Cat6A as the larger bend-radius concern among these categories.', ['Cat5', 'Cat5e', 'Cat6']),
    seed('planning a 20mm conduit route for Cat6A cable', 'Install 2 Cat6A cables in the 20mm conduit scenario.', 'The guide topic uses 2 as the Cat6A count for the 20mm conduit example. Fill should always be checked against cable diameter and bend constraints.', ['Install 6 Cat6A cables.', 'Install 12 Cat6A cables.', 'Install 24 Cat6A cables.']),
    seed('choosing containment at desk height in an office for 12 Cat6 cables', 'Use 50mm x 50mm trunking.', 'For the guide topic, 50mm x 50mm trunking is the suitable listed containment for 12 Cat6 cables at desk height in an office.', ['Use 18mm conduit.', 'Use 300mm steel tray.', 'Use 100mm x 54mm wire basket.']),
    seed('pulling multiple cables together', 'Manage the bundle so cables do not cross, twist, or exceed tension limits.', 'Large bundles can create high friction and uneven strain if not controlled.'),
    seed('using lubricant during cable pulling', 'Use only lubricant that is compatible with the cable sheath and installation method.', 'Incompatible lubricant can damage cable materials or leave contamination.'),
    seed('leaving spare cable at an outlet', 'Leave a sensible service loop without forcing tight coils or bends.', 'A small allowance supports termination and future work, but poor coiling can damage the cable.'),
    seed('laying cable in cold conditions', 'Check the manufacturer temperature limits before handling and bending cable.', 'Some cable materials become less flexible in cold conditions and can be damaged during installation.'),
    seed('separating data cable from sources of interference', 'Keep adequate distance from equipment and cables that can introduce electromagnetic noise.', 'Balanced cabling rejects noise, but poor routing can still degrade performance.'),
    seed('installing vertical cable drops', 'Support the cable weight so strain is not carried by the termination.', 'Vertical runs need suitable support to prevent long-term stress on connectors and cable.'),
    seed('routing through drilled holes', 'Protect the cable from rough edges and avoid compressing it in the opening.', 'A rough or tight hole can damage the cable sheath and internal construction.'),
    seed('crossing power cables', 'Cross at a suitable angle and avoid long parallel runs where separation is limited.', 'Short crossings are usually less problematic than long close parallel routes.'),
    seed('pulling cable through conduit', 'Check conduit fill, bend count, and draw-in access before pulling.', 'A conduit route that is too full or has too many bends can damage cable during installation.'),
    seed('using existing routes', 'Survey the route before installation rather than assuming spare capacity is usable.', 'Existing routes may be overloaded, damaged, blocked, or unsuitable for new cabling.'),
    seed('protecting cable ends during installation', 'Keep cable ends clean and protected until termination.', 'Moisture, dust, and site debris can affect later termination and testing.'),
    seed('labelling during cable laying', 'Identify both ends before final termination and testing.', 'Early identification prevents wasted time and reduces the risk of cross-connection.'),
    seed('avoiding cable crushing', 'Do not stand on cable, trap it under materials, or crush it with fixings.', 'Crushing can change cable geometry and cause faults that are difficult to see.'),
    seed('planning draw-in sequence', 'Install cables in an order that prevents tangling and reduces pulling force.', 'A planned sequence makes the pull safer and reduces cable damage risk.'),
    seed('handling pre-terminated assemblies', 'Protect connectors and pulling socks during routing.', 'Pre-terminated assemblies can be damaged before they are connected if connectors are unprotected.'),
    seed('checking installed cable before termination', 'Inspect for sheath damage, kinks, crushing, and route issues before terminating.', 'Finding damage before termination avoids certifying or handing over a defective link.'),
  ],
  'Cable Dressing': [
    seed('dressing copper pairs into a panel', 'Maintain pair twist as close as practical to the termination point.', 'Excessive untwisting can increase crosstalk and reduce link performance.', ['Untwist pairs as far as needed to make the conductors lie flat.', 'Remove the separator and untwist all pairs before dressing.', 'Use cable colour to decide how much twist can be removed.']),
    seed('setting the maximum copper data cable bundle size from the guide topic', '24 cables', 'The guide topic uses 24 as the maximum copper data cable bundle size. Large bundles can increase heat and interference concerns.', ['50 cables', '72 cables', '100 cables']),
    seed('temporarily dressing cables during installation', 'Use hook and loop fastening.', 'Hook and loop can be adjusted repeatedly and avoids the compression risk of tight nylon ties during temporary dressing.', ['Use 150mm x 7.6mm nylon ties.', 'Use wire ties.', 'Use 300mm x 13mm nylon ties.']),
    seed('managing patch cords', 'Route patch cords so ports remain identifiable and cords are not sharply bent.', 'Patch management affects maintenance, airflow, and link reliability.'),
    seed('dressing fibre patch leads', 'Use bend-management features and avoid tight loops.', 'Fibre patch leads are vulnerable to bend-related loss and should be dressed carefully.'),
    seed('separating copper and fibre in a cabinet', 'Dress each media type so it is supported and accessible without strain.', 'Different cable types have different handling needs and should not be forced into the same path.'),
    seed('leaving service loops in a cabinet', 'Provide enough slack for maintenance without creating unmanaged coils.', 'Slack should be controlled so it does not block airflow or create bend-radius issues.'),
    seed('dressing cables at an outlet', 'Avoid crushing the cable behind the faceplate or exceeding bend radius.', 'The final few centimetres of cable still affect the certified link performance.'),
    seed('using cable management bars', 'Support cables and patch cords so connector strain is minimised.', 'Connectors should not carry the weight or tension of the cable bundle.'),
    seed('keeping cabinet airflow clear', 'Dress cables so active equipment ventilation is not obstructed.', 'Poor cable dressing can increase equipment temperature and reduce reliability.'),
    seed('maintaining labels after dressing', 'Keep labels readable and associated with the correct cable or port.', 'A tidy installation is not maintainable if identification is hidden or lost.'),
    seed('reworking a dressed bundle', 'Release and redress cables carefully rather than pulling individual cables through a tight bundle.', 'Dragging cables through tight bundles can abrade sheaths and disturb existing links.'),
    seed('using ties near terminations', 'Keep restraints far enough from terminations to avoid stressing the connector.', 'Terminations need mechanical stability without local compression or strain.'),
    seed('checking whether Cat7 or Cat8 patching changes dressing discipline', 'Treat Cat7 and Cat8 as high-performance cabling that still needs correct bend radius, restraint and labelling.', 'Higher category names do not remove basic workmanship requirements. Geometry, support and identification still affect performance and maintainability.', ['Treat Cat7 and Cat8 as immune to tight bends.', 'Bundle Cat7 and Cat8 more tightly than Cat5e.', 'Use cable colour instead of testing for Cat7 and Cat8 links.']),
  ],
  'Fire Regulations': [
    seed('identifying the regulations behind IT cable reaction-to-fire classification', 'Construction Products Regulations 2013', 'The CPR/EuroClass system is the construction-products framework used for cable reaction-to-fire classification.', ['Regulatory Reform (Fire Safety) Order 2005', 'Electricity at Work Regulations 1989', 'Building Regulations 2010']),
    seed('expanding CPR when discussing cable fire performance', 'Construction Products Regulations', 'In this context, CPR means Construction Products Regulations, not a cable-only private label.', ['Cable Products Regulations', 'Cable Products Rules', 'Construction Products Rules']),
    seed('selecting the new-installation EuroClass code from the listed cable ratings', 'Cca-s1b,d2,a2', 'The guide topic maps new data-cable installation in a building to Cca-s1b,d2,a2. The sub-ratings record smoke, droplets and acidity.', ['Dca-s1b,d2,a2', 'Fca', 'Aca']),
    seed('checking where a manufacturer must display the CPR EuroClass classification for data cable', 'On the CE marked label on the cable reel, box or spool.', 'The packaging label is the mandatory place to check the CPR EuroClass marking; websites and datasheets may also provide it.', ['Only on the manufacturer website.', 'Only on the manufacturer data sheet.', 'Only printed directly on the cable.']),
    seed('recording fire-stopping work', 'Document the location, product, installer, and rating of completed fire-stopping.', 'Fire-stopping records help prove that compartment protection has been reinstated.'),
    seed('mixing fire-stopping products', 'Use tested systems as specified rather than improvised product combinations.', 'Fire-stopping performance depends on tested combinations of products, openings, and services.'),
    seed('leaving annular gaps around cables', 'Seal gaps using the specified fire-stopping method.', 'Small unsealed gaps can allow smoke spread even when the cable installation appears complete.'),
    seed('checking cable reaction-to-fire markings', 'Verify the marking or documentation against the project requirement.', 'The installed cable should be traceable to the required fire performance classification.'),
    seed('routing cables through protected shafts', 'Maintain the fire protection and service separation required for the shaft.', 'Protected shafts are part of the building fire strategy and must not be compromised by cabling.'),
    seed('working near fire alarm cabling', 'Avoid disturbing life-safety systems and follow the agreed isolation or permit process.', 'Life-safety systems require controlled work to avoid accidental impairment.'),
    seed('removing redundant cables', 'Remove or make safe redundant cabling where required by the fire strategy and project scope.', 'Unused cables can add fire load and make future inspection more difficult.'),
    seed('choosing fixings for fire stopping', 'Use fixings and collars that match the tested fire-stopping system.', 'Substituting fixings can invalidate the fire performance of the installed seal.'),
    seed('inspecting after ceiling closure', 'Confirm fire-stopping is complete before it becomes hidden.', 'Once ceilings or risers are closed, missing seals may be difficult and costly to find.'),
    seed('communicating fire defects', 'Report incomplete or damaged fire-stopping immediately through the project process.', 'Fire-safety defects should not be left for informal resolution or hidden at handover.'),
  ],
  'Safe Cable Installation': [
    seed('pulling cable from a drum', 'Use at least two people so one person controls the drum while another pulls.', 'The guide topic treats drum control as a separate safety task. One person should control drum speed and at least one other person is needed for the pull.', ['One person can pull directly from the drum.', 'Three people are always required regardless of route.', 'Four people are always required regardless of route.']),
    seed('finding friction damage while pulling cable from a box', 'Stop, find the rough point in the route, correct it, and replace the damaged cable.', 'Friction damage normally means the pathway or containment is damaging the sheath. Continuing can damage more cable.', ['Cut after the damaged part and continue.', 'Note the cable number and check test results later.', 'Continue because only the sheath is marked.']),
    seed('receiving a cable drum that is broken enough for the cable to be visible', 'Do not use the drum and report it to the supervisor.', 'If the drum is badly damaged, the cable condition cannot be trusted for installation or certification.', ['Use the drum while standing clear.', 'Pull the cable off manually without spinning.', 'Repair the drum and use it normally.']),
    seed('using a wooden cable drum with splintering around the edge', 'If the cable is not damaged, wear gloves and remove splinters with a suitable tool before use.', 'Splinters create an injury and cable-damage risk. The drum may be usable only after the hazard is controlled.', ['Use it as found but stand back.', 'Never use it under any condition.', 'Return every splintered drum to stock.']),
    seed('pulling cable off a wooden drum', 'Use a metal A-frame and spindle.', 'The guide topic requires proper drum support. Improvised supports such as chairs, rope or broom handles are unsafe.', ['Use a tied-off rope.', 'Use two chairs and a broom handle.', 'Use two chairs and steel conduit.']),
    seed('deciding how many Cat6A cable drums one person should carry', 'Use the task risk assessment to decide.', 'Manual handling depends on drum size, route, person, distance and site conditions. The answer is not a fixed number.', ['Always carry none because it is a two-person lift.', 'Carry as many as the person feels able to carry.', 'Carry no more than three so vision is not blocked.']),
    seed('responding when a stack of cable boxes collapses', 'Stop immediately and restack the boxes safely.', 'Collapsed boxes can tangle cable and create trip or pulling hazards. The safe response is to stop and make the stack safe.', ['Finish the cable run first.', 'Report it but continue pulling.', 'Replace boxes only after they are empty.']),
    seed('pulling cable from boxes safely', 'Use at least two people.', 'The guide topic uses two people as the minimum for cable pulling from boxes, with more added where obstructions require control.', ['Use one person.', 'Use three people as the minimum in every case.', 'Use four people as the minimum in every case.']),
    seed('loose laying cable around a 90 degree corridor corner', 'Place someone at the corner to feed and control the cable.', 'A person at the corner reduces rubbing and strain while keeping the moving cable visible.', ['Pull the entire length around in one go.', 'Use a drum at the corner as strain relief.', 'Put the box on the corner and fleet back later.']),
    seed('using knives during data-cabling installation tasks', 'Avoid using knives where a proper specialist tool is available.', 'Specialist stripping and cutting tools reduce the risk of injury and cable damage. A retractable knife is not a general replacement.', ['Use a knife whenever removing sheath.', 'Use a retractable knife instead of specialist tools.', 'Use a knife as a screwdriver when necessary.']),
    seed('pulling between two offices through a straight false-ceiling route with basket installed', 'Use three people.', 'The guide topic uses three people: control at the box and control around the route or obstruction points.', ['Use one person.', 'Use two people.', 'Use four people.']),
    seed('pulling a bundle through an enclosed pathway', 'Use nylon cable rods.', 'Cable rods are the suitable tool for this guide topic. Improvised items can damage the route or cable.', ['Use a trunking lid.', 'Use a straightened wire coat hanger.', 'Use a broom handle.']),
    seed('working around asbestos-risk materials', 'Stop and follow the site asbestos procedure if suspect material is encountered.', 'Installers should not disturb suspect materials without the correct survey and controls.'),
    seed('removing the yellow fibrous strength member from fibre cable', 'Use Kevlar scissors.', 'Kevlar scissors are designed for the fibre strength member. General knives or hacksaws are not suitable.', ['Use a utility knife.', 'Use a hacksaw.', 'Use bolt cutters.']),
    seed('changing a hacksaw blade', 'Fit the teeth to cut forwards.', 'Hacksaw blades are designed to cut on the forward stroke.', ['It does not matter.', 'Fit the teeth backwards.', 'Choose direction based only on the hacksaw type.']),
    seed('cutting excess Cat6 cable', 'Use side cutters.', 'Side cutters are suitable for cutting small data-cable conductors and excess cable cleanly.', ['Use a hacksaw.', 'Use a jigsaw.', 'Use scissors.']),
    seed('temporarily marking a cable during pulling', 'Use a fine point permanent marker.', 'Temporary marks must survive handling during pulling, so a fine point permanent marker is the guide-topic answer.', ['Use a felt tip.', 'Use a ball point pen.', 'Use a chalk pen.']),
    seed('temporarily fastening cables while they may need adjustment', 'Use hook and loop fastening.', 'Temporary dressing needs to be adjustable and should not crush the cable.', ['Use 150mm x 7.6mm nylon ties.', 'Use wire ties.', 'Use 300mm x 13mm nylon ties.']),
    seed('stripping the outer sheath of copper data cable', 'Use a cyclops/rotary stripper.', 'Purpose-made sheath stripping tools reduce damage to the cable compared with knives or scissors.', ['Use a retractable Stanley knife.', 'Use scissors.', 'Use a sharp pen knife.']),
    seed('protecting installed cable before handover', 'Prevent other trades from using cables as supports or damaging them during follow-on work.', 'Cabling can be damaged after installation if it is not protected before handover.'),
  ],
  'Personal Safety': [
    seed('choosing gloves for pulling in data cable', 'Use correctly fitting EN420 compliant gloves.', 'The guide topic uses EN420 compliant gloves for this task. Gloves should fit correctly and be suitable for the risk.', ['Use leather gloves.', 'Use blue latex gloves.', 'Use cotton gloves with palm grips.']),
    seed('understanding who PPE is designed to protect', 'The person wearing it.', 'PPE is personal protective equipment. It protects the wearer as the final layer of control.', ['Everyone nearby.', 'Only the local health and safety representative.', 'Only the client.']),
    seed('setting a ladder angle using base-to-height ratio', 'Use a 1:4 base-to-height ratio.', 'The guide topic uses 1:4 as the safe ladder angle ratio.', ['Use 1:2.', 'Use 1:8.', 'Use 4:1.']),
    seed('using both hands for a task on a step-ladder', 'Maintain three points of contact using two feet and part of the body.', 'When both hands are in use, stability still needs three contact points.', ['Keep both feet on the same step.', 'Use two feet and one hand only.', 'Wear a harness attached to the step-ladder.']),
    seed('finding suspected asbestos-containing material', 'Stop work, warn others, and prevent access to the area.', 'Suspected asbestos should not be disturbed. Stop and follow the site procedure.', ['Finish the work and sweep up later.', 'Continue with wet drilling.', 'Simply choose another route without controlling the area.']),
    seed('deciding whether PPE is suitable', 'Assess it against the risk and the working conditions.', 'PPE suitability comes from the risk assessment and actual site conditions.', ['Choose whatever is most comfortable.', 'Choose whatever is most visible.', 'Use it if it is serviceable and fits, regardless of risk.']),
    seed('pulling cable on an active construction site', 'Use all required site PPE items: hard hat, face mask where required, gloves, eye protection, safety boots and hi-vis.', 'The guide topic treats the listed PPE items together for active construction-site cable pulling.', ['Hard hat and face mask only.', 'Gloves and glasses only.', 'Safety boots and hi-vis only.']),
    seed('selecting a safety helmet for cabling work at height', 'Use a BS EN 397 compliant helmet.', 'Safety helmets should comply with the relevant standard, not just match a colour or brand.', ['Use a company-branded helmet.', 'Use a black helmet.', 'Use a yellow helmet.']),
    seed('identifying who must provide employee PPE', 'The employer.', 'Employer duties for PPE provision sit with the employer under health and safety law.', ['The employee.', 'The site storeman.', 'The site health and safety adviser.']),
    seed('checking ladders or steps before use', 'Inspect them daily before use.', 'The user should check access equipment before climbing it, even where local inspection systems also exist.', ['Inspect monthly.', 'Inspect weekly.', 'Inspect daily after use.']),
    seed('reporting near misses', 'Report near misses through the site process.', 'Near-miss reporting helps prevent repeat incidents before someone is injured.'),
    seed('using hearing protection', 'Wear hearing protection where the work or area assessment requires it.', 'Noise exposure can come from drilling, cutting, or nearby site activities.'),
    seed('controlling dust exposure', 'Use extraction, damping, or respiratory protection where drilling or dusty work requires it.', 'Dust controls should be selected before the task starts.'),
    seed('checking access equipment', 'Inspect steps, podiums, or towers before use.', 'Access equipment must be in safe condition and suitable for the task.'),
    seed('working near occupied areas', 'Segregate the work area and protect building users from tools, dust, and trailing leads.', 'Installers must consider the safety of others, not only their own team.'),
    seed('handling chemical products', 'Read the safety data and use controls required for cleaners, lubricants, or sealants.', 'Some products require gloves, ventilation, or special disposal.'),
    seed('maintaining first-aid awareness', 'Know the site first-aid process before work starts.', 'Quick access to first aid matters when cuts, eye injuries, or falls occur.'),
    seed('stopping unsafe work', 'Pause and escalate when conditions no longer match the agreed method.', 'A method statement only remains valid while actual conditions match the plan.'),
    seed('using mobile phones on site', 'Follow site rules and avoid distraction during safety-critical tasks.', 'Distraction can contribute to trips, falls, and tool injuries.'),
    seed('leaving the work area safe', 'Clear tools, waste, and temporary controls before leaving or handing over.', 'End-of-task housekeeping prevents hazards for other workers and building users.'),
  ],
  'Other Services': [
    seed('routing metallic IT cable close to power cable when the IT application is unknown', 'Keep at least 200mm separation.', 'The guide topic uses 200mm as the minimum separation where the IT cable specification or application is unknown.', ['Keep 50mm separation.', 'Keep 150mm separation.', 'Keep 500mm separation.']),
    seed('running data cables with screened power cables without separation', 'Limit the shared run to 35m.', 'The guide topic uses 35m as the maximum distance for this no-separation screened-power scenario.', ['40m.', '45m.', '50m.']),
    seed('separating screened backbone cabling from unscreened power cable with no divider', 'Keep at least 50mm separation.', 'The guide topic uses 50mm for screened backbone cabling next to unscreened power with no divider.', ['0mm.', '30mm.', '200mm.']),
    seed('crossing power cables with network infrastructure cable where crossing is necessary', 'Cross at right angles.', 'Right-angle crossing minimises parallel exposure and reduces electromagnetic interference risk.', ['Cross only where separated by a metal divider.', 'Cross only when screened cables are used.', 'Cross only where separated by an insulated divider.']),
    seed('routing metallic IT cable close to fluorescent luminaires', 'Keep at least 130mm separation.', 'The guide topic uses 130mm separation from fluorescent luminaires because they can be a source of interference.', ['30mm.', '50mm.', '100mm.']),
    seed('explaining why telecoms wiring and power cabling need separation', 'To prevent danger to persons from induced voltages.', 'Separation protects performance and safety. Induced voltage can create a personal safety risk.', ['To allow future telecoms expansion.', 'To provide maintenance workspace.', 'Only to identify cable types.']),
    seed('identifying the two factors behind the 50mm EMI separation recommendation', 'Power flowing through the power cable and physical distance from the telecommunications cabling.', 'EMI risk depends heavily on current in the power cable and distance from the communications cabling.', ['Power cable length and telecoms cable length.', 'Power flowing through the telecoms cable and distance from power.', 'Power flowing through the power cable and distance from containment.']),
    seed('choosing what does not reduce electrical interference on copper data cables', 'Installing unscreened twisted pair cables.', 'Screening, metallic containment and physical separation can help. Unscreened twisted pair alone is not an EMI-control method.', ['Installing screened twisted pair cables.', 'Installing mechanically and electrically continuous conduit.', 'Physically separating cables.']),
    seed('checking HSE guidance for buried telecommunications cable work', 'HSG47.', 'HSG47 is the HSE guidance document for avoiding danger from underground services.', ['HSR25.', 'GS38.', 'HSG85.']),
    seed('identifying which listed legal requirement does not apply to buried telecoms cable work near underground services', 'Work at Height Regulations 2005.', 'The guide topic distinguishes ordinary buried-service work from work-at-height requirements, except where pits or fall risks create height-related hazards.', ['Construction (Design and Management) Regulations 2007.', 'Pipelines Safety Regulations 1996.', 'Management of Health and Safety at Work Regulations 1999.']),
    seed('preparing to enter cable chambers for duct installation work', 'Test for explosive and noxious gases with a portable gas detector.', 'Underground chambers can contain invisible hazardous gases, so gas testing is required before entry.', ['Put up a tent against weather.', 'Remove chamber lids and start work.', 'Wear waterproof clothing only.']),
    seed('choosing a buried duct colour that is not suitable for telecommunications cable ductwork', 'Yellow.', 'The guide topic uses yellow as the unsuitable telecoms duct colour in the listed options.', ['White.', 'Black.', 'Grey.']),
    seed('using BS EN 50174-3 for telecoms cable below a footpath', 'Use 500mm as the minimum recommended depth.', 'The guide topic maps footpath burial depth to 500mm under BS EN 50174-3 Table 3.', ['250mm-450mm.', '450mm-600mm.', '600mm.']),
    seed('selecting a cable management system that can help protect data cabling from EMI', 'Metallic trunking.', 'A correctly installed metallic cable-management system can act as an earthed screen.', ['Plastic conduit.', 'Plastic trunking.', 'Non-metallic trunking.']),
    seed('using BS EN 50174-3 for telecoms cable below a road or carriageway', 'Use 600mm as the minimum recommended depth.', 'The guide topic maps road or carriageway burial depth to 600mm under BS EN 50174-3 Table 3.', ['250mm-350mm.', '750mm-1200mm.', '750mm.']),
  ],
  'Waste Management': [
    seed('checking whether a construction site should have a waste management policy', 'Yes, and it must be followed.', 'The guide topic treats the site waste-management policy as mandatory and controlling for disposal decisions.', ['Yes, but it is advisory only.', 'No, but it is good practice.', 'No, it is the individual worker responsibility.']),
    seed('disposing of empty cable boxes', 'Follow the company waste management policy.', 'Even where cardboard looks recyclable, the site/company policy controls the correct skip or collection route.', ['Leave them for the cleaner.', 'Put them in any recycling skip.', 'Put them in the general skip.']),
    seed('disposing of waste cable left on cable drums', 'Follow the company waste management policy.', 'Waste cable may be recyclable or handled under a site-specific contract, so the policy decides the route.', ['Keep it for scrap value.', 'Put it in the general skip.', 'Put it in any recycling skip.']),
    seed('emptying a fibre sharps bin', 'Send it away for specialist disposal.', 'Fibre shards are a specialist waste stream and should not be emptied into general or recycling skips.', ['Empty it into the general skip.', 'Empty it into the recycling skip.', 'Seal it in a bag and put it in a normal bin.']),
    seed('disposing of empty wooden cable drums', 'Follow the company waste management policy.', 'Many sites return drums for reuse or use a defined disposal route. Do not sell or improvise outside the policy.', ['Break them down before putting in a recycling skip.', 'Put them in the general site skip.', 'Sell them.']),
  ],
};

function seed(prompt: string, correct: string, explanation: string, distractors?: [string, string, string]): Seed {
  return { prompt, correct, explanation, distractors };
}

function toQuestion(section: QuestionSection, item: Seed, index: number): Question {
  const sectionNumber = sectionOrder.indexOf(section) + 1;
  const id = `nia-${sectionNumber.toString().padStart(2, '0')}-${(index + 1).toString().padStart(3, '0')}`;
  const correctAnswer = rotateCorrectAnswer(index);
  const distractors = item.distractors ?? distractorsBySection[section];
  const options = placeCorrectAnswer(correctAnswer, item.correct, distractors);

  return {
    id,
    section,
    question: `When ${item.prompt}, which option is the best installation decision?`,
    choices: options,
    correctAnswer,
    explanation: item.explanation,
  };
}

function rotateCorrectAnswer(index: number): AnswerChoice {
  return answerChoices[index % answerChoices.length];
}

function placeCorrectAnswer(
  correctAnswer: AnswerChoice,
  correct: string,
  distractors: [string, string, string],
): Record<AnswerChoice, string> {
  const wrongAnswers = [...distractors];
  const choices = {} as Record<AnswerChoice, string>;

  answerChoices.forEach((choice) => {
    choices[choice] = choice === correctAnswer ? correct : wrongAnswers.shift() ?? 'Ignore the issue and continue.';
  });

  return choices;
}

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

const distractorsBySection: Record<QuestionSection, [string, string, string]> = {
  'Product Selection': [
    'Choose the cheapest available cable if it physically fits the route.',
    'Use any cable with the same colour sheath as the existing installation.',
    'Rely on the installer preference rather than the specification or standard.',
  ],
  'Containment Systems': [
    'Install the containment as quickly as possible and correct any issues after handover.',
    'Use existing supports without checking loading, condition, or suitability.',
    'Treat containment appearance as more important than cable support and access.',
  ],
  'Cable Laying': [
    'Pull harder until the cable reaches the outlet, then test it later.',
    'Ignore bend radius during installation if the final route looks tidy.',
    'Leave identification until all terminations are complete.',
  ],
  'Cable Dressing': [
    'Tighten cable ties until the bundle cannot move at all.',
    'Hide spare cable behind equipment even if bend radius is reduced.',
    'Prioritise a flat-looking bundle over cable geometry and future maintenance.',
  ],
  'Fire Regulations': [
    'Leave openings unsealed if they are above a ceiling and not visible.',
    'Use any expanding foam because all foams provide the same fire rating.',
    'Assume fire stopping is someone else’s responsibility once cables are pulled.',
  ],
  'Safe Cable Installation': [
    'Continue work and rely on final testing to reveal any damage.',
    'Use nearby building services as convenient cable supports.',
    'Remove temporary controls early to save time.',
  ],
  'Personal Safety': [
    'Start work immediately and adjust the method if a problem occurs.',
    'Use personal judgement instead of the risk assessment and site rules.',
    'Continue the task because short-duration work does not need controls.',
  ],
  'Other Services': [
    'Move other services out of the way if they obstruct the cable route.',
    'Use pipework or ductwork as a fixing point for communications cable.',
    'Assume unidentified services are redundant if they are not labelled.',
  ],
  'Waste Management': [
    'Put all waste into one bag so the area looks clear quickly.',
    'Leave small offcuts in the ceiling void because they are not visible.',
    'Treat cable, packaging, and fibre shards as the same waste stream.',
  ],
};

export const questions: Question[] = Object.entries(sectionSeeds).flatMap(([section, seeds]) =>
  seeds.map((item, index) => toQuestion(section as QuestionSection, item, index)),
);
