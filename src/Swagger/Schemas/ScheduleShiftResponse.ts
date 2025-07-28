export const ScheduleShiftResponse = {
  type: 'object',
  required: ['ScheduleShiftID', 'Message'],
  properties: {
      ScheduleShiftID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 