import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Div = styled.div `
  max-width: 600px;
  margin: 0 auto;
`;

const Back = styled(Link) `
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: #333;
`;

const Title = styled.h1`
  text-align: center;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

const Form = styled.form`
  input,
  textarea,
  button {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    margin: 10px 0 10px 0;
  }

  input,
  textarea,
  button,
  label {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  `;

const BtnDiv = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    let objects = { title, category, price, stock, description, image };

    try {
      fetch("https://product-api-production-3a61.up.railway.app/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(objects),
      });
    } catch (error) {
      console.log(error);
    }

    navigate("/admin");
  };
 
    
  return (
      <Div>

        <Title id='create-h1'>Create product</Title>

        <Form onSubmit={handlesubmit}>

                   {/* TITLE */}
          <div>
            <label>Title:</label>
            <input  
              value={title} 
              onChange={e=>setTitle(e.target.value)} 
              type="text" 
              name="title"
              required
            />
          </div>

                    {/* CATEGORY */}
          <div>
              <label>Category:</label>
              <input  
                value={category} 
                onChange={e=>setCategory(e.target.value)}  
                type="text" 
                name="category"
                required
              />
          </div>
                    {/* PRICE */}
          <div>
              <label>Price:</label>
              <input  
                value={price} 
                onChange={e=>setPrice(e.target.value)} 
                type="number"  
                name="price"
                required
              />
          </div>
                     {/* STOCK */}
          <div>
              <label>Stock:</label>
              <input  
                value={stock} 
                onChange={e=>setStock(e.target.value)} 
                type="number" 
                name="stock"
                required
              />
          </div>           
                    {/* DESCRIPTION */} 
          <div>
              <label>Description:</label>
              <textarea 
                value={description} 
                onChange={e=>setDescription(e.target.value)} 
                type="text"  
                name="description"
                rows="12"
                required
              />
          </div>
                    {/* IMAGE INPUT */}
          <div>
              <label>URL for image:</label>
              <input   
                type="url" 
                className='img-input'
                placeholder="https://example.com"
              />
          </div>

          <BtnDiv> 
              <motion.button whileHover={{ scale: 1.01, background: 'skyblue' }} type='submit'>Create</motion.button>
              <Back className='link' to="/admin">&#8592; Back </Back>
          </BtnDiv>
        </Form>
    </Div>
  )
}
export default CreateProduct
