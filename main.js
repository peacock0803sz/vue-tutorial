// https://jp.vuejs.org/v2/examples/todomvc.html
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
  el: '#app',
  data: {
    todos: [],
    options: [
      { value:-1, label: 'All' },
      { value:0, label: 'In progress' },
      { value:1, label: 'Done' }
    ]
  },

  watch: {
    todos: {
      handler: todos => todoStorage.sava(todos) ,
      deep: true
    }
  },

  created() {
    // auto fetch
    this.todos = todoStorage.fetch()
  },

  methods: {
    // todo追加の処理
    doAdd: function(event, value) {
      // refで名前をつけておいた要素を参照する
      const comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      // { new ID, comments, states(dafaut=0) }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      // init form
      comment.value = ''
    },

  doChangeState: itme => itme.state = itme.state ? 0 : 1 ,

  doRemove: function (itme) {
    const index = this.todos.indexOf(itme)
    this.todos.splice(index, 1)
    }

  }
})