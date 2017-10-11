(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var dom = require('./dom');

var dinosaurs = [];

// The old way - Pyramid of DOOM
// var dinoGetter = function(){
// 	$.ajax('./db/dinosaurs.json').done(function(data1){
// 		console.log("data1", data1);
// 		data1.dinosaurs1.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		console.log("dinosaurs after forEach", dinosaurs);
// 		$.ajax('./db/dinosaurs2.json').done(function(data2){
// 			console.log("data2", data2);
// 			data2.dinosaurs2.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});
// 			console.log('dinsaurs after forEach', dinosaurs);
// 			$.ajax('./db/dinosaurs3.json').done(function(data3){
// 				console.log('data3', data3);
// 				data3.dinosaurs3.forEach(function(dino){
// 					dinosaurs.push(dino);
// 				});
// 				console.log("dinosaurs after forEach", dinosaurs);
// 			});
// 		});
// 	});
// };

const firstDinosaurJSON = () => {
	return new Promise(function(resolve, reject){
		$.ajax('./db/dinosaurs.json').done(function(data1){
			resolve(data1.dinosaurs1);
		}).fail(function(error1){
			reject(error1);
		});
	});
};

const secondDinosaurJSON = () => {
	return new Promise(function(resolve, reject){
		$.ajax('./db/dinosaurs2.json').done(function(data2){
			resolve(data2.dinosaurs2);
		}).fail(function(error2){
			reject(error2);
		});
	});
};

const thirdDinosaurJSON = () => {
	return new Promise(function(resolve, reject){
		$.ajax('./db/dinosaurs3.json').done(function(data3){
			resolve(data3.dinosaurs3);
		}).fail(function(error3){
			reject(error3);
		});
	});
};


// PROMISE WORKS - promise pyramid of DOOM
// var dinoGetter = function(){
// 	firstDinosaurJSON().then(function(results){
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		secondDinosaurJSON().then(function(results2){
// 			results2.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});
// 			thirdDinosaurJSON().then(function(results3){
// 				results3.forEach(function(dino){
// 					dinosaurs.push(dino);
// 				});
// 				console.log("dinosaurs", dinosaurs);
// 			});
// 		});
// 	}).catch(function(error){
// 		console.log("error from dino1", error);
// 	});
// };


// var dinoGetter = function(){
// 	firstDinosaurJSON().then(function(results){
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		return secondDinosaurJSON();
//     }).then(function(results2){
//     	results2.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		return thirdDinosaurJSON();
//     }).then(function(results3){
//     	results3.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		console.log("dinosaurs", dinosaurs);
// 		makeDinos();
//     });
// };

const dinoGetter = () => {
	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then(function(results){
		console.log("results from promise.all", results);
		results.forEach(function(result){
			result.forEach(function(dino){
				dinosaurs.push(dino);
			});
		});
		makeDinos();
	}).catch(function(error){
		console.log("error from Promise.all", error);
	});
};

const makeDinos = () => {
	dinosaurs.forEach(function(dino){
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
},{}],3:[function(require,module,exports){
"use strict";

var data = require('./data');


$(document).ready(function() {
	data.initializer();
});
},{"./data":1}]},{},[3]);
