/*
import fs from 'fs';
import { exec } from 'child_process';
import { ChConfigJson } from './models/ChConfig';

const REDIS_SERVER_CONFIG_BASE_FILE = './redis/redis-server-base.conf';
const REDIS_CLUSTER_CONFIG_BASE_FILE = './redis/redis-cluster-base.conf';

const REDIS_CLUSTER_TMP_PATH = './redis/';
const INPUT_JSON_FILE = './common/src/ch-config.json';
let jsonData = JSON.parse(fs.readFileSync(INPUT_JSON_FILE, 'utf8'));

// 引数の値を取得
const args = process.argv.slice(2);
const topCh = args[0] || '/';

function buildFullLocationPath(data, parentLocation = '') {
  if (data.nginx && data.nginx.location) {
    data.nginx.fullLocation = parentLocation + data.nginx.location;
  }

  if (data.children && data.children.length > 0) {
    for (let child of data.children) {
      buildFullLocationPath(child, data.nginx.fullLocation || parentLocation);
    }
  }
}

function findMatchingLocation(data, location) {
  if (data.nginx && data.nginx.fullLocation === location) {
    // childrenを削除
    delete data.children;
    return data;
  }

  if (data.children && data.children.length > 0) {
    for (let child of data.children) {
      const result = findMatchingLocation(child, location);
      if (result) {
        // 親のchildrenも削除
        data.children = [result];
        return result;
      }
    }
  }

  return null;
}

// JSONデータにフルロケーションパスを追加
buildFullLocationPath(jsonData);

const matchedLocation = findMatchingLocation(jsonData, topCh);
*/
