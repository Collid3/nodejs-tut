const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const roles_list = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
	.route("/")
	.get(employeesController.getAllEmployees)
	.post(verifyRoles(roles_list.Admin, roles_list.Editor), employeesController.addEmployee)
	.put(verifyRoles(roles_list.Admin, roles_list.Editor), employeesController.updateEmployee)
	.delete(verifyRoles(roles_list.Admin, roles_list.Editor), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
