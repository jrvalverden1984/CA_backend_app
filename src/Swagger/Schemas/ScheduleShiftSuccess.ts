export const ScheduleShiftSuccess = {
  type: 'object',
  required: ['ScheduleShiftID', 'ScheduleID', 'ShiftID', 'Message'],
  properties: {
      ScheduleShiftID: {
        type: 'number',
        example: 1
      },
      ScheduleID: {
        type: 'number',
        example: 1
      },
      ShiftID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Schedule Shift successfully obtained'
      }
  }
} 