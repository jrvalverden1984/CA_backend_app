export const MotivePermitSuccess = {
  type: 'object',
  required: ['MotivePermitID', 'Description', 'Message'],
  properties: {
      MotivePermitID: {
        type: 'number',
        example: 1
      },
      Description: {
        type: 'string',
        example: 'Medical Leave'
      },
      Message: {
        type: 'string',
        example: 'Motive Permit successfully obtained'
      }
  }
} 