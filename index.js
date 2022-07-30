let myLeads = [];
const textEl = document.getElementById("text-el");
const ulEl = document.getElementById("ul-el");
const buttonEl = document.getElementById("save-btn");
const tabEl = document.getElementById("tab-btn");
const deleteEl = document.getElementById("delete-btn");

const getLeadsfromStorage = JSON.parse(localStorage.getItem("myLeads"));

if (getLeadsfromStorage) {
    myLeads = getLeadsfromStorage;
    render(myLeads);
}

function render(Leads) {
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append(li)
    let listItems = "";
    for (let i = 0; i < Leads.length; i++) {
        listItems += `
        <li>
        <a target = '_blank' href = '${Leads[i]}'> ${Leads[i]}</a>
        </li>
        `
    }
    ulEl.innerHTML = listItems;
}

buttonEl.addEventListener("click", function () {
    if (textEl.value != "") {
        myLeads.push(textEl.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
    textEl.value = "";
})

tabEl.addEventListener("click", function () {
    chrome.tabs.query({active: true , currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
})
deleteEl.addEventListener("dblclick", function () {
    myLeads = [];
    localStorage.clear();
    render(myLeads);
})

