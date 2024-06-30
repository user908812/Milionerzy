import { useState, useEffect } from 'react';
import MilionerzyTemplate from '../assets/images/template.png'
import MainMusic from '../assets/sounds/music.mp4'

function Background() {

    interface ImageSize {
        width: number;
        height: number;
    }

    const [imgSize, setImgSize] = useState<ImageSize>({width: innerWidth, height: innerHeight});

    useEffect(() => {
        const onWindowResize = (): void => setImgSize({ width: innerWidth, height: innerHeight });

        window.addEventListener('resize', onWindowResize);

        return window.removeEventListener('resize', onWindowResize);
    }, []);

    return(
        <main>
            <audio src={MainMusic} autoPlay loop></audio>
            <img id='MilionerzyTemplate' draggable={false} width={imgSize.width} height={imgSize.height} src={MilionerzyTemplate} alt={MilionerzyTemplate} />
        </main>
    );
}
export default Background