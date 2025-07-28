export const DepartmentRequest = {
  type: 'object',
  required: ['Description'],
  properties: {
      Description: {
        type: 'string',
        example: 'Human Resources'
      }
  }
} 