import {useRouter} from "next/router";
import {useEffect} from "react";



export default function Home() {
  const router = useRouter();

    useEffect(() => {
        localStorage.clear()
    }, []);

  const startQuestionary = () => {
      router.push('/question/questionary1/chooseGender')
  }

  return (
    <div className="flex flex-col items-center  w-full h-full pt-[60px] gap-4" style={{ backgroundColor: '#FFF0F0'}}>
      <h1 className="text-black text-2xl font-bold">Questionary</h1>
      <button className="w-[200px] h-[44px] border rounded text-black bg-blue-400" style={{ backgroundColor: '#EAEEF7'}}
      onClick={startQuestionary}
      >Start</button>
    </div>
  );
}
