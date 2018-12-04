export default function modalAddressBookContactsDelete(){

   return ['$uibModal', (($uibModal:$uibModal)=> {

      const ctrl = ['$scope'
         , '$q'
         , '$stateParams'
         , 'daoContactsService'
         , 'daoGroupsService'
         , 'data'
         , 'toaster'
         , ($scope:$scope
            , $q:$q
            , $stateParams:$stateParams
            , daoContactsService: object
            , daoGroupsService: object
            , data:object
            , toaster:toaster
         )=>{
            const key = 'myController';
            const zpriv = {};
            const myscope = $scope[key] = (($scope)=>{return{
               loadInProgress: false,
               data: angular.copy(data)  || {},
            }})($scope);


            myscope.actionDeleteContact = ()=>{
               myscope.loadInProgress = true;
               return daoContactsService.remove(zpriv.getContext(), myscope.data)
                  .then((response:object)=>{
                     if ( response.success == true ){
                        toaster.success("Success", "Contact successfully deleted");
                        return $scope.$close(myscope.data);
                     }else{
                        toaster.error("Error", "It was not possible to delete the contact. Please try again");
                     }
               }).finally(()=>{ myscope.loadInProgress = false; })
            };


            zpriv.getContext = ()=>{
               return {
                  candidate: $stateParams.candidate,
                  addressBookId: $stateParams.addressBookId
               }
            };
         }];

      return (data:object)=>{
         return $uibModal.open({
            controller: ctrl,
            backdrop: 'static',
            template: require('./modal.address.book.contacts.delete.tpl.html'),
            resolve: {
               data: [()=>{ return data; }]
            }
            //templateUrl: require('modal.address.book.contacts.config.tpl.html')
         }).result;
      };

   })];
};