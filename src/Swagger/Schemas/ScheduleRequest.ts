export const ScheduleRequest = {
  type: 'object',
  required: ['Description', 'ShortName', 'MinuteBeforeInput', 'MinuteAfterOutput', 'MinuteDelay', 'ShiftType', 'MinuteLunch', 'Start', 'RangeStartIn', 'RangeStartOut', 'End', 'RangeEndIn', 'RangeEndOut'],
  properties: {
      Description: {
        type: 'string',
        example: 'Morning Shift'
      },
      ShortName: {
        type: 'string',
        example: 'MS'
      },
      MinuteBeforeInput: {
        type: 'number',
        example: 15
      },
      MinuteAfterOutput: {
        type: 'number',
        example: 15
      },
      MinuteDelay: {
        type: 'number',
        example: 30
      },
      ShiftType: {
        type: 'number',
        example: 1
      },
      MinuteLunch: {
        type: 'number',
        example: 60
      },
      Start: {
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T08:00:00Z'
      },
      RangeStartIn: {
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T07:45:00Z'
      },
      RangeStartOut: {
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T08:15:00Z'
      },
      End: {
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T17:00:00Z'
      },
      RangeEndIn: {
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T16:45:00Z'
      },
      RangeEndOut: {
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T17:15:00Z'
      }
  }
} 