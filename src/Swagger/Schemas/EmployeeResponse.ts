export const EmployeeResponse = {
  type: 'object',
  required: ['EmployeeID', 'Message'],
  properties: {
      EmployeeID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 