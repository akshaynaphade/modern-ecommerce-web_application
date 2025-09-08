import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Cart(){
  const [cart, setCart] = useState({ items: [] });
  const [loading,setLoading] = useState(false);

  const loadCart = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      // show guest cart
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      setCart({ items: guest.map(g => ({ item: { _id: g._id, name:g.name, price:g.price }, qty: g.qty })) });
      return;
    }
    setLoading(true);
    try{
      const res = await API.get('/cart');
      setCart(res.data);
    }catch(err){
      console.error(err); alert('Failed to load cart');
    }finally{ setLoading(false); }
  };

  useEffect(()=>{ loadCart(); },[]);

  const updateQty = async (itemId, qty) => {
    const token = localStorage.getItem('token');
    if(!token){
      // guest
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      const upd = guest.map(g => g._id === itemId ? { ...g, qty } : g);
      localStorage.setItem('guest_cart', JSON.stringify(upd));
      setCart({ items: upd.map(g=>({ item: { _id:g._id, name:g.name, price:g.price }, qty: g.qty })) });
      return;
    }
    try{
      await API.post('/cart/add', { itemId, qty });
      loadCart();
    }catch(err){ console.error(err); alert('update failed'); }
  };

  const removeItem = async (itemId) => {
    const token = localStorage.getItem('token');
    if(!token){
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]').filter(g=>g._id !== itemId);
      localStorage.setItem('guest_cart', JSON.stringify(guest));
      setCart({ items: guest.map(g=>({ item:{_id:g._id,name:g.name,price:g.price}, qty: g.qty })) });
      return;
    }
    try{
      await API.post('/cart/remove', { itemId });
      loadCart();
    }catch(err){ console.error(err); alert('remove failed'); }
  };

  const total = cart.items.reduce((s,ci)=> s + (ci.item.price * ci.qty), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {loading ? <p>Loading...</p> :
        cart.items.length === 0 ? <p>Your cart is empty.</p> :
        <>
          <div style={{display:'grid',gap:12}}>
            {cart.items.map(ci => (
              <div key={ci.item._id} className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{ci.item.name}</div>
                  <div style={{color:'#6b7280'}}>₹{ci.item.price}</div>
                </div>
                <div>
                  <input type="number" min="1" value={ci.qty} onChange={e=>updateQty(ci.item._id, Number(e.target.value))} style={{width:70,marginRight:8,padding:6,borderRadius:6}}/>
                  <button className="btn" onClick={()=>removeItem(ci.item._id)} style={{background:'#ef4444'}}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12, textAlign:'right'}} className="card">
            <strong>Total: ₹{total}</strong>
          </div>
        </>
      }
    </div>
  );
}
