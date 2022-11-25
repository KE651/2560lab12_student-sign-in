<!-- receives data from App.vue to build table -->
<template>
  <div>
    <div class="card student-list m-2 p-2">
      <h4 class="card-title">Student List</h4>

      <div class="edit-table-toggle form-check">
        <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable" >
        <label for="edit-table" class="form-check-label">Edit table?</label>
      </div>

      <div id="student-table">
         <table class="table">
         <tr>
            <th>Name</th>
            <th>StarID</th>
            <th>Present?</th>
           <th v-show="editTable">Delete</th>
           <!-- had an extra partial html tag in above line, think this was causing the big error -->
         </tr>

        <student-row
          v-for="student in students"
          v-bind:key="student.starID"
          v-bind:student="student"
          v-bind:edit="editTable"
          v-on:student-arrived-or-left="studentArrivedOrLeft"
          v-on:delete-student="deleteStudent">
          <!-- listen for student arrived or left events -->
        </student-row>
          <!-- previously had v-model="student.present" here but that changes data upstream.  
          Follow "data down, events up" and v-bind instead -->
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import StudentRow from './StudentRow.vue'

export default {
  name: "StudentTable",
  components: {StudentRow},
  emits: ['student-arrived-or-left', 'delete-student'],
  props: {
    students:Array
  },

  data () {
    return {
      editTable: false
    } // end return
  }, // end data

  methods: {
    studentArrivedOrLeft(student, present) {
      // emit message to parent. was missing present param in function header.
      // console.log("Student Arrived or Left: ", student, present)
      // student[present]=present
      this.$emit('student-arrived-or-left', student, present)
    }, // end arrivedOrLeft
    
    deleteStudent(student) {
      this.$emit('delete-student', student)
    } // end deleteStudent
  } // end methods
} // end export
</script>

<style>
.present {
  color: darkgreen;
  font-style: italic;
}
.absent {
  color: darkred;
  font-weight: bold;
}
</style>