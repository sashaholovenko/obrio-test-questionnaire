import React from 'react';
import OptionButton from "@/components/ui/OptionButton";

const AnswersContent = ({answers, questionsData}: {answers: Record<string, string>, questionsData: Record<string, string>}) => {
    return (
            // <div className="flex flex-col items-center justify-center w-full h-full"
            //      style={{backgroundColor: '#FFF0F0'}}>
            //     <h1 className="text-black text-2xl font-bold">Questionary end</h1>
            //     <div className="w-[400px] xs:w-full px-6">
            //         {/*{Object.entries(answers).map(([key, value]) => (*/}
            //         {/*    <p key={key} className="text-black text-lg">*/}
            //         {/*        <strong>{questionsData?.[key]}: </strong>{value}*/}
            //         {/*        /!*<strong>{questionsData?.[key]}: </strong>{value}*!/*/}
            //         {/*    </p>*/}
            //         {/*))}*/}
            //         {Object.entries(answers).map(([key, value]) => (
            //             <p key={key} className="text-black text-lg">
            //                 <strong>{key}: </strong>{value}
            //                 {/*<strong>{questionsData?.[key]}: </strong>{value}*/}
            //             </p>
            //         ))}
            //     </div>
            // </div>

    <>
        <h1 className="text-2xl font-bold text-black">Hi</h1>
        <div className="flex flex-col gap-5 pt-[30px]">
            {Object.entries(answers).map(([key, value]) => (
                <p key={key} className="text-black text-lg">
                    <strong>{key}: </strong>{value}
                    {/*<strong>{questionsData?.[key]}: </strong>{value}*/}
                </p>
            ))}
        </div>
    </>
    );
};

export default AnswersContent;