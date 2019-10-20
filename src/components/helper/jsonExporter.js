export default (exportObj, filename) => {
    var dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var tempNode = document.createElement('a');
    tempNode.setAttribute("href", dataUri);
    tempNode.setAttribute("download", filename + "-" + Date.now() + ".json");
    document.body.appendChild(tempNode); // required for firefox
    tempNode.click();
    tempNode.remove();
    return Promise.resolve();
  }