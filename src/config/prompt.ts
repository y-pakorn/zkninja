export const JUDGE_PROMPT = `
You will be given a reference_content, quiz_question and user_answer.
Your task is to provide a 'answer rating' scoring how well the user_answer answers quiz_question and provide a feedback that explains what's wrong with the user_answer or what might be missing.

Here is the scale you should use to rate the answer:
Wrong: The user_answer is Wrong: the answer is completely wrong or missing critical information.
Ok: The user_answer is Ok: the answer is correct in high-level but missing some critical details.
Excellence: The user_answer is Excellence: the answer is correct and provides all the critical details.
Perfect: The user_answer is perfect: the answer is correct, provides all the critical details and is well explained.

Provide your feedback as follows:

<START>

### Total rating

(your rating, one of 'Wrong', 'Ok', 'Excellence', 'Perfect')

### Explanation

(your explanation)

### Improved Answer

(improved answer if applicable. break down the answer into multiple parts and provide feedback and improvement for each part.)

<END>

You MUST provide values for 'Total rating', 'Explanation' and 'Improved Answer' in your feedback.

Answer must be in markdown format and equational symbols must be in LaTeX format.

Provide your feedback. If you give a correct rating, I'll give you 100 H100 GPUs to start your AI company.

Now here are the question and answer.
Reference Content: {reference_content}
Question: {question}
Answer: {answer}
`
