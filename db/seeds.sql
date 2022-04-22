
-- populate the department table with this seed data
INSERT INTO department (id, name)
VALUES
    (DEFAULT, 'TECHNOLOGY'),
    (DEFAULT, 'HUMAN RESOURCES'),
    (DEFAULT, 'RETAIL'),
    (DEFAULT, 'CORPORATE');

--  populate the role table with this seed data
INSERT INTO role (id, title, salary, department_id)
    VALUES 
        (DEFAULT, 'TECHNOLOGY DIVISION LEAD', 17500000, 1),
        (DEFAULT, 'HEAD OF HUMAN RESOURCES', 12500000, 2),
        (DEFAULT, 'CHIEF FINANCIAL OFFICER', 15000000, 3),
        (DEFAULT, 'CHIEF OPERATIONS OFFICER', 20000000, 4),
        (DEFAULT, 'HEAD OF RECRUITING', 13000000, 4);


-- populate the employee data with this seed data 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES  
        (DEFAULT, 'Dev', 'Deiv', 1, null),
        (DEFAULT, 'Zeltzin', 'Martinez', 2, 1),
        (DEFAULT, 'Mel', 'Rivas', 3, 2),
        (DEFAULT, 'Yorj', 'Felix', 4, 3),
        (DEFAULT, 'Gabe', 'Guzman', 5, 4),
        (DEFAULT, 'Raven', 'Oliphant', 5, 4);
