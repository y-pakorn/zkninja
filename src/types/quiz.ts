export type Quiz =
  | ChoiceQuiz
  | OpenEndedQuiz
  | RandomQuiz
  | StudentTeacherChatQuiz

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
  /** Text to clarify the question or explain the content
   * ---
   * $G$ is some group.
   * */
  clarification?: string
  /** List of wrong answers
   * ---
   * ["1", "2", "3", "4"]
   * */
  distractors: ChoiceAnswer[]
  /** List of correct answer or correct answer. If answer is not a list, it will be radio button choice (select one).
   * ---
   * ["5"] | "5"
   * */
  answers: ChoiceAnswer[] | ChoiceAnswer
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
  /** Text to clarify the question or explain the content
   * ---
   * $G$ is some group.
   * */
  clarification?: string
  /** Additional context for AI
   * ---
   * Group theory is a branch of mathematics that studies the algebraic structure known as a group.
   * */
  context?: string
}

/** A random quiz */
export type RandomQuiz = {
  /** Unique identifier */
  id: string
  /** Group identifier */
  group?: string
  /** Type of quiz */
  kind: "random"
  /** Label for the quiz before the generated question
   * ---
   * Are you ready to take more quiz?
   * */
  label?: string
  /** Additional context for AI to generate question
   * ---
   * Provide a question related to property of $G$.
   * */
  context?: string
}

export enum RandomQuizDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Expert = "expert",
}

/** A quiz with chat based questions, simulating a conversation between a student and a teacher */
export type StudentTeacherChatQuiz = {
  /** Unique identifier */
  id: string
  /** Group identifier */
  group?: string
  /** Type of quiz */
  kind: "student-teacher-chat"
  /** First message of the student, default to STUDENT_FIRST_MSG
   * ---
   * Hey! :blush: So, we're diving into {topic} today, huh? Cool! I'm pretty new to this stuff. Mind breaking it down for me? Keep it simple though – my brain's still warming up! :sweat_smile:
   * */
  firstMessage?: string
  /** Topic of the quiz
   * ---
   * Set, Group, and Modulo operation
   * */
  topic: string
  /** Whether to include all chapter of the section in the quiz refernece content, false by default
   * ---
   * true: Include 1, 1.1, 1.2, 1.3, 1.4 (this)
   * false: Only include 1.4 (this)
   * */
  section?: boolean

  /** Additional context for AI to generate question
   * ---
   * Direct conversation in line of how $G$ is related to $H$.
   * */
  context?: string
}
