import {places} from '../data/places.mjs'
//console.log(places);

//---- GRAB A REFERENCE TO THE DIVISION WHERE WE DISPLAY THE ITEMS
const showHere = document.querySelector("#allplaces")

//----- LOOP THROUGH THE ARRAY OF JASON ITEMS
function displayItems(places) {
    places.forEach(x => {

        //buil the card element
        const thecard = document.createElement ('div')
        thecard.classList.add('place-card');

        //buid the photo element
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo_url}`
        thephoto.alt = x.name
        thephoto.loading = 'lazy';
        thecard.appendChild(thephoto)

        //build the title element
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)

        
        //buid the description element
        const thedesc = document.createElement ('p')
        thedesc.innerHTML = x.description
        thecard.appendChild(thedesc)

        //build the address element
        const theaddress = document.createElement('address')
        theaddress.innerHTML = `<strong>Address:</strong> ${x.address}`;
       
        thecard.appendChild(theaddress)

        //buid the cost element
        const thecost = document.createElement('p')
        thecost.classList.add('cost');
        thecost.innerHTML = `<strong>Cost:</strong> ${x.cost}`;
        thecard.appendChild(thecost)

        showHere.appendChild(thecard)
   
    })//end Loop
} //end function

//START DISPLAYING ALL ITEMS IN THE JSON FILE
displayItems(places)