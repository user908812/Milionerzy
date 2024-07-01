import { useState } from "react";
import MenuImage from '../assets/images/menu-icon.png';
import PublicznoscPNG from '../assets/images/publicznosc.png'
import PolNaPolPNG from '../assets/images/50na50.png'
import TelefonDoPrzyjacielaPNG from '../assets/images/telefon_do_przyjaciela.png'
import ZamianaPytaniaPNG from '../assets/images/zamiana_pytania.png'
import NiepoprawnaOdpowiedzMP4 from '../assets/sounds/Niepoprawna_odpowiedz.mp4'
import PoprawnaOdpowiedzMP4 from '../assets/sounds/Poprawna_odpowiedz.mp4'
import OczekiwanieNaOdpowiedzMP4 from '../assets/sounds/Waiting_sound.mp4'
import GiveUpButtonPNG from '../assets/images/give_up_BTN.png'

function Questions() {

    const nextQuestionDelay: number = 5800;
    const nextQuestionDelayBadAnswer: number = 3000;
    const removeHighlightDelay: number = 2600;
    const highlightDelay: number = 1800;
    const invalidAnswerDelay: number = 2500;
    const correctAnswerDelay: number = 1800;
    const waitingOnAnswerSoundDelay: number = 200;
    const giveUpAnnouncementDelay: number = 2300;

    enum chosenQuestion {
        FIRST = 0,
        SECOND = 1,
        THIRD = 2,
        FOURTH = 3,
        FIFTH = 4,
        SIXTH = 5,
        SEVENTH = 6,
        EIGHTH = 7,
        NINTH = 8,
        TENTH = 9,
        ELEVENTH = 10,
        TWELFTH = 11
    }

    const openRightMenuKey: string = 'Escape';
    const giveUpWord: string = 'tak';
    const menuIcon: MenuIconType = {width: 45, height: 45}

    const lifelines: LifeLinesType = {
        size: { width: 50, height: 50}
    }

    interface QuestionType {
        readonly id: number;
        readonly title: string;
        readonly answer: {
            readonly A: string;
            readonly B: string;
            readonly C: string;
            readonly D: string;
            readonly correctAnswer: 'A' | 'B' | 'C' | 'D';
        }
    }
    interface MenuIconType { readonly width: number; readonly height: number }
    interface LifeLinesType { readonly size: { readonly width: number; readonly height: number} }

    const questions: QuestionType[] = [
        { id: 1, title: 'Jak nazywa się najwyższy szczyt Ziemi?', answer: { A: 'Mount Everest', B: 'K2', C: 'Makalu', D: 'Annapurna', correctAnswer: 'A' } },
        { id: 2, title: 'Jak nazywa się proces, w którym rośliny produkują pokarm za pomocą światła słonecznego?', answer: { A: 'Oddychanie komórkowe', B: 'Fotosynteza', C: 'Mitochondria', D: 'Transpiracja', correctAnswer: 'B' } },
        { id: 3, title: 'Ile wynosi pierwiastek kwadratowy z liczby 144?', answer: { A: '11', B: '12', C: '13', D: '14', correctAnswer: 'B' } },
        { id: 4, title: 'W którym roku miała miejsce bitwa pod Grunwaldem?', answer: { A: '1410', B: '1453', C: '1492', D: '1500', correctAnswer: 'A' } },
        { id: 5, title: 'Co to jest prędkość światła w próżni, zaokrąglając do całkowitej liczby?', answer: { A: '300 000 km/h', B: '300 000 km/s', C: '300 000 km/min', D: '300 000 km/ms', correctAnswer: 'B' } },
        { id: 6, title: 'Kto napisał powieść "Zbrodnia i kara"?', answer: { A: 'Fiodor Dostojewski', B: 'Lew Tołstoj', C: 'Antoni Czechow', D: 'Iwan Turgieniew', correctAnswer: 'A' } },
        { id: 7, title: 'Jak nazywa się najprostszy węglowodór?', answer: { A: 'Metan', B: 'Eten', C: 'Propyn', D: 'Butan', correctAnswer: 'A' } },
        { id: 8, title: 'Co oznacza skrót HTML?', answer: { A: 'HyperText Markup Language', B: 'High Tech Modern Language', C: 'Home Tool Markup Language', D: 'Hyperlink and Text Markup Language', correctAnswer: 'A' } },
        { id: 9, title: 'Co oznacza skrót PPK?', answer: { A: 'Polityka Pieniężna Komisji', B: 'Pracownicze Plany Kapitałowe', C: 'Prawo Prywatne Komunalne', D: 'Powszechne Prawo Kapitałowe', correctAnswer: 'B' } },
        { id: 10, title: 'Kto jest autorem teorii psychoanalizy?', answer: { A: 'Carl Gustav Jung', B: 'Sigmund Freud', C: 'Ivan Pavlov', D: 'Jean Piaget', correctAnswer: 'B' } }, 
        { id: 11, title: 'Co oznacza słowo "ubiquitous" po polsku?', answer: { A: 'Nieunikniony', B: 'Wszędobylski', C: 'Pyszny', D: 'Nieszkodliwy', correctAnswer: 'B' } },
        { id: 12, title: 'Kto namalował obraz "Mona Lisa"?', answer: { A: 'Michał Anioł', B: 'Leonardo da Vinci', C: 'Pablo Picasso', D: 'Vincent van Gogh', correctAnswer: 'B' } },
        { id: 13, title: 'Jak nazywa się najdłuższy instrument smyczkowy?', answer: { A: 'Skrzypce', B: 'Kontrabas', C: 'Wiolonczela', D: 'Altówka', correctAnswer: 'B' } },
        { id: 14, title: 'Kto był autorem dzieła "Państwo"?', answer: { A: 'Aryscyda', B: 'Sokrates', C: 'Platon', D: 'Aristoteles', correctAnswer: 'C' } },
        { id: 15, title: 'Ile stopni wynosi suma kątów wewnętrznych trójkąta?', answer: { A: '90', B: '180', C: '270', D: '360', correctAnswer: 'B' } },
        { id: 16, title: 'Które dzieło Williama Szekspira kończy słynne zdanie: "To be, or not to be..."?', answer: { A: 'Hamlet', B: 'Romeo i Julia', C: 'Król Lear', D: 'Sen nocy letniej', correctAnswer: 'A' } },
        { id: 17, title: 'Jak nazywa się komórka odpowiedzialna za przewodzenie impulsów nerwowych?', answer: { A: 'Neuron', B: 'Erytrocyt', C: 'Hepatocyt', D: 'Limfocyt', correctAnswer: 'A' } },
        { id: 18, title: 'Co oznacza skrót pH?', answer: { A: 'Potential of Hydrogen', B: 'Potential of Heat', C: 'Power of Hydrogen', D: 'Power of Heat', correctAnswer: 'A' } },
        { id: 19, title: 'Jaki jest promień koła o pole powierzchni równe 25π?', answer: { A: '5', B: '10', C: '15', D: '20', correctAnswer: 'B' } },
        { id: 20, title: 'Co to jest energia kinetyczna?', answer: { A: 'Energia magazynowana w ładunku elektrycznym', B: 'Energia przechowywana w polu magnetycznym', C: 'Energia związana z ruchem ciał', D: 'Energia zawarta w wiązaniu chemicznym', correctAnswer: 'C' } },
        { id: 21, title: 'Kto był pierwszym prezydentem Stanów Zjednoczonych?', answer: { A: 'Thomas Jefferson', B: 'George Washington', C: 'John Adams', D: 'Abraham Lincoln', correctAnswer: 'B' } },
        { id: 22, title: 'Co to jest algorytm?', answer: { A: 'Program komputerowy', B: 'Sposób rozwiązywania problemu', C: 'Zbiór danych', D: 'Procesor komputerowy', correctAnswer: 'B' } },
        { id: 23, title: 'Co oznacza skrót PKB?', answer: { A: 'Przychód Krajowy Brutto', B: 'Produkt Krajowy Brutto', C: 'Powszechny Kredyt Bankowy', D: 'Powszechny Katalog Budżetowy', correctAnswer: 'B' } },
        { id: 24, title: 'Czym zajmuje się psychologia rozwojowa?', answer: { A: 'Zaburzeniami psychicznymi', B: 'Procesami poznawczymi', C: 'Rozwojem psychicznym człowieka', D: 'Analiza zachowań', correctAnswer: 'C' } },
        { id: 25, title: 'Który pierwiastek chemiczny ma symbol "Fe"?', answer: { A: 'Żelazo', B: 'Sód', C: 'Fluor', D: 'Jod', correctAnswer: 'A' } },
        { id: 26, title: 'W którym roku miała miejsce rewolucja francuska?', answer: { A: '1789', B: '1804', C: '1830', D: '1848', correctAnswer: 'A' } },
        { id: 27, title: 'Jak nazywa się największy kontynent?', answer: { A: 'Afryka', B: 'Azja', C: 'Ameryka Południowa', D: 'Europa', correctAnswer: 'B' } },
        { id: 28, title: 'Ile wynosi 2 do potęgi 5?', answer: { A: '8', B: '16', C: '32', D: '64', correctAnswer: 'C' } },
        { id: 29, title: 'Kto był autorem "Romea i Julii?', answer: { A: 'William Shakespeare', B: 'Christopher Marlowe', C: 'John Milton', D: 'Geoffrey Chaucer', correctAnswer: 'A' } },
        { id: 30, title: 'Która planeta jest znana jako "Planeta Czerwona"?', answer: { A: 'Mars', B: 'Jowisz', C: 'Saturn', D: 'Uran', correctAnswer: 'A' } },
        { id: 31, title: 'Jak nazywa się największy ocean na Ziemi?', answer: { A: 'Ocean Spokojny', B: 'Ocean Atlantycki', C: 'Ocean Indyjski', D: 'Ocean Arktyczny', correctAnswer: 'A' } },
        { id: 32, title: 'Co to jest efekt cieplarniany?', answer: { A: 'Proces naturalny, który utrzymuje stałą temperaturę na Ziemi', B: 'Zjawisko polegające na ociepleniu atmosfery planety', C: 'Metoda ogrzewania szklarni', D: 'Nazwa roślinności w obrębie cieplarni', correctAnswer: 'B' } },
        { id: 33, title: 'Która wojna była najkrótszą wojną znaną w historii?', answer: { A: 'Wojna sześciodniowa', B: 'Wojna o Emu', C: 'Wojna o futbol', D: 'Wojna o grzyby', correctAnswer: 'B' } },
        { id: 34, title: 'Kto jest autorem "Księgi Dżungli"?', answer: { A: 'Mark Twain', B: 'Rudyard Kipling', C: 'Jules Verne', D: 'Arthur Conan Doyle', correctAnswer: 'B' } },
        { id: 35, title: 'Jak nazywa się największa wyspa na świecie?', answer: { A: 'Kuba', B: 'Madagaskar', C: 'Borneo', D: 'Grenlandia', correctAnswer: 'D' } },
        { id: 36, title: 'Co oznacza skrót NASA?', answer: { A: 'National Aeronautics and Space Administration', B: 'North American Space Association', C: 'New Astronomical Studies Agency', D: 'Nuclear Astrophysics and Space Administration', correctAnswer: 'A' } },
        { id: 37, title: 'Która jest najwyższą górą w systemie górskim Himalajów?', answer: { A: 'Mount Everest', B: 'K2', C: 'Kangczenjunga', D: 'Lhotse', correctAnswer: 'A' } },
        { id: 38, title: 'Kto był pierwszym człowiekiem na Księżycu?', answer: { A: 'Neil Armstrong', B: 'Buzz Aldrin', C: 'Yuri Gagarin', D: 'Alan Shepard', correctAnswer: 'A' } },
        { id: 39, title: 'Który kraj jest największym producentem ropy naftowej na świecie?', answer: { A: 'Arabia Saudyjska', B: 'Rosja', C: 'Stany Zjednoczone', D: 'Kanada', correctAnswer: 'A' } },
        { id: 40, title: 'Jak nazywa się najstarsza uniwersytecka biblioteka na świecie?', answer: { A: 'Biblioteka Kongresu', B: 'Biblioteka Watykańska', C: 'Biblioteka Aleksandryjska', D: 'Biblioteka Uniwersytetu w Bologne', correctAnswer: 'D' } },
        { id: 41, title: 'Jak nazywa się największa planeta w Układzie Słonecznym?', answer: { A: 'Ziemia', B: 'Mars', C: 'Jowisz', D: 'Saturn', correctAnswer: 'C' } },
        { id: 42, title: 'Co oznacza skrót DNA?', answer: { A: 'Deoksyrybonukleinowy kwas', B: 'Dwuazotanowy nukleinowy antygen', C: 'Dwuazotanowa nukleaza adenina', D: 'Deoksyrybozylowa nukleotyda adenina', correctAnswer: 'A' } },
        { id: 43, title: 'Który pierwiastek chemiczny ma symbol "Hg"?', answer: { A: 'Miedź', B: 'Srebro', C: 'Rtęć', D: 'Cynk', correctAnswer: 'C' } },
        { id: 44, title: 'Które państwo posiada najdłuższą linię brzegową na świecie?', answer: { A: 'Kanada', B: 'Australia', C: 'Rosja', D: 'Chile', correctAnswer: 'D' } },
        { id: 45, title: 'Kto był autorem "Opowieści z Narnii"?', answer: { A: 'J.R.R. Tolkien', B: 'C.S. Lewis', C: 'Philip Pullman', D: 'J.K. Rowling', correctAnswer: 'B' } },
        { id: 46, title: 'Jak nazywa się największy kontynent pod względem powierzchni?', answer: { A: 'Ameryka Południowa', B: 'Afryka', C: 'Azja', D: 'Europa', correctAnswer: 'C' } },
        { id: 47, title: 'Która jest najwyższą górą w Afryce?', answer: { A: 'Kilimandżaro', B: 'Mount Kenya', C: 'Ruwenzori', D: 'Atlas', correctAnswer: 'A' } },
        { id: 48, title: 'Który pierwiastek chemiczny ma symbol "Na"?', answer: { A: 'Nikl', B: 'Sód', C: 'Neon', D: 'Niob', correctAnswer: 'B' } },
        { id: 49, title: 'Jak nazywa się najdłuższa rzeka na świecie?', answer: { A: 'Nil', B: 'Amazonka', C: 'Missisipi', D: 'Jangcy', correctAnswer: 'A' } },
        { id: 50, title: 'Kto jest autorem "Władcy Pierścieni"?', answer: { A: 'George R.R. Martin', B: 'J.R.R. Tolkien', C: 'C.S. Lewis', D: 'Philip Pullman', correctAnswer: 'B' } },
        { id: 51, title: 'Jak nazywa się największe jezioro na świecie pod względem powierzchni?', answer: { A: 'Morze Kaspijskie', B: 'Jezioro Wiktorii', C: 'Jezioro Ontario', D: 'Jezioro Bałtyckie', correctAnswer: 'A' } },
        { id: 52, title: 'Co to jest efekt Dopplera?', answer: { A: 'Zjawisko rozpraszania fal świetlnych', B: 'Zjawisko zmiany częstotliwości fal dźwiękowych', C: 'Zjawisko oporu aerodynamicznego', D: 'Zjawisko magnetycznego przyciągania', correctAnswer: 'B' } },
        { id: 53, title: 'Który pierwiastek chemiczny ma symbol "Ag"?', answer: { A: 'Srebro', B: 'Złoto', C: 'Miedź', D: 'Aluminium', correctAnswer: 'A' } },
        { id: 54, title: 'Które zwierzę jest największe na Ziemi?', answer: { A: 'Słoń afrykański', B: 'Nieparzystokopytne', C: 'Błękitny wieloryb', D: 'Słoń indyjski', correctAnswer: 'C' } },
        { id: 55, title: 'Co oznacza skrót CEO?', answer: { A: 'Chief Executive Officer', B: 'Central European Organization', C: 'Chief Environmental Officer', D: 'Creative Engineering Organization', correctAnswer: 'A' } },
        { id: 56, title: 'Jak nazywa się największy kraj na świecie pod względem powierzchni?', answer: { A: 'Stany Zjednoczone', B: 'Rosja', C: 'Kanada', D: 'Chiny', correctAnswer: 'B' } },
        { id: 57, title: 'Który metal jest najbardziej reaktywny chemicznie?', answer: { A: 'Złoto', B: 'Miedź', C: 'Potas', D: 'Cyrkon', correctAnswer: 'C' } },
        { id: 58, title: 'Kto był autorem "Małego Księcia"?', answer: { A: 'Antoine de Saint-Exupéry', B: 'Jules Verne', C: 'Victor Hugo', D: 'F. Scott Fitzgerald', correctAnswer: 'A' } },
        { id: 59, title: 'Która planeta ma największą liczbę księżyców?', answer: { A: 'Ziemia', B: 'Mars', C: 'Jowisz', D: 'Saturn', correctAnswer: 'C' } },
        { id: 60, title: 'Kto był autorem "Rusałki"?', answer: { A: 'Stanisław Wyspiański', B: 'Adam Mickiewicz', C: 'Juliusz Słowacki', D: 'Czesław Miłosz', correctAnswer: 'C' } },
        { id: 61, title: 'Jak nazywa się największy stadion sportowy na świecie?', answer: { A: 'Camp Nou', B: 'Estadio Azteca', C: 'Rungrado May Day Stadium', D: 'Wembley Stadium', correctAnswer: 'C' } },
        { id: 62, title: 'Które państwo posiada najmniejszą populację na świecie?', answer: { A: 'Monako', B: 'Nauru', C: 'San Marino', D: 'Watikan', correctAnswer: 'D' } },
        { id: 63, title: 'Co oznacza skrót LGBT?', answer: { A: 'Leśne Gady Bielska Tatrzańska', B: 'Ludzie Głodni Bogactw Tomaszowa', C: 'Lesbian, Gay, Bisexual, Transgender', D: 'Listonosz Gwiazd Bajtuszek', correctAnswer: 'C' } },
        { id: 64, title: 'Kto jest autorem "Pana Tadeusza"?', answer: { A: 'Adam Mickiewicz', B: 'Juliusz Słowacki', C: 'Cyprian Kamil Norwid', D: 'Zygmunt Krasiński', correctAnswer: 'A' } },
        { id: 65, title: 'Która jest najwyższą górą w Europie?', answer: { A: 'Mount Blanc', B: 'Monte Rosa', C: 'Elbrus', D: 'Matterhorn', correctAnswer: 'C' } },
        { id: 66, title: 'Jak nazywa się najstarsza znana cywilizacja?', answer: { A: 'Cywilizacja Mezopotamska', B: 'Cywilizacja Egipska', C: 'Cywilizacja Chińska', D: 'Cywilizacja Induska', correctAnswer: 'D' } },
        { id: 67, title: 'Które zwierzę ma najdłuższy okres życia?', answer: { A: 'Żółw Galapagoski', B: 'Wieloryb Grzbietowy', C: 'Ryba Upiór', D: 'Węgorz Europejski', correctAnswer: 'A' } },
        { id: 68, title: 'Co to jest teoria względności?', answer: { A: 'Teoria dotycząca grawitacji', B: 'Teoria dotycząca energii', C: 'Teoria dotycząca czasu i przestrzeni', D: 'Teoria dotycząca elektroniki', correctAnswer: 'C' } },
        { id: 69, title: 'Który pierwiastek chemiczny ma symbol "K"?', answer: { A: 'Krypton', B: 'Kobalt', C: 'Kadm', D: 'Potas', correctAnswer: 'D' } },
        { id: 70, title: 'Jak nazywa się najstarsza dzielnica Paryża?', answer: { A: 'Montmartre', B: 'Le Marais', C: 'Quartier Latin', D: 'Le Sentier', correctAnswer: 'C' } },
        { id: 71, title: 'Kto był autorem "Dziadów"?', answer: { A: 'Adam Mickiewicz', B: 'Juliusz Słowacki', C: 'Cyprian Kamil Norwid', D: 'Zygmunt Krasiński', correctAnswer: 'A' } },
        { id: 72, title: 'Jak nazywa się największe jezioro w Polsce?', answer: { A: 'Jezioro Mamry', B: 'Jezioro Śniardwy', C: 'Jezioro Łebsko', D: 'Jezioro Ślesińskie', correctAnswer: 'A' } },
        { id: 73, title: 'Który kraj jest największym producentem kawy na świecie?', answer: { A: 'Kolumbia', B: 'Brazylia', C: 'Indie', D: 'Etiopia', correctAnswer: 'B' } },
        { id: 74, title: 'Co oznacza skrót UNESCO?', answer: { A: 'United Nations Education, Scientific, and Cultural Organization', B: 'Universal Network for Cooperation and Education Services Online', C: 'United Nations Emergency Scientific and Cultural Organization', D: 'Union of National Entities for Scientific and Cultural Organization', correctAnswer: 'A' } },
        { id: 75, title: 'Kto był autorem "Zbrodni i Kara"?', answer: { A: 'Fiodor Dostojewski', B: 'Lew Tołstoj', C: 'Antoni Czechow', D: 'Iwan Turgieniew', correctAnswer: 'A' } },
        { id: 76, title: 'Który pierwiastek chemiczny ma symbol "O"?', answer: { A: 'Tlen', B: 'Azot', C: 'Wodór', D: 'Ołów', correctAnswer: 'A' } },
        { id: 77, title: 'Jak nazywa się najdłuższa rzeka w Polsce?', answer: { A: 'Wisła', B: 'Odra', C: 'Warta', D: 'Bug', correctAnswer: 'A' } },
        { id: 78, title: 'Który jest najstarszym zamieszkanym miastem na świecie?', answer: { A: 'Ateny', B: 'Rzym', C: 'Jerozolima', D: 'Damaszek', correctAnswer: 'C' } },
        { id: 79, title: 'Kto był autorem "Pan Wołodyjowski"?', answer: { A: 'Henryk Sienkiewicz', B: 'Stefan Żeromski', C: 'Eliza Orzeszkowa', D: 'Bolesław Prus', correctAnswer: 'A' } },
        { id: 80, title: 'Który kraj jest największym producentem diamentów na świecie?', answer: { A: 'Indie', B: 'Kanada', C: 'Rosja', D: 'Południowa Afryka', correctAnswer: 'D' } },
        { id: 81, title: 'Co oznacza skrót CPU?', answer: { A: 'Computer Processing Unit', B: 'Central Programming Unit', C: 'Cybernetic Program Unit', D: 'Central Processing Utility', correctAnswer: 'A' } },
        { id: 82, title: 'Jak nazywa się największa wyspa na Morzu Śródziemnym?', answer: { A: 'Sycylia', B: 'Kreta', C: 'Cypr', D: 'Sardynia', correctAnswer: 'A' } },
        { id: 83, title: 'Która jest najdłuższą autostradą na świecie?', answer: { A: 'Autostrada A1 w Polsce', B: 'Autostrada A1 w Chinach', C: 'Autostrada A2 w USA', D: 'Autostrada A7 w Niemczech', correctAnswer: 'B' } },
        { id: 84, title: 'Co oznacza skrót DVD?', answer: { A: 'Digital Video Disc', B: 'Dynamic Video Data', C: 'Direct Visual Device', D: 'Digital Versatile Disc', correctAnswer: 'D' } },
        { id: 85, title: 'Która jest największa wyspą w Europie?', answer: { A: 'Wielka Brytania', B: 'Irlandia', C: 'Sycylia', D: 'Islandia', correctAnswer: 'D' } },
        { id: 86, title: 'Ile miesięcy ma 28 dni?', answer: { A: 'jeden', B: 'dwa', C: 'wszystkie', D: 'zaden', correctAnswer: 'C' } },
        { id: 87, title: 'Jeśli w misce są trzy truskawki i zabierzesz dwie, to ile masz truskawek?', answer: { A: 'jedna', B: 'dwie', C: 'piec', D: 'nie mam', correctAnswer: 'B' } },
        { id: 88, title: 'Jakie zwierzę, jeśli jeździ na nim kaczka, jest najgłośniejsze?', answer: { A: 'kon', B: 'pies', C: 'kaczka', D: 'osiol', correctAnswer: 'C' } },
        { id: 89, title: 'Ojciec Kasi ma pięć córek: 1. Basia, 2. Jasia, 3. Dusia, 4. Tosia. Jak ma na imię piąta córka?', answer: { A: 'Kasia', B: 'Ania', C: 'Jusia', D: 'Ola', correctAnswer: 'A' } },
        { id: 90, title: 'Ile jabłek możesz zjeść, gdy masz pusty żołądek?', answer: { A: 'kilogram', B: 'tylko jedno', C: 'tyle, ile dasz rade zjesc', D: 'zadnego', correctAnswer: 'B' } },
        { id: 91, title: 'Jaki kształt ma okrągły kwadrat?', answer: { A: 'kształt kwadratu', B: 'kształt koła', C: 'nie istnieje', D: 'kształt trójkąta', correctAnswer: 'C' } },
        { id: 92, title: '6 + 8 to jest 13 czy równa się 13?', answer: { A: 'rowna sie 13', B: 'to jest 13', C: 'to jest mniej', D: 'zadna z odpowiedzi nie jest prawidlowa', correctAnswer: 'D' } },
        { id: 93, title: 'Co znaczy slowo "rachityczny"?', answer: { A: 'Powierzchowny', B: 'Nietaktowny', C: 'Lichy', D: 'Zly', correctAnswer: 'C' } },
        { id: 94, title: 'Jaki jest wynik? 8+8/8+8*8-8', answer: { A: '64', B: '65', C: '72', D: '80', correctAnswer: 'B' } },
        { id: 95, title: 'Dlaczego chlorofil jest zielony?', answer: { A: 'Ze względu na zawartość żelaza.', B: 'Ze względu na zawartość magnezu.', C: 'Ze względu na zawartość wapnia.', D: 'Ze względu na zawartość cynku.', correctAnswer: 'B' } },
        { id: 96, title: 'Jakie zwierzę jest największe na Ziemi?', answer: { A: 'Słoń afrykański.', B: 'Rekin wielorybi.', C: 'Błękitny wieloryb.', D: 'Żyrafa.', correctAnswer: 'C' } },
        { id: 97, title: 'Co powoduje zmianę koloru liści na jesień?', answer: { A: 'Zmniejszenie ilości wody w glebie.', B: 'Zmniejszenie ilości promieniowania słonecznego.', C: 'Zmniejszenie produkcji chlorofilu.', D: 'Zwiększenie stężenia dwutlenku węgla w powietrzu.', correctAnswer: 'C' } },
        { id: 98, title: 'Jakie jest największe organy ludzkiego ciała?', answer: { A: 'Mózg.', B: 'Skóra.', C: 'Wątroba.', D: 'Płuca.', correctAnswer: 'B' } },
        { id: 99, title: 'Co to jest fotosynteza?', answer: { A: 'Proces wytwarzania glukozy z węgla i tlenu.', B: 'Proces wytwarzania tlenu z dwutlenku węgla i wody przy użyciu energii słonecznej.', C: 'Proces wytwarzania białek w komórkach roślinnych.', D: 'Proces oddychania komórkowego w roślinach.', correctAnswer: 'B' } },
        { id: 100, title: 'Dlaczego niektóre rośliny są mięsożerne?', answer: { A: 'Ze względu na brak dostępu do wody.', B: 'Ze względu na ubóstwo w składniki mineralne.', C: 'Ze względu na ubóstwo w węglowodany.', D: 'Ze względu na ubóstwo w azot.', correctAnswer: 'D' } }
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(chosenQuestion.FIRST);
    const [guiVisible, setGuiVisible] = useState<boolean>(false);
    const [hasGiveUp, setHasGiveUp] = useState<boolean>(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleQuestionClick = (): void => console.log('Question ID: ' + currentQuestion.id + '. ' + currentQuestion.title);
    const youWon = (): void => alert(`Gratulacje! Wygrałeś 1 000 000zł!!`);
    const handleOpenMenu = (): void => setGuiVisible(!guiVisible);
    const refreshPage = (): void => window.location.reload();

    const giveUp = (m: number): void => {
        const isGivingUp: string | undefined = prompt(`Czy na pewno chcesz się poddać? (${giveUpWord}/nie)`)?.toLowerCase();

        if (isGivingUp === giveUpWord) {
            setTimeout(() => {
                alert(`Poprawna odpowiedz: ${currentQuestion.answer.correctAnswer}. Dziękujemy za grę! Wygrywasz ${m}zł.`);
                refreshPage();
            }, giveUpAnnouncementDelay);
        } else {
            setHasGiveUp(false);
        }
    };

    const showSumOfMoney = (m: number): void => {
        alert(`Niestety niepoprawna odpowiedz! Wygrałeś ${m}zł.`);
        refreshPage();
    };
    
    function isAnswerCorrect(ans: string): void {
        const invalidAnswerSound = document.getElementById('invalid_answer_sound') as HTMLMediaElement;
        const correctAnswerSound = document.getElementById('correct_answer_sound') as HTMLMediaElement;
        const waitingOnAnswerSound = document.getElementById('waiting_for_answer_sound') as HTMLMediaElement;

        if (currentQuestionIndex === chosenQuestion.FIRST) {              
            hasGiveUp && giveUp(0);
            if (ans === questions[chosenQuestion.FIRST].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIRST].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIRST].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(1), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIRST].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIRST].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(0), nextQuestionDelayBadAnswer);
            }
        } 
        else if (currentQuestionIndex === chosenQuestion.SECOND) {              
            hasGiveUp && giveUp(500);
            if (ans === questions[chosenQuestion.SECOND].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SECOND].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SECOND].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(2), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SECOND].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SECOND].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(0), nextQuestionDelayBadAnswer);
            }
        } 
        else if (currentQuestionIndex === chosenQuestion.THIRD) {              
            hasGiveUp && giveUp(1000);
            if (ans === questions[chosenQuestion.THIRD].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.THIRD].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.THIRD].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(3), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.THIRD].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.THIRD].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.FOURTH) {              
            hasGiveUp && giveUp(2000);
            if (ans === questions[chosenQuestion.FOURTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FOURTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FOURTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(4), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FOURTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FOURTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.FIFTH) {              
            hasGiveUp && giveUp(5000);
            if (ans === questions[chosenQuestion.FIFTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIFTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIFTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(5), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIFTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.FIFTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.SIXTH) {              
            hasGiveUp && giveUp(10000);
            if (ans === questions[chosenQuestion.SIXTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SIXTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SIXTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(6), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SIXTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SIXTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.SEVENTH) {              
            hasGiveUp && giveUp(20000);
            if (ans === questions[chosenQuestion.SEVENTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SEVENTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SEVENTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(7), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SEVENTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.SEVENTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(1000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.EIGHTH) {              
            hasGiveUp && giveUp(40000);
            if (ans === questions[chosenQuestion.EIGHTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.EIGHTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.EIGHTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(8), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.EIGHTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.EIGHTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.NINTH) {              
            hasGiveUp && giveUp(75000);
            if (ans === questions[chosenQuestion.NINTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.NINTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.NINTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(9), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.NINTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.NINTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.TENTH) {  
            hasGiveUp && giveUp(125000);
            if (ans === questions[chosenQuestion.TENTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TENTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TENTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(10), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TENTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TENTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.ELEVENTH) {  
            hasGiveUp && giveUp(250000);
            if (ans === questions[chosenQuestion.ELEVENTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.ELEVENTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.ELEVENTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                setTimeout(() => setCurrentQuestionIndex(11), nextQuestionDelay);
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.ELEVENTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.ELEVENTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
        else if (currentQuestionIndex === chosenQuestion.TWELFTH) {  
            hasGiveUp && giveUp(500000);
            if (ans === questions[chosenQuestion.TWELFTH].answer.correctAnswer && !hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TWELFTH].answer.correctAnswer)?.classList.add('highlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TWELFTH].answer.correctAnswer)?.classList.remove('highlight'), removeHighlightDelay);
                setTimeout(() => correctAnswerSound.play(), correctAnswerDelay);
                youWon();
            } else if (!hasGiveUp) {
                setTimeout(() => waitingOnAnswerSound.play(), waitingOnAnswerSoundDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TWELFTH].answer.correctAnswer)?.classList.add('badHighlight'), highlightDelay);
                setTimeout(() => document.getElementById(questions[chosenQuestion.TWELFTH].answer.correctAnswer)?.classList.remove('badHighlight'), removeHighlightDelay);
                setTimeout(() => invalidAnswerSound.play(), invalidAnswerDelay);
                setTimeout(() => showSumOfMoney(40000), nextQuestionDelayBadAnswer);
            }
        }
    }
    window.addEventListener('keydown', (e) => e.key === openRightMenuKey && handleOpenMenu());

    return(
        <>
        <header>
            <audio id="invalid_answer_sound" src={NiepoprawnaOdpowiedzMP4} />
            <audio id="correct_answer_sound" src={PoprawnaOdpowiedzMP4} />
            <audio id="waiting_for_answer_sound" src={OczekiwanieNaOdpowiedzMP4} />

            <img draggable={false} id="open-menu-btn" onClick={handleOpenMenu} width={menuIcon.width} height={menuIcon.height} src={MenuImage} alt={MenuImage} />
                            {guiVisible && 
                                <section id="right-gui">
                                    <div id="div-kola-ratunkowe">
                                        <img draggable={false} className="kola-ratunkowe" width={lifelines.size.width} height={lifelines.size.height} src={PublicznoscPNG} alt={PublicznoscPNG} />
                                        <img draggable={false} className="kola-ratunkowe" width={lifelines.size.width} height={lifelines.size.height} src={PolNaPolPNG} alt={PolNaPolPNG} />
                                        <img draggable={false} className="kola-ratunkowe" width={lifelines.size.width} height={lifelines.size.height} src={TelefonDoPrzyjacielaPNG} alt={TelefonDoPrzyjacielaPNG} />
                                        <img draggable={false} className="kola-ratunkowe" width={lifelines.size.width} height={lifelines.size.height} src={ZamianaPytaniaPNG} alt={ZamianaPytaniaPNG} />
                                    </div>
                                    <div id="money-display">
                                        <div className="special-label" id="1000000zl"><span className="question-number">12</span> &nbsp; 1 MILION zł</div>
                                        <div className="normal-label" id="500000zl"><span className="question-number">11</span> &nbsp; 500 000zł</div>
                                        <div className="normal-label" id="250000zl"><span className="question-number">10</span> &nbsp; 250 000zł</div>
                                        <div className="normal-label" id="125000zl"><span className="question-number">9</span> &nbsp; 125 000zł</div>
                                        <div className="normal-label" id="75000zl"><span className="question-number">8</span> &nbsp; 75 000zł</div>
                                        <div className="special-label" id="40000zl"><span className="question-number">7</span> &nbsp; 40 000zł</div>
                                        <div className="normal-label" id="20000zl"><span className="question-number">6</span> &nbsp; 20 000zł</div>
                                        <div className="normal-label" id="10000zl"><span className="question-number">5</span> &nbsp; 10 000zł</div>
                                        <div className="normal-label" id="5000zl"><span className="question-number">4</span> &nbsp; 5000zł</div>
                                        <div className="normal-label" id="2000zl"><span className="question-number">3</span> &nbsp; 2000zł</div>
                                        <div className="special-label" id="1000zl"><span className="question-number">2</span> &nbsp; 1000zł</div>
                                        <div className="normal-label" id="500zl"><span className="question-number">1</span> &nbsp; 500zł</div>
                                    </div>
                                    <div>
                                        <hr id="break" />
                                        <button id="give-up-btn" onClick={() => setHasGiveUp(true)}>
                                        <img draggable={false} id="give-up-btn-image" width={menuIcon.width} height={menuIcon.height} src={GiveUpButtonPNG} alt={GiveUpButtonPNG} />
                                            </button> 
                                        <hr />       
                                    </div>
                                </section>
                            }
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