import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, clearCart, decrease, remove } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { addFav } from '../store/favSlice';
import axios from 'axios';
//import { useState } from 'react';

function Cart() {

  // @ts-ignore
  const myCart = useSelector(state => state.cart);

  // var totalPriceItems = 0;

  // totalPriceItems +=  myCart.cartItems.price * myCart.cartItems.cartQuantity;



  const [data, setdata] = useState({

  title: "",
  quantity: "",
  totalPrice: "",
  phone: "",
  firstName: "",
  lastName: "",
  email: "",
  address: ""

});

  const handleSubmit = async(e) => {

    e.preventDefault();
    console.log(data);

    try{
        let res = await axios.post("http://localhost:8000/cart", data, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }

        });

        if(res.status===200){
            alert('Order Placed Successfully!!');
           // navigate('/login');
        }

        else{
            
            console.log("Not Registered", res);
        }
    }

    catch{
        alert('Error');
    }

}

  const dispatch = useDispatch();

    const heading = {
        textAlign:"center",
        marginTop:"20px"
        
    }

    // @ts-ignore
    // const myCart = useSelector(state => state.cart);

  
    const decreaseCart = (item) => {

      dispatch(decrease(item));

    }

    const increaseCart = (item) => {

      dispatch(add(item));
      
    }

    const removeItems = () => {

      dispatch(clearCart());

    }

    const removeToCart = (item) => {

      dispatch(remove(item));

    }

    const [user, setuser] = useState({
  
      id:"",
      title:"",
      description:"",
      image:"",
      price:"",
      
    
    })

    
    const showdetail = (id) => {
    
      fetch('https://fakestoreapi.com/products/'+id)
      .then((response) => response.json())
      .then((res) => setuser(res));

    
    }

    const addTofav = (user) => {

      dispatch(addFav(user));
  
    }
    

    
    var totalCartPrice = 0;

    var totalCartItems = 0;

    const reversetable = [...myCart.cartItems].reverse();

    
  
  return (

    <>
    {/* <div style={{width:"100%", height:"100vh", backgroundColor:"yellow"}}> */}

    <div style={{width:"100%"}}>
    

        <h2 
// @ts-ignore
        style={heading}>Shopping Cart Summary</h2>

        {myCart.cartItems.length === 0 ? (

          <h3 style={{textAlign:"center"}}>Your Cart is Empty</h3>

        ) : (

        <table className="table" style={{marginTop:"30px"}}>
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total Price</th>
      <th scope="col">Remove</th>
      
    </tr>
  </thead>
  <tbody>

  {reversetable.map((item, index) => {

    totalCartPrice +=  item.price * item.cartQuantity;

    totalCartItems +=  item.cartQuantity;

    console.log("totalCartPrice:", totalCartPrice);
  
   return (
    <tr key={index}>
      <td>
        <p style={{marginLeft:"10px"}}>{index + 1}</p>
      </td>

      <td>

        <div onClick={(e) => showdetail(item.id)} data-toggle="modal" data-target="#exampleModal" style={{width:"360px"}}>
        <img style={{height:"40px", width:"40px", marginRight:"20px", cursor:"pointer"}} src={item.image} alt='title'/> 
        <p style={{width:"300px", float:"right", cursor:"pointer"}}>
        {item.title}
        </p>
        </div>
      </td>

      <td>${item.price} USD</td>

      <td>

        {item.cartQuantity === 1 ? (

        <button className='btn btn-primary' style={{marginRight:"10px", fontWeight:"bold"}} onClick={() => decreaseCart(item)}>
          <i className='fa fa-trash' style={{color:"white"}}/>
        </button>
        ) : (
          <button className='btn btn-primary' style={{marginRight:"10px", fontWeight:"bold"}} onClick={() => decreaseCart(item)}>-</button>  
        )}

         {item.cartQuantity}
          
        <button className='btn btn-primary' style={{marginLeft:"10px", fontWeight:"bold"}} onClick={() => increaseCart(item)}>+</button><br></br>

        
        </td>

      <td>${item.price * item.cartQuantity} USD</td>

      <td>
      

           <button className='btn btn-danger' style={{backgroundColor:"red", fontWeight:"bold"}} onClick={() => removeToCart(item)}>Remove</button>
              
      </td>

    </tr>

    )})}
    
  </tbody>

</table>

)}

{myCart.cartItems.length === 0 ? (

<div className='text-center'>
<Link to="/">
<button className='btn btn-primary mt-3' 
style={{fontWeight:"bold"}}>Continue Shopping</button>
</Link>
</div>

) : (

<div className='text-right'>

<button className='btn btn-primary' 
style={{fontWeight:"bold", float:"left", marginLeft:"20px"}}
onClick={() => removeItems()}>Clear Cart</button>

<div className='float-end' style={{width:"400px", height:"150px"}}>

<div style={{marginTop:"10px"}}>
<h4 style={{marginLeft:"10px", float:"left"}}>Total Items :</h4>

{totalCartItems === 1 ? (

<h4 style={{color:"red", float:"right", marginRight:"65px"}}>{totalCartItems} Item</h4>
) : (

  <h4 style={{color:"red", float:"right", marginRight:"65px"}}>{totalCartItems} Items</h4>

)}

</div> <br></br>

<div>
<h4 style={{marginLeft:"10px", float:"left"}}>Total Price :</h4>
<h4 style={{color:"red", float:"right", marginRight:"20px"}}> ${totalCartPrice} USD</h4>
</div><br></br>

<div className='text-center'>
    {totalCartItems === 1 ? (

<button className='btn btn-primary mt-3' data-toggle="modal" data-target="#modalContactForm" style={{fontWeight:"bold", width:"370px"}} onClick={() => console.log('Get All Products:', myCart)}>Proceed to buy {totalCartItems} Item</button>
) : (

  <>

  <button className='btn btn-primary mt-3' data-toggle="modal" data-target="#modalContactForm" style={{fontWeight:"bold", width:"370px", marginBottom:"5px"}} onClick={() => console.log('Get All Products:', myCart)}>Proceed to buy {totalCartItems} Items</button>

  <Link to="/">
  <button className='btn btn-primary' style={{fontWeight:"bold", width:"370px", marginBottom:"10px"}}>Continue Shopping</button>
  </Link>
  </>

)}

</div>

</div>

</div>

)}


<div className="modal fade" id="modalContactForm" 
// @ts-ignore
tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div className="modal-dialog" role="document">

  <form onSubmit={handleSubmit}>

    <div className="modal-content">
      <div className="modal-header text-center">
        <h4 className="modal-title w-100 font-weight-bold">Place Your Order</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      
      <div className="modal-body mx-2">

        {myCart.cartItems.map((item, index) => {

          return(
          
       
            <>



      <div className="md-form mb" key={index}>
          <input style={{borderRadius:"20px", display:"none"}} name='title' type="text" id="form34" className="form-control validate" placeholder='Phone' 
          value={item.title} onChange={(e)=>setdata({...data, title:e.target.value})}/>
          <input style={{borderRadius:"20px", display:"none"}} name='quantity' type="text" id="form34" className="form-control validate" placeholder='Phone' 
          value={item.cartQuantity} onChange={(e)=>setdata({...data, quantity:e.target.value})}/>
          

        </div>

        </>

)})} 
        

        <div className="md-form mb">
       
        <input style={{borderRadius:"20px", display:"none"}} name='totalPrice' type="text" id="form34" className="form-control validate" placeholder='Phone' 
          value={totalCartPrice} onChange={(e)=>setdata({...data, totalPrice:e.target.value})}/>
        </div>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} name='phone' type="text" id="form34" className="form-control validate" placeholder='Phone' 
          onChange={(e)=>setdata({...data, phone:e.target.value})}/>
        </div><br></br>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} name='firstName' type="text" id="form29" className="form-control validate" placeholder='First Name' 
          onChange={(e)=>setdata({...data, firstName:e.target.value})}/>
        </div><br></br>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} name='lastName' type="text" id="form32" className="form-control validate" placeholder='Last Name'
          onChange={(e)=>setdata({...data, lastName:e.target.value})}/>
        </div><br></br>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} name='email' type="email" id="form31" className="form-control validate" placeholder='Email'
          onChange={(e)=>setdata({...data, email:e.target.value})}/>
        </div><br></br>

        <div className="md-form">
          <textarea style={{borderRadius:"20px"}} name='address' type="text" id="form8" className="md-textarea form-control" 
// @ts-ignore
          rows="4" placeholder='Address' onChange={(e)=>setdata({...data, address:e.target.value})}></textarea>
        </div>

      </div>
      <div className="modal-footer d-flex justify-content-center">
        <button name='submit' className="btn btn-danger" style={{width:"200px", fontWeight:"bold", backgroundColor:"red", borderRadius:"20px"}}>Buy Now</button>
      </div>
      
    </div>

    </form>

  </div>
</div>



<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
  
    <div className="modal-content">
    
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{user.title}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">


      <div>            

<img style={{width:"180px", borderRadius:"10px", height:"180px", cursor:"pointer", marginLeft:"140px"}} src={user.image} alt='title'/>
 
 <p style={{textAlign:"center", fontWeight:"bold", marginTop:"10px"}}>${user.price} USD</p>

<p><span style={{fontWeight:"bold"}}>Description: </span>{user.description}</p>

<div className='text-center'>
<button className='btn btn-primary' data-dismiss="modal" aria-label="Close" onClick={() => addTofav(user)}>Add to favorites</button>
<button className='btn btn-primary' data-dismiss="modal" aria-label="Close" style={{width:"120px", marginLeft:"10px"}}>Back to cart</button>

</div>

</div>


        
      </div>
      
    </div>
   
  </div>
</div>













    </div>
    </>
  )
}

export default Cart;

