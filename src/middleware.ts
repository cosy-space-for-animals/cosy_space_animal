import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  if (request.url.startsWith('/todos')) {
    // http header set logic
    request.headers.set('x-todos', 'todos')
  }

  // cookie check logic
  const cookie = cookies()
  if (cookie.get('accessToken')?.value) {
    request.headers.set('Authorization', `Bearer ${cookie.get('accessToken')?.value}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/todos/:paths*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
