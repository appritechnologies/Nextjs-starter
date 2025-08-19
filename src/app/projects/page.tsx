'use client'

import { useEffect } from 'react'
import { useProjectStore, useProjects, useProjectsLoading, useProjectsError } from '@/store'
import { Project } from '@/types'

const statusColors = {
  'planning': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-green-100 text-green-800',
  'on-hold': 'bg-gray-100 text-gray-800'
}

const priorityColors = {
  'low': 'border-green-200',
  'medium': 'border-yellow-200',
  'high': 'border-red-200'
}

export default function ProjectsPage() {
  const projects = useProjects()
  const loading = useProjectsLoading()
  const error = useProjectsError()
  const { fetchProjects, clearError } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleStatusFilter = (status?: Project['status']) => {
    fetchProjects(status)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading projects...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium">Error loading projects</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={clearError}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear Error
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">IT Projects</h1>
        <p className="text-gray-600">Manage and track your IT department projects</p>
      </div>

      {/* Filter buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleStatusFilter()}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          All Projects
        </button>
        <button
          onClick={() => handleStatusFilter('planning')}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Planning
        </button>
        <button
          onClick={() => handleStatusFilter('in-progress')}
          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusFilter('completed')}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          Completed
        </button>
        <button
          onClick={() => handleStatusFilter('on-hold')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          On Hold
        </button>
      </div>

      {/* Projects grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-white rounded-lg shadow-md border-l-4 ${priorityColors[project.priority]} p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                {project.name}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <span className="font-medium">Priority:</span> {project.priority}
                </div>
                <div>
                  <span className="font-medium">Start:</span> {project.startDate}
                </div>
              </div>

              {project.endDate && (
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Completed:</span> {project.endDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No projects found</div>
          <p className="text-gray-400 mt-2">Try adjusting your filters or create a new project</p>
        </div>
      )}
    </div>
  )
}