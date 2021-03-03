const mqtt = require('mqtt');
const cron = require('node-cron');
const dotenv = require('dotenv');

const { simulateMachineValue, machineStatus, simulateItem } = require('./mqtt-handler');

dotenv.config();

const machines = [
  { id: "5ff7d1c1bba5cb084ed1ed94", status: "active" },
];

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}

const client = mqtt.connect({
  host: process.env.MQTT_SERVER,
  port: process.env.MQTT_PORT
});

client.on('connect', function() {
  console.log("MQTT Connect");

  machines.forEach((machine, index) => {
    client.subscribe(`stations/${machine.id}/status`);

    client.publish(
      `stations/${machine.id}/action`,
      JSON.stringify({
        station_id: machine.id,
        action: "start",
      })
    );
  });
});

client.on('end', (topic, message) => {
  machines.forEach((machine, index) => {

    console.log("Send shut down to ", machine.id);
    client.publish(
      `stations/${machine.id}/action`,
      JSON.stringify({
        station_id: machine.id,
        action: "shut-down",
      })
    );
  });
});

client.on('message', (topic, message) => {
  const payload = message.toString();
  const machine_id = topic.split("/")[1];

  const machine_index = findWithAttr(machines, "id", machine_id); 
  machines[machine_index].status = payload;
});

machines.forEach((machine, index) => {
  setInterval(() => {
    if (machine.status === "active") {
      simulateMachineValue(client, machine.id, "power-consumption", 50, 300);
      simulateMachineValue(client, machine.id, "sound-intensity", 20, 100);
      simulateMachineValue(client, machine.id, "vibration", 10, 20);
      simulateMachineValue(client, machine.id, "temperature", 30, 40);
      machineStatus(client, machine.id, "5ff7da33bba5cb084ed1edcb", "active");
      console.log("\n");
    } else {
      machineStatus(client, machine.id, "5ff7da33bba5cb084ed1edcb", machine.status);
    }
  }, 60000);

  setInterval(() => {
    if (machine.status === "active") {
      simulateItem(client, machine.id, "5ff7da33bba5cb084ed1edcb");
    }
  }, 20000);
});

process.on('SIGINT', async function() {
  console.log("Caught interrupt signal");
  client.end();
  process.exit();
});