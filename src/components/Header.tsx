import Image from "next/image";
import {memo} from "react";
import ArrowIcon from "@/components/icons/BackIcon";

enum ScreenTypes {
    Info= "info",
    Question= "question"
}

const Header = ({ screenType, onBack }: {screenType: string, onBack: () => void}) => {
    const isInfoScreen  = screenType === ScreenTypes.Info

    return (
        <header className="flex justify-between items-center p-4">
        <Image src={isInfoScreen ? '/main-logo-white.svg' : '/main-logo.svg'} alt='logo' width={15} height={15}/>
        <button onClick={onBack} className="absolute left-10">
            <ArrowIcon color={isInfoScreen ? "white" : 'black'}/>
        </button>
    </header>
    )
};

export default memo(Header)