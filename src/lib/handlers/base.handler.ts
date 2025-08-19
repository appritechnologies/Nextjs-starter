import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export interface ApiError {
  message: string
  code: string
  status: number
}

export abstract class BaseHandler {
  protected async handleRequest<T>(
    request: NextRequest,
    handler: (request: NextRequest) => Promise<T>
  ): Promise<NextResponse> {
    try {
      const result = await handler(request)
      return NextResponse.json({ data: result, success: true }, { status: 200 })
    } catch (error) {
      return this.handleError(error)
    }
  }

  protected handleError(error: unknown): NextResponse {
    console.error('API Error:', error)

    if (this.isApiError(error)) {
      return NextResponse.json(
        { 
          error: error.message, 
          code: error.code,
          success: false 
        },
        { status: error.status }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        code: 'INTERNAL_ERROR',
        success: false 
      },
      { status: 500 }
    )
  }

  protected createError(message: string, code: string, status: number): ApiError {
    return { message, code, status }
  }

  protected async validateAuth() {
    const session = await getServerSession()
    
    if (!session) {
      throw this.createError('Unauthorized', 'UNAUTHORIZED', 401)
    }
    
    return session
  }

  protected validateRequestBody<T>(body: unknown, requiredFields: string[]): T {
    if (!body || typeof body !== 'object') {
      throw this.createError('Invalid request body', 'INVALID_BODY', 400)
    }

    const missingFields = requiredFields.filter(
      field => !(field in (body as Record<string, unknown>))
    )

    if (missingFields.length > 0) {
      throw this.createError(
        `Missing required fields: ${missingFields.join(', ')}`,
        'MISSING_FIELDS',
        400
      )
    }

    return body as T
  }

  private isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'code' in error &&
      'status' in error
    )
  }
}