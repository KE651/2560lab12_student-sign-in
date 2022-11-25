import axios from 'axios'
let base_url = '/api/students'
// if a statement appears here: import { response } from 'express'
// delete it

export default {
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    updateStudent(student) {
        //use template string to create the URL of form /api/students/9
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },

    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        } ) } // end deleteStudent


} // end export 
