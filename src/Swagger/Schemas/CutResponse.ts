export const CutResponse = {
  type: 'object',
  required: ['CutID', 'Message'],
  properties: {
      CutID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 