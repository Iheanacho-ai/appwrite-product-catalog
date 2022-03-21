import { Appwrite } from 'appwrite';
import { useEffect, useState } from "react";

const Home = () => {
  // Init your Web SDK
  const sdk = new Appwrite();

  sdk
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('6237995248e306dcf6ad') // Your project ID
  ;

    //Creating anonymous Session

  const createAnonymousSession = async() => {
      try{
          await sdk.account.createAnonymousSession();

      }catch(err){
          console.log(err)
      }
      
  }

  useEffect(()=> {
    console.log(sdk.account.get())
      createAnonymousSession()
  }, [])
  
    
    

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setproductDesc] = useState('');
  const [productList, setProductList] = useState([]);


  const listProducts = async () => {
    let response = await sdk.database.listDocuments('623799a973b695306245');
    setProductList(response.documents)
  }

  const handleProductCatalog = async () => {

    try{
      let promise = await sdk.database.createDocument('623799a973b695306245', 'unique()', {
        "productName" : productName,
        "productPrice": productPrice,
        "productDesc": productDesc
      });
      
      setProductName('');
      setProductPrice('');
      setproductDesc('');
    
      alert('your job item has been successfully saved')
    
      listProducts()

    }catch(error){
      console.log(error)
    }
    

      
  }


  const handleDelete = async (documentid) => {
   await sdk.database.deleteDocument('623799a973b695306245', documentid);
    alert("item have been deleted successfully")
    listProducts()
  }


  return (
    <div className='product-catalog'>
       <h3 className='product-catalog-h3'>E-commerce Product Catalog</h3> 
      <div className="product-catalog-container">
        <div className="product-catalog-input">
          <form action="">
            <label htmlFor="input">Product Name</label>
            <input type="text" name="Product Name" className='txt-field' value={productName} onChange= {(e)=> setProductName(e.target.value)}/> 
            <label htmlFor="input">Price</label>
            <input type="number" className='num-field' value={productPrice} onChange= {(e)=> setProductPrice(e.target.value)} />
            <label htmlFor="input">Product Description</label>
            <input type="text"  className='desc-field' value={productDesc} onChange= {(e)=> setproductDesc(e.target.value)} />
            {/* <input type="submit" value="Create Product" className='create-product-btn' onClick={handleProductCatalog} /> */}
            <div className='btn' onClick={handleProductCatalog}>Add Product</div>
          </form>
        </div>
      </div>
      <div className="product-list">
        <div className="product-list-container">
          {
            productList ? (
              <div className="product-item-container">
                {
                  productList.map(({productName, productPrice, productDesc, $id}) => (
                    <div className="product-item" id = {$id}>
                      <div className="product-item-desc">
                        <div>{productDesc}</div>
                      </div>
                      <div className="summary">
                        <p>{productName}</p>
                        <p>${productPrice}</p>
                      </div>
                      <div className="btn" onClick={()=> handleDelete($id)}>Delete Product</div>
                    </div>
                  ))
                }
              </div>
            ) : <div>Create Product</div>
          }
        </div>
      </div>

    </div>
  )
}

export default Home;