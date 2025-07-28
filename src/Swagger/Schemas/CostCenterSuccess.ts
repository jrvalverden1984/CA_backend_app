export const CostCenterSuccess = {
  type: 'object',
  required: ['CostCenterID', 'Description', 'Message'],
  properties: {
      CostCenterID: {
        type: 'number',
        example: 1
      },
      Description: {
        type: 'string',
        example: 'IT Department'
      },
      Message: {
        type: 'string',
        example: 'Cost Center successfully obtained'
      }
  }
} 