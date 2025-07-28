export const HolidayRequest = {
  type: 'object',
  required: ['Description', 'StartDate'],
  properties: {
      Description: {
        type: 'string',
        example: 'New Year'
      },
      StartDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-01'
      }
  }
} 