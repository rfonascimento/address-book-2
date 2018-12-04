require('bootstrap-css-only');
import appRoutes from './app-routes';
import ServiceDaoAddressBook from "./services/dao.address.book.service";
import ServiceDaoContacts from "./services/dao.contacts.service";
import ServiceDaoGroups from "./services/dao.groups.service";
import ServiceLocalStorage from "./services/local.storage.service";
import serviceModalAddressBookContactsConfig from "./services/modal.address.book.contacts.config";
import serviceModalAddressBookContactsDelete from "./services/modal.address.book.contacts.delete";
import serviceModalAddressBookGroupsConfig from "./services/modal.address.book.groups.config";
import serviceModalAddressBookGroupsDelete from "./services/modal.address.book.groups.delete";
import authService from "./services/auth.service";
import loadingComponent from "./components/loading";
import '@fortawesome/fontawesome-free-webfonts';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import 'angularjs-toaster/toaster.css';
import '../assets/css/main.scss'; // Best for last


(function(){'use strict';
   const angular = require('angularjs');
   require('angular-ui-router');
   require('angular-cookies');
   require('angular-ui-bootstrap');
   require('angular-animate');
   require('angularjs-toaster');

   const myapp = angular.module('fuzeAddressBook', ['ngCookies', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'toaster']);

   myapp
      .config(appRoutes())
      .service('daoAddressBookService', ServiceDaoAddressBook())
      .service('daoContactsService', ServiceDaoContacts())
      .service('daoGroupsService', ServiceDaoGroups())
      .service('localStorageService', ServiceLocalStorage())
      .service('modalAddressBookServiceContactsConfig', serviceModalAddressBookContactsConfig())
      .service('modalAddressBookServiceContactsDelete', serviceModalAddressBookContactsDelete())
      .service('modalAddressBookGroupsServiceConfig', serviceModalAddressBookGroupsConfig())
      .service('modalAddressBookGroupsServiceDelete', serviceModalAddressBookGroupsDelete())
      .service('authService', authService())
      .directive('fuzeAddressBookLoadingBlocker', loadingComponent());



   myapp.controller('mainCtrl', ['$rootScope', '$scope', '$state', ($rootScope: $rootScope, $scope:$scope, $state:$state) =>{
      const key = 'myMainController';
      const myscope = $scope[key] = (($scope)=>{return{
         loadInProgress: false,
         data: {}
      }})($scope);


      myscope.isEntryState = ():boolean=>{
         return $state.includes('root.user');
      };



      $rootScope.$on('$stateChangeError',
         function(event, toState, toParams, fromState, fromParams, error){
            console.log(error);
         })

   }]);

})();