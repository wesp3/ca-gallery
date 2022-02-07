'use strict'


// document.querySelectorAll('.date').forEach(node => {
//     node.textContent = toDate(node.textContent)
// })

function onInit() {
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    if (confirm("Are you sure?")) { // if confirm == true run code
        ev.stopPropagation()
        console.log('Removing Todo', todoId);

        removeTodo(todoId)
        renderTodos()
    }
}

function renderTodos() {
    var todos = getTodosForDisplay()
    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()

    if (todos.length > 0) {
      
        var strHTMLs = todos.map(todo =>
            `<li class="${(todo.isDone) ? 'done' : ''} task" onclick="onToggleTodo('${todo.id}')">
            <p>${todo.txt} </p> <p>${todo.importance}</p> <p class="date">${toDate(todo.createdAt)}</p>
                <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            </li>`)

        document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    }
    else {
        // var msg = todosMsg() //this function has to return a msg by checking the gFilterBy variable (already no length for gTodos)
        switch (gFilterBy) {
            case "ALL":
                document.querySelector('.todo-list').innerHTML = "<p>No todos</p>"
                break
            case "DONE":
                document.querySelector('.todo-list').innerHTML = "<p>No dones</p>"
                break
            case "ACTIVE":
                document.querySelector('.todo-list').innerHTML = "<p>No active</p>"
                break

        }
    }
}


function onToggleTodo(todoId) {
    console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}

function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]');
    const txt = elTxt.value

    const elNum = document.querySelector('input[name=importanceNumber]');
    const importance = elNum.value

    addTodo(txt, importance)

    elTxt.value = ''
    elNum.value=''
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);

    setFilter(filterBy)
    renderTodos()

}

function onSetSort(sortBy) {
    console.log('Sorting By:', sortBy);

    setSort(sortBy)
    renderTodos()

}