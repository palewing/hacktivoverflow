<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#" @click.prevent="goHome">
          <i class="material-icons">question_answer</i> Hacktiv Overflow
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li v-if="!$store.state.isLogin" class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Log In</a>
            </li>
            <li v-if="!$store.state.isLogin" class="nav-item">
              <button
                class="btn btn-white btn-round"
                data-toggle="modal"
                data-target="#signupModal"
              >Sign Up</button>
            </li>
            <li v-if="$store.state.isLogin" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="material-icons">person</i>
                {{email}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a
                  class="dropdown-item"
                  data-toggle="modal"
                  data-target="#newQuestionModal"
                  href="#"
                >New Question</a>
                <a class="dropdown-item" href="#">My Questions</a>
                <a class="dropdown-item" href="#">My Answers</a>
                <a class="dropdown-item" href="#" @click.prevent="onLogout">Log Out</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--  login modal ------------------------------------->
    <div class="modal fade" id="loginModal" tabindex="-1" role>
      <div class="modal-dialog modal-login" role="document">
        <div class="modal-content">
          <div class="card card-signup card-plain">
            <div class="modal-header">
              <div class="card-header card-header-info text-center">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="material-icons">clear</i>
                </button>

                <h4 class="card-title">Log in</h4>
              </div>
            </div>
            <div class="modal-body">
              <form @submit.prevent="onLogin" class="form" method action>
                <p class="description text-center">Welcome Back</p>
                <div class="card-body">
                  <div class="form-group bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="material-icons">email</i>
                        </div>
                      </div>
                      <input
                        v-model="email"
                        type="text"
                        class="form-control"
                        placeholder="Email..."
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </div>
                      </div>
                      <input
                        v-model="password"
                        type="password"
                        placeholder="Password..."
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer justify-content-center">
                  <button type="submit" class="btn btn-info btn-lg">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  signin modal ------------------------------------->
    <div class="modal fade" id="signupModal" tabindex="-1" role>
      <div class="modal-dialog modal-login" role="document">
        <div class="modal-content">
          <div class="card card-signup card-plain">
            <div class="modal-header">
              <div class="card-header card-header-warning text-center">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <i class="material-icons">clear</i>
                </button>

                <h4 class="card-title">Sign Up</h4>
              </div>
            </div>
            <div class="modal-body">
              <form @submit.prevent="onRegister" class="form" method action>
                <div class="card-body">
                  <div class="form-group bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="material-icons">email</i>
                        </div>
                      </div>
                      <input
                        v-model="email"
                        type="text"
                        class="form-control"
                        placeholder="Email..."
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </div>
                      </div>
                      <input
                        v-model="password"
                        type="password"
                        placeholder="Password..."
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer justify-content-center">
                  <button type="submit" class="btn btn-warning btn-lg">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- new question modal -->
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newQuestionModal"
      aria-hidden="true"
      id="newQuestionModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="addQuestion" class="form" method action>
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
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      email: "",
      password: "",
      title: "",
      desc: ""
    };
  },
  methods: {
    onRegister() {
      this.$store.commit("BEFORE_LOGIN", {
        email: this.email,
        password: this.password
      });
      this.$store
        .dispatch("register")
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          this.$store.commit("SET_ISLOGIN", true);
          this.password = "";
          $("#signupModal").modal("hide");
          this.$toasted.show(`Welcome ${data.user}`, {
            theme: "bubble",
            position: "top-right",
            duration: 2500
          });
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          this.$toasted.show(`${response.data.message}`, {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        });
    },
    onLogin() {
      this.$store.commit("BEFORE_LOGIN", {
        email: this.email,
        password: this.password
      });
      this.$store
        .dispatch("login")
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          this.$store.commit("SET_ISLOGIN", true);
          this.password = "";
          $("#loginModal").modal("hide");
          this.$toasted.show(`Welcome ${data.user}`, {
            theme: "bubble",
            position: "top-right",
            duration: 2500
          });
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          this.$toasted.show(`${response.data.message}`, {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        });
    },
    onLogout() {
      localStorage.clear();
      this.$store.commit("SET_ISLOGIN", false);
      this.$router.push("/");
      this.$toasted.show(`Logged out`, {
        theme: "toasted-primary",
        position: "top-right",
        duration: 2500
      });
    },
    addQuestion() {
      this.$store.commit("SET_NEW_QUESTION", {
        title: this.title,
        desc: this.desc
      });
      this.$store
        .dispatch("addQuestion")
        .then(({ data }) => {
          this.$store.dispatch("fetchQuestions");
          $("#newQuestionModal").modal("hide");
          this.$toasted.show(`Question added`, {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          this.$toasted.show(`${response.data.message}`, {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        });
    },
    goHome() {
      this.$router.push("/");
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("SET_ISLOGIN", true);
      this.email = localStorage.getItem("user");
    }
  }
};
</script>

<style>
</style>
