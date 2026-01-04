import * as fs from 'fs';
import * as path from 'path';

interface NodeParameter {
  type: string;
  name: string;
  dataType: string;
  description: string;
}

interface NodeEntry {
  name: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  description: string;
  parameters: NodeParameter[];
}

const workingDir = 'd:/Program/GenshinImpact/projs/Convertor/utils/node_data/UGC-Guide-Markdown';
const outputFile = path.join(workingDir, 'nodes.json');
const logFile = path.join(workingDir, 'extraction_logs.txt');

const logs: string[] = [];

function log(msg: string) {
  console.log(msg);
  logs.push(msg);
}

function normalizeHeader(text: string): string {
  // Remove bolding (**), italics (_ or *), and escaped characters (\.)
  return text.replace(/\*\*|_|\*|\\/g, '').trim();
}


function parseMarkdownFile(filePath: string): NodeEntry[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const filename = path.basename(filePath, '.md');

  let category = '';
  let subcategory = '';
  const nodes: NodeEntry[] = [];

  let currentNode: Partial<NodeEntry> | null = null;
  let inParameters = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line && !inParameters) continue;

    // H1: Category
    if (line.startsWith('# ')) {
      category = normalizeHeader(line.substring(2));
      continue;
    }

    // H2: Potential Node or Subcategory
    if (line.startsWith('## ')) {
      const headerText = normalizeHeader(line.substring(3));

      const nodeMatch = headerText.match(/^(\d+\.?\s+)?(.+)$/);

      // Heuristic for subcategory: Starts with Roman numerals like "I.", "II."
      if (headerText.match(/^[IVXLC]+\./)) {
        subcategory = headerText;
        continue;
      }

      if (nodeMatch) {
        if (currentNode) nodes.push(currentNode as NodeEntry);
        currentNode = {
          name: nodeMatch[2].trim(),
          category: category || filename,
          subcategory: subcategory,
          imageUrl: '',
          description: '',
          parameters: []
        };
        inParameters = false;
        continue;
      }
    }

    // Check for "bold node names" if we just saw a number or it's a stand-alone bold line
    // e.g., "**Send Signal to Server Node Graph**"
    if (line.startsWith('**') && line.endsWith('**')) {
      const potentialName = normalizeHeader(line);
      if (potentialName.length > 3 && !potentialName.toLowerCase().includes('parameters') && !potentialName.toLowerCase().includes('functions')) {
        // Check if this is a new node or just repeating the current one
        if (currentNode && (currentNode.name === potentialName || currentNode.name?.includes(potentialName))) {
          // Skip
        } else {
          if (currentNode) nodes.push(currentNode as NodeEntry);
          currentNode = {
            name: potentialName,
            category: category || filename,
            subcategory: subcategory,
            imageUrl: '',
            description: '',
            parameters: []
          };
          inParameters = false;
          continue;
        }
      }
    }

    if (!currentNode) continue;

    // Image: ![](...)
    const imgMatch = line.match(/!\[\]\((.+)\)/);
    if (imgMatch && !currentNode.imageUrl) {
      currentNode.imageUrl = imgMatch[1];
      continue;
    }

    // Section headers
    if (line.toLowerCase().includes('node functions')) {
      inParameters = false;
      continue;
    }
    if (line.toLowerCase().includes('node parameters')) {
      inParameters = true;
      continue;
    }

    // Parameters Table
    if (inParameters && line.startsWith('|')) {
      if (line.toLowerCase().includes('parameter type') || line.includes('---')) continue;
      // Robust split
      const cells = line.split('|').map(c => c.trim()).filter((c, index, array) => {
        if (index === 0 && c === '') return false;
        if (index === array.length - 1 && c === '') return false;
        return true;
      });

      if (cells.length >= 3) {
        currentNode.parameters!.push({
          type: cells[0] || '',
          name: cells[1] || '',
          dataType: cells[2] || '',
          description: cells[3] || ''
        });
      } else {
        console.debug(line);
      }
      continue;
    }

    // Description (under Node Functions or before Node Parameters)
    if (!inParameters && line && !line.startsWith('!') && !line.startsWith('#')) {
      const cleaned = line.replace(/^\d+\.\s*/, '').trim();
      if (cleaned) {
        if (!currentNode.description) currentNode.description = cleaned;
        else if (!currentNode.description.includes(cleaned)) currentNode.description += ' ' + cleaned;
      }
    }
  }

  if (currentNode) {
    nodes.push(currentNode as NodeEntry);
  }

  return nodes;
}

function main() {
  const files = fs.readdirSync(workingDir).filter(f => f.endsWith('.md') && f !== 'readme.md');
  const allNodes: NodeEntry[] = [];

  for (const file of files) {
    log(`Parsing ${file}...`);
    const nodes = parseMarkdownFile(path.join(workingDir, file));
    log(`Extracted ${nodes.length} nodes from ${file}`);
    allNodes.push(...nodes);
  }

  // Final check for suspiciously parsed types
  allNodes.forEach(node => {
    node.parameters.forEach(p => {
      if (p.name === 'Damage Coefficient' && p.dataType === '3D Vector') {
        log(`[WARN] Suspect type for node "${node.name}" in ${node.category}: ${p.name} is ${p.dataType}`);
      }
    });
  });

  fs.writeFileSync(outputFile, JSON.stringify(allNodes, null, 2));
  fs.writeFileSync(logFile, logs.join('\n'));
  log(`Done! Saved to ${outputFile}`);
}

main();
