import './header.scss'
export function controller(){
   return ['$scope'
      , '$state'
      , '$stateParams'
      , 'authService'
   , function($scope:$scope
      , $state
      , $stateParams
      , authService
      ){
      const key = 'myController';
      const zpriv = {};
      const myscope = $scope[key] = (($scope)=>{return{
         loadInProgress: false,
         candidate: $stateParams.candidate
      }})($scope);

      myscope.actionLogout = ()=>{
         authService.unsetUserAddressBookId();
         $state.go('root.user', { candidate: $stateParams.candidate });
      };

      myscope.isUserLoggedIn = ()=>{
         return angular.isString(authService.getUserAddressBookId());
      };

   }];//
}