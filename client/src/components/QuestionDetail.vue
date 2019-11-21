<template>
  <div>
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex align-items-center">
        <div class="d-flex flex-column align-items-center justify-content-center mr-3">
          <div>
            <a href @click.prevent="onUpvote">
              <i class="material-icons" style="font-size:50px">keyboard_arrow_up</i>
            </a>
          </div>
          <div>{{question.upvotes.length - question.downvotes.length}}</div>
          <div>
            <a href @click.prevent="onDownvote">
              <i class="material-icons" style="font-size:50px">keyboard_arrow_down</i>
            </a>
          </div>
        </div>
        <div class="card text-left m-0" style="width: 50rem;">
          <div class="card-body">
            <h2 class="title mt-0 text-left">{{question.title}}</h2>
            <h6 class="card-subtitle mb-2 text-muted">asked by {{question.UserId.email}}</h6>
            <p class="card-text">{{question.desc}}</p>
            <div class="d-flex">
              <a href @click.prevent="deleteQuestion">
                <i class="material-icons mr-3" style="font-size:24px">delete</i>
              </a>
              <a href data-toggle="modal" data-target="#editQuestionModal">
                <i class="material-icons" style="font-size:24px">edit</i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- FORM NEW ANSWER -->
      <div class="d-flex align-items-center mt-3">
        <div class="d-flex flex-column align-items-center justify-content-center mr-3">
          <div>
            <a href="#">
              <i class="material-icons" style="font-size:50px">question_answer</i>
            </a>
          </div>
        </div>
        <div class="card text-left m-0" style="width: 50rem;">
          <form @submit.prevent="addAnswer" class="form" method action>
            <div class="card-body">
              <div class="form-group bmd-form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="material-icons">subtitles</i>
                    </div>
                  </div>
                  <textarea
                    v-model="answer"
                    class="form-control"
                    rows="5"
                    placeholder="Your answer..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="submit" class="btn btn-primary btn-lg">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <!-- ANSWERS -->
      <div class="d-flex align-items-center" v-for="answer in question.answers" :key="answer._id">
        <div class="d-flex flex-column align-items-center justify-content-center mr-3">
          <div>
            <a href @click.prevent="onUpvoteA(answer._id)">
              <i class="material-icons" style="font-size:50px">keyboard_arrow_up</i>
            </a>
          </div>
          <div>{{answer.upvotes.length - answer.downvotes.length}}</div>
          <div>
            <a href @click.prevent="onDownvoteA(answer._id)">
              <i class="material-icons" style="font-size:50px">keyboard_arrow_down</i>
            </a>
          </div>
        </div>
        <div class="card text-left m-0" style="width: 50rem;">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">{{answer.UserId.email}}</h6>
            <p class="card-text">{{answer.desc}}</p>
            <div class="d-flex">
              <a href @click.prevent="deleteAnswer(answer._id)">
                <i class="material-icons mr-3" style="font-size:24px">delete</i>
              </a>
              <a
                href
                @click.prevent="answerDesc = answer.desc; answerId = answer._id"
                data-toggle="modal"
                data-target="#editAnswerModal"
              >
                <i class="material-icons" style="font-size:24px">edit</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- EDIT QUESTION MODAL -->
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newQuestionModal"
      aria-hidden="true"
      id="editQuestionModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="editQuestion" class="form" method action>
            <div class="card-body">
              <div class="form-group bmd-form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="material-icons">title</i>
                    </div>
                  </div>
                  <input
                    v-model="title"
                    type="text"
                    class="form-control"
                    placeholder="Title..."
                    required
                  />
                </div>
              </div>

              <div class="form-group bmd-form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="material-icons">subtitles</i>
                    </div>
                  </div>
                  <textarea
                    v-model="desc"
                    class="form-control"
                    rows="5"
                    placeholder="Your question..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="submit" class="btn btn-warning btn-lg">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- EDIT ANSWER MODAL -->
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newQuestionModal"
      aria-hidden="true"
      id="editAnswerModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="editAnswer" class="form" method action>
            <div class="card-body">
              <div class="form-group bmd-form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="material-icons">subtitles</i>
                    </div>
                  </div>
                  <textarea
                    v-model="answerDesc"
                    class="form-control"
                    rows="5"
                    placeholder="Your answer..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="submit" class="btn btn-warning btn-lg">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionDetail',
  data () {
    return {
      question: {},
      answer: '',
      title: '',
      desc: '',
      answerDesc: '',
      answerId: ''
    }
  },
  methods: {
    deleteAnswer (id) {
      this.$store
        .dispatch('deleteAnswer', id)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          this.$toasted.show(`Answer deleted`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        })
    },
    editAnswer () {
      this.$store.commit('SET_ANSWER', this.answerDesc)
      this.$store
        .dispatch('editAnswer', this.answerId)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          $('#editAnswerModal').modal('hide')
          this.$toasted.show(`Answer updated`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        })
    },
    deleteQuestion () {
      this.$store
        .dispatch('deleteQuestion', this.$route.params.id)
        .then(({ data }) => {
          this.$router.push('/')
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
    },
    editQuestion () {
      this.$store.commit('SET_NEW_QUESTION', {
        title: this.title,
        desc: this.desc
      })
      this.$store
        .dispatch('editQuestion', this.$route.params.id)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          $('#editQuestionModal').modal('hide')
          this.$toasted.show(`Question updated`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        })
    },
    onUpvoteA (id) {
      this.$store
        .dispatch('upVoteA', id)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          this.$toasted.show(`Upvoted`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
    },
    onDownvoteA (id) {
      this.$store
        .dispatch('downVoteA', id)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          this.$toasted.show(`Downvoted`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
    },
    onUpvote () {
      this.$store
        .dispatch('upVoteQ', this.$route.params.id)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          this.$toasted.show(`Upvoted!`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
    },
    onDownvote () {
      this.$store
        .dispatch('downVoteQ', this.$route.params.id)
        .then(({ data }) => {
          return this.$store.dispatch(
            'fetchOneQuestion',
            this.$route.params.id
          )
        })
        .then(({ data }) => {
          this.question = data
          this.$toasted.show(`Downvoted!`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
    },
    addAnswer () {
      this.$store.commit('SET_ANSWER', this.answer)
      this.$store
        .dispatch('addAnswer', this.$route.params.id)
        .then(({ data }) => {
          this.question = data
          this.answer = ''
          this.$toasted.show(`Answer added`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
        .catch(({ response }) => {
          this.$toasted.show(`${response.data.message}`, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2500
          })
        })
    }
  },
  created () {
    this.$store
      .dispatch('fetchOneQuestion', this.$route.params.id)
      .then(({ data }) => {
        this.question = data
        this.title = data.title
        this.desc = data.desc
      })
      .catch(({ response }) => {
        this.$toasted.show(`${response.data.message}`, {
          theme: 'bubble',
          position: 'top-center',
          duration: 2500
        })
      })
  }
}
</script>

<style>
</style>
