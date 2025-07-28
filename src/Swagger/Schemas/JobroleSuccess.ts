export const JobroleSuccess = {
  type: 'object',
  required: ['JobRoleID', 'Description', 'Message'],
  properties: {
      JobRoleID: {
        type: 'number',
        example: 1
      },
      Description: {
        type: 'string',
        example: 'Software Developer'
      },
      Message: {
        type: 'string',
        example: 'Job Role successfully obtained'
      }
  }
} 