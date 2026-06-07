import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type Decision = "cut" | "keep" | "maybe" | "new";

type DecisionsFile = {
  updatedAt: string | null;
  decisions: Record<string, Decision>;
};

const allowedDecisions = new Set(["cut", "keep", "maybe", "new"]);
const decisionsPath = path.join(
  process.cwd(),
  "data",
  "curation",
  "decisions.json",
);

export async function GET() {
  return NextResponse.json(await readDecisions());
}

export async function PUT(request: Request) {
  const payload = (await request.json()) as Partial<DecisionsFile>;
  const decisions = sanitizeDecisions(payload.decisions);
  const nextFile: DecisionsFile = {
    updatedAt: new Date().toISOString(),
    decisions,
  };

  await fs.mkdir(path.dirname(decisionsPath), { recursive: true });
  await fs.writeFile(decisionsPath, `${JSON.stringify(nextFile, null, 2)}\n`);

  return NextResponse.json(nextFile);
}

async function readDecisions(): Promise<DecisionsFile> {
  try {
    return JSON.parse(await fs.readFile(decisionsPath, "utf8")) as DecisionsFile;
  } catch {
    return { updatedAt: null, decisions: {} };
  }
}

function sanitizeDecisions(
  decisions: Partial<Record<string, unknown>> | undefined,
) {
  const sanitized: Record<string, Decision> = {};

  for (const [id, decision] of Object.entries(decisions ?? {})) {
    if (!/^candidate-[a-z0-9]+$/.test(id)) {
      continue;
    }

    if (typeof decision === "string" && allowedDecisions.has(decision)) {
      sanitized[id] = decision as Decision;
    }
  }

  return sanitized;
}
