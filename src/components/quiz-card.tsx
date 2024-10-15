import { Quiz } from "@/types/quiz"

const QuizCard = ({ quiz }: { quiz?: Quiz }) => {
  if (!quiz) return <div>QUIZ NOT FOUNNNNND</div>
  return <div>QUIZ ALERT: {quiz.id}</div>
}
QuizCard.displayName = "QuizCard"

export { QuizCard }
