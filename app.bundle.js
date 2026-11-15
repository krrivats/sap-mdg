/* SAP MDG Learning Lab — generated bundle. Edit the files in src/ then run: npm run build */
(() => {
'use strict';
/* src/learning.js */
function findLesson(allLessons, id) {
  return allLessons.find((lesson) => lesson.id === id);
}

function searchLessons(allLessons, query) {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return allLessons;
  return allLessons.filter((lesson) => {
    const searchable = [lesson.title, lesson.track, lesson.module, lesson.intro,
      ...(lesson.terms ?? []), ...(lesson.tags ?? [])].join(' ').toLocaleLowerCase();
    return searchable.includes(term);
  });
}

function summarizeProgress(allLessons, completedIds) {
  const completed = allLessons.filter((lesson) => completedIds.includes(lesson.id)).length;
  const total = allLessons.length;
  return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
}


/* src/content.js */
// Learning content, written in plain English. Short sentences + a real example in every lesson.
const L = (o) => o;

const lessons = [
  L({
    id: 'mdg-basics', track: 'Foundations', module: 'Start here', title: 'MDG in plain words', duration: '6 min', level: 'Beginner',
    intro: 'MDG is a controlled way to change important company data. Someone asks for a change. The right people check it. Then it goes live.',
    terms: ['master data', 'governance', 'change request', 'draft area', 'live area'],
    tags: ['basics', 'intro'],
    sections: [
      { k: 'p', t: 'In one line', b: 'MDG is a gate. Data must pass the gate before the whole company uses it.' },
      { k: 'example', t: 'A simple example', b: 'Ravi needs a new material, “Bolt A”. He does not create it in five systems. He sends one request. A data steward checks it. A manager approves it. Then it goes live once and is shared.' },
      { k: 'table', t: 'Two kinds of data', head: ['', 'Master data', 'Transaction data'], rows: [
        ['What it is', 'The things you reuse: who, what, where', 'One business event'],
        ['Examples', 'Material, supplier, customer, company code', 'A purchase order, an invoice, a goods receipt'],
        ['How often it changes', 'Slowly, and with care', 'Every day, all the time'],
        ['If it is wrong', 'Many transactions and reports go wrong', 'Usually only that one document is wrong']
      ] },
      { k: 'diagram', name: 'crFlow', caption: 'A request moves through review, approval, and go-live.' },
      { k: 'note', tone: 'why', t: 'Why this matters', b: 'If everyone can edit data directly, two teams may create the same material twice. A wrong value can reach accounting. Later, nobody knows who changed it. MDG stops that.' },
      { k: 'ul', t: 'What MDG gives you', items: [
        'A request that records what is being changed and why.',
        'A draft area. Unapproved data waits there. It is not live yet.',
        'Checks and approvals before anything goes live.',
        'A history: who asked, who changed, who approved, and when.',
        'A way to send approved data to other systems.'
      ] },
      { k: 'mnemonic', t: 'Memory hook: “One door in, one gate, many doors out.”', lines: ['One door in: one request.', 'One gate: checks and approvals.', 'Many doors out: approved data goes to every system that needs it.'] }
    ],
    recall: [{ q: 'Explain MDG in one sentence, without SAP words.', a: 'MDG is a controlled way to request, check, approve, and share important company data.' }],
    interview: [
      { q: 'Why not let every user edit master data directly?', a: 'Because nobody checks it. You can get duplicates, wrong values, and no history of who changed what. MDG adds checks, owners, and a record.' },
      { q: 'What is the difference between draft data and live data?', a: 'Draft data is still in a request and not approved. Live data is approved and ready for the business to use.' }
    ],
    practice: { title: 'Try it in your head', intro: 'No SAP system needed.', steps: ['Pick one thing you know, like a material or a vendor.', 'Write who would ask for it.', 'Write who would check it.', 'Write who would approve it.', 'Name one team that would be hurt by a wrong value.'], verify: ['You can name the requester, checker, approver, and user of the data.'], traps: ['“Approved” and “live” are not the same. Approval is a decision. Go-live makes it usable.'] }
  }),

  L({
    id: 'sap-landscape', track: 'Foundations', module: 'Start here', title: 'ECC, S/4HANA, and where MDG fits', duration: '7 min', level: 'Beginner',
    intro: 'ECC and S/4HANA are two generations of SAP ERP. MDG can sit in its own system (a hub) or in the same system as the business work.',
    terms: ['ECC', 'S/4HANA', 'hub', 'co-deployment', 'replication'],
    tags: ['landscape', 'architecture'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Before you click, know which system you are in. Is it the gate, or is it the warehouse?' },
      { k: 'example', t: 'A simple example', b: 'One company has a central MDG hub. It approves supplier data. Then it sends the approved data to an ECC system and an S/4HANA system. Both systems use the same supplier.' },
      { k: 'diagram', name: 'mdgLandscape', caption: 'A hub governs data for other systems. Co-deployment keeps governance and business work together.' },
      { k: 'table', t: 'Words in plain English', head: ['Word', 'What it means'], rows: [
        ['ECC', 'An older SAP ERP system. Many companies still use it.'],
        ['S/4HANA', 'The newer SAP ERP system. It runs on the HANA database.'],
        ['Hub', 'A central system where MDG approves data for other systems.'],
        ['Co-deployment', 'MDG and the business work run in the same SAP system.'],
        ['Connected system', 'Another system that sends data to MDG or receives data from it.']
      ] },
      { k: 'note', tone: 'warn', t: 'Check these before you click', b: 'Product and release. System ID and client. Hub or connected system. Your role and permissions. If you are not sure, stop and ask.' },
      { k: 'mnemonic', t: 'Memory hook: “S.S.C.R.”', lines: ['System: which system am I in?', 'Scope: hub or connected?', 'Client: training or production?', 'Role: what am I allowed to do?'] }
    ],
    recall: [{ q: 'What four things should you check before following a click path?', a: 'The system, the scope (hub or connected), the client, and your role.' }],
    interview: [
      { q: 'Does ECC experience mean S/4HANA MDG looks the same?', a: 'No. The ideas are similar, but screens, releases, and setup can be different. Always check the release.' },
      { q: 'What is replication?', a: 'Sending approved data from MDG to another system that needs it.' }
    ],
    practice: { title: 'Draw your landscape', intro: 'Do this with your trainer.', steps: ['Draw three boxes: MDG, the system that owns the data, and a system that uses the data.', 'Draw an arrow for where a request starts.', 'Draw an arrow for where approved data goes.', 'Write the system ID and client under each box.'], verify: ['You can point to the system where you will create a request.'], traps: ['Never practise in production. Ask which client is safe.'] }
  }),

  L({
    id: 'governance-cycle', track: 'Foundations', module: 'Start here', title: 'The change-request journey', duration: '8 min', level: 'Beginner',
    intro: 'A change request (CR) is the envelope that carries a data change from “please change this” to “done and live”.',
    terms: ['change request', 'status', 'activation', 'workflow'],
    tags: ['process', 'workflow', 'basics'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A request has six moments: ask, fill, check, review, decide, and go live.' },
      { k: 'example', t: 'A simple example', b: 'Priya asks for a new material. She fills the details. The system checks for missing fields. A data steward reviews it. A manager approves it. Then the material goes live.' },
      { k: 'diagram', name: 'crFlow', caption: 'The six moments of a change request.' },
      { k: 'ol', t: 'The six moments', items: [
        'Ask: choose a request type and say why.',
        'Fill: type the new data into the draft area.',
        'Check: run the system checks. Fix red messages.',
        'Review: send the request to the right team.',
        'Decide: approve, reject, or send it back.',
        'Go live: make the approved data active. It may then be sent to other systems.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview trap', b: 'Approved is not the same as live. Approved means “yes”. Live means “usable”. Sending to another system is a third step. Each step can fail on its own.' },
      { k: 'table', t: 'Status names you may see', head: ['Moment', 'Possible status'], rows: [
        ['Created', 'Draft / in process'], ['Sent', 'In review / in approval'], ['Sent back', 'Returned for correction'], ['Approved', 'Approved, not live yet'], ['Live', 'Active'], ['Rejected', 'Stopped, with a reason']
      ] }
    ],
    recall: [{ q: 'Name the six moments of a change request.', a: 'Ask, fill, check, review, decide, go live.' }],
    interview: [
      { q: 'What should a good change request record?', a: 'What is changing, why, who asked, who checked, who approved, and when.' },
      { q: 'A request is approved, but the other system did not change. What do you check?', a: 'First, is it live? Second, did the send step work? Third, check the connection and the error log.' }
    ],
    practice: { title: 'Map a real approval', intro: 'Use a process you already know.', steps: ['Write the request type.', 'List each team that touches it.', 'Mark where it can be rejected or sent back.', 'Mark the exact moment it goes live.'], verify: ['Your drawing shows a reject path, not only the happy path.'], traps: ['A process with no reject path is not finished.'] }
  }),

  L({
    id: 'deployment-patterns', track: 'Foundations', module: 'Landscape choices', title: 'Hub and co-deployment', duration: '8 min', level: 'Beginner',
    intro: '“Hub” means MDG sits in a central system. “Co-deployment” means MDG sits in the same system as the business work.',
    terms: ['hub deployment', 'co-deployment', 'replication', 'source of truth'],
    tags: ['architecture', 'landscape'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Hub is a head office. Co-deployment is one office doing both jobs.' },
      { k: 'example', t: 'A simple example', b: 'A group has one MDG hub. Three factories send requests to it. The hub approves the data and sends it back to each factory system.' },
      { k: 'diagram', name: 'mdgLandscape', caption: 'Hub versus co-deployment.' },
      { k: 'table', t: 'The difference', head: ['Question', 'Hub', 'Co-deployment'], rows: [
        ['Where is the request?', 'In the central MDG system', 'In the same system as the business work'],
        ['Where does approved data go?', 'To one or more connected systems', 'Usually used in the same system'],
        ['Good point', 'One central gate', 'Fewer systems and fewer hops'],
        ['Watch out', 'Connections and delays', 'More load on one system']
      ] },
      { k: 'note', tone: 'warn', t: 'Do not change this alone', b: 'This is an architecture choice. It affects connections, data ownership, and operations. Your project or system team owns it.' },
      { k: 'mnemonic', t: 'Memory hook: “Head office or one office.”', lines: ['Hub = head office approves for many branches.', 'Co-deployment = the branch and the approver share one office.'] }
    ],
    recall: [{ q: 'What is the main difference between hub and co-deployment?', a: 'A hub is a separate central system. Co-deployment uses the same system for MDG and the business work.' }],
    interview: [
      { q: 'What is one design question for a hub?', a: 'Which system is the trusted source? How does approved data reach the other systems?' },
      { q: 'Why is it risky if a connected system edits the same record?', a: 'Two systems may show different values. Then nobody knows which one is correct.' }
    ],
    practice: { title: 'Spot the pattern', intro: 'Read a landscape picture and decide.', steps: ['Count the systems.', 'Find where the request starts.', 'Find where the live record is stored.', 'Name one connection risk.'], verify: ['You can say “hub” or “co-deployment” and explain why.'], traps: ['One landscape can use both patterns for different data.'] }
  }),

  /* ───────────────────────── DATA MODELING ───────────────────────── */

  L({
    id: 'dm-overview', track: 'Data modeling', module: 'Model the data', title: 'What is an MDG data model?', duration: '9 min', level: 'Core',
    intro: 'A data model is the plan for the data. It says which things you store, which fields they have, and how they connect.',
    terms: ['data model', 'entity type', 'attribute', 'relationship', 'draft area', 'live area'],
    tags: ['data model', 'entity', 'attribute', 'relationship', 'fundamentals'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A data model is a building plan. MDG uses it to build the tables that hold your data.' },
      { k: 'example', t: 'A simple example', b: 'Think of a material. It has a number and a description. It also has plant data. The number and description belong to “Material”. The plant data belongs to “Material–Plant”. That is a small data model.' },
      { k: 'diagram', name: 'anatomy', caption: 'A data model has three parts: things, fields, and links.' },
      { k: 'ul', t: 'The three parts', items: [
        'Entity type: the thing. Example: Material, Supplier, Material–Plant.',
        'Attribute: a field on that thing. Example: material number, description, unit.',
        'Relationship: a link between two things. Example: Material → Plant.'
      ] },
      { k: 'diagram', name: 'activeStaging', caption: 'Draft data waits in the staging area. Approved data moves to the active area.' },
      { k: 'table', t: 'Two areas', head: ['Area', 'What is inside', 'Who sees it'], rows: [
        ['Staging area', 'Data that is not approved yet', 'People working on the request'],
        ['Active area', 'Data that is approved and live', 'Business users and other systems']
      ] },
      { k: 'note', tone: 'why', t: 'Why model first', b: 'The screens show the model. The workflow approves data in the model. If the model is wrong, the screens and the workflow are wrong too.' },
      { k: 'diagram', name: 'layers', caption: 'Build in this order: data, then screens, then process.' },
      { k: 'mnemonic', t: 'Memory hook: “Thing, field, link.”', lines: ['Thing: what are we describing?', 'Field: what do we know about it?', 'Link: how does it connect to another thing?'] }
    ],
    recall: [{ q: 'What are the three parts of a data model?', a: 'Entity types (things), attributes (fields), and relationships (links).' }],
    interview: [
      { q: 'What does a data model decide?', a: 'It decides the key fields and the normal fields of the tables that store the data.' },
      { q: 'What is the difference between the staging area and the active area?', a: 'Staging holds draft data inside a request. Active holds approved data that the business can use.' }
    ],
    practice: { title: 'Sketch a mini model', intro: 'Use something you know, like a book or a car.', steps: ['Name one thing.', 'List three fields. Mark the key field.', 'Name one linked thing.', 'Say what one record means in one sentence.'], verify: ['Someone else can read your sketch and explain what one record is.'], traps: ['Do not put everything into one thing. Group by meaning.'] }
  }),

  L({
    id: 'dm-modes', track: 'Data modeling', module: 'Model the data', title: 'Reuse mode vs flex mode', duration: '8 min', level: 'Core',
    intro: 'Reuse mode stores live data in tables that already exist. Flex mode lets MDG build its own tables. Draft data is in MDG either way.',
    terms: ['reuse mode', 'flex mode', 'active area', 'reuse class', 'generated tables', 'data model 0G'],
    tags: ['reuse', 'flex', 'active area', 'modes'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Reuse means “use the old house”. Flex means “build a new house”.' },
      { k: 'example', t: 'A simple example', b: 'Material data already lives in tables MARA and MARC. Reuse mode uses those tables. A custom object has no such table. Flex mode lets MDG create one.' },
      { k: 'diagram', name: 'reuseFlex', caption: 'Reuse uses existing tables. Flex creates tables from the model.' },
      { k: 'table', t: 'Side by side', head: ['', 'Reuse mode', 'Flex mode'], rows: [
        ['Live data is in', 'Existing tables, like MARA and MARC', 'New tables built by MDG'],
        ['The table shape comes from', 'The old application', 'Your data model'],
        ['Extra code needed', 'Often yes, to read the old tables', 'No, MDG can read its own tables'],
        ['Common use', 'Most S/4HANA MDG areas and custom objects', 'MDG Financials (model 0G) and the default for custom objects'],
        ['Freedom to add fields', 'Limited by the old tables', 'High']
      ] },
      { k: 'note', tone: 'exam', t: 'Say it correctly in an interview', b: 'SAP says reuse is used for the MDG areas in S/4HANA and for custom objects, except MDG Financials. Flex is used for MDG Financials (model 0G) and is the default for custom objects. Always check your release.' },
      { k: 'mnemonic', t: 'Memory hook: “Reuse the house, or build the house.”', lines: ['Reuse: you move into an old house and keep its rooms.', 'Flex: MDG builds rooms to your plan.'] },
      { k: 'note', tone: 'warn', t: 'This is not a small switch', b: 'Changing the mode later can affect storage, connections, and custom code. Ask your architect.' }
    ],
    recall: [{ q: 'Which mode builds its own live tables?', a: 'Flex mode. Reuse mode uses tables that already exist.' }],
    interview: [
      { q: 'What is the difference between reuse and flex?', a: 'Reuse uses old application tables for live data. Flex creates new tables from the data model.' },
      { q: 'Where is draft data stored in both modes?', a: 'In MDG staging tables, inside the change request.' }
    ],
    practice: { title: 'Choose with evidence', intro: 'Do not choose by the name alone.', steps: ['Name the data object.', 'Ask: does a real table already exist?', 'Check whether your release supports it.', 'Write one sentence that explains your choice.'], verify: ['Your note gives a reason, not a feeling.'], traps: ['“Flex sounds easier” is not a reason.'] }
  }),

  L({
    id: 'dm-entity-types', track: 'Data modeling', module: 'Model the data', title: 'Entity types and the four storage/use types', duration: '11 min', level: 'Core',
    intro: 'An entity type is one thing in your model. MDG gives it a type from 1 to 4. The number decides if it has its own key, where it is stored, and which links it can have.',
    terms: ['entity type', 'storage type', 'type 1', 'type 2', 'type 3', 'type 4', 'dependent entity'],
    tags: ['entity type', 'storage type', 'type 1', 'type 2', 'type 3', 'type 4'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Type 1 is the main thing. Type 2 and 3 are pick lists. Type 4 is a child that cannot live alone.' },
      { k: 'example', t: 'A simple example', b: 'Material is type 1. It has its own number. Material–Plant is type 4. It only makes sense with a material. Plant is type 3. It is a pick list that already exists outside MDG.' },
      { k: 'diagram', name: 'types', caption: 'The four types at a glance.' },
      { k: 'table', t: 'The four types', head: ['Type', 'What it is for', 'Own key?', 'Stored where?', 'Links it can start'], rows: [
        ['1', 'Main objects. More than one is allowed in a model.', 'Yes', 'New tables', 'Leading and referencing only. No qualifying.'],
        ['2', 'Pick lists kept inside MDG. No extra fields.', 'Yes', 'New tables', 'Leading'],
        ['3', 'Pick lists kept outside MDG. No extra fields.', 'Yes', 'No new tables. Not changed in MDG.', 'Used as a reference'],
        ['4', 'Child data: extra details or a qualified view of a type 1.', 'No', 'New tables. Fields and links allowed. No data element.', 'Leading, qualifying, referencing']
      ] },
      { k: 'note', tone: 'exam', t: 'The type 4 rules', b: 'No key of its own. Exactly one leading link to a type 1. One qualifying link is required. Any other links must be qualifying or referencing. Its key must include at least one type 1, 2, or 3. On the screen, it is always shown with its type 1.' },
      { k: 'table', t: 'Material example', head: ['Data', 'Entity type', 'Type', 'Why'], rows: [
        ['Material general data', 'Material', '1', 'It has its own key: the material number'],
        ['Material–Plant data', 'Material–Plant', '4', 'It needs a material. Its key is material + plant.'],
        ['Plant', 'Plant', '3', 'It is a pick list kept outside MDG'],
        ['A small Z priority list', 'Z Priority', '2', 'It is a pick list kept inside MDG']
      ] },
      { k: 'mnemonic', t: 'Memory hook: “1 Root, 2 In, 3 Out, 4 Under.”', lines: ['1 Root: the main object.', '2 In: pick list inside MDG.', '3 Out: pick list outside MDG.', '4 Under: child under a type 1.'] },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Do not make everything type 1. Ask: can this thing exist on its own? If not, it is probably type 4.' }
    ],
    recall: [{ q: 'Which entity type has no key of its own?', a: 'Type 4, the dependent entity type.' }],
    interview: [
      { q: 'Explain the four storage and use types.', a: 'Type 1 is the main object with its own key. Type 2 is a pick list inside MDG. Type 3 is a pick list outside MDG. Type 4 is child data with no key of its own, shown under a type 1.' },
      { q: 'Which links can a type 1 start?', a: 'Leading and referencing. Not qualifying.' },
      { q: 'Why can a type 4 not be shown alone on a screen?', a: 'It has no key of its own. It needs its type 1 to identify a record.' }
    ],
    practice: { title: 'Classify four things', intro: 'Use what you know.', steps: ['Material general data: which type?', 'Material–Plant: which type?', 'Plant: which type?', 'A Z priority list kept in MDG: which type?'], verify: ['Material = 1, Material–Plant = 4, Plant = 3, Z priority = 2.'], traps: ['Not every pick list is type 2. Check if it is kept inside or outside MDG.'] }
  }),

  L({
    id: 'dm-attributes', track: 'Data modeling', module: 'Model the data', title: 'Fields: keys, data elements, and value help', duration: '10 min', level: 'Core',
    intro: 'A field is one fact about a thing. Some fields identify the record. The rest describe it. A good field has a clear meaning and a rule for valid values.',
    terms: ['field', 'key field', 'data element', 'domain', 'required field', 'value help'],
    tags: ['attribute', 'key', 'data element', 'domain', 'required'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A key field says which record. A normal field says something about it.' },
      { k: 'example', t: 'A simple example', b: 'For a material, “Material Number” is the key. “Description” and “Unit of Measure” are normal fields. The unit field should only accept real units, like KG or PC.' },
      { k: 'table', t: 'Kinds of fields', head: ['Kind', 'What it means', 'Example'], rows: [
        ['Key field', 'Finds one exact record', 'Material number, supplier ID'],
        ['Normal field', 'Describes the record', 'Description, country, unit'],
        ['Reference field', 'Points to another object', 'Company code'],
        ['Hierarchy field', 'Extra data on a hierarchy link', 'Valid from, weight']
      ] },
      { k: 'note', tone: 'exam', t: 'Data element vs domain', b: 'The data element gives the business name and the label. Example: “Unit of Measure”. The domain gives the technical type and often the list of allowed values. That is why the right data element gives you the right help for free.' },
      { k: 'diagram', name: 'valueHelp', caption: 'A field, its check table, and its F4 help.' },
      { k: 'ul', t: 'Decide these five things for every field', items: [
        'What does it mean, in one sentence?',
        'What type is it: text, number, date, or quantity?',
        'Is it required? For which step or role?',
        'What values are allowed? Fixed list, check table, or search help?',
        'Who owns it and may change it?'
      ] },
      { k: 'mnemonic', t: 'Memory hook: “M.T.R.V.O.”', lines: ['Meaning', 'Type', 'Required?', 'Value help', 'Owner'] },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Do not add a field just because it is on an old screen. Ask which business decision needs it.' }
    ],
    recall: [{ q: 'What does a data element give you?', a: 'The business name, the field label, the technical type through its domain, and often value help.' }],
    interview: [
      { q: 'What is the difference between a key field and a normal field?', a: 'A key field finds one record. A normal field describes the record.' },
      { q: 'Why not create every possible field at the start?', a: 'Extra fields make the screen noisy and the process slower. Add only what the business needs.' }
    ],
    practice: { title: 'Write a field contract', intro: 'Pick one field, like Unit of Measure.', steps: ['Write what it means.', 'Name its data element.', 'Say if it is required.', 'Name its value help.', 'Name its owner.'], verify: ['All five lines are filled, not just the field name.'], traps: ['“It is obvious” is not a definition.'] }
  }),

  L({
    id: 'dm-relationships', track: 'Data modeling', module: 'Model the data', title: 'Links: leading, qualifying, referencing', duration: '12 min', level: 'Core',
    intro: 'A relationship is a link between two entity types. It says how they depend on each other. MDG has three link types you must know.',
    terms: ['relationship', 'leading relationship', 'qualifying relationship', 'referencing relationship', 'cardinality'],
    tags: ['relationship', 'leading', 'qualifying', 'referencing', 'association'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Leading gives the context. Qualifying adds key fields. Referencing copies a key in as a field.' },
      { k: 'example', t: 'A simple example', b: 'Material → Material–Plant is leading. It says “this plant data belongs to this material”. Plant → Material–Plant is qualifying. It adds plant to the key. A company code field is referencing. It copies the company code key in.' },
      { k: 'diagram', name: 'relationships', caption: 'The three link types in one picture.' },
      { k: 'table', t: 'The three link types', head: ['Type', 'What it does', 'Direction', 'Example'], rows: [
        ['Leading', 'Says which record owns the context. A type 1 can lead a type 1 or a type 4. A type 4 must have a leading type 1.', 'Type 1 → type 1 or 4', 'Material → Material–Plant'],
        ['Qualifying', 'Adds more key fields to the child. Type 2 and 3 can add keys to type 1 and 4. A type 4 key must include at least one type 1, 2, or 3.', 'Type 2/3 → type 1/4', 'Plant → Material–Plant'],
        ['Referencing', 'Copies the other object key in as a field. The from-object becomes a required field on the to-object.', 'Any → any', 'Company code on a record']
      ] },
      { k: 'note', tone: 'exam', t: 'The rule that separates leading and qualifying', b: 'The difference only matters when the child is type 4. The leading link sets the context. The qualifying link supplies the extra key fields. Both are needed.' },
      { k: 'table', t: 'What each type can start', head: ['From type', 'Leading', 'Qualifying', 'Referencing'], rows: [
        ['1', 'Yes', 'No', 'Yes'], ['2', 'Yes', '—', '—'], ['3', '—', 'Yes', 'Yes'], ['4', 'Yes', 'Yes', 'Yes']
      ] },
      { k: 'mnemonic', t: 'Memory hook: “L-Q-R”', lines: ['L = Leading: who owns the record?', 'Q = Qualifying: what else is in the key?', 'R = Referencing: which key is copied in?'] }
    ],
    recall: [{ q: 'Which link adds extra key fields to a type 4?', a: 'The qualifying link.' }],
    interview: [
      { q: 'What is the difference between leading and qualifying?', a: 'Leading gives the context for the child. Qualifying adds the extra key fields that identify the child.' },
      { q: 'What does a referencing link do?', a: 'It copies the other object key in as a field on this object.' },
      { q: 'Can a type 1 start a qualifying link?', a: 'No. A type 1 can start only leading and referencing links.' }
    ],
    practice: { title: 'Draw Material–Plant', intro: 'The classic three-object picture.', steps: ['Make Material (type 1).', 'Make Material–Plant (type 4).', 'Make Plant (type 3).', 'Draw Material → Material–Plant as leading, 1:N.', 'Draw Plant → Material–Plant as qualifying, 1:N.', 'Say the final key out loud.'], verify: ['The Material–Plant key is material number + plant.'], traps: ['Do not make Material–Plant a type 1. It cannot live alone.'] }
  }),

  L({
    id: 'dm-cardinality', track: 'Data modeling', module: 'Model the data', title: 'How many? Cardinality and type-4 rules', duration: '8 min', level: 'Core',
    intro: 'Cardinality answers one question: how many records on one side can link to records on the other side?',
    terms: ['cardinality', '1:1', '1:N', 'N:1', 'N:M', 'leading relationship', 'qualifying relationship'],
    tags: ['cardinality', 'relationship', 'type 4'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Read it from the left: “one material has many plant records.”' },
      { k: 'example', t: 'A simple example', b: 'One material can have plant data for Delhi, Mumbai, and Pune. That is 1:N. Each plant record still belongs to one material.' },
      { k: 'diagram', name: 'cardinality', caption: 'Cardinality and the type-4 rule.' },
      { k: 'table', t: 'The four options', head: ['Cardinality', 'Meaning', 'Example'], rows: [
        ['1:1', 'One on each side', 'A record and its single header'],
        ['1:N', 'One parent, many children', 'Material and its plant records'],
        ['N:1', 'Many parents, one child', 'Many records point to one company code'],
        ['N:M', 'Many on both sides', 'Rare in MDG. Usually needs a link object.']
      ] },
      { k: 'note', tone: 'exam', t: 'The type-4 checklist', b: 'No own key. One leading link. One qualifying link. Any other links must be qualifying or referencing. The key must include a type 1, 2, or 3. Show it with its type 1 on the screen.' },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Do not pick 1:N because “there could be many”. Ask the business: can one parent really have many children?' }
    ],
    recall: [{ q: 'What does 1:N mean for Material → Material–Plant?', a: 'One material can have many plant records. Each plant record belongs to one material.' }],
    interview: [
      { q: 'What is the type-4 link rule?', a: 'One leading link and one qualifying link are required. Other links must be qualifying or referencing.' },
      { q: 'How do you choose between 1:N and 1:1?', a: 'Ask the business if one parent can have more than one child. Use the real rule, not a guess.' }
    ],
    practice: { title: 'Test the rule', intro: 'Spot the link that is not allowed.', steps: ['Make Material (1) → Material–Plant (4) leading.', 'Add Plant (3) → Material–Plant qualifying.', 'Try to add a second leading link.', 'Explain why it fails.'], verify: ['You can say “one leading, one qualifying”.'], traps: ['Extra keys come from qualifying links, not another leading link.'] }
  }),

  L({
    id: 'model-associations', track: 'Data modeling', module: 'Model the data', title: 'Associations and reference fields', duration: '8 min', level: 'Core',
    intro: 'An association is a link used to move around the data, for example from a supplier to its contacts. A reference field is a field that holds another object key.',
    terms: ['association', 'entity-type attribute', 'reference', 'navigation'],
    tags: ['association', 'entity type attribute', 'reference', 'navigation'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A relationship is structure. An association is a path. A reference field is a copied key.' },
      { k: 'example', t: 'A simple example', b: 'In the screen, you click a supplier and jump to its contacts. That jump is an association. A field that stores the company code value is a reference field.' },
      { k: 'table', t: 'Three things that sound similar', head: ['Thing', 'Main job', 'Where you see it'], rows: [
        ['Relationship', 'Sets dependency and key structure', 'Data model'],
        ['Association', 'Lets the user move from one object to another', 'Screen, search, reports'],
        ['Reference field', 'Holds another object key as a field', 'Field list']
      ] },
      { k: 'note', tone: 'exam', t: 'Do not over-model', b: 'If you only need to store a code, a reference field or a referencing link is enough. Do not build a new object for every code.' },
      { k: 'note', tone: 'warn', t: 'Check your release', b: 'The exact names and places for associations can differ by release and UI technology. Check the option in your system.' }
    ],
    recall: [{ q: 'What is an association used for?', a: 'To move from one object to another, for example in a screen or search.' }],
    interview: [
      { q: 'When does a link need its own object?', a: 'When the link itself has fields, dates, or a life of its own that must be governed.' },
      { q: 'How is a reference field different from a relationship?', a: 'A reference field stores another object key. A relationship defines dependency and key structure.' }
    ],
    practice: { title: 'Pick the lightest tool', intro: 'Choose relationship, association, or reference field.', steps: ['A material must belong to a plant. Which one?', 'A user should jump from a supplier to its contacts. Which one?', 'A record must store a company code. Which one?'], verify: ['Relationship for dependency, association for navigation, reference field for a stored key.'], traps: ['Do not build a full object for a simple code.'] }
  }),

  L({
    id: 'dm-hierarchies', track: 'Data modeling', module: 'Model the data', title: 'Hierarchies: parent and child', duration: '7 min', level: 'Core',
    intro: 'A hierarchy shows which record sits above which. MDG stores these parent–child links in a separate hierarchy table.',
    terms: ['hierarchy', 'hierarchy table', 'parent', 'child', 'hierarchy attribute'],
    tags: ['hierarchy', 'parent child', 'version'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A hierarchy is a family tree for records.' },
      { k: 'example', t: 'A simple example', b: 'A cost centre tree has “Total” at the top. Under it are “North” and “South”. Under North are two leaf cost centres. Each link can also store its own data, like a valid-from date.' },
      { k: 'diagram', name: 'hierarchy', caption: 'A parent–child hierarchy.' },
      { k: 'p', t: 'How to turn it on', b: 'On the entity type, change the Hierarchies setting from “No hierarchy” to another value. MDG then creates a hierarchy table. A hierarchy can depend on a name, a version, or an edition.' },
      { k: 'ul', t: 'What you can store', items: [
        'Parent–child links between records of the same type.',
        'Links to other allowed types, for mixed trees.',
        'Extra data on the link, such as valid-from or weight.',
        'Ranges as leaves, if the business needs them.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'Hierarchies are switched on per entity type. The link data is stored in the hierarchy table, not on the main record.' },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Do not store the parent as a plain text field. Use the hierarchy feature so MDG can check and show the tree.' }
    ],
    recall: [{ q: 'How do you switch on a hierarchy?', a: 'Set the Hierarchies option to something other than “No hierarchy”.' }],
    interview: [
      { q: 'What is a hierarchy attribute?', a: 'Extra data stored on the link, such as a valid-from date or a weight. It is not data on the record itself.' },
      { q: 'Name two ways a hierarchy can depend.', a: 'On a name and on a version. It can also depend on an edition.' }
    ],
    practice: { title: 'Model a cost-centre tree', intro: 'A quick paper exercise.', steps: ['Pick a top node.', 'Add two children.', 'Add two leaves under one child.', 'Decide if each link needs a valid-from date.'], verify: ['You can explain why the link needs its own data.'], traps: ['A plain parent text field cannot be checked or shown as a tree.'] }
  }),

  L({
    id: 'dm-keys-valuehelp', track: 'Data modeling', module: 'Model the data', title: 'Keys, check tables, value tables, and F4 help', duration: '9 min', level: 'Core',
    intro: 'Keys find records. Check tables stop bad values. Value tables suggest those checks. Search helps give users an F4 list.',
    terms: ['key', 'check table', 'value table', 'domain', 'search help', 'F4 help'],
    tags: ['key', 'check table', 'value table', 'search help', 'F4'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A check table is a bouncer. A search help is a menu. A value table suggests which bouncer to use.' },
      { k: 'example', t: 'A simple example', b: 'The unit field should accept only real units. The check table T006 holds the valid units. When the user presses F4, a search help shows the list.' },
      { k: 'diagram', name: 'valueHelp', caption: 'Field → check table → search help.' },
      { k: 'table', t: 'Four things that work together', head: ['Thing', 'What it does', 'Where it lives'], rows: [
        ['Key', 'Finds one record', 'Entity type or table key'],
        ['Check table', 'Checks that a value exists', 'Domain, foreign key, or data element'],
        ['Value table', 'Suggests the check table', 'Domain'],
        ['Search help', 'Shows an F4 list', 'Data element or field']
      ] },
      { k: 'note', tone: 'exam', t: 'Where can a search help be attached?', b: 'To fields, hierarchy fields, and entity types of type 1 with their own data element, type 2, and type 3. If two types share a field name, attach the same help to both or to neither.' },
      { k: 'mnemonic', t: 'Memory hook: “Element → domain → value table → check table.”', lines: ['The data element gives the meaning.', 'The domain gives the type.', 'The value table suggests the check table.', 'The check table does the real check.'] }
    ],
    recall: [{ q: 'Which table checks a value, and which table suggests it?', a: 'The check table checks. The value table on the domain suggests it.' }],
    interview: [
      { q: 'What is the difference between a check table and a value table?', a: 'A check table actually checks the value. A value table is stored on the domain and is suggested as the check table.' },
      { q: 'What is a search help for?', a: 'It gives the user an F4 list to pick a valid value.' }
    ],
    practice: { title: 'Trace a field', intro: 'Use Unit of Measure.', steps: ['Find the data element.', 'Find the domain.', 'Find the value table.', 'Find the check table.', 'Press F4 and look at the list.'], verify: ['You can draw the four-step chain from memory.'], traps: ['A search help is not a check. It helps the user choose. The check table still enforces the rule.'] }
  }),

  L({
    id: 'dm-config', track: 'Data modeling', module: 'Model the data', title: 'Build a custom Z data model: step by step', duration: '12 min', level: 'Core',
    intro: 'This is the setup path you will use in the system. Names can differ a little by release. Check each step with your trainer.',
    terms: ['SPRO', 'IMG', 'Edit Data Model', 'transport', 'activate', 'staging area', 'Z namespace'],
    tags: ['configuration', 'SPRO', 'IMG', 'custom model', 'steps'],
    sections: [
      { k: 'p', t: 'The path', b: 'SPRO → Master Data Governance → General Settings → Data Modeling → Edit Data Model. Use a name that starts with Y or Z.' },
      { k: 'example', t: 'A simple example', b: 'Make a model called “Z Training Equipment”. Add a type 1 object, a type 4 detail, and a type 3 pick list. Then add the links and activate it.' },
      { k: 'diagram', name: 'configSteps', caption: 'The eight-step loop.' },
      { k: 'ol', t: 'Do it in this order', items: [
        'Create the model: name, description, and mode.',
        'Create the entity types: choose type 1, 2, 3, or 4 for each.',
        'Add fields: data element, key, required, and value help.',
        'Add links: leading, qualifying, or referencing. Set how many.',
        'Save. Read the check messages.',
        'Activate the model.',
        'Adjust the staging area so the tables match the model.',
        'Open the model picture and check it.'
      ] },
      { k: 'note', tone: 'warn', t: 'Before you save', b: 'Use a transport. Work in a development or training client. Do not create customer objects in the SAP name space. Ask your team for the naming rules.' },
      { k: 'table', t: 'What “good” looks like', head: ['Step', 'A good result'], rows: [
        ['Model', 'Clear description, correct mode, Z or Y name'],
        ['Entity types', 'Each type 1–4 has a reason'],
        ['Fields', 'Each has a data element, required flag, and value help'],
        ['Links', 'Leading, qualifying, or referencing is chosen on purpose'],
        ['Check', 'No red messages. You understand the yellow ones.'],
        ['Activate', 'The model is active'],
        ['Staging', 'Adjusted with no errors'],
        ['Picture', 'It matches the business explanation']
      ] }
    ],
    recall: [{ q: 'What is the SPRO path for the data model?', a: 'Master Data Governance → General Settings → Data Modeling → Edit Data Model.' }],
    interview: [
      { q: 'What do you do right after saving a data model?', a: 'Read the check messages. Then activate, adjust the staging area, and check the model picture.' },
      { q: 'Why use a Z or Y name?', a: 'Customer objects must stay in the customer name space, away from SAP objects.' }
    ],
    practice: { title: 'Dry run on paper', intro: 'Do this before you touch the system.', steps: ['Write the model name and description.', 'Write each object and its type.', 'Write each field and its data element.', 'Write each link and how many.', 'List the checks you expect.'], verify: ['Someone else can read your paper model without asking you questions.'], traps: ['Do not skip the staging adjustment. The tables must match the model.'] }
  }),

  L({
    id: 'dm-worked-example', track: 'Data modeling', module: 'Model the data', title: 'Worked example: from tables to a model', duration: '10 min', level: 'Core',
    intro: 'A good way to learn modelling is to start from real tables. Ask: which table is the parent? Which table is the child? Which table is a pick list?',
    terms: ['worked example', 'derive model', 'flight model', 'root object'],
    tags: ['example', 'worked example', 'flight', 'derive'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Parent first, child second, pick lists third, then the links.' },
      { k: 'example', t: 'A simple example', b: 'A customer table is the parent. A customer–agency table is the child. A travel agency table is a pick list. So: Customer = type 1, Customer–agency = type 4, Travel agency = type 3.' },
      { k: 'table', t: 'A flight-style model', head: ['Table', 'What it is', 'Type'], rows: [
        ['Customer', 'The main object', '1'],
        ['Business partner', 'Another main object', '1'],
        ['Travel agency', 'A pick list kept outside MDG', '3'],
        ['Customer–agency', 'A child with its own extra key', '4']
      ] },
      { k: 'ul', t: 'The links', items: [
        'Customer → Customer–agency: leading, 1:N.',
        'Travel agency → Customer–agency: qualifying, 1:N.',
        'Customer → Business partner: referencing or leading, depending on the business rule.',
        'A simple code value: a reference field, not a whole new object.'
      ] },
      { k: 'note', tone: 'tip', t: 'Learn the method, not the table names', b: 'You will not be tested on the flight tables. You will be tested on the method: parent, child, pick list, links, and how many.' },
      { k: 'note', tone: 'exam', t: 'A strong interview sentence', b: 'I start from the real tables. I find the parent, the child, and the pick lists. Then I choose leading, qualifying, or referencing based on what each link must do.' }
    ],
    recall: [{ q: 'What four questions do you ask when you derive a model?', a: 'What is the parent? What is the child? What is a pick list? How are they linked, and how many?' }],
    interview: [
      { q: 'How do you derive a data model from existing tables?', a: 'Find the parent, child, and pick-list tables. Give each a storage type. Then add the links and set how many records can connect.' },
      { q: 'Why start from tables instead of a blank page?', a: 'The tables show the real keys and dependencies. That reduces mistakes.' }
    ],
    practice: { title: 'Do your own derivation', intro: 'Pick three related tables you know.', steps: ['Name the parent.', 'Name the child.', 'Name the pick list.', 'Draw the links.', 'Give each one a type.'], verify: ['Every link has a type and a “how many”.'], traps: ['Do not invent a link the business does not need.'] }
  }),

  L({
    id: 'dm-review', track: 'Data modeling', module: 'Model the data', title: 'Data-model review checklist', duration: '6 min', level: 'Core',
    intro: 'Before you move to screens and workflow, review the model with a short checklist. Most costly mistakes can be seen on paper.',
    terms: ['review checklist', 'key', 'cardinality', 'naming'],
    tags: ['review', 'checklist', 'quality'],
    sections: [
      { k: 'p', t: 'In one line', b: 'If you cannot explain the model in simple words, it is not ready.' },
      { k: 'example', t: 'A simple example', b: 'Explain your model to a friend who does not know SAP. Every time you say “sort of” or “it depends”, you have found a gap.' },
      { k: 'ul', t: 'The review', items: [
        'Can a business user explain each object in one sentence?',
        'Does every object have a reason for its type 1–4?',
        'Does every type 4 have one leading and one qualifying link?',
        'Does every field have a data element and a meaning?',
        'Are required flags and value help chosen on purpose?',
        'Are keys and “how many” based on real business rules?',
        'Do names follow the team rules?',
        'Does the model picture match the business explanation?'
      ] },
      { k: 'table', t: 'Five common mistakes', head: ['Mistake', 'Why it hurts', 'Fix'], rows: [
        ['Everything is type 1', 'Children look like they can live alone', 'Use type 4 for child data'],
        ['Wrong “how many”', 'Too strict or too loose', 'Ask the business rule'],
        ['Unused fields', 'Noisy screen and slower work', 'Ask which decision the field supports'],
        ['No value help', 'Bad data and rework', 'Add a check table or search help'],
        ['Weak keys', 'Duplicates and confusion', 'Define keys before fields']
      ] },
      { k: 'mnemonic', t: 'Memory hook: “Explain it out loud.”', lines: ['Say what one record is.', 'Say what identifies it.', 'Say what it links to.', 'Say who owns it.'] }
    ],
    recall: [{ q: 'What is the fastest way to find model gaps?', a: 'Explain the model out loud to someone who does not know MDG. Fix every vague sentence.' }],
    interview: [
      { q: 'How do you know an object is well named?', a: 'A business user can say what one record is and give a real example.' },
      { q: 'Why do model choices affect screens and workflow?', a: 'Screens show the model. The workflow approves data in the model. A unclear model makes both confusing.' }
    ],
    practice: { title: 'Review your own sketch', intro: 'Use the checklist above.', steps: ['Read your model out loud.', 'Mark every “it depends”.', 'Fix one gap.', 'Write one question for the business.'], verify: ['You found at least one real improvement.'], traps: ['A model only you understand is not finished.'] }
  }),

  /* ───────────────────────── UI MODELING ───────────────────────── */

  L({
    id: 'ui-modeling', track: 'UI modeling', module: 'Design the experience', title: 'Screens: turn the model into something usable', duration: '8 min', level: 'Core',
    intro: 'The data model says what exists. The screen says what a person sees and edits. A good screen follows the user’s task.',
    terms: ['UI model', 'screen layout', 'field group', 'role'],
    tags: ['UI', 'screen', 'layout'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Do not show every field. Show the fields the user needs for this step.' },
      { k: 'example', t: 'A simple example', b: 'A requester needs five fields to ask for a material. An approver needs a summary and a button. They should not see the same screen.' },
      { k: 'diagram', name: 'uiBlocks', caption: 'The main screen blocks.' },
      { k: 'ul', t: 'Good screen habits', items: [
        'Start from one real task and one role.',
        'Group fields by the question the user is answering.',
        'Mark required fields and add short help text.',
        'Keep entry, review, and error fixing separate.',
        'Test with a real person. Do not coach them.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'A correct model with a confusing screen still gives you bad data. The screen is part of the control, not decoration.' }
    ],
    recall: [{ q: 'What should decide the screen layout?', a: 'The user’s task, the role, and the data links. Not the order of the tables.' }],
    interview: [
      { q: 'Why is the screen separate from the data model?', a: 'Different roles need different views of the same data. The screen changes the view, not the data.' },
      { q: 'How do you know a field group works?', a: 'A real user can finish the task and understands the labels, required fields, and errors.' }
    ],
    practice: { title: 'Redesign one screen', intro: 'Take a screen you know.', steps: ['Write the user’s task in one sentence.', 'List the fields they truly need first.', 'Put them into two or three groups.', 'Move technical fields out of the first view.'], verify: ['The first view answers the user’s main question.'], traps: ['Do not put every field on one screen.'] }
  }),

  L({
    id: 'ui-blocks', track: 'UI modeling', module: 'Design the experience', title: 'Screen blocks: IDR, OIF, and UIBB', duration: '9 min', level: 'Core',
    intro: 'Classic MDG screens are built from a few blocks. If you know the block names, any setup guide is easier to follow.',
    terms: ['application configuration', 'IDR', 'OIF', 'UIBB', 'form UIBB', 'search UIBB'],
    tags: ['UI', 'IDR', 'OIF', 'UIBB', 'configuration'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Application = building. IDR = name plate. OIF = floor plan. UIBB = room.' },
      { k: 'example', t: 'A simple example', b: 'A material screen shows the number and description at the top. That is the IDR. Below it are sections like “General Data” and “Plant Data”. Each section is a UIBB.' },
      { k: 'diagram', name: 'uiBlocks', caption: 'Application → IDR → OIF → UIBBs.' },
      { k: 'table', t: 'The blocks', head: ['Block', 'What it does', 'Think of it as'], rows: [
        ['Application', 'The top container for a screen setup', 'The building'],
        ['IDR', 'Shows the key fields and search', 'The name plate'],
        ['OIF', 'The page layout for one object', 'The floor plan'],
        ['UIBB', 'A reusable screen block', 'A room'],
        ['Form UIBB', 'Groups fields for entry', 'A form section'],
        ['Search UIBB', 'Finds records', 'The search bar']
      ] },
      { k: 'note', tone: 'warn', t: 'Check the technology', b: 'Newer S/4HANA systems may use Fiori apps instead of classic Web Dynpro screens. Check which one your system uses before following a guide.' }
    ],
    recall: [{ q: 'What is a UIBB?', a: 'A reusable screen block inside a page layout, such as a form section or a search bar.' }],
    interview: [
      { q: 'Name the main screen blocks.', a: 'Application, identification region, object instance floorplan, and UIBBs.' },
      { q: 'What is the IDR for?', a: 'It shows the key fields and search so the user knows which record they are working on.' }
    ],
    practice: { title: 'Label the blocks', intro: 'Look at a screenshot of an MDG screen.', steps: ['Find the key fields.', 'Find the search.', 'Find the form sections.', 'Name each block.'], verify: ['You can point to each block and say its name.'], traps: ['Do not memorise screens. Learn the block names.'] }
  }),

  L({
    id: 'ui-practice', track: 'UI modeling', module: 'Design the experience', title: 'Practice: set up a simple screen', duration: '7 min', level: 'Core',
    intro: 'A short runbook for setting up a screen. Do it with your trainer in a safe client.',
    terms: ['UI configuration', 'copy', 'transport', 'test'],
    tags: ['UI', 'practice', 'configuration'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Copy a working screen. Change one thing. Test it with a real user.' },
      { k: 'example', t: 'A simple example', b: 'Copy the material screen. Add one field to the “General Data” section. Ask a colleague to find it without your help.' },
      { k: 'ol', t: 'Practice steps', items: [
        'Open the screen setup for your release.',
        'Create a new setup or copy a delivered one.',
        'Assign it to your model and objects.',
        'Add the sections and fields you need.',
        'Test with a real request.',
        'Ask a colleague to finish the task alone.'
      ] },
      { k: 'note', tone: 'warn', t: 'Before you start', b: 'Use a transport. Work in a development or training client. Use an object your trainer has approved.' },
      { k: 'table', t: 'What to check', head: ['Check', 'Pass condition'], rows: [
        ['Key fields', 'The user can see which record they are editing'],
        ['Sections', 'Fields are grouped by the user’s questions'],
        ['Required fields', 'Clearly marked and explained'],
        ['F4 help', 'It works and shows sensible values'],
        ['Errors', 'The message names the field and the fix'],
        ['Test', 'A colleague finishes the task alone']
      ] }
    ],
    recall: [{ q: 'What is the final test of a screen?', a: 'A real user can finish the task without help.' }],
    interview: [{ q: 'Users cannot find a field. What do you check first?', a: 'Is the field in the model? Is it included and visible in the screen setup for that role?' }],
    practice: { title: 'Run the setup', intro: 'Do this with your trainer.', steps: ['Copy a working screen.', 'Add one field.', 'Test it.', 'Ask a user to find it.'], verify: ['The field is visible, labelled, and has F4 help.'], traps: ['Do not change a delivered screen without making a copy.'] }
  }),

  /* ───────────────────────── PROCESS MODELING ───────────────────────── */

  L({
    id: 'process-modeling', track: 'Process modeling', module: 'Route and approve', title: 'Workflow: who does what, and when?', duration: '9 min', level: 'Core',
    intro: 'Workflow turns a rule into steps. “A new material needs a steward and a manager” becomes a path with tasks and decisions.',
    terms: ['process model', 'step', 'agent', 'decision', 'escalation'],
    tags: ['process', 'workflow', 'approval'],
    sections: [
      { k: 'p', t: 'In one line', b: 'A workflow is a route. Each stop has an owner and a job.' },
      { k: 'example', t: 'A simple example', b: 'Ravi asks for a material. The route is: Ravi → data steward → plant manager → go live. If the steward rejects it, it goes back to Ravi. If the manager does nothing for three days, it goes to the manager’s boss.' },
      { k: 'diagram', name: 'workflow', caption: 'An example route with roles.' },
      { k: 'ul', t: 'What you define', items: [
        'The roles, not just the names of people.',
        'The order of the steps.',
        'What makes a request pass, fail, go back, or stop.',
        'Who owns each step and what happens if they are away.',
        'How normal, rejected, incomplete, and corrected requests behave.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'Always test the unhappy paths: missing data, a failed check, a rejection, a request sent back, and an approver who is missing. A happy-path demo is not a process.' }
    ],
    recall: [{ q: 'What should you test besides the happy path?', a: 'Missing data, failed checks, rejection, send-back, and a missing approver.' }],
    interview: [
      { q: 'Why define roles before the workflow?', a: 'Each step needs an owner. Without clear roles, a task can go to the wrong person or to nobody.' },
      { q: 'What is an agent in a workflow?', a: 'The person, role, or rule that is responsible for a step.' }
    ],
    practice: { title: 'Draw the unhappy path', intro: 'Take any approval process.', steps: ['Draw the happy path.', 'Add a rejection.', 'Add a send-back.', 'Add a missing-approver case.'], verify: ['Every branch ends somewhere sensible.'], traps: ['A workflow with no way out will get stuck.'] }
  }),

  L({
    id: 'process-cr', track: 'Process modeling', module: 'Route and approve', title: 'Request types and business activities', duration: '8 min', level: 'Core',
    intro: 'A request type says what kind of change this is. Business activities are the steps inside it.',
    terms: ['change request type', 'business activity', 'CR type', 'step'],
    tags: ['change request type', 'business activity', 'process'],
    sections: [
      { k: 'p', t: 'In one line', b: 'The request type picks the route. The activities are the stops on the route.' },
      { k: 'example', t: 'A simple example', b: '“Create material” is one request type. “Change material” is another. They can have different steps and different approvers.' },
      { k: 'table', t: 'Common request types', head: ['Type', 'When it is used'], rows: [
        ['Create', 'A new record is needed'], ['Change', 'An existing record must change'], ['Block / unblock', 'A record must stop or restart'], ['Mass change', 'Many records change together']
      ] },
      { k: 'note', tone: 'tip', t: 'Design tip', b: 'Keep the number of request types small. Too many types confuse users and double the testing.' },
      { k: 'note', tone: 'warn', t: 'Check your release', b: 'The exact setup path for request types and activities differs by release and area. Check it in your system.' }
    ],
    recall: [{ q: 'What does a request type decide?', a: 'Which steps and approvals the request follows.' }],
    interview: [
      { q: 'What is a business activity?', a: 'One step in the request, such as create, review, approve, or go live.' },
      { q: 'Why keep request types few?', a: 'Fewer types are easier for users and easier to test and maintain.' }
    ],
    practice: { title: 'Choose a request type', intro: 'Name the type for each case.', steps: ['A brand-new supplier.', 'A changed address.', 'A record that must be blocked.', 'A mass update.'], verify: ['Each case maps to one clear type.'], traps: ['Do not make a new type for every small variation.'] }
  }),

  L({
    id: 'process-workflow', track: 'Process modeling', module: 'Route and approve', title: 'Agents, rules, and BRFplus', duration: '8 min', level: 'Core',
    intro: 'The workflow moves a request. The agent rule decides who gets it. BRFplus adds business rules without writing code.',
    terms: ['workflow', 'agent', 'BRFplus', 'rule', 'escalation', 'parallel step'],
    tags: ['workflow', 'agent', 'BRFplus', 'rules'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Workflow = the conveyor belt. Agent = who gets the parcel. BRFplus = the rule book.' },
      { k: 'example', t: 'A simple example', b: 'A request for a plant in Delhi goes to the Delhi approver. A request for Mumbai goes to the Mumbai approver. A rule decides this. You do not hard-code names.' },
      { k: 'diagram', name: 'workflow', caption: 'Who does what in a workflow.' },
      { k: 'ul', t: 'What the workflow controls', items: [
        'Which step comes next.',
        'Who owns the step.',
        'Which steps run at the same time.',
        'What happens on reject, send-back, or timeout.',
        'Which messages or emails are sent.'
      ] },
      { k: 'table', t: 'Ways to choose an owner', head: ['Way', 'Use when'], rows: [
        ['By role', 'A team owns the step'], ['By user', 'One named person owns it'], ['By rule', 'The owner depends on data, like plant'], ['By manager', 'The owner comes from the org chart']
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'BRFplus is used for rules: checks, defaults, and decisions. It is setup, not only code.' }
    ],
    recall: [{ q: 'What does the agent rule do?', a: 'It decides who gets a workflow step.' }],
    interview: [
      { q: 'What can BRFplus do in MDG?', a: 'Add rule-based checks, defaults, and decisions without hard-coding them.' },
      { q: 'When do you use a parallel step?', a: 'When two reviews are independent and both must finish before the request can move on.' }
    ],
    practice: { title: 'Pick an owner rule', intro: 'Choose role, user, or rule.', steps: ['A central data team.', 'A named compliance officer.', 'An approver who depends on plant.'], verify: ['Team = role. Named person = user. Plant-based = rule.'], traps: ['Hard-coding a person is fragile. Prefer a role or a rule.'] }
  }),

  /* ───────────────────────── DOMAIN PRACTICE ───────────────────────── */

  L({
    id: 'mdgm-scenario', track: 'MDG-M', module: 'Practice track', title: 'MDG-M practice: ask for a new material', duration: '12 min', level: 'Practice',
    intro: 'This runbook follows a new material from request to go-live. The exact fields depend on your company setup.',
    terms: ['material master', 'plant', 'organisational data', 'training system'],
    tags: ['MDG-M', 'material', 'practice', 'scenario'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Ask, fill, check, review, approve, go live, and check the send.' },
      { k: 'example', t: 'A simple example', b: 'Ask for “Training Bolt A”. Use only test data. Do not use real prices or real suppliers.' },
      { k: 'ol', t: 'Runbook', items: [
        'Check the training system, client, and your permissions.',
        'Ask which request type to use and which plant data is needed.',
        'Write down required fields, F4 help, and any messages.',
        'Send the request. Note each status and who owns it.',
        'After approval, check that it is live. Learn how the team checks the send step.',
        'Write the exact app or transaction name in your notes.'
      ] },
      { k: 'note', tone: 'warn', t: 'Safety first', b: 'Never practise in production. Do not copy private data into public notes. Ask before you create, approve, go live, or send data.' },
      { k: 'table', t: 'What to observe', head: ['Moment', 'Question to answer'], rows: [
        ['Ask', 'Which request type, and why?'], ['Fill', 'Which fields were required? Which had F4?'], ['Check', 'Which messages appeared? What fixed them?'], ['Review', 'Which team got the request?'], ['Go live', 'What changed after approval?'], ['Send', 'Where did the data go? How did you confirm it?']
      ] }
    ],
    recall: [{ q: 'What must you check before you send a practice material request?', a: 'The training system and client, the request type, the required fields, and the test values.' }],
    interview: [
      { q: 'A material request shows an error. What do you do first?', a: 'Read the exact message. Find the field or rule. Check F4 and required context. Fix it. Then run the check again.' },
      { q: 'What is organisational data?', a: 'Data that depends on the company, plant, or purchasing area, not just the material itself.' }
    ],
    practice: { title: 'Your first material request', intro: 'Do this with your trainer.', steps: ['Open the correct system.', 'Create the request.', 'Fill the required fields.', 'Run the check.', 'Send it and follow the status.'], verify: ['You can explain every status the request passed.'], traps: ['Do not guess plant values. Ask for the approved test set.'] }
  }),

  L({
    id: 'mdgf-scenario', track: 'MDG-F', module: 'Practice track', title: 'MDG-F practice: financial master data', duration: '12 min', level: 'Practice',
    intro: 'This track uses the same ideas for financial data. First confirm which object is safe to use in your system.',
    terms: ['financial master data', 'data model 0G', 'company code', 'validation rule'],
    tags: ['MDG-F', 'financial', 'practice', 'scenario'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Same gate, different data. Confirm the object before you start.' },
      { k: 'example', t: 'A simple example', b: 'A finance user asks to change a test account field. The steward checks it. The controller approves it. Then it goes live.' },
      { k: 'ol', t: 'Runbook', items: [
        'Check the system, client, and the exact finance object.',
        'Ask which request type and approval rule apply.',
        'Write down required fields, company scope, and checks.',
        'Use only test values from your trainer.',
        'Follow the review and approval steps.',
        'Check go-live and any send step. Write down the status and exact app name.'
      ] },
      { k: 'note', tone: 'exam', t: 'Why MDG-F is different', b: 'MDG Financials uses flex mode with data model 0G. The live tables are built from the model, not taken from an old application table. Check this in your release.' },
      { k: 'note', tone: 'warn', t: 'Scope check', b: 'The finance objects in scope differ by system and project. Ask your trainer which one is safe.' }
    ],
    recall: [{ q: 'Which mode and model are used for MDG Financials?', a: 'Flex mode with data model 0G.' }],
    interview: [
      { q: 'Why confirm the finance object before you start?', a: 'The objects in scope differ by system and project. You need the safe test object from your trainer.' },
      { q: 'What do you record after a finance change?', a: 'The request ID and status, the checks, the approval and go-live result, and the send result if there is one.' }
    ],
    practice: { title: 'Your first finance request', intro: 'Do this with your trainer.', steps: ['Confirm the object.', 'Create the request.', 'Enter safe values.', 'Run the check.', 'Follow approval to go-live.'], verify: ['You can name the object, the request type, and the final status.'], traps: ['Do not test with real financial values.'] }
  }),

  L({
    id: 'tomorrow-checklist', track: 'Practice', module: 'Your first system session', title: 'Tomorrow: system-orientation checklist', duration: '5 min', level: 'Practice',
    intro: 'Use this before you change any data. It keeps you from working in the wrong system.',
    terms: ['system ID', 'client', 'authorization', 'runbook', 'training system'],
    tags: ['checklist', 'first day', 'system'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Know the system, the client, and your role before you click.' },
      { k: 'example', t: 'A simple example', b: 'You have two SAP logins. One is the hub. One is a factory system. If you pick the wrong one, your test data lands in the wrong place.' },
      { k: 'ol', t: 'Do this first', items: [
        'Write the product, release, system ID, and client.',
        'Ask: is this the hub or a connected system?',
        'Confirm it is a training or development client.',
        'Ask which test object is safe.',
        'Ask for the request type, your role, the apps, and the support contact.',
        'Run one MDG-M scenario and write down the steps and messages.',
        'Ask if an MDG-F practice is available.',
        'Explain each step in your own words.'
      ] },
      { k: 'note', tone: 'warn', t: 'Stop rule', b: 'If you are not sure the system is safe, stop. Do not create or change data. Ask your trainer.' },
      { k: 'table', t: 'Your note template', head: ['Field', 'What to write'], rows: [
        ['System / client', 'From the approved system info'], ['Task', 'What you tried to do'], ['Steps', 'What you actually did'], ['Messages', 'The exact error or warning'], ['Fix', 'What solved it'], ['Question', 'What you still need to ask']
      ] }
    ],
    recall: [{ q: 'What do you do if you are not sure the system is safe?', a: 'Stop. Do not change data. Ask your trainer or system owner.' }],
    interview: [{ q: 'What makes a useful personal runbook?', a: 'The system and release, the task, the steps, the exact messages, the fix, and open questions.' }],
    practice: { title: 'Prepare your notes', intro: 'Before the session.', steps: ['Open a notes file.', 'Paste the six-field template.', 'Fill in the system details.', 'Add one question for your trainer.'], verify: ['The template is ready before you log in.'], traps: ['Do not store private values in public notes.'] }
  }),

  L({
    id: 'dm-lab', track: 'Practice', module: 'Labs', title: 'Lab: build your first Z data model', duration: '15 min', level: 'Practice',
    intro: 'Do the paper version first. Then repeat it in the system with your trainer. This is where reading becomes skill.',
    terms: ['lab', 'Z model', 'paper model', 'activate', 'verify'],
    tags: ['lab', 'practice', 'Z model', 'hands-on'],
    sections: [
      { k: 'p', t: 'In one line', b: 'Plan on paper. Build in the system. Compare the two.' },
      { k: 'example', t: 'A simple example', b: 'Model “Training Equipment”. It has a type 1 root, a type 4 detail, and a type 3 location list. The detail key is equipment number + location.' },
      { k: 'ol', t: 'Paper phase', items: [
        'Write the purpose in one sentence.',
        'Pick the root and its key.',
        'Pick the child and say why it is type 4.',
        'Pick the pick list and say why it is type 3.',
        'List three fields for each object, with data elements.',
        'Draw the leading and qualifying links, with how many.'
      ] },
      { k: 'ol', t: 'System phase, with your trainer', items: [
        'Create the model with a Z name.',
        'Create the three objects with the right types.',
        'Add fields and F4 help.',
        'Add the leading and qualifying links.',
        'Save, read the messages, and activate.',
        'Adjust the staging area.',
        'Open the model picture and compare it with your paper.'
      ] },
      { k: 'table', t: 'Expected result', head: ['Check', 'Expected'], rows: [
        ['Root', 'One type 1 with its own key'], ['Child', 'One type 4 with one leading and one qualifying link'], ['Pick list', 'One type 3, not changed in MDG'], ['Key', 'Child key = root key + pick-list key'], ['Model', 'Active and checked']
      ] },
      { k: 'note', tone: 'tip', t: 'If it fails', b: 'Read only the first error. Fix it. Save again. Do not change five things at once.' }
    ],
    recall: [{ q: 'What makes up the child key?', a: 'The root key plus the key from the qualifying object.' }],
    interview: [
      { q: 'Walk me through building a custom data model.', a: 'Model the object. Pick the types. Add fields and F4 help. Add leading, qualifying, and referencing links. Save, check, activate, adjust staging, and verify.' },
      { q: 'What do you check first after activation?', a: 'That the model picture and the new tables match the keys, objects, and links you planned.' }
    ],
    practice: { title: 'Run the lab', intro: 'Paper first, system second.', steps: ['Finish the paper phase.', 'Book a trainer session.', 'Finish the system phase.', 'Compare paper and system.', 'Write three lessons learned.'], verify: ['The system matches your paper, and you can explain every choice.'], traps: ['Do not skip the paper phase. That is where the learning happens.'] }
  })
];

const tracks = [
  { id: 'all', label: 'All learning', icon: '◈', description: 'Your complete path from SAP basics to governed master data.' },
  { id: 'Foundations', label: 'Foundations', icon: '01', description: 'SAP, MDG, landscape patterns, and the request journey.' },
  { id: 'Data modeling', label: 'Data modeling', icon: '02', description: 'Things, fields, links, keys, trees, and custom models.' },
  { id: 'UI modeling', label: 'UI modeling', icon: '03', description: 'Turn the model into screens people can use.' },
  { id: 'Process modeling', label: 'Process modeling', icon: '04', description: 'Route requests through checks, reviews, decisions, and go-live.' },
  { id: 'MDG-M', label: 'MDG-M · Materials', icon: 'M', description: 'Practise a material request from start to finish.' },
  { id: 'MDG-F', label: 'MDG-F · Financials', icon: 'F', description: 'Practise a financial data request safely.' },
  { id: 'Practice', label: 'System practice', icon: '↗', description: 'Prepare for the system and record what you see.' }
];


/* src/interview.js */
// Interview question bank. Answers are deliberately short and plain.
// Every question has a simple answer, a concrete example, and a memory trick.
const Q = (id, track, level, q, a, example, trick) => ({ id, track, level, q, a, example, trick });

const interviewTracks = [
  'All topics', 'Foundations', 'Data modeling', 'UI modeling', 'Process modeling', 'MDG-M', 'MDG-F', 'Scenario'
];

const interviewQuestions = [
  /* ── Foundations ─────────────────────────────────────────── */
  Q('i-what-is-mdg', 'Foundations', 'Beginner',
    'What is SAP MDG in one sentence?',
    'MDG is a controlled process to request, check, approve, and publish important master data.',
    'A new material is requested once, approved by the right people, then made available to every system that needs it.',
    'Think: one door in, one quality gate, many doors out.'),
  Q('i-master-vs-transaction', 'Foundations', 'Beginner',
    'What is the difference between master data and transaction data?',
    'Master data is the reusable "who, what, where" (material, supplier, customer). Transaction data is one business event (a purchase order, an invoice).',
    'The material "Bolt A" is master data. A purchase order for 100 Bolts is transaction data.',
    'Master data = the actors. Transaction data = the events.'),
  Q('i-why-govern', 'Foundations', 'Beginner',
    'Why does a company need master data governance?',
    'Because one wrong or duplicate record spreads into many transactions, reports, and systems. Governance makes changes checked, approved, and traceable.',
    'Two teams create the same supplier twice; invoices and payments then split across two records.',
    'Bad master data is a virus; governance is the vaccine.'),
  Q('i-change-request', 'Foundations', 'Beginner',
    'What is a change request?',
    'It is the container that carries a proposed master data change through its steps, from request to approval and activation.',
    'A user asks for a new material; the change request records the request, the data, the reviewers, and the decision.',
    'A CR is the envelope, not the letter.'),
  Q('i-staging-active', 'Foundations', 'Core',
    'What is the difference between the staging area and the active area?',
    'Staging holds unapproved data inside a change request. Active holds approved data that applications can use.',
    'While a material is being reviewed, it sits in staging. After approval and activation, it appears in the active area.',
    'Staging = draft. Active = published.'),
  Q('i-hub', 'Foundations', 'Core',
    'What is hub deployment?',
    'MDG runs in a central system and governs data for one or more connected systems.',
    'A central MDG hub approves supplier data and sends it to two ERP systems.',
    'Hub = head office approving for many branches.'),
  Q('i-co-deployment', 'Foundations', 'Core',
    'What is co-deployment?',
    'MDG and business processing run in the same SAP system.',
    'The company creates and approves materials in the same S/4HANA system where purchasing runs.',
    'Co-deployment = same building, different floors.'),
  Q('i-ecc-s4', 'Foundations', 'Beginner',
    'What is the difference between ECC and S/4HANA?',
    'Both are SAP ERP generations. S/4HANA is the newer suite built on the HANA database; ECC is the older generation many companies still run.',
    'An ABAP developer may move from an ECC project to an S/4HANA MDG project.',
    'ECC = older ERP. S/4HANA = newer ERP on HANA.'),
  Q('i-replication', 'Foundations', 'Core',
    'What is replication in MDG?',
    'Sending approved master data from the governance system to a connected system that needs to use it.',
    'After approval, a material is replicated from the MDG hub to the plant ERP system.',
    'Replication = delivery after approval.'),
  Q('i-data-model-def', 'Foundations', 'Core',
    'What is a data model in MDG?',
    'The blueprint of the governed data: entity types, attributes, and relationships. It determines the key and non-key fields of the generated tables.',
    'A material model has a Material entity, a Material–Plant entity, and their attributes and links.',
    'Model = blueprint before building.'),

  /* ── Data modeling ───────────────────────────────────────── */
  Q('i-three-blocks', 'Data modeling', 'Beginner',
    'What are the three building blocks of an MDG data model?',
    'Entity types, attributes, and relationships.',
    'Entity: Material. Attribute: Material Number. Relationship: Material → Plant.',
    'E-A-R: Entity, Attribute, Relationship.'),
  Q('i-entity-type', 'Data modeling', 'Beginner',
    'What is an entity type?',
    'A business thing that MDG governs, such as Material, Supplier, or Material–Plant.',
    'In a material model, "Material" is the root entity type.',
    'Entity = the noun.'),
  Q('i-four-types', 'Data modeling', 'Core',
    'What are the four storage and use types of entity types?',
    'Type 1 is the main root object. Type 2 is lookup data maintained inside MDG. Type 3 is lookup data maintained outside MDG. Type 4 is dependent data with no key of its own.',
    'Material = 1, a small Z priority list in MDG = 2, Plant = 3, Material–Plant = 4.',
    '1 Root, 2 In, 3 Out, 4 Under.'),
  Q('i-type1', 'Data modeling', 'Core',
    'What is a type 1 entity type?',
    'The main root object with its own key and generated storage. It can lead type 1 and type 4 entities, and it can reference. It cannot be the source of a qualifying relationship.',
    'Material is a type 1; it has its own key, the material number.',
    'Type 1 = the trunk of the tree.'),
  Q('i-type2', 'Data modeling', 'Core',
    'What is a type 2 entity type?',
    'Lookup data that is maintained inside MDG, without attributes. It has its own key.',
    'A small custom priority list that users maintain in MDG as a valid value list.',
    'Type 2 = lookup living inside the house.'),
  Q('i-type3', 'Data modeling', 'Core',
    'What is a type 3 entity type?',
    'Lookup data maintained outside MDG, without attributes. No tables are generated and it is not changed in MDG.',
    'Plant values that already live in the ERP check tables.',
    'Type 3 = lookup living outside; MDG only points to it.'),
  Q('i-type4', 'Data modeling', 'Core',
    'What is a type 4 entity type?',
    'Dependent data with no key of its own, processed in the context of a leading type 1. It has one leading and one qualifying relationship and must be shown with its leading type 1 on the UI.',
    'Material–Plant data: it only makes sense together with a material.',
    'Type 4 = a room that cannot exist without the house.'),
  Q('i-why-type4-nokey', 'Data modeling', 'Advanced',
    'Why does a type 4 entity have no key of its own?',
    'Because its identity depends on its parent. The full key is the parent key plus one or more qualifying keys.',
    'Material–Plant is identified by material number plus plant, not by a separate ID.',
    'The child borrows the family name and adds a room number.'),
  Q('i-leading', 'Data modeling', 'Core',
    'What is a leading relationship?',
    'It assigns the leading context. A type 1 can lead a type 1 or a type 4. A type 4 must be linked to a leading type 1, and its data is processed in that context.',
    'Material → Material–Plant as leading, 1:N.',
    'Leading answers: who owns this record?'),
  Q('i-qualifying', 'Data modeling', 'Core',
    'What is a qualifying relationship?',
    'It qualifies the child with additional key attributes. Type 2 and type 3 can enhance the keys of type 1 and type 4.',
    'Plant → Material–Plant as qualifying adds plant to the key.',
    'Qualifying answers: what else is in the key?'),
  Q('i-leading-vs-qualifying', 'Data modeling', 'Core',
    'What is the difference between leading and qualifying?',
    'Leading gives the context in which a type 4 is processed. Qualifying adds the extra key fields that identify the child.',
    'Material gives the context; plant completes the key.',
    'Leading = context. Qualifying = key.'),
  Q('i-referencing', 'Data modeling', 'Core',
    'What is a referencing relationship?',
    'The key of the referenced entity becomes an attribute of the referencing entity. The from-entity is a required attribute of the to-entity.',
    'A company code key is copied onto a record as a field.',
    'Referencing = copy the key in as a field.'),
  Q('i-cardinality', 'Data modeling', 'Core',
    'What is cardinality?',
    'It says how many records on one side can connect to records on the other side: 1:1, 1:N, N:1, or N:M.',
    'One material can have many plant records: 1:N.',
    'Read it from the FROM side.'),
  Q('i-type4-rule', 'Data modeling', 'Advanced',
    'What is the type 4 relationship rule?',
    'Exactly one leading relationship and one qualifying relationship are required. Any other relationships must be qualifying or referencing. The key must be enhanced by at least one type 1, 2, or 3.',
    'Material → Material–Plant leading; Plant → Material–Plant qualifying.',
    'One leader, one qualifier, the rest may only reference.'),
  Q('i-type1-qualifying', 'Data modeling', 'Advanced',
    'Can a type 1 entity be the source of a qualifying relationship?',
    'No. A type 1 has only leading and referencing relationships as a source.',
    'Material leads Material–Plant; it does not qualify it. Plant qualifies it.',
    'Type 1 leads, it does not qualify.'),
  Q('i-reuse', 'Data modeling', 'Core',
    'What is reuse mode?',
    'The active area uses existing application tables. It often needs a reuse class to access backend content.',
    'Material active data sits in the existing MARA and MARC tables.',
    'Reuse = reuse the existing house.'),
  Q('i-flex', 'Data modeling', 'Core',
    'What is flex mode?',
    'MDG generates its own active-area tables from the data model. Access is automatic without extra coding.',
    'MDG Financials uses flex mode with data model 0G.',
    'Flex = build a house to your blueprint.'),
  Q('i-reuse-vs-flex', 'Data modeling', 'Core',
    'What is the difference between reuse and flex mode?',
    'Reuse uses existing application structures and tables. Flex generates active-area tables from the model. Staging is MDG-managed in both.',
    'Reuse for a standard material domain; flex for MDG Financials or a custom object.',
    'Reuse = existing tables. Flex = generated tables.'),
  Q('i-active-area', 'Data modeling', 'Core',
    'What is the active area?',
    'The place where approved master data lives and applications read it.',
    'After activation, the material is visible to purchasing in the active area.',
    'Active = ready for business.'),
  Q('i-attribute', 'Data modeling', 'Beginner',
    'What is an attribute?',
    'A property of an entity type, such as a material number, description, or unit of measure.',
    'Material Number and Description are attributes of Material.',
    'Attribute = the adjective.'),
  Q('i-key-vs-normal', 'Data modeling', 'Core',
    'What is the difference between a key attribute and a normal attribute?',
    'A key attribute identifies one record. A normal attribute describes the record.',
    'Material Number identifies; Description describes.',
    'Key = name tag. Normal = description.'),
  Q('i-data-element-domain', 'Data modeling', 'Core',
    'What is the difference between a data element and a domain?',
    'A data element is the business meaning and field label. Its domain holds the technical type and often the value table.',
    'Data element "Unit of Measure" carries the label; its domain gives the type and value table.',
    'Data element = meaning. Domain = mechanics.'),
  Q('i-check-table', 'Data modeling', 'Core',
    'What is a check table?',
    'A table used to validate that a value exists, usually through a foreign key.',
    'Only valid units from table T006 are accepted for unit of measure.',
    'Check table = the bouncer at the door.'),
  Q('i-value-vs-check', 'Data modeling', 'Advanced',
    'What is the difference between a value table and a check table?',
    'A value table is stored on the domain and is proposed as the check table. The check table actually validates the value.',
    'The domain proposes T006; T006 then checks the entered unit.',
    'Value table suggests; check table enforces.'),
  Q('i-search-help', 'Data modeling', 'Core',
    'What is a search help?',
    'It gives the user an F4 list to pick a valid value.',
    'Pressing F4 on Unit of Measure shows a list of units.',
    'Search help = the menu, not the rule.'),
  Q('i-search-help-where', 'Data modeling', 'Advanced',
    'Where can a search help be assigned?',
    'To attributes, hierarchy attributes, and entity types of storage/use type 1 with its own data element, type 2, and type 3.',
    'A type 4 entity cannot carry its own search help assignment.',
    '1 with a data element, plus 2 and 3.'),
  Q('i-hierarchy', 'Data modeling', 'Core',
    'What is a hierarchy in MDG?',
    'A parent–child structure stored in a hierarchy table, enabled per entity type.',
    'A cost centre tree with a total node and regional children.',
    'Hierarchy = family tree of records.'),
  Q('i-enable-hierarchy', 'Data modeling', 'Core',
    'How do you enable a hierarchy?',
    'Set the Hierarchies attribute to a value other than "No hierarchy".',
    'Changing that setting creates a hierarchy table for parent–child links.',
    'Hierarchies = not "No hierarchy".'),
  Q('i-hierarchy-attr', 'Data modeling', 'Advanced',
    'What is a hierarchy attribute?',
    'Extra data stored on a hierarchy edge, such as validity or weight, rather than on the entity itself.',
    'A parent–child link that is valid only for a date range.',
    'Hierarchy attribute = data on the arrow, not the box.'),
  Q('i-association', 'Data modeling', 'Core',
    'What is an association?',
    'A navigable link between entity types, used by the UI, search, or reporting.',
    'A user jumps from a supplier to its contacts in the UI.',
    'Association = a corridor between rooms.'),
  Q('i-assoc-vs-rel', 'Data modeling', 'Advanced',
    'What is the difference between a relationship and an association?',
    'A relationship defines dependency and key structure in the data model. An association defines a navigable link, often in the UI or search.',
    'Material → Plant as a relationship; a UI jump from material to plant as an association.',
    'Relationship = structure. Association = navigation.'),
  Q('i-entity-attr', 'Data modeling', 'Advanced',
    'What is an entity-type attribute?',
    'A field that carries another entity type key, so the referenced key becomes a field on the entity.',
    'A company code field on a record points to the company code entity.',
    'Entity-type attribute = a copied key.'),
  Q('i-derive-model', 'Data modeling', 'Advanced',
    'How do you derive a data model from existing tables?',
    'Find the root, the dependent tables, and the lookup tables. Assign type 1, 4, and 3, then define leading, qualifying, and referencing relationships with cardinality.',
    'MARA as type 1, MARC as type 4, T001W as type 3.',
    'Root → dependent → lookup → links.'),
  Q('i-spro-path', 'Data modeling', 'Core',
    'What is the SPRO path for the data model?',
    'Master Data Governance → General Settings → Data Modeling → Edit Data Model.',
    'You create the model, entity types, attributes, and relationships there.',
    'General Settings first, then Data Modeling.'),
  Q('i-z-model-steps', 'Data modeling', 'Core',
    'What are the steps to create a custom Z data model?',
    'Create the model, create entity types, add attributes, add relationships, save and check, activate, adjust the staging area, and visualise.',
    'A Z model with a type 1 root, a type 4 detail, and a type 3 lookup.',
    'Model → entities → attributes → relationships → check → activate → staging → visualise.'),
  Q('i-model-mistakes', 'Data modeling', 'Advanced',
    'What are common data modeling mistakes?',
    'Making everything type 1, wrong cardinality, unused fields, no value help, and weak key discipline.',
    'A dependent table modelled as a root creates duplicate identities.',
    'Too many roots, too few rules.'),

  /* ── UI modeling ─────────────────────────────────────────── */
  Q('i-ui-modeling', 'UI modeling', 'Beginner',
    'What is UI modeling in MDG?',
    'Deciding how the data model appears to users: which fields, in which groups, for which role.',
    'A requester sees only the fields needed to create a material request.',
    'Data model = what exists. UI model = what you see.'),
  Q('i-ui-vs-data', 'UI modeling', 'Core',
    'Why is UI modeling separate from data modeling?',
    'Different roles need different views of the same data. The UI model changes presentation without changing the underlying model.',
    'An approver needs a review view; a requester needs an entry view.',
    'Same house, different rooms per visitor.'),
  Q('i-idr', 'UI modeling', 'Core',
    'What is the identification region?',
    'The part of the screen that shows the key fields and search so the user knows which record they are working on.',
    'The material number and description at the top of the screen.',
    'IDR = the name plate.'),
  Q('i-oif', 'UI modeling', 'Core',
    'What is the object instance floorplan?',
    'The page layout for one object instance.',
    'The frame that holds the form sections for a material.',
    'OIF = the page frame.'),
  Q('i-uibb', 'UI modeling', 'Core',
    'What is a UIBB?',
    'A reusable UI building block inside a floorplan, such as a form section or a search panel.',
    'A "General Data" section and a "Plant Data" section are UIBBs.',
    'UIBB = a room in the floorplan.'),
  Q('i-form-search-uibb', 'UI modeling', 'Advanced',
    'What is the difference between a form UIBB and a search UIBB?',
    'A form UIBB groups fields for entry or display. A search UIBB finds records.',
    'The form shows material details; the search finds a material by number.',
    'Form = fill in. Search = find.'),
  Q('i-test-ui', 'UI modeling', 'Core',
    'How do you test a UI configuration?',
    'Ask a representative user to complete the real task without coaching, and check labels, required fields, value help, and error messages.',
    'If the user cannot find the plant field, the UI is not finished.',
    'The test is the user, not the screenshot.'),
  Q('i-fiori-webdynpro', 'UI modeling', 'Advanced',
    'What is the difference between Fiori and Web Dynpro in MDG?',
    'Both are UI technologies. Newer S/4HANA releases may use Fiori apps, while classic MDG UI configuration uses Web Dynpro. Confirm what your system uses.',
    'A classic guide may show Web Dynpro configuration that does not match a Fiori app.',
    'Check the technology before following a click path.'),

  /* ── Process modeling ────────────────────────────────────── */
  Q('i-process-modeling', 'Process modeling', 'Beginner',
    'What is process modeling in MDG?',
    'Defining the steps, decisions, responsibilities, and transitions a change request follows.',
    'Requester → data steward → approver → activation.',
    'Process = who does what, when.'),
  Q('i-cr-type', 'Process modeling', 'Core',
    'What is a change request type?',
    'It describes the kind of governed change and decides which process the request follows.',
    'A "create material" CR type versus a "change material" CR type.',
    'CR type = the route, not the destination.'),
  Q('i-business-activity', 'Process modeling', 'Core',
    'What is a business activity?',
    'A step in the change request process, such as create, review, approve, or activate.',
    'The approver step is a business activity.',
    'Business activity = one step on the route.'),
  Q('i-workflow', 'Process modeling', 'Core',
    'What is workflow in MDG?',
    'The mechanism that moves a request from step to step and assigns work to the right people.',
    'After submission, the request is routed to the data steward automatically.',
    'Workflow = the conveyor belt.'),
  Q('i-agent', 'Process modeling', 'Core',
    'What is agent determination?',
    'The rule that decides who receives a workflow step.',
    'A plant-based rule sends the request to the approver for that plant.',
    'Agent = who gets the parcel.'),
  Q('i-brfplus', 'Process modeling', 'Advanced',
    'What is BRFplus used for in MDG?',
    'Rule-based validation, derivation, and decision logic, configured rather than hard-coded.',
    'A rule derives the material type from the material group.',
    'BRFplus = business rules without code.'),
  Q('i-parallel', 'Process modeling', 'Advanced',
    'When would you use a parallel workflow step?',
    'When two reviews are independent and both must finish before the request can continue.',
    'Finance and compliance review at the same time.',
    'Parallel = two lanes, one finish line.'),
  Q('i-unhappy-path', 'Process modeling', 'Core',
    'What should you test besides the happy path?',
    'Incomplete data, validation failure, rejection, return for correction, and missing approver or escalation.',
    'A request returned for correction should reach the right person, not disappear.',
    'Test the potholes, not just the highway.'),

  /* ── MDG-M ───────────────────────────────────────────────── */
  Q('i-mdgm', 'MDG-M', 'Beginner',
    'What is MDG-M?',
    'The Materials domain of SAP MDG: it governs material master data through change requests and approvals.',
    'A new raw material is requested and approved before it can be purchased.',
    'MDG-M = Materials.'),
  Q('i-material-master', 'MDG-M', 'Beginner',
    'What is a material master?',
    'The business record that describes an item a company buys, makes, stores, or sells.',
    'A bolt, a chemical, or a finished product has a material master.',
    'Material master = the item passport.'),
  Q('i-org-data', 'MDG-M', 'Core',
    'What is organizational data in a material request?',
    'Data that depends on the organization, such as plant or purchasing context.',
    'The same material can have different plant-level data.',
    'Organizational data = where it is used.'),
  Q('i-material-flow', 'MDG-M', 'Core',
    'What is the typical material request flow?',
    'Request, enter data, validate, review, approve or reject, activate, and distribute.',
    'A requester creates a material; a steward checks it; a business approver accepts it.',
    'Request → edit → validate → review → decide → activate.'),
  Q('i-material-error', 'MDG-M', 'Scenario',
    'A material request shows an error. What do you do first?',
    'Read the exact message, find the field or rule, check value help and required context, fix it, and rerun the check.',
    'The unit of measure is invalid; choose a valid unit from F4.',
    'Read the message before clicking again.'),
  Q('i-material-not-distributed', 'MDG-M', 'Scenario',
    'A material is approved but not in the target system. What do you check?',
    'Activation status, replication or distribution status, target connectivity, and error logs.',
    'The request is approved but replication failed due to a connection error.',
    'Approved is not the same as delivered.'),
  Q('i-plant', 'MDG-M', 'Core',
    'What is a plant?',
    'An organizational unit where materials are produced, stored, or used. Plant-level data is often dependent on the material.',
    'Material–Plant data is a type 4 entity in the model.',
    'Plant = a place where the material lives.'),

  /* ── MDG-F ───────────────────────────────────────────────── */
  Q('i-mdgf', 'MDG-F', 'Beginner',
    'What is MDG-F?',
    'The Financials domain of SAP MDG: it governs financial master data through change requests and approvals.',
    'A new account-related record is requested and approved centrally.',
    'MDG-F = Financials.'),
  Q('i-mdgf-mode', 'MDG-F', 'Core',
    'Which data model and mode are associated with MDG Financials?',
    'Flex mode with data model 0G.',
    'The active area is generated from the financial data model.',
    'Finance = 0G + flex.'),
  Q('i-company-code', 'MDG-F', 'Core',
    'What is a company code?',
    'An organizational unit representing a legal entity for accounting.',
    'Invoices are posted to a company code.',
    'Company code = the legal books.'),
  Q('i-finance-flow', 'MDG-F', 'Core',
    'What is a typical financial master data request flow?',
    'Confirm the object and policy, enter approved values, validate, review, approve, activate, and check distribution.',
    'A finance steward checks the request before the controller approves it.',
    'Confirm first, then request.'),
  Q('i-finance-scope', 'MDG-F', 'Scenario',
    'Why confirm the MDG-F object before starting?',
    'Because financial scope and available objects vary by system and project; the trainer must identify the safe scenario.',
    'One system may govern accounts, another may govern a different financial object.',
    'No object, no request.'),
  Q('i-finance-evidence', 'MDG-F', 'Scenario',
    'What evidence do you capture after a financial master data change?',
    'Request ID and status, checks performed, approval and activation result, and distribution outcome if configured.',
    'A screenshot of the final status plus the error log if replication failed.',
    'Capture status, checks, decision, delivery.'),

  /* ── Scenario / behavioural ──────────────────────────────── */
  Q('i-unfamiliar-system', 'Scenario', 'Scenario',
    'How do you approach an unfamiliar MDG system?',
    'Confirm product, release, system, client, hub or connected, and your role. Then find one safe end-to-end example before changing anything.',
    'Ask the trainer for a training object and follow one material request.',
    'System, scope, client, role, then one example.'),
  Q('i-skip-approval', 'Scenario', 'Scenario',
    'A user asks you to skip an approval "just this once". What do you do?',
    'Explain the risk and follow the process. If there is a genuine urgency, use the approved exception or escalation path, not a bypass.',
    'A blocked material is needed today; use the documented emergency process.',
    'No bypass without a documented exception.'),
  Q('i-explain-mdg', 'Scenario', 'Scenario',
    'How would you explain MDG to a business user?',
    'It is one controlled way to ask for a data change, have the right people check and approve it, and then publish it everywhere it is needed.',
    'Like a quality gate for material, supplier, and finance data.',
    'One door in, one gate, many doors out.'),
  Q('i-duplicate-material', 'Scenario', 'Scenario',
    'You find two records for the same material. What do you do?',
    'Do not delete one casually. Identify usage, owner, and dependencies, then follow the approved merge or cleanup process.',
    'Both records may have transactions and history attached.',
    'Investigate before you delete.'),
  Q('i-test-model', 'Scenario', 'Scenario',
    'How do you test a new data model?',
    'Create one realistic record, check keys and relationships, test required fields and value help, activate, and visualise the model.',
    'Create a test material with one plant record and verify the key.',
    'One real record beats ten screenshots.'),
  Q('i-stuck-cr', 'Scenario', 'Scenario',
    'A change request is stuck. How do you troubleshoot?',
    'Check the current step, the assigned role or agent, the user authorization, notifications, and escalation rules before changing the workflow.',
    'The approver left the company; the role has no active user.',
    'Find the step, the owner, and the permission.'),
  Q('i-why-mdg', 'Scenario', 'Beginner',
    'Why do you want to learn SAP MDG?',
    'Because it connects business process, data quality, and technical configuration. It is a strong techno-functional skill with real impact on reporting and operations.',
    'A wrong material record can block purchasing; MDG prevents that.',
    'MDG sits where business meets technology.'),
  Q('i-techno-functional', 'Scenario', 'Advanced',
    'What does "techno-functional" mean for MDG?',
    'You can explain the business process and also configure and troubleshoot the system: model, UI, workflow, rules, and integration.',
    'You can design the approval flow and also debug why a replication failed.',
    'Business brain plus system hands.')
];


/* src/diagrams.js */
// Inline SVG diagrams. No external files, no network, works on GitHub Pages.
const C = {
  ink: '#14151a', soft: '#5b5c66', muted: '#8a8b93', line: '#d4d1c4',
  paper: '#ffffff', bg: '#f5f4ee', accent: '#c9512a', accentSoft: '#fae8e0',
  green: '#2f6b4f', greenSoft: '#e3efe8', blue: '#2a4a6b', blueSoft: '#e6edf4',
  amber: '#8a6a2a', amberSoft: '#fbf3e2', violet: '#5b4b8a', violetSoft: '#eeeaf7'
};

const font = "font-family='Inter, Segoe UI, system-ui, sans-serif'";
const mono = "font-family='JetBrains Mono, Consolas, monospace'";

function wrap(inner, w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">${inner}</svg>`;
}
function box(x, y, w, h, fill, stroke, rx = 10) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
}
function label(x, y, text, size = 13, fill = C.ink, weight = 600, anchor = 'middle', extra = '') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" ${font} font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${text}</text>`;
}
function arrow(x1, y1, x2, y2, color = C.muted, dashed = false) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.8" ${dashed ? 'stroke-dasharray="5 4"' : ''} marker-end="url(#arrowhead)"/>`;
}
const defs = `<defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="${C.muted}"/></marker></defs>`;

const diagrams = {
  anatomy: () => wrap(`${defs}
    ${box(40, 40, 200, 96, C.paper, C.line)}
    ${label(140, 72, 'ENTITY', 11, C.accent, 700, 'middle', mono)}
    ${label(140, 98, 'Material', 18)}
    ${label(140, 120, 'the business thing', 11, C.soft, 400)}
    ${box(300, 40, 200, 96, C.paper, C.line)}
    ${label(400, 72, 'ATTRIBUTE', 11, C.accent, 700, 'middle', mono)}
    ${label(400, 98, 'Material No.', 18)}
    ${label(400, 120, 'a fact about it', 11, C.soft, 400)}
    ${box(560, 40, 200, 96, C.paper, C.line)}
    ${label(660, 72, 'RELATIONSHIP', 11, C.accent, 700, 'middle', mono)}
    ${label(660, 98, 'Material → Plant', 18)}
    ${label(660, 120, 'how things connect', 11, C.soft, 400)}
    ${arrow(240, 88, 300, 88)} ${arrow(500, 88, 560, 88)}
    ${label(400, 180, 'A data model = Entity Types + Attributes + Relationships', 14, C.ink, 600)}
    ${label(400, 204, 'It is the blueprint that decides the key and non-key fields of the generated tables.', 11, C.soft, 400)}
    ${label(400, 236, '🧱  Model first  →  🖥️  UI next  →  🔁  Process last', 12, C.accent, 600)}
  `, 800, 270, 'Data model anatomy: entities, attributes, relationships'),

  layers: () => wrap(`${defs}
    ${box(60, 40, 680, 62, C.blueSoft, '#b9c9d9')}
    ${label(400, 66, '1 · DATA MODEL', 12, C.blue, 700, 'middle', mono)}
    ${label(400, 88, 'What data exists? Entity types, attributes, relationships, keys.', 12, C.ink, 400)}
    ${box(60, 120, 680, 62, C.greenSoft, '#bfd8c8')}
    ${label(400, 146, '2 · UI MODEL', 12, C.green, 700, 'middle', mono)}
    ${label(400, 168, 'How do people see and edit it? Screens, groups, roles, search.', 12, C.ink, 400)}
    ${box(60, 200, 680, 62, C.amberSoft, '#e6d3a8')}
    ${label(400, 226, '3 · PROCESS MODEL', 12, C.amber, 700, 'middle', mono)}
    ${label(400, 248, 'Who does what, in what order, and when is it approved?', 12, C.ink, 400)}
    ${arrow(400, 102, 400, 120)} ${arrow(400, 182, 400, 200)}
    ${label(775, 35, '← build in this order', 10, C.muted, 400, 'end', mono)}
  `, 820, 286, 'Three layers: data model, UI model, process model'),

  activeStaging: () => wrap(`${defs}
    ${box(60, 50, 300, 120, C.accentSoft, '#f0c9b8')}
    ${label(210, 82, 'STAGING AREA', 12, C.accent, 700, 'middle', mono)}
    ${label(210, 108, 'unapproved / in change request', 13)}
    ${label(210, 132, '“work in progress”', 11, C.soft, 400)}
    ${box(440, 50, 300, 120, C.greenSoft, '#bfd8c8')}
    ${label(590, 82, 'ACTIVE AREA', 12, C.green, 700, 'middle', mono)}
    ${label(590, 108, 'approved / ready to use', 13)}
    ${label(590, 132, '“what applications read”', 11, C.soft, 400)}
    ${arrow(360, 110, 440, 110, C.accent)}
    ${label(400, 98, 'approve', 10, C.accent, 600, 'middle', mono)}
    ${label(400, 200, 'Reuse mode  →  active data sits in existing application tables (e.g. MARA, MARC).', 12, C.ink, 500)}
    ${label(400, 224, 'Flex mode  →  MDG generates its own active-area tables from your data model.', 12, C.ink, 500)}
  `, 800, 250, 'Staging area versus active area in MDG'),

  reuseFlex: () => wrap(`${defs}
    ${box(50, 40, 330, 190, C.paper, C.line)}
    ${label(215, 68, 'REUSE MODE', 12, C.blue, 700, 'middle', mono)}
    ${label(215, 96, 'Uses existing application tables', 13)}
    ${label(215, 120, 'MARA · MARC · KNA1 · LFA1', 12, C.soft, 500, 'middle', mono)}
    ${label(215, 150, 'Needs a reuse class to read/write', 11, C.soft, 400)}
    ${label(215, 172, 'Used by: most S/4HANA MDG domains', 11, C.soft, 400)}
    ${label(215, 194, 'and custom objects', 11, C.soft, 400)}
    ${box(420, 40, 330, 190, C.paper, C.line)}
    ${label(585, 68, 'FLEX MODE', 12, C.accent, 700, 'middle', mono)}
    ${label(585, 96, 'MDG generates its own tables', 13)}
    ${label(585, 120, '/1MD/… active-area tables', 12, C.soft, 500, 'middle', mono)}
    ${label(585, 150, 'Automatic access, no extra coding', 11, C.soft, 400)}
    ${label(585, 172, 'Used by: MDG Financials (0G)', 11, C.soft, 400)}
    ${label(585, 194, 'and default for custom objects', 11, C.soft, 400)}
    ${label(400, 258, 'Both modes keep unapproved data in MDG staging tables.', 11, C.muted, 400)}
  `, 800, 280, 'Reuse mode versus flex mode'),

  types: () => wrap(`${defs}
    ${box(30, 40, 180, 150, C.blueSoft, '#b9c9d9')}
    ${label(120, 66, 'TYPE 1', 13, C.blue, 800, 'middle', mono)}
    ${label(120, 90, 'Main object', 14)}
    ${label(120, 114, 'own key', 11, C.soft, 400)}
    ${label(120, 134, 'root of governance', 11, C.soft, 400)}
    ${label(120, 158, 'Material', 12, C.blue, 600)}
    ${box(222, 40, 180, 150, C.greenSoft, '#bfd8c8')}
    ${label(312, 66, 'TYPE 2', 13, C.green, 800, 'middle', mono)}
    ${label(312, 90, 'Lookup, in MDG', 14)}
    ${label(312, 114, 'no attributes', 11, C.soft, 400)}
    ${label(312, 134, 'maintained in MDG', 11, C.soft, 400)}
    ${label(312, 158, 'small value list', 12, C.green, 600)}
    ${box(414, 40, 180, 150, C.violetSoft, '#d3c9ea')}
    ${label(504, 66, 'TYPE 3', 13, C.violet, 800, 'middle', mono)}
    ${label(504, 90, 'Lookup, outside', 14)}
    ${label(504, 114, 'no attributes', 11, C.soft, 400)}
    ${label(504, 134, 'not changed in MDG', 11, C.soft, 400)}
    ${label(504, 158, 'Plant / Unit', 12, C.violet, 600)}
    ${box(606, 40, 180, 150, C.amberSoft, '#e6d3a8')}
    ${label(696, 66, 'TYPE 4', 13, C.amber, 800, 'middle', mono)}
    ${label(696, 90, 'Dependent', 14)}
    ${label(696, 114, 'no key of its own', 11, C.soft, 400)}
    ${label(696, 134, 'lives under Type 1', 11, C.soft, 400)}
    ${label(696, 158, 'Material–Plant', 12, C.amber, 600)}
    ${label(400, 224, '1 root  ·  2 lookup inside  ·  3 lookup outside  ·  4 dependent', 12, C.ink, 600)}
    ${label(400, 248, 'Memory hook: “1 Root, 2 In, 3 Out, 4 Under.”', 12, C.accent, 600)}
  `, 820, 268, 'Four entity storage and use types'),

  relationships: () => wrap(`${defs}
    ${box(40, 60, 170, 70, C.blueSoft, '#b9c9d9')}
    ${label(125, 88, 'Material', 14)}
    ${label(125, 110, 'Type 1', 10, C.soft, 400, 'middle', mono)}
    ${box(300, 60, 170, 70, C.amberSoft, '#e6d3a8')}
    ${label(385, 88, 'Material–Plant', 14)}
    ${label(385, 110, 'Type 4', 10, C.soft, 400, 'middle', mono)}
    ${box(560, 60, 170, 70, C.violetSoft, '#d3c9ea')}
    ${label(645, 88, 'Plant', 14)}
    ${label(645, 110, 'Type 3', 10, C.soft, 400, 'middle', mono)}
    ${arrow(210, 88, 300, 88, C.blue)}
    ${label(255, 76, 'LEADING', 9, C.blue, 700, 'middle', mono)}
    ${label(255, 102, '1 : N', 9, C.soft, 600, 'middle')}
    ${arrow(560, 100, 470, 100, C.violet)}
    ${label(515, 120, 'QUALIFYING', 9, C.violet, 700, 'middle', mono)}
    ${label(515, 136, 'adds WERKS to the key', 9, C.soft, 400)}
    ${box(40, 185, 690, 78, C.paper, C.line)}
    ${label(70, 210, 'REFERENCING', 10, C.green, 700, 'left', mono)}
    ${label(70, 232, 'The referenced key becomes a field on the referencing entity. Example: Company Code is copied in as a field.', 11, C.ink, 400, 'start')}
    ${label(400, 280, 'Leading = which record owns the context  ·  Qualifying = extra key  ·  Referencing = copy the key', 11, C.muted, 400)}
  `, 780, 292, 'Leading, qualifying and referencing relationships'),

  cardinality: () => wrap(`${defs}
    ${box(40, 50, 150, 60, C.blueSoft, '#b9c9d9')} ${label(115, 86, 'Material', 13)}
    ${box(300, 50, 150, 60, C.amberSoft, '#e6d3a8')} ${label(375, 86, 'Plant data', 13)}
    ${arrow(190, 80, 300, 80)} ${label(245, 68, '1 : N', 10, C.ink, 700, 'middle', mono)}
    ${label(245, 102, 'one material, many plants', 9, C.soft, 400)}
    ${box(500, 50, 230, 60, C.greenSoft, '#bfd8c8')} ${label(615, 86, '1 material + N plants', 12)}
    ${label(115, 150, '1:1', 12, C.ink, 700, 'middle', mono)} ${label(115, 172, 'one-to-one', 10, C.soft, 400)}
    ${label(300, 150, '1:N', 12, C.ink, 700, 'middle', mono)} ${label(300, 172, 'one-to-many', 10, C.soft, 400)}
    ${label(485, 150, 'N:1', 12, C.ink, 700, 'middle', mono)} ${label(485, 172, 'many-to-one', 10, C.soft, 400)}
    ${label(670, 150, 'N:M', 12, C.ink, 700, 'middle', mono)} ${label(670, 172, 'many-to-many', 10, C.soft, 400)}
    ${label(400, 232, 'Read it from the FROM side: “one Material has N Plant records.”', 11, C.ink, 500)}
    ${label(400, 254, 'Type 4 rule: exactly one leading relationship + one qualifying relationship (plus optional referencing).', 11, C.accent, 500)}
  `, 760, 270, 'Relationship cardinality and the type 4 rule'),

  hierarchy: () => wrap(`${defs}
    ${box(330, 30, 140, 46, C.blueSoft, '#b9c9d9')} ${label(400, 58, 'Total', 13)}
    ${box(180, 120, 140, 46, C.greenSoft, '#bfd8c8')} ${label(250, 148, 'North', 13)}
    ${box(410, 120, 140, 46, C.greenSoft, '#bfd8c8')} ${label(480, 148, 'South', 13)}
    ${box(100, 210, 140, 46, C.paper, C.line)} ${label(170, 238, 'Leaf A', 12)}
    ${box(270, 210, 140, 46, C.paper, C.line)} ${label(340, 238, 'Leaf B', 12)}
    ${box(470, 210, 140, 46, C.paper, C.line)} ${label(540, 238, 'Leaf C', 12)}
    ${arrow(370, 76, 270, 120)} ${arrow(430, 76, 470, 120)}
    ${arrow(230, 166, 180, 210)} ${arrow(270, 166, 320, 210)} ${arrow(490, 166, 520, 210)}
    ${label(400, 288, 'Enabled per entity type. Stored in a hierarchy table as parent → child links.', 11, C.soft, 400)}
  `, 760, 300, 'Entity hierarchy parent child example'),

  valueHelp: () => wrap(`${defs}
    ${box(40, 50, 220, 80, C.paper, C.line)} ${label(150, 80, 'Field: Unit of Measure', 12)} ${label(150, 104, 'data element MEINS', 10, C.soft, 400, 'middle', mono)}
    ${box(330, 50, 190, 80, C.greenSoft, '#bfd8c8')} ${label(425, 80, 'Check table T006', 12, C.green, 600)} ${label(425, 104, 'valid units only', 10, C.soft, 400)}
    ${box(590, 50, 170, 80, C.amberSoft, '#e6d3a8')} ${label(675, 80, 'Search help', 12, C.amber, 600)} ${label(675, 104, 'F4 pick list', 10, C.soft, 400)}
    ${arrow(260, 90, 330, 90, C.green)}
    ${label(400, 180, 'A check table validates the value.  A search help helps the user pick it.', 11, C.ink, 500)}
    ${label(400, 204, 'The domain can hold a value table; SAP proposes it as the check table.', 11, C.soft, 400)}
    ${label(400, 228, 'Search help can be assigned to attributes, hierarchy attributes, and type 1/2/3 entity types.', 10, C.muted, 400)}
  `, 800, 250, 'Check table, search help and value table'),

  crFlow: () => wrap(`${defs}
    ${box(20, 50, 150, 64, C.blueSoft, '#b9c9d9')} ${label(95, 78, '1 · Request', 12, C.blue, 700, 'middle', mono)} ${label(95, 98, 'create CR', 10, C.soft, 400)}
    ${box(200, 50, 130, 64, C.greenSoft, '#bfd8c8')} ${label(265, 78, '2 · Edit', 12, C.green, 700, 'middle', mono)} ${label(265, 98, 'enter data', 10, C.soft, 400)}
    ${box(360, 50, 130, 64, C.amberSoft, '#e6d3a8')} ${label(425, 78, '3 · Validate', 12, C.amber, 700, 'middle', mono)} ${label(425, 98, 'run checks', 10, C.soft, 400)}
    ${box(520, 50, 130, 64, C.violetSoft, '#d3c9ea')} ${label(585, 78, '4 · Review', 12, C.violet, 700, 'middle', mono)} ${label(585, 98, 'role approves', 10, C.soft, 400)}
    ${box(680, 50, 100, 64, C.greenSoft, '#bfd8c8')} ${label(730, 78, '5 · Activate', 11, C.green, 700, 'middle', mono)} ${label(730, 98, 'go live', 10, C.soft, 400)}
    ${arrow(170, 82, 200, 82)} ${arrow(330, 82, 360, 82)} ${arrow(490, 82, 520, 82)} ${arrow(650, 82, 680, 82)}
    ${label(400, 160, 'Approved?  →  yes: activate  ·  no: send back for correction or reject', 11, C.ink, 500)}
    ${label(400, 200, 'Staging area holds the request  →  active area holds the approved record.', 11, C.soft, 400)}
  `, 800, 225, 'Change request lifecycle from request to activation'),

  configSteps: () => wrap(`${defs}
    ${['Create model', 'Create entity types', 'Add attributes', 'Add relationships', 'Save + check', 'Activate', 'Adjust staging', 'Visualize']
      .map((t, i) => {
        const x = 30 + (i % 4) * 190, y = i < 4 ? 50 : 170;
        const colors = [C.blueSoft, C.greenSoft, C.amberSoft, C.violetSoft, C.blueSoft, C.greenSoft, C.amberSoft, C.violetSoft];
        const fg = [C.blue, C.green, C.amber, C.violet, C.blue, C.green, C.amber, C.violet];
        return `${box(x, y, 170, 62, colors[i], '#d8d4c6')}${label(x + 85, y + 28, `${i + 1}. ${t}`, 11, fg[i], 700, 'middle', mono)}${label(x + 85, y + 48, i === 0 ? 'Z/Y name' : i === 3 ? 'leading / qualifying' : i === 7 ? 'check the result' : '', 9, C.soft, 400)}`;
      }).join('')}
    ${label(400, 270, 'SPRO → Master Data Governance → General Settings → Data Modeling → Edit Data Model', 10, C.muted, 500, 'middle', mono)}
  `, 790, 290, 'Eight steps to configure a custom data model'),

  uiBlocks: () => wrap(`${defs}
    ${box(40, 40, 720, 200, C.paper, C.line, 14)}
    ${label(400, 70, 'OBJECT INSTANCE FLOORPLAN (OIF)', 11, C.ink, 700, 'middle', mono)}
    ${box(70, 88, 250, 60, C.blueSoft, '#b9c9d9')} ${label(195, 112, 'Identification Region', 12, C.blue, 600)} ${label(195, 132, 'key fields / search', 10, C.soft, 400)}
    ${box(340, 88, 390, 130, C.greenSoft, '#bfd8c8')}
    ${label(535, 112, 'Content area · Form UIBBs', 12, C.green, 600)}
    ${box(360, 128, 160, 34, C.paper, C.line)} ${label(440, 149, 'General data', 11)}
    ${box(540, 128, 170, 34, C.paper, C.line)} ${label(625, 149, 'Plant data', 11)}
    ${box(360, 176, 160, 34, C.paper, C.line)} ${label(440, 197, 'Texts', 11)}
    ${box(540, 176, 170, 34, C.paper, C.line)} ${label(625, 197, 'Validation msgs', 11)}
    ${label(400, 270, 'Application configuration  →  Identification Region  →  Object Instance Floorplan  →  UIBBs', 10, C.muted, 400, 'middle', mono)}
  `, 800, 290, 'UI model building blocks: application, identification region, floorplan, UIBBs'),

  workflow: () => wrap(`${defs}
    ${box(30, 70, 150, 64, C.blueSoft, '#b9c9d9')} ${label(105, 98, 'Requester', 12, C.blue, 700, 'middle', mono)} ${label(105, 118, 'creates request', 10, C.soft, 400)}
    ${box(220, 70, 150, 64, C.greenSoft, '#bfd8c8')} ${label(295, 98, 'Data Steward', 12, C.green, 700, 'middle', mono)} ${label(295, 118, 'checks quality', 10, C.soft, 400)}
    ${box(410, 70, 150, 64, C.amberSoft, '#e6d3a8')} ${label(485, 98, 'Reviewer', 12, C.amber, 700, 'middle', mono)} ${label(485, 118, 'business rule', 10, C.soft, 400)}
    ${box(600, 70, 160, 64, C.violetSoft, '#d3c9ea')} ${label(680, 98, 'Approver', 12, C.violet, 700, 'middle', mono)} ${label(680, 118, 'final decision', 10, C.soft, 400)}
    ${arrow(180, 102, 220, 102)} ${arrow(370, 102, 410, 102)} ${arrow(560, 102, 600, 102)}
    ${label(400, 180, 'Each step = a business activity + an agent (role, user, or rule).', 11, C.ink, 500)}
    ${label(400, 204, 'BRFplus can add rule-based decisions, validations and derivations.', 11, C.soft, 400)}
    ${label(400, 228, 'Rejection or “send back” must be designed, not left to chance.', 11, C.accent, 500)}
  `, 790, 250, 'Example approval workflow with roles'),

  mdgLandscape: () => wrap(`${defs}
    ${box(60, 50, 200, 90, C.blueSoft, '#b9c9d9')} ${label(160, 82, 'MDG HUB', 12, C.blue, 700, 'middle', mono)} ${label(160, 106, 'governance happens here', 11)} ${label(160, 126, 'one central place', 10, C.soft, 400)}
    ${box(540, 30, 190, 60, C.paper, C.line)} ${label(635, 56, 'S/4HANA', 12)} ${label(635, 76, 'business system', 10, C.soft, 400)}
    ${box(540, 110, 190, 60, C.paper, C.line)} ${label(635, 136, 'ECC', 12)} ${label(635, 156, 'legacy system', 10, C.soft, 400)}
    ${box(540, 190, 190, 60, C.paper, C.line)} ${label(635, 216, 'Other systems', 12)} ${label(635, 236, 'non-SAP / cloud', 10, C.soft, 400)}
    ${arrow(260, 95, 540, 60, C.green)} ${arrow(260, 95, 540, 140, C.green)} ${arrow(260, 95, 540, 220, C.green)}
    ${label(400, 44, 'approved data distributed', 10, C.green, 600, 'middle', mono)}
    ${label(400, 290, 'Co-deployment: MDG and business processing share one system.', 11, C.soft, 400)}
  `, 790, 300, 'MDG hub and co-deployment landscape'),
};

function renderDiagram(name) {
  const fn = diagrams[name];
  return fn ? fn() : '';
}


/* src/app.js */

const STORAGE_KEY = 'mdg-fieldnotes-progress-v3';
const defaults = { completed: [], notes: {}, activeLesson: 'dm-overview', mastered: [], theme: 'light' };
const appContent = document.querySelector('#app-content');
const nav = document.querySelector('#track-navigation');
const searchInput = document.querySelector('#lesson-search');
const breadcrumb = document.querySelector('#breadcrumb-current');
const palette = document.querySelector('#palette');
const paletteInput = document.querySelector('#palette-input');
const paletteResults = document.querySelector('#palette-results');

let state = loadState();
let view = 'overview';          // overview | lesson | interview
let selectedTrack = 'all';
let query = '';
let iqTrack = 'All topics';
let iqQuery = '';
let iqShowAll = false;
let iqOrder = interviewQuestions.map((q) => q.id);
let paletteItems = [];
let paletteIndex = 0;
let iqHighlight = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (saved && Array.isArray(saved.completed) && saved.notes && typeof saved.notes === 'object') {
      return { ...defaults, ...saved, mastered: Array.isArray(saved.mastered) ? saved.mastered : [] };
    }
  } catch { /* storage unavailable */ }
  return { ...defaults };
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* private browsing */ }
}
function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const icon = state.theme === 'dark' ? '☀' : '◐';
  document.querySelector('#theme-toggle').textContent = icon;
  const mobile = document.querySelector('#mobile-theme');
  if (mobile) mobile.textContent = icon;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', state.theme === 'dark' ? '#0f1014' : '#f6f5ef');
}
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState(); applyTheme();
}
function updateProgress() {
  const p = summarizeProgress(lessons, state.completed);
  const circumference = 2 * Math.PI * 18;
  const ring = document.querySelector('#ring-fill');
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference * (1 - p.percent / 100)}`;
  document.querySelector('#ring-percent').textContent = `${p.percent}%`;
  document.querySelector('#sidebar-progress-label').textContent = `${p.completed} of ${p.total}`;
  document.querySelector('#interview-count').textContent = `${state.mastered.length}/${interviewQuestions.length}`;
}

/* ── Navigation ──────────────────────────────────────────────── */
function renderNavigation() {
  nav.innerHTML = tracks.map((t) => {
    const active = view !== 'interview' && t.id === selectedTrack;
    return `<button class="track-link ${active ? 'is-active' : ''}" type="button" data-track="${esc(t.id)}" ${active ? 'aria-current="page"' : ''}>
      <span class="track-icon" aria-hidden="true">${esc(t.icon)}</span><span>${esc(t.label)}</span>
    </button>`;
  }).join('');
  nav.querySelectorAll('[data-track]').forEach((b) => b.addEventListener('click', () => {
    selectedTrack = b.dataset.track; query = ''; searchInput.value = ''; view = 'overview'; closeDrawer(); render();
  }));
  document.querySelector('#open-interview').classList.toggle('is-active', view === 'interview');
}

/* ── Block renderers ─────────────────────────────────────────── */
function block(b, i) {
  const id = b.t ? `sec-${slug(b.t)}` : `sec-${i}`;
  switch (b.k) {
    case 'p':
      return `<section class="block" ${b.t ? `id="${id}"` : ''}>${b.t ? `<h2>${esc(b.t)}</h2>` : ''}<p>${esc(b.b)}</p></section>`;
    case 'ul':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><ul class="bullets">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`;
    case 'ol':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><ol class="steps">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></section>`;
    case 'table':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><div class="table-wrap"><table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`;
    case 'note': {
      const icon = { why: '💡', tip: '🧠', warn: '⚠️', exam: '🎯' }[b.tone] || '📌';
      return `<aside class="note note-${esc(b.tone)}"><span class="note-icon" aria-hidden="true">${icon}</span><div><strong>${esc(b.t)}</strong><p>${esc(b.b)}</p></div></aside>`;
    }
    case 'example':
      return `<aside class="example" id="${id}"><span class="example-icon" aria-hidden="true">🌰</span><div><strong>${esc(b.t || 'Example')}</strong><p>${esc(b.b)}</p></div></aside>`;
    case 'diagram':
      return `<figure class="diagram" id="${id}"><div class="diagram-scroll">${renderDiagram(b.name)}</div><figcaption>${esc(b.caption)}</figcaption></figure>`;
    case 'compare':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><div class="compare">${b.cols.map((c) => `<div class="compare-col"><h3>${esc(c.h)}</h3><ul>${c.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></section>`;
    case 'terms':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><dl class="terms">${b.items.map((x) => `<div><dt>${esc(x.term)}</dt><dd>${esc(x.meaning)}</dd></div>`).join('')}</dl></section>`;
    case 'mnemonic':
      return `<aside class="mnemonic"><span class="mn-emoji" aria-hidden="true">🧩</span><div><strong>${esc(b.t)}</strong><ul>${b.lines.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></aside>`;
    case 'exam':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2>${b.items.map((x) => `<details class="qa"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</section>`;
    default:
      return '';
  }
}

function practiceCard(p) {
  if (!p) return '';
  return `<section class="practice" id="practice"><div class="practice-head"><span class="practice-badge">HANDS-ON</span><h2>${esc(p.title)}</h2></div><p class="practice-intro">${esc(p.intro)}</p>
    <ol class="steps">${p.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <div class="practice-checks"><div><h3>✅ Verify</h3><ul>${p.verify.map((v) => `<li>${esc(v)}</li>`).join('')}</ul></div><div><h3>⚠️ Traps</h3><ul>${p.traps.map((v) => `<li>${esc(v)}</li>`).join('')}</ul></div></div></section>`;
}
function recallCard(items) {
  if (!items?.length) return '';
  return `<section class="recall"><span class="recall-emoji" aria-hidden="true">🧠</span><div class="recall-body"><p class="eyebrow">ACTIVE RECALL</p><h2>Say it from memory</h2>${items.map((x) => `<details class="qa qa-dark"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</div></section>`;
}
function interviewCard(items) {
  if (!items?.length) return '';
  return `<section class="interview"><p class="eyebrow">INTERVIEW PRACTICE</p><h2>Questions you will hear</h2>${items.map((x) => `<details class="qa"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</section>`;
}

/* ── Overview ────────────────────────────────────────────────── */
function lessonCard(item, index) {
  const done = state.completed.includes(item.id);
  return `<button class="lesson-card ${done ? 'is-done' : ''}" type="button" data-lesson="${esc(item.id)}">
    <span class="lesson-number">${String(index + 1).padStart(2, '0')}</span>
    <span class="lesson-card-copy"><span class="lesson-card-title">${esc(item.title)}</span><span class="lesson-card-meta">${esc(item.track)} <i>·</i> ${esc(item.duration)}</span></span>
    <span class="lesson-status" aria-label="${done ? 'Completed' : 'Not completed'}">${done ? '✓' : '↗'}</span>
  </button>`;
}

let quickId = null;
function pickQuick() {
  quickId = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)].id;
}
function quickRecallCard() {
  if (!quickId) pickQuick();
  const q = interviewQuestions.find((x) => x.id === quickId) ?? interviewQuestions[0];
  return `<section class="quick-recall">
    <div class="qr-top"><p class="eyebrow">3-MINUTE RECALL</p><span class="qr-tag">${esc(q.track)}</span></div>
    <h2>${esc(q.q)}</h2>
    <details class="qa qa-dark"><summary>Reveal answer</summary><p>${esc(q.a)}</p><p class="qr-trick">🧠 ${esc(q.trick)}</p></details>
    <div class="qr-actions"><button type="button" class="button button-ghost" id="quick-another">🔀 Another question</button><button type="button" class="text-button qr-open" id="quick-open">Open interview bank →</button></div>
  </section>`;
}

function renderOverview() {
  const p = summarizeProgress(lessons, state.completed);
  const filtered = searchLessons(lessons, query);
  const visible = selectedTrack === 'all' ? filtered : filtered.filter((l) => l.track === selectedTrack);
  const current = findLesson(lessons, state.activeLesson) ?? lessons[0];
  const track = tracks.find((t) => t.id === selectedTrack);
  const heading = query ? 'Search results' : selectedTrack === 'all' ? 'Your field guide to SAP MDG' : track?.label ?? 'Learning path';
  breadcrumb.textContent = query ? 'Search' : selectedTrack === 'all' ? 'Overview' : track?.label ?? 'Overview';
  appContent.innerHTML = `<section class="hero">
    <div class="hero-copy"><p class="eyebrow">A PRACTICAL, BEGINNER-FRIENDLY GUIDE</p><h1>${esc(heading)}</h1><p class="lede">${query ? `Lessons matching “${esc(query)}”.` : selectedTrack === 'all' ? 'Understand the why, learn the how, then practise it in your SAP system.' : esc(track?.description ?? '')}</p>
    <div class="hero-actions"><button class="button button-dark" data-lesson="${esc(current.id)}">Continue: ${esc(current.title.slice(0, 34))}${current.title.length > 34 ? '…' : ''} <span aria-hidden="true">→</span></button><button class="button button-ghost" id="hero-interview">🎤 Interview bank <b>${interviewQuestions.length}</b></button></div></div>
    <div class="hero-art" aria-hidden="true"><div class="orb orb-a"></div><div class="orb orb-b"></div><div class="orbit-card"><span class="orbit-label">PROGRESS</span><strong>${p.percent}%</strong><span class="orbit-sub">${p.completed} of ${p.total} lessons</span></div></div>
  </section>
  ${selectedTrack === 'all' && !query ? `<section class="continue-card"><div class="continue-art" aria-hidden="true"><span>MDG</span><i></i><i></i><i></i></div><div class="continue-copy"><p class="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2>${esc(current.title)}</h2><p>${esc(current.intro)}</p></div><button type="button" class="button button-dark" data-lesson="${esc(current.id)}">Open lesson <span aria-hidden="true">→</span></button></section>
  <section class="tomorrow-banner"><span class="tomorrow-icon" aria-hidden="true">✳</span><div><strong>Tomorrow in your SAP system</strong><p>Start with the system-orientation checklist. Confirm your system and training scope before making changes.</p></div><button type="button" class="text-button" data-lesson="tomorrow-checklist">Open checklist <span aria-hidden="true">→</span></button></section>
  ${quickRecallCard()}
  <section class="track-overview"><div class="section-heading"><div><p class="eyebrow">THE LEARNING PATH</p><h2>Build understanding, one layer at a time</h2></div><span>${lessons.length} lessons</span></div><div class="track-grid">${tracks.filter((t) => t.id !== 'all').map((t) => {
    const count = lessons.filter((l) => l.track === t.id).length;
    return `<button type="button" class="track-card" data-track="${esc(t.id)}"><span class="track-card-icon">${esc(t.icon)}</span><span class="track-card-title">${esc(t.label)}</span><span class="track-card-description">${esc(t.description)}</span><span class="track-card-count">${count} ${count === 1 ? 'lesson' : 'lessons'} <b aria-hidden="true">↗</b></span></button>`;
  }).join('')}</div></section>` : ''}
  <section class="lesson-list-section"><div class="section-heading"><div><p class="eyebrow">${query ? 'MATCHING LESSONS' : selectedTrack === 'all' ? 'ALL LESSONS' : 'IN THIS MODULE'}</p><h2>${query ? `${visible.length} result${visible.length === 1 ? '' : 's'}` : selectedTrack === 'all' ? 'Explore the lessons' : 'Lessons'}</h2></div></div>
  ${visible.length ? `<div class="lesson-list">${visible.map(lessonCard).join('')}</div>` : `<div class="empty-state"><strong>No lessons found</strong><p>Try another search term or choose a different module.</p></div>`}</section>`;
  appContent.querySelectorAll('[data-lesson]').forEach((b) => b.addEventListener('click', () => openLesson(b.dataset.lesson)));
  appContent.querySelectorAll('[data-track]').forEach((b) => b.addEventListener('click', () => { selectedTrack = b.dataset.track; query = ''; searchInput.value = ''; view = 'overview'; render(); }));
  const heroInterview = document.querySelector('#hero-interview');
  if (heroInterview) heroInterview.addEventListener('click', () => openInterview());
  const quickAnother = document.querySelector('#quick-another');
  if (quickAnother) quickAnother.addEventListener('click', () => { pickQuick(); render(); });
  const quickOpen = document.querySelector('#quick-open');
  if (quickOpen) quickOpen.addEventListener('click', () => openInterview(quickId));
}

/* ── Lesson ──────────────────────────────────────────────────── */
function openLesson(id) {
  const item = findLesson(lessons, id);
  if (!item) return;
  state.activeLesson = item.id;
  saveState();
  view = 'lesson';
  closeDrawer();
  render();
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

function renderLesson(item) {
  breadcrumb.textContent = item.title;
  const index = lessons.findIndex((l) => l.id === item.id);
  const done = state.completed.includes(item.id);
  const toc = item.sections.filter((b) => b.t && !['note', 'mnemonic', 'example'].includes(b.k)).map((b) => ({ id: `sec-${slug(b.t)}`, t: b.t }));
  const mobileToc = toc.length ? `<details class="mobile-toc"><summary>📑 In this lesson</summary><div class="mobile-toc-links"><a href="#practice">Hands-on</a>${toc.map((x) => `<a href="#${x.id}">${esc(x.t)}</a>`).join('')}</div></details>` : '';
  appContent.innerHTML = `<article class="lesson-page">
    <button class="back-link" type="button" id="back-to-module"><span aria-hidden="true">←</span> Back to ${esc(item.track)}</button>
    <header class="lesson-header">
      <div class="lesson-kicker"><span class="badge badge-${esc(item.level.toLowerCase())}">${esc(item.level)}</span><span>${esc(item.module)}</span><span aria-hidden="true">·</span><span>${esc(item.duration)}</span></div>
      <h1>${esc(item.title)}</h1>
      <p class="lesson-intro">${esc(item.intro)}</p>
    </header>
    <div class="lesson-layout">
      <div class="lesson-body">
        ${mobileToc}
        ${item.sections.map(block).join('')}
        ${practiceCard(item.practice)}
        ${recallCard(item.recall)}
        ${interviewCard(item.interview)}
        <section class="notes-panel"><label for="lesson-notes"><span class="eyebrow">YOUR FIELD NOTES</span><span class="notes-hint">Saved on this device</span></label><textarea id="lesson-notes" rows="4" placeholder="What did you observe? What do you want to ask? Explain it in your own words…"></textarea><span class="save-status" id="save-status" role="status" aria-live="polite">Notes are stored locally in this browser.</span></section>
        <div class="lesson-actions"><button class="button ${done ? 'button-complete' : 'button-dark'}" type="button" id="complete-lesson">${done ? '✓ Completed · mark to revisit' : 'Mark lesson complete'}</button><span>Completion is saved in this browser.</span><button class="button button-ghost mobile-next" type="button" id="next-lesson-mobile">Next lesson →</button></div>
      </div>
      <aside class="lesson-aside">
        <div class="aside-card"><p class="eyebrow">LESSON ${String(index + 1).padStart(2, '0')} / ${String(lessons.length).padStart(2, '0')}</p><strong>${esc(item.track)}</strong><span>${esc(item.duration)} read</span>${toc.length ? `<hr><p class="toc-label">IN THIS LESSON</p><a class="toc-link" href="#practice">Hands-on</a>${toc.map((x) => `<a class="toc-link" href="#${x.id}">${esc(x.t)}</a>`).join('')}` : ''}<hr><p>Remember the loop</p><div class="memory-loop"><span>WHAT</span><b>→</b><span>WHY</span><b>→</b><span>HOW</span></div><small>Explain it simply. Connect it to a real task. Then check it in the system.</small></div>
        <button class="aside-next" type="button" id="next-lesson">${index < lessons.length - 1 ? `Next: ${esc(lessons[index + 1].title)} <span aria-hidden="true">→</span>` : 'Back to learning path <span aria-hidden="true">→</span>'}</button>
      </aside>
    </div>
  </article>`;
  document.querySelector('#back-to-module').addEventListener('click', () => { selectedTrack = item.track; view = 'overview'; render(); });
  const notes = document.querySelector('#lesson-notes');
  notes.value = state.notes[item.id] ?? '';
  let timer;
  notes.addEventListener('input', () => {
    state.notes[item.id] = notes.value;
    const status = document.querySelector('#save-status');
    status.textContent = 'Saving…';
    clearTimeout(timer);
    timer = setTimeout(() => { saveState(); status.textContent = 'Saved on this device.'; }, 250);
  });
  document.querySelector('#complete-lesson').addEventListener('click', () => {
    state.completed = done ? state.completed.filter((x) => x !== item.id) : [...new Set([...state.completed, item.id])];
    saveState(); render();
  });
  document.querySelector('#next-lesson').addEventListener('click', () => index < lessons.length - 1 ? openLesson(lessons[index + 1].id) : goHome());
  const mobileNext = document.querySelector('#next-lesson-mobile');
  if (mobileNext) mobileNext.addEventListener('click', () => index < lessons.length - 1 ? openLesson(lessons[index + 1].id) : goHome());
}

/* ── Interview bank ──────────────────────────────────────────── */
function openInterview(id) {
  view = 'interview';
  iqQuery = '';
  iqTrack = 'All topics';
  iqHighlight = id ?? null;
  closeDrawer();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderInterview() {
  breadcrumb.textContent = 'Interview Q&A';
  const masteredCount = interviewQuestions.filter((q) => state.mastered.includes(q.id)).length;
  const search = iqQuery.trim().toLowerCase();
  const byTrack = iqTrack === 'All topics' ? interviewQuestions : interviewQuestions.filter((q) => q.track === iqTrack);
  const matches = byTrack.filter((q) => !search || `${q.q} ${q.a} ${q.trick} ${q.track} ${q.level}`.toLowerCase().includes(search));
  const ordered = iqOrder.map((id) => matches.find((q) => q.id === id)).filter(Boolean);
  const list = ordered.length === matches.length ? ordered : matches;

  appContent.innerHTML = `<section class="iq-hero">
    <div><p class="eyebrow">INTERVIEW PREPARATION</p><h1>Interview Q&amp;A</h1><p class="lede">${interviewQuestions.length} questions with plain-English answers, a real example, and a memory trick. Filter by topic, search, then reveal.</p></div>
    <div class="iq-stats"><div><strong>${interviewQuestions.length}</strong><span>questions</span></div><div><strong>${masteredCount}</strong><span>mastered</span></div><div><strong>${interviewQuestions.length - masteredCount}</strong><span>to go</span></div></div>
  </section>
  <div class="iq-toolbar">
    <div class="chip-row" role="group" aria-label="Filter interview questions by topic">${interviewTracks.map((t) => `<button type="button" class="chip ${t === iqTrack ? 'is-active' : ''}" data-iq-track="${esc(t)}">${esc(t)}</button>`).join('')}</div>
    <div class="iq-tools">
      <label class="search-box iq-search"><span aria-hidden="true">⌕</span><span class="visually-hidden">Search interview questions</span><input id="iq-search" type="search" placeholder="Search questions or answers…" value="${esc(iqQuery)}"></label>
      <button type="button" class="button button-ghost" id="iq-shuffle">🔀 Shuffle</button>
      <button type="button" class="button button-ghost" id="iq-toggle-all">${iqShowAll ? '🙈 Hide answers' : '👁 Show all answers'}</button>
    </div>
  </div>
  <div class="iq-meta"><span>${list.length} question${list.length === 1 ? '' : 's'}</span><span>Tip: cover the answer, say it out loud, then reveal.</span></div>
  <div class="iq-list">${list.length ? list.map(iqCard).join('') : `<div class="empty-state"><strong>No questions found</strong><p>Try another search term or topic.</p></div>`}</div>`;

  document.querySelectorAll('[data-iq-track]').forEach((b) => b.addEventListener('click', () => { iqTrack = b.dataset.iqTrack; render(); }));
  const iqSearch = document.querySelector('#iq-search');
  iqSearch.addEventListener('input', () => {
    iqQuery = iqSearch.value;
    const pos = iqSearch.selectionStart;
    render();
    const next = document.querySelector('#iq-search');
    next.focus();
    try { next.setSelectionRange(pos, pos); } catch { /* ignore */ }
  });
  document.querySelector('#iq-shuffle').addEventListener('click', () => {
    iqOrder = [...iqOrder].sort(() => Math.random() - 0.5);
    render();
  });
  document.querySelector('#iq-toggle-all').addEventListener('click', () => {
    iqShowAll = !iqShowAll;
    render();
  });
  document.querySelectorAll('[data-master]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.master;
    state.mastered = state.mastered.includes(id) ? state.mastered.filter((x) => x !== id) : [...state.mastered, id];
    saveState(); updateProgress(); render();
  }));
  if (iqHighlight) {
    const card = document.querySelector(`[data-iq="${iqHighlight}"]`);
    if (card) {
      card.classList.add('is-highlight');
      card.querySelector('details')?.setAttribute('open', '');
      card.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    iqHighlight = null;
  }
}

function iqCard(q) {
  const mastered = state.mastered.includes(q.id);
  return `<article class="iq-card ${mastered ? 'is-mastered' : ''}" data-iq="${esc(q.id)}" id="iq-${esc(q.id)}">
    <div class="iq-top"><span class="iq-level iq-${esc(q.level.toLowerCase())}">${esc(q.level)}</span><span class="iq-track">${esc(q.track)}</span><button type="button" class="master-btn ${mastered ? 'is-on' : ''}" data-master="${esc(q.id)}" aria-pressed="${mastered}">${mastered ? '✓ Mastered' : 'Mark mastered'}</button></div>
    <h3 class="iq-q">${esc(q.q)}</h3>
    <details class="iq-answer" ${iqShowAll ? 'open' : ''}><summary>Show answer</summary>
      <p class="iq-a">${esc(q.a)}</p>
      <p class="iq-eg"><b>Example</b> ${esc(q.example)}</p>
      <p class="iq-trick"><b>🧠 Trick</b> ${esc(q.trick)}</p>
    </details>
  </article>`;
}

/* ── Command palette ─────────────────────────────────────────── */
function paletteSource() {
  const lessonItems = lessons.map((l) => ({ kind: 'lesson', id: l.id, title: l.title, meta: `${l.track} · ${l.duration}` }));
  const questionItems = interviewQuestions.map((q) => ({ kind: 'interview', id: q.id, title: q.q, meta: `Interview · ${q.track}` }));
  return [...lessonItems, ...questionItems];
}
function renderPalette(text = '') {
  const term = text.trim().toLowerCase();
  const all = paletteSource();
  paletteItems = (term ? all.filter((x) => `${x.title} ${x.meta}`.toLowerCase().includes(term)) : all).slice(0, 12);
  paletteIndex = 0;
  paletteResults.innerHTML = paletteItems.length
    ? paletteItems.map((x, i) => `<button type="button" class="palette-item ${i === 0 ? 'is-active' : ''}" data-pi="${i}"><span class="palette-kind">${x.kind === 'lesson' ? 'LESSON' : 'Q&A'}</span><span class="palette-title">${esc(x.title)}</span><span class="palette-meta">${esc(x.meta)}</span></button>`).join('')
    : `<div class="palette-empty">No matches. Try “qualifying”, “type 4”, or “workflow”.</div>`;
  paletteResults.querySelectorAll('[data-pi]').forEach((b) => b.addEventListener('click', () => choosePalette(Number(b.dataset.pi))));
}
function choosePalette(i) {
  const item = paletteItems[i];
  if (!item) return;
  closePalette();
  if (item.kind === 'lesson') openLesson(item.id);
  else openInterview(item.id);
}
function movePalette(delta) {
  if (!paletteItems.length) return;
  paletteIndex = (paletteIndex + delta + paletteItems.length) % paletteItems.length;
  paletteResults.querySelectorAll('[data-pi]').forEach((b, i) => b.classList.toggle('is-active', i === paletteIndex));
  paletteResults.querySelector(`[data-pi="${paletteIndex}"]`)?.scrollIntoView({ block: 'nearest' });
}
function openPalette() {
  palette.hidden = false;
  paletteInput.value = '';
  renderPalette('');
  paletteInput.focus();
}
function closePalette() { palette.hidden = true; }

/* ── Render + events ─────────────────────────────────────────── */
function goHome() { view = 'overview'; selectedTrack = 'all'; query = ''; searchInput.value = ''; render(); }
function render() {
  renderNavigation();
  updateProgress();
  updateBottomNav();
  if (view === 'interview') { renderInterview(); return; }
  if (view === 'lesson') {
    const item = findLesson(lessons, state.activeLesson);
    if (item) { renderLesson(item); return; }
  }
  renderOverview();
}

searchInput.addEventListener('input', () => { query = searchInput.value; selectedTrack = 'all'; view = 'overview'; render(); searchInput.focus(); });
document.querySelector('.brand').addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); goHome(); });
const mobileBrand = document.querySelector('.mobile-brand');
if (mobileBrand) mobileBrand.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); goHome(); });
document.querySelector('#open-interview').addEventListener('click', () => openInterview());
document.querySelector('#theme-toggle').addEventListener('click', toggleTheme);
const mobileTheme = document.querySelector('#mobile-theme');
if (mobileTheme) mobileTheme.addEventListener('click', toggleTheme);

/* Mobile drawer + bottom navigation */
const sidebar = document.querySelector('.sidebar');
const scrim = document.querySelector('#drawer-scrim');
const menuButton = document.querySelector('#mobile-menu');
function openDrawer() {
  sidebar.classList.add('is-open');
  scrim.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.classList.add('drawer-open');
}
function closeDrawer() {
  if (!sidebar.classList.contains('is-open')) return;
  sidebar.classList.remove('is-open');
  scrim.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('drawer-open');
}
if (menuButton) menuButton.addEventListener('click', () => sidebar.classList.contains('is-open') ? closeDrawer() : openDrawer());
if (scrim) scrim.addEventListener('click', closeDrawer);
const mobileSearch = document.querySelector('#mobile-search');
if (mobileSearch) mobileSearch.addEventListener('click', () => openPalette());

function updateBottomNav() {
  document.querySelectorAll('[data-nav]').forEach((b) => {
    const n = b.dataset.nav;
    const active = (n === 'home' && view === 'overview') || (n === 'learn' && view === 'lesson') || (n === 'interview' && view === 'interview');
    b.classList.toggle('is-active', active);
  });
}
document.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => {
  const nav = b.dataset.nav;
  closeDrawer();
  if (nav === 'home') goHome();
  else if (nav === 'learn') { if (view === 'lesson') render(); else openLesson(state.activeLesson || lessons[0].id); }
  else if (nav === 'interview') openInterview();
  else if (nav === 'search') openPalette();
}));
document.querySelector('#palette-open').addEventListener('click', openPalette);
paletteInput.addEventListener('input', () => renderPalette(paletteInput.value));
palette.addEventListener('click', (e) => { if (e.target === palette) closePalette(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('is-open')) { e.preventDefault(); closeDrawer(); return; }
  const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
  if (!palette.hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); movePalette(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); movePalette(-1); }
    if (e.key === 'Enter') { e.preventDefault(); choosePalette(paletteIndex); }
    return;
  }
  if (e.key === '/' && !typing) { e.preventDefault(); searchInput.focus(); }
  if (e.key === 'Escape' && document.activeElement === searchInput) { searchInput.value = ''; query = ''; view = 'overview'; searchInput.blur(); render(); }
});

applyTheme();
render();

})();
