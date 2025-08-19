import { NextRequest } from 'next/server'
import { ProjectHandler } from '@/lib/handlers/project.handler'

const projectHandler = new ProjectHandler()

export async function GET(request: NextRequest) {
  return projectHandler.getProjects(request)
}

export async function POST(request: NextRequest) {
  return projectHandler.createProject(request)
}