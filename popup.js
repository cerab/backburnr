// buttons to use in functions
const addFolderButton = document.getElementById("addToFolder");
const addPopup = document.getElementById("addPopup");
const randomizeButton = document.getElementById("random");
const option1Button = document.getElementById("button1");
const option2Button = document.getElementById("button2");
const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup2");
const doneButton = document.getElementById("done");
const deletePopup = document.getElementById("deletePopup");


// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

function addToFolder() {
    return { docTitle: document.head.title, docURL: document.URL }
}



addFolderButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.get("id", ({ id }) => {
        chrome.bookmarks.create({
            "parentId": id,
            'title': tab.title,
            'url': tab.url,
        })
            .then(() => addPopup.style.display = 'block')
            .then(() => setTimeout(() => addPopup.style.display = 'none', 2000));;
    });
});

// grab bookmarks where parentId === id in storage in an array
// randomly assign button1 and button2's inner text to be the title + the href of each to be the url
randomizeButton.addEventListener("click", async () => {
    chrome.storage.sync.get("id", ({ id }) => {
        chrome.bookmarks.getChildren(`${id}`, (data) => {
            let random1 = data[Math.floor(Math.random() * data.length)];
            let random2 = data[Math.floor(Math.random() * data.length)];
            //adding in a simple check to make sure the 2 random links are different
            while (random1 === random2) {
                console.log("in the loop");
                random2 = data[Math.floor(Math.random() * data.length)];
            }
            //option1Button.innerText = `${random1.title}`;
            //adding in the title added to the popups, then will disply the popup on mouseover
            popup1.innerText = `${random1.title}`;
            popup1.style.display = `none`;
            option1Button.onclick = () => window.open(random1.url);
            //option2Button.innerText = `${random2.title}`;
            popup2.innerText = `${random2.title}`;
            popup2.style.display = `none`;
            option2Button.onclick = () => window.open(random2.url);
        });
    });
});

doneButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    //let parentId = await chrome.storage.sync.get("id", ({ id }));

    const searchRes = await chrome.bookmarks.search({ 'url': tab.url })
    console.log(searchRes);
    if (searchRes[0]) {
        chrome.bookmarks.remove(searchRes[0].id)
            .then(() => console.log('removed'))
            .then(() => deletePopup.style.display = 'block')
            .then(() => setTimeout(() => deletePopup.style.display = 'none', 2000));

    } else (console.log('no record'));

});



option1Button.addEventListener('mouseover', () => {
    popup1.style.display = 'block';
})

option1Button.addEventListener('mouseout', () => {
    popup1.style.display = 'none';
})
option2Button.addEventListener('mouseover', () => {
    popup2.style.display = 'block';
})
option2Button.addEventListener('mouseout', () => {
    popup2.style.display = 'none';
})



// const doc = await chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: addToFolder,
//   });