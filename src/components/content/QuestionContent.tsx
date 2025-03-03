import OptionButton from "@/components/ui/OptionButton";
import {Question} from "@/pages/question/[questionnaire]/[id]";
import {memo} from "react";
import {SurveyState} from "@/store/surveySlice";

const QuestionContent = ({question, onOptionClick, replaceDynamicValues, answers}: {
    question: Question,
    onOptionClick: (option: string) => void,
    replaceDynamicValues: (option: string) => string,
    answers: Record<string, string>
}) => {
    return (

        <>
            <h1 className="text-2xl font-bold text-black">{replaceDynamicValues(question.question)}</h1>
            <div className="flex flex-col gap-5 pt-[30px]">
                {question.options.map((option) => (
                    <OptionButton
                        key={option}
                        option={option}
                        selected={answers[question.id] === option}
                        onClick={() => onOptionClick(option)}
                    />
                ))}
            </div>
        </>
    )
};

export default memo(QuestionContent)