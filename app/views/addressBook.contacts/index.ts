import './index.scss'
export function controller(){
   return ['$scope'
      , '$q'
      , '$state'
      , '$stateParams'
      , 'daoGroupsService'
      , 'daoContactsService'
      , 'modalAddressBookServiceContactsConfig'
      , 'modalAddressBookServiceContactsDelete'
      , 'toaster'
   , function($scope
      , $q
      , $state
      , $stateParams
      , daoGroupsService
      , daoContactsService
      , modalAddressBookServiceContactsConfig
      , modalAddressBookServiceContactsDelete
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
            .then(()=>{ return daoGroupsService.getExtended(zpriv.getContext()) })
            .then((response)=>{ return myscope.groupsList = response.data; })
            .then(()=>{ return myscope.actionGetData()})
            .finally(()=>{ myscope.loadInProgress = false; })
      })();

      myscope.actionGetData = ()=>{
         myscope.loadInProgress = true;
         return daoContactsService.getExtended(zpriv.getContext())
            .then((response)=>{
               if (response.success == true){
                  myscope.data = response.data.map((contact)=>{
                     if ( !angular.isString(contact.pictureUrl) || contact.pictureUrl.lenght == 0 ){
                        contact.pictureUrl = 'https://sprucegrovelandscaping.com/wp-content/uploads/2016/04/Photo-Not-Available.jpg';
                     }
                     return contact;
                  });
                  zpriv.getContactGroup(myscope.data);
               }else{
                  toaster.error("Error", "It was not possible retrieve contact list at this point. Please try again");
               }
            }).finally(()=>{ myscope.loadInProgress = false; })
      };

      myscope.actionConfigContact = (data:object):promise=>{
         const contact;
         return modalAddressBookServiceContactsConfig(data)
            .then((response:object)=>{
               contact = myscope.data.reduce((output, contact)=>{
                     if ( !output && contact && contact.name == response.name ){
                        return contact;
                     }
                     return output;
                  }
                  , null);

               if ( angular.isObject(contact) ){
                  angular.extend(contact, response);
               }else{
                  myscope.data.push(response);
                  zpriv.getContactGroup(myscope.data);
               }
            });
      };

      myscope.actionDeleteContact = (data:object):promise=>{
         return modalAddressBookServiceContactsDelete(data)
            .then((response:object)=>{
               myscope.data.map((contact, index)=>{
                  if ( contact.name == response.name ){
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

      zpriv.getContactGroup = (contactList:array):array=>{
         contactList.map((contact)=>{
            contact.$$$groupName = myscope.groupsList.reduce((output, group)=>{
               if ( !output && group && group.id == contact.groupId ){ return group.name; }
               return output;
            }, null)
         });
      }
   }];
}