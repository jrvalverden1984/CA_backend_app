export const WorkPermitSuccess = {
  type: 'object',
  required: ['WorkPermitID', 'Description', 'EmployeeID', 'MotivePermitID', 'StartDate', 'EndDate', 'Message'],
  properties: {
      WorkPermitID: {
        type: 'number',
        example: 1
      },
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
      },
      Message: {
        type: 'string',
        example: 'Work Permit successfully obtained'
      }
  }
} 