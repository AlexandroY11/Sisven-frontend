<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Create
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Product
            </div>
            <div class="card-body">
                <form @submit.prevent="saveProduct">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Product code" disabled 
                            v-model="product.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Product name"  
                            v-model="product.name" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="price">Price</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="number" class="form-control" id="price" placeholder="Product price"  
                            v-model="product.price" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="stock">Stock</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="number" class="form-control" id="stock" placeholder="Product stock"  
                            v-model="product.stock" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="stock">Category</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" v-model="product.category_id" required>
                                <option disabled selected>Choose a category...</option>
                                <option v-for="category in categories" :value="category.id" :key="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Save</button>
                    <button class="btn btn-danger mx-2" @click="cancelar">Cancel</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
    name: "NewProduct",
    data(){
        return{
            product: {
                id: 0,
                name: '',
                price: 0,
                stock: 0,
                category_id: 0,
            },
            categories: []
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Products' });
        },

        async saveProduct() {
            try {
                const res = await axios.post('http://localhost:8000/api/products', this.product);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Product has been created successfully',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Products' });
                    });
                }
            } catch (error) {
                console.error('Error creating product:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la product. Por favor, intente de nuevo.',
                });
            }
        }
    },
    mounted(){
        axios.get('http://localhost:8000/api/categories/')
            .then(response => {
                this.categories = response.data.categories;
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }
    
}
</script>
