<template>
  <div class="home">
    <div class="d-flex flex-column align-items-center">
      <div></div>
      <div>
        <div class="d-flex justify-content-end">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link disabled" @click.prevent="" href="">Sort By:</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" @click.prevent="sortCreated" href="#">Created</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="sortVote" href="#">Votes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="sortAnswer" href="#">Answer</a>
            </li>
          </ul>
        </div>
        <QuestionList />
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList'

export default {
  name: 'home',
  components: {
    QuestionList
  },
  methods: {
    sortCreated () {
      this.$store.commit('SORT_QUESTION_CREATED')
    },
    sortVote () {
      this.$store.commit('SORT_QUESTION_VOTE')
    },
    sortAnswer () {
      this.$store.commit('SORT_QUESTION_ANSWER')
    }
  },
  created () {
    this.$store.dispatch('fetchQuestions')
  }
}
</script>
