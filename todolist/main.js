const STORAGE_KEY = 'todos-vuejs-demo'
const todoStorage = {
  fetch: () => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: todos => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

const app = new Vue({
    el:'#app',
    
    data: {
      todos: []
    },

    watch: {
      todos: {
        handler: todos => todoStorage.save(todos),
        deep: true
      }
    },

    methods: {
      doAdd: function(event, value) {
        const comment = this.$refs.comment
        if (!comment.value.length) {return}
      // {{ new ID, Comment, State }}
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      //init
      comment.value = ''
    }
  }
})