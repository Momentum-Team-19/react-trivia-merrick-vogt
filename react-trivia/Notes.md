# Who wants to be a Millionaire?

## Home Page

- Display Categories (Fetch from API)
- Button on Categories to Start Quiz in that category

## Quiz Component

### State

- `currentQuestionIndex` (index of current question)
- `category` (current category of questions)
- `score` (current user score)
- `questions` (array of questions to be asked)

### Methods

- `nextQuestion()` (proceed to the next question)
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
