export interface TriviaCategory {
  id: string;
  name: string;
}

export interface TriviaCategoriesResponse {
  trivia_categories: TriviaCategory[];
}

export interface TriviaCategoryResponse {
  category_id: number;
  category_question_count: CategoryQuestionCount;
}

export interface CategoryQuestionCount {
  total_question_count: number;
  total_easy_question_count: number;
  total_medium_question_count: number;
  total_hard_question_count: number;
}
