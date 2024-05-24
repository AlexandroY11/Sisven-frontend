<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Create
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Customer
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCustomer">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Customer code" disabled 
                            v-model="customer.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="document_number">Document number</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="document_number" placeholder="Customer Document Number"  
                            v-model="customer.document_number" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="first_name">First name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="first_name" placeholder="Customer first name"  
                            v-model="customer.first_name" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="last_name">Last name</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="last_name" placeholder="Customer last name"  
                            v-model="customer.last_name" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="address">Address</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="address" placeholder="Customer Address"  
                            v-model="customer.address" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="birthday">Birthday</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="date" class="form-control" id="birthday" placeholder="Customer Birthday"  
                            v-model="customer.birthday" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="phone_number">Phone number</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="number" class="form-control" id="phone_number" placeholder="Customer phone number"  
                            v-model="customer.phone_number" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="email">Email</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="email" class="form-control" id="email" placeholder="Customer email"  
                            v-model="customer.email" required>
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
    name: "NewCustomer",
    data(){
        return{
            customer: {
                id: 0,
                document_number: 0,
                first_name: '',
                last_name: '',
                address: '',
                birthday: '',
                phone_number: 0,
                email: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Customers' });
        },

        async saveCustomer() {
            try {
                const res = await axios.post('http://localhost:8000/api/customers', this.customer);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Customer has been created successfully',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Customers' });
                    });
                }
            } catch (error) {
                console.error('Error creating customer:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la customer. Por favor, intente de nuevo.',
                });
            }
        }
    },    
}
</script>
