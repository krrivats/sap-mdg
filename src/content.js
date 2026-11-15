// Learning content. Plain-English explanations, visual blocks, practice and interview prep.
const L = (o) => o;

export const lessons = [
  L({
    id: 'mdg-basics', track: 'Foundations', module: 'Start here', title: 'MDG in plain words', duration: '6 min', level: 'Beginner',
    intro: 'SAP Master Data Governance (MDG) is a controlled way for people to propose, check, approve, and publish important business data. Think of it as a staffed quality gate for master data.',
    terms: ['master data', 'governance', 'change request', 'staging area', 'active area'],
    tags: ['basics', 'intro'],
    sections: [
      { k: 'p', t: 'The one-sentence version', b: 'MDG makes sure the data that many teams depend on is requested once, checked properly, approved by the right people, and then made available everywhere it is needed.' },
      { k: 'table', t: 'Master data vs transaction data', head: ['', 'Master data', 'Transaction data'], rows: [
        ['What it is', 'The “who / what / where” you reuse', 'A single business event'],
        ['Example', 'Material, supplier, customer, company code', 'A purchase order, an invoice, a goods receipt'],
        ['Changes', 'Slowly, and carefully', 'Every day, all the time'],
        ['Why govern it?', 'A mistake spreads into many transactions', 'A mistake usually stays in that one document']
      ] },
      { k: 'diagram', name: 'crFlow', caption: 'A change request carries a proposed change from request to activation.' },
      { k: 'note', tone: 'why', t: 'Why the process exists', b: 'If everyone can change master data directly, two teams can create the same material twice, a wrong value can reach accounting, and nobody can explain who approved what. MDG replaces that with one traceable path.' },
      { k: 'ul', t: 'What MDG gives you', items: [
        'A request object (the change request, or CR) that records the proposed change.',
        'A staging area where unapproved data waits, separate from live data.',
        'Checks and approvals that run before anything becomes active.',
        'An audit trail: who asked, who changed, who approved, and when.',
        'A way to distribute the approved record to connected systems.'
      ] },
      { k: 'note', tone: 'tip', t: 'Remember it as a restaurant', b: 'The requester places an order, the kitchen prepares it, the quality check happens before it leaves, and only then is it served. MDG is the kitchen pass, not the menu.' }
    ],
    recall: [{ q: 'Explain MDG in one sentence without SAP jargon.', a: 'MDG controls how important business data is requested, checked, approved, and made available to the business.' }],
    interview: [
      { q: 'Why not let every user edit master data directly?', a: 'Direct edits can bypass ownership, checks, approvals, and consistent distribution. Governance makes changes traceable and controlled.' },
      { q: 'What is the difference between staging and active data?', a: 'Staging holds unapproved data inside a change request. Active data is approved and available for applications to use.' }
    ],
    practice: { title: 'Try it in your head', intro: 'No SAP system needed yet.', steps: ['Pick one object you know, such as a material or a vendor.', 'Write down who would request it, who would check it, and who would approve it.', 'Name one downstream team that would be hurt by a wrong value.'], verify: ['You can name the requester, checker, approver and consumer.'], traps: ['Do not confuse “approved” with “active and distributed” — they are separate events.'] }
  }),

  L({
    id: 'sap-landscape', track: 'Foundations', module: 'Start here', title: 'ECC, S/4HANA, and where MDG fits', duration: '7 min', level: 'Beginner',
    intro: 'ECC and S/4HANA are SAP business application generations. MDG is a governance capability that can run in a central hub or alongside business processing, depending on the landscape.',
    terms: ['ECC', 'S/4HANA', 'hub', 'co-deployment', 'replication'],
    tags: ['landscape', 'architecture'],
    sections: [
      { k: 'p', t: 'Why you must know the landscape', b: 'The same task can live in different systems. Before you click anything, know which system holds the request, which system holds the active record, and which systems receive the result.' },
      { k: 'diagram', name: 'mdgLandscape', caption: 'A hub governs centrally; co-deployment puts governance and business processing together.' },
      { k: 'table', t: 'Common terms', head: ['Term', 'Simple meaning'], rows: [
        ['ECC', 'An older SAP ERP generation. Many companies still run it.'],
        ['S/4HANA', 'The newer SAP ERP suite, built on the HANA database.'],
        ['MDG hub', 'A central system where governance is performed for other systems.'],
        ['Co-deployment', 'MDG and business processing run in the same SAP system.'],
        ['Connected system', 'Another system that sends data to, or receives data from, the hub.']
      ] },
      { k: 'note', tone: 'warn', t: 'Before following any click path', b: 'Confirm the product and release, the system ID and client, whether you are in the hub or a connected system, and whether you have authorisation. If any of these is unclear, stop and ask.' },
      { k: 'mnemonic', t: 'Memory hook: “S.S.C.R.”', lines: ['System — which system am I in?', 'Scope — hub or connected?', 'Client — training or production?', 'Role — what am I allowed to do?'] }
    ],
    recall: [{ q: 'What should you confirm before following a system-specific click path?', a: 'The SAP product/release, system/client, whether it is the hub or a connected system, and your authorization.' }],
    interview: [
      { q: 'Does ECC experience mean every S/4HANA MDG screen will look the same?', a: 'No. Core ideas carry over, but application versions, configuration, and system landscapes can differ.' },
      { q: 'What is replication?', a: 'Sending governed master data from the governance system to a connected system that needs to use it.' }
    ],
    practice: { title: 'Draw your landscape', intro: 'A five-minute exercise you can repeat with your trainer.', steps: ['Draw three boxes: governance, source of truth, receiver.', 'Draw arrows for where the request starts and where approved data goes.', 'Write the system ID and client under each box.'], verify: ['You can point to the system where you will create a request.'], traps: ['Never practise in production. Ask which client is safe.'] }
  }),

  L({
    id: 'governance-cycle', track: 'Foundations', module: 'Start here', title: 'The change-request journey', duration: '8 min', level: 'Beginner',
    intro: 'A change request (CR) is a guided workflow for a proposed master-data change. It records the request, its current step, the people involved, and the decision.',
    terms: ['change request', 'status', 'activation', 'workflow', 'staging'],
    tags: ['process', 'workflow', 'basics'],
    sections: [
      { k: 'p', t: 'The six moments', b: 'Almost every MDG process can be understood as six moments: request, edit, validate, review, approve or reject, then activate. Distribution may follow activation.' },
      { k: 'diagram', name: 'crFlow', caption: 'The change request lifecycle.' },
      { k: 'ol', t: 'Walk through one request', items: [
        'Request — choose a change request type and give a reason.',
        'Edit — enter the proposed data in the staging area.',
        'Validate — run configured checks; fix errors and warnings.',
        'Review — route the request to the responsible role or roles.',
        'Decide — approve, reject, or send back for correction.',
        'Activate — make the accepted data active; distribution may follow.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview trap', b: '“Approved” does not automatically mean “active and replicated.” Approval is a decision; activation makes data usable; distribution sends it onward. They are separate events and can fail separately.' },
      { k: 'table', t: 'Statuses you will meet (names vary by configuration)', head: ['Moment', 'Typical status idea'], rows: [
        ['Created', 'Draft / in process'], ['Submitted', 'In approval / in review'], ['Returned', 'Sent back for correction'], ['Approved', 'Approved, not yet active'], ['Activated', 'Active and usable'], ['Rejected', 'Stopped, with a reason']
      ] }
    ],
    recall: [{ q: 'Name the six moments of a change request.', a: 'Request, edit, validate, review, decide, activate.' }],
    interview: [
      { q: 'What information should a good change request carry besides field values?', a: 'A reason, request type, requester/owner, status, and a traceable review and decision history.' },
      { q: 'A CR is approved but the downstream system is unchanged. What do you check?', a: 'Activation, replication/distribution status, target-system connectivity, and relevant error logs.' }
    ],
    practice: { title: 'Map a real approval', intro: 'Use a process you already know.', steps: ['Write the request type.', 'List each role that touches it.', 'Mark where it can be rejected or returned.', 'Mark the exact moment it becomes active.'], verify: ['Your diagram shows a rejection path, not only the happy path.'], traps: ['A process with no rejection path is incomplete.'] }
  }),

  L({
    id: 'deployment-patterns', track: 'Foundations', module: 'Landscape choices', title: 'Hub and co-deployment', duration: '8 min', level: 'Beginner',
    intro: 'Deployment describes where MDG governance runs in relation to the business system. “Hub” means a central governance system; “co-deployment” means governance and business processing share a system.',
    terms: ['hub deployment', 'co-deployment', 'replication', 'source of truth'],
    tags: ['architecture', 'landscape'],
    sections: [
      { k: 'diagram', name: 'mdgLandscape', caption: 'Hub versus co-deployment.' },
      { k: 'table', t: 'The practical difference', head: ['Question', 'Hub', 'Co-deployment'], rows: [
        ['Where is the request created?', 'In the central hub', 'In the same system that does business processing'],
        ['Where does approved data go?', 'To one or more connected systems', 'Usually used in the same system, and may also be sent onward'],
        ['Typical benefit', 'One central governance point', 'Simpler landscape, fewer system hops'],
        ['Typical concern', 'Integration and latency', 'Coupling and system load']
      ] },
      { k: 'note', tone: 'warn', t: 'Do not change deployment casually', b: 'Deployment is an architecture decision. It affects connections, data ownership, operations and transport. Your project or system team owns that decision.' },
      { k: 'mnemonic', t: 'Memory hook: “Hub = Head office”', lines: ['Hub — one head office approves for many branches.', 'Co-deployment — the branch manager and the approver sit in the same office.'] }
    ],
    recall: [{ q: 'What is the key difference between a hub and co-deployment?', a: 'Whether governance runs centrally in a separate hub system or together with business processing in the same system.' }],
    interview: [
      { q: 'Name one design question that matters when using a hub.', a: 'Which system is authoritative for the governed object, and how approved changes are sent to connected systems.' },
      { q: 'What is a risk of a connected system editing the same record independently?', a: 'Conflicting values and unclear ownership; the source of truth must be defined.' }
    ],
    practice: { title: 'Spot the pattern', intro: 'Read a landscape diagram and decide.', steps: ['Count the systems.', 'Find where the request is created.', 'Find where the active record is stored.', 'Name one integration risk.'], verify: ['You can say whether it is hub or co-deployment and why.'], traps: ['A diagram can show both patterns for different objects.'] }
  }),

  /* ───────────────────────── DATA MODELING ───────────────────────── */

  L({
    id: 'dm-overview', track: 'Data modeling', module: 'Model the data', title: 'What is an MDG data model?', duration: '9 min', level: 'Core',
    intro: 'A data model is the blueprint of the master data you govern. It has three building blocks: entity types, attributes, and relationships. MDG uses this blueprint to create the tables that store your data.',
    terms: ['data model', 'entity type', 'attribute', 'relationship', 'staging area', 'active area'],
    tags: ['data model', 'entity', 'attribute', 'relationship', 'fundamentals'],
    sections: [
      { k: 'p', t: 'Definition you can repeat', b: 'A data model in MDG consists of entity types, attributes, and relationships. The structure of the model determines the key and non-key fields of the database tables that store the data.' },
      { k: 'diagram', name: 'anatomy', caption: 'Entity type + attribute + relationship = data model.' },
      { k: 'ul', t: 'The three building blocks', items: [
        'Entity type — the business thing, such as Material, Supplier, or Material–Plant.',
        'Attribute — a fact about that thing, such as material number, description, or unit of measure.',
        'Relationship — how two entity types are connected, such as Material → Plant.'
      ] },
      { k: 'diagram', name: 'activeStaging', caption: 'Staging versus active area.' },
      { k: 'table', t: 'Two areas you must not confuse', head: ['Area', 'What it holds', 'Who sees it'], rows: [
        ['Staging area', 'Unapproved data that is part of a change request', 'People working on the request'],
        ['Active area', 'Approved data that applications can use', 'Business applications and users']
      ] },
      { k: 'note', tone: 'why', t: 'Why model first', b: 'The UI model presents the data model, and the process model routes requests about the data model. If the model is wrong, the screens are wrong and the workflow approves the wrong thing. Model first, then UI, then process.' },
      { k: 'diagram', name: 'layers', caption: 'Build order: data → UI → process.' },
      { k: 'note', tone: 'tip', t: 'The five questions to ask about any model', b: 'What is one record? What identifies it? What facts belong to it? What does it connect to? Who is allowed to change it?' }
    ],
    recall: [{ q: 'Name the three building blocks of a data model.', a: 'Entity types, attributes, and relationships.' }],
    interview: [
      { q: 'What does a data model determine?', a: 'The key and non-key fields of the generated database tables, and therefore what data MDG can store and govern.' },
      { q: 'What is the difference between the staging area and the active area?', a: 'Staging holds unapproved data in a change request; the active area holds approved data available to applications.' }
    ],
    practice: { title: 'Sketch a mini model', intro: 'Use a familiar object, such as a book or a vehicle.', steps: ['Name one entity type.', 'List three attributes, marking the key.', 'Name one related entity type and the relationship.', 'Say what one record means in one sentence.'], verify: ['A colleague can read your sketch and explain what one record is.'], traps: ['Do not put “everything” in one entity. Group by meaning.'] }
  }),

  L({
    id: 'dm-modes', track: 'Data modeling', module: 'Model the data', title: 'Reuse mode vs flex mode', duration: '8 min', level: 'Core',
    intro: 'Reuse and flex describe how the active area is stored. Reuse uses existing application tables. Flex lets MDG generate its own active-area tables from the data model. The staging area is MDG-managed in both.',
    terms: ['reuse mode', 'flex mode', 'active area', 'reuse class', 'generated tables', 'data model 0G'],
    tags: ['reuse', 'flex', 'active area', 'modes'],
    sections: [
      { k: 'p', t: 'Start with the active area', b: 'The active area is where approved data lives for applications. Reuse and flex are simply two answers to “where does that approved data physically sit?”' },
      { k: 'diagram', name: 'reuseFlex', caption: 'Reuse uses existing tables; flex generates its own.' },
      { k: 'table', t: 'Side-by-side', head: ['', 'Reuse mode', 'Flex mode'], rows: [
        ['Active data lives in', 'Existing application tables (e.g. MARA, MARC)', 'Generated MDG tables'],
        ['Structure comes from', 'The existing application structure', 'Your MDG data model'],
        ['Extra coding', 'Often needs a reuse class to access backend content', 'Automatic access without additional coding'],
        ['Typical use', 'Most S/4HANA MDG domains and custom objects', 'MDG Financials (data model 0G) and the default for custom objects'],
        ['Freedom to add fields', 'Limited by the existing structure', 'High — define what you need']
      ] },
      { k: 'note', tone: 'exam', t: 'Accuracy note', b: 'SAP describes reuse mode as being used for the MDG domains in S/4HANA as well as custom objects, besides MDG Financials. Flex mode is used for MDG Financials (data model 0G) and is the default for custom objects. Always confirm the setting in your release.' },
      { k: 'mnemonic', t: 'Memory hook: “Reuse the house, or build the house.”', lines: ['Reuse — you move into an existing house and respect its rooms.', 'Flex — MDG builds a house to your blueprint.'] },
      { k: 'note', tone: 'warn', t: 'A mode is not a preference', b: 'It is an architecture decision. Changing it later affects storage, integration, and possibly custom code. Confirm with your solution architect.' }
    ],
    recall: [{ q: 'Which mode generates its own active-area tables?', a: 'Flex mode. Reuse mode uses existing application tables.' }],
    interview: [
      { q: 'What is the difference between reuse and flex mode?', a: 'Reuse uses existing application structures and tables for active data; flex generates active-area tables from the MDG data model.' },
      { q: 'Where is unapproved data stored in both modes?', a: 'In MDG staging tables, as part of the change request.' }
    ],
    practice: { title: 'Decide with evidence', intro: 'Do not guess a mode from the name.', steps: ['Name the object.', 'Ask whether an existing application table must be reused.', 'Check the release support for the object.', 'Write the reason for the chosen mode.'], verify: ['Your note names the evidence, not just the preference.'], traps: ['“Flex sounds easier” is not a design reason.'] }
  }),

  L({
    id: 'dm-entity-types', track: 'Data modeling', module: 'Model the data', title: 'Entity types and the four storage/use types', duration: '11 min', level: 'Core',
    intro: 'An entity type is one business thing in your model. MDG gives every entity type a storage and use type from 1 to 4. That number controls whether it has its own key, where its data is stored, and which relationships it can have.',
    terms: ['entity type', 'storage type', 'usage type', 'type 1', 'type 2', 'type 3', 'type 4', 'dependent entity'],
    tags: ['entity type', 'storage type', 'type 1', 'type 2', 'type 3', 'type 4'],
    sections: [
      { k: 'p', t: 'Why the number matters', b: 'The storage/use type is not cosmetic. It decides whether the entity has its own key, whether MDG generates tables, whether it can be changed in MDG, and which relationships are allowed. Choosing the wrong type is one of the most common beginner mistakes.' },
      { k: 'diagram', name: 'types', caption: 'The four storage and use types at a glance.' },
      { k: 'table', t: 'The four types in detail', head: ['Type', 'What it is for', 'Key', 'Storage', 'Allowed relationships (as source)'], rows: [
        ['Type 1', 'Main table(s) and root objects subject to governance. More than one type 1 is possible in one model.', 'Own key', 'Generated (edition-dependent and staging area)', 'Leading and referencing only — no qualifying'],
        ['Type 2', 'Look-up data maintained inside MDG, without attributes.', 'Own key', 'Generated', 'Leading allowed'],
        ['Type 3', 'Look-up data maintained outside MDG, without attributes.', 'Own key', 'No generated tables; not changeable via MDG', 'Used as a reference/check source'],
        ['Type 4', 'Dependent data: extension or qualification of a type 1, including qualified table data and text extensions.', 'No key of its own', 'Generated; models attributes and relationships; no data element assignment', 'Leading, qualifying, referencing']
      ] },
      { k: 'note', tone: 'exam', t: 'The type 4 rules you must remember', b: 'A type 4 entity has no key of its own. It must be processed on the UI together with its leading type 1. Exactly one leading relationship can be created, and one qualifying relationship is required; any others must be qualifying or referencing. Its key must be enhanced by at least one type 1, 2, or 3 entity.' },
      { k: 'table', t: 'A material example', head: ['Business data', 'Entity type', 'Storage/use type', 'Why'], rows: [
        ['Material (general data)', 'Material', 'Type 1', 'Root object with its own key (material number)'],
        ['Material–Plant data', 'Material–Plant', 'Type 4', 'Dependent on Material; key is material + plant'],
        ['Plant', 'Plant', 'Type 3', 'Look-up data maintained outside MDG'],
        ['A small custom value list', 'Z Priority', 'Type 2', 'Look-up maintained inside MDG, no attributes']
      ] },
      { k: 'mnemonic', t: 'Memory hook: “1 Root, 2 In, 3 Out, 4 Under.”', lines: ['1 Root — the main object.', '2 In — lookup maintained inside MDG.', '3 Out — lookup maintained outside MDG.', '4 Under — dependent, lives under a type 1.'] },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'People make every entity a type 1. That creates unnecessary roots and breaks the “dependent data lives under its parent” idea. Ask: does this thing have its own independent identity, or is it only meaningful under another object?' }
    ],
    recall: [{ q: 'Which entity type has no key of its own?', a: 'Type 4 — the dependent entity type.' }],
    interview: [
      { q: 'Explain the four storage and use types.', a: 'Type 1 is the main root object with its own key. Type 2 is lookup data maintained in MDG without attributes. Type 3 is lookup data maintained outside MDG. Type 4 is dependent data with no key of its own, processed under a leading type 1.' },
      { q: 'Which relationships can a type 1 entity have as a source?', a: 'Leading and referencing only; not qualifying.' },
      { q: 'Why can a type 4 entity not be processed alone on the UI?', a: 'It has no independent key, so it needs its leading type 1 context to identify a record.' }
    ],
    practice: { title: 'Classify four objects', intro: 'Use your own domain knowledge.', steps: ['Material general data — which type?', 'Material–Plant — which type?', 'Plant — which type?', 'A small Z priority list maintained in MDG — which type?'], verify: ['Material = 1, Material–Plant = 4, Plant = 3, Z priority = 2.'], traps: ['Do not call every lookup a type 2; check whether it is maintained inside or outside MDG.'] }
  }),

  L({
    id: 'dm-attributes', track: 'Data modeling', module: 'Model the data', title: 'Attributes: keys, data elements, and value help', duration: '10 min', level: 'Core',
    intro: 'Attributes are the facts you store about an entity type. Some attributes identify the record (keys); the rest describe it. A good attribute has a clear business meaning, a data type, and a rule for valid values.',
    terms: ['attribute', 'key attribute', 'standard attribute', 'data element', 'domain', 'required field', 'value help'],
    tags: ['attribute', 'key', 'data element', 'domain', 'required'],
    sections: [
      { k: 'p', t: 'The practical definition', b: 'An attribute is a property of an entity type. In MDG you assign it a data element, decide whether it is required, and optionally attach value help. Attributes are normally assigned to type 1 and type 4 entity types; type 2 and type 3 are lookup types without attributes.' },
      { k: 'table', t: 'Kinds of attribute you will see', head: ['Kind', 'What it means', 'Example'], rows: [
        ['Key attribute', 'Identifies one record', 'Material number, Supplier ID'],
        ['Standard attribute', 'Describes the record', 'Description, Unit of measure, Country'],
        ['Entity-type attribute / reference', 'Points to another entity type; the referenced key becomes a field', 'Company code on a record'],
        ['Hierarchy attribute', 'Extra data stored on a hierarchy edge', 'Validity, weight, or a custom flag']
      ] },
      { k: 'note', tone: 'exam', t: 'Data element vs domain', b: 'A data element is the business meaning and field label (for example “Unit of Measure”). Its domain holds the technical type and, often, a value table. That is why assigning the right data element gives you the right type, labels, and often the right F4 help.' },
      { k: 'diagram', name: 'valueHelp', caption: 'How a field gets validated and how users get a pick list.' },
      { k: 'ul', t: 'What you decide for each attribute', items: [
        'Business definition — what does this field mean, in one sentence?',
        'Data element and type — text, number, date, quantity, and length.',
        'Required or optional — and for which step or role.',
        'Value help — fixed values, a check table, or a search help.',
        'Ownership — who is allowed to change it?',
        'Uniqueness — is it part of the key, or must it be unique?'
      ] },
      { k: 'mnemonic', t: 'Memory hook: “B.D.R.V.O.”', lines: ['Business meaning', 'Data element / type', 'Required?', 'Value help', 'Owner'] },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Adding a field because “it exists on the screen.” Ask which business decision the field supports and who validates it. Unused fields make the UI noisy and the process slower.' }
    ],
    recall: [{ q: 'What does a data element give you?', a: 'The business meaning, field label, technical type via its domain, and often value help.' }],
    interview: [
      { q: 'What is the difference between a key attribute and a normal attribute?', a: 'A key attribute identifies one record; a normal attribute describes the record.' },
      { q: 'Why not create every possible field up front?', a: 'Unneeded fields make UI, validation, maintenance, and user decisions harder. Model the actual governed business need.' }
    ],
    practice: { title: 'Write an attribute contract', intro: 'Pick one field, such as Unit of Measure.', steps: ['Write its business meaning.', 'Name its data element.', 'Say whether it is required.', 'Name its value help.', 'Name its owner.'], verify: ['All five lines are filled, not just the field name.'], traps: ['“It is obvious” is not a definition.'] }
  }),

  L({
    id: 'dm-relationships', track: 'Data modeling', module: 'Model the data', title: 'Relationships: leading, qualifying, referencing', duration: '12 min', level: 'Core',
    intro: 'A relationship links two entity types and says how they depend on each other. MDG uses three relationship types you must know: leading, qualifying, and referencing. Cardinality says how many records can connect.',
    terms: ['relationship', 'leading relationship', 'qualifying relationship', 'referencing relationship', 'cardinality', 'foreign key'],
    tags: ['relationship', 'leading', 'qualifying', 'referencing', 'association'],
    sections: [
      { k: 'p', t: 'Why three types', b: 'Each type answers a different question. Leading says “which record owns the context?” Qualifying says “which extra key fields identify the child?” Referencing says “which other object does this field point to?”' },
      { k: 'diagram', name: 'relationships', caption: 'Leading, qualifying, and referencing in one picture.' },
      { k: 'table', t: 'The three relationship types', head: ['Type', 'What it does', 'Typical direction', 'Example'], rows: [
        ['Leading', 'Assigns the leading context. The child is processed in the context of the parent. A type 1 can lead a type 1 or a type 4. A type 4 must be linked to a leading type 1.', 'Type 1 → Type 1 or Type 4', 'Material → Material–Plant'],
        ['Qualifying', 'Qualifies the child with additional key attributes. Type 2 and type 3 can enhance the keys of type 1 and type 4. A type 4 key must be enhanced by at least one type 1, 2, or 3.', 'Type 2/3 → Type 1/4', 'Plant → Material–Plant (adds plant to the key)'],
        ['Referencing', 'The key of the referenced entity becomes an attribute of the referencing entity. The from-entity is a required attribute of the to-entity.', 'Any → any', 'Company code referenced on a record']
      ] },
      { k: 'note', tone: 'exam', t: 'The rule that decides leading vs qualifying', b: 'The difference between leading and qualifying is only relevant for the to-entity when it is a type 4. That type 4 record is processed in the context of the entity assigned by the leading relationship. The qualifying relationship supplies the extra key fields.' },
      { k: 'table', t: 'What each entity type can use as a source', head: ['Source type', 'Leading', 'Qualifying', 'Referencing'], rows: [
        ['Type 1', 'Yes', 'No', 'Yes'],
        ['Type 2', 'Yes', '—', '—'],
        ['Type 3', '—', 'Yes (enhances keys)', 'Yes'],
        ['Type 4', 'Yes', 'Yes', 'Yes']
      ] },
      { k: 'note', tone: 'tip', t: 'A sentence you can say in an interview', b: 'Leading gives the context, qualifying completes the key, and referencing copies the key in as a field.' },
      { k: 'mnemonic', t: 'Memory hook: “L-Q-R”', lines: ['L — Leading: who owns the record?', 'Q — Qualifying: what else is in the key?', 'R — Referencing: which key is copied in?'] }
    ],
    recall: [{ q: 'Which relationship adds extra key fields to a type 4 entity?', a: 'The qualifying relationship.' }],
    interview: [
      { q: 'What is the difference between a leading and a qualifying relationship?', a: 'Leading assigns the context in which a type 4 record is processed. Qualifying adds the extra key attributes that identify the child record.' },
      { q: 'What does a referencing relationship do to the key?', a: 'The referenced entity key becomes an attribute of the referencing entity — it is copied in as a field.' },
      { q: 'Can a type 1 be the source of a qualifying relationship?', a: 'No. A type 1 has only leading and referencing relationships as a source.' }
    ],
    practice: { title: 'Draw Material–Plant', intro: 'The classic three-entity picture.', steps: ['Create Material (type 1).', 'Create Material–Plant (type 4).', 'Create Plant (type 3).', 'Draw Material → Material–Plant as leading, 1:N.', 'Draw Plant → Material–Plant as qualifying, 1:N.', 'Say out loud what the final key is.'], verify: ['The Material–Plant key is material number + plant.'], traps: ['Do not make Material–Plant a type 1. It has no independent identity.'] }
  }),

  L({
    id: 'dm-cardinality', track: 'Data modeling', module: 'Model the data', title: 'Cardinality and the type-4 rules', duration: '8 min', level: 'Core',
    intro: 'Cardinality says how many records on one side can connect to records on the other side. Getting it wrong makes the model either too strict or too loose.',
    terms: ['cardinality', '1:1', '1:N', 'N:1', 'N:M', 'leading relationship', 'qualifying relationship'],
    tags: ['cardinality', 'relationship', 'type 4'],
    sections: [
      { k: 'p', t: 'Read it from the FROM side', b: 'For “Material 1:N Material–Plant”, read it as: one Material can have many Material–Plant records. Each Material–Plant record still belongs to exactly one Material.' },
      { k: 'diagram', name: 'cardinality', caption: 'Cardinality and the type-4 rule.' },
      { k: 'table', t: 'The four cardinalities', head: ['Cardinality', 'Meaning', 'Example'], rows: [
        ['1:1', 'One parent, one child', 'A record and its single header extension'],
        ['1:N', 'One parent, many children', 'Material and its plant records'],
        ['N:1', 'Many parents, one child', 'Many records pointing to one company code'],
        ['N:M', 'Many on both sides', 'Rare in MDG data models; usually needs a link entity']
      ] },
      { k: 'note', tone: 'exam', t: 'The type-4 checklist', b: 'No key of its own. One leading relationship. One qualifying relationship required. Any further relationships must be qualifying or referencing. Key enhanced by at least one type 1, 2, or 3. Processed on the UI with its leading type 1.' },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Choosing 1:N because “there can be many” without asking whether the business allows many. Cardinality is a business rule, not a guess.' }
    ],
    recall: [{ q: 'What does 1:N mean in Material → Material–Plant?', a: 'One material can have many plant records; each plant record belongs to one material.' }],
    interview: [
      { q: 'What is the type-4 relationship rule?', a: 'Exactly one leading relationship and one qualifying relationship are required; other relationships must be qualifying or referencing.' },
      { q: 'How would you decide between 1:N and 1:1?', a: 'Ask the business whether one parent can legitimately have multiple children. Use the real rule, not a guess.' }
    ],
    practice: { title: 'Test the rule', intro: 'Given a model, spot the invalid relationship.', steps: ['Take Material (1) → Material–Plant (4) as leading.', 'Add Plant (3) → Material–Plant as qualifying.', 'Try to add a second leading relationship.', 'Explain why it is not allowed.'], verify: ['You can state the “one leading, one qualifying” rule.'], traps: ['Extra keys are added with qualifying, not with another leading.'] }
  }),

  L({
    id: 'model-associations', track: 'Data modeling', module: 'Model the data', title: 'Associations and entity-type attributes', duration: '8 min', level: 'Core',
    intro: 'An association is a modelled link used to navigate between entity types. An entity-type attribute is a field that points to another entity type. Both are about references, but they are used in different places.',
    terms: ['association', 'association type', 'entity-type attribute', 'reference', 'navigation', 'foreign key'],
    tags: ['association', 'entity type attribute', 'reference', 'navigation'],
    sections: [
      { k: 'p', t: 'The simple distinction', b: 'A relationship is part of the data model: it defines dependency and key structure. An association is a navigation link used by the UI, search, or reporting to move from one entity to another. An entity-type attribute is a single field that carries another entity’s key.' },
      { k: 'table', t: 'Relationship vs association vs entity-type attribute', head: ['Concept', 'Main job', 'Where you meet it'], rows: [
        ['Relationship', 'Defines dependency and key structure', 'Data model, entity type relationships'],
        ['Association', 'Defines a navigable link between entities', 'UI model, search, reporting'],
        ['Entity-type attribute', 'Carries another entity’s key as a field', 'Attribute list of an entity type']
      ] },
      { k: 'note', tone: 'exam', t: 'Do not over-model', b: 'If a field is only a reference to a lookup, a referencing relationship or an entity-type attribute may be enough. Do not build a separate entity for every code value.' },
      { k: 'note', tone: 'warn', t: 'Verify in your release', b: 'Association labels, association types, and where associations are configured can differ between releases and UI technologies. Check the exact option in your system.' }
    ],
    recall: [{ q: 'What is the main job of an association?', a: 'To provide a navigable link between entity types, for example in the UI or search.' }],
    interview: [
      { q: 'When might a relationship need its own entity?', a: 'When the relationship carries its own business attributes, validity, identity, or lifecycle that should be governed.' },
      { q: 'How is an entity-type attribute different from a relationship?', a: 'An entity-type attribute is a field that carries another entity key; a relationship defines dependency and key structure between entity types.' }
    ],
    practice: { title: 'Choose the lightest tool', intro: 'For each case, pick relationship, association, or entity-type attribute.', steps: ['A material must belong to a plant. Which?', 'A user should jump from a supplier to its contacts in the UI. Which?', 'A record needs to store a company code value. Which?'], verify: ['Relationship for dependency, association for navigation, entity-type attribute for a stored key.'], traps: ['Do not use a full entity for a simple code reference.'] }
  }),

  L({
    id: 'dm-hierarchies', track: 'Data modeling', module: 'Model the data', title: 'Hierarchies', duration: '7 min', level: 'Core',
    intro: 'A hierarchy stores parent–child relationships between records of an entity type. MDG creates a hierarchy table when you enable hierarchies on the entity type.',
    terms: ['hierarchy', 'hierarchy table', 'parent', 'child', 'hierarchy attribute', 'version dependent', 'edition dependent'],
    tags: ['hierarchy', 'parent child', 'version'],
    sections: [
      { k: 'p', t: 'How it is enabled', b: 'You enable hierarchies for an entity type by changing the Hierarchies attribute to a value other than “No hierarchy”. The result is a hierarchy table that stores parent–child relations. A hierarchy can be name-dependent, version-dependent, or edition-dependent.' },
      { k: 'diagram', name: 'hierarchy', caption: 'A simple parent–child hierarchy.' },
      { k: 'ul', t: 'What you can model', items: [
        'Parent–child links between records of the same entity type.',
        'Links to additional allowed entity types for mixed hierarchies.',
        'Hierarchy attributes (edge attributes), such as validity or weight.',
        'Intervals as leaves, where the business needs ranges.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'Hierarchies are enabled per entity type, and hierarchy relationships can carry additional attributes. The hierarchy table is separate from the entity’s main data.' },
      { k: 'note', tone: 'warn', t: 'Common mistake', b: 'Trying to model a hierarchy as a normal parent field on the same entity. Use the hierarchy capability so MDG can validate and display the structure properly.' }
    ],
    recall: [{ q: 'How do you enable a hierarchy for an entity type?', a: 'Set the Hierarchies attribute to a value other than “No hierarchy”.' }],
    interview: [
      { q: 'What is a hierarchy attribute?', a: 'Extra data stored on a hierarchy edge, such as validity or weight, rather than on the entity itself.' },
      { q: 'Name two ways a hierarchy can be dependent.', a: 'Name-dependent and version-dependent (also edition-dependent).' }
    ],
    practice: { title: 'Model a cost-centre tree', intro: 'A quick hierarchy exercise.', steps: ['Pick a root.', 'Add two children.', 'Add two leaves under one child.', 'Decide whether you need validity on each link.'], verify: ['You can explain why the link needs its own data.'], traps: ['Do not store parent as a plain text field if you need validation and navigation.'] }
  }),

  L({
    id: 'dm-keys-valuehelp', track: 'Data modeling', module: 'Model the data', title: 'Keys, check tables, value tables, and search helps', duration: '9 min', level: 'Core',
    intro: 'Keys identify records. Check tables validate values. Value tables propose those checks. Search helps give users an F4 pick list. Together they keep data clean without custom code.',
    terms: ['key', 'check table', 'value table', 'domain', 'search help', 'F4 help', 'text table'],
    tags: ['key', 'check table', 'value table', 'search help', 'F4'],
    sections: [
      { k: 'diagram', name: 'valueHelp', caption: 'Field → check table → search help.' },
      { k: 'table', t: 'The four mechanisms', head: ['Mechanism', 'What it does', 'Where it lives'], rows: [
        ['Key', 'Identifies one record', 'Entity type / table key'],
        ['Check table', 'Validates that a value exists', 'Domain / foreign key / data element'],
        ['Value table', 'Proposes the check table for a domain', 'Domain'],
        ['Search help', 'Gives the user an F4 list to choose from', 'Data element / attribute assignment']
      ] },
      { k: 'note', tone: 'exam', t: 'Where search help can be assigned', b: 'Search helps can be assigned to attributes, hierarchy attributes, and entity types of storage and use types 1 (with its own data element), 2, and 3. If two entity types share an attribute name, assign the same search help to both or to neither.' },
      { k: 'note', tone: 'tip', t: 'The chain to remember', b: 'Data element → domain → value table → proposed check table. That is why reusing the correct data element gives you help almost for free.' },
      { k: 'table', t: 'A unit-of-measure example', head: ['Layer', 'Example'], rows: [
        ['Data element', 'MEINS (Unit of Measure)'],
        ['Domain', 'MEINS with a value table'],
        ['Check table', 'T006 (units of measure)'],
        ['User experience', 'F4 pick list of valid units; invalid entries rejected']
      ] }
    ],
    recall: [{ q: 'Which table validates a value, and which one proposes that table?', a: 'The check table validates; the value table on the domain proposes the check table.' }],
    interview: [
      { q: 'What is the difference between a check table and a value table?', a: 'A check table validates values through a foreign key. A value table is stored on the domain and is proposed as the check table.' },
      { q: 'What is a search help for?', a: 'It gives users an F4 input-help list and can restrict or guide the values they choose.' }
    ],
    practice: { title: 'Trace a field', intro: 'Pick Unit of Measure.', steps: ['Find its data element.', 'Find its domain.', 'Find the value table.', 'Find the check table.', 'Test the F4 list.'], verify: ['You can draw the four-layer chain from memory.'], traps: ['Do not confuse a search help with a check table; one guides, the other validates.'] }
  }),

  L({
    id: 'dm-config', track: 'Data modeling', module: 'Model the data', title: 'Configure a custom Z data model: step by step', duration: '12 min', level: 'Core',
    intro: 'This is the configuration path you will use in the system. Names and screens can differ slightly by release, so confirm each node with your trainer.',
    terms: ['SPRO', 'IMG', 'Edit Data Model', 'transport', 'activate', 'adjust staging area', 'Z namespace'],
    tags: ['configuration', 'SPRO', 'IMG', 'custom model', 'steps'],
    sections: [
      { k: 'p', t: 'The path', b: 'SPRO → Master Data Governance → General Settings → Data Modeling → Edit Data Model. Create a model with a customer-namespace ID (normally starting with Y or Z).' },
      { k: 'diagram', name: 'configSteps', caption: 'The eight-step loop for a custom data model.' },
      { k: 'ol', t: 'Do it in this order', items: [
        'Create the data model: ID, description, and the mode/reuse settings your design requires.',
        'Create entity types: choose the storage/use type for each (1, 2, 3, or 4).',
        'Add attributes to each entity type: assign data elements, keys, required flags, and value help.',
        'Add relationships: leading, qualifying, and referencing, each with the correct cardinality.',
        'Save: the system runs a check and shows warnings or errors.',
        'Activate the data model.',
        'Adjust the staging area so the generated structures match the model.',
        'Visualise the data model and verify the result.'
      ] },
      { k: 'note', tone: 'warn', t: 'Before you save', b: 'Use a transport, work in a development or training client, and never create customer objects in the SAP namespace. Confirm naming rules with your team.' },
      { k: 'table', t: 'What “good” looks like at each step', head: ['Step', 'A good result'], rows: [
        ['Data model', 'Clear description, correct mode, Z/Y name'],
        ['Entity types', 'Each has a justified type 1–4'],
        ['Attributes', 'Each has a data element, required flag, and value help'],
        ['Relationships', 'Leading/qualifying/referencing chosen deliberately'],
        ['Check', 'No errors; warnings understood'],
        ['Activation', 'Model active'],
        ['Staging', 'Adjusted without errors'],
        ['Visualise', 'The picture matches the business explanation']
      ] }
    ],
    recall: [{ q: 'What is the SPRO path for the data model?', a: 'Master Data Governance → General Settings → Data Modeling → Edit Data Model.' }],
    interview: [
      { q: 'What do you do immediately after saving a data model?', a: 'Review the check messages, then activate, adjust the staging area, and verify/visualise the model.' },
      { q: 'Why use a Z or Y namespace for a custom model?', a: 'Customer objects must live in the customer namespace, separate from SAP-delivered objects.' }
    ],
    practice: { title: 'Dry run the steps', intro: 'Do this on paper before touching the system.', steps: ['Write the model ID and description.', 'Write each entity type and its storage/use type.', 'Write each attribute and its data element.', 'Write each relationship and its cardinality.', 'List the checks you expect to run.'], verify: ['Your paper model can be read by someone else without asking you questions.'], traps: ['Do not skip the staging adjustment; the generated structures must match the model.'] }
  }),

  L({
    id: 'dm-worked-example', track: 'Data modeling', module: 'Model the data', title: 'Worked example: from tables to a data model', duration: '10 min', level: 'Core',
    intro: 'A reliable way to learn modelling is to start from real tables and derive the entity types and relationships. This is exactly what a project does when it extends a standard model.',
    terms: ['worked example', 'SCUSTOM', 'SBUSPART', 'STRAVELAG', 'derive model', 'flight model'],
    tags: ['example', 'worked example', 'flight', 'derive'],
    sections: [
      { k: 'p', t: 'The idea', b: 'Take three related tables. Ask: which one is the root? Which one is dependent? Which values are lookups? Then map each answer to a storage/use type and a relationship.' },
      { k: 'table', t: 'A flight-style example', head: ['Table / object', 'What it represents', 'Entity type', 'Storage/use type'], rows: [
        ['Customer', 'The governed business partner', 'Customer', 'Type 1'],
        ['Business partner', 'A related root object', 'Business partner', 'Type 1'],
        ['Travel agency', 'A lookup / reference object', 'Travel agency', 'Type 3'],
        ['Customer–agency link', 'Dependent detail with its own key parts', 'Customer agency', 'Type 4']
      ] },
      { k: 'ul', t: 'Deriving the relationships', items: [
        'Customer → Customer agency: leading, 1:N.',
        'Travel agency → Customer agency: qualifying, 1:N.',
        'Customer → Business partner: referencing or leading, depending on the business rule.',
        'Any simple code value: referencing, not a full entity.'
      ] },
      { k: 'note', tone: 'tip', t: 'The method, not the table names', b: 'You will not be tested on the flight tables. You will be tested on the method: root first, dependent second, lookups third, then relationships and cardinality.' },
      { k: 'note', tone: 'exam', t: 'A strong interview sentence', b: 'I start from the business object and its real tables, identify the root entity, mark dependent data, map lookups, and then choose leading, qualifying, or referencing based on whether the link owns context, adds key fields, or copies a key.' }
    ],
    recall: [{ q: 'What are the four derivation questions?', a: 'What is the root? What is dependent? What is a lookup? How are they connected (leading, qualifying, referencing) and with what cardinality?' }],
    interview: [
      { q: 'How do you derive an MDG data model from an ER model?', a: 'Identify root objects, dependent objects, and lookup objects, assign storage/use types, then define relationships and cardinality from the business rules.' },
      { q: 'Why start from tables rather than from a blank model?', a: 'Existing tables show the real keys and dependencies, which reduces modelling mistakes.' }
    ],
    practice: { title: 'Do your own derivation', intro: 'Pick three related tables you know.', steps: ['Name the root.', 'Name the dependent table.', 'Name the lookup table.', 'Draw the relationships.', 'Assign a storage/use type to each.'], verify: ['Every relationship has a type and a cardinality.'], traps: ['Do not invent a relationship the business does not need.'] }
  }),

  L({
    id: 'dm-review', track: 'Data modeling', module: 'Model the data', title: 'Data-modelling review checklist', duration: '6 min', level: 'Core',
    intro: 'Before you move to the UI and the process, review the model with a short, repeatable checklist. Most expensive mistakes are visible on paper.',
    terms: ['review checklist', 'entity boundary', 'key', 'cardinality', 'naming'],
    tags: ['review', 'checklist', 'quality'],
    sections: [
      { k: 'ul', t: 'The review', items: [
        'Can a business user explain each entity type in one sentence?',
        'Does every entity have a justified storage/use type?',
        'Does every type 4 have exactly one leading and one qualifying relationship?',
        'Is every attribute backed by a data element and a business definition?',
        'Are required flags, value help, and search help deliberate?',
        'Are keys and cardinalities based on business rules?',
        'Are naming and namespace rules respected?',
        'Does the visualised model match the business explanation?'
      ] },
      { k: 'table', t: 'The five most common mistakes', head: ['Mistake', 'Why it hurts', 'Fix'], rows: [
        ['Everything is type 1', 'Breaks dependency and context', 'Use type 4 for dependent data'],
        ['Wrong cardinality', 'Too strict or too loose', 'Ask the business rule'],
        ['Unused fields', 'Noisy UI, slow process', 'Ask which decision the field supports'],
        ['No value help', 'Bad data and rework', 'Assign check table / search help'],
        ['No key discipline', 'Duplicates and confusion', 'Define keys before attributes']
      ] },
      { k: 'note', tone: 'tip', t: 'The 10-minute review', b: 'Explain the model out loud to someone who does not know MDG. Every time you say “sort of” or “it depends”, you have found a gap.' }
    ],
    recall: [{ q: 'What is the fastest way to find modelling gaps?', a: 'Explain the model out loud to a non-expert and fix every vague sentence.' }],
    interview: [
      { q: 'What is a useful test of whether an entity is well named?', a: 'A business user can explain what one record represents and give a concrete example.' },
      { q: 'Why do model decisions matter to UI and workflow?', a: 'The UI presents model data, and process and rules act on the request and its data; unclear structure creates confusing forms and checks.' }
    ],
    practice: { title: 'Review your own sketch', intro: 'Use the checklist above.', steps: ['Read your model aloud.', 'Mark every “it depends”.', 'Fix one gap.', 'Ask one business question.'], verify: ['You have at least one concrete improvement.'], traps: ['A model that only you understand is not finished.'] }
  }),

  /* ───────────────────────── UI MODELING ───────────────────────── */

  L({
    id: 'ui-modeling', track: 'UI modeling', module: 'Design the experience', title: 'UI modeling: turn the model into a usable screen', duration: '8 min', level: 'Core',
    intro: 'UI modeling arranges governed data into screens or sections that help the right user enter and review it. The UI should follow the business task, not expose every technical field at once.',
    terms: ['UI model', 'UI configuration', 'field group', 'role-based UI', 'floorplan'],
    tags: ['UI', 'screen', 'layout'],
    sections: [
      { k: 'p', t: 'The job of the UI model', b: 'The data model says what exists. The UI model says how a person sees it: which fields, in which groups, in which order, with which labels and help, for which role.' },
      { k: 'diagram', name: 'uiBlocks', caption: 'The main UI building blocks.' },
      { k: 'ul', t: 'Good UI modelling habits', items: [
        'Start from a real user task and role.',
        'Group fields by the questions the user is answering.',
        'Show requiredness, value help, and plain-language instructions.',
        'Separate entry, review, and error correction.',
        'Test with a realistic request and watch a user complete it without coaching.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'UI modelling is not decoration. It decides whether the governance process is usable. A correct model with a confusing screen still produces bad data.' }
    ],
    recall: [{ q: 'What should drive the layout of an MDG screen?', a: 'The user task, role, and data relationships — not the technical table order alone.' }],
    interview: [
      { q: 'Why is UI modelling separate from data modelling?', a: 'Different roles need different views of the same data; the UI model controls presentation without changing the underlying model.' },
      { q: 'How do you know whether a field grouping works?', a: 'A representative user can complete the task and understand the labels, instructions, required fields, and errors.' }
    ],
    practice: { title: 'Redesign one screen', intro: 'Take a screen you know.', steps: ['Write the user task in one sentence.', 'List the fields the user truly needs first.', 'Group them into two or three sections.', 'Move technical fields out of the first view.'], verify: ['The first view answers the user’s main question.'], traps: ['Do not put every field on one screen.'] }
  }),

  L({
    id: 'ui-blocks', track: 'UI modeling', module: 'Design the experience', title: 'UI building blocks: application, IDR, OIF, UIBB', duration: '9 min', level: 'Core',
    intro: 'In classic MDG UI configuration, you build a screen from a small set of building blocks. Knowing their names helps you follow any configuration guide.',
    terms: ['application configuration', 'identification region', 'object instance floorplan', 'UIBB', 'form UIBB', 'search UIBB'],
    tags: ['UI', 'IDR', 'OIF', 'UIBB', 'configuration'],
    sections: [
      { k: 'diagram', name: 'uiBlocks', caption: 'Application → IDR → OIF → UIBBs.' },
      { k: 'table', t: 'The blocks', head: ['Block', 'What it does', 'Think of it as'], rows: [
        ['Application configuration', 'The top-level container for a UI setup', 'The whole form'],
        ['Identification region (IDR)', 'Shows the key fields and search', 'The name plate'],
        ['Object instance floorplan (OIF)', 'The page layout for one object', 'The page frame'],
        ['UIBB', 'A reusable UI building block inside the floorplan', 'A card or panel'],
        ['Form UIBB', 'Groups fields for entry', 'A section of the form'],
        ['Search UIBB', 'Finds records', 'The search bar']
      ] },
      { k: 'note', tone: 'tip', t: 'A simple mental model', b: 'The application is the building. The IDR is the front door with the name. The OIF is the floor plan. UIBBs are the rooms.' },
      { k: 'note', tone: 'warn', t: 'Release check', b: 'Newer S/4HANA releases may use Fiori apps and different configuration objects. Confirm which UI technology your system uses before following a Web Dynpro guide.' }
    ],
    recall: [{ q: 'What does a UIBB do?', a: 'It is a reusable UI building block inside a floorplan, such as a form section or a search panel.' }],
    interview: [
      { q: 'Name the main UI building blocks.', a: 'Application configuration, identification region, object instance floorplan, and UIBBs (form, search, and others).' },
      { q: 'What is the identification region for?', a: 'It shows the key fields and search so the user knows which record they are working on.' }
    ],
    practice: { title: 'Label the blocks', intro: 'Look at a screenshot of an MDG screen.', steps: ['Find the key fields.', 'Find the search.', 'Find the form sections.', 'Name each block.'], verify: ['You can point to each block and say its name.'], traps: ['Do not memorise screens; learn the block names.'] }
  }),

  L({
    id: 'ui-practice', track: 'UI modeling', module: 'Design the experience', title: 'UI practice: configure a simple screen', duration: '7 min', level: 'Core',
    intro: 'A short practice runbook for building a simple UI configuration, to be done with your trainer in a safe client.',
    terms: ['UI configuration', 'deep copy', 'variant', 'transport', 'test'],
    tags: ['UI', 'practice', 'configuration'],
    sections: [
      { k: 'ol', t: 'Practice steps', items: [
        'Open the UI configuration customising for your release.',
        'Create a new configuration or copy a delivered one.',
        'Assign it to your model and entity types.',
        'Add the form sections you need.',
        'Test with a realistic request.',
        'Ask a colleague to complete the task without your help.'
      ] },
      { k: 'note', tone: 'warn', t: 'Before you start', b: 'Use a transport, a development or training client, and a trainer-approved object. UI configuration can affect every user of that model.' },
      { k: 'table', t: 'What to verify', head: ['Check', 'Pass condition'], rows: [
        ['Key fields', 'The user can see which record they are editing'],
        ['Sections', 'Fields are grouped by the user’s questions'],
        ['Required fields', 'Clearly marked and explained'],
        ['Value help', 'F4 works and returns sensible values'],
        ['Errors', 'Messages name the field and the fix'],
        ['Test', 'A colleague completes the task unaided']
      ] }
    ],
    recall: [{ q: 'What is the final test of a UI configuration?', a: 'A representative user completes the task without coaching.' }],
    interview: [{ q: 'What would you check first if users cannot find a field?', a: 'Whether it is in the model, then whether it is included and visible in the UI configuration for that role.' }],
    practice: { title: 'Run the configuration', intro: 'Do this with your trainer.', steps: ['Copy a delivered configuration.', 'Add one field.', 'Test it.', 'Ask a user to find it.'], verify: ['The field is visible, labelled, and has value help.'], traps: ['Do not change a delivered configuration without a copy.'] }
  }),

  /* ───────────────────────── PROCESS MODELING ───────────────────────── */

  L({
    id: 'process-modeling', track: 'Process modeling', module: 'Route and approve', title: 'Process modeling: who does what, and when?', duration: '9 min', level: 'Core',
    intro: 'Process modeling defines the steps, decisions, responsibilities, and transitions a request follows. The process turns governance policy into a repeatable workflow.',
    terms: ['process model', 'business activity', 'agent', 'decision', 'escalation'],
    tags: ['process', 'workflow', 'approval'],
    sections: [
      { k: 'p', t: 'From policy to workflow', b: 'A policy says “a new material needs a data steward and a business approver.” The process model turns that into steps, roles, and decisions that the system can route.' },
      { k: 'diagram', name: 'workflow', caption: 'An example approval workflow.' },
      { k: 'ul', t: 'What you define', items: [
        'The business roles, not just user names.',
        'The sequence of review and approval steps.',
        'What makes a request pass, fail, return, or stop.',
        'Who is responsible at each step and what happens on escalation.',
        'How normal, rejected, incomplete, and corrected requests behave.'
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'Always test the unhappy paths: incomplete data, validation failure, rejection, return for correction, and missing approver. A happy-path demo is not a process.' }
    ],
    recall: [{ q: 'What should you test besides the happy path?', a: 'Incomplete data, validation failures, rejection, returned-for-correction requests, and routing/escalation cases.' }],
    interview: [
      { q: 'Why define roles before configuring workflow?', a: 'The workflow needs clear responsibilities; otherwise tasks may be misrouted or have no owner.' },
      { q: 'What is an agent in a workflow?', a: 'The person, role, or rule that is responsible for performing a step.' }
    ],
    practice: { title: 'Draw the unhappy path', intro: 'Take any approval process.', steps: ['Draw the happy path.', 'Add a rejection.', 'Add a return for correction.', 'Add a missing-approver case.'], verify: ['Every branch ends somewhere sensible.'], traps: ['A workflow with no escape path will stall.'] }
  }),

  L({
    id: 'process-cr', track: 'Process modeling', module: 'Route and approve', title: 'Change request types and business activities', duration: '8 min', level: 'Core',
    intro: 'A change request type describes the kind of governed change. Business activities are the steps inside it. Together they shape what a user can do and in which order.',
    terms: ['change request type', 'business activity', 'CR type', 'step', 'priority'],
    tags: ['change request type', 'business activity', 'process'],
    sections: [
      { k: 'p', t: 'Two settings that shape everything', b: 'The CR type decides which process a request follows. The business activities decide the steps: create, change, review, approve, activate, and so on.' },
      { k: 'table', t: 'Typical CR types', head: ['CR type idea', 'When it is used'], rows: [
        ['Create', 'A new record is requested'],
        ['Change', 'An existing record is changed'],
        ['Block / unblock', 'A record is temporarily stopped or released'],
        ['Mass change', 'Many records change together']
      ] },
      { k: 'note', tone: 'tip', t: 'Design tip', b: 'Keep CR types few and meaningful. Too many types confuse users and multiply testing.' },
      { k: 'note', tone: 'warn', t: 'Release check', b: 'The exact CR type and business activity customising path differs by release and domain. Confirm it in your system.' }
    ],
    recall: [{ q: 'What does a change request type decide?', a: 'Which governance process and steps a request follows.' }],
    interview: [
      { q: 'What is a business activity?', a: 'A step in the change request process, such as create, review, approve, or activate.' },
      { q: 'Why keep CR types few?', a: 'Fewer types are easier for users to understand and for the team to test and maintain.' }
    ],
    practice: { title: 'Choose a CR type', intro: 'For each case, name the CR type you would use.', steps: ['A brand-new supplier.', 'A changed address.', 'A record that must be blocked.', 'A mass update.'], verify: ['Each case maps to one clear type.'], traps: ['Do not create a new CR type for every small variation.'] }
  }),

  L({
    id: 'process-workflow', track: 'Process modeling', module: 'Route and approve', title: 'Workflow, agents, and rule-based decisions', duration: '8 min', level: 'Core',
    intro: 'Workflow moves a request from step to step. Agents decide who receives a step. Rule-based logic can add checks, derivations, and decisions.',
    terms: ['workflow', 'agent', 'BRFplus', 'rule', 'escalation', 'parallel step'],
    tags: ['workflow', 'agent', 'BRFplus', 'rules'],
    sections: [
      { k: 'diagram', name: 'workflow', caption: 'Who does what in a workflow.' },
      { k: 'ul', t: 'What workflow controls', items: [
        'Which step comes next.',
        'Who is responsible (agent determination).',
        'When steps run in parallel or in sequence.',
        'What happens on rejection, return, or timeout.',
        'Which notifications are sent.'
      ] },
      { k: 'table', t: 'Common agent strategies', head: ['Strategy', 'Use when'], rows: [
        ['Role-based', 'A group owns the step'],
        ['User-based', 'A named person owns the step'],
        ['Rule-based', 'The owner depends on data, such as plant or material type'],
        ['Manager / org-based', 'The owner comes from the org structure']
      ] },
      { k: 'note', tone: 'exam', t: 'Interview point', b: 'BRFplus is often used for rule-based validation, derivation, and decision logic. Know that it is configuration, not only code.' }
    ],
    recall: [{ q: 'What is agent determination?', a: 'The rule that decides who receives a workflow step.' }],
    interview: [
      { q: 'What can BRFplus be used for in MDG?', a: 'Rule-based validation, derivation, and decision logic, configured rather than hard-coded.' },
      { q: 'When would you use a parallel step?', a: 'When two reviews are independent and both must finish before the request can continue.' }
    ],
    practice: { title: 'Pick an agent strategy', intro: 'For each case, choose role, user, or rule.', steps: ['A central data steward team.', 'A named compliance officer.', 'An approver who depends on plant.'], verify: ['Central team = role; named person = user; plant-dependent = rule.'], traps: ['Hard-coding a person is fragile; prefer roles and rules.'] }
  }),

  /* ───────────────────────── DOMAIN PRACTICE ───────────────────────── */

  L({
    id: 'mdgm-scenario', track: 'MDG-M', module: 'Practice track', title: 'MDG-M practice: request a new material', duration: '12 min', level: 'Practice',
    intro: 'This guided scenario follows a proposed new material through request, entry, review, approval, activation, and distribution. Exact fields depend on your company configuration.',
    terms: ['material master', 'organizational data', 'plant', 'training system'],
    tags: ['MDG-M', 'material', 'practice', 'scenario'],
    sections: [
      { k: 'p', t: 'Practice case', b: 'Request a training material called “Training Bolt A”. Use only non-production data and values approved by your trainer.' },
      { k: 'ol', t: 'Runbook', items: [
        'Confirm the training system, client, and your authorisation.',
        'Ask which material CR type is intended and which organisational data is required.',
        'Record required fields, value help, warnings, and errors as you enter the request.',
        'Submit or route the request as instructed; note each status and responsible role.',
        'After approval, verify activation and learn how the team checks distribution.',
        'Capture the exact app or transaction name shown in your system.'
      ] },
      { k: 'note', tone: 'warn', t: 'Safety first', b: 'Never practise in production. Do not copy confidential values into public notes. Ask before creating, approving, activating, or replicating any data.' },
      { k: 'table', t: 'What to observe', head: ['Moment', 'Question to answer'], rows: [
        ['Request', 'Which CR type and why?'],
        ['Entry', 'Which fields were required, and which had F4 help?'],
        ['Validation', 'Which messages appeared, and what fixed them?'],
        ['Review', 'Which role received the request?'],
        ['Activation', 'What changed after approval?'],
        ['Distribution', 'Where did the record go, and how was it confirmed?']
      ] }
    ],
    recall: [{ q: 'What must you verify before submitting a practice material request?', a: 'Correct training system/client, intended CR type, required fields and organisational scope, and trainer-approved non-production values.' }],
    interview: [
      { q: 'A material request has an error. What is your first troubleshooting sequence?', a: 'Read the exact message, identify the field or rule, check value help and required context, correct it, then rerun the check.' },
      { q: 'What is organisational data in a material request?', a: 'Data that depends on the organisation, such as plant or purchasing context.' }
    ],
    practice: { title: 'Your first material request', intro: 'Do this with your trainer.', steps: ['Open the correct system.', 'Create the request.', 'Fill the required fields.', 'Run validation.', 'Submit and follow the status.'], verify: ['You can explain every status the request passed through.'], traps: ['Do not guess organisational values; ask for the approved set.'] }
  }),

  L({
    id: 'mdgf-scenario', track: 'MDG-F', module: 'Practice track', title: 'MDG-F practice: govern financial master data', duration: '12 min', level: 'Practice',
    intro: 'This practice track applies the same governance ideas to financial master data. Confirm the specific object and scope available in your system before creating anything.',
    terms: ['financial master data', 'data model 0G', 'company code', 'validation rule'],
    tags: ['MDG-F', 'financial', 'practice', 'scenario'],
    sections: [
      { k: 'p', t: 'Practice case', b: 'Request a change to a training financial master-data record, such as an approved account-related attribute, only if your trainer has selected that object and provided safe values.' },
      { k: 'ol', t: 'Runbook', items: [
        'Confirm the system, client, and the exact MDG-F object in scope.',
        'Ask which CR type and approval policy apply.',
        'Identify required fields, organisational scope, ownership, and validation rules.',
        'Enter only trainer-approved training values.',
        'Follow the configured review and approval steps.',
        'Verify activation and any downstream distribution; record statuses and exact app names.'
      ] },
      { k: 'note', tone: 'exam', t: 'Why MDG-F is different', b: 'MDG Financials uses flex mode with data model 0G, so its active area is generated from the data model rather than reusing an existing application table. Confirm this in your release.' },
      { k: 'note', tone: 'warn', t: 'Scope check', b: 'MDG-F scope and available objects vary by system and project. The trainer must identify the intended safe scenario.' }
    ],
    recall: [{ q: 'Which mode and data model are associated with MDG Financials?', a: 'Flex mode with data model 0G.' }],
    interview: [
      { q: 'Why should you confirm the MDG-F object before starting?', a: 'MDG-F scope and available objects vary by system and project; the trainer must identify the intended safe scenario.' },
      { q: 'What evidence would you capture after a financial master-data change?', a: 'Request ID and status, checks performed, approval and activation result, and distribution outcome if configured.' }
    ],
    practice: { title: 'Your first finance request', intro: 'Do this with your trainer.', steps: ['Confirm the object.', 'Create the request.', 'Enter safe values.', 'Run validation.', 'Follow approval to activation.'], verify: ['You can name the object, the CR type, and the final status.'], traps: ['Do not experiment with financial values.'] }
  }),

  L({
    id: 'tomorrow-checklist', track: 'Practice', module: 'Your first system session', title: 'Tomorrow: system-orientation checklist', duration: '5 min', level: 'Practice',
    intro: 'Use this checklist before changing data. It prevents confusion between systems and turns your first session into useful learning notes.',
    terms: ['system ID', 'client', 'authorization', 'runbook', 'training system'],
    tags: ['checklist', 'first day', 'system'],
    sections: [
      { k: 'ol', t: 'Do this first', items: [
        'Write down the product and release, system ID, and client from the approved system information.',
        'Confirm whether this is the MDG hub or another connected system.',
        'Confirm that it is a training or development system and which sample object is safe.',
        'Ask the trainer to show the CR type, your role, the available apps or transactions, and the support route.',
        'Follow one MDG-M scenario, recording the visible steps and messages.',
        'Ask whether an MDG-F practice is available and which object is safe.',
        'Summarise what each step did in your own words.'
      ] },
      { k: 'note', tone: 'warn', t: 'Stop rule', b: 'If you are unsure whether an environment is safe for practice, stop before creating or changing data and ask the trainer or system owner.' },
      { k: 'table', t: 'Your session note template', head: ['Field', 'What to write'], rows: [
        ['System / client', 'From approved system information'],
        ['Task', 'What you were trying to do'],
        ['Steps', 'What you actually did'],
        ['Messages', 'Exact errors or warnings'],
        ['Fix', 'What resolved it'],
        ['Question', 'What you still need to ask']
      ] }
    ],
    recall: [{ q: 'What do you do if you are unsure whether an environment is safe for practice?', a: 'Stop before creating or changing data and ask the trainer or system owner to confirm.' }],
    interview: [{ q: 'What should you capture for a useful personal runbook?', a: 'System and release context, task purpose, observed steps and statuses, exact names shown, errors and their resolution, and open questions.' }],
    practice: { title: 'Prepare your notes', intro: 'Before the session.', steps: ['Open a notes file.', 'Paste the six-field template.', 'Fill in the system details once confirmed.', 'Add one question for the trainer.'], verify: ['The template is ready before you log in.'], traps: ['Do not store confidential values in public notes.'] }
  }),

  L({
    id: 'dm-lab', track: 'Practice', module: 'Labs', title: 'Lab: build your first Z data model', duration: '15 min', level: 'Practice',
    intro: 'A complete paper-to-system lab. Do the paper version first, then repeat it in the system with your trainer. This is the exercise that turns reading into skill.',
    terms: ['lab', 'Z model', 'paper model', 'activate', 'verify'],
    tags: ['lab', 'practice', 'Z model', 'hands-on'],
    sections: [
      { k: 'p', t: 'The scenario', b: 'Model a simple “Training Equipment” object with a dependent “Equipment–Location” detail and a “Location” lookup. Do not copy a real company model; invent safe training data.' },
      { k: 'ol', t: 'Paper phase', items: [
        'Write the business purpose in one sentence.',
        'Choose the root entity and its key.',
        'Choose the dependent entity and explain why it is type 4.',
        'Choose the lookup entity and explain why it is type 3.',
        'List three attributes per entity with data elements.',
        'Draw the leading and qualifying relationships with cardinality.'
      ] },
      { k: 'ol', t: 'System phase (with trainer)', items: [
        'Create the model in the customer namespace.',
        'Create the three entity types with the right storage/use types.',
        'Add attributes and value help.',
        'Add the leading and qualifying relationships.',
        'Save, read the check messages, activate.',
        'Adjust the staging area.',
        'Visualise the model and compare it with your paper version.'
      ] },
      { k: 'table', t: 'Expected result', head: ['Check', 'Expected'], rows: [
        ['Root', 'One type 1 entity with its own key'],
        ['Dependent', 'One type 4 with one leading and one qualifying relationship'],
        ['Lookup', 'One type 3, not changeable in MDG'],
        ['Key', 'Dependent key = root key + lookup key'],
        ['Model', 'Active and visualised']
      ] },
      { k: 'note', tone: 'tip', t: 'If it fails', b: 'Read the first error only. Fix it, save again, and repeat. Do not change five things at once.' }
    ],
    recall: [{ q: 'What is the dependent entity’s key made of?', a: 'The root entity key plus the key from the qualifying lookup entity.' }],
    interview: [
      { q: 'Walk me through building a custom data model.', a: 'Model the business object, choose entity types and storage/use types, add attributes and value help, add leading/qualifying/referencing relationships, save and check, activate, adjust staging, and verify.' },
      { q: 'What would you verify first after activation?', a: 'That the visualised model and generated structures match the intended keys, entities, and relationships.' }
    ],
    practice: { title: 'Run the lab', intro: 'Paper first, system second.', steps: ['Complete the paper phase.', 'Book a trainer session.', 'Complete the system phase.', 'Compare paper and system.', 'Write three lessons learned.'], verify: ['Your system model matches your paper model, and you can explain every choice.'], traps: ['Do not skip the paper phase; it is where the learning happens.'] }
  })
];

export const tracks = [
  { id: 'all', label: 'All learning', icon: '◈', description: 'Your complete path from SAP basics to governed master data.' },
  { id: 'Foundations', label: 'Foundations', icon: '01', description: 'SAP, MDG, landscape patterns, and the request lifecycle.' },
  { id: 'Data modeling', label: 'Data modeling', icon: '02', description: 'Entities, attributes, relationships, keys, hierarchies, and custom models.' },
  { id: 'UI modeling', label: 'UI modeling', icon: '03', description: 'Turn the model into screens people can actually use.' },
  { id: 'Process modeling', label: 'Process modeling', icon: '04', description: 'Route requests through checks, reviews, decisions, and activation.' },
  { id: 'MDG-M', label: 'MDG-M · Materials', icon: 'M', description: 'Apply governance concepts to a material request.' },
  { id: 'MDG-F', label: 'MDG-F · Financials', icon: 'F', description: 'Apply governance concepts to a financial master-data scenario.' },
  { id: 'Practice', label: 'System practice', icon: '↗', description: 'Prepare safely and capture what your system actually does.' }
];
