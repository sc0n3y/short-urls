import prisma from "../database/prisma";
import { v4 as uuidv4 } from 'uuid';

class LinkService {
  async createLink(url: string) {
    const code = this.generateShortCode();
    const link = await prisma.link.create({
      data: { url, code },
    });
    return link;
  }

  async getLinkByCode(code: string) {
    return prisma.link.findUnique({ where: { code } });
  }

  private generateShortCode() {
    const uuid = uuidv4();
    const shortCode = uuid.substring(0, 8);
    return shortCode;
  }
}

export default new LinkService();
