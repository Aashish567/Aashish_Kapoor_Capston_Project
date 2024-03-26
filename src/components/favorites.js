import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearFav, remove } from '../store/favSlice';
import { Link } from 'react-router-dom';
import { add } from '../store/cartSlice';

function Favorites() {

  const dispatch = useDispatch();

  const myFav = useSelector(state => state.fav);

  //  const totalFavourites = myFav.favItems.reduce((total, item) => total + item.favQuantity, 0);

  const totalFavourites = myFav.favItems.length;
  

  const heading = {
    textAlign:"center",
    marginTop:"20px"
    
}


const removeItems = () => {

  dispatch(clearFav());

}

const removeTofav = (item) => {

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

const addToCart = (user) => {

  dispatch(add(user));

}

const reversetable = [...myFav.favItems].reverse();

    // var totalfavPrice = 0;

    // var totalfavItems = 0;

    

  return (

    <>
    <div style={{width:"100%"}}>

    <h2 style={heading}>Your Favourite Items</h2>

    {myFav.favItems.length === 0 ? (

      <h3 style={{textAlign:"center"}}>No Favourites Items</h3>

    ) : (

    <table className="table" style={{marginTop:"30px"}}>
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Remove</th>
      <th scope="col">Buy Now</th>
      
    </tr>
  </thead>
  <tbody>

  {reversetable.map((item, index) => {

    // totalfavPrice +=  item.price * item.favQuantity;

    // totalfavItems +=  item.favQuantity;

    
  
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

      {/* <td>${item.price * item.favQuantity} USD</td> */}

      <td>
    
        <button className='btn btn-danger' style={{backgroundColor:"red", fontWeight:"bold"}} onClick={() => removeTofav(item)}>Remove</button>
              
      </td>

      <td>
    
        <button className='btn btn-primary' style={{fontSize:"15px", fontWeight:"bold"}} data-toggle="modal" data-target="#modalContactForm" onClick={(e) => showdetail(item.id)}>Buy Now</button>
              
      </td>

    </tr>

    )})}
    
  </tbody>

</table>

)}

{myFav.favItems.length === 0 ? (
  
  <div className='text-center'>

  <Link to="/">
  <button style={{fontWeight:"bold"}} className='btn btn-primary mt-3'>Click to Select</button>
  </Link>
  </div>
) : (

<>


<div style={{width:"400px", height:"100px"}} className='float-end'>

<h4 style={{marginLeft:"20px"}}>Total Favorites Items :

{totalFavourites === 1 ? (

<span style={{color:"red", marginLeft:"20px"}}>{totalFavourites} Item</span>

) : (

<span style={{color:"red", marginLeft:"20px"}}>{totalFavourites} Items</span>

)}

</h4>

<div className='text-center'>

<Link to="/">
<button className='btn btn-primary' style={{fontWeight:"bold", marginBottom:"5px", width:"350px"}}
>Add More Items</button>
</Link>

<button className='btn btn-primary' style={{fontWeight:"bold", marginBottom:"10px", width:"350px"}}
onClick={() => removeItems()}>Clear All Favorites</button>

</div>

</div>
</>

)}



<div className="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header text-center">
        <h4 className="modal-title w-100 font-weight-bold">Place Your Order</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body mx-2">

      <div className="md-form mb">
          <input style={{borderRadius:"20px", display:"none"}} type="text" id="form34" className="form-control validate" placeholder='Phone' value={user.title}/>
          <input style={{borderRadius:"20px", display:"none"}} type="text" id="form34" className="form-control validate" placeholder='Phone' value={user.price}/>
        </div>


        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} type="text" id="form34" className="form-control validate" placeholder='Phone'/>
        </div><br></br>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} type="email" id="form29" className="form-control validate" placeholder='First Name'/>
        </div><br></br>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} type="text" id="form32" className="form-control validate" placeholder='Last Name'/>
        </div><br></br>

        <div className="md-form mb">
          <input style={{borderRadius:"20px"}} type="email" id="form31" className="form-control validate" placeholder='Email'/>
        </div><br></br>

        <div className="md-form">
          <textarea style={{borderRadius:"20px"}} type="text" id="form8" className="md-textarea form-control" rows="4" placeholder='Address'></textarea>
        </div>

      </div>
      <div className="modal-footer d-flex justify-content-center">
        <button className="btn btn-danger" style={{width:"200px", fontWeight:"bold", backgroundColor:"red", borderRadius:"20px"}}>Buy Now</button>
      </div>
    </div>
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


      {/* <div style={{marginTop:"30px"}}> */}

      <div>

            

<img style={{width:"180px", borderRadius:"10px", height:"180px", cursor:"pointer", marginLeft:"140px"}} src={user.image} alt='title'/>
 
 {/* <h4 style={{textAlign:"center", fontWeight:"bold", marginTop:"10px", color:"black"}}>wdasfsd</h4> */}
 
 <p style={{textAlign:"center", fontWeight:"bold", marginTop:"10px"}}>${user.price} USD</p>


<p><span style={{fontWeight:"bold"}}>Description: </span>{user.description}</p>

<div className='text-center'>
<button className='btn btn-primary' data-dismiss="modal" aria-label="Close" style={{width:"120px"}} onClick={() => addToCart(user)}>Add to cart</button>
<button className='btn btn-primary' data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modalContactForm" style={{marginLeft:"10px", width:"110px"}} onClick={(e) => showdetail(user.id)}>Buy Now</button>
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

export default Favorites;
