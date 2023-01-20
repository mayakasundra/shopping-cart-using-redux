const INIT_STATE = {
    carts:[]
  
};
export const cartReducer =(state=INIT_STATE, action)=>{
    switch(action.type){
        
        case "ADD_CART" :
            // console.log(state);
            return {
                ...state,
             
                carts:[...state.carts,action.payload] //Existing data + new data
            
            }
        
            default :
            return  state
    }

}