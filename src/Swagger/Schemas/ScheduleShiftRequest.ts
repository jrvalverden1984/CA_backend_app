export const ScheduleShiftRequest = {
  type: 'object',
  required: ['ScheduleID', 'ShiftID'],
  properties: {
      ScheduleID: {
        type: 'number',
        example: 1
      },
      ShiftID: {
        type: 'number',
        example: 1
      }
  }
} 