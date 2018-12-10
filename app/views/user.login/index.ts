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

      myscope.actionLogin = function(data){
         const addressBook = null;
         myscope.loadInProgress = true;
         return daoAddressBookService.get({candidate: $stateParams.candidate}, data)
            .then((response)=>{
            if ( response && response.success && angular.isArray(response.data)){
               addressBook = response.data.reduce((output, addressBook)=>{
                  if ( angular.isObject(output) ){ return output; }
                  else if ( addressBook.username == myscope.data.username && addressBook.password == myscope.data.password ){ return addressBook; }
                  else { return null; }
               }, null);
               if ( !angular.isObject(addressBook) ){
                  toaster.error("Authentication failed", "Please verify if the username and password are correct");
               }else{
                  authService.setUserAddressBook(addressBook.id);
                  $state.go('root.addressBook', { candidate: $stateParams.candidate, addressBookId: addressBook.id });
               }
            }
            })
            .catch((error)=>{

            })
            .finally(()=>{ myscope.loadInProgress = false; })
      };

   }];
}