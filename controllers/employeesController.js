const data = {
	employees: require("../data/exployees.json"),
	setEmployees: function (data) {
		this.employees = data;
	},
};

const getAllEmployees = (req, res) => {
	res.json(data.employees);
};

const addEmployee = (req, res) => {
	if (!req.body.firstName || !req.body.lastName) {
		return res.status(400).json({ Message: "First and Last names are required" });
	}

	const id = data.employees.length ? data.employees[data.employees.length - 1].id + 1 : 1;

	const newEmployee = {
		id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};

	data.setEmployees([...data.employees, newEmployee]);
	res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
	if (!req.body.id) return res.status(404).json({ message: "Employee Id not found" });
	req.body.id = parseInt(req.body.id);
	const SelectedEmployee = data.employees.find((emp) => emp.id === req.body.id);
	if (SelectedEmployee) {
		if (req.body.firstName) SelectedEmployee.firstName = req.body.firstName;
		if (req.body.lastName) SelectedEmployee.lastName = req.body.lastName;

		const newEmployeesList = data.employees.map((emp) =>
			emp.id === req.body.id ? SelectedEmployee : emp
		);

		data.setEmployees(newEmployeesList);
		res.json(data.employees);
	} else {
		res.status(400).json({ message: "Employee ID not found" });
	}
};

const deleteEmployee = (req, res) => {
	req.body.id = parseInt(req.body.id);
	const employee = data.employees.find((emp) => emp.id === req.body.id);

	if (!employee) return res.status(400).json({ message: "Employee ID not found" });
	const newEmployeesList = data.employees.filter((emp) => emp.id !== req.body.id);
	data.employees = newEmployeesList;
	res.json(data.employees);
};

const getEmployee = (req, res) => {
	req.body.id = parseInt(req.body.id);
	const employee = data.employees.find((emp) => emp.id === req.params.id);
	if (!employee) return res.status(400).json({ message: "Employee ID not found" });
	req.params.id = parseInt(req.params.id);
	res.json(employee);
};

module.exports = {
	getAllEmployees,
	addEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
