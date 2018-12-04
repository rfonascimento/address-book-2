import './index.scss'
export function controller(){
   return ['$scope'
      , '$q'
      , '$state'
      , '$stateParams'
      , 'daoGroupsService'
      , 'daoContactsService'
      , 'modalAddressBookGroupsServiceConfig'
      , 'modalAddressBookGroupsServiceDelete'
      , 'toaster'
   , function($scope
      , $q
      , $state
      , $stateParams
      , daoGroupsService
      , daoContactsService
      , modalAddressBookGroupsServiceConfig
      , modalAddressBookGroupsServiceDelete
      , toaster
   ){
      const key = 'myController';
      const zpriv = {};
      const myscope = $scope[key] = (($scope)=>{return{
         loadInProgress: false,
         data: [],
         searchQuery: {},
         searchQueryBy: '$',
         navigation:{
            states: [{ state: 'root.addressBook.contacts', name: 'Contact list' }
               , { state: 'root.addressBook.groups', name: 'Contact groups' }
            ],
            selected: $state.$current.name
         }
      }})($scope);

      (()=>{
         myscope.loadInProgress = true;
         $q.resolve(null)
            .then(()=>{ return daoContactsService.getExtended(zpriv.getContext()); })
            .then((response)=>{ return myscope.contactsList = response.data; })
            .then(()=>{ return myscope.actionGetData()})
            .finally(()=>{ myscope.loadInProgress = false; })
      })();

      myscope.actionGetData = ()=>{
         myscope.loadInProgress = true;
         return daoGroupsService.getExtended(zpriv.getContext())
            .then((response)=>{
               if (response.success == true){
                  myscope.data = response.data.map((group)=>{
                     if ( !angular.isString(group.pictureUrl) || group.pictureUrl.lenght == 0 ){
                        group.pictureUrl = 'https://sprucegrovelandscaping.com/wp-content/uploads/2016/04/Photo-Not-Available.jpg';
                     }
                     return group;
                  });
                  zpriv.contactCount(myscope.data);
               }else{
                  toaster.error("Error", "It was not possible retrieve groups list at this point. Please try again");
               }
            }).finally(()=>{ myscope.loadInProgress = false; })
      };

      myscope.actionConfigGroup = (data:object):promise=>{
         const contact;
         return modalAddressBookGroupsServiceConfig(data)
            .then((response:object)=>{
               contact = myscope.data.reduce((output, group)=>{
                     if ( !output && group && group.id == response.id ){
                        return group;
                     }
                     return output;
                  }
                  , null);

               if ( angular.isObject(contact) ){
                  angular.extend(contact, response);
               }else{
                  myscope.data.push(response);
               }
            });
      };

      myscope.actionDeleteGroup = (data:object):promise=>{
         return modalAddressBookGroupsServiceDelete(data)
            .then((response:object)=>{
               myscope.data.map((contact, index)=>{
                  if ( contact.id == response.id ){
                     myscope.data.splice(index, 1);
                  }
               });
            });
      };

      myscope.navigate = ((state:string)=>{
         $state.go(state);
      });

      zpriv.getContext = ()=>{
         return {
            candidate: $stateParams.candidate,
            addressBookId: $stateParams.addressBookId
         }
      };

      zpriv.contactCount = (groupList:array):array=>{
         groupList.map((group, index)=>{
            group.$$$count = myscope.contactsList.reduce((output, contact)=>{
               if ( contact.groupId == group.id ){ output++; }
               return output;
            }, 0)
         })
      };
   }];
}