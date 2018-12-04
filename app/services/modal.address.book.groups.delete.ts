export default function modalAddressBookContactsDelete(){

   return ['$uibModal', (($uibModal:$uibModal)=> {

      const ctrl = ['$scope'
         , '$q'
         , '$stateParams'
         , 'daoGroupsService'
         , 'data'
         , 'toaster'
      , ($scope:$scope
         , $q:$q
         , $stateParams:$stateParams
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


         myscope.actionDeleteGroup = ()=>{
            myscope.loadInProgress = true;
            return daoGroupsService.remove(zpriv.getContext(), myscope.data)
               .then((response:object)=>{
                  if ( response.success == true ){
                     toaster.success("Success", "Group successfully deleted");
                     return $scope.$close(myscope.data);
                  }else{
                     toaster.error("Error", "It was not possible to delete the contact group. Please try again");
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
            template: require('./modal.address.book.groups.delete.tpl.html'),
            resolve: {
               data: [()=>{ return data; }]
            }
         }).result;
      };

   })];
};