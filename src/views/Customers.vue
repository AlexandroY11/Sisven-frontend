<template>
    <div class="container">
        <h1>Customer list</h1>
        <button @click="newCustomer()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Code</th>
                <th scope="col">Document number</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">Birthday</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in customers" :key="index">
                    <th scope="row">{{customer.id}}</th>
                    <td>{{customer.document_number}}</td>
                    <td>{{customer.first_name}}</td>
                    <td>{{customer.last_name}}</td>
                    <td>{{customer.address}}</td>
                    <td>{{customer.birthday}}</td>
                    <td>{{customer.phone_number}}</td>
                    <td>{{customer.email}}</td>
                    <td>
                        <button @click="deleteCustomer(customer.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editCustomer(customer.id)" class="btn btn-warning mx-2">
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
    
        name: 'Customer',
        data(){
            return{
                customers:[]
            }
        },
        methods:{
            deleteCustomer(codigo) {
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
                        axios.delete(`http://localhost:8000/api/customers/${codigo}`)
                            .then(response => {
                                if (response.data.success) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    this.customers = response.data.customers;
                                } else {
                                    Swal.fire({
                                        title: "Error!",
                                        text: 'Customer can not be deleted, because is used as a customer in a invoice',
                                        icon: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                let message = 'An error occurred while trying to delete the customer.';
                                if (error.response && error.response.data && error.response.data.message) {
                                    message = error.response.data.message;
                                }
                                Swal.fire({
                                    title: "Error!",
                                    text: "Customer can not be deleted, because is used as a customer in a invoice",
                                    icon: "error"
                                });
                            });
                    }
                });
            },
            editCustomer(id){
                this.$router.push({name: "EditarCustomer", params: {id: `${id}`}})
            },
            newCustomer(){
                this.$router.push({name: "NewCustomer"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/customers")
                .then(response => (this.customers = response.data.customers))
        },
    }
    
    </script>