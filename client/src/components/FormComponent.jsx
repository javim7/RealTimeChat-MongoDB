import React, { useEffect, useState } from "react";
import { Text, TextInput, Image } from '@mantine/core';
import "../styles/form_style.css";
import imgWhite from "../assets/quehubo_white.png";

const FormComponent = ({ setFormEmail }) => {
    const [form, setForm] = useState("login");

    const switchForm = () => {
        setForm(form === "login" ? "register" : "login");
    };

    // USESTATES DE REGISTER

    const [nombreRegister, setNombreRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [usernameRegister, setUsernameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");

    // USESTATES DE LOGIN

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    // USESTATE DE ERROR
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorRegistro, setErrorRegistro] = useState(false);

    const HandleLoggin = async () => {

        fetch("http://localhost:5000/api/users/" + emailLogin + "/" + passwordLogin)
            .then(response => response.json())
            .then(data => {
                setFormEmail(data.email);
                if (data.email === undefined) {
                    setErrorCorreo(true);
                }
            })
            .catch(error => {
                // console.log(error);
            });

    }

    const HandleRegister = async () => {
        let databody = {
            "name": nombreRegister,
            "email": emailRegister,
            "username": usernameRegister,
            "password": passwordRegister
        }

        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(databody)
        })
            .then(res => res.json())
            .then(data => {
                if (data.name === undefined || data.email === undefined || data.username === undefined || data.password === undefined) {
                    setErrorRegistro(true);
                }
                // console.log(data.email);    
                setFormEmail(data.email);
                // console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="form-container" >
            <div className="divImg" style={{ width: 500, marginLeft: '5vw', marginRight: '10vw' }}>
                <Image src={imgWhite} alt="logoBlanco" />
            </div>
            {form === "login" ? (
                <div className="form">
                    <h2>Inciar Sesion</h2>
                    <div className="form-group">
                        <label className="label_form" htmlFor="email">Correo:</label>
                        <TextInput
                            className="input_form"
                            type="email"
                            id="email"
                            onChange={(evento) => { setEmailLogin(evento.target.value) }}
                            error={errorCorreo ? " " : undefined}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="password">Clave:</label>
                        <TextInput
                            className="input_form"
                            type="password"
                            id="password"
                            onChange={(evento) => { setPasswordLogin(evento.target.value) }}
                            error={errorCorreo ? "Credenciales incorrectos" : undefined}
                        />
                    </div>
                    <button
                        className="boton_form"
                        type="submit"
                        onClick={() => { HandleLoggin() }}
                    >Iniciar Sesion</button>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text c="black" style={{ marginRight: '10px' }} className="unlinks_forms">Aun no tienes cuenta? </Text>
                        <Text c="blue" onClick={switchForm} className="links_forms">Crear una</Text>
                    </div>
                </div>
            ) : (
                <div className="form">
                    <h2>Registrarse</h2>
                    <div className="form-group">
                        <label className="label_form" htmlFor="name">Nombre Completo</label>
                        <TextInput
                            className="input_form"
                            type="text"
                            id="name"
                            error={errorRegistro ? " " : undefined}
                            onChange={(evento => {
                                setNombreRegister(evento.target.value);
                            })} />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="email">Correo:</label>
                        <TextInput
                            className="input_form"
                            type="email"
                            id="email"
                            error={errorRegistro ? " " : undefined}
                            onChange={(evento) => {
                                setEmailRegister(evento.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="username">Nombre de Usuario:</label>
                        <TextInput
                            className="input_form"
                            type="text"
                            id="username"
                            error={errorRegistro ? " " : undefined}
                            onChange={(evento) => {
                                setUsernameRegister(evento.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="password">Clave:</label>
                        <TextInput
                            className="input_form"
                            type="password"
                            id="password"
                            error={errorRegistro ? "Todos los campos son obligatorios" : undefined}
                            onChange={(evento) => {
                                setPasswordRegister(evento.target.value);
                            }} />
                    </div>
                    <button
                        className="boton_form"
                        type="submit"
                        onClick={() => { HandleRegister() }}
                    >Registrarse</button>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text c="black" style={{ marginRight: '10px' }} className="unlinks_forms">¿Ya tienes una cuenta? </Text>
                        <Text c="blue" onClick={switchForm} className="links_forms">Iniciar Sesion</Text>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormComponent;