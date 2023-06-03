class BaseService {
	constructor(model) {
		this.model = model;
	}

	load() {
		return this.model.find();
	}

	async insert(obj) {
		return await this.model.create(obj);
	}
	async removeTo(property, value) {
		return this.model.deleteOne({ [property]: value });
	}
	async update(id, obj) {
		return this.model.findByIdAndUpdate(id, obj);
	}
	async find(id) {
		return this.model.findById(id);
	}
	async findBy(property, value) {
		return this.model.findOne({ [property]: value });
	}
	async delete(id) {
		return this.model.findByIdAndDelete(id);
	}
	async query(obj) {
		return this.model.find(obj);
	}
}

export default BaseService;
