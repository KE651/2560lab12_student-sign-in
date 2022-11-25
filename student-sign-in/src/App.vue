<!-- keeps list of students, provides list to StudentTable -->
<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table
        v-bind:students="students"
        v-on:student-arrived-or-left="studentArrivedOrLeft"
        v-on:delete-student="studentDeleted">
    </student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentRow from './components/StudentRow.vue'

export default {
  name: "App",
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  }, // end components
  
  data() {
    return {
      students: [], // students is an array of objects {name, starID}
      mostRecentStudent: {}
    } // end return
  }, // end data

  mounted() {
    this.updateStudents()
  },

  methods: {
    newStudentAdded(student) {
      // console.log('App.vue student: ', student)
      this.$student_api.addStudent(student).then(student => {
        this.updateStudents()
        // calls addStudent in StudentService.js
      }).catch( err => {
        let msg = err.response.data.join(',')
        alert('Error adding student\n'+msg)
      }) // end catch
    }, // end newStudentAdded

    updateStudents() {
      this.$student_api.getAllStudents().then(students => {
        this.students = students
        console.log("updateStudents", this.students)
      }).catch( () => alert('Unable to retrieve data.'))
    }, // end updateStudents

    studentArrivedOrLeft(student, present) {
        student.present = present 
        console.log("studentArrivedorLeft", student, present)
        this.$student_api.updateStudent(student).then( () => {
          this.mostRecentStudent = student
          this.updateStudents()
        }).catch( () => alert('Unable to update student.'))
      },// end StudentArrivedOrLeft
//getting an error here, always says unable to update

    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} // clear welcome/bye msg
      }).catch( () => alert('Unable to delete student.'))
      } // end studentDeleted


  } // end methods
} // end export
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
</style>