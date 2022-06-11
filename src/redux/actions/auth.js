import { types } from "../types/types";
import { firebase } from "../../firebase/firebase-config";
import axios from "axios";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";

export const startRegisterWithEmailPasswordName = (email, name, usuario) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, '123456')
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));

                var userDB = {
                    ...usuario,
                    uidFirebase: user.uid
                }

                axios.post('https://backend-invergo-production.up.railway.app/usuarios', userDB).then(res => {
                    Toast.fire({ icon: 'success', title: 'Usuario Creado Correctamente' }).then(() => {
                        /*                         setTimeout(() => {
                                                    window.location.reload();
                                                }, 1000); */
                        window.location.reload();
                    });
                });
            })
            .catch(e => {
                Swal.fire('Fail', e.message, 'error');
            })
    }
}

export const updateUserInfoDB = (usuario, registro) => {

    return async (dispatch, getState) => {
        axios.put(`https://backend-invergo-production.up.railway.app/usuarios/${usuario._id}`, usuario).then(res => {

            axios.put(`https://backend-invergo-production.up.railway.app/registros/${registro._id}`, registro).then(res => {

                Toast.fire({ icon: 'success', title: 'Usuario Actualizado con Exito' }).then(() => {
                    /*                     setTimeout(() => {
                                            window.location.reload();
                                        }, 1000) */
                    window.location.reload();
                });

            });

        });
    }
}

const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
});
