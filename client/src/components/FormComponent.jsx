import React, { useEffect, useState } from "react";
import { Text, TextInput } from '@mantine/core';
import "../styles/form_style.css";

const FormComponent = ({ setFormEmail }) => {
    const [form, setForm] = useState("register");

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

    const HandleRegister = () => {
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
        <div className="form-container">
            {form === "login" ? (
                <div className="form">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label className="label_form" htmlFor="email">Email:</label>
                        <TextInput
                            className="input_form"
                            type="email"
                            id="email"
                            onChange={(evento) => { setEmailLogin(evento.target.value) }}
                            error={errorCorreo ? "Credenciales incorrectos" : undefined}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="password">Password:</label>
                        <TextInput
                            className="input_form"
                            type="password"
                            id="password"
                            onChange={(evento) => { setPasswordLogin(evento.target.value) }}
                            error={errorCorreo ? " " : undefined}
                        />
                    </div>
                    <button
                        className="boton_form"
                        type="submit"
                        onClick={() => { HandleLoggin() }}
                    >Submit</button>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text c="black" style={{ marginRight: '10px' }} className="unlinks_forms">Don't have an account already? </Text>
                        <Text c="blue" onClick={switchForm} className="links_forms">Create one</Text>
                    </div>
                </div>
            ) : (
                <div className="form">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label className="label_form" htmlFor="name">Nombre</label>
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
                        <label className="label_form" htmlFor="email">Email:</label>
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
                        <label className="label_form" htmlFor="username">Username:</label>
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
                        <label className="label_form" htmlFor="password">Password:</label>
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
                    >Submit</button>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text c="black" style={{ marginRight: '10px' }} className="unlinks_forms">Already have an account? </Text>
                        <Text c="blue" onClick={switchForm} className="links_forms">Login</Text>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormComponent;