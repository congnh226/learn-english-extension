function getRandomElement(array) {
  let randomIndex = Math.floor((Math.random() * array.length));
  return array[randomIndex];
}

module.factory('StorageService', function() {
  return {
    getScore() {
      return parseInt(localStorage.getItem('score') || 0);
    },
    setScore(score) {
      localStorage.setItem('score', score);
    }
  }
});

module.factory('QuizService', [
  'StorageService',
  function(StorageService) {
    return {
      score: StorageService.getScore(),
      increaseScore: function(number) {
        this.score += number;
        StorageService.setScore(this.score);
      },
      reset: function() {
        this.score = 0;
        StorageService.setScore(this.score);
      },
      getWord: function(word) {
        return words.filter(w => w.word === word)[0];
      },
      getQuiz: function() {
        const numberOfAnswer = 4;
        const answers = [];

        let i = 0;
        while (i < numberOfAnswer) {
          let randomAnswer = getRandomElement(words);
          // console.log('random', randomAnswer);
          if (answers.indexOf(randomAnswer) === -1
              && randomAnswer.word.length > 0
              && randomAnswer.meaning.length > 0) {    
            answers.push(randomAnswer);
            i++
          }
        }

        const question = getRandomElement(answers);
        // console.log('question', question);
        return {question, answers};
      }
    }
  }
]);
