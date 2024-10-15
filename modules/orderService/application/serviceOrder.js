

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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: message.error } };
        }

    }


    async update(order) {
        try {
            const { id, ...fieldsToUpdate } = order;

            const updateFields = {};
            Object.keys(fieldsToUpdate).forEach(key => {
                if (fieldsToUpdate[key] !== undefined) {
                    updateFields[key] = fieldsToUpdate[key];
                }
            });

            const response = await this.repositories.orderRepository.updateOrder(id, updateFields);

            return {
                meta: { code: 201, module: "SERVICE_ORDER", message: "success" },
                data: response
            };
        } catch (error) {
            return { meta: { code: 500, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
        }
    }

    async findAllServicesByInProgressAndEmployeeId(page, limit, idEmployee) {
        try {

            const data = await this.repositories.orderRepository.findAllServicesByInProgressAndEmployeeId(idEmployee, page, limit);

            if (data.length == 0) {
                throw new Error("Services not found");
            }
            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: data
            };

        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
        }

    }


    async findAllByInProgressAndSupervisor(page, limit, supervisor) {

        try {

            const response = await this.repositories.orderRepository.findAllByInProgressAndSupervisor(page, limit, supervisor);

            return {
                meta: { code: 200, module: "SERVICE_ORDER", message: "success" }, data: response
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
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
            return { meta: { code: 404, module: "SERVICE_ORDER", message: error.message } };
        }

    }

}