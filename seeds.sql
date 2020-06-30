USE employee_trackerdb;


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joseph", "Brimeyer", 9, null), ("Jason", "Charley", 9, null), ("John", "Simon", 9, null),
("Peter", "Strong", 9, null), ("Eric", "Simon", 1, 1), ("Ben", "Vesley", 2, 1), ("Brian", "Killoran", 3, 2), 
("Chad", "Van Cleve", 4, 2), ("Rick", "Nap", 5, 3), ("Jim", "Kingsbury", 6, 3), ("Rick", "Simon", 7, 4),
("Nate", "Jones", 8, 4);  

INSERT INTO department (id, department_name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Finance"), (4, "Legal"), (5, "Administration");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 75000, 1), (2, "Salesperson", 65000, 1), (3, "Lead Engineer", 110000, 2), (4, "Software Engineer", 90000, 2), 
(5, "Accountant", 68000, 3), (6, "Comptroller", 130000, 3), (7, "Legal Team Lead", 72000, 4), (8, "Lawyer", 98000, 4), (9, "Manager", 62000, 5);
