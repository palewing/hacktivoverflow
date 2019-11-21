import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axiosHelper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      email: '',
      password: ''
    },
    questions: [],
    newQuestion: {
      title: '',
      desc: ''
    },
    answer: ''
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    // juga bisa dipake sebelum sign up / register
    BEFORE_LOGIN (state, payload) {
      state.user.email = payload.email
      state.user.password = payload.password
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    // bisa juga dipake buat edit question
    SET_NEW_QUESTION (state, payload) {
      state.newQuestion.title = payload.title
      state.newQuestion.desc = payload.desc
    },
    // bisa juga dipake buat edit answer
    SET_ANSWER (state, payload) {
      state.answer = payload
    },
    SORT_QUESTION_CREATED (state, payload) {
      state.questions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    SORT_QUESTION_VOTE (state, payload) {
      state.questions.sort((a, b) => b.upvotes.length - a.upvotes.length)
    },
    SORT_QUESTION_ANSWER (state, payload) {
      state.questions.sort((a, b) => b.answers.length - a.answers.length)
    }
  },
  actions: {
    login ({ commit, state }) {
      return axios({
        method: 'POST',
        url: '/login',
        data: {
          email: state.user.email,
          password: state.user.password
        }
      })
    },
    register ({ commit, state }) {
      return axios({
        method: 'POST',
        url: '/register',
        data: {
          email: state.user.email,
          password: state.user.password
        }
      })
    },
    fetchQuestions ({ commit, state }) {
      axios({
        method: 'GET',
        url: `/questions`
      })
        .then(({ data }) => {
          // data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          commit('SET_QUESTIONS', data)
          commit('SORT_QUESTION_CREATED')
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    fetchOneQuestion ({ commit, state }, payload) {
      return axios({
        method: 'GET',
        url: `/questions/${payload}`
      })
    },
    addQuestion ({ commit, state }) {
      return axios({
        method: 'POST',
        url: '/questions',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: state.newQuestion.title,
          desc: state.newQuestion.desc
        }
      })
    },
    upVoteQ ({ commit, state }, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/${payload}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    downVoteQ ({ commit, state }, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/${payload}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addAnswer ({ commit, state }, payload) {
      return axios({
        method: 'POST',
        url: `/answers/${payload}`,
        data: {
          desc: state.answer
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    upVoteA ({ commit, state }, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/${payload}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    downVoteA ({ commit, state }, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/${payload}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteQuestion ({ commit, state }, payload) {
      return axios({
        method: 'DELETE',
        url: `/questions/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    editQuestion ({ commit, state }, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: state.newQuestion.title,
          desc: state.newQuestion.desc
        }
      })
    },
    editAnswer ({ commit, state }, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          desc: state.answer
        }
      })
    },
    deleteAnswer ({ commit, state }, payload) {
      return axios({
        method: 'DELETE',
        url: `/answers/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
