export const DepartmentSuccess = {
  type: 'object',
  required: ['DepartmentID', 'Description', 'Message'],
  properties: {
      DepartmentID: {
        type: 'number',
        example: 1
      },
      Description: {
        type: 'string',
        example: 'Human Resources'
      },
      Message: {
        type: 'string',
        example: 'Department successfully obtained'
      }
  }
} 