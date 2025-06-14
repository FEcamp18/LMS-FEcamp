import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"

const prisma = new PrismaClient()

export async function PATCH(
  req: Request,
  props: { params: Promise<{ fileId: string }> },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role != "STAFF" && session.user.role != "BOARD")) {
      return Response.json(
        { message: "failed", error: "Unauthorized" },
        { status: 403 },
      )
    }
    const { fileId } = await props.params
    const fileIdParsed = parseInt(fileId, 10)

    const updatedFile = await prisma.subjectFiles.update({
      where: {
        fileId: fileIdParsed,
      },
      data: {
        isDisable: true,
      },
    })

    if (!updatedFile) {
      return Response.json(
        { message: "failed", error: "File not found" },
        { status: 404 },
      )
    }

    return Response.json(
      { message: "success", file: updatedFile },
      { status: 200 },
    )
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error:
          error instanceof Error ? error.message : "Failed to disable file",
      },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
