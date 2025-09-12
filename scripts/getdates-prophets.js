/**
 * getdates.js
 *
 * This JavaScript update cuurent year and last modification date and display in footer
 *
 */
// select the DOM elements for output

const medium = document.querySelector("#medium");
const year = document.querySelector("#year");

// use the date object
const today = new Date();

medium.innerHTML = `Last Modification:  ${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "medium"
	}
).format(today)}`;

year.innerHTML = ` ${today.getFullYear()}&copy; Erika Fabiola Sánchez Solano | Latter-day Prophets.`;
