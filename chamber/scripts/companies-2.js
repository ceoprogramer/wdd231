
const url = 'companies.json';

async function getCompanyData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
    }
    const data = await response.json();
    
    displayCompanies(data.companies);
  } catch (error) {
    console.error('Hubo un problema con la petición:', error);
  }
}

// Llama a la función para iniciar la carga de datos
getCompanyData(url);

// Función para mostrar las empresas en el DOM
const displayCompanies = (companies) => {
  // Selecciona el contenedor donde se mostrarán las tarjetas
  const cardsContainer = document.querySelector('div#cards');

  companies.forEach((company) => {
    // Crea los elementos HTML para la tarjeta
    let card = document.createElement('section');
    let name = document.createElement('h2');
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let link = document.createElement('a');
    let logo = document.createElement('img');

    // Asigna el contenido y los atributos a los elementos
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
  });
};