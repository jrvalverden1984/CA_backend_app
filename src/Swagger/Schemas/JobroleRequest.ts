export const JobroleRequest = {
  type: 'object',
  required: ['Description'],
  properties: {
      Description: {
        type: 'string',
        example: 'Software Developer'
      }
  }
} 