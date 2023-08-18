import React, {useState,useEffect} from 'react'
import { Navbar } from './Navbar'
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal';
import { Footer } from './Footer';

//  toast.configure();

export const Cart = () => {

 // for cash on delivery

 const [showModal, setShowModal]=useState(false);

 //triger Modal
  const triggerModal=()=>{
     setShowModal(true);
  }

  const hideModal=()=>{
    setShowModal(false)
  }



    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    const [cartProducts, setCartProducts]=useState([]);

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to get cart data');
            }
        })
    },[])

        // console.log(cartProducts);

        // getting the qty from cartProducts in a seprate array

         const qty = cartProducts.map (cartProduct=>{
              return cartProduct.qty;
         })

        //  console.log(qty);

        //reducing method to add values

        const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;
        const totalQty = qty.reduce(reducerOfQty,0)
        // console.log(totalQty);


        // Function to show total amount of all products

         const price = cartProducts.map((cartProduct)=>{
            return cartProduct.TotalProductPrice;
         })

         //reducer the price of single value

         const reducerofPrice = (accumulator,currentValue)=>accumulator+currentValue;

         const totalPrice = price.reduce(reducerofPrice,0);

        // global variable

        let Product;

        const cartProductIncrease=(cartProduct)=>{
            // console.log(cartProduct);
            Product=cartProduct;
            Product.qty=Product.qty+1;
            Product.TotalProductPrice=Product.qty*Product.price;
            // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('Incremented');
                    })
                }
                else{
                    console.log('user is not logged in to increment');
                }
            })
        }

           const cartProductDecrease=(cartProduct)=>{
              Product=cartProduct;
              if(Product.qty > 1){
                Product.qty=Product.qty-1;
                Product.TotalProductPrice=Product.qty*Product.price;
                 // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('Decremented');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
              }
           }

           // for payment
           
 // charging payment
 const navigate = useNavigate();
 const handleToken = async(token)=>{
    //  console.log(token);
    const cart = {name: 'All Products', totalPrice}
    const response = await axios.post('http://localhost:8080/checkout',{
        token,
        cart
    })
    console.log(response);
    let {status}=response.data;
    console.log(status);
    if(status==='success'){
        navigate('/');
        toast.success('Your order has been placed successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        
        const uid = auth.currentUser.uid;
              const carts = await fs.collection('Cart ' + uid).get();
              for(var snap of carts.docs){
                  fs.collection('Cart ' + uid).doc(snap.id).delete();
              }
            }

            else{
                alert('something is wrong');
            }
           }

  return (
    <>
     <Navbar user={user} />           
     <br></br>
     {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box cart'>
                        <CartProducts cartProducts={cartProducts} 
                        cartProductIncrease={cartProductIncrease}
                        cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>{totalPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout
                            stripeKey='pk_test_51N0GUKSCz8smKIGjHNGMAI0ky32nUIQ0YPjZoHdarejemdDeTOy3cSTEQowpv2SzCiZdbtGsfC4MXWWHalBJUV2U00SBv3xzGU'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice * 100}
                        ></StripeCheckout> 
                        <h6 className='text-center'
                        style={{marginTop: 7+'px'}}>OR</h6>
                        <button className='cod' 
                        onClick={()=>triggerModal()}>Cash on Delivery</button>                                                                                                                                            
                    </div>                                    
                </div>
                
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'><h3 className='npt'>No products to show</h3></div>
            )}     

            {showModal===true&&(
                <Modal TotalPrice={totalPrice} totalQty={totalQty}
                    hideModal={hideModal}
                />
               
            )}  
             {/* <Footer/>     */}
    </>
  )
}
