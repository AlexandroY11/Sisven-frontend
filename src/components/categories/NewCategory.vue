<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Category
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCategory">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Category code" disabled 
                            v-model="category.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Category name"  
                            v-model="category.name" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="description">Description</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <textarea type="text" class="form-control" id="description" placeholder="Category description"  
                            v-model="category.description" required></textarea>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-danger mx-2" @click="cancelar">Cancelar</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
    name: "NewCategory",
    data(){
        return{
            category: {
                id: 0,
                name: '',
                description: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Categories' });
        },

        async saveCategory() {
            try {
                const res = await axios.post('http://localhost:8000/api/categories', this.category);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Category has been created successfully',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Categories' });
                    });
                }
            } catch (error) {
                console.error('Error creating category:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la category. Por favor, intente de nuevo.',
                });
            }
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/municipios/')
            .then(response => {
                this.municipios = response.data.municipios;
            })
            .catch(error => {
                console.error('Error fetching municipios:', error);
            });
    },
}
</script>
