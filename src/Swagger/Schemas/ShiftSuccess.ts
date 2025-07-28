export const ShiftSuccess = {
  type: 'object',
  required: ['ShiftID', 'Description', 'Start', 'RangeStartIn', 'RangeStartOut', 'End', 'RangeEndIn', 'RangeEndOut', 'Message'],
  properties: {
      ShiftID: {
        type: 'number',
        example: 1
      },
      Description: {
        type: 'string',
        example: 'Morning Shift'
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
      },
      Message: {
        type: 'string',
        example: 'Shift successfully obtained'
      }
  }
} 