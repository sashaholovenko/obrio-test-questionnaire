import Image from "next/image";
import {memo} from "react";
import ArrowIcon from "@/components/icons/BackIcon";

enum ScreenTypes {
    Info= "info",
    Question= "question"
}

const Header = ({ screenType, onBack, isLast, onRestart}: {screenType: string, onBack: () => void, onRestart: () => void, isLast: boolean}) => {
    const isInfoScreen  = screenType === ScreenTypes.Info

    return (
        <header className="flex justify-between items-center p-4">
        <Image src={isInfoScreen ? '/main-logo-white.svg' : '/main-logo.svg'} alt='logo' width={15} height={15}/>
            {isLast ? <button className="absolute left-10 bg-gray-500 rounded p-1" onClick={onRestart}>
                Restart
                </button> :
                <button onClick={onBack} className="absolute left-10 ">
                    <ArrowIcon color={isInfoScreen ? "white" : 'black'}/>
                </button>
            }
    </header>
    )
};

export default memo(Header)