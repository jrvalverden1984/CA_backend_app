export const DepartmentResponse = {
  type: 'object',
  required: ['DepartmentID', 'Message'],
  properties: {
      DepartmentID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 