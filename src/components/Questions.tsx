import { useState } from "react";
import MenuImage from '../assets/images/menu-icon.png';
import PublicznoscPNG from '../assets/images/publicznosc.png'
import PolNaPolPNG from '../assets/images/50na50.png'
import TelefonDoPrzyjacielaPNG from '../assets/images/telefon_do_przyjaciela.png'
import ZamianaPytaniaPNG from '../assets/images/zamiana_pytania.png'
import NiepoprawnaOdpowiedzMP4 from '../assets/sounds/Niepoprawna_odpowiedz.mp4'
import PoprawnaOdpowiedzMP4 from '../assets/sounds/Poprawna_odpowiedz.mp4'
import OczekiwanieNaOdpowiedzMP4 from '../assets/sounds/Waiting_sound.mp4'

function Questions() {

    const nextQuestionDelay: number = 5800;
    const nextQuestionDelayBadAnswer: number = 3000;
    const removeHighlightDelay: number = 2600;
    const highlightDelay: number = 1800;
    const invalidAnswerDelay: number = 2100;
    const correctAnswerDelay: number = 1800;
    const waitingOnAnswerSoundDelay: number = 200;

    //TODO: Array lista pytan

    // const exampleQuestions = [
    //     {id: 1, title: 'Co pija krowy' + '?', answer: {A: 'A. mleko', B: 'B. wode', C: 'C. kisiel', D: 'D. sok', correctAnswer: 'b'.toUpperCase()}},
    //     {id: 2, title: 'Question title2' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'C'.toUpperCase()}},
    //     {id: 3, title: 'Question title3' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 4, title: 'Question title4' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'D'.toUpperCase()}},
    //     {id: 5, title: 'Question title5' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 6, title: 'Question title6' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 7, title: 'Question title7' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 8, title: 'Question title8' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 9, title: 'Question title9' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 10, title: 'Question title10' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 11, title: 'Question title11' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    //     {id: 12, title: 'Question title12' + '?', answer: {A: 'A. ', B: 'B. ', C: 'C. ', D: 'D. ', correctAnswer: 'A'.toUpperCase()}},
    // ]

    interface QuestionType {
        readonly id: number;
        title: string;
        answer: {
            A: string;
            B: string;
            C: string;
            D: string;
            correctAnswer: 'A' | 'B' | 'C' | 'D';
        }
    }

    const questions: QuestionType[] = [
        {id: 1, title: 'Jak nazywa się najwyższy szczyt Ziemi?', answer: {A: 'Mount Everest', B: 'K2', C: 'Makalu', D: 'Annapurna', correctAnswer: 'A'}},
        {id: 2, title: 'Co oznacza skrót "DNA"?', answer: {A: 'Dynamic Network Architecture', B: 'Digital Network Analysis', C: 'Deoxyribonucleic Acid', D: 'Dual Numeric Algorithm', correctAnswer: 'C'}},
        {id: 3, title: 'Kto był pierwszym człowiekiem na przestrzeni kosmicznej?', answer: {A: 'Jurij Gagarin', B: 'Neil Armstrong', C: 'Yuri Malenchenko', D: 'John Glenn', correctAnswer: 'A'}},
        {id: 4, title: 'Jakie jest największe zwierzę lądowe na świecie?', answer: {A: 'Słoń afrykański', B: 'Niedźwiedź brunatny', C: 'Nosorożec biały', D: 'Słoń indyjski', correctAnswer: 'D'}},
        {id: 5, title: 'Które z poniższych miast leży najbliżej równika?', answer: {A: 'Mombasa', B: 'Lima', C: 'Singapur', D: 'Sydney', correctAnswer: 'A'}},
        {id: 6, title: 'Które z poniższych państw nie posiada dostępu do morza?', answer: {A: 'Szwajcaria', B: 'Austria', C: 'Paragwaj', D: 'Botswana', correctAnswer: 'A'}},
        {id: 7, title: 'Która planeta jest najmniejsza w Układzie Słonecznym?', answer: {A: 'Merkury', B: 'Mars', C: 'Wenus', D: 'Jowisz', correctAnswer: 'A'}},
        {id: 8, title: 'Kto odkrył promieniowanie rentgenowskie?', answer: {A: 'Marie Curie', B: 'Wilhelm Conrad Röntgen', C: 'Max Planck', D: 'Albert Einstein', correctAnswer: 'B'}},
        {id: 9, title: 'Jakie jest najdłuższe rzeka na świecie?', answer: {A: 'Nil', B: 'Amazonka', C: 'Jangcy', D: 'Missisipi', correctAnswer: 'B'}},
        {id: 10, title: 'Ile wynosi liczba π (pi) z dokładnością do dwóch miejsc po przecinku?', answer: {A: '3.14', B: '3.16', C: '3.18', D: '3.12', correctAnswer: 'A'}},
        {id: 11, title: 'Która z planet jest najbliżej Słońca?', answer: {A: 'Merkury', B: 'Wenus', C: 'Mars', D: 'Jowisz', correctAnswer: 'A'}},
        {id: 12, title: 'Kto jest autorem "Symfonii pieśni żałosnych"?', answer: {A: 'Ludwig van Beethoven', B: 'Wolfgang Amadeus Mozart', C: 'Johann Sebastian Bach', D: 'Henryk Mikołaj Górecki', correctAnswer: 'D'}},
        ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [guiVisible, setGuiVisible] = useState<boolean>(false);
    const [hasGiveUp, setHasGiveUp] = useState<boolean>(false);

    const handleQuestionClick = (): void => console.log(questions[currentQuestionIndex].title);
    const youWon = (): void => alert(`Gratulacje! Wygrałeś 1 000 000zł!!`);
    const handleOpenMenu = (): void => setGuiVisible(!guiVisible);

    const giveUp = (m: number): void => {
        const isGivingUp: string | undefined = prompt('Czy na pewno chcesz się poddać? (ostatecznie/nie)')?.toLowerCase();

        if (isGivingUp === 'ostatecznie') {
            alert(`Dziękujemy za grę! Wygrywasz ${m}zł.`);
            window.location.reload();
        } else {
            setHasGiveUp(false);
        }
    };

    const showSumOfMoney = (m: number): void => {
        alert(`Niestety niepoprawna odpowiedz! Wygrałeś ${m}zł.`);
        window.location.reload();
    };
    
    function isAnswerCorrect(ans: string): void {
        const invalidAnswerSound = document.getElementById('invalid_answer_sound') as HTMLMediaElement;
        const correctAnswerSound = document.getElementById('correct_answer_sound') as HTMLMediaElement;
        const waitingOnAnswerSound = document.getElementById('waiting_for_answer_sound') as HTMLMediaElement;

        if (currentQuestionIndex === 0) { // Pytanie 1
            hasGiveUp ? giveUp(0) : null;
            if (ans === questions[0].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(1), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(0), nextQuestionDelayBadAnswer);
            }
        } 
        else if (currentQuestionIndex === 1) { // Pytanie 2
            hasGiveUp ? giveUp(0) : null;
            if (ans === questions[1].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(2), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(0), nextQuestionDelayBadAnswer);
            }
        } 
        else if (currentQuestionIndex === 2) { // Pytanie 3
            hasGiveUp ? giveUp(1000) : null;
            if (ans === questions[2].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(3), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 3) { // Pytanie 4
            hasGiveUp ? giveUp(2000) : null;
            if (ans === questions[3].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(4), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 4) { // Pytanie 5
            hasGiveUp ? giveUp(5000) : null;
            if (ans === questions[4].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(5), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 5) { // Pytanie 6
            hasGiveUp ? giveUp(10000) : null;
            if (ans === questions[5].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(6), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 6) { // Pytanie 7
            hasGiveUp ? giveUp(20000) : null;
            if (ans === questions[6].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(7), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 7) { // Pytanie 8
            hasGiveUp ? giveUp(40000) : null;
            if (ans === questions[7].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(8), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 8) { // Pytanie 9
            hasGiveUp ? giveUp(75000) : null;
            if (ans === questions[8].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(9), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 9) { // Pytanie 10
            hasGiveUp ? giveUp(125000) : null;
            if (ans === questions[9].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(10), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 10) { // Pytanie 11
            hasGiveUp ? giveUp(250000) : null;
            if (ans === questions[10].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(11), nextQuestionDelay);
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === 11) { // Pytanie 12
            hasGiveUp ? giveUp(500000) : null;
            if (ans === questions[11].answer.correctAnswer) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                youWon();
            } else {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
    }
    const currentQuestion = questions[currentQuestionIndex];

    window.addEventListener('keydown', (e) => e.key === 'Escape' ? handleOpenMenu() : null);

    return(
        <>
        <header>
            <audio id="invalid_answer_sound" src={NiepoprawnaOdpowiedzMP4} />
            <audio id="correct_answer_sound" src={PoprawnaOdpowiedzMP4} />
            <audio id="waiting_for_answer_sound" src={OczekiwanieNaOdpowiedzMP4} />

            <img draggable={false} id="open-menu-btn" onClick={handleOpenMenu} width={45} height={45} src={MenuImage} alt="Menu Icon" />
                            {guiVisible && (
                                <section id="right-gui">
                                    <div id="div-kola-ratunkowe">
                                        <img draggable={false} className="kola-ratunkowe" width={50} height={50} src={PublicznoscPNG} alt={PublicznoscPNG} />
                                        <img draggable={false} className="kola-ratunkowe" width={50} height={50} src={PolNaPolPNG} alt={PolNaPolPNG} />
                                        <img draggable={false} className="kola-ratunkowe" width={50} height={50} src={TelefonDoPrzyjacielaPNG} alt={TelefonDoPrzyjacielaPNG} />
                                        <img draggable={false} className="kola-ratunkowe" width={50} height={50} src={ZamianaPytaniaPNG} alt={ZamianaPytaniaPNG} />
                                    </div>
                                    <div id="money-display">
                                        <div className="special-label" id="1000000zl"><span className="question-number">{questions[11].id}</span> &nbsp; 1 MILION zł</div>
                                        <div className="normal-label" id="500000zl"><span className="question-number">{questions[10].id}</span> &nbsp; 500 000zł</div>
                                        <div className="normal-label" id="250000zl"><span className="question-number">{questions[9].id}</span> &nbsp; 250 000zł</div>
                                        <div className="normal-label" id="125000zl"><span className="question-number">{questions[8].id}</span> &nbsp; 125 000zł</div>
                                        <div className="normal-label" id="75000zl"><span className="question-number">{questions[7].id}</span> &nbsp; 75 000zł</div>
                                        <div className="special-label" id="40000zl"><span className="question-number">{questions[6].id}</span> &nbsp; 40 000zł</div>
                                        <div className="normal-label" id="20000zl"><span className="question-number">{questions[5].id}</span> &nbsp; 20 000zł</div>
                                        <div className="normal-label" id="10000zl"><span className="question-number">{questions[4].id}</span> &nbsp; 10 000zł</div>
                                        <div className="normal-label" id="5000zl"><span className="question-number">{questions[3].id}</span> &nbsp; 5000zł</div>
                                        <div className="normal-label" id="2000zl"><span className="question-number">{questions[2].id}</span> &nbsp; 2000zł</div>
                                        <div className="special-label" id="1000zl"><span className="question-number">{questions[1].id}</span> &nbsp; 1000zł</div>
                                        <div className="normal-label" id="500zl"><span className="question-number">{questions[0].id}</span> &nbsp; 500zł</div>
                                    </div>
                                    <div>
                                        <hr id="break" />
                                        <button id="give-up-btn" onClick={() => setHasGiveUp(true)}>Zrezygnuj</button> 
                                        <hr />       
                                    </div>
                                </section>
                            )}
        </header>

            <h1 id="question-text" onClick={handleQuestionClick}>{currentQuestion.title}</h1>

            <button id="A" className="answer" onClick={() => isAnswerCorrect('A')}>{currentQuestion.answer.A}</button>
            <button id="B" className="answer" onClick={() => isAnswerCorrect('B')}>{currentQuestion.answer.B}</button>
            <button id="C" className="answer" onClick={() => isAnswerCorrect('C')}>{currentQuestion.answer.C}</button>
            <button id="D" className="answer" onClick={() => isAnswerCorrect('D')}>{currentQuestion.answer.D}</button>
        </>
    );
}
export default Questions;