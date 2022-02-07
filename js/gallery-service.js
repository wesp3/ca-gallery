'use strict'

var gProjs = [
    {
        id: "Minesweeper",
        name: "Minesweeper",
        title: "Minesweeper",
        desc: "An attempt to make an own clone of the classic game",
        img: "minesweeper.jpg",
        url:"https://wesp3.github.io/Minesweeper/",
        publishedAt: "January 2022",
        labels: ["Matrixes ", "Recoursion " , "Games " ]
    },
    {
        id:"book-shop",
        name: "Book-Shop-Page",
        title: "Book-Shop-Page",
        desc: "A project which shows a single page of books in a basket with an option to rate the book, to read a short description on the book, delete it from the list and update the price",
        img:"bookshop.jpg",
        url: "https://wesp3.github.io/book-shop/",
        publishedAt: "February 2022",
        labels: ["Tables " , "HTML ", "CSS " , "JS "]
    },

    {
        id: "PacmanV1",
        name: "Pacman",
        title: "Pacman",
        desc: "A simple pacman-like clone",
        img: "pacman.jpg",
        url:"proj/Pacmanv1",
        publishedAt: "January 2022",
        labels: ["Matrixes " , "Games "]
    },

    {
        id: "proj-todo",
        name: "To-Do-Page",
        title: "To-Do-Page",
        desc: "A daily task adder and remover",
        img: "todo.jpg",
        url: "https://wesp3.github.io/to-do/",
        publishedAt: "February 2022",
        labels: ["HTML ", "CSS " , "JS "]
    },
]

function getProjById(id) {
    return gProjs.find(function (proj) {
        return proj.id === id;
    })
}


