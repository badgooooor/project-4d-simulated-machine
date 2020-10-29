const mqtt = require('mqtt');
const cron = require('node-cron');
const dotenv = require('dotenv');
const { simulateMachineHealth, simulateMachineValue } = require('./mqtt-handler');

dotenv.config();

const machine_ids = [
  "test-machine-1",
  "test-machine-2",
  "test-machine-3",
  "test-machine-4",
];

const client = mqtt.connect({
  host: process.env.MQTT_SERVER,
  port: process.env.MQTT_PORT
});

client.on('connect', function() {
  console.log("MQTT Connect");

  console.log("Machine log");
  machine_ids.forEach((machine_id) => {
    setInterval(() => {
      simulateMachineValue(client, machine_id, "power-consumption", 50, 300);
      simulateMachineValue(client, machine_id, "sound-intensity", 20, 100);
      simulateMachineValue(client, machine_id, "vibration", 1, 2);
      simulateMachineValue(client, machine_id, "temperature", 30, 40);
      console.log("\n");
      
    }, 10000);
  })
});

