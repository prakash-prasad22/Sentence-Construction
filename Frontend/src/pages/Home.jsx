import { MdEditDocument } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import VerticalDivider from "../components/VerticalDivider";
import { useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile"

/**
 * Home Component
 * ----------------
 * Displays the landing page for the Sentence Construction game.
 *
 * Overview:
 * This component presents an introduction to the game, including its description,
 * time per question, total number of questions, and the reward for playing.  It also
 * provides navigation to the game's test section.
 *
 * Features:
 * - Displays a title and description of the game.
 * - Shows the time limit for each question.
 * - Shows the total number of questions in the test.
 * - Displays the coin needed to attempt the test.
 * - Provides a "Start" button to begin the test.
 * - Uses a custom hook to determine mobile device.
 *
 * UI Elements:
 * - Icons: MdEditDocument, GiTwoCoins
 * - Text: Headings, paragraphs
 * - Dividers: VerticalDivider (custom component)
 * - Buttons: "Back" (disabled), "Start"
 *
 * Navigation:
 * - Uses react-router-dom's useNavigate hook to navigate to the "/Test" route when
 * the "Start" button is clicked.
 */



function Home() {

  // Initialize navigation using react-router-dom's useNavigate hook.
  let navigate = useNavigate();

  //custom hook to detect mobile
  const [ isMobile ] = useMobile()

  /**
   * Render the Home component.
   *
   * @returns {JSX.Element} The JSX representation of the Home component.
   */

  return (
    <section className="p-12 md:p-20">
        <div className="flex flex-col items-center gap-8 md:gap-16 justify-center">

            {/* Main heading icon */}
            <MdEditDocument size={60} color="gray"/>

            {/* Title and description section */}
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-[30px] md:text-[44px] font-semibold text-center">Sentence Construction</h1>
                <p className="text-[14px] md:text-[18px] text-gray-500 text-center">User have to construct a sentence with random words by placing it in a correct order.</p>
            </div>

            {/* Game information section (Time, Questions, Coins) */}
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

                {/* Time per question */}
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-[24px]">Time Per Question</h3>
                    <p className="text-gray-500">1 minute</p>
                </div>

                {/* Vertical divider (only on non-mobile devices) */}
                {!isMobile && <VerticalDivider/>}

                {/* Total number of questions */}
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-[24px]">Total Questions</h3>
                    <p className="text-gray-500">10</p>
                </div>

                {/* Vertical divider (only on non-mobile devices) */}
                {!isMobile && <VerticalDivider/>}

                {/* Coins needed to attempt the test */}
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-[24px]">Coins</h3>
                    <div className="flex gap-2">
                        <GiTwoCoins size={30} color="#FFD700"/>
                        <p className="text-gray-500">20 {!isMobile && <span>coins</span>}</p>
                    </div>
                    
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4">
                {/* Back button (disabled) */}
                <button 
                    disabled 
                    className="px-12 py-2 border border-blue-800 rounded-lg text-blue-800 
                                hover:bg-blue-50 cursor-not-allowed"
                >
                    Back
                </button>

                {/* Start button (navigates to /Test route) */}
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