export default function daoAddressBook(){
   return ['$http'
      , '$parse'
      , '$stateParams'
      , 'localStorageService'
   , (($http: $http
      , $parse
      , $stateParams: $stateParams
      , localStorageService: localStorageService
   ):object => {
      const dao: object = {};
      const zpriv: object = {};

      zpriv.getUrl = function(type: string, context: object){
         switch(type){
            case 'self':         { return `https://frontend-addressbook.herokuapp.com/` } break;
            case 'addressBook':  { return `https://frontend-addressbook.herokuapp.com/${context.candidate}/` } break;
            default: return null;
         }
      };

      dao.get = ((context:object, data: object):promise =>{
         const candidate;
         const url = zpriv.getUrl('addressBook', context);
         return $http.get(url).then((response)=>{
            localStorageService.setObject('fuzeAddressBookCandidateData', $parse('data.value')(response));
            return { success: true, data: ((response || {}).data || {}).value };
         }).catch((error)=>{
            if ( angular.isObject(candidate = localStorageService.getObject('fuzeAddressBookCandidateData')) ){
               return { success: true, data: candidate }
            }else{
               return { success: false, error: error };
            }
         });
      });

      dao.create = ((context: object, data: object):promise =>{
         const url = zpriv.getUrl('addressBook', context);
         return $http.post(url, data).then((response)=>{
            return { success: true, data: ((response || {}).data || {}).value };
         }).catch((error)=>{
            return { success: false, error: error };
         });
      });

      return dao;
   })];
};