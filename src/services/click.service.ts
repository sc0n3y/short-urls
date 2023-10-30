// ClickService.ts
import prisma from "../database/prisma";

class ClickService {
    async createClick(
        linkId: number,
        ipAddress: string,
        userAgent: string,
        headers: object,
        referer: string
    ) {
        const click = await prisma.click.create({
            data: {
                link: { connect: { id: linkId } },
                ip_address: ipAddress,
                user_agent: userAgent,
                headers,
                referer,
            },
        });
        return click;
    }
}

export default new ClickService();
