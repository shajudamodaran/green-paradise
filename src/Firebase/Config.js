

export let dummyInvoice=[
  {
    id:"SH1234",
    client:"IIB Education Pvt .Ltd",
    isPayd:null,
    date:null,
    total:23600,
    items:[
      {
        id:0,
        service:"Lorem ipsum dolor sit amet.	",
        quantity:1,
        rate:40000,
        total:40000,
        comment:"Lorem ipsum dolor sit amet consectetur",
      },
      {
        id:1,
        service:"Lorem ipsum dolor sit amet.	",
        quantity:1,
        rate:40000,
        total:40000,
        comment:"Lorem ipsum dolor sit amet consectetur",
      }
    ],
    discounts:[
      {
        name:"Newyear discount",
        rate:50
      }
    ],
    tax:[
      {
        name:"GST",
        rate:18
      }
    ]
  },
  {
    id:"SH1235",
    client:"IIB Education Pvt .Ltd",
    isPayd:true,
    date:null,
    items:[
      {
        id:0,
        service:"Lorem ipsum dolor sit amet.	",
        quantity:1,
        rate:40000,
        total:40000,
        comment:"Lorem ipsum dolor sit amet consectetur",
      },
      {
        id:1,
        service:"Lorem ipsum dolor sit amet.	",
        quantity:1,
        rate:40000,
        total:40000,
        comment:"Lorem ipsum dolor sit amet consectetur",
      }
    ],
    discounts:[
      {
        name:"Newyear discount",
        rate:50
      }
    ],
    tax:[
      {
        name:"GST",
        rate:18
      }
    ]
  }
]