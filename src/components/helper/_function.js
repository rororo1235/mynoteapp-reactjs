const templateSortFunc = (allNotes, comparator) => {
  var tempToSortArr = [];
  Object.keys(allNotes).forEach(key => {
    tempToSortArr.push([key, allNotes[key]]);
  });
  tempToSortArr.sort((first, second) => comparator(first[1], second[1]));
  return Object.fromEntries(tempToSortArr);
};

export const sortTitleAsc = allNotes => {
  return templateSortFunc(allNotes, (note, nextNote) =>
    note.title.localeCompare(nextNote.title)
  );
};

export const sortTitleDesc = allNotes => {
  return templateSortFunc(allNotes, (note, nextNote) =>
    nextNote.title.localeCompare(note.title)
  );
};

export const sortDateAsc = allNotes => {
  var comparator = (note, nextNote) =>
    nextNote.lastEditDate - note.lastEditDate;
  return templateSortFunc(allNotes, comparator);
};

export const sortDateDesc = allNotes => {
  var comparator = (note, nextNote) =>
    note.lastEditDate - nextNote.lastEditDate;
  return templateSortFunc(allNotes, comparator);
};
