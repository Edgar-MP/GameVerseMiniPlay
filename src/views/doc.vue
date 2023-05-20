<template>
    <div class="max-w-md mx-auto mt-8 p-6 text-black">
        <div v-if="showPasswordModal" class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold mb-4">Introduce la contraseña:</h2>
            <div class="mb-4">
                <input type="password" v-model="password"
                    class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div class="flex items-center mb-4">
                <input id="remember" type="checkbox" v-model="rememberPassword" class="mr-2">
                <label for="remember" class="text-sm">Recordar contraseña</label>
            </div>
            <button @click="verificarContraseña"
                class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">
                Enviar
            </button>
        </div>
        <div v-else class="bg-white rounded-lg shadow-md p-10">
            <h1 class="text-2xl font-bold mb-4">Crear Documento en Firestore</h1>
            <form @submit.prevent="crearDocumento">
                <div class="mb-4">
                    <label for="images" class="block font-bold mb-1">Imágenes:</label>
                    <input type="file" id="images" ref="images" multiple
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="mb-4">
                    <label for="name" class="block font-bold mb-1">Nombre:</label>
                    <input type="text" id="name" v-model="name" required
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label for="hint1" class="block font-bold mb-1">Hint 1:</label>
                    <input type="text" id="hint1" v-model="hint1" required
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label for="hint2" class="block font-bold mb-1">Hint 2:</label>
                    <input type="text" id="hint2" v-model="hint2" required
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label for="hint3" class="block font-bold mb-1">Hint 3:</label>
                    <input type="text" id="hint3" v-model="hint3" required
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label for="hint4" class="block font-bold mb-1">Hint 4:</label>
                    <select id="hint4" v-model="hint4" required
                        class="w-full border-gray-300 border-[1px] active:border-black focus:boder-black rounded-md shadow-sm bg-[#f1f1f1] focus:ring-indigo-500 text-xl p-2">
                        <option classvalue="" disabled selected>Seleccione un año</option>
                        <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="hint5" class="block font-bold mb-1">Hint 5:</label>
                    <input type="text" id="hint5" v-model="hint5" required
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label for="documentoId" class="block font-bold mb-1">ID del Documento:</label>
                    <input type="text" id="documentoId" v-model="documentoId" required
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                <button type="submit"
                    class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Crear
                    Documento</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../firebaseConfig'
import { ref, uploadBytesResumable } from "firebase/storage";

import { storage } from '../firebaseConfig';

export default {
    data() {
        return {
            name: "",
            hint1: "",
            hint2: "",
            hint3: "",
            hint4: "",
            hint5: "",
            documentoId: "",
            years: [],
            images: [],
            showPasswordModal: true,
            rememberPassword: false,
            password: "",
        };
    },
    mounted() {
        this.populateYears();
        const storedPassword = localStorage.getItem("password");
        const expirationDate = localStorage.getItem("passwordExpiration");
        if (storedPassword && expirationDate) {
            const now = new Date();
            const expiration = new Date(expirationDate);
            if (now < expiration) {
                this.showPasswordModal = false;
            }
        }
    },
    beforeDestroy() {
        this.limpiarContraseña();
    },
    methods: {
        limpiarContraseña() {
            localStorage.removeItem("password");
            localStorage.removeItem("passwordExpiration");
        },
        verificarContraseña() {
            // Verificar la contraseña aquí (puedes usar una condición if/else)
            if (this.password === "edgar") {
                // Almacenar la contraseña en el almacenamiento local
                localStorage.setItem("password", this.password);
                // Establecer la fecha de expiración a 1 día después
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1);
                localStorage.setItem("passwordExpiration", expirationDate.toString());
                this.showPasswordModal = false;
            } else {
                // Mostrar un mensaje de error o realizar alguna acción adicional
            }
        },
        populateYears() {
            const currentYear = new Date().getFullYear();
            const startYear = 1980;
            for (let year = currentYear; year >= startYear; year--) {
                this.years.push(year.toString());
            }
        },
        async crearDocumento() {
            try {
                const collectionRef = collection(db, "guessTheScreenshot");
                const documentRef = doc(collectionRef, this.documentoId);

                // Subir las imágenes a Firebase Storage
                const storageRef = ref(storage);
                const files = Array.from(this.$refs.images.files);

                const uploadPromises = files.map((file) => {
                    const imageName = `${this.documentoId}_${file.name}`; // Nombre único para la imagen
                    console.log(imageName);
                    const fileRef = ref(storageRef, `guessTheScreenshot/${imageName}`);
                    return uploadBytesResumable(fileRef, file);
                });

                await Promise.all(uploadPromises);

                // Crear el documento en Firestore sin las URLs de las imágenes
                await setDoc(documentRef, {
                    name: this.name,
                    hint1: this.hint1,
                    hint2: this.hint2,
                    hint3: this.hint3,
                    hint4: this.hint4,
                    hint5: this.hint5,
                });

                console.log("Documento creado en Firestore");
            } catch (error) {
                console.error("Error al crear el documento:", error);
            }
        },



    },
};
</script>
  