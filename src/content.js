// Learning content, written in plain English. Short sentences + a real example in every lesson.
const L = (o) => o;

export const lessons = [
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

export const tracks = [
  { id: 'all', label: 'All learning', icon: '◈', description: 'Your complete path from SAP basics to governed master data.' },
  { id: 'Foundations', label: 'Foundations', icon: '01', description: 'SAP, MDG, landscape patterns, and the request journey.' },
  { id: 'Data modeling', label: 'Data modeling', icon: '02', description: 'Things, fields, links, keys, trees, and custom models.' },
  { id: 'UI modeling', label: 'UI modeling', icon: '03', description: 'Turn the model into screens people can use.' },
  { id: 'Process modeling', label: 'Process modeling', icon: '04', description: 'Route requests through checks, reviews, decisions, and go-live.' },
  { id: 'MDG-M', label: 'MDG-M · Materials', icon: 'M', description: 'Practise a material request from start to finish.' },
  { id: 'MDG-F', label: 'MDG-F · Financials', icon: 'F', description: 'Practise a financial data request safely.' },
  { id: 'Practice', label: 'System practice', icon: '↗', description: 'Prepare for the system and record what you see.' }
];
