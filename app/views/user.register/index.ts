import './index.scss'
export function controller(){
   return ['$scope'
      , '$state'
      , '$stateParams'
      , 'toaster'
      , 'daoAddressBookService'
      , 'authService'
   , function($scope: ng.IScope
      , $state: ng.ui.IStateService
      , $stateParams: ng.ui.IStateParamsService
      , toaster: any
      , daoAddressBookService: any
      , authService: any
   ){
      const key = 'myController';
      const myscope = $scope[key] = (($scope)=>{return{
         loadInProgress: false,
         data: {}
      }})($scope);

      myscope.actionCreate = function(data){
         myscope.loadInProgress = true;
         return daoAddressBookService.create({ candidate: $stateParams.candidate }, data)
            .then((response)=>{
               if ( response && response.success ){
                  toaster.success("Account creation success", "Login with the new account");
                  $state.go('root.user', { candidate: $stateParams.candidate });
               }else{
                  toaster.error("Account creation falied", "Please try again or contact support");
               }
            })
            .catch((error)=>{

            })
            .finally(()=>{ myscope.loadInProgress = false; })
      };

   }];
}