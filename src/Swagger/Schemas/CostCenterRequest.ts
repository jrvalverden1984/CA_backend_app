export const CostCenterRequest = {
  type: 'object',
  required: ['Description'],
  properties: {
      Description: {
        type: 'string',
        example: 'IT Department'
      }
  }
} 