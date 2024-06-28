import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import integrationURL from '../config';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email);
        console.log(password);
        
        try {
            const response = await fetch(`${integrationURL}/ords/ecom/customer/login`, {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    email: email,
                    password: password, 
                    
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data); 
                
                if (data.items.length > 0) {
                    console.log('Login successful');
                    localStorage.setItem('userId', data.items[0].id);
                    console.log(localStorage.getItem('userId'));
                    window.location.href = '/'; 
                } else {
                    console.log('Login failed:');
                    setLoginError(true); 
                }
            } else {
                console.error('Login failed:', response.statusText); // Afficher le message d'erreur de la réponse
            }
            setEmail('');
            setPassword('');

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };    

    return (
        <div className="card border" style={{ border: '2px solid #392E2C', height: '60vh', width: '55%', marginLeft: '23%', marginTop: '4%', marginBottom: '5%', borderRadius: '5px'}}>
            <div className="card-body text-center bg-danger" style={{ width: '40%', height: '70%', marginTop: '5%', marginLeft: '25%', marginBottom : "5%" }}>
                <h5 className="card-title text-center" style={{ fontFamily: 'montserrat', fontWeight: 'bold', fontSize: '32px', color: '#392E2C', marginBottom: '18%', marginLeft: '20%' }}>Welcome Back !</h5>
                <form>
                    <div className="form-group">
                        <input
                            type="text" required
                            className="form-control"
                            style={{
                                border: '1.5px solid #392E2C',
                                width: '140%',
                                height: '6vh',
                                marginLeft: '-10%',
                                marginBottom: '5%',
                                borderRadius: '5px',
                                fontFamily: "montserrat"
                            }}
                            placeholder= "   Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                    <input
                            type="password" required
                            className="form-control"
                            style={{
                                border: '1.5px solid #392E2C',
                                width: '140%',
                                height: '6vh',
                                marginBottom: '5%',
                                marginLeft: '-10%',
                                borderRadius: '5px',
                                fontFamily: "montserrat"
                            }}
                            placeholder="   Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {loginError && ( // Afficher le message d'erreur uniquement si loginError est vrai
                            <p style={{ color: 'red', marginLeft: '-20%', fontFamily: 'montserrat' }}>Invalid email or password.</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        style={{
                            borderRadius: '5px',
                            backgroundColor: '#B39188',
                            color: '#392E2C',
                            fontFamily: 'montserrat',
                            fontWeight: 'bold',
                            marginTop: '8%',
                            marginLeft: '-10%',
                            width: '140%',
                            height: '6vh'
                        }}
                        onClick={handleSubmit}
                    >
                        Login now
                    </button>
                </form>
                <div className="text-center mt-3 mb-4" style={{ color: '#392E2C', fontFamily: 'montserrat', marginTop: "8%", marginLeft: "18%" }}>
                    <Link to="/signup" style={{ textDecoration: "none"}}>
                        Don't have an account? <span style={{ color: "#B39188", textDecoration: "underline" , fontWeight: "bold"}}>Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}





