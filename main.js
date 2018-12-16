var STORAGE_KEY = 'todos-vue.js-demo'
var todoStorage = {
  fetch: ()=>{
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach((todo, index)=>{
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: todos => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todos: []
  },
  methods: {
    // todo追加の処理
    doAdd: (event, value)=>{
      // refで名前をつけておいた要素を参照する
      var comment = this.$refs.comment
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
    }
  }
})