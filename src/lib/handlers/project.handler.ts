import { NextRequest } from 'next/server'
import { BaseHandler } from './base.handler'
import { Project, CreateProjectRequest, UpdateProjectRequest } from '@/types'
import { ProjectService } from '@/services'

export class ProjectHandler extends BaseHandler {
  private projectService: ProjectService

  constructor() {
    super()
    this.projectService = new ProjectService()
  }

  async getProjects(request: NextRequest) {
    return this.handleRequest(request, async () => {
      const { searchParams } = new URL(request.url)
      const status = searchParams.get('status') as Project['status'] | null
      
      const projects = await this.projectService.getProjects(status || undefined)
      return projects
    })
  }

  async getProject(request: NextRequest, id: string) {
    return this.handleRequest(request, async () => {
      if (!id) {
        throw this.createError('Project ID is required', 'MISSING_ID', 400)
      }

      const project = await this.projectService.getProjectById(id)
      
      if (!project) {
        throw this.createError('Project not found', 'PROJECT_NOT_FOUND', 404)
      }

      return project
    })
  }

  async createProject(request: NextRequest) {
    return this.handleRequest(request, async () => {
      await this.validateAuth()
      
      const body = await request.json()
      const validatedData = this.validateRequestBody<CreateProjectRequest>(
        body,
        ['name', 'description', 'technologies', 'priority']
      )

      const project = await this.projectService.createProject(validatedData)
      return project
    })
  }

  async updateProject(request: NextRequest, id: string) {
    return this.handleRequest(request, async () => {
      await this.validateAuth()
      
      if (!id) {
        throw this.createError('Project ID is required', 'MISSING_ID', 400)
      }

      const body = await request.json()
      const validatedData = this.validateRequestBody<UpdateProjectRequest>(body, [])

      const project = await this.projectService.updateProject(id, validatedData)
      
      if (!project) {
        throw this.createError('Project not found', 'PROJECT_NOT_FOUND', 404)
      }

      return project
    })
  }

  async deleteProject(request: NextRequest, id: string) {
    return this.handleRequest(request, async () => {
      await this.validateAuth()
      
      if (!id) {
        throw this.createError('Project ID is required', 'MISSING_ID', 400)
      }

      const success = await this.projectService.deleteProject(id)
      
      if (!success) {
        throw this.createError('Project not found', 'PROJECT_NOT_FOUND', 404)
      }

      return { message: 'Project deleted successfully' }
    })
  }
}