import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = schema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hash },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao criar conta" },
      { status: 500 }
    );
  }
}
