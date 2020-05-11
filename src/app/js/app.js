"use strict";

import angular from 'angular';


var mainApp = angular.module('mainApp', ['ngStorage']);

mainApp.controller('appController', function ($scope, $http, $localStorage) {
    //init
    $http({
        method: 'GET',
        url: 'src/data/games.json'
    }).then(function (response) {
        $scope.categories = response.data.categories;
        $scope.totalGames = response.data.games;
        $scope.merchants = response.data.merchants;
        $scope.priorityGame = [];
        for(let i = 0; i < 5; i++){
            var randomIndex = Math.floor(($scope.totalGames.length) * Math.random());
            $scope.priorityGame.push($scope.totalGames[randomIndex]);
        }
    }, function (error) {
        console.log(error, 'can not get data.');
    });


    //sort
    $scope.pageSize = 10;
    $scope.reverse = false;
    $scope.sortField = 'Name.en';
    $scope.sortDirection = ' none ';
    $scope.currentPage = 0;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.filterGames.length / $scope.pageSize);
    };

    $scope.toBegin = function () {
        $scope.currentPage = 0;
    };

    $scope.setLimitPage = function (limit) {
        $scope.pageSize = limit;
    };

    $scope.sort = function (name) {
        $scope.currentPage = 0;

        if ($scope.sortField === name) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.sortField = name;
            $scope.reverse = false;
        }

        if ($scope.reverse) {
            $scope.sortDirection = '\u2191';
        } else {
            $scope.sortDirection = '\u2193';
        }
    };

    //category
    $scope.CategoryIDContains = function (categoryId) {
        return function (item) {
            return item.CategoryID.includes(categoryId);
        };
    };

    $scope.setCategory = function (categoryId) {
        $scope.categoryID = categoryId;
        $scope.currentPage = 0;
    };
    $scope.$storage = $localStorage.$default({
        favorites: []
    });


    //favorites
    $scope.addToFavorites = function (item) {
        $scope.$storage.favorites.push(item);
        var index = $scope.totalGames.indexOf(item);
        if (index !== -1) $scope.totalGames.splice(index, 1);
    };

    $scope.removeFromFavorites = function (item) {
        var index = $scope.$storage.favorites.indexOf(item);
        if (index !== -1) $scope.$storage.favorites.splice(index, 1);
        $scope.totalGames.push(item);
    };

});

mainApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});