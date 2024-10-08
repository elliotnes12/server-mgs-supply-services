

export class ServiceOrder {

    constructor(repositories) {
        this.repositories = repositories;
    }


    async save(userId, order) {

        try {

            order.user = userId;
            const response = await this.repositories.orderRepository.save(order);

            return {
                meta: { code: 201, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }


    async findAllByIdSupervisor(page, limit, id_supervisor) {

        try {

            const response = await this.repositories.orderRepository.findAllByIdSupervisor(page, limit, id_supervisor);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: "Error" } };
        }

    }

    async findAllServicesByEmployeeId(page, limit, idEmployee) {
        try {

            const response = await this.repositories.orderRepository.findAllServicesByEmployeeId(idEmployee, page, limit);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };

        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }
    }

    async findAllByIdCustomer(page, limit, id_customer) {

        try {

            const response = await this.repositories.orderRepository.findAllByIdCustomer(page, limit, id_customer);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }

    }

    async findAllByStatus(limit, status) {

        try {

            const response = await this.repositories.orderRepository.findAllServicesByStatus(limit, status);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }

    }

    async findAllByManager(limit) {

        try {

            const response = await this.repositories.orderRepository.findAllByManager(limit);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }

    }

    async findAllByInProgress(page, limit) {

        try {

            const response = await this.repositories.orderRepository.findAllByInProgress(page, limit);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }

    }

    async findOneById(id) {

        try {

            const response = await this.repositories.orderRepository.findById(id);
            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }

    }



    async updateStatus(id, status) {

        try {

            const response = await this.repositories.orderRepository.updateStatus(id, status);
            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error } };
        }

    }

}