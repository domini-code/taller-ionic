
function shuffleArray(array: Array<string>) {
  let currentIndex = array.length;
  let temporaryValue: string; 
  let randomIndex: number;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export default shuffleArray;
