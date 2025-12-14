import { readFileSync } from "fs";
import { records as records_old, records_special } from "../03_types/records.ts";
import yaml from "yaml";
import { dir, save } from "../util.ts";
import { type SingleNodeData } from "../../node_data/node_pin_records.ts";
import type_name from "../dist/type_ids.json" with { type: 'json' };
import enums from "../dist/client_enum_list.json" with { type: 'json' };

function combine_name_id_to_record() {
  const yaml_data: { [key: string]: { [key: string]: { [key: string]: string } }[] } = yaml.parse(readFileSync(import.meta.dirname + "/../dist/client.yaml").toString());
  const yaml_str = Object.values(yaml_data).map(x => x.map(y => Object.values(y).map(z => Object.entries(z)))).flat(3);
  const name = (id: string | number) => {
    return yaml_str.find(x => x[0] === id.toString())![1].replace(/^\d+\.\s+/, "");
  }
  const records: SingleNodeData[] = records_old.map(r => {
    const reflectMap = r.reflectMap.map(ref => {
      const tp = type_name.find(x => x.typeid === ref[1])!.type;
      return [`${ref[0]} R<T:${tp}>`, `R<T:${tp}>`] as [string, string];
    });
    return {
      name: name(r.id),
      id: r.id,
      inputs: r.inputs as string[],
      outputs: r.outputs,
      reflectMap: reflectMap,
    }
  });
  records.push({
    name: name(records_special.type_conv.id),
    id: records_special.type_conv.id,
    inputs: records_special.type_conv.inputs as string[],
    outputs: records_special.type_conv.outputs,
    reflectMap: records_special.type_conv.reflectMap.map(ref => [`${ref[0]} ${ref[1]}`, ref[1].toString()]),
  });
  records.push({
    name: name(records_special.assembly_list.id),
    id: records_special.assembly_list.id,
    inputs: records_special.assembly_list.inputs as string[],
    outputs: records_special.assembly_list.outputs,
    reflectMap: records_special.assembly_list.reflectMap.map(ref => [`${ref[0]} ${ref[1]}`, ref[1].toString()]),
  });
  records.push({
    name: name(records_special.enum_equal.id),
    id: records_special.enum_equal.id,
    inputs: records_special.enum_equal.inputs as string[],
    outputs: records_special.enum_equal.outputs,
    reflectMap: enums.map(e => [`${e.id} S<T:E<${e.indexOfConcrete}>>`, `S<T:E<${e.indexOfConcrete}>>`]),
  });
  // normal records
  records.push(
    ...yaml_str
      .map(x => ({ name: x[1].replace(/^\d+\.\s+/, ""), id: parseInt(x[0]), inputs: [], outputs: [] }))
      .filter(x => !records.find(y => y.id === x.id))
  );
  // dir(records);
  records.sort((a, b) => a.id - b.id);
  save("node_records_no_type.json", records);
}

combine_name_id_to_record();