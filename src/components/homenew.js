// @ts-nocheck
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';
import { addFav } from '../store/favSlice';
//import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import { Modal } from 'react-bootstrap';

function Homenew() {

  const navigate= useNavigate();

 const [value, setvalue] = useState({
     
  title:"",
  description:"",
  image:"",
  price:""
  

})


const showvalue = (id) => {

  fetch('https://fakestoreapi.com/products/'+id)
  .then((response1) => response1.json())
  .then((res1) => setvalue(res1));

}
 


  const [detail, setdetail]= useState({

    

    title:' ',
    price:' ',
    phone:'',
    firstName:'',
    lastName:'',
    email:'',
    address:''
    
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(detail);
    console.log("username: ", value.title);
    

    // const { username, password } = defaultValues;

    // // Do something with the default form data
    // console.log('Default Username:', username);
    // console.log('Default Password:', password);

    

    try {
      const resp= await axios.post('http://localhost:2000/api/auth/register',detail, value, {
        method: 'POST',
        body: JSON.stringify({
           body: detail, value
          

        }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         }

         
      });

      if(resp.status===201){
          alert(`You have ordered ${value.title} successfully!!`);
          navigate('/');
          
          
      }else{
          console.log("Not registered",resp);
      }
  } catch (error) {
      console.log(error);
  }

  }

  const [data, setdata] = useState([]);
  const url = "https://fakestoreapi.com/products";

  //const [show, setShow] = useState(false);

  
  const dispatch = useDispatch();


  useEffect(() => {
    axios.get(url)
    .then((response) => {
      setdata(response.data);
    })

    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);




  const [user, setuser] = useState({
     
    title:"",
    description:"",
    image:"",
    price:""
    

  })

  // const defaultValues = {
  //   username: user.title,
  //   password: user.price
  // };


  const showdetail = (id) => {

    fetch('https://fakestoreapi.com/products/'+id)
    .then((response) => response.json())
    .then((res) => setuser(res));

  }

  
  const addToCart = (user) => {

    dispatch(add(user));

  }

  const addTofav = (user) => {

    dispatch(addFav(user));

  }




  // const [item, setitem] = useState([])

  // useEffect(() => {
  //   axios.get(url)
  //   .then((product) => {
  //     setitem(product.item);
  //   })

  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, []);


 


  return (

    <>
    <div style={{overflowX:"hidden", marginTop:"40px"}}>




{/* <div style={{backgroundColor:"black"}}> */}
       {/* <div style={{marginTop:"40px", display:"block", overflowX:"hidden"}}> */}
       
      <div style={{marginLeft:"50px"}} className="row">

      {data.map((item, index) => (

              <div style={{border: "1px solid #ffffff", marginTop:"10px", marginLeft:"25px"}} className="col-md-2" key={index}>
              <div style={{margin:"auto"}} className="card-md-3">
                {/* <img src="https://picsum.photos/200?random=${post.id" className="card-img-top" alt={item.title} /><br></br><br></br> */}
                <img style={{width:"100%", borderRadius:"10px", height:"210px", marginTop:"10px", cursor:"pointer"}} src={item.image} alt='title' onClick={(e) => showdetail(item.id)} data-toggle="modal" data-target="#exampleModal"/><br></br><br></br>
                

                
                 {/* <img style={{width:"100%", borderRadius:"10px", height:"210px", marginTop:"10px", cursor:"pointer"}} src={item.image} alt={item.title}/><br></br><br></br> */}
                <div style={{color:"black", cursor:"pointer"}} className="card-body">
                {/* <div style={{color:"black", cursor:"pointer"}} className="card-body"> */}
                  {/* <p className="card-title"><span style={{color:"red", fontWeight:"bold"}}>Id:</span> {item.id}</p> */}
                  {/* <p className="card-title"><span style={{color:"yellow"}}>User Id:</span> {item.userId}</p> */}
                  {/* <p className="card-title">{item.title.substring(0,15)}</p> */}
                  <p style={{textAlign:"center", fontWeight:"bold"}} className="card-title" onClick={(e) => showdetail(item.id)} data-toggle="modal" data-target="#exampleModal">{item.title.substring(0,20)}</p>
                  <p style={{fontSize:"13px", textAlign:"center", fontWeight:"bold", color:"#4682B4"}} data-toggle="modal" data-target="#exampleModal" onClick={(e) => showdetail(item.id)}>See more details</p><br></br>
                  <p style={{textAlign:"center"}} className="card-title">${item.price} USD</p>

                  <div className='text-center'>
                  <button className='btn btn-primary' style={{width:"120px"}} data-toggle="modal" data-target="#modalContactForm" onClick={(e) => showvalue(item.id)}>Buy Now</button><br></br><br></br>
                  </div>
                  {/* <p className="card-title"><span style={{color:"red", fontWeight:"bold"}}>Description:</span> {item.description.substring(0,20)}</p> */}
                  {/* <p style={{textDecoration: "none", color: "blue", fontWeight: "bold", cursor: "pointer"}}>Read more</p> */}
                
                </div>
              </div>
            </div>
      ))}

      

            </div>
            {/* </div> */}

    

            
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
<button className='btn btn-primary' data-dismiss="modal" aria-label="Close" style={{marginLeft:"10px"}} onClick={() => addTofav(user)}>Add to favorites</button>

</div>

</div>


        
      </div>
      
    </div>
   
  </div>
</div>






<div className="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">


      <form action='/cart' method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
      <div className="modal-header text-center">
        <h4 className="modal-title w-100 font-weight-bold">Place Your Order</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body mx-2">

      <div className="md-form mb">
          <input name='title' style={{borderRadius:"20px"}} type="text" id="form34" className="form-control validate" placeholder='Title' 
          value={value.title} onChange={(e)=>setdetail({...detail, title:e.target.value})} readOnly /> 
          <input name='price' style={{borderRadius:"20px"}} type="text" id="form34" className="form-control validate" placeholder='Price' 
          value={value.price} readOnly /> 

        </div>


        <div className="md-form mb">
          <input name='phone' style={{borderRadius:"20px"}} type="text" id="form34" className="form-control validate" placeholder='Phone'
          value={detail.phone} onChange={(e)=>setdetail({...detail, phone:e.target.value})} required/>
        </div><br></br>

        <div className="md-form mb">
          <input name='firstName' style={{borderRadius:"20px"}} type="text" id="form29" className="form-control validate" placeholder='First Name'
          value={detail.firstName} onChange={(e)=>setdetail({...detail, firstName:e.target.value})} required/>
        </div><br></br>

        <div className="md-form mb">
          <input name='lastName' style={{borderRadius:"20px"}} type="text" id="form32" className="form-control validate" placeholder='Last Name'
          value={detail.lastName} onChange={(e)=>setdetail({...detail, lastName:e.target.value})} required/>
        </div><br></br>

        <div className="md-form mb">
          <input name='email' style={{borderRadius:"20px"}} type="email" id="form31" className="form-control validate" placeholder='Email'
          value={detail.email} onChange={(e)=>setdetail({...detail, email:e.target.value})} required/>
        </div><br></br>

        <div className="md-form">
          <textarea name='address' style={{borderRadius:"20px"}} type="text" id="form8" className="md-textarea form-control" rows="4" placeholder='Address'
          value={detail.address} onChange={(e)=>setdetail({...detail, address:e.target.value})} required></textarea>
        </div>

      </div>
      <div className="modal-footer d-flex justify-content-center">
        <button className="btn btn-danger" style={{width:"200px", fontWeight:"bold", backgroundColor:"red", borderRadius:"20px"}}>Buy Now</button>
      </div>

      </form>

    </div>
  </div>
</div>

            


            
      
    </div>
    

    

   </>
  

     




  )
}

export default Homenew;
