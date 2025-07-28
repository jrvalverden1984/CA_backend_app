export const HolidaySuccess = {
  type: 'object',
  required: ['HolidayID', 'Description', 'StartDate', 'Message'],
  properties: {
      HolidayID: {
        type: 'number',
        example: 1
      },
      Description: {
        type: 'string',
        example: 'New Year'
      },
      StartDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-01'
      },
      Message: {
        type: 'string',
        example: 'Holiday successfully obtained'
      }
  }
} 