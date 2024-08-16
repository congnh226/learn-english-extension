let isStart = false;
module.controller('MainController', [
  '$scope',
  'QuizService',
  function($scope, QuizService) {
    $scope.quizService = QuizService;
  }
]);

module.controller('IndexController', [
  '$scope',
  '$location',
  '$interval',
  '$anchorScroll',
  'QuizService',
  function($scope, $location, $interval, $anchorScroll, QuizService) {
    // store the interval promise in this variable
    let promise;

    $scope.quiz = QuizService.getQuiz();
    $anchorScroll('top');
    $scope.quiz.determinateValue = 100;

    // starts the interval
    $scope.start = function() {
      // stops any running interval to avoid two intervals running at the same time
      $scope.stop();

      // store the interval promise
      console.log('isStart', isStart)
      if(isStart){
        promise =  $interval(timeLost, 100, 0, true);
      }
    };

    // stops the interval
    $scope.stop = function() {
      console.log('stop interval')
      $interval.cancel(promise);
    };

    // starting the interval by default
    $scope.start();

    // stops the interval when the scope is destroyed,
    // this usually happens when a route is changed and
    // the ItemsController $scope gets destroyed. The
    // destruction of the ItemsController scope does not
    // guarantee the stopping of any intervals, you must
    // be responsible for stopping it when the scope is
    // is destroyed.
    $scope.$on('$destroy', function() {
      $scope.stop();
    });

    function timeLost() {
      $scope.quiz.determinateValue -= 1;
      if ($scope.quiz.determinateValue === 0) {
        // $scope.quiz.determinateValue = 100
        console.log('we lost');
        let result = -1;
        $location.path(`/result/${result}/${$scope.quiz.question.word}`);
      };
    }

    $scope.goToResult = (meaning) => {
      let result = 0;
      console.log('selected', meaning);
      console.log('answer', $scope.quiz.question.meaning);
      if (meaning === $scope.quiz.question.meaning) {
        result = 1;
        console.log('user answer is correct', result);
      }

      $location.path(`/result/${result}/${$scope.quiz.question.word}`);
    }
  }
]);

module.controller('ResultController', [
  '$scope',
  '$location',
  '$routeParams',
  '$anchorScroll',
  'QuizService',
  function($scope, $location, $routeParams, $anchorScroll, QuizService) {

    $scope.linkClick = () => {
      $location.path(`/`);
    }

    $anchorScroll('top');
    $scope.result = $routeParams.result === '1';
    console.log('$routeParams.result ' + $routeParams.result, '$scope.result ' + $scope.result);
    $scope.word = QuizService.getWord($routeParams.word);

    if ($scope.result) {
      // $scope.text = "Tiếp tục";
      isStart = true;
      QuizService.increaseScore(1);
      $location.path(`/`);
    } else {
      isStart = false;
      $scope.message = 'So bad!';
      if($routeParams.result === '-1'){
        $scope.message = 'Xaxa ur fat!!';
      }
      $scope.text = "Restart";
      QuizService.reset();
    }
  }
]);
