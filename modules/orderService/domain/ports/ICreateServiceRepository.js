
export class IServiceRepository {

    save(order) {
        throw new Error("Method 'save' must be implemented.")
    }
    update(order) {
        throw new Error("Method 'update' must be implemented.")
    }
    findAllByIdSupervisor(id) {
        throw new Error("Method 'findAllByIdSupervisor' must be implemented.")
    }
    findAllByIdCustomer(id) {
        throw new Error("Method 'findAllByIdCustomer' must be implemented.")
    }
    findAll() {
        throw new Error("Method 'findAll' must be implemented.")
    }
    updateOrder(id, data) {
        throw new Error("Method 'updateOrder' must be implemented.")
    }

}