import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Listing(){
  const [items,setItems] = useState([]);
  const [filters,setFilters] = useState({q:'',category:'',minPrice:'',maxPrice:''});
  const [loading,setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try{
      const params = {};
      Object.keys(filters).forEach(k => { if(filters[k]) params[k] = filters[k]; });
      const res = await API.get('/items', { params });
      setItems(res.data);
    }catch(err){
      console.error(err); alert('Error fetching items');
    }finally{ setLoading(false); }
  };

  useEffect(()=>{ fetchItems(); },[]);

  const addToCart = async (it) => {
    const token = localStorage.getItem('token');
    if(!token){
      // store in guest cart in localStorage
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      guest.push({ _id: it._id, name: it.name, price: it.price, qty: 1 });
      localStorage.setItem('guest_cart', JSON.stringify(guest));
      return alert('Added to cart (guest). Login to persist to your account.');
    }
    try{
      await API.post('/cart/add', { itemId: it._id, qty: 1 });
      alert('Added to cart');
    }catch(err){
      console.error(err); alert('Add to cart failed');
    }
  };

  const applyFilters = (e) => { e?.preventDefault(); fetchItems(); };

  return (
    <div>
      <div className="card" style={{marginBottom:12}}>
        <form onSubmit={applyFilters} className="filters">
          <input className="input" placeholder="Search" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})}/>
          <input className="input" placeholder="Category" value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}/>
          <input className="input" placeholder="Min price" type="number" value={filters.minPrice} onChange={e=>setFilters({...filters,minPrice:e.target.value})}/>
          <input className="input" placeholder="Max price" type="number" value={filters.maxPrice} onChange={e=>setFilters({...filters,maxPrice:e.target.value})}/>
          <button className="btn">Apply</button>
        </form>
      </div>

      {loading ? <p>Loading...</p> :
      <div className="grid">
        {items.map(it => (
          <div key={it._id} className="card">
            <img src={it.image || 'https://via.placeholder.com/300'} alt={it.name} style={{width:'100%',height:160,objectFit:'cover',borderRadius:8}}/>
            <h3 style={{margin:'10px 0 4px'}}>{it.name}</h3>
            <p style={{color:'#6b7280',margin:0}}>₹{it.price}</p>
            <p style={{color:'#6b7280',fontSize:13}}>{it.category}</p>
            <div style={{marginTop:10, display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <button className="btn" onClick={()=>addToCart(it)}>Add</button>
              <small style={{color:'#6b7280'}}>Stock: {it.stock ?? '—'}</small>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}
