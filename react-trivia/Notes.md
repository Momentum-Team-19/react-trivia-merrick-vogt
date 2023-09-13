# Who wants to be a Millionaire?

- ToDo
- complete - ChatGPT

Primary
- Header
- Footer
- Better Home Page UI
- Better Quiz / Question UI
- Skeleton Loading for categories 
- Skeleton Loading for quiz + questions

Secondary
- Breakdown into more components
- User See score
- Win Condition
- Animation / Interactions
- Timer in quiz

3rd
- Store scores in local storage?
- Save session token for new questions?
- Average Score for categories
- Earn badges with perfect score

Extras
- Implement social share feature
- next and back buttons
- pagination
- Add react library


## Home Page

complete - Display Categories (Fetch from API)
complete - Button on Categories to Start Quiz in that category

## Quiz Component

### State

complete - `currentQuestionIndex` (index of current question)
complete - `category` (current category of questions)
- `score` (current user score)
complete - `questions` (array of questions to be asked)

### Methods

complete - `nextQuestion()` (proceed to the next question)
- `checkAnswer()` (check if the user-selected answer is correct)

### Render

- **Question Component** (show current question)
- **AnswerChoices Component** (show possible answers)

## Question Component

### Quiz Props

- `questionText` (the text for the question)

### Quiz Render

- Display the question text

## AnswerChoices Component

### AnswerChoices Props

- `choices` (array of possible answers)
- `correctAnswer` (the correct answer)
- `checkAnswer()` (method to check answer)

### AnswerChoices Render

- Display buttons for each choice
- When a button is clicked, call `checkAnswer()`
