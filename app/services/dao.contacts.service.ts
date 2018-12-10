export default function daoContacts(){
   return ['$http'
      , '$stateParams'
      , '$parse'
      , 'localStorageService'
   , (($http: ng.IHttpService
      , $stateParams: ng.ui.IStateParamsService
      , $parse: ng.IParseService
      , localStorageService: any
   ):object => {
      const dao: object = {};
      const zpriv: object = {};

      zpriv.getUrl = function(context: object, data: object){

         if ( data && data.name ){
            return `https://frontend-addressbook.herokuapp.com/${context.candidate}/${context.addressBookId}/contacts/${data.name}`
         }
         else{
            return `https://frontend-addressbook.herokuapp.com/${context.candidate}/${context.addressBookId}/contacts/`
         }

      };

      zpriv.rest2gui = (data:object)=>{

      };

      dao.get = ((context: object, data: object):promise =>{
         const url = zpriv.getUrl(context, data);
         return $http.get(url).then((response)=>{
            return { success: true, data: ((response || {}).data || {}).value };
         }).catch((error)=>{ return { success: false, error: error }; });
      });

      // Apparently there's no GET to the resource per se
      dao.getExtended = (context:object)=>{
         const data;
         const url = `https://frontend-addressbook.herokuapp.com/${context.candidate}/${context.addressBookId}`;
         return $http.get(url).then((response)=>{
            localStorageService.setObject('fuzeAddressBookContactsData', $parse('data.value.contacts')(response));
            return { success: true, data: $parse('data.value.contacts')(response) };
         }).catch((error)=>{
            if ( angular.isObject(data = localStorageService.getObject('fuzeAddressBookContactsData')) ){
               return { success: true, data: data }
            }else{
               return { success: false, error: error };
            }
         });
      };

      dao.create = ((context: object, data: object):promise =>{
         const url = `https://frontend-addressbook.herokuapp.com/${context.candidate}/${context.addressBookId}/contacts/`;
         return $http.post(url, data).then((response)=>{
            return { success: true, data: ((response || {}).data || {}).value };
         }).catch((error)=>{ return { success: false, error: error }; });
      });

      dao.config = ((context: object, data: object):promise =>{
         const url = zpriv.getUrl(context, data);
         return $http.put(url, data).then((response)=>{
            return { success: true, data: ((response || {}).data || {}).value };
         }).catch((error)=>{ return { success: false, error: error }; });
      });

      dao.remove = ((context: object, data: object):promise =>{
         const url = zpriv.getUrl(context, data);
         return $http.delete(url, data).then((response)=>{
            return { success: true, data: ((response || {}).data || {}).value };
         }).catch((error)=>{ return { success: false, error: error }; });
      });

      return dao;
   })];
};