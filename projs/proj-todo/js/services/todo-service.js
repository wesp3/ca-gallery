"use strict";

const STORAGE_KEY = "todosDB";
var gTodos;
var gFilterBy = "ALL";
var gSortBy = "CREATED";
_createTodos();

function getTodosForDisplay() {
    sortTodos()
    
  if (gFilterBy === "ALL") return gTodos;

  return gTodos.filter(
    (todo) =>
      (todo.isDone && gFilterBy === "DONE") ||
      (!todo.isDone && gFilterBy === "ACTIVE")
  );
}

function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId);
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function addTodo(txt, importance) {
  if (txt.length > 0 && importance) {
    //Not empty string
    if (importance > 3 || importance < 1) {
      //check if the importance between 1-3
      alert(`the importance must to be betweeen 1-3`);
    } else {
      const todo = _createTodo(txt, importance);
      gTodos.unshift(todo);
      _saveTodosToStorage();
    }
  } else {
    alert(`Please give data!`);
  }
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  const activeTodos = gTodos.filter((todo) => !todo.isDone);
  return activeTodos.length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function _createTodos() {
  gTodos = loadFromStorage(STORAGE_KEY);
  if (!gTodos || !gTodos.length) {
    gTodos = [
      _createTodo("Learn HTML", 3),
      _createTodo("Study CSS", 2),
      _createTodo("Master Javascript", 1),
    ];
    _saveTodosToStorage();
  }
}

function _createTodo(txt, importance) {
  const todo = {
    id: _makeId(),
    txt: txt,
    isDone: false,
    importance: importance,
    createdAt: Date.now(),
  };
  return todo;
}

//objs.sort( compare );


function _saveTodosToStorage() {
  saveToStorage(STORAGE_KEY, gTodos);
}

function sortTodos() {
  switch (gSortBy) {
    case "TEXT":
      return gTodos.sort(_compareByTxt);
    case "CREATED":
      return gTodos.sort(_compareByCreated);
    case "IMPORTANCE":
      return gTodos.sort(_compareByImportance);
  }
}

//TODO: NOt an elegant solution. All 3 functions are pretty much the same
function _compareByTxt(firstToDo, secToDo) {
    var firstTxt = firstToDo.txt.toLowerCase();
    var secTxt = secToDo.txt.toLowerCase();
  
    if (firstTxt < secTxt) {
      return -1;
    } else if (firstTxt > secTxt) {
      return 1;
    }
    return 0;
  }
  
  function _compareByCreated(firstToDo, secToDo) {
    if (firstToDo.createdAt < secToDo.createdAt) {
      return -1;
    } else if (firstToDo.createdAt > secToDo.createdAt) {
      return 1;
    }
    return 0;
  }
  
  function _compareByImportance(firstToDo, secToDo) {
    if (firstToDo.importance < secToDo.importance) {
      return -1;
    } else if (firstToDo.importance > secToDo.importance) {
      return 1;
    }
    return 0;
  }
  