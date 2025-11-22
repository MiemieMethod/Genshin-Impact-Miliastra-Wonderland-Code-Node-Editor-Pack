import { writeFileSync } from "fs";
import { nodeDefinitions } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts";
import yaml from 'yaml';

function create_ref_yaml() {
  const def = nodeDefinitions;
  function save(def: any[], filter = "math") {
    const math = def
      .filter(d => d.kind === filter)
      .map(d => ({ ref_id: d.id, category: d.category, chinese: d.displayName, description: d.description }))
    const doc = yaml.stringify(math);
    writeFileSync(import.meta.dirname + `/ref.${filter}.yaml`, doc);
  }
  save(def);
  save(def, "query");
}

create_ref_yaml();