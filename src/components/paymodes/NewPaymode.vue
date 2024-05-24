<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Create
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Paymode
            </div>
            <div class="card-body">
                <form @submit.prevent="savePaymode">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Paymode code" disabled 
                            v-model="paymode.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Paymode name"  
                            v-model="paymode.name" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="observation">Observation</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <textarea type="text" class="form-control" id="observation" placeholder="Paymode observation"  
                            v-model="paymode.observation" required></textarea>
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
    name: "NewPaymode",
    data(){
        return{
            paymode: {
                id: 0,
                name: '',
                observation: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Paymodes' });
        },

        async savePaymode() {
            try {
                const res = await axios.post('http://localhost:8000/api/paymodes', this.paymode);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Paymode has been created successfully',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Paymodes' });
                    });
                }
            } catch (error) {
                console.error('Error creating paymode:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la paymode. Por favor, intente de nuevo.',
                });
            }
        }
    },
    
}
</script>
