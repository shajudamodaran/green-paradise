
let pattern = "GP"
let starting = 1000


export const generateInvoiceId = (length) =>{

    return `${pattern}${starting+length}`

}