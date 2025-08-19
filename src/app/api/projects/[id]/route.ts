import { NextRequest } from 'next/server'
import { ProjectHandler } from '@/lib/handlers/project.handler'

const projectHandler = new ProjectHandler()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return projectHandler.getProject(request, params.id)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return projectHandler.updateProject(request, params.id)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return projectHandler.deleteProject(request, params.id)
}