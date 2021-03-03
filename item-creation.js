const fs = require('fs')
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
    image: 0,
  }
}

module.exports.createItem = (machine_id, material_id) => {
  // const defect = Math.random() > 0.1 ? this.createDefect() : null;
  const defect = this.createDefect();
  const data = fs.readFileSync('./test-all-the-things.jpg');

  let item = {
    station_id: machine_id,
    material_id: material_id,
    images: [
      {
        imageRef: "603e52ab96c09e08d94210c6",
        angle: 45,
      },
      {
        imageRef: "603e52ab96c09e08d94210c6",
        angle: 90,
      }
    ]
  };

  if (defect !== null || defect !== undefined) {
    item.defects = [defect];
  } else {
    item.defects = [];
  }

  return item;
}
