

export class ServiceOrder {

    constructor(repositories) {
        this.repositories = repositories;
    }


    async save(userId, order) {

        try {

            order.user = userId;
            const response = await this.repositories.orderRepository.save(order);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }


    async assignServiceOrder(id, employees) {

        try {

            const response = await this.repositories.orderRepository.updateOrder(id,
                { employees: employees, status: "in_progress" },
            );

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }


    async findAllByIdSupervisor(id, limit) {

        try {

            const response = await this.repositories.orderRepository.findAllByIdSupervisor(id, limit);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }


    async findAll(limit) {

        try {

            const response = await this.repositories.orderRepository.findAll(limit);
            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            console.log(error);
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }

}