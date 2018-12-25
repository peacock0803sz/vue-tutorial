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
      todos: [],
      options: [
        {value: -1, label:'All'},
        {value: 0, label:'WIP'},
        {value: 1, label:'Done'}
      ],
      current: -1
    },

    computed: {
      computedTodos: function () {
        return this.todos.filter(function (el) {
          // this.currentが負ならtrueを返す...?
          // return this.current < 0 ? true : this.current === el.state
          return this.current < 0 || this.current === el.state
        }, this)
      },

    watch: {
      todos: {
        handler: todos => todoStorage.save(todos),
        deep: true
      }
    },

    created() {
      this.todos = todoStorage.fetch()
    },
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
    },

    doChangeState: item => item.state = item.state ? 0 : 1,

    doRemove: function (item) {
      const index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  }
})