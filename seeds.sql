INSERT INTO department (id, name)
VALUES (1, "production"), (2, "marketing"), (3, "development");
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "owner", 0.00, 1),
(2, "producer", 250000.00, 1),
(3, "director", 200000.00, 1),
(4, "cinematographer", 75000.00, 1),
 (5, "audio tech", 45000.00, 1),
 (6, "gaffer", 25000.00, 1),
 (7, "lighting tech", 50000.00, 1),
 (8, "actor", 1000000.00, 1),
 (9, "developer", 60,000.00, 2),
 (10, "location Scount", 20,000.00, 3),
 (10, "talent scout", 20,000.00, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stephon", "Autery", 1, NULL), ("Catherine", "Autery", 1, 1), ("John", "Autery", 1, 1), ("Suzannah", "Levy", 2, 4), ("Clay", "Smith", 4, 1), ("Halston", "Butler", 6, 1), ("Maggie", "McCarthy", 8, 1);
