

export class ServiceOrder {

    constructor(repositories) {
        this.repositories = repositories;
    }


    async save(userId,order){
    
        try {

            order.user = userId;
            const response = await this.repositories.orderRepository.save(order);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data:response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }

    
    async assignServiceOrder(id,employees){
    
        try {

            const response = await this.repositories.orderRepository.updateOrder(id,
                {employees:employees,status:"in_progress"},
            );

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data:response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }


    async findAllBySupervisor(id){
    
        try {

            const response = await this.repositories.orderRepository.findByIdSupervisor(id);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data:response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }

}