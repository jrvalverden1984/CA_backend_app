export const CostCenterResponse = {
  type: 'object',
  required: ['CostCenterID', 'Message'],
  properties: {
      CostCenterID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
} 