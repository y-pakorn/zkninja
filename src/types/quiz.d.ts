export type Quiz = ChoiceQuiz | OpenEndedQuiz

export type ChoiceAnswer =
  | string
  | {
      text: string
    }
  | {
      text: string
      reason: string
    }

/** A quiz with multiple choice questions */
export type ChoiceQuiz = {
  /** Unique identifier */
  id: string
  /** Group identifier */
  group?: string
  /** Type of quiz */
  kind: "choice"
  /** Question to ask
   * ---
   * How many elements are in $G$?
   * */
  question: string
  /** Context to provide
   * ---
   * $G$ is a group.
   * */
  context?: string
  /** List of wrong answers
   * ---
   * ["1", "2", "3", "4"]
   * */
  distractors: ChoiceAnswer[]
  /** List of correct answer
   * ---
   * ["5"]
   * */
  answers: ChoiceAnswer[]
}

/** A quiz with open-ended questions */
export type OpenEndedQuiz = {
  /** Unique identifier */
  id: string
  /** Group identifier */
  group?: string
  /** Type of quiz */
  kind: "open-ended"
  /** Question to ask
   * ---
   * Explain the concept of a group.
   * */
  question: string
  /** Context to provide
   * ---
   * Group theory is a branch of mathematics that studies the algebraic structure known as a group.
   * */
  context?: string
}
