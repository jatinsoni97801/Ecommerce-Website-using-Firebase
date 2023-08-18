import React, { useState } from 'react'
import { auth,fs } from '../Config/Config';
import { useNavigate } from 'react-router-dom';



// toast.configure();

export const Modal = ({TotalPrice,totalQty,hideModal}) => {

    const navigate = useNavigate();  // used for redirect to the homepage

    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(TotalPrice);
    const [cartQty]=useState(totalQty);


    //function to close mdl

    const handleCloseModal=()=>{
        hideModal();
    }

    // function is used for cash on delivery
    const handleCashOnDelivery=async(e)=>{
       e.preventDefault();
    //    console.log(cell,residentialAddress,cartPrice,cartQty); // used to show details of user into the console
     const uid = auth.currentUser.uid;
     const userData= await fs.collection('users').doc(uid).get();
     await fs.collection('Buyer-Personl-Info').add({
        Name: userData.data().FullName,
        Email: userData.data().Email,
        CellNo: cell,
        ResidentialAddress: residentialAddress,
        cartPrice: cartPrice, 
        CartQty: cartQty
     })
      const cartData = await fs.collection('cart' + uid).get();
      for(var snap of cartData.docs){
        var data = snap.data();
        data.ID = snap.ID;
        await fs.collection('Buyer-Cart ' + uid).add(data);
        await fs.collection('Cart ' + uid).doc(snap.id).delete();
      }
        hideModal();
        navigate('/');
        alert("Your order has been placed");
        
       
    }
    

  return (
    <div className='shade-area'>
    <div className='modal-container'>
        <form className='form-group' onSubmit={handleCashOnDelivery}>                    
            <input type="number" className='cell' placeholder='Cell No'
                required onChange={(e)=>setCell(e.target.value)} value={cell}          
            />
            <br></br>
            <input type="text" className='raa' placeholder='Residential Address'
                required onChange={(e)=>setResidentialAddress(e.target.value)}
                value={residentialAddress}
            />
            <br></br>
            <label className='tqa'>Total Quantity</label>
            <input type="text" className='fco' readOnly
                required value={cartQty}
            />
            <br></br>
            <label className='tp'>Total Price</label>
            <input type="text" className='fco1' readOnly
                required value={cartPrice}
            />
            <br></br>
            <button type='submit' className='sub'>Submit</button>
        </form>
        <div className='delete-icon'  onClick={handleCloseModal}>x</div>
    </div>
</div>
  )
}
