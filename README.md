
## Installation
To set up the project locally, follow these steps:

1. Clone the repository:  
   `git clone <repository-url>`  
   `cd <project-folder>`

2. Install dependencies:  
   `npm install`

3. Start the development server:  
   `npm run dev`

4. Open your browser and go to `http://localhost:3000`.

## Usage
The application reads JSON files located in the `public/data/questionnaires` directory. All paths and props are generated from these files using `getStaticPaths` and `getStaticProps`. Access the questionnaires using their name and ID in the following format:  
`/question/[questionnaireId]/[id]`

## JSON Structure
Each JSON file should adhere to the following structure:

```json
{
  "id": "chooseGender",
  "question": "Select your gender:",
  "options": [
    "Male",
    "Female"
  ],
  "screenType": "options",
  "next": {
    "Male": "chooseRelationshipStatus",
    "Female": "chooseRelationshipStatus"
  }
}
```

## Explanation
1. id: Used for routing.
2. question: The question text displayed on the page.
3. options: Possible answers for the question.
4. screenType: Defines the type of page (currently supports "info" and "questions").
5. next: Routes for the next page based on the selected answer.
6. referencId: ID of the previous answer for "info" pages.

## Conditional Text

Conditional Text
You can insert dynamic values based on previous answers using the syntax `{someValue}` in your text. This will be replaced with the corresponding property from the answers store.

For conditional text, use the format:

css
Копіювати код
`{that have children's (haveChildrens["Yes"])}`
This structure means that the phrase `that have children's` will only be displayed if the `haveChildrens` question was answered with `Yes.`