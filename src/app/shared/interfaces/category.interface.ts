export interface TriviaCategory {
  id: string;
  name: string;
}

export interface TriviaCategoryResponse {
  trivia_categories: TriviaCategory[];
}
