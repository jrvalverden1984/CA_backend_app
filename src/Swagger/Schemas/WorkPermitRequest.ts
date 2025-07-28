export const WorkPermitRequest = {
  type: 'object',
  required: ['Description', 'EmployeeID', 'MotivePermitID', 'StartDate', 'EndDate'],
  properties: {
      Description: {
        type: 'string',
        example: 'Medical appointment'
      },
      EmployeeID: {
        type: 'number',
        example: 1
      },
      MotivePermitID: {
        type: 'number',
        example: 1
      },
      StartDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-15'
      },
      EndDate: {
        type: 'string',
        format: 'date',
        example: '2024-01-15'
      }
  }
} 