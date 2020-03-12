USE employee_tracker;

INSERT INTO departments (department)
VALUES
    ("legal"),
    ("finance"),
    ("facilities"),
    ("engineering");

INSERT INTO roles (title, salary, departments_id)
VALUES
    ("senior attorney", 90000, 1),
    ("senior accountant", 70000, 2),
    ("senior janitor", 40000, 3),
    ("senior engineer", 77000, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
    ("Pat", "Baker", 1, Null),
    ("Amy", "Mitchell", 2, NULL),
    ("Bill", "Johnson", 3, Null),
    ("Dev", "Patel", 4, Null);
