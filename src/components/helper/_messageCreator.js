var messageCreator = (title, content, type) => {
    return {
        id : Date.now(),
        title : title,
        content : content,
        type : type
    }
}

export const getMessEditOff = () => messageCreator("Edit mode", "Edit mode closed!", "info");
export const getMessAddOff = () => messageCreator("Add mode", "Add mode closed!", "info");
export const getMessAddDone = () => messageCreator("Add done", "Add new note done!", "success");
export const getMessEditDone = () => messageCreator("Edit mode", "Edit note done!", "success");
export const getMessSearchOff = () => messageCreator("Search mode", "Search mode turned off!", "info");
export const getMessSortOff = () => messageCreator("Sort mode", "Sort mode turned off!", "info");
export const getMessDeleteDone = () => messageCreator("Deleted!", "Delete done!", "success");