<template>
    <div class="container">
        <h1>Category list</h1>
        <button @click="newCategory()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categories" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{category.id}}</td>
                    <td>{{category.name}}</td>
                    <td>{{category.description}}</td>
                    <td>
                        <button @click="deleteCategory(category.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editCategory(category.id)" class="btn btn-warning mx-2">
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
    
        name: 'Category',
        data(){
            return{
                categories:[]
            }
        },
        methods:{
            deleteCategory(codigo){
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
                    axios.delete(`http://localhost:8000/api/categories/${codigo}`)
                    .then(response => {
                        if (response.data.success){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            this.categories = response.data.categories;
                        }
                    });
                }
                });
            },
            editCategory(id){
                this.$router.push({name: "EditarCategory", params: {id: `${id}`}})
            },
            newCategory(){
                this.$router.push({name: "NewCategory"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/categories")
                .then(response => (this.categories = response.data.categories))
        },
    }
    
    </script>