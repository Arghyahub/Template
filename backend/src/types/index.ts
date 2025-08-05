declare global {
  namespace Express {
    interface Request {
      user: {
        // Or define a more specific User interface
        id: any;
        // Add other user properties as needed
      };
    }
  }
}
