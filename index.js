require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
});

const employeeOptions = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "event",
      message: "What would you like to do?",
      choices: ["show all employees", "add employee", "change employee role", "show all roles", "add role", "show all departments", "add department", "change employee manager", "finn"],
    }
  ])
    .then((data => {
      console.log(data);
      const { event } = data;
 switch (event) 
  {
      case "show all employees":
      connection.query('SELECT * FROM employee', (err, employee) => {
  if (err) { console.log(err) };
      console.log('\n');
      console.table(employee);
  });
      employeeOptions();
      break;
    case "add employee":
      addEmployee();
      break;
    case "change employee role":
      changeEmployeeRole();
      break;
    case "show all roles":
      connection.query('SELECT * FROM roles', (err, roles) => {
  if (err) { console.log(err) };
      console.log('\n\n');
      console.table(roles);
  });
      employeeOptions();
      break;
    case "add role":
      addRole();
      break;
    case "show all departments":
      connection.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) };
      console.log('\n');
      console.table(departments);
  });
      employeeOptions();
      break;
    case "add department":
      addDepartment();
      break;
    case "change employee manager":
      updateManager();
       break;
    case "finn":
      connection.end();
    break;
      }
    }))
}
//change the employees role by changing role ID by prompt
const changeEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'choose the employee to change'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the new Role (by ID) you want to change your employee to?'
    },
  ])
    .then(employee => {
      let updatedEmployee = {
        role_id: employee.role_id
      }
      connection.query(`UPDATE employee SET ? WHERE id = ${employee.id}`, updatedEmployee, err => { if (err) { console.log(err) } });
      employeeOptions();
    })
}
//adds new department 
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the department to make?"
    }
  ])
    .then(department => {
      console.log(department);
      connection.query('INSERT INTO departments SET ?', department, err => { if (err) { console.log(err) } })
      console.log('Department added...');
      employeeOptions();
    })
}

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the role that you want to add?",
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of said role?",
    },
    {
      type: 'input',
      name: 'department_id',
      message: "What is the department ID of your new role?",
    },
  ])
    .then(role => {
      console.log(role);
      connection.query('INSERT INTO roles SET ?', role, err => { if (err) { console.log(err) } });
      employeeOptions();
    }
    )
}

const addEmployee = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'first_name',
    message: "What is the new employee's first name?"
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What is the new employee's last name?"
  },
  {
    type: 'input',
    name: 'role_id',
    message: "What is the new employee's Role id number?"
  },
  {
    type: 'list',
    name: 'manager',
    message: "Is the employee a manager?",
    choices: ['yes', 'no']
  },
  ])
    .then(employee => {
      console.log(employee);
      if (employee.manager === "yes") {
        delete employee.manager;
        console.log(employee);
        connection.query('INSERT INTO employee SET ?', employee, err => { if (err) { console.log(err) } });
        employeeOptions();
      } else {
        inquirer.prompt([{
          type: 'input',
          name: 'manager_id',
          message: "What is the new employees manager (By ID)"
        }])
          .then(employee2 => {
            delete employee.manager;
            let newEmployee = {
              ...employee,
              manager_id: employee2.manager_id
            }
            connection.query('INSERT INTO employee SET ?', newEmployee, err => { if (err) { console.log(err) } });
            employeeOptions();
          })
      }
    })
};

const updateManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'who is the employee you want to update (by ID)?'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the new manager id of this employee?'
    },
  ])
    .then(employee => {
      let updatedEmployee = {
        manager_id: employee.manager_id
      }
      connection.query(`UPDATE employee SET ? WHERE id = ${employee.id}`, updatedEmployee, err => { if (err) { console.log(err) } });
      employeeOptions();
    })
}

employeeOptions();