export function controller(){
   return ['$scope'
      , '$state'
      , '$stateParams'
   , function($scope: ng.IScope
      , $state: ng.ui.IStateService
      , $stateParams: ng.ui.IStateParamsService
   ){
      const key = 'myController';
      const myscope = $scope[key] = (($scope)=>{return{
         loadInProgress: false,
         $state: $state
      }})($scope);

      console.log($state);
   }];//
}