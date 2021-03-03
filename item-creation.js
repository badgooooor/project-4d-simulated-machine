const defect_type = ["holes", "air-bloated"]

module.exports.createDefect = () => {
  const final_defect_type = defect_type[Math.floor(Math.random() * defect_type.length)];

  return {
    type: final_defect_type,
    area: Math.random() * 2,
    x: Math.random() * 10,
    y: Math.random() * 10,
    width: Math.random() * 10,
    height: Math.random() * 10,
  }
}

module.exports.createItem = (machine_id, material_id) => {
  // const defect = Math.random() > 0.1 ? this.createDefect() : null;
  const defect = this.createDefect();

  let item = {
    station_id: machine_id,
    material_id: material_id,
  };

  if (defect !== null || defect !== undefined) {
    item.defects = [defect];
    item.image_id = "603e52ab96c09e08d94210c6";

  } else {
    item.defects = [];
  }

  return item;
}
