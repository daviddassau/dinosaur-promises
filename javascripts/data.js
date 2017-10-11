"use strict";

var dom = require('./dom');

var dinosaurs = [];

const firstDinosaurJSON = () => {
	return new Promise(function(resolve, reject){
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
