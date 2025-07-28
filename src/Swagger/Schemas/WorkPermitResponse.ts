export const WorkPermitResponse = {
  type: 'object',
  required: ['WorkPermitID', 'Message'],
  properties: {
      WorkPermitID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 