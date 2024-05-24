<template>
    <div class="container">
        <h1>Product list</h1>
        <button @click="newProduct()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{product.id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.stock}}</td>
                    <td>{{product.category_name}}</td>
                    <td>
                        <button @click="deleteProduct(product.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editProduct(product.id)" class="btn btn-warning mx-2">
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
    
        name: 'Product',
        data(){
            return{
                products:[]
            }
        },
        methods:{
            deleteProduct(codigo) {
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
                        axios.delete(`http://localhost:8000/api/products/${codigo}`)
                            .then(response => {
                                if (response.data.success) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    this.products = response.data.products;
                                } else {
                                    Swal.fire({
                                        title: "Error!",
                                        text: 'Product can not be deleted, because is used as a product in a invoice',
                                        icon: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                let message = 'An error occurred while trying to delete the product.';
                                if (error.response && error.response.data && error.response.data.message) {
                                    message = error.response.data.message;
                                }
                                Swal.fire({
                                    title: "Error!",
                                    text: "Product can not be deleted, because is used as a product in a invoice",
                                    icon: "error"
                                });
                            });
                    }
                });
            },
            editProduct(id){
                this.$router.push({name: "EditarProduct", params: {id: `${id}`}})
            },
            newProduct(){
                this.$router.push({name: "NewProduct"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/products")
                .then(response => (this.products = response.data.products))
        },
    }
    
    </script>