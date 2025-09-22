const url = 'companies.json';
// Variables para los botones y el contenedor
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const cardsContainer = document.querySelector("#cards"); // Cambiado a #cards

// Lógica para los botones
gridbutton.addEventListener("click", () => {
    cardsContainer.classList.add("grid");
    cardsContainer.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cardsContainer.classList.add("list");
    cardsContainer.classList.remove("grid");
});

async function getCompanyData(url) {
  const response = await fetch(url);
  const data = await response.json();
  
  displayCompanies(data.companies); 
}

getCompanyData(url);

const displayCompanies = (companies) => {
  const cardsContainer = document.querySelector('div#cards');

  companies.forEach((company) => {
    // Create elements to add to the div.cards element
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
    link.href = `https://${company.url}`;
    link.target = "_blank"; // Para que el enlace se abra en una nueva pestaña

    // Configura los atributos de la imagen
    logo.setAttribute('src', company.imageurl);
    logo.setAttribute('alt', `Logo de ${company.name}`);
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('width', '100'); // Tamaño de la imagen
    logo.setAttribute('height', '100'); // Tamaño de la imagen

    // Agrega una clase a la tarjeta para aplicar estilos CSS
    card.classList.add('company-card');

    // Agrega los elementos a la tarjeta
    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(link);
     // Inserta la tarjeta en el contenedor principal
    cardsContainer.appendChild(card);
   //document.querySelector('div.grid').appendChild(card);
  }); // end of arrow function and forEach loop
};

