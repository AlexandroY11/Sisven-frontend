<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Edit
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Product
            </div>
            <div class="card-body">
                <form @submit.prevent="updateProduct">
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
                        <label for="stock">Product</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" v-model="product.category_id" required>
                                <option disabled selected>Choose a product...</option>
                                <option v-for="category in categories" :value="category.id" :key="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Update</button>
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
    name: "EditarProduct",
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
    methods:{
        cancelar(){
            this.$router.push({name: 'Products'})
        },

        async updateProduct(){
            try {
                const res = await axios.put(`http://localhost:8000/api/products/${this.product.id}`, this.product);
                if (res.status == 200) {
                    this.$router.push({name: 'Products'});
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Product has been updated successfully',
                        showConfirmationButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error actualizando la product:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la product. Por favor, intente de nuevo.',
                });
            }

        }
    },
    mounted(){
        this.product.id = this.$route.params.id;

        axios.get(`http://localhost:8000/api/products/${this.product.id}`)
            .then(response => {
                this.product = response.data.product;
                this.categories = response.data.categories;
            })
    },

}

</script>