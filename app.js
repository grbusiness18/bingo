angular.module('app', [])
  .controller('AppController', function($scope) {

    var gridApp = this;
    
    $scope.rw = []
    $scope.cl = []
    $scope.diag = []
    $scope.movecounter = 0; 
    $scope.shwGenerate = true;
    $scope.shwReset = false;
    $scope.showGameOver = false;
    $scope.gridclass = [[]];
    $scope.temp = [1,2,3,4,5]

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
        this.reset();
    }

    gridApp.reset = function(){
        $scope.rw = []
        $scope.cl = []
        $scope.diag = []
        $scope.movecounter = 0; 
        $scope.shwGenerate = true;
        $scope.shwReset = false;
        $scope.showGameOver = false;
        $scope.aGrid = $scope.chunk([...Array(25).keys()].map(x => x +1 ))
        $scope.aGridEnb = $scope.chunk([...Array(25).keys()].map(x => false));
        $scope.bingo = [...Array(5).keys()].map(x => false )        
    }


    gridApp.isGridDisbaled = function(idx, sidx){              
        return $scope.aGridEnb[idx][sidx];
    }

    gridApp.gridClick = function(idx, sidx){
        if ($scope.showGameOver){
            return 
        }
        if ($scope.movecounter >= 25 ){
            // game over
            $scope.showGameOver = true
            $scope.shwReset = true;            
        } else {

            if ($scope.aGridEnb[idx][sidx] === false){
                $scope.aGridEnb[idx][sidx] = true;
                $scope.movecounter =  $scope.movecounter + 1;
            }  
            
            $scope.crossLine()
            $scope.gameover()
        }        
    }

    $scope.crossLine = function(){
        $scope.rw = []
        $scope.cl = []
        $scope.diag = []
       
        $scope.aGridEnb.forEach((el , idx) => {
            if (el.every(v=> v === true)){
                $scope.rw.push(idx)
            }

            var cl_vals = []
            $scope.temp.forEach((cel, cidx) =>{
                cl_vals.push($scope.aGridEnb[cidx][idx])
            });

            if (cl_vals.length == 5 && cl_vals.every(v=> v === true)){
                $scope.cl.push(idx)
            }
        });

        // diagonal
        var diag_x = [$scope.aGridEnb[0][0],$scope.aGridEnb[1][1],
        $scope.aGridEnb[2][2], $scope.aGridEnb[3][3], $scope.aGridEnb[4][4]]

        if (diag_x.every(v=> v=== true)){
            $scope.diag.push("x")
        }

        // diagonal
        var diag_y = [$scope.aGridEnb[0][4],$scope.aGridEnb[1][3],
        $scope.aGridEnb[2][2], $scope.aGridEnb[3][1], $scope.aGridEnb[4][0]]

        if (diag_y.every(v=> v=== true)){
            $scope.diag.push("y")
        }
    };


    $scope.gameover = function(){
        var game = ($scope.rw.length + $scope.cl.length + $scope.diag.length) || 0;
        console.log("Game", game);
        if (game > 4) {
            $scope.showGameOver = true
        }


        if (game > 0){
            for (let i = 1; i <= game; i++) {
                $scope.bingo[i-1] = true
              }            
        }            
        
    }

  });