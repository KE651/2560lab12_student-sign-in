<!-- rows as components: one row will manage data for one student-->
<template>
<tr v-bind:class="{ present: student.present, absent: !student.present }">
  <td>{{ student.name}}</td>
  <td>{{ student.starID }}</td>
  <td> <input type="checkbox" v-bind:checked="student.present" 
        v-on:change="arrivedOrLeft(student, $event.target.checked)">
    </td>
  <td v-show="edit"> <img class="delete-icon" alt="delete icon" v-on:click="deleteStudent" src="./delete.png" height="25"> </td>
</tr>
</template>

<script>
export default {
  name: 'StudentRow',
  emits: ['student-arrived-or-left', 'delete-student'],
  props: {
    student:Object,
    edit: Boolean
  },

  methods: {
    arrivedOrLeft(student, present) {
      console.log(student, present)
      this.$emit('student-arrived-or-left', student, present)
     }, // end arrivedOrLeft

    deleteStudent() {if (confirm(`Delete ${this.student.name}?`))
    // note had param student in deleteStudent, was this causing errors?
    {this.$emit('delete-student', this.student) 
      // console.log('Delete ', this.student.name)
    }} // end emit and if
  } // end methods
} // end export
</script>

<style scoped>
.present {
  color: darkgreen;
  font-style: italic;
}
.absent {
  color: darkred;
  font-weight: bold;
}
img {
  height: 25px;
}
</style>