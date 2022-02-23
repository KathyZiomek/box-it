/**Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */

export const sortArrayByName = (array) => {
  let newArray = array;

  // sort by name
  newArray.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return newArray;
};

export const sortArrayById = (array) => {
  let newArray = array;

  newArray.sort();

  return newArray;
};
