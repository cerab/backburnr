// buttons to use in functions
const addFolderButton = document.getElementById("addToFolder");
const randomizeButton = document.getElementById("random");
const option1Button = document.getElementById("button1");
const option2Button = document.getElementById("button2");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

function addToFolder() {
    return {docTitle: document.head.title, docURL: document.URL}
}



addFolderButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.get("id", ({ id }) => {
        chrome.bookmarks.create({
            "parentId": id,
            'title': tab.title,
            'url': tab.url,
        });
    });
});

// grab bookmarks where parentId === id in storage in an array
// randomly assign button1 and button2's inner text to be the title + the href of each to be the url
randomizeButton.addEventListener("click", async () => {
    chrome.storage.sync.get("id", ({ id }) => {
        chrome.bookmarks.getChildren(`${id}`, (data) => {
            const random1 = data[Math.floor(Math.random() * data.length)];
            const random2 = data[Math.floor(Math.random() * data.length)];
            option1Button.innerText = `${random1.title}`;
            option1Button.onclick = () => window.open(random1.url);
            option2Button.innerText = `${random2.title}`;
            option2Button.onclick = () => window.open(random2.url);
        });
    });
});




// const doc = await chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: addToFolder,
//   });