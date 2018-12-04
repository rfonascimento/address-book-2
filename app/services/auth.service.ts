export default function Auth(){
   return ['$cookies', '$stateParams', (($cookies:$cookies, $stateParams: $stateParams):object => {
      const zpriv: object = {};
      const service:object = {};

      service.getUserAddressBookId = ():string=>{
         return $cookies.get('userAddressBookId');
      };

      service.setUserAddressBook = (userAddressBook:string):string =>{
         return $cookies.put('userAddressBookId', userAddressBook);
      };

      service.unsetUserAddressBookId = ()=>{
         return $cookies.remove('userAddressBookId');
      };

      return service;
   })];
};