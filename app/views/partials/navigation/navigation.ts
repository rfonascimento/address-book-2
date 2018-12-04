export function controller(){
   return ['$scope', '$state', '$stateParams', function($scope: $scope, $state: $state, $stateParams: $stateParams){
      const key = 'myController';
      const myscope = $scope[key] = (($scope)=>{return{
         loadInProgress: false,
         $state: $state
      }})($scope);

      console.log($state);
   }];//
}