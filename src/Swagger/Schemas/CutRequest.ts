export const CutRequest = {
  type: 'object',
  required: ['Description', 'StartDate', 'EndDate', 'IsModifiable'],
  properties: {
      Description: {
        type: 'string',
        example: 'January 2024 Cut'
      },
      StartDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-01'
      },
      EndDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-31'
      },
      IsModifiable: {
        type: 'boolean',
        example: true
      }
  }
} 