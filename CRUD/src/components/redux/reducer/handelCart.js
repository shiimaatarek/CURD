const cart=[];

const handelCart =(state=cart,action)=>{
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            //check if exist 
            const exist= state.find((x)=> x.id === product.id);
            if(exist){
                //icrease the quantity
                return state.map((x)=>
                x.id===product.id ? {...x, qyt: x.qyt+1}:x);
            }else{
                const product=action.payload;
                return[
                    ...state,
                    {
                        ...product,
                        qyt:1,
                    }
                ]
            }
            // break;
            case "DELITEM":
                const exist1=state.find((x)=> x.id === product.id);
                if(exist1.qyt===1){
                    return state.filter((x)=> x.id !== exist1.id);

                }else{
                    return state.map((x)=>
                    x.id===product.id ? {...x,qyt: x.qyt-1} :x);
                }
    
        default:
            return state;
            // break;
    }

}
export default handelCart;