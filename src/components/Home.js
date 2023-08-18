import React,{useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import {auth,fs} from '../Config/Config'
import { Footer } from './Footer'
import ban from '../assets/ban.jpg';
import { Link } from "react-router-dom";
import Marquee from 'react-fast-marquee'

export const Home = (props) => {

    // getting current user uid
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

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

    const year = new Date().getFullYear()

    const user = GetCurrentUser();
    // console.log(user);
    
    // state of products
    const [products, setProducts]=useState([]);

    // getting products function
    const getProducts = async ()=>{
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  

    // globl variable
    let Product;

    // add to cart
    const addToCart = (product)=>{
        if(uid!==null){
            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            props.history.push('/login');
        }
        
    }
    
    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>           
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <div className="hero__content">
                  <p className="hero__subtitle">Trending Product in {year}</p>
                  <h2 className="make"><Marquee direction="right" >Deal of the day</Marquee></h2>
                  <p className="lor">
                    15.54 cm (6.1-inch) Super Retina XDR display featuring
                    Always-On and ProMotion Dynamic Island, a magical new way to
                    interact with iPhone 48MP Main camera for up to 4x greater
                    resolution Cinematic mode now in 4K Dolby Vision up to 30
                    fps Action mode for smooth, steady, handheld videos All-day
                    battery life and up to 23 hours of video playback Vital
                    safety technology — Crash Detection calls for help when you
                    can’t A16 Bionic, the ultimate smartphone chip. Superfast 5G
                    cellular Industry-leading durability features with Ceramic
                    Shield and water resistance iOS 16 offers even more ways to
                    personalise, communicate and share</p>
                    <p className="lor1">Flat INR 3000 Instant Discount on HDFC Bank Debit CardTxn. Min purchase value INR 77940 
                    5% Instant Discount up to INR 250 on HSBC Cashback Card Credit Card Transactions. Minimum purchase value INR 1000 
                    </p>
                  <img className="ban" src={ban} alt="" />
                  <p className="lor-lf">Iphone 14 Pro (128 GB) </p>
                  <button whileTap={{ scale: 1.2 }} className="buy__btn">
                    <Link to="/cart">SHOP NOW</Link>
                  </button>
                </div> 
                <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart}  />
                        
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='pwait'>Please wait....</div>
            )}
            <div className='Footer'><Footer/></div> 
        </>
    )
}