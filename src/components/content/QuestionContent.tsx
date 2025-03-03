import OptionButton from "@/components/ui/OptionButton";
import {Question} from "@/pages/question/[questionnaire]/[id]";
import {memo} from "react";
import {SurveyState} from "@/store/surveySlice";
import {FormattedMessage, IntlProvider} from "react-intl";

const QuestionContent = ({question, onOptionClick, answers}: {
    question: Question,
    onOptionClick: (option: string) => void,
    answers: Record<string, string>
}) => {

    const messages = {
        myMessage: question.question,
    }

    return (

        <>
            <IntlProvider locale={'en'} messages={messages}>
                <h1 className="text-2xl font-bold text-black">
                    <FormattedMessage id="myMessage" values={{...answers}}/>
                </h1>
                <div className="flex flex-col gap-5 pt-[30px]">
                    {question.options.map((option) => (
                        <OptionButton
                        key={option}
                        option={option}
                        selected={answers[question?.id] === option}
                        onClick={() => onOptionClick(option)}
                    />
                ))}
            </div>
            </IntlProvider>
        </>

    )
};

export default memo(QuestionContent)