module.exports.simulateMachineValue = (client, machine_id, type, min, max) => {
  const value = Math.random() * (max - min) + min;
  const payload = {
    station_id: machine_id,
    status: {
      type: type,
      value: value
    }
  };

  client.publish(
    `stations/${machine_id}/event/${type}`,
    JSON.stringify(payload)
  );

  console.log(`+ machine : ${machine_id}, ${type}: ${value}`)
}