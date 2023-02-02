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
        console.log(emailRegister);
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
                    <Text c="blue" onClick={switchForm} className="links_forms">Create an account</Text>
                </div>
            ) : (
                <div className="form">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label className="label_form" htmlFor="name">Nombre</label>
                        <input
                            className="input_form"
                            type="text"
                            id="name"
                            onChange={(evento => {
                                setNombreRegister(evento.target.value);
                            })} />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="email">Email:</label>
                        <input
                            className="input_form"
                            type="email"
                            id="email"
                            onChange={(evento) => {
                                setEmailRegister(evento.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="username">Username:</label>
                        <input
                            className="input_form"
                            type="text"
                            id="username"
                            onChange={(evento) => {
                                setUsernameRegister(evento.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label className="label_form" htmlFor="password">Password:</label>
                        <input
                            className="input_form"
                            type="password"
                            id="password"
                            onChange={(evento) => {
                                setPasswordRegister(evento.target.value);
                            }} />
                    </div>
                    <button
                        className="boton_form"
                        type="submit"
                        onClick={() => { HandleRegister() }}
                    >Submit</button>
                    <Text c="blue" onClick={switchForm} className="links_forms">Loggin</Text>
                </div>
            )}
        </div>
    );
};

export default FormComponent;