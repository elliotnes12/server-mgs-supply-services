
export class IServiceRepository {

    save(order) {
        throw new Error("Method 'save' must be implemented.")
    }
    findAllByIdSupervisor(id) {
        throw new Error("Method 'find' must be implemented.")
    }
    findAllByIdCustomer(id) {
        throw new Error("Method 'find' must be implemented.")
    }
    findAll() {
        throw new Error("Method 'find' must be implemented.")
    }
    updateOrder(id, data) {
        throw new Error("Method 'updateOrder' must be implemented.")
    }

}