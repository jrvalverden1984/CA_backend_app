export const MotivePermitResponse = {
  type: 'object',
  required: ['MotivePermitID', 'Message'],
  properties: {
      MotivePermitID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 