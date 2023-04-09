INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"), 
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 2),
       ("Salesperson", 80000, 2),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 3),
       ("lawyer", 125000, 4),
       ("Wearhouse Guy", 500, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 2, 1),
       ("Kevin", "Tupik", 2, 1),
       ("Kunal", "Singh", 3, 1),
       ("Malia", "Brown", 3, 1),
       ("Bill", "Lourd", 4, 1);
       