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