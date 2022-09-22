// this is our background listener, that can grab the events for today
let id;
chrome.bookmarks.search({title: 'Backburnr'}, (data) => {
    if (data) id = data[0].id;
    console.log(data[0])
})

chrome.runtime.onInstalled.addListener(() => {
    if (id) chrome.storage.sync.set({ id })
    else {
        chrome.bookmarks.create(
            {title: 'Backburnr'},
            function(newFolder) {
              id = newFolder.id
              console.log("added folder: " + id);
              chrome.storage.sync.set({ id });
            },
        );
    }
});

