// pages/question/[id].tsx
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {useCallback, useEffect, useMemo, useState} from "react";
import QuestionContent from "@/components/content/QuestionContent";
import InfoContent from "@/components/content/InfoContent";
import Header from "@/components/Header";
import AnswersContent from "@/components/content/AnswersContent";
import jsonFile from '@/data/questionary1.json'


export interface Question {
    id: string;
    question: string;
    options: string[];
    next: Record<string, string>;
    screenType: string;
    referenceId?: string;
    title?: string;
    description?: string;
    previous: string | Record<string, string>
}

interface Props {
    question: Question;
}

type ScreenType = 'options' | 'info' | 'answers'

const QuestionPage = ({ question }: Props) => {
    const router = useRouter();
    const { questionnaire, id } = router.query;
    const [localAnswers, setLocalAnswers] = useState<Record<string, string>>({})

    useEffect(() => {
        const answersLocal = localStorage.getItem('answers')
        if (answersLocal) {
            setLocalAnswers(JSON.parse(answersLocal))
        }
    }, [router, question, questionnaire]);

    const handleOptionClick = useCallback((option: string) => {
        const localAnswers = localStorage.getItem('answers')
        localStorage.setItem('answers', JSON.stringify({...JSON.parse(localAnswers as string), [question.id]: option, previousQuestion: question.id}))

        const nextQuestionId = question.next.default || question.next[option];

        if (nextQuestionId) {
            router.push(`/question/${questionnaire}/${nextQuestionId}`);
        }
    }, [router, question, questionnaire]);

    const handleInfoClick = useCallback(() => {
        const referenceAnswer = localAnswers[question.referenceId!];

        const nextQuestionId = question.next[referenceAnswer];

        if (nextQuestionId) {
            router.push(`/question/${questionnaire}/${nextQuestionId}`);
        }
    }, [localAnswers, question, router, questionnaire]);

    const handleBack = useCallback(() => {
        const answersLocal: Record<string, string | undefined> = JSON.parse(localStorage.getItem('answers') as string)
        const currentQuestion = jsonFile.questions.find(q => q.id === id);
        if (!currentQuestion?.previous) return;

        const previousId = currentQuestion.previous?.default || (currentQuestion.previous as Record<string, string>)[answersLocal?.previousQuestion as string];


        if (previousId) {
            router.push(`/question/${questionnaire}/${previousId}`);
        } else {
            router.back(); // fallback
        }
    }, [id, questionnaire, router])

    const handleRestart = useCallback(() => {
        localStorage.removeItem('answers');
        router.push(`/`);
    }, [router])

    const questionsData = useMemo(() => {
        return jsonFile.questions.reduce((accumulator: Record<string, string>, current: Record<string, string>) => {
            accumulator[current.id] = current.question;
            return accumulator;
        }, {});
    }, [])

    const renderOptions: Record<ScreenType, JSX.Element> = {
        options: <QuestionContent question={question} answers={localAnswers} onOptionClick={handleOptionClick}/>,
        info: <InfoContent question={question} onNext={handleInfoClick} />,
        answers: <AnswersContent answers={localAnswers} questionsData={questionsData} />,
    }

    const colorScheme: Record<string, string> = {
        info: 'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)',
        answers: '#FFF0F0',
        options: '#FFF0F0',
    }

    return (
        <div className="flex flex-col items-center p-6 w-full h-full overflow-auto" style={{background: colorScheme[question.screenType]}}>
            <Header screenType={question.screenType} onBack={() => handleBack()} onRestart={handleRestart} isLast={!question.next}/>
            <div className="w-[330px] xs:w-full">
                {renderOptions[question.screenType as ScreenType]}
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const questionnairesDir = path.join(process.cwd(), 'src/data');
    const files = fs.readdirSync(questionnairesDir);

    const paths = files.flatMap((file) => {
        const filePath = path.join(questionnairesDir, file);
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        return data.questions.map((question: Question) => ({
            params: {
                questionnaire: path.basename(file, '.json'),
                id: question.id,
            },
        }));
    });
    console.log(paths)
    return { paths, fallback: false };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { questionnaire, id } = params as { questionnaire: string; id: string };
    // const filePath = path.join(process.cwd(), 'public/data/questionnaires', `${questionnaire}.json`);
    // const jsonData = fs.readFileSync(filePath, 'utf8');
    // const data = JSON.parse(jsonData);
    const data = JSON.parse(JSON.stringify(jsonFile))
    const question = jsonFile.questions.find((q: Question) => q.id === id) || null;

    if (!question) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            question,
        },
    };
};


export default QuestionPage;
