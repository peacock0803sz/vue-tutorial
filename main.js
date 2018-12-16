// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
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
    doAdd: function(event, value) {
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