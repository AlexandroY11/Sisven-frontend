<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Edit
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Paymode
            </div>
            <div class="card-body">
                <form @submit.prevent="updateComuna">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Paymode Code" disabled 
                            v-model="paymode.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Paymode name" 
                            v-model="paymode.name">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="muni_codi">Description</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <textarea type="text" class="form-control" id="observation" placeholder="Paymode observation"  
                            v-model="paymode.observation" required></textarea>
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
            paymode:{
                id:0,
                name:'',
                observation:'',
            }
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name: 'Paymodes'})
        },

        async updateComuna(){
            try {
                const res = await axios.put(`http://localhost:8000/api/paymodes/${this.paymode.id}`, this.paymode);
                if (res.status == 200) {
                    this.$router.push({name: 'Paymodes'});
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Paymode has been updated successfully',
                        showConfirmationButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error actualizando la paymode:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la paymode. Por favor, intente de nuevo.',
                });
            }

        }
    },
    mounted(){
        this.paymode.id = this.$route.params.id;

        axios.get(`http://localhost:8000/api/paymodes/${this.paymode.id}`)
            .then(response => {
                this.paymode = response.data.paymode;
            })
    },

}

</script>