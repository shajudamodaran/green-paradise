export const calculateSubTotal =(localData) =>{

    let subTotal=0

    localData.map((element)=>{

        subTotal=subTotal+(element.quantity*element.rate)

    })

    return subTotal


}


export const calculateNetTotal = (subTotal,discounts,taxes) =>{

    let netTotal=0
   
    let totalTax=0
    let totalDiscount=0

    taxes?taxes.map((element)=>{

        totalTax=totalTax+(subTotal*(element.rate/100))

    }):null

    discounts?discounts.map((element)=>{

        totalDiscount=totalDiscount+((subTotal+totalTax)*(element.rate/100))

    }):null

    console.log(subTotal,totalTax,totalDiscount);

    return ((subTotal+totalTax)-totalDiscount)

   

}



export const calculateDiscountPrice = (subTotal,discount,taxes) =>{

    let totalDiscount=0
    let totalTax=0

    taxes?taxes.map((element)=>{

        totalTax=totalTax+(subTotal*element.rate/100)

    }):null


    return ((subTotal+totalTax)*(discount/100))

   
}