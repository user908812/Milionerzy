import { useState, useEffect } from "react";
import Background from "./Background"
import Questions from "./Questions"
import MainMenuPNG from '../assets/images/main_menu.png'
import StartGameMusic from '../assets/sounds/Milionerzy_czolowka.mp4'

interface StartScreenProps {
    autoMusicPlay: boolean;
    enabled: boolean;
  }

function StartScreen(props: StartScreenProps) {

    interface ImageSize {
        width: number;
        height: number;
    }

    const [startGame, setStartGame] = useState<boolean>(!props.enabled);
    const [visibleFirstMenu, setVisibleFirstMenu] = useState<boolean>(props.enabled);
    const [imgSize, setImgSize] = useState<ImageSize>({width: innerWidth, height: innerHeight});

    const handleClosePage = (): void => window.close();
    const handleReloadPage = (): void => window.location.reload();

    useEffect(() => {
        const onWindowResize = (): void => setImgSize({ width: innerWidth, height: innerHeight });

        window.addEventListener('resize', onWindowResize);

        return window.removeEventListener('resize', onWindowResize);
    }, []);

    return(
        <>
            {(visibleFirstMenu) ?  
                <div>
                    <audio src={StartGameMusic} autoPlay={props.autoMusicPlay}></audio>
                    <img id='MilionerzyTemplate' draggable={false} width={imgSize.width} height={imgSize.height} src={MainMenuPNG} alt={MainMenuPNG} />
                    <div id="game-options">
                        <button className="start-menu-btn" id="start-game-btn" onClick={() => {
                            setStartGame(true);
                            setVisibleFirstMenu(false);
                        }}>Zaczynajmy!</button>
                        <button className="start-menu-btn" id="refresh-game-btn" onClick={handleReloadPage}>Odśwież</button>
                        <button className="start-menu-btn" id="quit-game-btn" onClick={handleClosePage}>Wyjdz</button>
                    </div>
                </div>: null}

            {(startGame) ? <div><Background /><Questions /></div> : null}

        </>
    );
}
export default StartScreen