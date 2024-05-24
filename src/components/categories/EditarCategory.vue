<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Edit
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Category
            </div>
            <div class="card-body">
                <form @submit.prevent="updateCategory">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Category Code" disabled 
                            v-model="category.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Category name" 
                            v-model="category.name">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="muni_codi">Description</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <textarea type="text" class="form-control" id="description" placeholder="Category description"  
                            v-model="category.description" required></textarea>
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
    name: "EditarComuna",
    data(){
        return{
            category:{
                id:0,
                name:'',
                description:'',
            }
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name: 'Categories'})
        },

        async updateCategory(){
            try {
                const res = await axios.put(`http://localhost:8000/api/categories/${this.category.id}`, this.category);
                if (res.status == 200) {
                    this.$router.push({name: 'Categories'});
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Category has been updated successfully',
                        showConfirmationButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error actualizando la category:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la category. Por favor, intente de nuevo.',
                });
            }

        }
    },
    mounted(){
        this.category.id = this.$route.params.id;

        axios.get(`http://localhost:8000/api/categories/${this.category.id}`)
            .then(response => {
                this.category = response.data.category;
            })
    },

}

</script>