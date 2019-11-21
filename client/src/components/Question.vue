<template>
  <div>
    <div class="d-flex" v-for="question in $store.state.questions" :key="question._id">
      <div class="d-flex flex-column justify-content-center mx-2">
        <div>{{question.upvotes.length - question.downvotes.length}}</div>
        <div>votes</div>
        <div>{{question.answers.length}}</div>
        <div>answers</div>
      </div>
      <div class="card text-left mt-0 mb-2" style="width: 45rem;">
        <div class="card-body">
          <h4 class="card-title">
            <a href="#" @click.prevent="questionDetail(question._id)">{{question.title}}</a>
          </h4>
          <h6 class="card-subtitle mb-2 text-muted">asked by {{question.UserId.email}}</h6>
          <p class="card-text">{{question.desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  methods: {
    questionDetail (id) {
      this.$router.push(`/questions/${id}`)
    }
  }
}
</script>

<style scoped>
</style>
