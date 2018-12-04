
export default function appRoutes() {
   return ['$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider
         , $urlRouterProvider
      ) => {

         $stateProvider
            .state('root', {
               url: '/root',
               redirectTo: ()=>{
                  return { state: 'root.user', params: { candidate: 'rnascimento' } };
               },
               views: {
                  'header': {
                     template: require('./views/partials/header/header.html'),
                     controller: require('./views/partials/header/header').controller()
                  },
                  'main@':{
                     template: require('./views/home/home.html'),
                     controller: require('./views/home/home').controller()
                  },
                  'footer':{
                     template: require('./views/partials/footer/footer.html'),
                     controller: require('./views/partials/footer/footer').controller()
                  }
               }
            })
            .state('root.user', {
               url: '/{candidate}',
               redirectTo: 'root.user.login'
            })
            .state('root.user.login', {
               url: '/login',
               views: {
                  'main@':{
                     template: require('./views/user.login/index.html'),
                     controller: require('./views/user.login/index').controller()
                  },
               }
            })
            .state('root.user.register', {
               url: '/register',
               views: {
                  'main@':{
                     template: require('./views/user.register/index.html'),
                     controller: require('./views/user.register/index').controller()
                  },
               }
            })
            .state('root.addressBook', {
               url: '⁄{candidate}/{addressBookId}',
               resolve: {
                  userAuth: ['$state', '$stateParams', 'authService', ($state: $state, $stateParams:$stateParams, authService: authService)=>{
                     if ( !angular.isString(authService.getUserAddressBookId()) )
                     {
                        $state.go('root.user.login', { candidate: $stateParams.candidate });
                     }
                  }]
               },
               views:{
                  'main@':{
                     template: '<nav data-ui-view="nav" class="main-navigation"></nav><aside data-ui-view="main-content" class="main-container"></aside>'
                  },
               },
               redirectTo: 'root.addressBook.contacts',
            })
            .state('root.addressBook.contacts', {
               url: '/contacts',
               views: {
                  'nav':{
                     template: require('./views/partials/navigation/navigation.html'),
                     controller: require('./views/partials/navigation/navigation').controller()
                  },
                  'main-content':{
                     template: require('./views/addressBook.contacts/index.html'),
                     controller: require('./views/addressBook.contacts/index').controller()
                  },
               }
            })
            .state('root.addressBook.groups', {
               url: '/groups',
               views: {
                  'nav':{
                     template: require('./views/partials/navigation/navigation.html'),
                     controller: require('./views/partials/navigation/navigation').controller()
                  },
                  'main-content':{
                     template: require('./views/addressBook.groups/index.html'),
                     controller: require('./views/addressBook.groups/index').controller()
                  },
               }
            });

         $urlRouterProvider.otherwise('root');


      }];
}