module.controller('MainController', [
  '$scope',
  '$interval',
  'QuizService',
  function($scope, $interval, QuizService) {
    $scope.quizService = QuizService;
    $scope.determinateValue = 30;

    $interval(function() {
      $scope.determinateValue += 1;      
      if ($scope.determinateValue > 100) $scope.determinateValue = 30;       
    }, 100, 0, true); 
  }
]);

module.controller('IndexController', [
  '$scope',
  '$location',
  '$anchorScroll',
  'QuizService',
  function($scope, $location, $anchorScroll, QuizService) {
    $scope.quiz = QuizService.getQuiz();
    $anchorScroll('top');

    $scope.goToResult = (meaning) => {
      let result = 0;
      if (meaning === $scope.quiz.question.meaning)
        result = 1;
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
    $scope.word = QuizService.getWord($routeParams.word);

    if ($scope.result) {
      // $scope.text = "Tiếp tục";
      QuizService.increaseScore(1);    
      $location.path(`/`);  
    } else {
      $scope.text = "Bắt đầu lại";
      QuizService.reset();
    }
  }
]);
