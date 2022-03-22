import { Appwrite } from 'appwrite';
import { useEffect, useState } from "react";

const Home = () => {
  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setproductImage] = useState('');
  const [productList, setProductList] = useState([]);

  // Init your Web SDK
  const sdk = new Appwrite();

  sdk
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('6239ecdd936113de4ec2') // Your project ID
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
    createAnonymousSession(),
    listProducts()
  }, [])
  
    
    
  const listProducts = async () => {
    let response = await sdk.database.listDocuments('6239ed08a0e1d12624f5');
    setProductList(response.documents)
  }

  const handleProductCatalog = async () => {

    try{
      let promise = await sdk.database.createDocument('6239ed08a0e1d12624f5', 'unique()', {
        "productName" : productName,
        "productPrice": productPrice,
        "productImage": productImage
      });
      
      setProductName('');
      setProductPrice('');
      setproductImage('');
    
      alert('your job item has been successfully saved')
    
      listProducts()

    }catch(error){
      console.log(error)
    }
    

      
  }


  const handleDelete = async (documentid) => {
   await sdk.database.deleteDocument('6239ed08a0e1d12624f5', documentid);
    alert("item have been deleted successfully")
    listProducts()
  }


  return (
    <div className='product-catalog'>
      <div className="product-container mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={1}
                    value = {productName}
                    onChange= {(e)=> setProductName(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''} />
                </div>
                
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Link to Product Image
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="company-website"
                      id="company-website"
                      value={productImage}
                      onChange= {(e)=> setproductImage(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={productPrice}
                    onChange= {(e)=> setProductPrice(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />

                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div
                  type="submit"
                  className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleProductCatalog}
                >
                  Save
                </div>
              </div>

            </div>
          </div>
        </form>

      </div>
      <div class="bg-white">
        <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 class="sr-only">Products</h2>
          {
            productList ? (
              <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {
                  productList.map(({productName, productImage, productPrice, $id}) => (
                    <a href="#" class="group" id={$id}>
                      <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img src={productImage} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-full object-center object-cover group-hover:opacity-75" />
                      </div>
                      <h3 class="mt-4 text-sm text-gray-700">{productName}</h3>
                      <p class="mt-1 text-lg font-medium text-gray-900">${productPrice}</p>
                      <div
                        type="submit"
                        className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=> handleDelete($id)}
                      >
                      Delete
                    </div>
                    </a>
                  ))
                }
              </div>
            ) : null
          }
            



        </div>
     </div>
    </div>
  )
}

export default Home;