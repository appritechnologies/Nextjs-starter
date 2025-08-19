export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  technologies: string[]
  startDate: string
  endDate?: string
  priority: 'low' | 'medium' | 'high'
}

export interface CreateProjectRequest {
  name: string
  description: string
  technologies: string[]
  priority: 'low' | 'medium' | 'high'
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  status?: Project['status']
  endDate?: string
}