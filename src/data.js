export const FACTS_DATA = [
    { text: 'В Царскосельском лицее Пушкин показывал успехи только в русском, французском и фехтовании.', image: 'images/lyceum.jpg' },
    { text: 'Он стеснялся своего небольшого роста, так как его жена Наталья Гончарова была выше его.', image: 'images/goncharova.jpg' },
    { text: 'Именно Пушкин подсказал Гоголю сюжеты произведений «Мертвые души» и «Ревизор».', image: 'images/gogol.jpg' },
    { text: 'Роковой для поэта стала дуэль с Жоржем Дантесом, хотя за свою жизнь он участвовал более чем в 20 дуэлях.', image: 'images/duel.jpg' },
    { text: 'В детстве Пушкин едва не погиб под копытами коня императора Александра I.', image: 'images/alexander.jpg' }
];

export const QUIZ_DATA = [
    {
        question: 'На какой картине изображена сцена дуэли?',
        answers: [
            { image: 'images/duel.jpg', correct: true },
            { image: 'images/lyceum.jpg', correct: false },
            { image: 'images/gogol.jpg', correct: false }
        ]
    },
    {
        question: 'Какой из этих портретов НЕ принадлежит Пушкину?',
        answers: [
            { image: 'images/pushkin_portrait.jpg', correct: false },
            { image: 'images/goncharova.jpg', correct: true },
            { image: 'images/alexander.jpg', correct: false }
        ]
    },
    {
        question: 'Какое изображение ассоциируется с литературным творчеством в целом?',
        answers: [
            { image: 'images/quill_and_ink.jpg', correct: true },
            { image: 'images/alexander.jpg', correct: false },
            { image: 'images/lyceum.jpg', correct: false }
        ]
    },
    {
        question: 'Где Пушкин получил свое образование?',
        answers: [
            { image: 'images/lyceum.jpg', correct: true },
            { image: 'images/old_books.jpg', correct: false },
            { image: 'images/duel.jpg', correct: false }
        ]
    }
];
