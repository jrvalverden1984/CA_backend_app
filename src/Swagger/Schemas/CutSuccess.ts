export const CutSuccess = {
  type: 'object',
  required: ['CutID', 'Description', 'StartDate', 'EndDate', 'IsModifiable', 'Message'],
  properties: {
      CutID: {
        type: 'number',
        example: 1
      },
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
      },
      Message: {
        type: 'string',
        example: 'Cut successfully obtained'
      }
  }
} 