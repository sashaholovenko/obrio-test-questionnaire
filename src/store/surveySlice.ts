import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SurveyState {
    answers: Record<string, string>;
    questionary: string
}

const initialState: SurveyState = {
    answers: {
    },
    questionary: ''
};

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
            state.answers[action.payload.questionId] = action.payload.answer;
        },
        setQuestionary: (state, action: PayloadAction<string>) => {
            state.questionary = action.payload
        },
        clearAnswers: (state) => {
            state.answers = {};
        },
        setFromLocalStorage: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
            state.answers = action.payload
        },
    },
});

export const { setAnswer, clearAnswers, setQuestionary, setFromLocalStorage } = surveySlice.actions;

export default surveySlice.reducer;
