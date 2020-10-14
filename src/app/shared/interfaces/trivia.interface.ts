export interface Trivia {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  randomAnswers?: string[];
}

export interface TriviaResponse {
  response_code: number;
  results: Trivia[];
}
