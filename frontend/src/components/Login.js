import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form,setForm] = useState({email:'',password:''});
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // sync guest cart if present
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      if(guest.length){
        for(const g of guest){
          await API.post('/cart/add', { itemId: g._id, qty: g.qty || 1 });
        }
        localStorage.removeItem('guest_cart');
      }
      nav('/products');
    }catch(err){
      alert(err.response?.data?.msg || err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{maxWidth:420, margin:'20px auto'}} className="card">
      <h2>Login</h2>
      <form onSubmit={submit} style={{display:'grid',gap:10,marginTop:10}}>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
