export default function loadBlockerDirective(){

   return ['$parse', '$compile', (($parse: $parse, $compile: $compile) => {

      const fnTemplate = $compile(''+
         '<div class="fuze-address-book-loading-blocker-container" data-ng-show="loadInProgress">'+
            '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'+
         '</div>');

      return {
         compile: (tElement, tAttrs)=>{
            const fnSettings = $parse(tAttrs.fuzeAddressBookLoadingBlocker);
            return {
               post: ($scope, element, attrs, ctrls)=>{
                  const myscope = $scope.$new(true);
                  myscope.loadInProgress = fnSettings($scope);
                  fnTemplate(myscope, (clone) =>{
                     element.append(clone);
                  });

                  $scope.$on('$destroy', ()=>{
                     myscope.$destroy();
                  });


                  $scope.$watch(()=>{ return fnSettings($scope) }, (newValue) =>{
                     myscope.loadInProgress = newValue;
                  })


               }

            };
         }
      };

   })];

};