"use strict";

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