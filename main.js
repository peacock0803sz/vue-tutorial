var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.foreach(function(todo, index) {
            todo.id = inde
        })
    todoStorage.uid = todos.length
    return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = new Vue({
    el: '#app',
    deta: {
      todos: []
    },
    methods: {

    }
})