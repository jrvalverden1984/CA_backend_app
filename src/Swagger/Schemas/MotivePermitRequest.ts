export const MotivePermitRequest = {
  type: 'object',
  required: ['Description'],
  properties: {
      Description: {
        type: 'string',
        example: 'Medical Leave'
      }
  }
} 