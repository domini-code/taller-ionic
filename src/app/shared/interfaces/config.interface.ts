export interface IDataState {
  difficulty: string;
  category: {
    id: number;
    name: string;
  };
  correctAnswers?: number;
}
