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