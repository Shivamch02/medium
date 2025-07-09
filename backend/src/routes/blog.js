import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@shivamch_0224/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";
export const blogRouter = new Hono();
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user && typeof user.id === "string") {
            c.set("userId", user.id); // Now TypeScript knows user.id is a string
            await next();
        }
        else {
            c.status(403);
            return c.json({
                message: "You are not logged in",
            });
        }
    }
    catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in",
        });
    }
});
blogRouter.post("/", async (c) => {
    const authorId = c.get("userId");
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        return c.json({
            message: "Invalid input",
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
        },
    });
    return c.json({
        id: blog.id,
    });
});
blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        return c.json({
            message: "Invalid input",
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        },
    });
    return c.json({
        id: blog.id,
    });
});
// Todo: Add pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
    return c.json({
        blogs,
    });
});
blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return c.json({
            blog: blog,
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            error: "Error while fetching blog",
        });
    }
});
