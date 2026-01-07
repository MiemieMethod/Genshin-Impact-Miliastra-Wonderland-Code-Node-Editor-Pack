import * as fs from 'fs';

const dataPath = 'data.json';
// https://github.com/DimbreathBot/AnimeGameData
const manualTextMapPath = 'E:\\AnimeGameData\\ExcelBinOutput\\ManualTextMapConfigData.json';
const textMapENPath = 'E:\\AnimeGameData\\TextMap\\TextMapEN.json';
const textMapCHSPath = 'E:\\AnimeGameData\\TextMap\\TextMapCHS.json';

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
    if (typeof node.ID !== 'number') continue;
    const id = node.ID;
    const key = `BeyondEditorInstructionNodeConfig_name_${id}`;

    const matched = manualTextMapArray.find(obj => obj.textMapId === key);
    if (matched && typeof matched.textMapContentTextMapHash === 'number') {
      const hash = matched.textMapContentTextMapHash;
      const hashStr = String(hash);
      const en = textMapEN[hashStr];
      if (en) {
        if (!node.InGameName) node.InGameName = {};
        node.InGameName['en'] = en;
      }
      const zhHans = textMapCHS[hashStr];
      if (zhHans) {
        if (!node.InGameName) node.InGameName = {};
        node.InGameName['zh-Hans'] = zhHans;
      }
    }

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

        const pinKey = `BeyondEditorInstructionNodeConfig_${paramType}_${pin.KernelIndex}_name_${id}`;
        const pinMatched = manualTextMapArray.find(obj => obj.textMapId === pinKey);
        if (pinMatched && typeof pinMatched.textMapContentTextMapHash === 'number') {
          const pinHash = pinMatched.textMapContentTextMapHash;
          const pinHashStr = String(pinHash);
          const pinEn = textMapEN[pinHashStr];
          if (pinEn) {
            if (!pin.Label) pin.Label = {};
            pin.Label['en'] = pinEn;
          }
          const pinZhHans = textMapCHS[pinHashStr];
          if (pinZhHans) {
            if (!pin.Label) pin.Label = {};
            pin.Label['zh-Hans'] = pinZhHans;
          }
        }
      }
    }
  }

  writeJsonSync(dataPath, data);

  console.log('处理完成并保存。');
}

main();