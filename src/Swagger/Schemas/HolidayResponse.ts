export const HolidayResponse = {
  type: 'object',
  required: ['HolidayID', 'Message'],
  properties: {
      HolidayID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 