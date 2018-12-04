export default function modalAddressBookGroupsConfig(){

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
            isInEdition: angular.isObject(data),
            isInCreation: !angular.isObject(data)
         }})($scope);


         (()=>{
            myscope.loadInProgress = true;
            $q.resolve(null)
               .then(()=>{ return daoGroupsService.getExtended(zpriv.getContext()) })
               .then((response)=>{
                  myscope.groupsList = response.data;
                  if ( myscope.isInCreation ){
                     myscope.data.id = myscope.groupsList.length+1;
                  }
               })
               .finally(()=>{ myscope.loadInProgress = false; })
         })();

         myscope.actionConfigGroup = ()=>{
            const promise = null;
            myscope.loadInProgress = true;
            if ( myscope.isInCreation ){
               promise = daoGroupsService.create(zpriv.getContext(), myscope.data)
            }else{
               promise = daoGroupsService.config(zpriv.getContext(), myscope.data)
            }

            return promise.then((response:object)=>{
               if ( response.success == true ){

                  if ( myscope.isInCreation ){
                     toaster.success("Success", "Group successfully created");
                  }else{
                     toaster.success("Success", "Group successfully updated");
                  }
                  return $scope.$close(myscope.data);
               }else{
                  toaster.error("Error", "It was not possible to configure the contact group. Please try again");
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
            template: require('./modal.address.book.groups.config.tpl.html'),
            resolve: {
               data: [()=>{ return data; }]
            }
         }).result;
      };

   })];
};