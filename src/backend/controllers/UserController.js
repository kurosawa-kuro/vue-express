export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUsers(c, req, res) {
    try {
      const users = await this.userService.findAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}