angular.module('app', [])
  .controller('AppController', function($scope) {

    var gridApp = this;
    
    $scope.movecounter = 0; 
    $scope.shwGenerate = true;
    $scope.shwReset = false;
    $scope.showGameOver = false;

    $scope.gridclass = [[]];

    $scope.chunk = function(a){
        results = []
        chunk_size = 5
        while(a.length > 0){
            results.push(a.splice(0, chunk_size))
        }
        return results 
    }

    $scope.bingo = [...Array(25).keys()].map(x => false )
    $scope.aGrid = $scope.chunk([...Array(25).keys()].map(x => x +1 ))
    $scope.aGridEnb = $scope.chunk([...Array(25).keys()].map(x => false));

    gridApp.generate = function(){
        var arr = [...Array(25).keys()].map(x => x +1 );
        arr.sort(() => Math.random() - 0.5);        
        $scope.aGrid = $scope.chunk(arr);  
    }

    gridApp.reset = function(){
        $scope.movecounter = 0; 
        $scope.shwGenerate = true;
        $scope.shwReset = false;
        $scope.showGameOver = false;
        $scope.aGrid = $scope.chunk([...Array(25).keys()].map(x => x +1 ))
        $scope.aGridEnb = $scope.chunk([...Array(25).keys()].map(x => false));
        $scope.bingo = [...Array(25).keys()].map(x => false )
    }


    gridApp.isGridDisbaled = function(idx, sidx){              
        return $scope.aGridEnb[idx][sidx];
    }

    gridApp.gridClick = function(idx, sidx){
        if ($scope.movecounter >= 25 ){
            // game over
            $scope.showGameOver = true
            $scope.shwReset = true;            
        } else {

            if ($scope.aGridEnb[idx][sidx] === false){
                $scope.aGridEnb[idx][sidx] = true;
                $scope.movecounter =  $scope.movecounter + 1;
            }            
        }        
    }

    $scope.crossLine = function(){
        
    };
  });