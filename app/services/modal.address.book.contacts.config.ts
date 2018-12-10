export default function modalAddressBookContactsConfig(){

   return ['$uibModal', (($uibModal:$uibModal)=> {

      const ctrl = ['$scope'
         , '$q'
         , '$state'
         , '$stateParams'
         , 'daoContactsService'
         , 'daoGroupsService'
         , 'data'
         , 'toaster'
      , ($scope: ng.IScope
         , $q: ng.IQService
         , $state: ng.ui.IStateService
         , $stateParams: ng.ui.IStateParamsService
         , daoContactsService: any
         , daoGroupsService: any
         , data:any
         , toaster: any
      )=>{
         const key = 'myController';
         const zpriv = {};
         const myscope = $scope[key] = (($scope)=>{return{
            loadInProgress: false,
            data: angular.copy(data)  || {},
            isInEdition: angular.isObject(data),
            isInCreation: !angular.isObject(data)
         }})($scope);


         (()=>{
            myscope.loadInProgress = true;
            $q.resolve(null)
               .then(()=>{ return daoGroupsService.getExtended(zpriv.getContext()) })
               .then((response)=>{ myscope.groupsList = response.data; })
               .finally(()=>{ myscope.loadInProgress = false; })
         })();

         myscope.actionConfigContact = ()=>{
            const promise = null;
            myscope.loadInProgress = true;
            if ( myscope.isInCreation ){
               promise = daoContactsService.create(zpriv.getContext(), myscope.data)
            }else{
               promise = daoContactsService.config(zpriv.getContext(), myscope.data)
            }

            return promise.then((response:object)=>{
               if ( response.success == true ){

                  if ( myscope.isInCreation ){
                     toaster.success("Success", "Contact successfully created");
                  }else{
                     toaster.success("Success", "Contact successfully updated");
                  }
                  return $scope.$close(myscope.data);
               }else{
                  toaster.error("Error", "It was not possible to configure the contact. Please try again");
               }
            }).finally(()=>{ myscope.loadInProgress = false; })
         };

         myscope.getGroups = ()=>{
           return myscope.groupsList;
         };

         myscope.createNewContact = ()=>{
            $scope.$dismiss();
            $state.go('root.addressBook.groups');
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
            template: require('./modal.address.book.contacts.config.tpl.html'),
            resolve: {
               data: [()=>{ return data; }]
            }
            //templateUrl: require('modal.address.book.contacts.config.tpl.html')
         }).result;
      };

   })];
};