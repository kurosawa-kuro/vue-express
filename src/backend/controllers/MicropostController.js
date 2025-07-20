export class MicropostController {
  constructor(micropostService) {
    this.micropostService = micropostService;
  }

  async getMicroposts(c, req, res) {
    try {
      const microposts = await this.micropostService.findAllMicroposts();
      return res.json(microposts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMicropostById(c, req, res) {
    try {
      const { id } = c.request.params;
      const micropost = await this.micropostService.findMicropostById(parseInt(id));
      
      if (!micropost) {
        return res.status(404).json({ error: 'Micropost not found' });
      }
      
      return res.json(micropost);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createMicropost(c, req, res) {
    try {
      const { title, userId } = c.request.requestBody;
      const micropost = await this.micropostService.createMicropost({ title, userId });
      return res.status(201).json(micropost);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}