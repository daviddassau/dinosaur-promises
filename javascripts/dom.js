"use strict";

// const createDomString = (dinoObject) => {
// 	let domString = `<h1>${dinoObject.name}</h1>`;
// 	printToDom(domString);
// };

// const printToDom = (domString) => {
// 	$('#dinosaur').append(domString);
// };


var outputDiv = $('#dinosaur');

const domString = (dinosaur) => {
	var domStrang = '';
	domStrang += `<div>`;
	domStrang +=   `<h1>${dinosaur.type}</h1>`;
	domStrang += `<div>`;
	printToDom(domStrang);
};

const printToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = domString;