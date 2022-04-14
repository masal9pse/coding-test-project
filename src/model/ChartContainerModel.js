function getReactiveObjectForInsert(response, datacollection, pref) {
  let reactiveObject = {};
  reactiveObject.datasets = [];
  reactiveObject = datacollection;
  console.log(reactiveObject);
  reactiveObject.datasets.push({
    label: pref.name,
    borderColor: this.getRandomColor(),
    fill: false,
    data: response.data.result.data[0].data.map((x) => x.value),
  });
  console.log(reactiveObject.datasets);
  return reactiveObject;
}

function getReactiveObjectForDelete(event, datacollection) {
  let reactiveObject = {};
  reactiveObject.datasets = [];
  reactiveObject = datacollection;
  var checkedIndex = this.getDeletedCheckedIndex(
    reactiveObject.datasets,
    event
  );
  console.log(reactiveObject.datasets);
  reactiveObject.datasets.splice(checkedIndex, 1);
  return reactiveObject;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getDeletedCheckedIndex(datasets, event) {
  var checkedIndex = null;
  datasets.forEach((dataset, index) => {
    if (dataset.label == event.target.value) {
      checkedIndex = index;
    }
  });
  return checkedIndex;
}

export default {
  getReactiveObjectForInsert,
  getReactiveObjectForDelete,
  getRandomColor,
  getDeletedCheckedIndex,
};
