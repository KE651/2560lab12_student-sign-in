<!-- shows form, gets and validates input, sends message to App.vue -->
<template>
  <div>
    <div class="alert alert-primary" v-show="errors.length>0">
      <!-- https://getbootstrap.com/docs/5.1/components/alerts/  -->
      <!-- above link shows bootstrap alert color schemes -->
      <ul>
        <li v-for="error in errors" v-bind:key="error"> {{error}}</li>
      </ul>
      <!-- alert alert-danger is from Bootstrap for red/pink colors-->
    </div>

    <div class="card add-student m-2 p-2">
      <h4 class="card-title">Add new student</h4>

      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" class="form-control" v-model.trim="newStudentName">
        <!-- .trim removes spaces-->
      </div>

      <div class="form-group">
        <label for="starID">Star ID</label>
        <input id="starID" class="form-control" v-model.trim="newStarID">
      </div>
      
      <!-- TODO v-on:click event handler -->
      <button class="btn btn-primary" v-on:click="addStudent">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewStudentForm",
  emits: ['student-added'],
  data() {
    return {
      newStudentName: '',
      newStarID: '',
      errors: []
    } // end return
  }, // end data

  methods: {
    addStudent() {
      this.errors = []
      if (!this.newStudentName) {
        this.errors.push('Please enter student name.')
      } // end if
      if (!this.newStarID) {
        this.errors.push('Please enter StarID.')
      } // end if
      if (this.errors.length == 0) {
        let student = {name: this.newStudentName, starID: this.newStarID, present: false}
        this.$emit('student-added', student) // emit to App.vue
        this.newStudentName = '' // clear form inputs
        this.newStarID = ''
        } // end if

    }// end addStudent
  } // end methods
} // end export


</script>

<style scoped>
.form-group {
  border: 1px lightblue solid;
}
</style>