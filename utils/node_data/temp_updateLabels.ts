import * as fs from 'fs';

const dataPath = import.meta.dirname + '/data.json';
const manualTextMapPath = './ref/DimbreathBot/AnimeGameData/ExcelBinOutput/ManualTextMapConfigData.json';
const textMapENPath = './ref/DimbreathBot/AnimeGameData/TextMap/TextMapEN.json';
const textMapCHSPath = './ref/DimbreathBot/AnimeGameData/TextMap/TextMapCHS.json';

function readJsonSync<T>(filepath: string): T {
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

function writeJsonSync(filepath: string, data: any) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

function main() {
  const data = readJsonSync<any>(dataPath);
  const manualTextMapArray = readJsonSync<any[]>(manualTextMapPath);
  const textMapEN = readJsonSync<Record<string, string>>(textMapENPath);
  const textMapCHS = readJsonSync<Record<string, string>>(textMapCHSPath);

  if (!Array.isArray(data.Nodes)) {
    throw new Error('data.Nodes is not an array');
  }

  for (const node of data.Nodes) {
    if (typeof node.ID !== 'number') {
      console.log(node.Identifier, 'Not number');
      continue;
    }
    const id = node.ID;
    const key = `BeyondEditorInstructionNodeConfig_name_${id}`;

    const matched = manualTextMapArray.find(obj => obj.textMapId === key);
    if (matched && typeof matched.textMapContentTextMapHash === 'number') {
      const hash = matched.textMapContentTextMapHash;
      const hashStr = String(hash);
      const en = textMapEN[hashStr];
      if (en) {
        if (!node.InGameName) node.InGameName = {};
        if (node.InGameName['en'] !== en && node.InGameName['en']?.trim().length > 0) {
          node.Alias.push(node.InGameName['en']);
        }
        node.InGameName['en'] = en;
      }
      const zhHans = textMapCHS[hashStr];
      if (zhHans) {
        if (!node.InGameName) node.InGameName = {};
        if (node.InGameName['zh-Hans'] !== zhHans && node.InGameName['zh-Hans']?.trim().length > 0) {
          node.Alias.push(node.InGameName['zh-Hans']);
        }
        node.InGameName['zh-Hans'] = zhHans;
      } else {
        console.log(node.Identifier, 'No chs name');
      }
    } else {
      console.log(node.Identifier, 'Not found');
    }

    let success = 0;
    if (Array.isArray(node.DataPins)) {
      for (const pin of node.DataPins) {
        if (!pin || typeof pin !== 'object') continue;
        if (typeof pin.Direction !== 'string' || typeof pin.KernelIndex !== 'number') continue;

        let paramType = '';
        if (pin.Direction === 'In') {
          paramType = 'inParamList';
        } else if (pin.Direction === 'Out') {
          paramType = 'outParamList';
        } else {
          continue;
        }
        if (node.Identifier === "Query.Math.Pi") debugger;

        const pinKey = `BeyondEditorInstructionNodeConfig_${paramType}_${pin.KernelIndex}_name_${id}`;
        const pinMatched = manualTextMapArray.find(obj => obj.textMapId === pinKey);
        if (pinMatched && typeof pinMatched.textMapContentTextMapHash === 'number') {
          const pinHash = pinMatched.textMapContentTextMapHash;
          const pinHashStr = String(pinHash);
          const pinEn = textMapEN[pinHashStr];
          if (pinEn) {
            if (!pin.Label) pin.Label = {};
            pin.Label['en'] = pinEn;
            success++;
          } else {
            console.log("cannot find:", pinKey, "of", node.Identifier)
          }
          const pinZhHans = textMapCHS[pinHashStr];
          if (pinZhHans) {
            if (!pin.Label) pin.Label = {};
            pin.Label['zh-Hans'] = pinZhHans;
            success++;
          } else {
            console.log("cannot find:", pinKey, "of", node.Identifier)
          }
        }
      }
    }
    if (success !== node.DataPins.length * 2) {
      console.log("success num not matched", success, node.DataPins.length, node.Identifier)
    }
  }

  writeJsonSync(dataPath, data);
  console.log('处理完成并保存。');
}

main();