import { database } from "../Config";

export const updateProduct = async (productId, updatedData)  => {
    
  try {


    await database.ref(`products/${productId}`).update(updatedData);

  } catch (error) {
    console.error('Error updating product:', error);
    // Handle error if needed
  }
};

export const addOrder = async (orderId,userId,productData) =>{
    try {
        await database.ref(`orders/${orderId}`).update({userId,productData});
    } catch (error) {
        console.error('Error Ordering product:', error);
    }
}

export const checkUserAlreayOrderOrNot =  async (userId,productName) => {

    try {
     const response = await database.ref("orders").once("value")
    
     if(response.exists()){
        let newresponse = response.val()

        let newArr =[]
        Object.keys(newresponse).forEach(item => {
            if(newresponse[item].userId === userId && newresponse[item].productData.productName === productName){
                newArr.push({productDetail:newresponse[item],orderId:item})

            }else{
              newArr.push("No New Element")
            }
        } )
        return newArr[0]
     }
     return false
      

    } catch (error) {
            console.log(error)
    }   
}