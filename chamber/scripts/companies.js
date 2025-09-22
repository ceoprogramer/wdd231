const url = 'companies.json';
const cardsContainer = document.querySelector("#cards");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

function displayCompanies(companies) {
    cardsContainer.innerHTML = "";
    companies.forEach((company) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let link = document.createElement('a');
        let logo = document.createElement('img');
        let membershipLevel = document.createElement('p');

        name.textContent = company.name;
        address.textContent = company.address;
        phone.textContent = `Phone: ${company.phone}`;
        link.textContent = company.url;
        link.href = company.url;
        membershipLevel.textContent = `Membership Level: ${company.membershipLevel}`;

        logo.setAttribute('src', company.imageurl);
        logo.setAttribute('alt', `Logo de ${company.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '100');
        logo.setAttribute('height', '100');

        card.classList.add('company-card');

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);
        card.appendChild(membershipLevel);

        cardsContainer.appendChild(card);
    });
}


async function displayAllMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`);
        }
        const data = await response.json();
        displayCompanies(data.companies);
    } catch (error) {
        console.error("Error to get data:", error);
    }
}


async function displayFeaturedMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`);
        }
        const data = await response.json();

        const highLevelMembers = data.companies.filter(company => 
            company.membershipLevel === 1 || company.membershipLevel === 2
        );

        highLevelMembers.sort(() => 0.5 - Math.random());
        
        const selectedMembers = highLevelMembers.slice(0, 3);
        
        displayCompanies(selectedMembers);
    } catch (error) {
        console.error("Error to get data:", error);
    }
}

if (gridbutton && listbutton && cardsContainer) {
    gridbutton.addEventListener("click", () => {
        cardsContainer.classList.add("grid");
        cardsContainer.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        cardsContainer.classList.add("list");
        cardsContainer.classList.remove("grid");
    });
}


export { displayAllMembers, displayFeaturedMembers };