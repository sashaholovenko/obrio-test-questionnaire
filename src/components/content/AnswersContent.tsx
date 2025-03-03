import React from 'react';
import OptionButton from "@/components/ui/OptionButton";
import {FormattedMessage, IntlProvider} from "react-intl";

const AnswersContent = ({answers, questionsData}: {answers: Record<string, string>, questionsData: Record<string, string>}) => {
    return (
    <>
        <div className="flex flex-col gap-5 pt-[30px]">
            {Object.entries(answers).map(([key, value]) => {
                const message = {
                    [key]: questionsData?.[key]
                }

                return (
                    <React.Fragment key={key}>
                        <IntlProvider locale={'en'} messages={message}>
                                {key !== 'previousQuestion' && <p key={key} className="text-black text-lg">
                                    <strong><FormattedMessage id={key} values={{...answers}}/> </strong>{value}
                                </p>}
                        </IntlProvider>
                    </React.Fragment>
            )
            })}
        </div>
    </>
    );
};

export default AnswersContent;