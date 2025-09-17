const url = 'companies.json';

document.addEventListener('DOMContentLoaded', () => {
    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");
    const cardsContainer = document.querySelector("#cards");

       
    function displayCompanies(companies) {
        cardsContainer.innerHTML = ""; // limpia antes de renderizar
        companies.forEach((company) => {
            let card = document.createElement('section');
            let name = document.createElement('h2');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let link = document.createElement('a');
            let logo = document.createElement('img');
            
            name.textContent = company.name;
            address.textContent = company.address;
            phone.textContent = `Phone: ${company.phone}`;
            link.textContent = company.url;


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
            
            cardsContainer.appendChild(card);
        }); 
    }

    async function getCompanyData(url) {
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

    // Botones grid / list
    gridbutton.addEventListener("click", () => {
        cardsContainer.classList.add("grid");
        cardsContainer.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        cardsContainer.classList.add("list");
        cardsContainer.classList.remove("grid");
    });

   
    getCompanyData(url);
});
