import { Request, Response, Router } from 'express';
import LinkService from '../services/link.service';

class LinkController {
  private router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post('/create', this.createLink);
    this.router.get('/:code', this.redirectToLink);
  }

  private createLink = async (req: Request, res: Response) => {
    const { url } = req.body;
    try {
      const link = await LinkService.createLink(url);
      res.json({ code: link.code });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  private redirectToLink = async (req: Request, res: Response) => {
    const code = req.params.code;
    try {
      const link = await LinkService.getLinkByCode(code);
      if (!link) {
        res.status(404).json({ error: 'Link not found' });
      } else {
        res.redirect(link.url);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default new LinkController();
