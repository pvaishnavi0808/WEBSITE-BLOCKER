
const websiteInput = document.getElementById("websiteInput");
const addButton = document.getElementById("addButton");
const websiteList = document.getElementById("websiteList");

// Load saved websites
let blockedWebsites = JSON.parse(
    localStorage.getItem("blockedWebsites") || "[]"
);

// Display websites
function displayWebsites() {
    websiteList.innerHTML = "";

    blockedWebsites.forEach(function(website, index) {
        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = website;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            blockedWebsites.splice(index, 1);
            saveWebsites();
        });

        li.appendChild(name);
        li.appendChild(deleteButton);

        websiteList.appendChild(li);
    });
}

// Save websites
function saveWebsites() {
    localStorage.setItem(
        "blockedWebsites",
        JSON.stringify(blockedWebsites)
    );

    displayWebsites();
}

// Add website
function addWebsite() {
    let website = websiteInput.value.trim().toLowerCase();

    if (website === "") {
        alert("Please enter a website!");
        return;
    }

    website = website.replace(/^https?:\/\//, "");
    website = website.split("/")[0];

    const domainPattern =
        /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)+$/;

    if (!domainPattern.test(website)) {
        alert("Please enter a valid website domain!");
        return;
    }

    if (blockedWebsites.includes(website)) {
        alert("This website is already added!");
        return;
    }

    blockedWebsites.push(website);

    saveWebsites();

    websiteInput.value = "";
}

// Button click event
addButton.addEventListener("click", addWebsite);

// Enter key event
websiteInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addWebsite();
    }
});

// Display saved websites when page opens
displayWebsites();
