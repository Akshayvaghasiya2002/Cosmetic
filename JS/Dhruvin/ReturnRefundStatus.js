const userId = localStorage.getItem("userId")
const batchId = localStorage.getItem("MyBatchId")

async function getOrderData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log("json" , json);

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter);
    document.getElementById("ds_refund_id").innerHTML = filter?.batchId
    document.getElementById("ds_refund_date").innerHTML = filter?.returnOrder?.returnDate
    document.getElementById("ds_refund_date2").innerHTML = filter?.returnOrder?.returnDate

    const shipDate = new Date(filter?.returnOrder?.returnDate)
    shipDate.setDate(shipDate.getDate() + 3);
    document.getElementById("ds_refund_picke").innerHTML = shipDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_refund_picke2").innerHTML = shipDate?.toISOString()?.split("T")[0]; 

    // const expectedDate = new Date(filter?.orderDate)
    // expectedDate.setDate(expectedDate.getDate() + 5);
    // document.getElementById("ds_order_expected").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 
    // document.getElementById("ds_order_expected2").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 

    // const deliverDate = new Date(filter?.orderDate)
    // deliverDate.setDate(deliverDate.getDate() + 10);
    // document.getElementById("ds_order_deliver").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 
    // document.getElementById("ds_order_deliver2").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 

    document.getElementById("ds_refund_miniId").innerHTML = filter?.batchId
    document.getElementById("ds_refund_confirm").innerHTML = filter?.orderDate
    document.getElementById("ds_refund_come").innerHTML = filter?.deliveryDate

    document.getElementById("ds_refund_name").innerHTML = filter?.shippingDetails?.name
    document.getElementById("ds_refund_address").innerHTML = filter?.shippingDetails?.address
    document.getElementById("ds_refund_num").innerHTML = filter?.shippingDetails?.mobile

    let productData = document.getElementById("ds_refund_details")
    let html = filter?.orders?.map((element)=>{
          return `<div class="row align-items-center">
                                <div class="col-xl-2 col-lg-4 col-md-5 col-sm-4 col-6  mt-3">
                                  <div>
                                    <img src="${element?.image}" alt="">
                                  </div>
                                </div>
                                <div class="col-xl-10 col-lg-8 col-md-7 col-sm-8 col-12 mt-3">
                                  <div>
                                     <p class="ds_color">${element?.brand ? element?.brand : ''} ${element?.name}</p>
                                     <p class="ds_muted">Shade : <span class="ds_color">${element?.selectedColor ? element?.selectedColor : 'No Color'}</span></p>
                                     <div class="d-flex justify-content-between">
                                        <p class="ds_muted">Qty : <span class="ds_color">X1</span></p>
                                        <h5 class="ds_color ds_600">$${element?.currentPrice}</h5>
                                     </div>
                                  </div>
                                </div>
                               </div>
                               <div class="ds_order_border mt-3"></div>
                               `
    }).join("")
    productData.innerHTML = html

    document.getElementById("ds_item_length").innerHTML = filter?.orders?.length
    document.getElementById("ds_sub_total").innerHTML = filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount)
    document.getElementById("ds_item_discount").innerHTML = parseFloat(filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount) * 20 / 100)
    document.getElementById("ds_item_total").innerHTML = filter?.totalAmount

}

getOrderData()