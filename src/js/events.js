import msg from './message.json'
import binary from './binary.js'

const _msg = JSON.stringify(msg);

export default [
  {
    type: "json",
    timestamp: 1512408408000,
    topic: "test.auditLog",
    partition: 0,
    offset: 1,
    key: {
      value: null,
      size: 0,
    },
    value: {
      value: _msg,
      size: 213213,
    },
    tags: {
      "messageType":  { value: "com.pingconnect.saas.logging.domain.LogMessageEvent", details: "CREATED"},
      "correlationId": { value: "Z76sa*U" },
      "host": { value: "com-prod-ore-wwwjdk7-21-80-bd1611d4-105-177" },
      "service": { value: "token" },
    },
  },
  {
      type: "json",
      timestamp: 1512409408000,
      topic: "test.na.auditLog",
      partition: 0,
      offset: 2,
      key: {
        value: null,
        size: 234,
      },
      value: {
        value: _msg,
        size: 213213,
      },
      tags: {
        "messageType":  { value: "com.pingconnect.saas.logging.domain.LogMessageEvent", details: "CREATED"},
        "correlationId": { value: "Nu2ss21O" },
        "host": { value: "com-prod-ore-authall-21-80-bd1611d4-105-177" },
        "service": { value: "wwwjdk7" },
      },
    },
    {
      type: "binary",
      timestamp: 1512409401000,
      topic: "test.eu.auditLog",
      partition: 18,
      offset: 3,
      key: {
        value: null,
        size: 1233,
      },
      value: {
        value: binary,
        size: 1123,
      },
      tags: {
        "messageType":  { value: "com.pingconnect.saas.logging.domain.LogMessageEvent", details: "CREATED"},
        "correlationId": { value: "Nu2ss21O" },
        "host": { value: "com-prod-ore-adminapi-21-80-bd1611d4-105-177" },
        "service": { value: "wwwjdk7" },
      },
    }
];
