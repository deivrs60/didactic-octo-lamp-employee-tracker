INSERT INTO department (name)
VALUES
    ('TECHNOLOGY'),
    ('HUMAN RESOURCES'),
    ('RETAIL'),
    ('CORPORATE');


INSERT INTO role (title, salary, department_id)
    VALUES 
        ('TECHNOLOGY DIVISION LEAD', 17500000, 1 ),
        ('HEAD OF HUMAN RESOURCES', 12500000, 2),
        ('CHIEF FINANCIAL OFFICER', 15000000, 3),
        ('CHIEF OPERATIONS OFFICER', 20000000, 4),
        ('HEAD OF RECRUITING', 13000000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  
        ('Dev', 'Deiv', 1, null),
        ('Zeltzin', 'Martinez', 2, 1),
        ('Mel', 'Rivas', 3, 2),
        ('Yorj', 'Felix', 4, 3),
        ('Gabe', 'Guzman', 5, 4),
        ('Raven', 'Oliphant', 6, 5);
