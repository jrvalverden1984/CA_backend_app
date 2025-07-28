export const ScheduleResponse = {
  type: 'object',
  required: ['ScheduleID', 'Message'],
  properties: {
      ScheduleID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 