export const ShiftResponse = {
  type: 'object',
  required: ['ShiftID', 'Message'],
  properties: {
      ShiftID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 