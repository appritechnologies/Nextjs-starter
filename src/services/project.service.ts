import { Project, CreateProjectRequest, UpdateProjectRequest } from '@/types'

export class ProjectService {
  private projects: Project[] = [
    {
      id: '1',
      name: 'Employee Management System',
      description: 'A comprehensive system for managing employee records, attendance, and performance tracking.',
      status: 'in-progress',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
      startDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      name: 'IT Asset Tracking',
      description: 'Track and manage company IT assets including laptops, monitors, and software licenses.',
      status: 'completed',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      startDate: '2023-11-01',
      endDate: '2024-01-30',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Help Desk Portal',
      description: 'Internal help desk system for IT support tickets and knowledge base management.',
      status: 'planning',
      technologies: ['Vue.js', 'Python', 'Django', 'Redis'],
      startDate: '2024-03-01',
      priority: 'medium'
    },
    {
      id: '4',
      name: 'Network Monitoring Dashboard',
      description: 'Real-time dashboard for monitoring network performance and infrastructure health.',
      status: 'on-hold',
      technologies: ['Angular', 'Go', 'InfluxDB', 'Grafana'],
      startDate: '2024-02-01',
      priority: 'low'
    }
  ]

  async getProjects(statusFilter?: Project['status']): Promise<Project[]> {
    await this.delay(100) // Simulate async operation
    
    if (statusFilter) {
      return this.projects.filter(project => project.status === statusFilter)
    }
    
    return [...this.projects]
  }

  async getProjectById(id: string): Promise<Project | null> {
    await this.delay(50)
    
    const project = this.projects.find(p => p.id === id)
    return project || null
  }

  async createProject(data: CreateProjectRequest): Promise<Project> {
    await this.delay(100)
    
    const newProject: Project = {
      id: Date.now().toString(),
      ...data,
      status: 'planning',
      startDate: new Date().toISOString().split('T')[0]
    }
    
    this.projects.push(newProject)
    return newProject
  }

  async updateProject(id: string, data: UpdateProjectRequest): Promise<Project | null> {
    await this.delay(100)
    
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) return null
    
    this.projects[index] = { ...this.projects[index], ...data }
    return this.projects[index]
  }

  async deleteProject(id: string): Promise<boolean> {
    await this.delay(100)
    
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) return false
    
    this.projects.splice(index, 1)
    return true
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}