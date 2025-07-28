export const JobroleResponse = {
  type: 'object',
  required: ['JobRoleID', 'Message'],
  properties: {
      JobRoleID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 