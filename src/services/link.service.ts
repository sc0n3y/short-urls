import prisma from "../database/prisma";
import { v4 as uuidv4 } from 'uuid';
import ClickService from "./click.service";

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
  
  async trackClick(
    linkId: number, 
    ipAddress: string, 
    userAgent: string, 
    headers: object, 
    referer: string
    ) {
    const click = await ClickService.createClick(linkId, ipAddress, userAgent, headers, referer);
    return click;
  }
  
  private generateShortCode() {
    const uuid = uuidv4();
    const shortCode = uuid.substring(0, 8);
    return shortCode;
  }
}

export default new LinkService();
