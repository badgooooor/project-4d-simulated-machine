const defect_type = ["holes", "air-bloated"]

module.exports.createDefect = () => {
  const final_defect_type = defect_type[Math.floor(Math.random() * defect_type.length)];

  return {
    type: final_defect_type,
    dimension: Math.random() * 2
  }
}

module.exports.createItem = (machine_id, material_id, item_id) => {
  const defect = Math.random() > 0.8 ? this.createDefect() : null;
  
  let item = {
    station_id: machine_id,
    material_id: material_id,
  };

  if (defect !== null || defect !== undefined) {
    item.defect = defect;
  }

  return item;
}
