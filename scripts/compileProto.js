const protobufjs = require('protobufjs');
const path = require('path');
const fs = require('fs');

const protoPath = path.join(__dirname, 'otpMigrationParser.proto');
const root = protobufjs.loadSync(protoPath);
const protoJson = root.toJSON();
const targetPath = path.join(__dirname, '../src/assets/authenticatorProto.json');
const fd = fs.openSync(targetPath, 'w');
fs.writeSync(fd, JSON.stringify(protoJson, null, 4));
