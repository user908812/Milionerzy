import { useState } from "react";
import MenuImage from '../assets/images/menu-icon.png';
import PublicznoscPNG from '../assets/images/publicznosc.png'
import PolNaPolPNG from '../assets/images/50na50.png'
import TelefonDoPrzyjacielaPNG from '../assets/images/telefon_do_przyjaciela.png'
import ZamianaPytaniaPNG from '../assets/images/zamiana_pytania.png'

function Questions() {

    const nextQuestionDelay: number = 2900;
    const removeHighlightDelay: number = 2500;
    const highlightDelay: number = 1000;

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

    //TODO: Wymysl jakies pytania
    const questions = [
        {id: 1, title: 'Co piją krowy?', answer: {A: 'mleko', B: 'wodę', C: 'kisiel', D: 'sok', correctAnswer: 'B'}},
        {id: 2, title: 'Ile jest dni w tygodniu?', answer: {A: '5', B: '6', C: '7', D: '8', correctAnswer: 'C'}},
        {id: 3, title: 'Jak nazywa się stolica Polski?', answer: {A: 'Warszawa', B: 'Kraków', C: 'Gdańsk', D: 'Wrocław', correctAnswer: 'A'}},
        {id: 4, title: 'Który z podanych jest największym ssakiem?', answer: {A: 'Słoń', B: 'Niedźwiedź', C: 'Pies', D: 'Wieloryb', correctAnswer: 'D'}},
        {id: 5, title: 'Jaki jest wynik dodawania 2 + 2?', answer: {A: '3', B: '4', C: '5', D: '6', correctAnswer: 'B'}},
        {id: 6, title: 'W jakim mieście znajduje się Wieża Eiffla?', answer: {A: 'Londyn', B: 'Berlin', C: 'Paryż', D: 'Rzym', correctAnswer: 'C'}},
        {id: 7, title: 'Co jest stolicą Włoch?', answer: {A: 'Rzym', B: 'Madryt', C: 'Londyn', D: 'Berlin', correctAnswer: 'A'}},
        {id: 8, title: 'Który ocean jest największy?', answer: {A: 'Atlantycki', B: 'Indyjski', C: 'Spokojny', D: 'Arktyczny', correctAnswer: 'C'}},
        {id: 9, title: 'Jakie jest największe jezioro w Polsce?', answer: {A: 'Śniardwy', B: 'Mamry', C: 'Morskie Oko', D: 'Hańcza', correctAnswer: 'A'}},
        {id: 10, title: 'Kto napisał "Pana Tadeusza"?', answer: {A: 'Adam Mickiewicz', B: 'Henryk Sienkiewicz', C: 'Juliusz Słowacki', D: 'Stanisław Lem', correctAnswer: 'A'}},
        {id: 11, title: 'Jakie jest najwyższe pasmo górskie na świecie?', answer: {A: 'Alpy', B: 'Ande', C: 'Himalaje', D: 'Kaukaz', correctAnswer: 'C'}},
        {id: 12, title: 'W którym roku odbyło się lądowanie na Księżycu?', answer: {A: '1965', B: '1969', C: '1972', D: '1980', correctAnswer: 'B'}},
    ];    

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [guiVisible, setGuiVisible] = useState(false);
    const [hasGiveUp, setHasGiveUp] = useState(false);

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

        if (currentQuestionIndex === 0) { // Pytanie 1
            hasGiveUp ? giveUp(0) : null;
            if (ans === questions[0].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(1), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[0].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(0), nextQuestionDelay);
            }
        } 
        else if (currentQuestionIndex === 1) { // Pytanie 2
            hasGiveUp ? giveUp(0) : null;
            if (ans === questions[1].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(2), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[1].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(0), nextQuestionDelay);
            }
        } 
        else if (currentQuestionIndex === 2) { // Pytanie 3
            hasGiveUp ? giveUp(1000) : null;
            if (ans === questions[2].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(3), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[2].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 3) { // Pytanie 4
            hasGiveUp ? giveUp(2000) : null;
            if (ans === questions[3].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(4), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[3].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 4) { // Pytanie 5
            hasGiveUp ? giveUp(5000) : null;
            if (ans === questions[4].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(5), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[4].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 5) { // Pytanie 6
            hasGiveUp ? giveUp(10000) : null;
            if (ans === questions[5].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(6), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[5].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 6) { // Pytanie 7
            hasGiveUp ? giveUp(20000) : null;
            if (ans === questions[6].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(7), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[6].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 7) { // Pytanie 8
            hasGiveUp ? giveUp(40000) : null;
            if (ans === questions[7].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(8), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[7].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 8) { // Pytanie 9
            hasGiveUp ? giveUp(75000) : null;
            if (ans === questions[8].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(9), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[8].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 9) { // Pytanie 10
            hasGiveUp ? giveUp(125000) : null;
            if (ans === questions[9].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(10), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[9].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 10) { // Pytanie 11
            hasGiveUp ? giveUp(250000) : null;
            if (ans === questions[10].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => setCurrentQuestionIndex(11), nextQuestionDelay);
            } else {
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[10].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelay);
            }
        }
        else if (currentQuestionIndex === 11) { // Pytanie 12
            hasGiveUp ? giveUp(500000) : null;
            if (ans === questions[11].answer.correctAnswer) {
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                youWon();
            } else {
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[11].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelay);
            }
        }
    }
    const currentQuestion = questions[currentQuestionIndex];

    window.addEventListener('keydown', (e) => e.key === 'Escape' ? handleOpenMenu() : null);

    return(
        <>
        <header>
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
                                        <div className="special-label"><span className="question-number">{questions[11].id}</span> &nbsp; 1 MILION zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[10].id}</span> &nbsp; 500 000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[9].id}</span> &nbsp; 250 000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[8].id}</span> &nbsp; 125 000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[7].id}</span> &nbsp; 75 000zł</div>
                                        <div className="special-label"><span className="question-number">{questions[6].id}</span> &nbsp; 40 000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[5].id}</span> &nbsp; 20 000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[4].id}</span> &nbsp; 10 000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[3].id}</span> &nbsp; 5000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[2].id}</span> &nbsp; 2000zł</div>
                                        <div className="special-label"><span className="question-number">{questions[1].id}</span> &nbsp; 1000zł</div>
                                        <div className="normal-label"><span className="question-number">{questions[0].id}</span> &nbsp; 500zł</div>
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