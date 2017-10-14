(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var dom = require('./dom');

var dinosaurs = [];

const firstDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/dinosaurs.json').done((data1) => {
			resolve(data1.dinosaurs1);
		}).fail(function(error1){
			reject(error1);
		});
	});
};

const secondDinosaurJSON = () => {
	return new Promise(function(resolve, reject){
		$.ajax('./db/dinosaurs2.json').done((data2) => {
			resolve(data2.dinosaurs2);
		}).fail(function(error2){
			reject(error2);
		});
	});
};

const thirdDinosaurJSON = () => {
	return new Promise(function(resolve, reject){
		$.ajax('./db/dinosaurs3.json').done((data3) => {
			resolve(data3.dinosaurs3);
		}).fail(function(error3){
			reject(error3);
		});
	});
};

const allTheCats = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/cats.json').done((catData) => {
			resolve(catData.cats);
		}).fail((error) => {
			reject(error);
		});
	});
};

const dinoGetter = () => {
	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then((results) => {
		allTheCats().then((cats) => {
		results.forEach((result) => {
			result.forEach((dino) => {
				dino.snacks = [];
				dino.catIds.forEach((catId) => {
					cats.forEach((cat) => {
						if(cat.id === catId){
							dino.snacks.push(cat);
						}
					});
				});
				dinosaurs.push(dino);
			});
		  });
		makeDinos();
		});
		console.log("dino", dinosaurs);
	}).catch((error) => {
		console.log("error from Promise.all", error);
	});
};

const makeDinos = () => {
	dinosaurs.forEach((dino) => {
		dom(dino);
	});
};

const initializer = () => {
	dinoGetter();
};

const getDinosaurs = () => {
	return dinosaurs;
};

module.exports = {initializer:initializer, getDinosaurs:getDinosaurs};

},{"./dom":2}],2:[function(require,module,exports){
"use strict";

var outputDiv = $('#dinosaur');

const domString = (dinosaur) => {
	var domStrang = '';
	  domStrang += `<div class=${dinosaur.info === 'Carnivore' ? 'card-bad' : 'card-good'}>`;
	  domStrang +=   `<h1>${dinosaur.type}</h1>`;
	  domStrang +=   `<h4>${dinosaur.bio}</h4>`;
	  if (dinosaur.info === 'Carnivore') {
	  	domStrang += `<h4>Has some tasty snacks.</h4>`;
	  } else {
	  	domStrang += `<h4>Has some adorable (debatable) friends.</h4>`;
	  }
	  domStrang += `<div class="card-holder">`;
	  dinosaur.snacks.forEach((cat) => {
	  	domStrang += `<div class="card">`;
	  	domStrang += `<h5>${cat.name}</h5>`;
	  	domStrang += `<div class="card-image">`;
	  	domStrang +=   `<img src="${cat.imageUrl}">`;
	  	domStrang += `</div>`;
	  	domStrang += `<p class="card-description">${cat.specialSkill}</p>`;
	  	domStrang += `</div>`;
	  });
	  domStrang += `</div>`;
	  domStrang += `</div>`;
	printToDom(domStrang);
};

const printToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = domString;
},{}],3:[function(require,module,exports){
"use strict";

var data = require('./data');


$(document).ready(function() {
	data.initializer();
});
},{"./data":1}]},{},[3]);
