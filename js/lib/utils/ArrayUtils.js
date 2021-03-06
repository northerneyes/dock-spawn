Array.prototype.remove = function(value) {
  var idx = this.indexOf(value);
  if (idx != -1) {
      return this.splice(idx, 1); // The second parameter is the number of elements to remove.
  }
  return false;
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.orderByIndexes = function(indexes){
  var sortedArray = [];
  for (var i = 0; i < indexes.length; i++) {
        sortedArray.push(this[indexes[i]]);
    }
  return sortedArray;
};
