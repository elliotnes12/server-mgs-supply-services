


function addServiceOrder(req,resp){

    const { idCostumer } = req.body;



    return resp.status(200).send();
}



export const serviceOrderController = {
    addServiceOrder
}