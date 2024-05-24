<template>
    <div class="container">
        <h1>Paymode list</h1>
        <button @click="newPaymode()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Observation</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(paymode, index) in paymodes" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{paymode.id}}</td>
                    <td>{{paymode.name}}</td>
                    <td>{{paymode.observation}}</td>
                    <td>
                        <button @click="deletePaymode(paymode.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editPaymode(paymode.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" /> 
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </template>
    <script>
    import axios from 'axios';
    import Swal from "sweetalert2"
    
    
    export default {
    
        name: 'Paymode',
        data(){
            return{
                paymodes:[]
            }
        },
        methods:{
            deletePaymode(codigo) {
                Swal.fire({
                    title: "Are you sure you want to delete it?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`http://localhost:8000/api/paymodes/${codigo}`)
                            .then(response => {
                                if (response.data.success) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    this.paymodes = response.data.paymodes;
                                } else {
                                    Swal.fire({
                                        title: "Error!",
                                        text: 'Paymode can not be deleted, because is used as a paymode in a invoice',
                                        icon: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                let message = 'An error occurred while trying to delete the paymode.';
                                if (error.response && error.response.data && error.response.data.message) {
                                    message = error.response.data.message;
                                }
                                Swal.fire({
                                    title: "Error!",
                                    text: "Paymode can not be deleted, because is used as a paymode in a invoice",
                                    icon: "error"
                                });
                            });
                    }
                });
            },
            editPaymode(id){
                this.$router.push({name: "EditarPaymode", params: {id: `${id}`}})
            },
            newPaymode(){
                this.$router.push({name: "NewPaymode"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/paymodes")
                .then(response => (this.paymodes = response.data.paymodes))
        },
    }
    
    </script>