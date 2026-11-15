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

export const diagrams = {
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

export function renderDiagram(name) {
  const fn = diagrams[name];
  return fn ? fn() : '';
}
