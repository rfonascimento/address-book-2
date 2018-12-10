export default function daoAddressBook(){
   return ['$http'
      , '$parse'
      , '$stateParams'
      , 'localStorageService'
   , (($http: ng.IHttpService
      , $parse: ng.IParseService
      , $stateParams: ng.ui.IStateParamsService
      , localStorageService: any
   ):object => {
      const dao: any = {};
      const zpriv: any = {};

      zpriv.getUrl = function(type: string, context: any){
         switch(type){
            case 'self':         { return `https://frontend-addressbook.herokuapp.com/` } break;
            case 'addressBook':  { return `https://frontend-addressbook.herokuapp.com/${context.candidate}/` } break;
            default: return null;
         }
      };

      dao.get = ((context: Object, data: Object): ng.IPromise =>{
         let candidate;
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

      dao.create = ((context: Object, data: Object): ng.IPromise =>{
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