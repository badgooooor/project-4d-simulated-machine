const itemCreator = require("./item-creation")

module.exports.simulateMachineValue = (client, machine_id, type, min, max) => {
  const value = Math.random() * (max - min) + min;
  const payload = {
    station_id: machine_id,
    status: {
      type: type,
      value: value
    },
    timestamp: new Date()
  };

  client.publish(
    `stations/${machine_id}/event/${type}`,
    JSON.stringify(payload)
  );

  console.log(`+ machine : ${machine_id}, ${type}: ${value}`)
}

module.exports.simulateItem = (client, machine_id, material_id) => {
  const item = itemCreator.createItem(machine_id, material_id);

  client.publish(
    `stations/${machine_id}/item`,
    item
  );
  console.log(`+ item from : ${machine_id}, ${item}`)
}

module.exports.machineStatus = (client, machine_id, status) => {
  client.publish(
    `stations/${machine_id}/status`,
    status
  );
  console.log(`+ machine : ${machine_id}, ${status}`)
}
