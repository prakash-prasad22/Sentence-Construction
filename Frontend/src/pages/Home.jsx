import { MdEditDocument } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import VerticalDivider from "../components/VerticalDivider";
import { useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile"


function Home() {

  let navigate = useNavigate();
  const [ isMobile ] = useMobile()

  return (
    <section className="p-12 md:p-20">
        <div className="flex flex-col items-center gap-8 md:gap-16 justify-center">
            <MdEditDocument size={60} color="gray"/>

            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-[30px] md:text-[44px] font-semibold text-center">Sentence Construction</h1>
                <p className="text-[14px] md:text-[18px] text-gray-500 text-center">User have to construct a sentence with random words by placing it in a correct order.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-[24px]">Time Per Question</h3>
                    <p className="text-gray-500">1 minute</p>
                </div>

                {!isMobile && <VerticalDivider/>}

                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-[24px]">Total Questions</h3>
                    <p className="text-gray-500">10</p>
                </div>

                {!isMobile && <VerticalDivider/>}

                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-[24px]">Coins</h3>
                    <div className="flex gap-2">
                        <GiTwoCoins size={30} color="#FFD700"/>
                        <p className="text-gray-500">20 {!isMobile && <span>coins</span>}</p>
                    </div>
                    
                </div>
            </div>

            <div className="flex gap-4">
                <button 
                    disabled 
                    className="px-12 py-2 border border-blue-800 rounded-lg text-blue-800 
                                hover:bg-blue-50 cursor-not-allowed"
                >
                    Back
                </button>

                <button 
                    className="px-12 py-2 bg-blue-700 rounded-lg text-white hover:bg-blue-800 
                                cursor-pointer"
                    onClick={()=>navigate("/Test")}
                >
                    Start
                </button>
            </div>
            
        </div>
        
    </section>
  )
}

export default Home