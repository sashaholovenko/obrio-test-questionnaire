// pages/question/[id].tsx
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
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
        const localStoreAnswers = localStorage.getItem('answers');
        const parsedAnswers = localStoreAnswers ? JSON.parse(localStoreAnswers) : {};

        const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');
        history.push(question.id);

        localStorage.setItem('answers', JSON.stringify({
            ...parsedAnswers,
            [question.id]: option,
        }));

        localStorage.setItem('history', JSON.stringify(history));

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
        const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');
        const answersLocal: Record<string, string | undefined> = JSON.parse(localStorage.getItem('answers') || '{}');

        if (history.length <= 1) {
            router.back(); // fallback
            return;
        }

        history.pop();
        const previousQuestionId = history[history.length - 1];

        const previousAnswer = answersLocal[previousQuestionId];
        const previousQuestion = jsonFile.questions.find(q => q.id === previousQuestionId);

        if (!previousQuestion) {
            router.back(); // fallback
            return;
        }

        const previousId =
            previousAnswer && typeof previousAnswer === 'string'
                ? (previousQuestion.previous as Record<string, string | undefined>)?.[previousAnswer]
                : previousQuestion.previous?.default;


        if (previousId && previousId !== id) {
            localStorage.setItem('history', JSON.stringify(history));
            router.push(`/question/${questionnaire}/${previousId}`);
        } else {
            router.back(); // fallback
        }
    }, [id, questionnaire, router]);


    const handleRestart = useCallback(() => {
        localStorage.removeItem('answers');
        router.push(`/`);
    }, [router])

    const questionsData = useMemo(() => {
        return jsonFile.questions.reduce<Record<string, string>>((accumulator, current) => {
            accumulator[current.id] = current.question as string;
            return accumulator;
        }, {});
    }, []);


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
    const { id } = params as { questionnaire: string; id: string };
    const question = jsonFile.questions.find((q) => q.id === id) || null;

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
