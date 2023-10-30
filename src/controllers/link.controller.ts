import { Request, Response, Router } from 'express';
import LinkService from '../services/link.service';
import ClickService from '../services/click.service';

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
    console.log("Request:",req);
    console.log("Request body:",req.body);
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
        const ipAddress = req.ip ?? ''; // Get the client's IP address
        const userAgent = req.get('User-Agent') ?? ''; // Get the user agent
        const headers = req.headers; // Get request headers
        const referer = req.get('Referer') ?? ''; // Get the referer header

        await ClickService.createClick(link.id, ipAddress, userAgent, headers, referer);

        res.redirect(link.url);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default new LinkController();
