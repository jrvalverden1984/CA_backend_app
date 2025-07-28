export const EmployeeSuccess = {
  type: 'object',
  required: ['EmployeeID', 'IdentificationNumber', 'FirstName', 'LastName', 'DepartmentID', 'JobRoleID', 'CostCenterID', 'ScheduleID', 'HireDate', 'Overtime', 'Salary', 'IsActive', 'Message'],
  properties: {
      EmployeeID: {
        type: 'number',
        example: 1
      },
      IdentificationNumber: {
        type: 'string',
        example: '1234567890'
      },
      FirstName: {
        type: 'string',
        example: 'John'
      },
      LastName: {
        type: 'string',
        example: 'Doe'
      },
      DepartmentID: {
        type: 'number',
        example: 1
      },
      JobRoleID: {
        type: 'number',
        example: 1
      },
      CostCenterID: {
        type: 'number',
        example: 1
      },
      ScheduleID: {
        type: 'number',
        example: 1
      },
      HireDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-15'
      },
      Overtime: {
        type: 'boolean',
        example: true
      },
      Salary: {
        type: 'number',
        example: 50000.00
      },
      IsActive: {
        type: 'boolean',
        example: true
      },
      Photo: {
        type: 'string',
        format: 'binary',
        example: null
      },
      Message: {
        type: 'string',
        example: 'Employee successfully obtained'
      }
  }
} 